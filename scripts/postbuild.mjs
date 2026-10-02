/**
 * Runs after `vite build`, over the finished `build/` directory.
 *
 * Two jobs, both of which have to happen after prerendering because they need
 * to know what the site actually produced:
 *
 *   1. sitemap.xml — built from the real page list, not a hand-kept array, so
 *      it cannot drift from the site.
 *   2. Redirect stubs for every old cardellina.com URL, so the domain move
 *      doesn't drop 29 indexed pages. GitHub Pages serves files and cannot
 *      issue a 301, so each stub carries a canonical link plus a zero-delay
 *      meta refresh — the pair Google treats as a permanent move.
 *
 * The sitemap is written before the stubs so the stubs never end up in it:
 * a sitemap should list destinations, never redirects.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { redirects, wordpressOnly } from './redirects.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(root, 'build');

// Matches vite.config.ts: empty for the custom domain, '/cardellina-site' for
// the project URL. Links inside a stub must carry it or they 404 on github.io.
const raw = (process.env.BASE_PATH ?? '').trim().replace(/\/+$/, '');
const base = raw === '' ? '' : raw.startsWith('/') ? raw : `/${raw}`;

// An empty base path means this build is for the custom domain; a base path
// means it is the GitHub Pages project URL, which is a staging copy.
const isProduction = base === '';
const ORIGIN =
	process.env.SITE_URL ??
	(isProduction ? 'https://www.cardellina.com' : 'https://counttakeshi.github.io');

/** Every prerendered page, as site-root-relative paths ('/', '/trips', …). */
function pages(dir = BUILD, prefix = '') {
	const found = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			// Not ours: a static app that happens to live in the same repo.
			if (prefix === '' && entry === 'muni') continue;
			if (entry.startsWith('_')) continue;
			found.push(...pages(full, `${prefix}/${entry}`));
		} else if (entry.endsWith('.html')) {
			const name = entry.slice(0, -'.html'.length);
			found.push(name === 'index' ? prefix || '/' : `${prefix}/${name}`);
		}
	}
	return found;
}

const routes = pages().sort();
console.log(`postbuild: ${routes.length} prerendered pages`);

// ── 1. sitemap ──────────────────────────────────────────────────────────────
// One date for the whole build. Per-page git timestamps would be more precise
// but lastmod is a hint, and a wrong-but-confident date is worse than a broad one.
/**
 * What goes in the sitemap is decided by reading the built HTML, not by keeping
 * a second list in step with the routes. A page that declares itself noindex is
 * excluded, which covers the 404 fallback, the privacy policy and every draft
 * page without this file needing to know what a draft is.
 *
 * lastmod comes from the page's own dateModified or datePublished where its
 * structured data has one, and falls back to the build date. A page that has
 * not changed in a year should not claim it changed today: a sitemap that
 * re-dates everything on every deploy teaches a crawler to ignore the field.
 */
function htmlFor(route) {
	const candidates =
		route === '/'
			? ['index.html']
			: [`${route.slice(1)}.html`, join(route.slice(1), 'index.html')];
	for (const c of candidates) {
		try {
			return readFileSync(join(BUILD, c), 'utf8');
		} catch {
			// try the next shape
		}
	}
	return '';
}

/**
 * The photographs on a page, as absolute URLs, for the image sitemap.
 *
 * Nearly every image here is a bird somebody went a long way to photograph, and
 * Google Images is a real way birders find a guide. Listing them is how a
 * crawler learns they exist without having to render the page first.
 *
 * The logo is skipped, since it is in the header of all 28 pages and is not
 * content. Duplicates within a page are dropped: the lightbox renders some
 * photographs twice.
 */
function imagesIn(html) {
	const urls = new Set();
	for (const m of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/g)) {
		const src = m[1];
		if (!src.includes('/images/')) continue;
		if (src.includes('cardellina-logo')) continue;
		urls.add(`${ORIGIN}${base}/images/${src.replace(/^.*\/images\//, '')}`);
	}
	return [...urls];
}

