/**
 * Writes docs/seo/report.md: one row per page, with the things that are easy to
 * get wrong and invisible when you do.
 *
 * A title can be fine on the page and 94 characters in a search result. A
 * description can be missing on exactly one page of twenty-eight. A page can
 * have nothing linking to it. None of that shows up by looking at the site,
 * which is why it has gone unnoticed, and all of it is a number.
 *
 * Lengths are counted in characters because that is what the data is, but the
 * limits quoted are pixel limits in practice: Google renders roughly 580px of
 * title and 920px of description, and a wide title in capitals hits that sooner
 * than the count suggests. The thresholds here are the usual rules of thumb,
 * not promises.
 *
 * Run: npm run seo:report
 */
import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(root, 'build');
const SRC = join(root, 'src');
const OUT = join(root, 'docs', 'seo');

const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

function pages(dir = BUILD, prefix = '') {
	const found = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			if (['_app', 'images', 'og', 'muni'].includes(entry)) continue;
			found.push(...pages(full, `${prefix}${entry}/`));
		} else if (entry.endsWith('.html')) {
			found.push(`${prefix}${entry}`);
		}
	}
	return found;
}

const urlOf = (page) => '/' + page.replace(/index\.html$/, '').replace(/\.html$/, '');

/** Visible words, with the head, scripts and styles stripped. */
function wordCount(html) {
	const body = html.replace(/[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*/i, '');
	const text = body
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<[^>]+>/g, ' ');
	return text.split(/\s+/).filter(Boolean).length;
}

