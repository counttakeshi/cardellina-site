/**
 * D7. How often a bird is actually seen on a tour.
 *
 * This is the most honest thing the site could say and the hardest to fake:
 * "Horned Guan on 11 of 14 outings, 2023 to 2026" tells a birder what a target
 * list cannot. It is also the number that stops an enquiry arriving with
 * expectations nobody can meet.
 *
 * Empty until Ben has the data. A tour page shows nothing at all while its
 * list is empty, rather than a heading over no rows.
 *
 * NEEDS BEN: the counts, from your own records or eBird checklists. An
 * estimate is worse than silence here, because this is the one number a reader
 * will hold us to.
 */
export interface HitRate {
	/** Tour slug, as in tourDetails.ts. */
	tour: string;
	/** Common name, as in species.ts. */
	species: string;
	outingsWithSpecies: number;
	outings: number;
	/** The window the counts cover, e.g. "2023-2026". */
	period: string;
}

export const hitRates: HitRate[] = [];

/** The rates for one tour, highest first. Empty when there are none. */
export function hitRatesFor(tour: string): HitRate[] {
	return hitRates
		.filter((h) => h.tour === tour && h.outings > 0)
		.sort((a, b) => b.outingsWithSpecies / b.outings - a.outingsWithSpecies / a.outings);
}
