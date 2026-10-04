/**
 * What else on the site is about the thing you are reading.
 *
 * Almost all of this is derived rather than listed. The data already knows that
 * the Pink-headed Warbler is a target of the San Cristóbal tour and that the
 * Tacaná report mentions a Horned Guan; a hand-kept list of related links would
 * only be a second copy of that, free to drift and certain to.
 *
 * Two things cannot be derived and so are listed: which route visits which
 * site, which lives in the ledger, and which report came out of which tour,
 * which is in nobody's head but Ben's.
 */
import ledger from './data/ledger.json';
import { accounts } from './data/accounts';
import { tourDetails } from './data/tourDetails';
import { tripReports } from './data/tripReports';

export interface RelatedLink {
	label: string;
	href: string;
}

/**
 * Ledger site keys to the day tour that goes there.
 *
 * NEEDS BEN: confirm. Six of the eighteen ledger locations have a day tour of
 * their own; the rest are visited only as part of a route.
 */
export const SITE_TO_DAY_TOUR: Record<string, string> = {
	sancris: 'san-cristobal',
	sumidero: 'sumidero-canyon',
	comitan: 'comitan',
	montebello: 'montebello-lakes',
	sepultura: 'la-sepultura',
	palenque: 'palenque'
};

const DAY_TOUR_TO_SITE: Record<string, string> = Object.fromEntries(
	Object.entries(SITE_TO_DAY_TOUR).map(([site, tour]) => [tour, site])
);

/**
 * Which report came out of which tour.
 *
 * Confirmed by Ben in the SEO workbook, rows 10 to 14: the four the brief
 * proposed were right, and northern-swamps, which the brief left open, belongs
 * to the Palenque day tour.
 */
export const REPORT_TO_TOURS: Record<string, string[]> = {
	'tacana-volcano': ['volcano-endemics', 'full-endemics'],
	'palenque-and-catazaja': ['palenque', 'lowland-jungles'],
	'san-cristobal-full-day': ['san-cristobal'],
	'san-cristobal-to-montebello': ['san-cristobal', 'montebello-lakes'],
	'northern-swamps': ['palenque']
};

/** The inverse, so a tour can name its reports without a second list. */
export const TOUR_TO_REPORTS: Record<string, string[]> = (() => {
	const out: Record<string, string[]> = {};
	for (const [report, tours] of Object.entries(REPORT_TO_TOURS)) {
		for (const tour of tours) (out[tour] ??= []).push(report);
	}
	return out;
})();

const tourTitle = (slug: string) => tourDetails.find((t) => t.slug === slug)?.title;
const reportTitle = (slug: string) => tripReports.find((r) => r.slug === slug)?.title;

/** Account slugs by the bird's display name, for matching names in prose. */
const ACCOUNT_BY_NAME = new Map(accounts.map((a) => [a.title.toLowerCase(), a]));

/** Every bird with a full account, as a link. */
function accountLink(name: string, base: string): RelatedLink | null {
	const account = ACCOUNT_BY_NAME.get(name.trim().toLowerCase());
	return account ? { label: account.title, href: `${base}/birds/${account.slug}` } : null;
}

/** Every bird a tour names, from whichever field its kind keeps them in. */
function birdsOfTour(slug: string): string[] {
	const tour = tourDetails.find((t) => t.slug === slug);
	if (!tour) return [];
	const named = tour.kind === 'day' ? tour.targets : tour.headlineBirds;
	return [...named, ...tour.gallery.map((p) => p.caption)];
}

// ── blocks for a tour page ──────────────────────────────────────────────────

/** Target birds that have an account of their own. */
export function tourBirdLinks(slug: string, base: string): RelatedLink[] {
	const seen = new Set<string>();
	const out: RelatedLink[] = [];
	for (const name of birdsOfTour(slug)) {
		const link = accountLink(name, base);
		if (link && !seen.has(link.href)) {
			seen.add(link.href);
			out.push(link);
		}
	}
	return out;
}

/**
 * Routes that take in this day tour's site.
 *
 * Only day tours have one: a route is not "included in" another route, and the
 * ledger does not claim it is.
 */
export function routesIncludingSite(daySlug: string, base: string): RelatedLink[] {
	const site = DAY_TOUR_TO_SITE[daySlug];
	if (!site) return [];
	const tours = ledger.tours as Record<string, { sites?: string[] }>;
	return Object.entries(tours)
		.filter(([, t]) => (t.sites ?? []).includes(site))
		.map(([key]) => ({ label: tourTitle(key) ?? key, href: `${base}/trips/${key}` }))
		.filter((l) => l.label);
}

/** Reports that came out of this tour. */
export function reportsForTour(slug: string, base: string): RelatedLink[] {
	return (TOUR_TO_REPORTS[slug] ?? [])
		.map((r) => ({ label: reportTitle(r) ?? r, href: `${base}/trip-reports/${r}` }))
		.filter((l) => l.label);
}

// ── blocks for a species account ────────────────────────────────────────────

/**
 * Tours that look for this bird: the ones that name it as a target, plus the
 * day tour for any ledger site that lists it among its key species.
 */
export function toursForBird(birdName: string, base: string): RelatedLink[] {
	const name = birdName.trim().toLowerCase();
	const slugs = new Set<string>();

	for (const tour of tourDetails) {
		if (birdsOfTour(tour.slug).some((b) => b.trim().toLowerCase() === name)) slugs.add(tour.slug);
	}

	const locations = ledger.locations as Record<string, { key_species?: string[] }>;
	for (const [key, loc] of Object.entries(locations)) {
		if (!(loc.key_species ?? []).some((s) => s.trim().toLowerCase() === name)) continue;
		const tour = SITE_TO_DAY_TOUR[key];
		if (tour) slugs.add(tour);
	}

	return [...slugs]
		.map((s) => ({ label: tourTitle(s) ?? s, href: `${base}/trips/${s}` }))
		.filter((l) => l.label);
}

/** Reports whose text names this bird. */
export function reportsForBird(birdName: string, base: string): RelatedLink[] {
	const name = birdName.trim().toLowerCase();
	return tripReports
		.filter((r) =>
			`${r.title} ${r.subtitle} ${r.description} ${r.body}`.toLowerCase().includes(name)
		)
		.map((r) => ({ label: r.title, href: `${base}/trip-reports/${r.slug}` }));
}

// ── blocks for a trip report ────────────────────────────────────────────────

export function toursForReport(slug: string, base: string): RelatedLink[] {
	return (REPORT_TO_TOURS[slug] ?? [])
		.map((t) => ({ label: tourTitle(t) ?? t, href: `${base}/trips/${t}` }))
		.filter((l) => l.label);
}

/** Birds named in the report that have an account to send the reader to. */
export function birdsInReport(slug: string, base: string): RelatedLink[] {
	const report = tripReports.find((r) => r.slug === slug);
	if (!report) return [];
	const text = `${report.title} ${report.subtitle} ${report.description} ${report.body}`.toLowerCase();
	return accounts
		.filter((a) => text.includes(a.title.toLowerCase()))
		.map((a) => ({ label: a.title, href: `${base}/birds/${a.slug}` }));
}
