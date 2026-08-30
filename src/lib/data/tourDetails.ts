/**
 * Full detail pages for every day tour and multi-day trip. Keyed by the same slug
 * used in trips.ts, so the listing cards and these pages stay in step.
 *
 * Originally transcribed from the old site, but this file is now edited by hand —
 * it is the source of truth for tour copy, not a generated artefact. Do not
 * regenerate it from the old site or you will lose later rewrites.
 */

export interface TourFact {
	label: string;
	/** May contain light inline markup, e.g. a muted note beside the price. */
	value: string;
}

export interface TourPhoto {
	thumb: string;
	full: string;
	alt: string;
	caption: string;
}

export interface ItineraryDay {
	label: string;
	title: string;
	body: string[];
	/** Overnight location, or how the trip ends. */
	stay: string;
}

interface TourBase {
	slug: string;
	title: string;
	hero: string;
	facts: TourFact[];
	gallery: TourPhoto[];
}

export interface DayTourDetail extends TourBase {
	kind: 'day';
	habitat: string;
	tagline: string;
	intro: string[];
	targets: string[];
}

export interface MultiDayDetail extends TourBase {
	kind: 'multi-day';
	length: string;
	summary: string;
	draftNote: string;
	headlineBirds: string[];
	days: ItineraryDay[];
}

export type TourDetail = DayTourDetail | MultiDayDetail;

