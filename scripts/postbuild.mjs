/**
 * Runs after `vite build`, over the finished `build/` directory.
 *
 * Two jobs, both of which have to happen after prerendering because both need
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
import { readdirSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
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
const today = new Date().toISOString().slice(0, 10);
const sitemap = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
	...routes.map((route) => {
		const loc = `${ORIGIN}${base}${route === '/' ? '/' : route}`;
		return `\t<url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`;
	}),
	'</urlset>',
	''
].join('\n');
writeFileSync(join(BUILD, 'sitemap.xml'), sitemap);
console.log(`postbuild: sitemap.xml with ${routes.length} URLs`);

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
