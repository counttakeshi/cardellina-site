/**
 * Two CSVs about the images, written from the finished build.
 *
 *   docs/seo/image-audit.csv    every rendered <img>, with its alt, declared
 *                               dimensions, loading attribute and file size
 *   docs/seo/image-renames.csv  a proposed rename for the files still carrying
 *                               the old trading name
 *
 * Neither renames anything. The second is a plan for later: renaming an image
 * changes its URL, and the old URLs are the ones Google Images already holds.
 * That is a migration with redirects, not a find and replace, and it does not
 * belong in the same change as everything else here.
 *
 * Run: npm run seo:images
 */
import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(root, 'build');
const IMG = join(root, 'static', 'images');
const OUT = join(root, 'docs', 'seo');

/** CSV field: quote always, double any quote inside. Alt text contains commas. */
const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const row = (...cells) => cells.map(cell).join(',');

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

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1] ?? '';

mkdirSync(OUT, { recursive: true });

// ── the audit ───────────────────────────────────────────────────────────────
const lines = [row('page', 'file', 'alt', 'width', 'height', 'loading', 'bytes')];
let total = 0;
let audited = 0;
let noAlt = 0;
let noDim = 0;

for (const page of pages().sort()) {
	const url = '/' + page.replace(/index\.html$/, '').replace(/\.html$/, '');
	const html = readFileSync(join(BUILD, page), 'utf8');

	// Redirect stubs are not pages. There are 62 of them and they carry nothing
	// but the logo, which would be most of the rows in the file.
	if (/http-equiv=["']refresh["']/i.test(html)) continue;
	audited++;

	for (const m of html.matchAll(/<img\b[^>]*>/g)) {
		const tag = m[0];
		const src = attr(tag, 'src');
		const file = src.replace(/^.*\/images\//, '');
		const alt = attr(tag, 'alt');
		const width = attr(tag, 'width');
		const height = attr(tag, 'height');

		let bytes = '';
		const onDisk = join(IMG, file);
		if (file && existsSync(onDisk)) bytes = statSync(onDisk).size;

		total++;
		// An empty alt is correct for decoration, so only a missing one counts.
		if (!/\balt=/.test(tag)) noAlt++;
		if (!width || !height) noDim++;

		lines.push(row(url, file || src, alt, width, height, attr(tag, 'loading'), bytes));
	}
}

writeFileSync(join(OUT, 'image-audit.csv'), lines.join('\n') + '\n');
console.log(`image-audit: ${total} images across ${audited} pages`);
console.log(`image-audit: ${noAlt} with no alt attribute, ${noDim} with no dimensions`);

// ── the proposed renames ────────────────────────────────────────────────────
// "sabes_aves" and the misspelled "saves_aves" are the business's former
// trading name, sitting in the filename of photographs that rank. A filename is
// a weak ranking signal but a real one, and these say the wrong brand.
const OLD_NAME = /^(sabes_aves|saves_aves)[_-]/;
const renames = [row('current', 'proposed', 'variants', 'note')];
const stems = new Map();

for (const file of readdirSync(IMG)) {
	const stem = file.replace(/-(full|md|card|sq|thumb|portrait)\.webp$/, '');
	if (!OLD_NAME.test(stem)) continue;
	stems.set(stem, (stems.get(stem) ?? 0) + 1);
}

for (const [stem, variants] of [...stems].sort()) {
	// Strip the old brand and the trailing Zyro id, and tidy the separators.
	const proposed = stem
		.replace(OLD_NAME, '')
		.replace(/_/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
	renames.push(
		row(
			stem,
			proposed,
			variants,
			'Changes the URL. Needs redirects for anything already indexed in Google Images.'
		)
	);
}

writeFileSync(join(OUT, 'image-renames.csv'), renames.join('\n') + '\n');
console.log(
	`image-renames: ${stems.size} photos, ${[...stems.values()].reduce((a, b) => a + b, 0)} files`
);
