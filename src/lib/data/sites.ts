import type { TierCode } from './taxonomy';

export interface SiteBird {
	name: string;
	/** Endemism tier, when the bird is an endemic or near-endemic. */
	tier: TierCode | null;
}

export interface Site {
	id: string;
	name: string;
	habitat: string;
	/** Elevation in metres. */
	elev: number;
	blurb: string;
	/** Habitat-zone colour used for the pin and the site card. */
	zoneColor: string;
	/** Pin position in the base map's 760x660 viewBox. */
	x: number;
	y: number;
	birds: SiteBird[];
}

export interface MapBird {
	name: string;
	tier: TierCode | null;
	/** Site ids where this bird can be found. */
	sites: string[];
}

/** Short labels for the endemism badges shown on bird chips. */
export const TIER_LABELS: Record<string, string> = { mx: 'MX', wmx: 'W-MX', nca: 'NCA' };

/** The base map is drawn in this coordinate space. */
export const MAP_VIEWBOX = '0 0 760 660';

/** The 18 birding sites behind "Everywhere we bird". */
export const sites: Site[] = [
	{
		"id": "sancris",
		"name": "San Cristóbal de las Casas",
		"habitat": "Pine-oak & pine-evergreen · Humid evergreen (cloud) forest",
		"elev": 2200,
		"blurb": "The highland base, and the easiest place in the world for several northern Central American specialities, including the Pink-headed Warbler.",
		"zoneColor": "#6E8B4A",
		"x": 338,
		"y": 244.7,
		"birds": [
			{
				"name": "Pink-headed Warbler",
				"tier": "nca"
			},
			{
				"name": "Bearded Screech-Owl",
				"tier": null
			},
			{
				"name": "Garnet-throated Hummingbird",
				"tier": "nca"
			},
			{
				"name": "Blue-throated Motmot",
				"tier": "nca"
			},
			{
				"name": "Black-throated Jay",
				"tier": "nca"
			},
			{
				"name": "Rufous-browed Wren",
				"tier": "nca"
			},
			{
				"name": "Unicolored Jay",
				"tier": "nca"
			},
			{
				"name": "Black-capped Swallow",
				"tier": "nca"
			},
			{
				"name": "Mountain Trogon",
				"tier": null
			},
			{
				"name": "Unspotted Saw-whet Owl",
				"tier": null
			},
			{
				"name": "Red-faced Warbler",
				"tier": null
			},
			{
				"name": "Golden-browed Warbler",
				"tier": null
			},
			{
				"name": "Amethyst-throated Mountaingem",
				"tier": null
			},
			{
				"name": "Rivoli's Hummingbird",
				"tier": null
			},
			{
				"name": "Highland Guan",
				"tier": "nca"
			},
			{
				"name": "Blue-and-white Mockingbird",
				"tier": "nca"
			},
			{
				"name": "Guatemalan Flicker",
				"tier": "nca"
			},
			{
				"name": "Rufous-collared Robin",
				"tier": "nca"
			},
			{
				"name": "Golden-cheeked Warbler",
				"tier": null
			},
			{
				"name": "Azure-crowned Hummingbird",
				"tier": null
			},
			{
				"name": "Singing Quail",
				"tier": null
			},
			{
				"name": "Ruddy-capped Nightingale-Thrush",
				"tier": null
			}
		]
	},
	{
		"id": "sumidero",
		"name": "Sumidero Canyon",
		"habitat": "Thorn forest & arid scrub",
		"elev": 1000,
		"blurb": "A dramatic limestone canyon above the Grijalva, an hour from San Cristóbal, with a strong cast of dry-forest specialities.",
		"zoneColor": "#B08033",
		"x": 261,
		"y": 228.9,
		"birds": [
			{
				"name": "Belted Flycatcher",
				"tier": "nca"
			},
			{
				"name": "Flammulated Flycatcher",
				"tier": "wmx"
			},
			{
				"name": "Red-breasted Chat",
				"tier": "wmx"
			},
			{
				"name": "Slender Sheartail",
				"tier": "nca"
			},
			{
				"name": "Bar-winged Oriole",
				"tier": "nca"
			},
			{
				"name": "Blue Seedeater",
				"tier": null
			},
			{
				"name": "Russet-crowned Motmot",
				"tier": "wmx"
			},
			{
				"name": "White-throated Magpie-Jay",
				"tier": null
			},
			{
				"name": "Green Jay",
				"tier": null
			},
			{
				"name": "Thicket Tinamou",
				"tier": null
			},
			{
				"name": "Fan-tailed Warbler",
				"tier": null
			},
			{
				"name": "Banded Wren",
				"tier": null
			},
			{
				"name": "Highland Guan",
				"tier": "nca"
			},
			{
				"name": "Maroon-chested Ground Dove",
				"tier": null
			},
			{
				"name": "Blue-and-white Mockingbird",
				"tier": "nca"
			},
			{
				"name": "Green-fronted Hummingbird",
				"tier": "wmx"
			}
		]
	},
	{
		"id": "comitan",
		"name": "Comitán & Tenam Puente",
		"habitat": "Pine-oak & pine-evergreen · Thorn forest & arid scrub · Pacific coast & wetland",
		"elev": 1550,
		"blurb": "Valente's base. Maya ruins at the pine-oak/dry-forest transition, ancient cypresses, and high-elevation wetlands.",
		"zoneColor": "#6E8B4A",
		"x": 427.3,
		"y": 322.1,
		"birds": [
			{
				"name": "Belted Flycatcher",
				"tier": "nca"
			},
			{
				"name": "Slender Sheartail",
				"tier": "nca"
			},
			{
				"name": "Blue-and-white Mockingbird",
				"tier": "nca"
			},
			{
				"name": "Lesser Roadrunner",
				"tier": null
			},
			{
				"name": "Rock Wren",
				"tier": null
			},
			{
				"name": "Botteri's Sparrow",
				"tier": null
			},
			{
				"name": "Yellow Grosbeak",
				"tier": null
			},
			{
				"name": "Grass Wren",
				"tier": null
			},
			{
				"name": "Pie-billed Grebe",
				"tier": null
			},
			{
				"name": "Ruddy Crake",
				"tier": null
			},
			{
				"name": "White-faced Ground-Sparrow",
				"tier": "nca"
			},
			{
				"name": "Guatemalan Flicker",
				"tier": "nca"
			},
			{
				"name": "White-tailed Kite",
				"tier": null
			},
			{
				"name": "White-tailed Hawk",
				"tier": null
			}
		]
	},
	{
		"id": "montebello",
		"name": "Lagunas de Montebello",
		"habitat": "Humid evergreen (cloud) forest",
		"elev": 1500,
		"blurb": "Forested lakes on the Guatemalan border, an hour from Comitán, and one of the region's finest cloud-forest sites.",
		"zoneColor": "#2E6E52",
		"x": 506,
		"y": 344.2,
		"birds": [
			{
				"name": "Resplendent Quetzal",
				"tier": "nca"
			},
			{
				"name": "Highland Guan",
				"tier": "nca"
			},
			{
				"name": "Azure-hooded Jay",
				"tier": null
			},
			{
				"name": "Black-throated Jay",
				"tier": "nca"
			},
			{
				"name": "Yellow-throated Nightingale-Thrush",
				"tier": "nca"
			},
			{
				"name": "Barred Parakeet",
				"tier": null
			},
			{
				"name": "Green-throated Mountaingem",
				"tier": null
			},
			{
				"name": "Flame-colored Tanager",
				"tier": null
			},
			{
				"name": "Slate-colored Solitaire",
				"tier": null
			},
			{
				"name": "Rufous-browed Wren",
				"tier": "nca"
			},
			{
				"name": "Black-headed Nightingale-Thrush",
				"tier": null
			},
			{
				"name": "Slaty-breasted Tinamou",
				"tier": null
			},
			{
				"name": "Northern Emerald-Toucanet",
				"tier": null
			},
			{
				"name": "Gray-breasted Wood-Wren",
				"tier": null
			},
			{
				"name": "Blue-throated Motmot",
				"tier": "nca"
			},
			{
				"name": "Ruddy Foliage-gleaner",
				"tier": null
			}
		]
	},
	{
		"id": "tapalapa",
		"name": "Tapalapa",
		"habitat": "Humid evergreen (cloud) forest",
		"elev": 1750,
		"blurb": "A humid highland site to the north, good for cloud-forest species including quetzal and some harder-to-find understorey birds.",
		"zoneColor": "#2E6E52",
		"x": 252.3,
		"y": 173.7,
		"birds": [
			{
				"name": "Resplendent Quetzal",
				"tier": "nca"
			},
			{
				"name": "Maroon-chested Ground Dove",
				"tier": null
			},
			{
				"name": "Northern Emerald-Toucanet",
				"tier": null
			},
			{
				"name": "Highland Guan",
				"tier": "nca"
			},
			{
				"name": "Green-throated Mountaingem",
				"tier": null
			},
			{
				"name": "Blue-throated Motmot",
				"tier": "nca"
			},
			{
				"name": "Black Thrush",
				"tier": "nca"
			},
			{
				"name": "Blue-crowned Chlorophonia",
				"tier": "nca"
			},
			{
				"name": "Mountain Elaenia",
				"tier": null
			},
			{
				"name": "Azure-hooded Jay",
				"tier": null
			},
			{
				"name": "Fulvous Owl",
				"tier": null
			},
			{
				"name": "Singing Quail",
				"tier": null
			}
		]
	},
	{
		"id": "ocote",
		"name": "El Ocote",
		"habitat": "Tropical evergreen (rainforest)",
		"elev": 700,
		"blurb": "A vast biosphere reserve of limestone and rainforest with spectacular viewpoints, best for Nava's Wren and lowland Central American forest birds.",
		"zoneColor": "#1E6E5A",
		"x": 166.5,
		"y": 224.2,
		"birds": [
			{
				"name": "Nava's Wren",
				"tier": "mx"
			},
			{
				"name": "Keel-billed Toucan",
				"tier": null
			},
			{
				"name": "Collared Aracari",
				"tier": null
			},
			{
				"name": "Green Shrike-Vireo",
				"tier": null
			},
			{
				"name": "Black Hawk-Eagle",
				"tier": null
			},
			{
				"name": "Crested Guan",
				"tier": null
			},
			{
				"name": "Black-faced Grosbeak",
				"tier": null
			},
			{
				"name": "Smoky-brown Woodpecker",
				"tier": null
			},
			{
				"name": "Pheasant Cuckoo",
				"tier": null
			},
			{
				"name": "Stripe-tailed Hummingbird",
				"tier": null
			},
			{
				"name": "Lesson's Motmot",
				"tier": null
			},
			{
				"name": "Wedge-tailed Sabrewing",
				"tier": null
			},
			{
				"name": "Gartered Trogon",
				"tier": null
			},
			{
				"name": "White-crowned Parrot",
				"tier": null
			},
			{
				"name": "Green-backed Sparrow",
				"tier": "nca"
			},
			{
				"name": "Montezuma Oropendola",
				"tier": null
			},
			{
				"name": "Red-legged Honeycreeper",
				"tier": null
			},
			{
				"name": "Stub-tailed Spadebill",
				"tier": null
			},
			{
				"name": "Slaty-breasted Tinamou",
				"tier": null
			},
			{
				"name": "Long-billed Gnatwren",
				"tier": null
			},
			{
				"name": "Royal Flycatcher",
				"tier": null
			},
			{
				"name": "Ornate Hawk-Eagle",
				"tier": null
			}
		]
	},
	{
		"id": "sepultura",
		"name": "La Sepultura",
		"habitat": "Pacific slope & foothill forest · Thorn forest & arid scrub",
		"elev": 1200,
		"blurb": "Sierra Madre foothills on the Pacific side, and the surest ground for the flagship Rose-bellied Bunting.",
		"zoneColor": "#3E8C7E",
		"x": 156,
		"y": 314.2,
		"birds": [
			{
				"name": "Rose-bellied Bunting",
				"tier": "mx"
			},
			{
				"name": "Orange-breasted Bunting",
				"tier": "wmx"
			},
			{
				"name": "Cinnamon-tailed Sparrow",
				"tier": "mx"
			},
			{
				"name": "Citreoline Trogon",
				"tier": "wmx"
			},
			{
				"name": "Green-fronted Hummingbird",
				"tier": "wmx"
			},
			{
				"name": "Great Swallow-tailed Swift",
				"tier": null
			},
			{
				"name": "West Mexican Chachalaca",
				"tier": "wmx"
			},
			{
				"name": "Long-tailed Manakin",
				"tier": "nca"
			},
			{
				"name": "Lesser Ground-Cuckoo",
				"tier": null
			},
			{
				"name": "White-throated Magpie-Jay",
				"tier": null
			}
		]
	},
	{
		"id": "tonala",
		"name": "Tonalá & the coast",
		"habitat": "Pacific coast & wetland · Thorn forest & arid scrub",
		"elev": 60,
		"blurb": "The hot Pacific coastline and dry forest around Tonalá, for Giant Wren and a suite of coastal and west-Mexican specialities.",
		"zoneColor": "#4E7A9B",
		"x": 143.8,
		"y": 347.4,
		"birds": [
			{
				"name": "Giant Wren",
				"tier": "mx"
			},
			{
				"name": "Spot-breasted Oriole",
				"tier": null
			},
			{
				"name": "Rufous-backed Wren",
				"tier": null
			},
			{
				"name": "Salvadoran Flycatcher",
				"tier": "nca"
			},
			{
				"name": "White-bellied Chachalaca",
				"tier": "nca"
			},
			{
				"name": "Turquoise-browed Motmot",
				"tier": null
			},
			{
				"name": "Yellow-headed Amazon",
				"tier": "mx"
			},
			{
				"name": "Orange-fronted Parakeet",
				"tier": null
			},
			{
				"name": "Roseate Spoonbill",
				"tier": null
			},
			{
				"name": "White-throated Magpie-Jay",
				"tier": null
			},
			{
				"name": "Russet-naped Wren",
				"tier": "wmx"
			},
			{
				"name": "West Mexican Chachalaca",
				"tier": "wmx"
			},
			{
				"name": "Citreoline Trogon",
				"tier": "wmx"
			},
			{
				"name": "Cinnamon Hummingbird",
				"tier": null
			},
			{
				"name": "Russet-crowned Motmot",
				"tier": "wmx"
			},
			{
				"name": "Pacific Screech-Owl",
				"tier": null
			},
			{
				"name": "Spot-tailed Nightjar",
				"tier": null
			},
			{
				"name": "Striped Owl",
				"tier": null
			}
		]
	},
	{
		"id": "piedra",
		"name": "Piedra de Huixtla",
		"habitat": "Pacific slope & foothill forest · Thorn forest & arid scrub",
		"elev": 300,
		"blurb": "A Pacific-slope foothill site above the coastal plain, adding dry-forest and foothill species to a coastal loop.",
		"zoneColor": "#3E8C7E",
		"x": 349.8,
		"y": 431.8,
		"birds": [
			{
				"name": "Blue-tailed Hummingbird",
				"tier": "nca"
			},
			{
				"name": "Sparkling-tailed Woodstar",
				"tier": null
			},
			{
				"name": "Russet-crowned Motmot",
				"tier": "wmx"
			},
			{
				"name": "Long-tailed Manakin",
				"tier": "nca"
			},
			{
				"name": "Rufous-and-white Wren",
				"tier": null
			},
			{
				"name": "White-faced Ground-Sparrow",
				"tier": "nca"
			},
			{
				"name": "Prevost's Ground-Sparrow",
				"tier": null
			},
			{
				"name": "White-bellied Chachalaca",
				"tier": "nca"
			}
		]
	},
	{
		"id": "castano",
		"name": "El Castaño",
		"habitat": "Pacific coast & wetland",
		"elev": 10,
		"blurb": "Coastal mangroves and wetlands reached by boat, chiefly for the Agami Heron and other water and mangrove birds.",
		"zoneColor": "#4E7A9B",
		"x": 327,
		"y": 493.9,
		"birds": [
			{
				"name": "Agami Heron",
				"tier": null
			},
			{
				"name": "American Pygmy Kingfisher",
				"tier": null
			},
			{
				"name": "Black-collared Hawk",
				"tier": null
			},
			{
				"name": "Bare-throated Tiger-Heron",
				"tier": null
			},
			{
				"name": "White-whiskered Puffbird",
				"tier": null
			},
			{
				"name": "Sungrebe",
				"tier": null
			},
			{
				"name": "Boat-billed Heron",
				"tier": null
			},
			{
				"name": "Gartered Trogon",
				"tier": null
			}
		]
	},
	{
		"id": "catazaja",
		"name": "Catazajá",
		"habitat": "Pacific coast & wetland",
		"elev": 20,
		"blurb": "Extensive northern wetlands and lagoons, for waterbirds, marsh species and lowland specialities.",
		"zoneColor": "#4E7A9B",
		"x": 452.1,
		"y": 89.9,
		"birds": [
			{
				"name": "Jabiru",
				"tier": null
			},
			{
				"name": "Pinnated Bittern",
				"tier": null
			},
			{
				"name": "Ruddy Crake",
				"tier": null
			},
			{
				"name": "Black-collared Hawk",
				"tier": null
			},
			{
				"name": "Yellow-headed Amazon",
				"tier": "mx"
			},
			{
				"name": "Bare-throated Tiger-Heron",
				"tier": null
			},
			{
				"name": "Snail Kite",
				"tier": null
			},
			{
				"name": "Spot-tailed Nightjar",
				"tier": null
			}
		]
	},
	{
		"id": "chiquihuite",
		"name": "Chiquihuite",
		"habitat": "Humid evergreen (cloud) forest · Pine-oak & pine-evergreen",
		"elev": 2000,
		"blurb": "A high-elevation town on the flanks of Tacaná, the staging point for the Horned Guan hike and a suite of highland specialities.",
		"zoneColor": "#2E6E52",
		"x": 409.8,
		"y": 491.4,
		"birds": [
			{
				"name": "Black Thrush",
				"tier": "nca"
			},
			{
				"name": "Hooded Grosbeak",
				"tier": null
			},
			{
				"name": "Green-throated Mountaingem",
				"tier": null
			},
			{
				"name": "Guatemalan Tyrannulet",
				"tier": "nca"
			},
			{
				"name": "Blue-crowned Chlorophonia",
				"tier": "nca"
			},
			{
				"name": "Buffy-crowned Wood-Partridge",
				"tier": null
			},
			{
				"name": "Fulvous Owl",
				"tier": null
			},
			{
				"name": "Blue-throated Motmot",
				"tier": "nca"
			},
			{
				"name": "Blue-and-white Mockingbird",
				"tier": "nca"
			},
			{
				"name": "Rivoli's Hummingbird",
				"tier": null
			},
			{
				"name": "Rufous-collared Robin",
				"tier": "nca"
			},
			{
				"name": "Unspotted Saw-whet Owl",
				"tier": null
			},
			{
				"name": "Stygian Owl",
				"tier": null
			},
			{
				"name": "Chestnut-sided Shrike-Vireo",
				"tier": null
			}
		]
	},
	{
		"id": "tacana",
		"name": "Tacaná Volcano",
		"habitat": "Humid evergreen (cloud) forest",
		"elev": 4060,
		"blurb": "The highest peak in Chiapas, and the hardest and most coveted birding in the state. A strenuous hike for the Horned Guan.",
		"zoneColor": "#2E6E52",
		"x": 436.8,
		"y": 508.9,
		"birds": [
			{
				"name": "Horned Guan",
				"tier": "nca"
			},
			{
				"name": "Black-capped Siskin",
				"tier": "nca"
			},
			{
				"name": "Wine-throated Hummingbird",
				"tier": null
			},
			{
				"name": "Buffy-crowned Wood-Partridge",
				"tier": null
			},
			{
				"name": "Pink-headed Warbler",
				"tier": "nca"
			},
			{
				"name": "Ocellated Quail",
				"tier": "nca"
			},
			{
				"name": "Unspotted Saw-whet Owl",
				"tier": null
			},
			{
				"name": "Stygian Owl",
				"tier": null
			},
			{
				"name": "Black-throated Jay",
				"tier": "nca"
			},
			{
				"name": "Resplendent Quetzal",
				"tier": "nca"
			}
		]
	},
	{
		"id": "union",
		"name": "Unión Juárez",
		"habitat": "Pacific slope & foothill forest",
		"elev": 1100,
		"blurb": "Lower on the Tacaná slope, humid foothill forest for the Azure-rumped Tanager and other Pacific-slope specialities.",
		"zoneColor": "#3E8C7E",
		"x": 412,
		"y": 525.6,
		"birds": [
			{
				"name": "Azure-rumped Tanager",
				"tier": "nca"
			},
			{
				"name": "Blue-tailed Hummingbird",
				"tier": "nca"
			},
			{
				"name": "Sparkling-tailed Woodstar",
				"tier": null
			},
			{
				"name": "White-faced Quail-Dove",
				"tier": null
			},
			{
				"name": "Rufous Sabrewing",
				"tier": null
			},
			{
				"name": "Middle American Leaftosser",
				"tier": null
			},
			{
				"name": "Chestnut-sided Shrike-Vireo",
				"tier": null
			},
			{
				"name": "Emerald-chinned Hummingbird",
				"tier": "nca"
			},
			{
				"name": "Yellow-throated Nightingale-Thrush",
				"tier": "nca"
			}
		]
	},
	{
		"id": "palenque",
		"name": "Palenque",
		"habitat": "Tropical evergreen (rainforest)",
		"elev": 100,
		"blurb": "Lowland rainforest around the famous Maya ruins, the easiest rainforest birding in the state.",
		"zoneColor": "#1E6E5A",
		"x": 441.3,
		"y": 127.9,
		"birds": [
			{
				"name": "Keel-billed Toucan",
				"tier": null
			},
			{
				"name": "Scarlet Macaw",
				"tier": null
			},
			{
				"name": "Red-capped Manakin",
				"tier": null
			},
			{
				"name": "Tody Motmot",
				"tier": null
			},
			{
				"name": "Rufous-tailed Jacamar",
				"tier": null
			},
			{
				"name": "Slaty-tailed Trogon",
				"tier": null
			},
			{
				"name": "Montezuma's Oropendola",
				"tier": null
			},
			{
				"name": "King Vulture",
				"tier": null
			},
			{
				"name": "Tropical Royal Flycatcher",
				"tier": null
			},
			{
				"name": "Violet Sabrewing",
				"tier": null
			}
		]
	},
	{
		"id": "yaxchilan",
		"name": "Yaxchilán",
		"habitat": "Tropical evergreen (rainforest)",
		"elev": 120,
		"blurb": "Intact riverine forest on the Usumacinta, reached by boat along the Guatemalan border.",
		"zoneColor": "#1E6E5A",
		"x": 632,
		"y": 219.5,
		"birds": [
			{
				"name": "King Vulture",
				"tier": null
			},
			{
				"name": "Scarlet Macaw",
				"tier": null
			},
			{
				"name": "Lovely Cotinga",
				"tier": null
			},
			{
				"name": "White-whiskered Puffbird",
				"tier": null
			},
			{
				"name": "Great Curassow",
				"tier": null
			},
			{
				"name": "Rufous-tailed Jacamar",
				"tier": null
			}
		]
	},
	{
		"id": "bonampak",
		"name": "Bonampak",
		"habitat": "Tropical evergreen (rainforest)",
		"elev": 300,
		"blurb": "Rainforest and famous Maya murals in the Montes Azules reserve, for shrike-tanagers, manakins and hawk-eagles.",
		"zoneColor": "#1E6E5A",
		"x": 614.5,
		"y": 251.1,
		"birds": [
			{
				"name": "Black-throated Shrike-Tanager",
				"tier": null
			},
			{
				"name": "Red-capped Manakin",
				"tier": null
			},
			{
				"name": "Ornate Hawk-Eagle",
				"tier": null
			},
			{
				"name": "Black Hawk-Eagle",
				"tier": null
			},
			{
				"name": "Great Curassow",
				"tier": null
			},
			{
				"name": "White-collared Manakin",
				"tier": null
			}
		]
	},
	{
		"id": "naha",
		"name": "Nahá",
		"habitat": "Tropical evergreen (rainforest) · Humid evergreen (cloud) forest",
		"elev": 900,
		"blurb": "One of the most productive sites in Chiapas: pristine forest and a lake, with cotingas, guans, manakins, wood-quail and multiple hawk-eagles.",
		"zoneColor": "#1E6E5A",
		"x": 520,
		"y": 222.6,
		"birds": [
			{
				"name": "Lovely Cotinga",
				"tier": null
			},
			{
				"name": "Ornate Hawk-Eagle",
				"tier": null
			},
			{
				"name": "Black Hawk-Eagle",
				"tier": null
			},
			{
				"name": "Tody Motmot",
				"tier": null
			},
			{
				"name": "Nightingale Wren",
				"tier": null
			},
			{
				"name": "Northern Emerald-Toucanet",
				"tier": null
			},
			{
				"name": "Tawny-collared Nightjar",
				"tier": "mx"
			}
		]
	}
];

