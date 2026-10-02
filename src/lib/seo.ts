/**
 * Title and description overrides.
 *
 * Every page already has a title and most have a description, written when the
 * site was built and perfectly serviceable. The point of this file is not to
 * replace them but to let Ben rewrite any of them for search without touching a
 * route: fill `seoTitle` or `metaDescription` and it is used, leave it empty and
 * today's wording is kept exactly.
 *
 * So nothing here changes what any page says until somebody fills a field in.
 */

/** The tail every current page title carries. Unchanged. */
export const TITLE_SUFFIX = 'Cardellina - Chiapas Birding Tours';

/**
 * The composed <title>.
 *
 * A filled `seoTitle` gets the short brand tail, because the long one eats
 * roughly thirty of the sixty characters Google will show and a title written
 * for search needs that room. An empty one keeps whatever the page says today,
 * character for character.
 */
export function pageTitle(seoTitle: string | undefined, current: string): string {
	return seoTitle?.trim() ? `${seoTitle.trim()} | Cardellina` : current;
}

/** The description, or today's, or none at all. */
export function pageDescription(
	metaDescription: string | undefined,
	current?: string
): string | undefined {
	const override = metaDescription?.trim();
	return override ? override : current;
}

export interface PageSeo {
	/** COPY: a title written for search, roughly 50 characters before the brand tail. */
	seoTitle?: string;
	/** COPY: a description for the search result, roughly 150 to 160 characters. */
	metaDescription?: string;
}

/**
 * The pages that are not generated from a data file, and so have nowhere else to
 * keep an override. Keyed by path, with the deploy base already stripped.
 *
 * COPY: every entry below is empty on purpose. Filling `seoTitle` or
 * `metaDescription` for a path changes that page's head and nothing else.
 */
export const FIXED_PAGE_SEO: Record<string, PageSeo> = {
	'/': {},
	'/trips': {},
	'/birds': {},
	'/trip-reports': {},
	'/guides': {},
	'/partners': {},
	'/contact': {},
	'/plan': {},
	'/privacy-policy': {}
};

/** The overrides for one fixed page, or an empty set. */
export function fixedSeo(path: string): PageSeo {
	return FIXED_PAGE_SEO[path] ?? {};
}
