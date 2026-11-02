/**
 * Compares the market rate with the reference rate behind the site's USD prices.
 *
 * Every USD figure is pesos divided by the reference rate, so when the market
 * has moved 5% from that rate, every figure is about 5% wrong. Prints the result,
 * and in GitHub Actions passes any alert to the workflow, which opens an issue.
 *
 * A feed that fails or stops updating throws. The run then fails and GitHub
 * emails about that instead, so a broken check does not look like a calm market.
 *
 * Set TEST_RATE to pretend the market is at that rate.
 *
 * Run: npm run fx:check
 */
import { appendFileSync, readFileSync } from 'node:fs';

const THRESHOLD = 0.05;
const FEED = 'https://api.frankfurter.dev/v1/latest?base=USD&symbols=MXN';
const MAX_FEED_AGE_DAYS = 10;

async function marketRate() {
	if (process.env.TEST_RATE) return Number(process.env.TEST_RATE);

	const res = await fetch(FEED);
	if (!res.ok) throw new Error(`Rate feed returned ${res.status}`);
	const { date, rates } = await res.json();

	const ageDays = (Date.now() - Date.parse(date)) / 86_400_000;
	if (ageDays > MAX_FEED_AGE_DAYS) throw new Error(`Rate feed has not updated since ${date}`);
	return rates.MXN;
}

const { mxnPerUsd } = JSON.parse(
	readFileSync(new URL('../src/lib/data/fx.json', import.meta.url), 'utf8')
);
const market = await marketRate();
if (!(market > 0)) throw new Error(`Not a usable rate: ${market}`);

// Shown USD is pesos / reference and true USD is pesos / market, so their ratio
// is market / reference whatever the tour.
const drift = market / mxnPerUsd - 1;
const summary = `market ${market.toFixed(2)}, site ${mxnPerUsd.toFixed(2)}`;

if (Math.abs(drift) < THRESHOLD) {
	console.log(`USD prices are within ${(Math.abs(drift) * 100).toFixed(1)}%: ${summary}`);
} else {
	const direction = drift > 0 ? 'high' : 'low';
	const alert = `USD prices read ${(Math.abs(drift) * 100).toFixed(1)}% ${direction}: ${summary}`;
	console.log(alert);
	if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `alert=${alert}\n`);
}