/** Reverse index: which sites hold each bird, for species mode. */
export const mapBirds: MapBird[] = [
	{
		"name": "Pink-headed Warbler",
		"tier": "nca",
		"sites": [
			"sancris",
			"tacana"
		]
	},
	{
		"name": "Bearded Screech-Owl",
		"tier": "nca",
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Garnet-throated Hummingbird",
		"tier": "nca",
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Blue-throated Motmot",
		"tier": "nca",
		"sites": [
			"sancris",
			"chiquihuite"
		]
	},
	{
		"name": "Black-throated Jay",
		"tier": "nca",
		"sites": [
			"sancris",
			"montebello"
		]
	},
	{
		"name": "Rufous-browed Wren",
		"tier": "nca",
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Unicolored Jay",
		"tier": null,
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Black-capped Swallow",
		"tier": "nca",
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Mountain Trogon",
		"tier": null,
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Unspotted Saw-whet Owl",
		"tier": null,
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Red-faced Warbler",
		"tier": null,
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Golden-browed Warbler",
		"tier": null,
		"sites": [
			"sancris"
		]
	},
	{
		"name": "Belted Flycatcher",
		"tier": "nca",
		"sites": [
			"sumidero",
			"comitan"
		]
	},
	{
		"name": "Flammulated Flycatcher",
		"tier": null,
		"sites": [
			"sumidero"
		]
	},
	{
		"name": "Red-breasted Chat",
		"tier": "wmx",
		"sites": [
			"sumidero"
		]
	},
	{
		"name": "Slender Sheartail",
		"tier": "nca",
		"sites": [
			"sumidero",
			"comitan"
		]
	},
	{
		"name": "Bar-winged Oriole",
		"tier": "nca",
		"sites": [
			"sumidero"
		]
	},
	{
		"name": "Blue Seedeater",
		"tier": null,
		"sites": [
			"sumidero"
		]
	},
	{
		"name": "Russet-crowned Motmot",
		"tier": null,
		"sites": [
			"sumidero",
			"piedra"
		]
	},
	{
		"name": "White-throated Magpie-Jay",
		"tier": null,
		"sites": [
			"sumidero",
			"piedra"
		]
	},
	{
		"name": "Green Jay",
		"tier": null,
		"sites": [
			"sumidero"
		]
	},
	{
		"name": "Thicket Tinamou",
		"tier": null,
		"sites": [
			"sumidero"
		]
	},
	{
		"name": "Mexican Fan-tailed Warbler",
		"tier": null,
		"sites": [
			"sumidero"
		]
	},
	{
		"name": "Blue-and-white Mockingbird",
		"tier": "nca",
		"sites": [
			"comitan"
		]
	},
	{
		"name": "Lesser Roadrunner",
		"tier": null,
		"sites": [
			"comitan"
		]
	},
	{
		"name": "White-eared Ground-Sparrow",
		"tier": null,
		"sites": [
			"comitan"
		]
	},
	{
		"name": "Rock Wren",
		"tier": null,
		"sites": [
			"comitan"
		]
	},
	{
		"name": "Botteri's Sparrow",
		"tier": null,
		"sites": [
			"comitan"
		]
	},
	{
		"name": "Yellow Grosbeak",
		"tier": null,
		"sites": [
			"comitan"
		]
	},
	{
		"name": "Grass Wren",
		"tier": null,
		"sites": [
			"comitan"
		]
	},
	{
		"name": "Pie-billed Grebe",
		"tier": null,
		"sites": [
			"comitan"
		]
	},
	{
		"name": "Ruddy Crake",
		"tier": null,
		"sites": [
			"comitan",
			"catazaja"
		]
	},
	{
		"name": "Resplendent Quetzal",
		"tier": "nca",
		"sites": [
			"montebello",
			"tapalapa"
		]
	},
	{
		"name": "Highland Guan",
		"tier": "nca",
		"sites": [
			"montebello"
		]
	},
	{
		"name": "Azure-hooded Jay",
		"tier": null,
		"sites": [
			"montebello"
		]
	},
	{
		"name": "Yellow-throated Nightingale-Thrush",
		"tier": null,
		"sites": [
			"montebello"
		]
	},
	{
		"name": "Barred Parakeet",
		"tier": null,
		"sites": [
			"montebello"
		]
	},
	{
		"name": "Green-throated Mountain-gem",
		"tier": "nca",
		"sites": [
			"montebello",
			"chiquihuite"
		]
	},
	{
		"name": "Flame-colored Tanager",
		"tier": null,
		"sites": [
			"montebello"
		]
	},
	{
		"name": "Maroon-chested Ground-Dove",
		"tier": null,
		"sites": [
			"tapalapa"
		]
	},
	{
		"name": "Northern Emerald-Toucanet",
		"tier": null,
		"sites": [
			"tapalapa"
		]
	},
	{
		"name": "Scaled Antpitta",
		"tier": null,
		"sites": [
			"tapalapa",
			"naha"
		]
	},
	{
		"name": "Nava's Wren",
		"tier": "mx",
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Keel-billed Toucan",
		"tier": null,
		"sites": [
			"ocote",
			"palenque"
		]
	},
	{
		"name": "Collared Aracari",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Green Shrike-Vireo",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Black Hawk-Eagle",
		"tier": null,
		"sites": [
			"ocote",
			"bonampak",
			"naha"
		]
	},
	{
		"name": "Crested Guan",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Black-faced Grosbeak",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Smoky-brown Woodpecker",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Pheasant Cuckoo",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Stripe-tailed Hummingbird",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Lesson's Motmot",
		"tier": null,
		"sites": [
			"ocote"
		]
	},
	{
		"name": "Rose-bellied Bunting",
		"tier": "mx",
		"sites": [
			"sepultura"
		]
	},
	{
		"name": "Orange-breasted Bunting",
		"tier": "wmx",
		"sites": [
			"sepultura",
			"piedra"
		]
	},
	{
		"name": "Cinnamon-tailed Sparrow",
		"tier": "mx",
		"sites": [
			"sepultura"
		]
	},
	{
		"name": "Citreoline Trogon",
		"tier": null,
		"sites": [
			"sepultura",
			"piedra"
		]
	},
	{
		"name": "Green-fronted Hummingbird",
		"tier": null,
		"sites": [
			"sepultura"
		]
	},
	{
		"name": "Great Swallow-tailed Swift",
		"tier": null,
		"sites": [
			"sepultura"
		]
	},
	{
		"name": "West Mexican Chachalaca",
		"tier": "wmx",
		"sites": [
			"sepultura"
		]
	},
	{
		"name": "Long-tailed Manakin",
		"tier": null,
		"sites": [
			"sepultura",
			"piedra"
		]
	},
	{
		"name": "Lesser Ground-Cuckoo",
		"tier": null,
		"sites": [
			"sepultura"
		]
	},
	{
		"name": "Giant Wren",
		"tier": "mx",
		"sites": [
			"tonala"
		]
	},
	{
		"name": "Spot-breasted Oriole",
		"tier": null,
		"sites": [
			"tonala"
		]
	},
	{
		"name": "Rufous-backed Wren",
		"tier": null,
		"sites": [
			"tonala"
		]
	},
	{
		"name": "Salvadoran Flycatcher",
		"tier": null,
		"sites": [
			"tonala"
		]
	},
	{
		"name": "White-bellied Chachalaca",
		"tier": "nca",
		"sites": [
			"tonala"
		]
	},
	{
		"name": "Turquoise-browed Motmot",
		"tier": null,
		"sites": [
			"tonala"
		]
	},
	{
		"name": "Yellow-headed Amazon",
		"tier": null,
		"sites": [
			"tonala",
			"catazaja"
		]
	},
	{
		"name": "Orange-fronted Parakeet",
		"tier": null,
		"sites": [
			"tonala"
		]
	},
	{
		"name": "Agami Heron",
		"tier": null,
		"sites": [
			"castano"
		]
	},
	{
		"name": "American Pygmy Kingfisher",
		"tier": null,
		"sites": [
			"castano"
		]
	},
	{
		"name": "Black-collared Hawk",
		"tier": null,
		"sites": [
			"castano",
			"catazaja"
		]
	},
	{
		"name": "Bare-throated Tiger-Heron",
		"tier": null,
		"sites": [
			"castano",
			"catazaja"
		]
	},
	{
		"name": "White-whiskered Puffbird",
		"tier": null,
		"sites": [
			"castano",
			"yaxchilan"
		]
	},
	{
		"name": "Sungrebe",
		"tier": null,
		"sites": [
			"castano"
		]
	},
	{
		"name": "Boat-billed Heron",
		"tier": null,
		"sites": [
			"castano"
		]
	},
	{
		"name": "Gartered Trogon",
		"tier": null,
		"sites": [
			"castano"
		]
	},
	{
		"name": "Jabiru",
		"tier": null,
		"sites": [
			"catazaja"
		]
	},
	{
		"name": "Pinnated Bittern",
		"tier": null,
		"sites": [
			"catazaja"
		]
	},
	{
		"name": "Snail Kite",
		"tier": null,
		"sites": [
			"catazaja"
		]
	},
	{
		"name": "Spot-tailed Nightjar",
		"tier": null,
		"sites": [
			"catazaja"
		]
	},
	{
		"name": "Black Thrush",
		"tier": null,
		"sites": [
			"chiquihuite"
		]
	},
	{
		"name": "Hooded Grosbeak",
		"tier": null,
		"sites": [
			"chiquihuite"
		]
	},
	{
		"name": "Guatemalan Tyrannulet",
		"tier": "nca",
		"sites": [
			"chiquihuite"
		]
	},
	{
		"name": "Blue-crowned Chlorophonia",
		"tier": "nca",
		"sites": [
			"chiquihuite"
		]
	},
	{
		"name": "Buffy-crowned Wood-Partridge",
		"tier": "nca",
		"sites": [
			"chiquihuite",
			"tacana"
		]
	},
	{
		"name": "Fulvous Owl",
		"tier": "nca",
		"sites": [
			"chiquihuite"
		]
	},
	{
		"name": "Horned Guan",
		"tier": "nca",
		"sites": [
			"tacana"
		]
	},
	{
		"name": "Black-capped Siskin",
		"tier": "nca",
		"sites": [
			"tacana"
		]
	},
	{
		"name": "Wine-throated Hummingbird",
		"tier": "nca",
		"sites": [
			"tacana"
		]
	},
	{
		"name": "Ocellated Quail",
		"tier": "nca",
		"sites": [
			"tacana"
		]
	},
	{
		"name": "Azure-rumped Tanager",
		"tier": "nca",
		"sites": [
			"union"
		]
	},
	{
		"name": "Blue-tailed Hummingbird",
		"tier": "nca",
		"sites": [
			"union"
		]
	},
	{
		"name": "Sparkling-tailed Hummingbird",
		"tier": null,
		"sites": [
			"union"
		]
	},
	{
		"name": "White-faced Quail-Dove",
		"tier": null,
		"sites": [
			"union"
		]
	},
	{
		"name": "Rufous Sabrewing",
		"tier": "nca",
		"sites": [
			"union"
		]
	},
	{
		"name": "Middle American Leaftosser",
		"tier": null,
		"sites": [
			"union"
		]
	},
	{
		"name": "Chestnut-sided Shrike-Vireo",
		"tier": "nca",
		"sites": [
			"union"
		]
	},
	{
		"name": "Scarlet Macaw",
		"tier": null,
		"sites": [
			"palenque",
			"yaxchilan"
		]
	},
	{
		"name": "Red-capped Manakin",
		"tier": null,
		"sites": [
			"palenque",
			"bonampak"
		]
	},
	{
		"name": "Tody Motmot",
		"tier": null,
		"sites": [
			"palenque",
			"naha"
		]
	},
	{
		"name": "Rufous-tailed Jacamar",
		"tier": null,
		"sites": [
			"palenque",
			"yaxchilan"
		]
	},
	{
		"name": "Slaty-tailed Trogon",
		"tier": null,
		"sites": [
			"palenque"
		]
	},
	{
		"name": "Montezuma's Oropendola",
		"tier": null,
		"sites": [
			"palenque"
		]
	},
	{
		"name": "King Vulture",
		"tier": null,
		"sites": [
			"palenque",
			"yaxchilan"
		]
	},
	{
		"name": "Tropical Royal Flycatcher",
		"tier": null,
		"sites": [
			"palenque"
		]
	},
	{
		"name": "Violet Sabrewing",
		"tier": null,
		"sites": [
			"palenque"
		]
	},
	{
		"name": "Lovely Cotinga",
		"tier": null,
		"sites": [
			"yaxchilan",
			"bonampak",
			"naha"
		]
	},
	{
		"name": "Great Curassow",
		"tier": null,
		"sites": [
			"yaxchilan",
			"bonampak",
			"naha"
		]
	},
	{
		"name": "Black-throated Shrike-Tanager",
		"tier": null,
		"sites": [
			"bonampak"
		]
	},
	{
		"name": "Ornate Hawk-Eagle",
		"tier": null,
		"sites": [
			"bonampak",
			"naha"
		]
	},
	{
		"name": "Nightingale Wren",
		"tier": null,
		"sites": [
			"naha"
		]
	},
	{
		"name": "Emerald Toucanet",
		"tier": null,
		"sites": [
			"naha"
		]
	}
];

export function getSite(id: string): Site | undefined {
	return sites.find((s) => s.id === id);
}
