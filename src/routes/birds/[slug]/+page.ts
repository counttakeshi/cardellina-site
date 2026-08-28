import { error } from '@sveltejs/kit';
import { getSpeciesBySlug } from '$lib/data/species';
import { accounts, getAccountBySlug } from '$lib/data/accounts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => accounts.map((a) => ({ slug: a.slug }));

export const load: PageLoad = ({ params }) => {
	const account = getAccountBySlug(params.slug);
	if (!account) {
		error(404, 'Species account not found');
	}
	return { account, bird: getSpeciesBySlug(params.slug) };
};
