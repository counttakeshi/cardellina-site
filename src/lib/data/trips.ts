const CDN = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto';
const BUCKET = 'YofU1cddTQzjoQ8J';

const dayImg = (file: string) => `${CDN},w=800,h=600,fit=crop/${BUCKET}/${file}`;
const tripImg = (file: string) => `${CDN},w=900,h=600,fit=crop/${BUCKET}/${file}`;

export interface DayTour {
	slug: string;
	name: string;
	/** Habitat / elevation line above the name. */
	habitat: string;
	/** Short italic tagline under the name. */
	tagline: string;
	blurb: string;
	/** Target species, shown as a middot-separated run. */
	birds: string[];
	priceUsd: number;
	party: string;
	/** Caveat shown under the card, e.g. entrance fees or closure days. */
	note?: string;
	image: string;
}

export interface MultiDayTrip {
	slug: string;
	name: string;
	/** Theme line above the name. */
	theme: string;
	summary: string;
	birds: string[];
	days: string;
	image: string;
	/** True when the live card offers a downloadable sample itinerary. */
	sampleItinerary?: boolean;
}

export const dayTours: DayTour[] = [
	{
		slug: 'san-cristobal',
		name: 'San Cristóbal de las Casas',
		habitat: 'Pine-oak & cloud forest · 2,200 m',
		tagline: 'Highland endemics',
		blurb:
			'The endangered Pink-headed Warbler on its home ground, alongside highland hummingbirds, jays and owls in the forests around the town.',
		birds: [
			'Pink-headed Warbler',
			'Blue-throated Motmot',
			'Wine-throated Hummingbird',
			'Black-throated Jay',
			'Garnet-throated Hummingbird',
			'Black-capped Swallow'
		],
		priceUsd: 230,
		party: '1–2 people · ~5–6 hours birding',
		image: dayImg('sabes_aves_pink-headed_warbler-A0xjy2JlD8TLpRLX.jpg')
	},
	{
		slug: 'palenque',
		name: 'Palenque',
		habitat: 'Tropical rainforest · Maya ruins',
		tagline: 'Lowland jungle',
		blurb:
			'Sunrise on the road to the ruins for toucans, trogons and oropendolas, then shady forest trails, soaring raptors, and a finish at the hummingbird feeders.',
		birds: [
			'Keel-billed Toucan',
			'Red-capped Manakin',
			'Scarlet Macaw',
			'King Vulture',
			'Violet Sabrewing',
			'Black-cheeked Woodpecker'
		],
		priceUsd: 290,
		party: '1–2 people · ~5–6 hours birding',
		image: dayImg('palenq-Yle4qa7Q10t5Q9gk.jpg')
	},
	{
		slug: 'sumidero-canyon',
		name: 'Sumidero Canyon',
		habitat: 'Deciduous forest · 1,000 m above the river',
		tagline: 'Birding above the canyon',
		blurb:
			'A full morning at the canyon viewpoints in dry deciduous forest, with a strong cast of localised specialities and impressive views over the Grijalva River.',
		birds: [
			'Flammulated Flycatcher',
			'Red-breasted Chat',
			'Slender Sheartail',
			'Blue Seedeater',
			'Bar-winged Oriole'
		],
		priceUsd: 330,
		party: '1–2 people · ~5–6 hours birding',
		note: 'Not available on Tuesdays',
		image: dayImg('sabes_aves_canon_del_sumidero-mePJl0M91pTLG4Ja.JPG')
	},
	{
		slug: 'comitan',
		name: 'Comitán',
		habitat: 'Pine-oak, dry forest & wetland',
		tagline: 'Mayan temples & wetlands',
		blurb:
			'An off-the-beaten-track day: Maya ruins at the pine-oak/dry-forest transition, ancient cypresses at Tzimol, and the Comitán wetlands to finish.',
		birds: [
			'Belted Flycatcher',
			'Slender Sheartail',
			'Lesser Roadrunner',
			'Blue-and-white Mockingbird',
			'White-faced Ground Sparrow'
		],
		priceUsd: 295,
		party: '1–2 people · ~5–6 hours birding',
		image: dayImg('tenam-puente-m6Ljg0VxNXhzeewd.jpg')
	},
	{
		slug: 'montebello-lakes',
		name: 'Montebello Lakes',
		habitat: 'Pine-oak & cloud forest · lakes',
		tagline: 'Highland forest & quetzals',
		blurb:
			'The forested lakes on the Guatemalan border, at their best for Resplendent Quetzal and a strong cast of highland forest birds, with pine-oak and cloud forest right down to the water.',
		birds: [
			'Resplendent Quetzal',
			'Azure-hooded Jay',
			'Barred Parakeet',
			'Black-throated Jay',
			'Yellow-throated Nightingale-Thrush'
		],
		priceUsd: 350,
		party: '1–2 people · ~5–6 hours birding',
		note: 'Entrances and transport from Comitán included',
		image: dayImg('resplendent-quetzal-mnlW0616OoTEDEj3.jpg')
	},
	{
		slug: 'la-sepultura',
		name: 'La Sepultura',
		habitat: 'Sierra Madre · dry to humid forest',
		tagline: 'Pacific-slope specialities',
		blurb:
			'The Sierra Madre slopes on the Pacific side, ranging from dry lowland forest up into humid foothills, and the surest ground for the flagship Rose-bellied Bunting alongside a run of west-Mexican specialities.',
		birds: [
			'Rose-bellied Bunting',
			'Orange-breasted Bunting',
			'Long-tailed Manakin',
			'Citreoline Trogon',
			'Green-fronted Hummingbird',
			'Cinnamon-tailed Sparrow',
			'Great Swallow-tailed Swift'
		],
		priceUsd: 365,
		party: '1–2 people · ~5–6 hours birding',
		note: 'Entrances included',
		image: dayImg('5a00c77407956732f80e74b002410be9-mk3qQ8RrkvuyPp7o.jpg')
	}
];

