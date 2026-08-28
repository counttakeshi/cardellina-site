import { error } from '@sveltejs/kit';
import { trips, getTripBySlug } from '$lib/data/trips';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => {
	return trips.map((t) => ({ slug: t.slug }));
};

export const load: PageLoad = ({ params }) => {
	const trip = getTripBySlug(params.slug);
	if (!trip) {
		error(404, 'Trip not found');
	}
	return { trip };
};
