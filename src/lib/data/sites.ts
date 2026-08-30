import type { TierCode } from './taxonomy';
import { allLocations, type LedgerLocation } from '$lib/ledger';

/**
 * The birding sites behind "Everywhere we bird".
 *
 * Site content — name, habitat, elevation, blurb and species — comes from the
 * ledger, which is the single source of truth. This file adds only what the
 * ledger has no room for: where each pin sits on the hand-drawn SVG map, the
 * habitat colour it is drawn in, and each species' endemism tier.
 */

export interface SiteBird {
	name: string;
	/** Endemism tier, when the bird is an endemic or near-endemic. */
	tier: TierCode | null;
}

export interface Site extends LedgerLocation {
	id: string;
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

/** Pin position and habitat colour per site, keyed by ledger location id. */
const MAP_META: Record<string, { x: number; y: number; zoneColor: string }> = {
	"sancris": {
		"x": 338,
		"y": 244.7,
		"zoneColor": "#6E8B4A"
	},
	"sumidero": {
		"x": 261,
		"y": 228.9,
		"zoneColor": "#B08033"
	},
	"comitan": {
		"x": 427.3,
		"y": 322.1,
		"zoneColor": "#6E8B4A"
	},
	"montebello": {
		"x": 506,
		"y": 344.2,
		"zoneColor": "#2E6E52"
	},
	"tapalapa": {
		"x": 252.3,
		"y": 173.7,
		"zoneColor": "#2E6E52"
	},
	"ocote": {
		"x": 166.5,
		"y": 224.2,
		"zoneColor": "#1E6E5A"
	},
	"sepultura": {
		"x": 156,
		"y": 314.2,
		"zoneColor": "#3E8C7E"
	},
	"tonala": {
		"x": 143.8,
		"y": 347.4,
		"zoneColor": "#4E7A9B"
	},
	"piedra": {
		"x": 349.8,
		"y": 431.8,
		"zoneColor": "#3E8C7E"
	},
	"castano": {
		"x": 327,
		"y": 493.9,
		"zoneColor": "#4E7A9B"
	},
	"catazaja": {
		"x": 452.1,
		"y": 89.9,
		"zoneColor": "#4E7A9B"
	},
	"chiquihuite": {
		"x": 409.8,
		"y": 491.4,
		"zoneColor": "#2E6E52"
	},
	"tacana": {
		"x": 436.8,
		"y": 508.9,
		"zoneColor": "#2E6E52"
	},
	"union": {
		"x": 412,
		"y": 525.6,
		"zoneColor": "#3E8C7E"
	},
	"palenque": {
		"x": 441.3,
		"y": 127.9,
		"zoneColor": "#1E6E5A"
	},
	"yaxchilan": {
		"x": 632,
		"y": 219.5,
		"zoneColor": "#1E6E5A"
	},
	"bonampak": {
		"x": 614.5,
		"y": 251.1,
		"zoneColor": "#1E6E5A"
	},
	"naha": {
		"x": 520,
		"y": 222.6,
		"zoneColor": "#1E6E5A"
	}
};

/** Endemism tier per species. A property of the bird, not of any one site. */
const SPECIES_TIERS: Record<string, TierCode> = {
	"Pink-headed Warbler": "nca",
	"Garnet-throated Hummingbird": "nca",
	"Blue-throated Motmot": "nca",
	"Black-throated Jay": "nca",
	"Rufous-browed Wren": "nca",
	"Unicolored Jay": "nca",
	"Black-capped Swallow": "nca",
	"Highland Guan": "nca",
	"Blue-and-white Mockingbird": "nca",
	"Guatemalan Flicker": "nca",
	"Rufous-collared Robin": "nca",
	"Belted Flycatcher": "nca",
	"Flammulated Flycatcher": "wmx",
	"Red-breasted Chat": "wmx",
	"Slender Sheartail": "nca",
	"Bar-winged Oriole": "nca",
	"Russet-crowned Motmot": "wmx",
	"Green-fronted Hummingbird": "wmx",
	"White-faced Ground-Sparrow": "nca",
	"Resplendent Quetzal": "nca",
	"Yellow-throated Nightingale-Thrush": "nca",
	"Black Thrush": "nca",
	"Blue-crowned Chlorophonia": "nca",
	"Nava's Wren": "mx",
	"Green-backed Sparrow": "nca",
	"Rose-bellied Bunting": "mx",
	"Orange-breasted Bunting": "wmx",
	"Cinnamon-tailed Sparrow": "mx",
	"Citreoline Trogon": "wmx",
	"West Mexican Chachalaca": "wmx",
	"Long-tailed Manakin": "nca",
	"Giant Wren": "mx",
	"Salvadoran Flycatcher": "nca",
	"White-bellied Chachalaca": "nca",
	"Yellow-headed Amazon": "mx",
	"Russet-naped Wren": "wmx",
	"Blue-tailed Hummingbird": "nca",
	"Guatemalan Tyrannulet": "nca",
	"Horned Guan": "nca",
	"Black-capped Siskin": "nca",
	"Ocellated Quail": "nca",
	"Azure-rumped Tanager": "nca",
	"Emerald-chinned Hummingbird": "nca",
	"Tawny-collared Nightjar": "mx"
};

export const sites: Site[] = allLocations()
	.filter((l) => MAP_META[l.id])
	.map((l) => ({
		...l,
		...MAP_META[l.id],
		birds: l.key_species.map((name) => ({ name, tier: SPECIES_TIERS[name] ?? null }))
	}));

/** Reverse index: which sites hold each bird, for the map's species mode. */
export const mapBirds: MapBird[] = (() => {
	const index = new Map<string, MapBird>();
	for (const site of sites) {
		for (const bird of site.birds) {
			const entry = index.get(bird.name) ?? { name: bird.name, tier: bird.tier, sites: [] };
			entry.sites.push(site.id);
			index.set(bird.name, entry);
		}
	}
	return [...index.values()].sort((a, b) => a.name.localeCompare(b.name));
})();

export function getSite(id: string): Site | undefined {
	return sites.find((s) => s.id === id);
}
