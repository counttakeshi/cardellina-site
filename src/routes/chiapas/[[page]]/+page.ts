import { error } from '@sveltejs/kit';
import { buildableContent, contentFor } from '$lib/content';

/**
 * /chiapas and everything under it, served from src/content/chiapas/.
 *
 * entries() lists only pages a production build should contain, so a draft is
 * not merely hidden: the file does not exist in the output. That is the
 * guarantee worth having. With every page still a draft this returns an empty
 * list and the route builds nothing at all, which is correct.
 */
export const prerender = true;

const SECTION = 'chiapas';

export function entries() {
	return buildableContent()
		.filter((p) => p.slug === `${SECTION}/index` || p.slug.startsWith(`${SECTION}/`))
		.map((p) => ({
			page: p.slug === `${SECTION}/index` ? undefined : p.slug.slice(SECTION.length + 1)
		}));
}

export function load({ params }: { params: { page?: string } }) {
	const slug = params.page ? `${SECTION}/${params.page}` : `${SECTION}/index`;
	const page = contentFor(slug);
	if (!page) error(404, 'Not found');
	return { page, path: params.page ? `/${SECTION}/${params.page}` : `/${SECTION}` };
}
