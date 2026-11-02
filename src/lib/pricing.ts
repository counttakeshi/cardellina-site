import fx from './data/fx.json';

/**
 * Prices are set in pesos. USD is a guide, worked out from the reference rate in
 * fx.json and rounded to the nearest 5 so it reads cleanly. Changing that one
 * number moves every USD figure on the site. scripts/check-fx.mjs says when to.
 */
export const PRICE_NOTE = 'Prices are set in Mexican pesos. USD amounts are approximate.';

export function approxUsd(mxn: number): string {
	return `~${(Math.round(mxn / fx.mxnPerUsd / 5) * 5).toLocaleString('en-US')} USD`;
}

export function fmtMxn(mxn: number): string {
	return `${mxn.toLocaleString('en-US')} MXN`;
}
