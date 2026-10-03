import { error } from '@sveltejs/kit';
import { contentFor } from '$lib/content';

/**
 * A single page rather than a section, so there is no [[page]] here.
 *
 * prerender is conditional on the page being live: a static route is always
 * built, so the only way to keep a draft out of the output is to tell the
 * prerenderer not to produce it.
 */
const SLUG = 'tour-companies-and-clubs';

export const prerender = contentFor(SLUG) !== undefined;

export function load() {
	const page = contentFor(SLUG);
	if (!page) error(404, 'Not found');
	return { page, path: `/${SLUG}` };
}
