/**
 * Re-encodes the card and thumb crops that came out disproportionately heavy.
 *
 * Across 169 of them the median is 0.082 bytes per pixel; a handful of busy
 * frames — cloud forest, textured plumage, dappled trail — landed between 0.20
 * and 0.29, which is three times the median for images shown at the same size.
 * Those are the ones worth re-encoding, and only those: a blanket pass over
 * everything would spend quality on files that are already efficient.
 *
 * Each is rebuilt from its `-full.webp` rather than recompressed in place, so
 * the lossy step happens once from the largest copy we hold instead of stacking
 * on itself. Anything that fails to get meaningfully smaller is left alone.
 *
 * Run: node scripts/recompress.mjs
 */
import { readdirSync, statSync, existsSync, renameSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const IMG = join(dirname(fileURLToPath(import.meta.url)), '..', 'static', 'images');

const SHAPES = { card: { width: 800, height: 600 }, thumb: { width: 420, height: 420 } };
const HEAVY = 0.15; // bytes per pixel — comfortably above the 0.082 median
const QUALITY = 74;

let saved = 0;
let done = 0;

for (const file of readdirSync(IMG).sort()) {
	const m = file.match(/^(.*)-(card|thumb)\.webp$/);
	if (!m) continue;
	const [, stem, kind] = m;

	const size = statSync(join(IMG, file)).size;
	const { width, height } = SHAPES[kind];
	if (size / (width * height) < HEAVY) continue;

	const full = join(IMG, `${stem}-full.webp`);
	if (!existsSync(full)) {
		console.log(`  no full-size source, skipping  ${file}`);
		continue;
	}

	const tmp = join(IMG, `${file}.tmp`);
	const info = await sharp(full)
		.resize({ width, height, fit: 'cover', withoutEnlargement: true })
		.webp({ quality: QUALITY })
		.toFile(tmp);

	// Only keep it if it is actually an improvement worth the re-encode.
	if (info.size < size * 0.9) {
		unlinkSync(join(IMG, file));
		renameSync(tmp, join(IMG, file));
		saved += size - info.size;
		done++;
		console.log(
			`  ${file.slice(0, 50).padEnd(52)} ${(size / 1024).toFixed(0)}KB -> ` +
				`${(info.size / 1024).toFixed(0)}KB   ${info.width}x${info.height}`
		);
	} else {
		unlinkSync(tmp);
		console.log(`  already efficient, left alone  ${file}`);
	}
}

console.log(`\n  ${done} re-encoded, ${(saved / 1024).toFixed(0)}KB saved`);
