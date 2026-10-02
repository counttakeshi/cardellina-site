/**
 * Structured data builders.
 *
 * Every object here is handed to <Seo jsonLd={...}>, which serialises it into a
 * script tag. Nothing in this file renders anything a reader sees.
 *
 * Two deliberate absences, both because adding them would do harm:
 *
 *   aggregateRating and review. Google's review snippet guidance says a page
 *   where the business controls the reviews about itself is ineligible, and
 *   that ratings must not be aggregated from other sites. The reviews on the
 *   homepage are ours, copied from Google and Tripadvisor; marking them up
 *   would be the exact pattern the guidance names.
 *   https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 *
 *   FAQPage. Google stopped showing FAQ rich results on 7 May 2026, so the
 *   markup now buys nothing and still has to be kept true to the page. The
 *   questions on /contact are plain HTML and stay that way.
 */
import { base } from '$app/paths';
import {
	SITE_ORIGIN,
	BRAND_NAME,
	CONTACT_EMAIL,
	PHONE,
	SOCIAL_PROFILES
} from './config';
import type { Crumb } from './breadcrumbs';

/** The organisation every other object points at instead of describing again. */
export const ORG_ID = `${SITE_ORIGIN}/#organization`;

/** A Person node id, so founder and author can reference rather than repeat. */
export const personId = (slug: string) => `${SITE_ORIGIN}/guides#${slug}`;

/**
 * An absolute URL on the canonical origin.
 *
 * Image paths in the data already carry the deploy base, which on the staging
 * build is /cardellina-site. Structured data has to name the real site, so the
 * base comes off before the origin goes on.
 */
export function absolute(url: string): string {
	if (!url) return '';
	if (/^https?:\/\//.test(url)) return url;
	let path = url;
	if (base && path.startsWith(base)) path = path.slice(base.length);
	return `${SITE_ORIGIN}/${path.replace(/^\//, '')}`;
}

/** Drops anything undefined or empty, so no key is emitted holding nothing. */
function compact<T extends Record<string, unknown>>(obj: T): T {
	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(obj)) {
		if (v === undefined || v === null || v === '') continue;
		if (Array.isArray(v) && v.length === 0) continue;
		out[k] = v;
	}
	return out as T;
}

/** Citations are stored as trusted HTML. Structured data wants the words. */
export function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/\s+/g, ' ')
		.trim();
}

// ── B1 ──────────────────────────────────────────────────────────────────────

/**
 * WebSite, which is how Google decides what to call the site in a result.
 * Without it the name is guessed from the title tag, which here would read
 * "Cardellina - Chiapas Birding Tours" on every page.
 * https://developers.google.com/search/docs/appearance/site-names
 */
export function websiteJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: BRAND_NAME,
		alternateName: ['Cardellina'],
		url: `${SITE_ORIGIN}/`
	};
}

/**
 * The business itself.
 *
 * alternateName carries "Sabes Aves", the name the business traded under
 * before. Reviews, listings and forum posts still say it, and this is what
 * tells a search engine the two names are one entity rather than two.
 */
export function organisationJsonLd(opts: {
	logo: string;
	image: string;
	languages: string[];
	founderSlugs: string[];
}) {
	return compact({
		'@context': 'https://schema.org',
		'@type': 'TravelAgency',
		'@id': ORG_ID,
		name: BRAND_NAME,
		alternateName: ['Cardellina', 'Sabes Aves'],
		url: `${SITE_ORIGIN}/`,
		logo: {
			'@type': 'ImageObject',
			url: absolute(opts.logo),
			width: 420,
			height: 420
		},
		image: absolute(opts.image),
		email: CONTACT_EMAIL,
		telephone: PHONE,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'San Cristóbal de las Casas',
			addressRegion: 'Chiapas',
			addressCountry: 'MX'
		},
		areaServed: {
			'@type': 'AdministrativeArea',
			name: 'Chiapas'
		},
		knowsLanguage: opts.languages,
		founder: opts.founderSlugs.map((slug) => ({ '@id': personId(slug) })),
		sameAs: SOCIAL_PROFILES
	});
}

// ── B2 ──────────────────────────────────────────────────────────────────────

/** Mirrors the visible trail exactly. One item is invalid, so it emits nothing. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
	if (crumbs.length < 2) return null;
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: `${SITE_ORIGIN}${c.path === '/' ? '/' : c.path}`
		}))
	};
}

// ── B3 ──────────────────────────────────────────────────────────────────────

export interface TourOffer {
	priceUsd: number;
	/** The existing party-size note, e.g. "1–2 people · ~5–6 hours birding". */
	note?: string;
}

export interface ItineraryEntry {
	name: string;
}

export function tourJsonLd(opts: {
	name: string;
	description: string;
	image: string;
	url: string;
	offer?: TourOffer;
	itinerary?: ItineraryEntry[];
}) {
	return compact({
		'@context': 'https://schema.org',
		'@type': 'TouristTrip',
		name: opts.name,
		description: stripHtml(opts.description),
		image: absolute(opts.image),
		url: opts.url,
		touristType: 'Birdwatchers',
		provider: { '@id': ORG_ID },
		offers: opts.offer
			? compact({
					'@type': 'Offer',
					price: String(opts.offer.priceUsd),
					priceCurrency: 'USD',
					description: opts.offer.note,
					url: opts.url,
					availability: 'https://schema.org/InStock'
				})
			: undefined,
		itinerary: opts.itinerary?.length
			? {
					'@type': 'ItemList',
					numberOfItems: opts.itinerary.length,
					itemListElement: opts.itinerary.map((d, i) => ({
						'@type': 'ListItem',
						position: i + 1,
						name: d.name
					}))
				}
			: undefined
	});
}

// ── B4 ──────────────────────────────────────────────────────────────────────

export function articleJsonLd(opts: {
	headline: string;
	image?: string;
	url: string;
	authorSlug?: string;
	datePublished?: string;
	dateModified?: string;
	/** Source lines, as stored. HTML is stripped here. */
	sources?: string[];
}) {
	return compact({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: opts.headline,
		image: opts.image ? absolute(opts.image) : undefined,
		url: opts.url,
		publisher: { '@id': ORG_ID },
		author: opts.authorSlug ? { '@id': personId(opts.authorSlug) } : undefined,
		datePublished: opts.datePublished,
		dateModified: opts.dateModified ?? opts.datePublished,
		citation: (opts.sources ?? []).map(stripHtml).filter(Boolean)
	});
}

// ── B5 ──────────────────────────────────────────────────────────────────────

export function personJsonLd(opts: {
	slug: string;
	name: string;
	jobTitle?: string;
	image?: string;
	languages?: string[];
	profiles?: string[];
}) {
	return compact({
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': personId(opts.slug),
		name: opts.name,
		jobTitle: opts.jobTitle,
		image: opts.image ? absolute(opts.image) : undefined,
		worksFor: { '@id': ORG_ID },
		knowsLanguage: opts.languages,
		sameAs: (opts.profiles ?? []).filter(Boolean)
	});
}
