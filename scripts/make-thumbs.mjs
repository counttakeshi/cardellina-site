/**
 * Generates the `thumb` variant: a 420x420 square crop.
 *
 * The homepage strips render at 210 CSS pixels but were being served the 600px
 * `sq` crop, and the logo renders at 420 but was served the 800px `md`. 420 is
 * exactly two device pixels per CSS pixel, which is what a phone screen wants
 * and no more.
 *
 * Sources are the existing `-full.webp` rather than the originals, which live
 * outside the repo. At 1600px wide they carry far more detail than a 420px
 * crop needs, so nothing is lost.
 *
 * Run: node scripts/make-thumbs.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(root, 'static', 'images');

// Every file the homepage strips ask for, read out of the data rather than
// copied by hand, so this cannot drift from what the page actually renders.
const home = readFileSync(join(root, 'src', 'lib', 'data', 'home.ts'), 'utf8');
const stems = new Set();
for (const m of home.matchAll(/strip\('([^']+)'\)/g)) {
	stems.add(m[1].replace(/\.[^.]+$/, ''));
}
// The logo is referenced directly rather than through a helper.
stems.add('cardellina-logo-r-ouLe0QMSi7BFi1G9');

let made = 0;
let saved = 0;
for (const stem of [...stems].sort()) {
	const src = join(IMG, `${stem}-full.webp`);
	if (!existsSync(src)) {
		console.log(`  MISSING SOURCE  ${stem}-full.webp`);
		continue;
	}
	const out = join(IMG, `${stem}-thumb.webp`);
	const info = await sharp(src)
		.resize({ width: 420, height: 420, fit: 'cover', withoutEnlargement: true })
		.webp({ quality: 80 })
		.toFile(out);

	// What it replaces, so the saving is measured rather than assumed.
	const oldFile = join(IMG, `${stem}-${stem.startsWith('cardellina-logo') ? 'md' : 'sq'}.webp`);
	const before = existsSync(oldFile) ? readFileSync(oldFile).length : 0;
	saved += before - info.size;
	made++;
	console.log(
		`  ${stem.slice(0, 44).padEnd(44)} ${info.width}x${info.height}  ` +
			`${(before / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB`
	);
}
console.log(`\n  ${made} thumbs, ${(saved / 1024).toFixed(0)}KB saved per full page load`);