const today = new Date().toISOString().slice(0, 10);
const NOINDEX = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i;
const DATE = /"date(?:Modified|Published)":"(\d{4}-\d{2}-\d{2})/;

const indexable = [];
let excluded = 0;
for (const route of routes) {
	const html = htmlFor(route);
	// The adapter's fallback is an unrendered shell: its noindex is added by the
	// error page once JavaScript runs, so there is nothing in the file to read.
	// It has to be named.
	if (route === '/404' || NOINDEX.test(html)) {
		excluded++;
		continue;
	}
	const found = html.match(DATE);
	indexable.push({ route, lastmod: found ? found[1] : today, images: imagesIn(html) });
}

const sitemap = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
	'\txmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
	...indexable.map(({ route, lastmod, images }) => {
		const loc = `${ORIGIN}${base}${route === '/' ? '/' : route}`;
		const pics = images
			.map((url) => `\n\t\t<image:image><image:loc>${url}</image:loc></image:image>`)
			.join('');
		return `\t<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>${pics}${pics ? '\n\t' : ''}</url>`;
	}),
	'</urlset>',
	''
].join('\n');
writeFileSync(join(BUILD, 'sitemap.xml'), sitemap);
const pictured = indexable.reduce((n, p) => n + p.images.length, 0);
console.log(
	`postbuild: sitemap.xml with ${indexable.length} URLs and ${pictured} images` +
		(excluded ? ` (${excluded} noindex excluded)` : '')
);

// robots.txt ships from static/, so rewrite it here rather than hardcoding an
// origin into a checked-in file that has to serve both deploy targets.
//
// The project URL is a full copy of the site on a domain we don't own, which is
// duplicate content competing with the real one — so that build tells crawlers
// to stay out. Once USE_CUSTOM_DOMAIN is set the base path is empty, this
// becomes the real site, and crawling opens up.
const robots = isProduction
	? ['# allow crawling everything by default', 'User-agent: *', 'Disallow:', '']
	: ['# staging copy on the GitHub Pages project URL, not the real site', 'User-agent: *', 'Disallow: /', ''];
robots.push(`Sitemap: ${ORIGIN}${base}/sitemap.xml`, '');
writeFileSync(join(BUILD, 'robots.txt'), robots.join('\n'));

// ── 2. redirect stubs ───────────────────────────────────────────────────────
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function stub(destination) {
	const href = `${base}${destination}`;
	// Canonical wants an absolute URL; the refresh and the link work relative,
	// which keeps the stub correct on the project URL too. No `noindex` — it
	// would contradict the canonical and can cost the destination its ranking.
	const canonical = ORIGIN ? `\n\t\t<link rel="canonical" href="${escape(ORIGIN + href)}" />` : '';
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="refresh" content="0; url=${escape(href)}" />${canonical}
		<title>Moved</title>
	</head>
	<body>
		<p>This page has moved to <a href="${escape(href)}">${escape(href)}</a>.</p>
	</body>
</html>
`;
}

const all = { ...redirects, ...wordpressOnly };
// A stub must never land on top of a real page. Where an old slug survived onto
// the new site unchanged, the page already answers that URL, and overwriting it
// leaves a page that redirects to itself — an endless reload for the reader.
const real = new Set(routes);
let written = 0;
for (const [from, to] of Object.entries(all)) {
	if (real.has(from)) {
		console.log(`postbuild: skipped ${from} — a real page already lives there`);
		continue;
	}
	const slug = from.replace(/^\//, '');
	const html = stub(to);
	// Both forms: /old-slug and /old-slug/ — the WordPress spent months sending
	// the trailing-slash version, so both are in the index.
	writeFileSync(join(BUILD, `${slug}.html`), html);
	mkdirSync(join(BUILD, slug), { recursive: true });
	writeFileSync(join(BUILD, slug, 'index.html'), html);
	written += 2;
}
console.log(`postbuild: ${written} redirect stubs for ${written / 2} old URLs`);
