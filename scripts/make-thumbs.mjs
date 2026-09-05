/**
 * Generates the `thumb` variant: a 420x420 square crop.
 *
 * Everywhere this variant is used, the CSS draws a square tile of roughly 150
 * to 210 CSS pixels with `object-fit: cover` — the homepage strips and the tour
 * galleries. What those places were being served instead was a mixture of
 * `sq` (600x600), `md` (800 wide) and `card` (800x600): too big in every case,
 * and in the case of md and card the wrong shape, so the browser threw away a
 * third of each file to crop it back to a square.
 *
 * 420 is two device pixels per CSS pixel, which is what a phone screen wants
 * and no more.
 *
 * Sources are the existing `-full.webp` rather than the originals, which live
 * outside the repo. At up to 1600px they carry far more detail than a 420px
 * crop needs.
 *
 * Run: node scripts/make-thumbs.mjs
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(root, 'static', 'images');
const DATA = join(root, 'src', 'lib', 'data');

// Read the call sites rather than keeping a list by hand, so this cannot drift
// from what the pages actually render.
const stems = new Set();

const home = readFileSync(join(DATA, 'home.ts'), 'utf8');
for (const m of home.matchAll(/strip\('([^']+)'\)/g)) {
	stems.add(m[1].replace(/\.[^.]+$/, ''));
}

// Tour galleries: every thumb, whichever variant it currently names.
const tours = readFileSync(join(DATA, 'tourDetails.ts'), 'utf8');
for (const m of tours.matchAll(
	/"thumb": asset\("images\/(.+?)-(?:md|sq|card|thumb|full)\.webp"\)/g
)) {
	stems.add(m[1]);
}

// The logo, referenced directly rather than through a helper.
stems.add('cardellina-logo-r-ouLe0QMSi7BFi1G9');

let made = 0;
let skipped = 0;
let bytes = 0;
for (const stem of [...stems].sort()) {
	const out = join(IMG, `${stem}-thumb.webp`);
	if (existsSync(out)) {
		skipped++;
		continue;
	}
	const src = join(IMG, `${stem}-full.webp`);
	if (!existsSync(src)) {
		console.log(`  no full-size source  ${stem}`);
		continue;
	}
	const info = await sharp(src)
		.resize({ width: 420, height: 420, fit: 'cover', withoutEnlargement: true })
		.webp({ quality: 78 })
		.toFile(out);
	bytes += info.size;
	made++;
	if (info.width !== 420 || info.height !== 420) {
		// withoutEnlargement silently skips a cover crop when the source is
		// smaller than the target, which produces a non-square "square".
		console.log(`  NOT SQUARE  ${stem}  ${info.width}x${info.height}`);
	}
}
console.log(
	`\n  ${made} generated (${(bytes / 1024).toFixed(0)}KB), ${skipped} already existed, ` +
		`${stems.size} square tiles in total`
);