export const tourDetails: TourDetail[] = [
	{
		"slug": "san-cristobal",
		"kind": "day",
		"title": "San Cristóbal de las Casas",
		"hero": "",
		"facts": [
			{
				"label": "Duration",
				"value": "~5–6 hours birding"
			},
			{
				"label": "Price",
				"value": "230 USD <span class=\"muted\">(1–2 people)</span>"
			},
			{
				"label": "Included",
				"value": "Guiding, transport, entrances"
			},
			{
				"label": "Pick-up",
				"value": "San Cristóbal de las Casas"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/sabes_aves_pink-headed_warbler-A0xjy2JlD8TLpRLX.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_pink-headed_warbler-A0xjy2JlD8TLpRLX.jpg",
				"alt": "Pink-headed Warbler",
				"caption": "Pink-headed Warbler"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/sabes_aves_wine-thorated_hummingbird-1-AoPJBzjDE8c8XVez.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_wine-thorated_hummingbird-1-AoPJBzjDE8c8XVez.jpg",
				"alt": "Wine-throated Hummingbird",
				"caption": "Wine-throated Hummingbird"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"alt": "Blue-throated Motmot",
				"caption": "Blue-throated Motmot"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/saves_aves_golden-cheeked_warbler-fO82HsR2CVu7j9hq.png",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/saves_aves_golden-cheeked_warbler-fO82HsR2CVu7j9hq.png",
				"alt": "Golden-cheeked Warbler",
				"caption": "Golden-cheeked Warbler"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/red-faced-warbler-m2Wa3zBX1PiLDJw9.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/red-faced-warbler-m2Wa3zBX1PiLDJw9.jpg",
				"alt": "Red-faced Warbler",
				"caption": "Red-faced Warbler"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/sabes_aves_rufous-browed_wren-ozWNJPc9Zns8f5zO.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_rufous-browed_wren-ozWNJPc9Zns8f5zO.JPG",
				"alt": "Rufous-browed Wren",
				"caption": "Rufous-browed Wren"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/sabes_aves_basilina_leucotis-KRKtKHveZzcPOm7i.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_basilina_leucotis-KRKtKHveZzcPOm7i.jpg",
				"alt": "White-eared Hummingbird",
				"caption": "White-eared Hummingbird"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/sabes_aves_rivolis_hummingbird-4K4YnfKdpJWaTbqo.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_rivolis_hummingbird-4K4YnfKdpJWaTbqo.JPG",
				"alt": "Rivoli's Hummingbird",
				"caption": "Rivoli's Hummingbird"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/myioborus_miniatus-mv021oK5pNcWexMQ.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/myioborus_miniatus-mv021oK5pNcWexMQ.JPG",
				"alt": "Slate-throated Redstart",
				"caption": "Slate-throated Redstart"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/rose-throated-becarad-A1aPGVEonbhDZBaW.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/rose-throated-becarad-A1aPGVEonbhDZBaW.jpg",
				"alt": "Rose-throated Becard",
				"caption": "Rose-throated Becard"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/sabes_aves_rufous-collared_sparrow-GqOCJC9TabonSzXb.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_rufous-collared_sparrow-GqOCJC9TabonSzXb.jpg",
				"alt": "Rufous-collared Sparrow",
				"caption": "Rufous-collared Sparrow"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/cloud-forest-birding-montetik-viewpoint-profile-m6L2jlGWKxSEPljw.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/cloud-forest-birding-montetik-viewpoint-profile-m6L2jlGWKxSEPljw.jpg",
				"alt": "Cloud forest at the Montetik viewpoint",
				"caption": "Cloud forest at the Montetik viewpoint"
			}
		],
		"habitat": "Pine-oak & cloud forest · 2,200 m",
		"tagline": "Highland endemics",
		"intro": [
			"At 2,200 m and surrounded by pine-oak and cloud forest, San Cristóbal de las Casas is the ideal place to look for the endangered Pink-headed Warbler, as well as the migratory Golden-cheeked Warbler and the altitudinal migrant Wine-throated Hummingbird.",
			"On our day tours in the area we typically travel to a communal-land pine-oak reserve, the last remnants of cloud forest in San Cristóbal, with the option to visit urban birding spots overlooking the city, and private properties exclusive to Cardellina. Between them we find hummingbirds, warblers, jays and more, taking in migrants, residents and endemics."
		],
		"targets": [
			"Pink-headed Warbler",
			"Blue-throated Motmot",
			"Wine-throated Hummingbird",
			"Garnet-throated Hummingbird",
			"Amethyst-throated Mountain-gem",
			"Singing Quail",
			"Bearded Screech-Owl",
			"Unspotted Saw-whet Owl",
			"Rufous-browed Wren",
			"Red-faced Warbler",
			"Golden-cheeked Warbler",
			"Unicolored Jay",
			"Black-throated Jay",
			"Azure-crowned Hummingbird",
			"White-eared Hummingbird",
			"Mountain Trogon"
		]
	},
	{
		"slug": "palenque",
		"kind": "day",
		"title": "Palenque",
		"hero": "",
		"facts": [
			{
				"label": "Duration",
				"value": "~5–6 hours birding"
			},
			{
				"label": "Price",
				"value": "290 USD <span class=\"muted\">(1–2 people)</span>"
			},
			{
				"label": "Included",
				"value": "Guiding"
			},
			{
				"label": "Extras",
				"value": "Park entrances, archaeological site visit"
			},
			{
				"label": "Pick-up",
				"value": "Palenque"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/white-necked-jacobin-AQEeDwNj9zFG7X57.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/white-necked-jacobin-AQEeDwNj9zFG7X57.jpg",
				"alt": "White-necked Jacobin",
				"caption": "White-necked Jacobin"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/white-necked-jacobin-female-Yan0qorZz9t99oea.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/white-necked-jacobin-female-Yan0qorZz9t99oea.jpg",
				"alt": "White-necked Jacobin (female)",
				"caption": "White-necked Jacobin (female)"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/gartered-trogon-intense-Yg2qzJnl2RCoEXwK.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/gartered-trogon-intense-Yg2qzJnl2RCoEXwK.jpg",
				"alt": "Gartered Trogon",
				"caption": "Gartered Trogon"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/collared-aracari-photo_-jaime-pa-c-rez-AMq1q4LoPbF5nQvP.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/collared-aracari-photo_-jaime-pa-c-rez-AMq1q4LoPbF5nQvP.jpg",
				"alt": "Collared Aracari",
				"caption": "Collared Aracari"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/1759259147357-y4lpxjkeznsokokp_le_upscale_prime_light_ai_30-hgUZlMUOwH9ViYgB.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/1759259147357-y4lpxjkeznsokokp_le_upscale_prime_light_ai_30-hgUZlMUOwH9ViYgB.jpg",
				"alt": "CAPTION NEEDED",
				"caption": "CAPTION NEEDED"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/1759259147499-YNqMPaEaERHeMOG8.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/1759259147499-YNqMPaEaERHeMOG8.jpg",
				"alt": "CAPTION NEEDED",
				"caption": "CAPTION NEEDED"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/41751345475_fa342e6d51_o-dWxBW1pRzgC491eY.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/41751345475_fa342e6d51_o-dWxBW1pRzgC491eY.jpg",
				"alt": "In the forest at Palenque",
				"caption": "In the forest at Palenque"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/YofU1cddTQzjoQ8J/palenq-Yle4qa7Q10t5Q9gk.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/palenq-Yle4qa7Q10t5Q9gk.jpg",
				"alt": "Rainforest around the ruins",
				"caption": "Rainforest around the ruins"
			}
		],
		"habitat": "Tropical rainforest · Maya ruins",
		"tagline": "Lowland jungle",
		"intro": [
			"We begin just before sunrise, watching birds along the access road to the stunning Palenque archaeological ruins. Early highlights include Keel-billed Toucan, Black-cheeked Woodpecker, Black-headed Trogon, Slaty-tailed Trogon, Montezuma's Oropendola and Collared Aracari.",
			"Inside the park we explore the shadier forest trails, where targets include Orange-billed Sparrow, Red-capped Manakin, Rufous-tailed Jacamar, Tody Motmot, Kentucky Warbler, Tawny-winged Woodcreeper and Chestnut-colored Woodpecker.",
			"There's the option to enter the archaeological site if you haven't already, where we have chances at King Vulture, Double-toothed Kite and other soaring raptors.",
			"We finish near our favourite hummingbird feeders, where it's possible to see White-necked Jacobin, White-bellied Emerald, Emerald-chinned Hummingbird, Long-billed Hermit, Wedge-tailed Sabrewing and Violet Sabrewing."
		],
		"targets": [
			"Keel-billed Toucan",
			"Black-cheeked Woodpecker",
			"Black-headed Trogon",
			"Slaty-tailed Trogon",
			"Montezuma's Oropendola",
			"Collared Aracari",
			"Orange-billed Sparrow",
			"Red-capped Manakin",
			"Rufous-tailed Jacamar",
			"Tody Motmot",
			"Kentucky Warbler",
			"Tawny-winged Woodcreeper",
			"Chestnut-colored Woodpecker",
			"King Vulture",
			"Double-toothed Kite",
			"White-necked Jacobin",
			"White-bellied Emerald",
			"Emerald-chinned Hummingbird",
			"Long-billed Hermit",
			"Wedge-tailed Sabrewing",
			"Violet Sabrewing"
		]
	},
	{
		"slug": "sumidero-canyon",
		"kind": "day",
		"title": "Sumidero Canyon",
		"hero": "",
		"facts": [
			{
				"label": "Duration",
				"value": "~5–6 hours birding"
			},
			{
				"label": "Price",
				"value": "330 USD <span class=\"muted\">(1–2 people)</span>"
			},
			{
				"label": "Included",
				"value": "Guiding, transport, entrances"
			},
			{
				"label": "Pick-up",
				"value": "San Cristóbal de las Casas (1 hr transfer) / Tuxtla Gutiérrez"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/sabes_aves_canon_del_sumidero-mePJl0M91pTLG4Ja.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/sabes_aves_canon_del_sumidero-mePJl0M91pTLG4Ja.JPG",
				"alt": "Sumidero Canyon",
				"caption": "Sumidero Canyon"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg",
				"alt": "Belted Flycatcher",
				"caption": "Belted Flycatcher"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/russet-crowned-motmot-AR0MD0JLlJi4JGXO.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/russet-crowned-motmot-AR0MD0JLlJi4JGXO.jpg",
				"alt": "Russet-crowned Motmot",
				"caption": "Russet-crowned Motmot"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/banded-wren-YanqLvXMD1UNgz3v.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/banded-wren-YanqLvXMD1UNgz3v.jpg",
				"alt": "Banded Wren",
				"caption": "Banded Wren"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"alt": "Blue-and-white Mockingbird",
				"caption": "Blue-and-white Mockingbird"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/white-throated-magpie-jay-4ffUHK2dtXrFJStK.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/white-throated-magpie-jay-4ffUHK2dtXrFJStK.jpg",
				"alt": "White-throated Magpie-Jay",
				"caption": "White-throated Magpie-Jay"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/white-tipped-dove-mccoQMMMqHQh5lRi.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/white-tipped-dove-mccoQMMMqHQh5lRi.jpg",
				"alt": "White-tipped Dove",
				"caption": "White-tipped Dove"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/townsend-s-warbler-4n0x0K8n4youCbQE.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/townsend-s-warbler-4n0x0K8n4youCbQE.jpg",
				"alt": "Townsend's Warbler",
				"caption": "Townsend's Warbler"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/merlin-QepCw15OZpgUuZuE.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/merlin-QepCw15OZpgUuZuE.jpg",
				"alt": "Merlin",
				"caption": "Merlin"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/gray-collared-becard-KpdJ5QKgEmAxvp3r.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/gray-collared-becard-KpdJ5QKgEmAxvp3r.jpg",
				"alt": "Gray-collared Becard",
				"caption": "Gray-collared Becard"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/fan-tailed-warbler-NpvZdySIwrPR9t9N.png",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/fan-tailed-warbler-NpvZdySIwrPR9t9N.png",
				"alt": "Fan-tailed Warbler",
				"caption": "Fan-tailed Warbler"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/gartered-trogon-mP432bzGwoUoL9jv.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/gartered-trogon-mP432bzGwoUoL9jv.jpg",
				"alt": "Gartered Trogon",
				"caption": "Gartered Trogon"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/feizal-and-valente-birdwatching-at-sumidero-canyon-AE0P0plDJlTR6J5M.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/feizal-and-valente-birdwatching-at-sumidero-canyon-AE0P0plDJlTR6J5M.jpg",
				"alt": "Birding the canyon rim",
				"caption": "Birding the canyon rim"
			}
		],
		"habitat": "Deciduous forest · 1,000 m above the river",
		"tagline": "Birding above the canyon",
		"intro": [
			"A full morning at the Sumidero Canyon viewpoints, 1,000 m above the Grijalva River, with excellent birding across this deciduous forest environment and its remarkable range of species.",
			"Target species include Flammulated Flycatcher, Blue Seedeater, Bar-winged Oriole, Belted Flycatcher, Red-breasted Chat and Slender Sheartail. We also have good chances at Plain-capped Starthroat, Lesser Ground-Cuckoo, Varied Bunting, Pheasant Cuckoo, Russet-crowned Motmot, Green Jay, Olive Sparrow, Mexican Fan-tailed Warbler and White-throated Magpie-Jay.",
			"We spend time enjoying the views as well as working the varying habitats as the sun rises over this underappreciated gem in Chiapas."
		],
		"targets": [
			"Flammulated Flycatcher",
			"Blue Seedeater",
			"Bar-winged Oriole",
			"Belted Flycatcher",
			"Red-breasted Chat",
			"Slender Sheartail",
			"Plain-capped Starthroat",
			"Lesser Ground-Cuckoo",
			"Varied Bunting",
			"Pheasant Cuckoo",
			"Russet-crowned Motmot",
			"Green Jay",
			"Olive Sparrow",
			"Mexican Fan-tailed Warbler",
			"White-throated Magpie-Jay"
		]
	},
	{
		"slug": "comitan",
		"kind": "day",
		"title": "Comitán",
		"hero": "",
		"facts": [
			{
				"label": "Duration",
				"value": "~5–6 hours birding"
			},
			{
				"label": "Price",
				"value": "295 USD <span class=\"muted\">(1–2 people)</span>"
			},
			{
				"label": "Included",
				"value": "Guiding, transport, entrances"
			},
			{
				"label": "Pick-up",
				"value": "Comitán de Domínguez"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/saves_aves_slender_sheartail-mk3JZ2XwRgceMJ7G.png",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/saves_aves_slender_sheartail-mk3JZ2XwRgceMJ7G.png",
				"alt": "Slender Sheartail",
				"caption": "Slender Sheartail"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/saves_aves_belted_flyctacher-yle4qopkavupwgkq_le_upscale_prime_light_ai_30-W0ccOL9OyvD1PW60.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/saves_aves_belted_flyctacher-yle4qopkavupwgkq_le_upscale_prime_light_ai_30-W0ccOL9OyvD1PW60.jpg",
				"alt": "Belted Flycatcher",
				"caption": "Belted Flycatcher"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/yellow-grosbeak-EBPvotaS7J1A3VuE.png",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/yellow-grosbeak-EBPvotaS7J1A3VuE.png",
				"alt": "Yellow Grosbeak",
				"caption": "Yellow Grosbeak"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/green-jay-YyvZrOK740uXWDkj.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/green-jay-YyvZrOK740uXWDkj.jpg",
				"alt": "Green Jay",
				"caption": "Green Jay"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/tenam-puente-m6Ljg0VxNXhzeewd.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/tenam-puente-m6Ljg0VxNXhzeewd.jpg",
				"alt": "Tenam Puente ruins",
				"caption": "Tenam Puente ruins"
			}
		],
		"habitat": "Pine-oak, dry forest & wetland",
		"tagline": "Mayan temples & wetlands",
		"intro": [
			"One of the most underrated birding sites in Chiapas, Comitán offers endemic species alongside archaeological ruins, wetland birding and a genuinely off-the-beaten-track day.",
			"An early start at the Tenam Puente Maya ruins, a beautiful site for birding at the transition between pine-oak and tropical deciduous forest. Chances at quasi-endemics such as Slender Sheartail and Belted Flycatcher, plus Rock Wren, Botteri's Sparrow, Azure-crowned Hummingbird, Blue-and-white Mockingbird and Lesser Roadrunner.",
			"We continue to lower elevations at the picturesque town of Tzimol, where ancient cypress trees host Green Jay, Russet-crowned Motmot, Yellow Grosbeak, Canivet's Emerald and Bar-winged Oriole.",
			"We finish at the wetlands of Comitán, with good chances at White-tailed Kite, White-tailed Hawk, Sora, Grass Wren, Pie-billed Grebe, Black-bellied Whistling-Duck, Tricolored Heron and Lesser Nighthawk."
		],
		"targets": [
			"Slender Sheartail",
			"Belted Flycatcher",
			"Rock Wren",
			"Botteri's Sparrow",
			"Azure-crowned Hummingbird",
			"Blue-and-white Mockingbird",
			"Lesser Roadrunner",
			"Green Jay",
			"Russet-crowned Motmot",
			"Yellow Grosbeak",
			"Canivet's Emerald",
			"Bar-winged Oriole",
			"White-tailed Kite",
			"White-tailed Hawk",
			"Sora",
			"Grass Wren",
			"Pie-billed Grebe",
			"Black-bellied Whistling-Duck",
			"Tricolored Heron",
			"Lesser Nighthawk"
		]
	},
	{
		"slug": "montebello-lakes",
		"kind": "day",
		"title": "Montebello Lakes",
		"hero": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/resplendent-quetzal-mnlW0616OoTEDEj3.jpg",
		"facts": [
			{
				"label": "Duration",
				"value": "~5–6 hours birding"
			},
			{
				"label": "Price",
				"value": "350 USD <span class=\"muted\">(1–2 people)</span>"
			},
			{
				"label": "Included",
				"value": "Guiding, transport from Comitán, entrances"
			},
			{
				"label": "Pick-up",
				"value": "Comitán de Domínguez"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/resplendent-quetzal-mnlW0616OoTEDEj3.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/resplendent-quetzal-mnlW0616OoTEDEj3.jpg",
				"alt": "Resplendent Quetzal",
				"caption": "Resplendent Quetzal"
			}
		],
		"habitat": "Pine-oak & cloud forest · lakes",
		"tagline": "Highland forest & quetzals",
		"intro": [
			"The forested lakes of Montebello sit right on the Guatemalan border, an hour from Comitán, with pine-oak and cloud forest running down to the water's edge. We collect you from your accommodation early and time our arrival for first light, which is when the Resplendent Quetzal is most active and the reason the day starts when it does.",
			"The Camino de Cinco Lagos is the heart of the morning. Along it we look for Azure-hooded Jay, Northern Emerald-Toucanet, Black-throated Jay and Strong-billed Woodcreeper, with Slate-colored Solitaire and Black-headed Nightingale-Thrush singing from cover, Barred Parakeets going over, and Common Chlorospingus and Gray-breasted Wood-Wren working the understorey.",
			"We carry on to the lake at El Pojoj, where the cast changes: Green-throated Mountain-gem and Collared Trogon, Brown-backed Solitaire and Orange-billed Nightingale-Thrush, Black-throated Green Warbler among the wintering birds, and Plain Chachalaca in the canopy.",
			"Lunch is local, with homemade tortillas, looking out over the crystalline lakes while Unicolored Jays, Yellow-backed Orioles and Grace's Warbler move through the trees around the table.",
			"The afternoon depends on the weather. Either the archaeological site at Chinkultic, for Cabanis's Wren, White-tailed Hawk and White-tipped Dove alongside the view from the top of the pyramids; or the nearby wetlands, for Osprey, Wood Stork, Pinnated Bittern, Black-bellied Whistling-Duck, Belted Kingfisher, Vermilion and Scissor-tailed Flycatcher, Common Moorhen, Common Yellowthroat and Grass Wren. Either way we return to Comitán at the end of the day."
		],
		"targets": [
			"Resplendent Quetzal",
			"Azure-hooded Jay",
			"Northern Emerald-Toucanet",
			"Black-throated Jay",
			"Strong-billed Woodcreeper",
			"Slate-colored Solitaire",
			"Common Chlorospingus",
			"Gray-breasted Wood-Wren",
			"Black-headed Nightingale-Thrush",
			"Barred Parakeet",
			"Green-throated Mountain-gem",
			"Brown-backed Solitaire",
			"Collared Trogon",
			"Orange-billed Nightingale-Thrush",
			"Black-throated Green Warbler",
			"Plain Chachalaca",
			"Unicolored Jay",
			"Yellow-backed Oriole",
			"Grace's Warbler",
			"Cabanis's Wren",
			"White-tailed Hawk",
			"White-tipped Dove",
			"Osprey",
			"Belted Kingfisher",
			"Wood Stork",
			"Pinnated Bittern",
			"Black-bellied Whistling-Duck",
			"Scissor-tailed Flycatcher",
			"Vermilion Flycatcher",
			"Common Moorhen",
			"Common Yellowthroat",
			"Grass Wren"
		]
	},
	{
		"slug": "la-sepultura",
		"kind": "day",
		"title": "La Sepultura",
		"hero": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/5a00c77407956732f80e74b002410be9-mk3qQ8RrkvuyPp7o.jpg",
		"facts": [
			{
				"label": "Duration",
				"value": "~5–6 hours birding"
			},
			{
				"label": "Price",
				"value": "365 USD <span class=\"muted\">(1–2 people)</span>"
			},
			{
				"label": "Included",
				"value": "Guiding, entrances"
			},
			{
				"label": "Pick-up",
				"value": "San Cristóbal de las Casas / Tuxtla Gutiérrez"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=700,h=525,fit=crop/YofU1cddTQzjoQ8J/5a00c77407956732f80e74b002410be9-mk3qQ8RrkvuyPp7o.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600/YofU1cddTQzjoQ8J/5a00c77407956732f80e74b002410be9-mk3qQ8RrkvuyPp7o.jpg",
				"alt": "Rose-bellied Bunting",
				"caption": "Rose-bellied Bunting"
			}
		],
		"habitat": "Sierra Madre · dry to humid forest",
		"tagline": "Pacific-slope specialities",
		"intro": [
			"The Sierra Madre slopes on the Pacific side, ranging from dry lowland forest up into humid foothills, are the surest ground for the flagship Rose-bellied Bunting, alongside a fine run of west-Mexican specialities."
		],
		"targets": [
			"Rose-bellied Bunting",
			"Orange-breasted Bunting",
			"Long-tailed Manakin",
			"Citreoline Trogon",
			"Green-fronted Hummingbird",
			"Cinnamon-tailed Sparrow",
			"Great Swallow-tailed Swift"
		]
	},
	{
		"slug": "chiapas-highlights",
		"kind": "multi-day",
		"title": "Chiapas Highlights",
		"hero": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=900,h=600,fit=crop/YofU1cddTQzjoQ8J/belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg",
		"facts": [
			{
				"label": "Length",
				"value": "3 days"
			},
			{
				"label": "Focus",
				"value": "A taste of everything"
			},
			{
				"label": "Group",
				"value": "Small, private"
			},
			{
				"label": "Languages",
				"value": "English, Spanish, Dutch"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg",
				"alt": "Belted Flycatcher",
				"caption": "Belted Flycatcher"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/pink-headed-warbler-2-PKTVisrKq3xo673F.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/pink-headed-warbler-2-PKTVisrKq3xo673F.jpg",
				"alt": "Pink-headed Warbler",
				"caption": "Pink-headed Warbler · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"alt": "Blue-and-white Mockingbird",
				"caption": "Blue-and-white Mockingbird · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/rose-bellied-bunting-m2Wa32VjWETn9NkA.png",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/rose-bellied-bunting-m2Wa32VjWETn9NkA.png",
				"alt": "Rose-bellied Bunting",
				"caption": "Rose-bellied Bunting · Nagi Aboulenein"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/unicolored-jay-s7sJYdXMbsQy4iJO.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/unicolored-jay-s7sJYdXMbsQy4iJO.jpg",
				"alt": "Unicolored Jay",
				"caption": "Unicolored Jay"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"alt": "Blue-throated Motmot",
				"caption": "Blue-throated Motmot"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/slender-sheartail-qMw7TVBhS9Q1882N.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/slender-sheartail-qMw7TVBhS9Q1882N.jpg",
				"alt": "Slender Sheartail",
				"caption": "Slender Sheartail · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/bearded-screech-owl-B5Fngu1MgWbNIBDY.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/bearded-screech-owl-B5Fngu1MgWbNIBDY.jpg",
				"alt": "Bearded Screech-Owl",
				"caption": "Bearded Screech-Owl · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/collared-aracari-photo_-jaime-pa-c-rez-AMq1q4LoPbF5nQvP.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/collared-aracari-photo_-jaime-pa-c-rez-AMq1q4LoPbF5nQvP.jpg",
				"alt": "Collared Aracari",
				"caption": "Collared Aracari · Jaime Pérez"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/keel-billed-toucan-N3wJ3xiANHuwBTFC.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/keel-billed-toucan-N3wJ3xiANHuwBTFC.jpg",
				"alt": "Keel-billed Toucan",
				"caption": "Keel-billed Toucan"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/ornate-hawk-eagle-mP4OGNwpvehoNJQq.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/ornate-hawk-eagle-mP4OGNwpvehoNJQq.jpg",
				"alt": "Ornate Hawk-Eagle",
				"caption": "Ornate Hawk-Eagle · Jaime Pérez"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/rufous-browed-wren-3phBg9ChWPaz4qiV.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/rufous-browed-wren-3phBg9ChWPaz4qiV.jpg",
				"alt": "Rufous-browed Wren",
				"caption": "Rufous-browed Wren"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/black-capped-swallow-vYDUGfI4yq2m07pL.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/black-capped-swallow-vYDUGfI4yq2m07pL.jpg",
				"alt": "Black-capped Swallow",
				"caption": "Black-capped Swallow · Sergio Gómez Villaverde"
			}
		],
		"length": "3 days · A taste of everything",
		"summary": "A short trip that touches every side of Chiapas birding in three days: the highland endemics around San Cristóbal, the dry-forest specialities of Sumidero Canyon, the lowland forest of El Ocote, and the Pacific-slope birds of La Sepultura. The best introduction to the state for anyone short on time.",
		"draftNote": "This is a sample itinerary showing the kind of route we run. Exact days, sites and pace are tailored to your trip.",
		"headlineBirds": [
			"Belted Flycatcher",
			"Pink-headed Warbler",
			"Nava's Wren",
			"Orange-breasted Bunting",
			"Blue-and-white Mockingbird",
			"Blue-throated Motmot",
			"Rose-bellied Bunting",
			"Unicolored Jay"
		],
		"days": [
			{
				"label": "Day 1",
				"title": "San Cristóbal & the highlands",
				"body": [
					"Pine-oak and cloud forest around San Cristóbal for Pink-headed Warbler, Garnet-throated Hummingbird, Rufous-browed Wren and Black-throated Jay. Optional evening owling for Bearded Screech-Owl."
				],
				"stay": "Overnight · San Cristóbal"
			},
			{
				"label": "Day 2",
				"title": "Sumidero Canyon",
				"body": [
					"A morning above the Grijalva at Sumidero for Belted Flycatcher, Slender Sheartail and Red-breasted Chat, then on to Ocozocoautla with owling at El Ocote for Black-and-White Owl, Crested Owl, Spectacled Owl."
				],
				"stay": "Overnight · Ocozocoautla"
			},
			{
				"label": "Day 3",
				"title": "El Ocote & La Sepultura",
				"body": [
					"The limestone forest of El Ocote for Nava's Wren, Keel-billed Toucan and Green Shrike-Vireo, and a host of lowland jungle specialists. Continuing to the Sierra Madre slopes on the Pacific side for the flagship Rose-bellied Bunting, Orange-breasted Bunting, Cinnamon-tailed Sparrow and Citreoline Trogon, before the trip ends."
				],
				"stay": "Trip ends"
			}
		]
	},
	{
		"slug": "volcano-endemics",
		"kind": "multi-day",
		"title": "Volcano Endemics",
		"hero": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=900,h=600,fit=crop/YofU1cddTQzjoQ8J/horned-guan-mv02ExGWQJC0k2xv.jpg",
		"facts": [
			{
				"label": "Length",
				"value": "3 days"
			},
			{
				"label": "Focus",
				"value": "Pacific slope to the volcano"
			},
			{
				"label": "Group",
				"value": "Small, private"
			},
			{
				"label": "Languages",
				"value": "English, Spanish, Dutch"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/horned-guan-mv02ExGWQJC0k2xv.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/horned-guan-mv02ExGWQJC0k2xv.jpg",
				"alt": "Horned Guan",
				"caption": "Horned Guan"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/pink-headed-warbler-3-qDv5NS68FdQ7onyM.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/pink-headed-warbler-3-qDv5NS68FdQ7onyM.jpg",
				"alt": "Pink-headed Warbler",
				"caption": "Pink-headed Warbler · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"alt": "Blue-and-white Mockingbird",
				"caption": "Blue-and-white Mockingbird · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/_dsc0870-UHFcPZY27edAPFr1.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/_dsc0870-UHFcPZY27edAPFr1.JPG",
				"alt": "Giant Wren",
				"caption": "Giant Wren"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/rose-bellied-bunting-m2Wa32VjWETn9NkA.png",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/rose-bellied-bunting-m2Wa32VjWETn9NkA.png",
				"alt": "Rose-bellied Bunting",
				"caption": "Rose-bellied Bunting · Nagi Aboulenein"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/sabes_aves_blue-crowned_chlorophonia-1-YD0w1yZbj5fb90o7.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_blue-crowned_chlorophonia-1-YD0w1yZbj5fb90o7.jpg",
				"alt": "Blue-crowned Chlorophonia",
				"caption": "Blue-crowned Chlorophonia"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"alt": "Blue-throated Motmot",
				"caption": "Blue-throated Motmot"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/hooded-grosbeak-Jnoa3lBHTMdjXHGh.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/hooded-grosbeak-Jnoa3lBHTMdjXHGh.jpg",
				"alt": "Hooded Grosbeak",
				"caption": "Hooded Grosbeak"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/wine-throated-hummingbird-1KaFhnbxIE9aAt0U.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/wine-throated-hummingbird-1KaFhnbxIE9aAt0U.jpg",
				"alt": "Wine-throated Hummingbird",
				"caption": "Wine-throated Hummingbird"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/rufous-sabrewing-8lgcv1ND0RJovnoi.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/rufous-sabrewing-8lgcv1ND0RJovnoi.jpg",
				"alt": "Rufous Sabrewing",
				"caption": "Rufous Sabrewing"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/turquoise-browed-motmot-hwikmYfulmi5nHCi.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/turquoise-browed-motmot-hwikmYfulmi5nHCi.jpg",
				"alt": "Turquoise-browed Motmot",
				"caption": "Turquoise-browed Motmot · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/guatemalan-tyrannulet-HFmbr5dlTSRWWVe9.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/guatemalan-tyrannulet-HFmbr5dlTSRWWVe9.jpg",
				"alt": "Guatemalan Tyrannulet",
				"caption": "Guatemalan Tyrannulet · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/long-tailed-manakin-tqWbPcfxlxP9AoST.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/long-tailed-manakin-tqWbPcfxlxP9AoST.jpg",
				"alt": "Long-tailed Manakin",
				"caption": "Long-tailed Manakin · Jaime Pérez"
			}
		],
		"length": "3 days · Pacific slope to the volcano",
		"summary": "A focused push for the northern Central American highland endemics, from the Pacific slope up into the cloud forest of Tacaná Volcano on the Guatemalan border. The prize is the Horned Guan, reached by a long, hard hike, alongside a run of specialities found nowhere else in Mexico.",
		"draftNote": "This is a sample itinerary showing the kind of route we run. Exact days, sites and pace are tailored to your trip.",
		"headlineBirds": [
			"Horned Guan",
			"Pink-headed Warbler",
			"Orange-breasted Bunting",
			"Blue-and-white Mockingbird",
			"Blue-crowned Chlorophonia",
			"Blue-throated Motmot",
			"Giant Wren",
			"Rose-bellied Bunting"
		],
		"days": [
			{
				"label": "Day 1",
				"title": "Tuxtla → La Sepultura → the coast",
				"body": [
					"Starting from Tuxtla, we begin at La Sepultura for Rose-bellied Bunting, Orange-breasted Bunting, Citreoline Trogon and Cinnamon-tailed Sparrow, then finish the day nearer the coast for Spot-breasted Oriole, Giant Wren, Rufous-naped Wren and Rufous-backed Wren, pushing on to reach Unión Juárez."
				],
				"stay": "Overnight · Unión Juárez"
			},
			{
				"label": "Day 2",
				"title": "Unión Juárez → Chiquihuite",
				"body": [
					"A full morning birding around Unión Juárez on the humid Pacific slope for Azure-rumped Tanager, Blue-tailed Hummingbird, Sparkling-tailed Hummingbird, White-faced Quail-Dove, Rufous Sabrewing and Middle American Leaftosser, before heading up to the high-elevation town of Chiquihuite."
				],
				"stay": "Overnight · Chiquihuite"
			},
			{
				"label": "Day 3",
				"title": "Tacaná Volcano hike",
				"body": [
					"A long, hard day of hiking in search of the Horned Guan, with Black-capped Siskin, Buffy-crowned Wood-Partridge, Wine-throated Hummingbird and Pink-headed Warbler also on the mountain. A strenuous climb, around 3 hours of steep uphill to the primary site, followed by the descent. We overnight again at Chiquihuite; the trip ends here, with a drop-off at Tapachula airport or a long drive back to Tuxtla."
				],
				"stay": "Trip ends"
			}
		]
	},
	{
		"slug": "lowland-jungles",
		"kind": "multi-day",
		"title": "Lowland Jungles",
		"hero": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=900,h=600,fit=crop/YofU1cddTQzjoQ8J/keel-billed-toucan-N3wJ3xiANHuwBTFC.jpg",
		"facts": [
			{
				"label": "Length",
				"value": "4 days"
			},
			{
				"label": "Focus",
				"value": "Jungle, rivers and Maya ruins"
			},
			{
				"label": "Group",
				"value": "Small, private"
			},
			{
				"label": "Languages",
				"value": "English, Spanish, Dutch"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/keel-billed-toucan-N3wJ3xiANHuwBTFC.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/keel-billed-toucan-N3wJ3xiANHuwBTFC.jpg",
				"alt": "Keel-billed Toucan",
				"caption": "Keel-billed Toucan"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/ornate-hawk-eagle-mP4OGNwpvehoNJQq.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/ornate-hawk-eagle-mP4OGNwpvehoNJQq.jpg",
				"alt": "Ornate Hawk-Eagle",
				"caption": "Ornate Hawk-Eagle · Jaime Pérez"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/lovely-cotinga-kMeBqQD8MqFZoxbw.png",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/lovely-cotinga-kMeBqQD8MqFZoxbw.png",
				"alt": "Lovely Cotinga",
				"caption": "Lovely Cotinga"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/scarlet-macaw-VuZUDrvypQ0vU3dv.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/scarlet-macaw-VuZUDrvypQ0vU3dv.jpg",
				"alt": "Scarlet Macaw",
				"caption": "Scarlet Macaw · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/tropical-royal-flycatcher-1-anIw6HaxJjuJCPks.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/tropical-royal-flycatcher-1-anIw6HaxJjuJCPks.jpg",
				"alt": "Tropical Royal Flycatcher",
				"caption": "Tropical Royal Flycatcher · Sergio Gómez Villaverde"
			}
		],
		"length": "4 days · Jungle, rivers and Maya ruins",
		"summary": "A rainforest trip through the Lacandón, beginning at the Palenque ruins and working east along the Usumacinta to Bonampak and Yaxchilán, then north to the pristine forest and lake at Nahá. High diversity, easy photography, celebrated archaeology, and a run of night birds.",
		"draftNote": "This is a sample itinerary showing the kind of route we run. Exact days, sites and pace are tailored to your trip.",
		"headlineBirds": [
			"Keel-billed Toucan",
			"Lovely Cotinga",
			"Scarlet Macaw",
			"Tody Motmot",
			"Tawny-collared Nightjar",
			"Ornate Hawk-Eagle",
			"Red-capped Manakin",
			"Slaty-tailed Trogon",
			"Rufous-tailed Jacamar",
			"Spectacled Owl"
		],
		"days": [
			{
				"label": "Day 1",
				"title": "Palenque",
				"body": [
					"A full day birding the rainforest around the Palenque ruins for Keel-billed Toucan, Slaty-tailed Trogon, Red-capped Manakin, Tody Motmot, Rufous-tailed Jacamar, Montezuma's Oropendola and forest raptors, with the option to visit the archaeological site itself. In the afternoon we continue east to Bonampak, ready for the next morning."
				],
				"stay": "Overnight · Bonampak / Lacanjá"
			},
			{
				"label": "Day 2",
				"title": "Bonampak → Yaxchilán",
				"body": [
					"A full morning birding Bonampak in the Montes Azules reserve for shrike-tanagers, manakins, cotingas and hawk-eagles, with a visit to the ruins and their extraordinarily well-preserved murals. We then continue to the Usumacinta and overnight at Frontera Corozal, ready for Yaxchilán."
				],
				"stay": "Overnight · Frontera Corozal"
			},
			{
				"label": "Day 3",
				"title": "Yaxchilán → Nahá",
				"body": [
					"A boat ride up the Usumacinta to Yaxchilán, where a lookout tower brings you remarkably close to tropical raptors and canopy birds in intact riverine forest. In the afternoon we make the long drive north to Nahá. The evening's treat is the Tawny-collared Nightjar, a surprising disjunct population found only here, with a chance too at Black-and-white Owl, Spectacled Owl, Crested Owl and Middle American Screech-Owl."
				],
				"stay": "Overnight · Nahá"
			},
			{
				"label": "Day 4",
				"title": "Nahá",
				"body": [
					"A final morning at Nahá, one of the most productive sites in Chiapas, with a chance at Lovely Cotinga alongside guans, manakins, wood-quail, multiple hawk-eagles and a wide range of hummingbirds, before the trip ends."
				],
				"stay": "Trip ends"
			}
		]
	},
	{
		"slug": "full-endemics",
		"kind": "multi-day",
		"title": "Full Endemics",
		"hero": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=900,h=600,fit=crop/YofU1cddTQzjoQ8J/rose-bellied-bunting-m2Wa32VjWETn9NkA.png",
		"facts": [
			{
				"label": "Length",
				"value": "9–10 days"
			},
			{
				"label": "Focus",
				"value": "The complete sweep, highlands to volcano"
			},
			{
				"label": "Group",
				"value": "Small, private"
			},
			{
				"label": "Languages",
				"value": "English, Spanish, Dutch"
			}
		],
		"gallery": [
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/pink-headed-warbler-1-aLtT3eAXkiqtjRWh.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/pink-headed-warbler-1-aLtT3eAXkiqtjRWh.jpg",
				"alt": "Pink-headed Warbler",
				"caption": "Pink-headed Warbler · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/belted-flycatcher-great-photo-iZzV6wprekrFaMzq.jpg",
				"alt": "Belted Flycatcher",
				"caption": "Belted Flycatcher"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg",
				"alt": "Blue-and-white Mockingbird",
				"caption": "Blue-and-white Mockingbird · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/horned-guan-mv02ExGWQJC0k2xv.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/horned-guan-mv02ExGWQJC0k2xv.jpg",
				"alt": "Horned Guan",
				"caption": "Horned Guan"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/unicolored-jay-s7sJYdXMbsQy4iJO.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/unicolored-jay-s7sJYdXMbsQy4iJO.jpg",
				"alt": "Unicolored Jay",
				"caption": "Unicolored Jay"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/sabes_aves_blue-crowned_chlorophonia-1-YD0w1yZbj5fb90o7.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_blue-crowned_chlorophonia-1-YD0w1yZbj5fb90o7.jpg",
				"alt": "Blue-crowned Chlorophonia",
				"caption": "Blue-crowned Chlorophonia"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG",
				"alt": "Blue-throated Motmot",
				"caption": "Blue-throated Motmot"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/slender-sheartail-qMw7TVBhS9Q1882N.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/slender-sheartail-qMw7TVBhS9Q1882N.jpg",
				"alt": "Slender Sheartail",
				"caption": "Slender Sheartail · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/agami-heron-CwzZQHYqe6AfiDTq.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/agami-heron-CwzZQHYqe6AfiDTq.jpg",
				"alt": "Agami Heron",
				"caption": "Agami Heron"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/azure-hooded-jay-w6Bqp2psIEeDOfzQ.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/azure-hooded-jay-w6Bqp2psIEeDOfzQ.jpg",
				"alt": "Azure-hooded Jay",
				"caption": "Azure-hooded Jay · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/bearded-screech-owl-B5Fngu1MgWbNIBDY.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/bearded-screech-owl-B5Fngu1MgWbNIBDY.jpg",
				"alt": "Bearded Screech-Owl",
				"caption": "Bearded Screech-Owl · Sergio Gómez Villaverde"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/black-collared-hawk-oFYKYtW5m1pBiNws.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/black-collared-hawk-oFYKYtW5m1pBiNws.jpg",
				"alt": "Black-collared Hawk",
				"caption": "Black-collared Hawk"
			},
			{
				"thumb": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=500,h=500,fit=crop/YofU1cddTQzjoQ8J/collared-aracari-photo_-jaime-pa-c-rez-AMq1q4LoPbF5nQvP.jpg",
				"full": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/collared-aracari-photo_-jaime-pa-c-rez-AMq1q4LoPbF5nQvP.jpg",
				"alt": "Collared Aracari",
				"caption": "Collared Aracari · Jaime Pérez"
			}
		],
		"length": "9–10 days · The complete sweep, highlands to volcano",
		"summary": "Our most complete trip, and the one for a serious endemic list. A full sweep from the highland cloud forest around San Cristóbal, through the lowland forest of El Ocote and the Pacific dry forest and coast, and up into the high cloud forest of Tacaná on the Guatemalan border for the region's hardest and most coveted bird, the Horned Guan. High-elevation, occasionally strenuous, and exceptional.",
		"draftNote": "",
		"headlineBirds": [
			"Rose-bellied Bunting",
			"Pink-headed Warbler",
			"Nava's Wren",
			"Belted Flycatcher",
			"Blue-and-white Mockingbird",
			"Horned Guan",
			"Agami Heron",
			"Azure-hooded Jay"
		],
		"days": [
			{
				"label": "Day 1",
				"title": "San Cristóbal de las Casas",
				"body": [
					"Birding the pine-oak and cloud forest around San Cristóbal for the highland specialities: Pink-headed Warbler, Garnet-throated Hummingbird, Rufous-browed Wren, Black-throated Jay, Black-capped Swallow, Blue-throated Motmot, Unicolored Jay. Evening drive to Comitán (2 hrs)."
				],
				"stay": "Overnight · Comitán"
			},
			{
				"label": "Day 2",
				"title": "Lagunas de Montebello National Park",
				"body": [
					"A 1 hr drive from Comitán into one of the region's finest cloud-forest sites, with chances for Highland Guan, Resplendent Quetzal, Azure-hooded Jay, Black-throated Jay, Yellow-throated Nightingale-Thrush, and a wide range of cloud-forest species."
				],
				"stay": "Overnight · Comitán"
			},
			{
				"label": "Day 3",
				"title": "Tenam Puente & Comitán surroundings",
				"body": [
					"The archaeological site and nearby habitat (40 min drive) for Blue-and-white Mockingbird, Belted Flycatcher, White-eared Ground-Sparrow, Slender Sheartail and Lesser Roadrunner. Afternoon drive back to San Cristóbal (2 hrs)."
				],
				"stay": "Overnight · San Cristóbal"
			},
			{
				"label": "Day 4",
				"title": "El Ocote",
				"body": [
					"A 2 hr drive to the El Ocote region for a full day across multiple sites. At Armando Zebadúa: Nava's Wren (microendemic), Keel-billed Toucan, Collared Aracari, Green Shrike-Vireo, Smoky-brown Woodpecker, Black-faced Grosbeak, Crested Guan and other tropical lowland birds. Laguna Bélgica and the buffer zone add further lowland species."
				],
				"stay": "Overnight · Ocozocoautla"
			},
			{
				"label": "Day 5",
				"title": "La Sepultura → Pacific slope",
				"body": [
					"A short ~1 hr drive to La Sepultura for Rose-bellied Bunting, Orange-breasted Bunting, Great Swallow-tailed Swift, Cinnamon-tailed Sparrow and Citreoline Trogon. Then ~3 hrs to Mapastepec, with a birding stop en route for Giant Wren, Rufous-backed Wren, Salvadoran Flycatcher and Spot-breasted Oriole."
				],
				"stay": "Overnight · Mapastepec"
			},
			{
				"label": "Day 6",
				"title": "El Castaño",
				"body": [
					"A ~1 hr drive to the mangroves and wetlands of El Castaño, chiefly for Agami Heron, American Pygmy Kingfisher, Black-collared Hawk and other mangrove birds, with more lowland tropical species possible such as White-whiskered Puffbird and Gartered Trogon. Long transfer to Chiquihuite afterwards (~4 hrs)."
				],
				"stay": "Overnight · Chiquihuite"
			},
			{
				"label": "Day 7",
				"title": "Chiquihuite town",
				"body": [
					"Morning birding the surrounds of Chiquihuite, a high-elevation town at mid-level on Tacaná Volcano. Species include Black Thrush, Hooded Grosbeak, Green-throated Mountain-gem, Guatemalan Tyrannulet, Blue-crowned Chlorophonia, Blue-throated Motmot, Buffy-crowned Wood-Partridge and Black-capped Swallow. Possible owling at night for Fulvous Owl and Unspotted Saw-whet Owl. This portion is high-elevation birding: temperatures are lower, the area is rural with patchy internet, conditions variable and lodgings basic, but the rewards can be exceptional."
				],
				"stay": "Overnight · Chiquihuite"
			},
			{
				"label": "Day 8",
				"title": "Tacaná Volcano hike",
				"body": [
					"A challenging morning of hiking in search of the Horned Guan, Black-capped Siskin, Buffy-crowned Wood-Partridge, Wine-throated Hummingbird and Pink-headed Warbler. This is a strenuous hike, around 3 hours of fairly steep uphill to the primary Horned Guan site, with an optional further hour's climb for Black-capped Siskin and Broad-tailed Hummingbird, followed by the descent. More owling if energy permits."
				],
				"stay": "Overnight · Chiquihuite"
			},
			{
				"label": "Day 9",
				"title": "Unión Juárez",
				"body": [
					"An easier morning birding our way downslope for Azure-rumped Tanager, Blue-tailed Hummingbird, Sparkling-tailed Hummingbird, White-faced Quail-Dove, Middle American Leaftosser and Ruddy Foliage-gleaner, before driving to Tapachula airport where the trip ends, or on to Tuxtla for an optional final morning at Sumidero."
				],
				"stay": "Overnight · Optional: Tuxtla"
			},
			{
				"label": "Day 10",
				"title": "Sumidero Canyon (optional)",
				"body": [
					"A final morning birding the dramatic Sumidero Canyon, with chances for Blue Seedeater, Slender Sheartail, Belted Flycatcher, Bar-winged Oriole and dry-deciduous specialists, before the trip ends."
				],
				"stay": "Trip ends"
			}
		]
	}
];

export function getTourDetail(slug: string): TourDetail | undefined {
	return tourDetails.find((t) => t.slug === slug);
}
