/**
 * Crawls the built site from the homepage, following only real links, and
 * reports what a search engine would find wrong.
 *
 * Following only <a href> is the whole point. A page reachable by a tab, a
 * dropdown that needs a hover, or a fetch after hydration is not reachable to a
 * crawler reading static files, and that is exactly how the four multi-day
 * routes went missing: they were one click away for a person and infinitely far
 * for Googlebot.
 *
 * Four things, each with a different cause:
 *
 *   orphan          in the sitemap, but nothing links to it
 *   broken          a link to a page that is not there
 *   via stub        a link pointing at a redirect stub rather than the real page
 *   buried          more than three clicks from the homepage
 *
 * Exits non-zero if any live page is an orphan or any internal link is broken.
 *
 * Run: npm run seo:links
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(root, 'build');

const MAX_DEPTH = 3;

/** Every built page, mapped from its pretty URL to its file and HTML. */
const site = new Map();
(function walk(dir = BUILD, prefix = '') {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			if (['_app', 'images', 'og', 'muni'].includes(entry)) continue;
			walk(full, `${prefix}${entry}/`);
		} else if (entry.endsWith('.html')) {
			const file = `${prefix}${entry}`;
			const url = '/' + file.replace(/index\.html$/, '').replace(/\.html$/, '');
			const html = readFileSync(full, 'utf8');
			site.set(url.replace(/\/+$/, '') || '/', {
				file: '/' + file,
				html,
				stub: /http-equiv=["']refresh["']/i.test(html)
			});
		}
	}
})();

const normalise = (href, fromFile) => {
	if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) return null;
	let path;
	try {
		path = new URL(href, 'https://x' + fromFile).pathname;
	} catch {
		return null;
	}
	return path.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
};

const outbound = (url) => {
	const page = site.get(url);
	if (!page) return [];
	const out = new Set();
	for (const m of page.html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)) {
		const t = normalise(m[1], page.file);
		if (t && t !== url) out.add(t);
	}
	return [...out];
};

// ── the crawl ───────────────────────────────────────────────────────────────
const depth = new Map([['/', 0]]);
const broken = [];
const viaStub = [];
const queue = ['/'];

while (queue.length) {
	const url = queue.shift();
	for (const target of outbound(url)) {
		const page = site.get(target);
		if (!page) {
			broken.push(`${url} -> ${target}`);
			continue;
		}
		if (page.stub) viaStub.push(`${url} -> ${target}`);
		if (!depth.has(target)) {
			depth.set(target, depth.get(url) + 1);
			queue.push(target);
		}
	}
}

// ── the sitemap, which is what we are promising exists ──────────────────────
const sitemapPath = join(BUILD, 'sitemap.xml');
const listed = existsSync(sitemapPath)
	? [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
			new URL(m[1]).pathname.replace(/\/+$/, '') || '/'
		)
	: [];

const orphans = listed.filter((u) => !depth.has(u));
const buried = listed.filter((u) => (depth.get(u) ?? 0) > MAX_DEPTH);

// ── report ──────────────────────────────────────────────────────────────────
console.log(`seo:links: ${site.size} files, ${listed.length} in the sitemap, reached ${depth.size} from /`);
console.log('');

const section = (title, items, note) => {
	console.log(`${title}: ${items.length}`);
	if (note && items.length) console.log(`  ${note}`);
	for (const i of items) console.log(`  ${i}`);
	console.log('');
};

section('Orphans (in the sitemap, nothing links to them)', orphans);
section('Broken internal links', [...new Set(broken)]);
section(
	'Links pointing at a redirect stub',
	[...new Set(viaStub)],
	'These cost a redirect hop. Point them at the real page.'
);
section(
	`Pages more than ${MAX_DEPTH} clicks from the homepage`,
	buried.map((u) => `${u} (${depth.get(u)})`)
);

const deepest = [...depth.entries()].sort((a, b) => b[1] - a[1])[0];
if (deepest) console.log(`Deepest reached page: ${deepest[0]} at ${deepest[1]} clicks`);

if (orphans.length || broken.length) {
	console.log('\nseo:links: FAILED');
	process.exit(1);
}
console.log('\nseo:links: no orphans, no broken links');
