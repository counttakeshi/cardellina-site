/**
 * Opens every source URL in src/content and records whether it loaded.
 *
 * The species accounts were scaffolded with URLs built from each bird's eBird
 * code. Three of the five patterns are reliable; the xeno-canto and BirdLife
 * ones use their own taxonomy and silently resolve to nothing when a genus
 * differs. A bibliography of 404s is worse than a short one, so nothing claims
 * to be verified until it has actually been fetched.
 *
 * Rerunnable on purpose. These URLs rot, and the honest `accessed` date is the
 * last time somebody looked, not the day the file was written.
 *
 *   node scripts/check-sources.mjs           report only
 *   node scripts/check-sources.mjs --write   update verified and accessed
 *
 * Polite by default: one request at a time with a small pause. Checking 23
 * accounts is around 140 requests, so it takes a couple of minutes. That is
 * the right trade against being rate-limited by five different hosts.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(root, 'src', 'content');

const WRITE = process.argv.includes('--write');
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice('--only='.length);
const PAUSE_MS = 400;
const TIMEOUT_MS = 15000;

function files(dir) {
	const out = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) out.push(...files(full));
		else if (entry.endsWith('.md')) out.push(full);
	}
	return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** HEAD first, then GET: several of these hosts do not answer HEAD. */
async function check(url) {
	for (const method of ['HEAD', 'GET']) {
		try {
			const res = await fetch(url, {
				method,
				redirect: 'follow',
				signal: AbortSignal.timeout(TIMEOUT_MS),
				headers: { 'User-Agent': 'cardellina-site source check' }
			});
			if (res.ok) return { ok: true, status: res.status };
			// 405 means the method is wrong, not the URL. Try the next one.
			if (method === 'HEAD' && (res.status === 405 || res.status === 403)) continue;
			return { ok: false, status: res.status };
		} catch (err) {
			if (method === 'GET') return { ok: false, status: err.name === 'TimeoutError' ? 'timeout' : 'failed' };
		}
	}
	return { ok: false, status: 'failed' };
}

const today = new Date().toISOString().slice(0, 10);
const URL_LINE = /^(\s*)url:\s*"([^"]+)"\s*$/;

let checked = 0;
let good = 0;
const bad = [];

for (const file of files(CONTENT).sort()) {
	const rel = file.slice(root.length + 1).replace(/\\/g, '/');
	if (ONLY && !rel.includes(ONLY)) continue;

	const lines = readFileSync(file, 'utf8').split('\n');
	let changed = false;

	for (let i = 0; i < lines.length; i++) {
		const m = lines[i].match(URL_LINE);
		if (!m) continue;
		const [, indent, url] = m;

		const result = await check(url);
		checked++;
		if (result.ok) good++;
		else bad.push(`${rel}  ${result.status}  ${url}`);
		await sleep(PAUSE_MS);

		if (!WRITE) continue;

		// Rewrite the verified and accessed lines belonging to this url.
		for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
			if (lines[j].trim().startsWith('- ') || lines[j].startsWith('---')) break;
			if (/^\s*verified:/.test(lines[j])) {
				lines[j] = `${indent}verified: ${result.ok}`;
				changed = true;
			}
			if (/^\s*accessed:/.test(lines[j])) {
				lines[j] = `${indent}accessed: "${today}"`;
				changed = true;
			}
		}
	}

	if (changed) writeFileSync(file, lines.join('\n'));
}

console.log(`\ncheck-sources: ${checked} URLs, ${good} reachable, ${bad.length} not`);
if (bad.length) {
	console.log('\nCould not be opened:');
	for (const b of bad) console.log('  ' + b);
	console.log('\nFix the URL or remove it. A source nobody can open is worse than none.');
}
if (!WRITE) console.log('\nReport only. Rerun with --write to record the results.');
