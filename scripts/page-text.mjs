/**
 * Writes the visible text of every built page to a directory, one .txt per page.
 *
 * This exists for one job: proving that a change which was meant to be invisible
 * actually was. Capture once from an untouched build, then capture again after a
 * task and diff the two directories; anything that moves is either a change the
 * task asked for or a regression, and there is no third option.
 *
 * Head tags, structured data and attributes are all deliberately excluded — the
 * SEO work adds a great deal of all three, and if they counted as "text" every
 * diff would be noise. What is compared here is what a reader sees.
 *
 * Redirect stubs are skipped. They carry no content, there are 62 of them, and
 * postbuild rewrites them on every run.
 *
 * Run: node scripts/page-text.mjs <out-dir> [build-dir]
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, process.argv[2] ?? 'docs/seo/baseline');
const buildDir = join(root, process.argv[3] ?? 'build');

/** Every .html under the build, as paths relative to it. */
function pages(dir, prefix = '') {
	const found = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			if (entry.startsWith('_') || entry === 'images' || entry === 'muni') continue;
			found.push(...pages(full, `${prefix}${entry}/`));
		} else if (entry.endsWith('.html')) {
			found.push(`${prefix}${entry}`);
		}
	}
	return found;
}

/** The words a reader would see, with the markup and the head stripped out. */
function visibleText(html) {
	const body = html.replace(/[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*/i, '');
	return body
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<!--[\s\S]*?-->/g, '')
		// Block-level tags become line breaks so the diff stays readable.
		.replace(/<\/(p|div|section|article|h[1-6]|li|tr|figcaption|header|footer|nav)>/gi, '\n')
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.split('\n')
		.map((line) => line.replace(/[ \t]+/g, ' ').trim())
		.filter(Boolean)
		.join('\n');
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

let written = 0;
let stubs = 0;
for (const page of pages(buildDir).sort()) {
	const html = readFileSync(join(buildDir, page), 'utf8');
	if (/http-equiv=["']refresh["']/i.test(html)) {
		stubs++;
		continue;
	}
	const out = join(outDir, page.replace(/\.html$/, '.txt'));
	mkdirSync(dirname(out), { recursive: true });
	writeFileSync(out, visibleText(html) + '\n');
	written++;
}

console.log(`page-text: ${written} pages written to ${process.argv[2] ?? 'docs/seo/baseline'}`);
console.log(`page-text: ${stubs} redirect stubs skipped`);
