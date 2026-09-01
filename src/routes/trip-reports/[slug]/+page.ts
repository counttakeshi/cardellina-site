import { error } from '@sveltejs/kit';
import { tripReports, reportBySlug } from '$lib/data/tripReports';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => tripReports.map((r) => ({ slug: r.slug }));

export const load: PageLoad = ({ params }) => {
	const report = reportBySlug(params.slug);
	if (!report) {
		error(404, 'Trip report not found');
	}
	return { report };
};
