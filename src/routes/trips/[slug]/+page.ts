import { error } from '@sveltejs/kit';
import { tourDetails, getTourDetail } from '$lib/data/tourDetails';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => tourDetails.map((t) => ({ slug: t.slug }));

export const load: PageLoad = ({ params }) => {
	const tour = getTourDetail(params.slug);
	if (!tour) {
		error(404, 'Tour not found');
	}
	return { tour };
};
