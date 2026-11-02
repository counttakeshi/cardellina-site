import fx from './data/fx.json';

/**
 * Prices are set in pesos. USD is a guide, worked out from the reference rate in
 * fx.json. Changing that one number moves every USD figure on the site.
 * scripts/check-fx.mjs says when to.
 */
export const PRICE_NOTE = 'Prices are set in Mexican pesos. USD amounts are approximate.';

/** Rounds down to the nearest 5, and never sits just over a hundred: 405 shows as 395. */
export function approxUsd(mxn: number): string {
	let usd = Math.floor(mxn / fx.mxnPerUsd / 5) * 5;
	if (usd % 100 <= 5) usd -= usd % 100 + 5;
	return `~${usd.toLocaleString('en-US')} USD`;
}

export function fmtMxn(mxn: number): string {
	return `${mxn.toLocaleString('en-US')} MXN`;
}
