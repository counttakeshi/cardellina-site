/**
 * Builds the quiz as a standalone site, with none of cardellina.com in it.
 *
 *     node scripts/build-quiz-site.mjs <repo-name>
 *
 * Writes ./quiz-site, which is a complete GitHub Pages site: push it to a repo
 * of that name, point Pages at the branch root, and it serves at
 *   https://<user>.github.io/<repo-name>/
 *
 * Why a copy rather than a second SvelteKit config: the quiz is already a
 * prerendered route in the main build. Rebuilding it under a different base
 * path and lifting the three files out is less machinery than maintaining a
 * parallel app, and it cannot drift from the quiz people actually use.
 *
 * The editor is deliberately left behind. It writes through Vite middleware
 * that only exists under `npm run dev`, so on a published site its save button
 * can only ever fall back to downloading a file - a confusing thing to hand a
 * guest.
 */

import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const repo = process.argv[2];

if (!repo) {
	console.error('usage: node scripts/build-quiz-site.mjs <repo-name>');
	console.error('  the repo name becomes the URL path, so it must match the GitHub repo exactly');
	process.exit(1);
}

const BUILD = join(root, 'build');
const OUT = join(root, 'quiz-site');

// ── 1. build the site under the new base path ───────────────────────────────
// GitHub Pages serves a project site from /<repo>, so every asset URL has to
// carry that prefix. This is the same switch the main deploy workflow uses.
console.log(`Building with BASE_PATH=/${repo} …`);
execSync('npm run build', {
	cwd: root,
	stdio: 'inherit',
	env: { ...process.env, BASE_PATH: `/${repo}` }
});

// ── 2. take only the quiz ───────────────────────────────────────────────────
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// _app holds the JS and CSS for every route. The quiz's own chunk is most of
// its weight, and the rest is small enough that pruning by hand would risk
// breaking a shared import for no real saving.
cpSync(join(BUILD, '_app'), join(OUT, '_app'), { recursive: true });

for (const file of [
	'quiz.webmanifest',
	'quiz-sw.js',
	'quiz-icon-192.png',
	'quiz-icon-512.png',
	'quiz-icon-maskable-512.png',
	'favicon-32.png',
	'apple-touch-icon.png'
]) {
	const from = join(BUILD, file);
	if (existsSync(from)) cpSync(from, join(OUT, file));
}

// The quiz stays at /quiz rather than moving to the root. Moving it would
// invalidate the web manifest's start_url and scope, and the service worker
// registers itself against `${base}/quiz` - so a page served from the root
// would fail to install as an app, silently. A redirect costs one file.
cpSync(join(BUILD, 'quiz.html'), join(OUT, 'quiz.html'));

const redirect = (to) =>
	[
		'<!doctype html>',
		'<meta charset="utf-8">',
		`<meta http-equiv="refresh" content="0; url=${to}">`,
		`<link rel="canonical" href="${to}">`,
		'<meta name="robots" content="noindex">',
		'<title>Bird quiz</title>',
		`<p>Taking you to the <a href="${to}">bird quiz</a>.</p>`,
		''
	].join('\n');

writeFileSync(join(OUT, 'index.html'), redirect(`/${repo}/quiz`));

// ── 3. the two files GitHub Pages needs ─────────────────────────────────────
// Pages runs Jekyll by default, and Jekyll skips any directory whose name
// starts with an underscore. Without this the entire _app folder - which is to
// say all the JavaScript - is silently dropped and the page renders blank.
writeFileSync(join(OUT, '.nojekyll'), '');

// Pages has no server-side routing, so a mistyped path lands on 404.html.
// Serving a copy of the app there would break: its asset URLs are relative, so
// they would resolve against whatever wrong path was typed. Redirect instead.
writeFileSync(join(OUT, '404.html'), redirect(`/${repo}/quiz`));

// ── 4. keep it out of search results ────────────────────────────────────────
// The page already carries a noindex meta tag; this is the belt to that
// braces, and says plainly that the site is not meant to be crawled.
writeFileSync(
	join(OUT, 'robots.txt'),
	['User-agent: *', 'Disallow: /', ''].join('\n')
);

// ── 5. report ───────────────────────────────────────────────────────────────
function measure(dir) {
	let bytes = 0;
	let files = 0;
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			const [b, f] = measure(full);
			bytes += b;
			files += f;
		} else {
			bytes += statSync(full).size;
			files += 1;
		}
	}
	return [bytes, files];
}

const [bytes, files] = measure(OUT);
console.log();
console.log(`quiz-site/  ${files} files, ${(bytes / 1048576).toFixed(1)} MB`);
console.log(`Will serve at https://<your-github-user>.github.io/${repo}/`);
console.log('Push the contents of quiz-site/ to the repo root, then set');
console.log('Settings -> Pages -> Source: Deploy from a branch, main, / (root).');