const docs = new Map();
for (const page of pages().sort()) {
	const html = readFileSync(join(BUILD, page), 'utf8');
	if (/http-equiv=["']refresh["']/i.test(html)) continue;
	// The adapter's fallback is an unrendered shell, so there is nothing in it to
	// measure: no title, no h1, no canonical until JavaScript runs. Reporting it
	// as 28 pages' worth of faults would bury the real ones.
	if (urlOf(page) === '/404') continue;
	docs.set(urlOf(page), { html, file: '/' + page });
}

// Internal links, both directions, so an orphan is visible as a zero.
const linksOut = new Map();
const linksIn = new Map();
for (const url of docs.keys()) {
	linksOut.set(url, new Set());
	linksIn.set(url, new Set());
}

/**
 * A link's target as a site path.
 *
 * Resolved against the page's FILE, not its URL. The build writes
 * /trips/san-cristobal.html, so `../birds/x` on that page means /birds/x.
 * Resolving against the pretty URL instead treats it as a directory and
 * produces /trips/birds/x, which is how a correct link reads as broken and a
 * linked page reads as an orphan.
 */
const normalise = (href, fromFile) => {
	if (/^(https?:|mailto:|tel:|#)/.test(href)) return null;
	let path;
	try {
		path = new URL(href, 'https://x' + fromFile).pathname;
	} catch {
		return null;
	}
	path = path.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
	return path;
};

for (const [url, { html, file }] of docs) {
	for (const m of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)) {
		const target = normalise(m[1], file);
		if (!target || target === url) continue;
		linksOut.get(url)?.add(target);
		if (linksIn.has(target)) linksIn.get(target).add(url);
	}
}

const rows = [];
const problems = [];

for (const [url, { html }] of docs) {
	const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
	const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] ?? '';
	const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '').trim();
	const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)?.[1] ?? '';
	const noindex = /name=["']robots["'][^>]*noindex/i.test(html);

	const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
	const noAlt = imgs.filter((t) => !/\balt=/.test(t)).length;
	const noDim = imgs.filter((t) => !/\bwidth=/.test(t) || !/\bheight=/.test(t)).length;

	const types = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
		.flatMap((m) => {
			try {
				const v = JSON.parse(m[1]);
				return Array.isArray(v) ? v.map((o) => o['@type']) : [v['@type']];
			} catch {
				return ['INVALID'];
			}
		})
		.filter(Boolean);

	rows.push({
		url,
		noindex,
		title,
		desc,
		h1,
		canonical,
		words: wordCount(html),
		inbound: linksIn.get(url)?.size ?? 0,
		outbound: linksOut.get(url)?.size ?? 0,
		noAlt,
		noDim,
		types: [...new Set(types)].join(', ')
	});

	if (noindex) continue;
	if (!title) problems.push(`${url}: no title`);
	else if (title.length > TITLE_MAX) problems.push(`${url}: title ${title.length} chars`);
	if (!desc) problems.push(`${url}: no meta description`);
	else if (desc.length > DESC_MAX) problems.push(`${url}: description ${desc.length} chars`);
	else if (desc.length < DESC_MIN) problems.push(`${url}: description only ${desc.length} chars`);
	if (!h1) problems.push(`${url}: no h1`);
	if (!canonical) problems.push(`${url}: no canonical`);
	if (noAlt) problems.push(`${url}: ${noAlt} image(s) with no alt`);
	if (noDim) problems.push(`${url}: ${noDim} image(s) with no dimensions`);
	if ((linksIn.get(url)?.size ?? 0) === 0 && url !== '/') problems.push(`${url}: nothing links to it`);
}

// Draft pages, counted by the gaps left for Ben.
const drafts = [];
function scanContent(dir) {
	let entries;
	try {
		entries = readdirSync(dir, { withFileTypes: true });
	} catch {
		return;
	}
	for (const e of entries) {
		const p = join(dir, e.name);
		if (e.isDirectory()) scanContent(p);
		else if (e.name.endsWith('.md')) {
			const text = readFileSync(p, 'utf8');
			if (!/^status:\s*draft/m.test(text)) continue;
			drafts.push({
				file: p.slice(root.length + 1).replace(/\\/g, '/'),
				gaps: (text.match(/COPY:/g) ?? []).length
			});
		}
	}
}
scanContent(join(SRC, 'content'));

const pad = (s, n) => String(s ?? '').padEnd(n);
const out = [];
out.push('# SEO report');
out.push('');
out.push(`Generated ${new Date().toISOString().slice(0, 10)} from the current build.`);
out.push('');
out.push(`${rows.filter((r) => !r.noindex).length} indexable pages, ${rows.filter((r) => r.noindex).length} noindex.`);
out.push('');
out.push('## Pages');
out.push('');
out.push('| Page | Title | len | Description | len | H1 | Words | In | Out | Img | JSON-LD |');
out.push('|---|---|--:|---|--:|---|--:|--:|--:|---|---|');
for (const r of rows.sort((a, b) => a.url.localeCompare(b.url))) {
	const img = r.noAlt || r.noDim ? `${r.noAlt} no alt, ${r.noDim} no dim` : 'ok';
	out.push(
		`| ${r.url}${r.noindex ? ' *(noindex)*' : ''} | ${r.title.replace(/\|/g, '\\|')} | ${r.title.length} | ${
			r.desc ? r.desc.slice(0, 60).replace(/\|/g, '\\|') + (r.desc.length > 60 ? '…' : '') : '—'
		} | ${r.desc.length || '—'} | ${r.h1.replace(/\|/g, '\\|') || '—'} | ${r.words} | ${r.inbound} | ${r.outbound} | ${img} | ${r.types || '—'} |`
	);
}

out.push('');
out.push('## Drafts');
out.push('');
if (drafts.length) {
	out.push('| File | COPY gaps |');
	out.push('|---|--:|');
	for (const d of drafts.sort((a, b) => a.file.localeCompare(b.file))) {
		out.push(`| ${d.file} | ${d.gaps} |`);
	}
} else {
	out.push('No draft pages yet.');
}

out.push('');
out.push('## Things to look at');
out.push('');
out.push(`Thresholds: title over ${TITLE_MAX} characters, description outside ${DESC_MIN} to ${DESC_MAX}.`);
out.push('');
if (problems.length) {
	for (const p of problems) out.push(`- ${p}`);
} else {
	out.push('Nothing flagged.');
}
out.push('');

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'report.md'), out.join('\n'));

console.log(`seo:report: ${rows.length} pages -> docs/seo/report.md`);
console.log(`seo:report: ${problems.length} things flagged, ${drafts.length} drafts`);
for (const p of problems.slice(0, 12)) console.log(`  ${p}`);
if (problems.length > 12) console.log(`  ... and ${problems.length - 12} more, in the file`);
void pad;
