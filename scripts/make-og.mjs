/**
 * Builds the 1200x630 social preview images in static/og/.
 *
 * When somebody pastes a link into WhatsApp, Facebook or Slack, the card that
 * appears is the first thing anyone sees of the site. Without an og:image they
 * get a bare grey rectangle, and a birding trip shared without a bird on it is
 * a wasted share.
 *
 * 1200x630 is the size every platform crops towards, so the crop happens here,
 * once, where a person can look at the result, rather than being left to each
 * platform to guess at.
 *
 * JPEG rather than WebP: the crawlers that read these are not browsers, and
 * several of them still do not handle WebP.
 *
 * Sources are the `-full.webp` variants already in static/images, which at up
 * to 1600px wide carry more than enough for this.
 *
 * Run: node scripts/make-og.mjs      (then commit static/og/)
 * Not run in CI. These change only when a hero changes.
 */
import { readFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(root, 'static', 'images');
const OUT = join(root, 'static', 'og');
const DATA = join(root, 'src', 'lib', 'data');

const WIDTH = 1200;
const HEIGHT = 630;
const QUALITY = 82;

/** `images/foo-full.webp` or `foo.jpg` to the stem `foo`. */
const stemOf = (s) =>
	s
		.replace(/^.*images\//, '')
		.replace(/-(full|md|card|sq|thumb|portrait)\.webp$/, '')
		.replace(/\.[^.]+$/, '');

/**
 * What to build, as { name, stem }.
 *
 * The data files are TypeScript, so they are read as text rather than imported.
 * That is what scripts/make-thumbs.mjs already does, and it has the same virtue:
 * the list cannot drift from the call sites, because it is the call sites.
 */
const jobs = [];

// The homepage hero, which is also the fallback for every page without one.
const home = readFileSync(join(root, 'src', 'routes', '+page.svelte'), 'utf8');
const homeHero = home.match(/const HERO_IMG = asset\('images\/([^']+)'\)/);
if (homeHero) jobs.push({ name: 'default', stem: stemOf(homeHero[1]) });

// Tour heroes, in file order, paired with the slug above them.
const tours = readFileSync(join(DATA, 'tourDetails.ts'), 'utf8');
for (const m of tours.matchAll(/"slug": "([^"]+)",[\s\S]{0,400}?"hero": asset\("images\/([^"]+)"\)/g)) {
	jobs.push({ name: `trips-${m[1]}`, stem: stemOf(m[2]) });
}

// Species account heroes.
const accounts = readFileSync(join(DATA, 'accounts.ts'), 'utf8');
for (const m of accounts.matchAll(/"slug": "([^"]+)",[\s\S]{0,900}?"src": asset\("images\/([^"]+)"\)/g)) {
	jobs.push({ name: `birds-${m[1]}`, stem: stemOf(m[2]) });
}

// Some accounts carry a placeholder instead of a photograph. They still need a
// file, because the route names its image by slug: a page whose og:image 404s
// shares worse than one with a generic bird on it, since most platforms then
// show nothing at all rather than falling back.
const withHero = new Set(jobs.filter((j) => j.name.startsWith('birds-')).map((j) => j.name));
for (const m of accounts.matchAll(/"slug": "([^"]+)"/g)) {
	const name = `birds-${m[1]}`;
	if (!withHero.has(name) && homeHero) jobs.push({ name, stem: stemOf(homeHero[1]) });
}

// Trip report heroes.
const reports = readFileSync(join(DATA, 'tripReports.ts'), 'utf8');
for (const m of reports.matchAll(/slug: "([^"]+)",[\s\S]{0,600}?hero: imageUrl\("([^"]+)"/g)) {
	jobs.push({ name: `trip-reports-${m[1]}`, stem: stemOf(m[2]) });
}

mkdirSync(OUT, { recursive: true });

let made = 0;
let missing = 0;
const seen = new Set();

for (const { name, stem } of jobs) {
	if (seen.has(name)) continue;
	seen.add(name);

	const src = join(IMG, `${stem}-full.webp`);
	if (!existsSync(src)) {
		console.log(`  no source for ${name}  (${stem}-full.webp)`);
		missing++;
		continue;
	}

	const out = join(OUT, `${name}.jpg`);
	const info = await sharp(src)
		.resize({ width: WIDTH, height: HEIGHT, fit: 'cover', position: 'attention' })
		.jpeg({ quality: QUALITY, mozjpeg: true })
		.toFile(out);

	made++;
	console.log(`  ${name.padEnd(34)} ${(info.size / 1024).toFixed(0).padStart(4)}KB   from ${stem}`);
}

console.log(`\nmake-og: ${made} images written to static/og/`);
if (missing) console.log(`make-og: ${missing} had no -full.webp source`);
