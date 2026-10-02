/**
 * Parses every JSON-LD block in build/ and fails on anything malformed.
 *
 * Structured data is the one thing on the site with no visible symptom when it
 * breaks: a trailing comma or a stray angle bracket means Google silently
 * ignores the block, the page looks perfect, and nobody finds out for months.
 * This is the check that would have caught it on the build instead.
 *
 * It checks shape, not truth. Whether the price is right is Ben's problem; this
 * only insists that a thing claiming to be an Offer has a price at all.
 *
 * Run: npm run seo:jsonld
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(root, 'build');

/** Properties without which a type is not worth emitting. */
const REQUIRED = {
	WebSite: ['name', 'url'],
	TravelAgency: ['@id', 'name', 'url'],
	BreadcrumbList: ['itemListElement'],
	TouristTrip: ['name', 'provider'],
	Article: ['headline', 'publisher'],
	Person: ['@id', 'name'],
	Offer: ['price', 'priceCurrency']
};

function pages(dir = BUILD, prefix = '') {
	const found = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			if (entry.startsWith('_') || entry === 'images' || entry === 'og' || entry === 'muni') continue;
			found.push(...pages(full, `${prefix}${entry}/`));
		} else if (entry.endsWith('.html')) {
			found.push(`${prefix}${entry}`);
		}
	}
	return found;
}

/** Walks every nested object so an Offer inside a TouristTrip is checked too. */
function* nodes(value) {
	if (Array.isArray(value)) {
		for (const v of value) yield* nodes(v);
		return;
	}
	if (value && typeof value === 'object') {
		if (typeof value['@type'] === 'string') yield value;
		for (const v of Object.values(value)) yield* nodes(v);
	}
}

const BLOCK = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

let blocks = 0;
let checked = 0;
const problems = [];
const withData = [];
const seenTypes = new Map();

for (const page of pages().sort()) {
	const html = readFileSync(join(BUILD, page), 'utf8');
	const url = '/' + page.replace(/index\.html$/, '').replace(/\.html$/, '');
	let found = 0;

	for (const m of html.matchAll(BLOCK)) {
		blocks++;
		found++;
		let parsed;
		try {
			parsed = JSON.parse(m[1]);
		} catch (err) {
			problems.push(`${url}  invalid JSON: ${err.message}`);
			continue;
		}

		// A raw `<` here would mean the escaping in Seo.svelte stopped working,
		// which is the failure that ends a script tag early and spills the data
		// into the page as readable text.
		if (m[1].includes('<')) problems.push(`${url}  unescaped < in a JSON-LD block`);

		for (const node of nodes(parsed)) {
			const type = node['@type'];
			seenTypes.set(type, (seenTypes.get(type) ?? 0) + 1);
			const required = REQUIRED[type];
			if (!required) continue;
			checked++;
			for (const key of required) {
				if (node[key] === undefined || node[key] === '') {
					problems.push(`${url}  ${type} is missing ${key}`);
				}
			}
		}
	}

	if (found) withData.push(url);
}

console.log(`check-jsonld: ${blocks} blocks across ${withData.length} pages, ${checked} typed nodes checked`);
console.log('\ntypes found:');
for (const [type, n] of [...seenTypes].sort((a, b) => b[1] - a[1])) {
	console.log(`  ${String(n).padStart(3)}  ${type}`);
}

if (problems.length) {
	console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:`);
	for (const p of problems) console.log(`  ${p}`);
	process.exit(1);
}

// One page of each shape is enough to test by hand; the rest are the same code.
const SAMPLES = ['/', '/trips/san-cristobal', '/trips/full-endemics', '/birds/horned-guan', '/trip-reports/tacana-volcano', '/guides'];
console.log('\nPaste these into the Rich Results Test');
console.log('(https://search.google.com/test/rich-results) once the site is live:');
for (const s of SAMPLES.filter((s) => withData.includes(s))) {
	console.log(`  https://www.cardellina.com${s}`);
}
console.log('\ncheck-jsonld: no problems');