export const multiDayTrips: MultiDayTrip[] = [
	{
		slug: 'chiapas-highlights',
		name: 'Chiapas Highlights',
		theme: 'A taste of everything',
		summary:
			'A short trip that touches on multiple habitats in three days: the highland endemics around San Cristóbal, the dry-forest specialities of Sumi…',
		birds: [
			'Belted Flycatcher',
			'Rose-bellied Bunting',
			'Unicolored Jay',
			'Slender Sheartail',
			'Cinnamon-tailed Sparrow',
			'Highland Guan'
		],
		days: '3 days',
		sampleItinerary: true,
		image: tripImg('belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg')
	},
	{
		slug: 'volcano-endemics',
		name: 'Volcano Endemics',
		theme: 'Highlands to the Tacaná foothills',
		summary:
			'A focused push for the northern Central American highland endemics, from the Pacific slope up into the cloud forest of Tacaná Volcano on the Guatemala…',
		birds: [
			'Giant Wren',
			'Horned Guan',
			'Rose-bellied Bunting',
			'Blue-crowned Chlorophonia',
			'Azure-rumped Tanager',
			'Cinnamon-tailed Sparrow'
		],
		days: '4 days',
		sampleItinerary: true,
		image: tripImg('horned-guan-mv02ExGWQJC0k2xv.jpg')
	},
	{
		slug: 'lowland-jungles',
		name: 'Lowland Jungles',
		theme: 'Jungle, ruins and rivers',
		summary:
			'A jungle trip from the highlands into the Lacandón: the rainforest around the Palenque ruins, the murals of Bonampak, and the riverside…',
		birds: [
			'Lovely Cotinga',
			'Scarlet Macaw',
			'Great Curassow',
			'Tody Motmot',
			'Keel-billed Toucan',
			'Ornate Hawk-Eagle'
		],
		days: '4 days',
		sampleItinerary: true,
		image: tripImg('keel-billed-toucan-N3wJ3xiANHuwBTFC.jpg')
	},
	{
		slug: 'full-endemics',
		name: 'Full Endemics',
		theme: 'A wide sweep of Chiapas endemics',
		summary:
			"A full journey through the state's habitats, from highland cloud forest to Pacific dry forest and coastal ma…",
		birds: [
			'Belted Flycatcher',
			'Horned Guan',
			'Unicolored Jay',
			'Blue-crowned Chlorophonia',
			'Slender Sheartail',
			'Azure-rumped Tanager'
		],
		days: '9-10 days',
		image: tripImg('rose-bellied-bunting-m2Wa32VjWETn9NkA.png')
	}
];

export function getDayTour(slug: string): DayTour | undefined {
	return dayTours.find((t) => t.slug === slug);
}

export function getMultiDayTrip(slug: string): MultiDayTrip | undefined {
	return multiDayTrips.find((t) => t.slug === slug);
}
