/**
 * The trail from the homepage to the page you are on.
 *
 * One definition serves two consumers: the visible trail (C4) and the
 * BreadcrumbList in the structured data (B2). Google's guidance is that the
 * markup must match what the reader sees, and the surest way to guarantee that
 * is to give both the same source rather than to write the trail twice and
 * hope.
 *
 * Every label here is a name the site already uses: the nav labels, the footer
 * link, or the page's own title.
 */

export interface Crumb {
	/** What the link says. Always a word the site already uses somewhere. */
	name: string;
	/** Site-root-relative, with no base path. Callers add it. */
	path: string;
}

const HOME: Crumb = { name: 'Home', path: '/' };

/** The section a page sits in, by the first segment of its path. */
const SECTIONS: Record<string, Crumb> = {
	trips: { name: 'Trips', path: '/trips' },
	birds: { name: 'Bird Library', path: '/birds' },
	'trip-reports': { name: 'Trip Reports', path: '/trip-reports' },
	guides: { name: 'Guides', path: '/guides' },
	partners: { name: 'Partners', path: '/partners' },
	contact: { name: 'Contact', path: '/contact' },
	plan: { name: 'Plan a trip', path: '/plan' },
	'privacy-policy': { name: 'Privacy policy', path: '/privacy-policy' },
	// Part D. These appear only once their page is live; a draft is not built,
	// so nothing can reach a trail that ends nowhere.
	chiapas: { name: 'Chiapas', path: '/chiapas' },
	mexico: { name: 'Mexico', path: '/mexico' },
	'tour-companies-and-clubs': {
		name: 'For tour companies and clubs',
		path: '/tour-companies-and-clubs'
	}
};

/**
 * The trail for a path, with an optional name for the final page.
 *
 * `leaf` is what a detail page calls itself: the tour title, the bird's name,
 * the report's title. Section pages pass nothing and end on themselves.
 *
 * The homepage gets no trail at all. A breadcrumb that reads "Home" and stops
 * is decoration, and Google treats a single-item BreadcrumbList as invalid.
 */
export function crumbsFor(path: string, leaf?: string): Crumb[] {
	const clean = path.replace(/\/+$/, '');
	if (clean === '' || clean === '/') return [];

	const [first] = clean.replace(/^\//, '').split('/');
	const section = SECTIONS[first];
	if (!section) return [HOME];

	// A section page is its own last crumb; a detail page adds itself after it.
	if (clean === section.path) return [HOME, section];
	return leaf ? [HOME, section, { name: leaf, path: clean }] : [HOME, section];
}
