import { error } from '@sveltejs/kit';
import { getSpeciesBySlug } from '$lib/data/species';
import { accounts, getAccountBySlug } from '$lib/data/accounts';
import { contentIn, contentFor } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

/**
 * Species accounts come from two places during the changeover.
 *
 * The four originals are TypeScript in accounts.ts, transcribed from the old
 * site. Everything written from here on is Markdown in src/content/birds/.
 * This route serves whichever exists, preferring Markdown, so the two can live
 * side by side for as long as it takes rather than needing a migration before
 * anybody can write anything.
 *
 * A Markdown account only counts once it is live, so the 23 drafts are not
 * built and the bird library does not link to them.
 */
const markdownAccounts = () =>
	contentIn('birds').map((p) => ({ slug: p.slug.replace(/^birds\//, ''), page: p }));

export const entries: EntryGenerator = () => {
	const slugs = new Set(accounts.map((a) => a.slug));
	for (const { slug } of markdownAccounts()) slugs.add(slug);
	return [...slugs].map((slug) => ({ slug }));
};

export const load: PageLoad = ({ params }) => {
	const bird = getSpeciesBySlug(params.slug);

	// Markdown wins where both exist, so rewriting one of the four originals is
	// a matter of adding the file rather than deleting the old entry first.
	const markdown = contentFor(`birds/${params.slug}`);
	if (markdown) return { markdown, account: null, bird };

	const account = getAccountBySlug(params.slug);
	if (!account) error(404, 'Species account not found');
	return { markdown: null, account, bird };
};
