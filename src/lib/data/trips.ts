export type TripType = 'day' | 'multi-day';

export interface Trip {
	slug: string;
	type: TripType;
	eyebrow: string;
	title: string;
	summary: string;
	description: string;
	targetSpecies: string[];
	days?: string; // e.g. "9-10 days", only set for multi-day trips
	imageUrl: string;
	sampleItineraryUrl?: string;
}

// TODO: replace with the real trip export (day tours + multi-day tours, including
// full itinerary copy). Placeholders reflect what was observed on the live site.
export const trips: Trip[] = [
	{
		slug: 'chiapas-highlights',
		type: 'multi-day',
		eyebrow: 'A taste of everything',
		title: 'Chiapas Highlights',
		summary:
			'A short trip that touches on multiple habitats in three days: the highland endemics around San Cristóbal, the dry-forest specialities of Sumidero…',
		description: '',
		targetSpecies: [
			'Belted Flycatcher',
			'Rose-bellied Bunting',
			'Unicolored Jay',
			'Slender Sheartail',
			'Cinnamon-tailed Sparrow',
			'Highland Guan'
		],
		imageUrl: '/images/trips/chiapas-highlights.webp'
	},
	{
		slug: 'volcano-endemics',
		type: 'multi-day',
		eyebrow: 'Highlands to the Tacaná foothills',
		title: 'Volcano Endemics',
		summary:
			'A focused push for the northern Central American highland endemics, from the Pacific slope up into the cloud forest of Tacaná Volcano on the Guatemala…',
		description: '',
		targetSpecies: [
			'Giant Wren',
			'Horned Guan',
			'Rose-bellied Bunting',
			'Blue-crowned Chlorophonia',
			'Azure-rumped Tanager',
			'Cinnamon-tailed Sparrow'
		],
		imageUrl: '/images/trips/volcano-endemics.webp'
	},
	{
		slug: 'lowland-jungles',
		type: 'multi-day',
		eyebrow: 'Jungle, ruins and rivers',
		title: 'Lowland Jungles',
		summary:
			'A jungle trip from the highlands into the Lacandón: the rainforest around the Palenque ruins, the murals of Bonampak, and the riverside…',
		description: '',
		targetSpecies: [
			'Lovely Cotinga',
			'Scarlet Macaw',
			'Great Curassow',
			'Tody Motmot',
			'Keel-billed Toucan',
			'Ornate Hawk-Eagle'
		],
		imageUrl: '/images/trips/lowland-jungles.webp'
	},
	{
		slug: 'full-endemics',
		type: 'multi-day',
		eyebrow: 'A wide sweep of Chiapas endemics',
		title: 'Full Endemics',
		summary:
			"A full journey through the state's habitats, from highland cloud forest to Pacific dry forest and coastal ma…",
		description: '',
		targetSpecies: [
			'Belted Flycatcher',
			'Horned Guan',
			'Unicolored Jay',
			'Blue-crowned Chlorophonia',
			'Slender Sheartail',
			'Azure-rumped Tanager'
		],
		days: '9-10 days',
		imageUrl: '/images/trips/full-endemics.webp'
	}
];

export function getTripsByType(type: TripType): Trip[] {
	return trips.filter((t) => t.type === type);
}

export function getTripBySlug(slug: string): Trip | undefined {
	return trips.find((t) => t.slug === slug);
}
