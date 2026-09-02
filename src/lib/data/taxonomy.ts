export type TierCode = 'mx' | 'wmx' | 'nca' | 'mxca' | 'wide';
export type ZoneCode =
	| 'cloud'
	| 'pineoak'
	| 'pacslope'
	| 'rainforest'
	| 'thorn'
	| 'coast'
	| 'wetland';

/**
 * The five range tiers a species can carry. These still drive the badge beside a
 * bird's name, where the precision is worth having.
 */
export const TIERS: { code: TierCode; label: string; activeColor: string }[] = [
	{ code: 'mx', label: 'Mexican endemic', activeColor: '#B8305A' },
	{ code: 'wmx', label: 'West Mexican endemic', activeColor: '#9C5A16' },
	{ code: 'nca', label: 'Northern Central America', activeColor: '#2F4A3C' },
	{ code: 'mxca', label: 'Mexico & Central America', activeColor: '#6E7671' },
	{ code: 'wide', label: 'Widespread Neotropical', activeColor: '#8A94A6' }
];

export type TierGroupCode = 'endemic' | 'nca' | 'wide';

/**
 * What the filter bar offers: three ranges rather than five. Five buttons made
 * the reader choose between distinctions that only matter once you already know
 * the answer — West Mexican endemic is a Mexican endemic, and "Mexico & Central
 * America" and "Widespread Neotropical" both mean "not restricted to here".
 */
export const TIER_GROUPS: {
	code: TierGroupCode;
	label: string;
	tiers: TierCode[];
	activeColor: string;
}[] = [
	{ code: 'endemic', label: 'Mexican endemic', tiers: ['mx', 'wmx'], activeColor: '#B8305A' },
	{ code: 'nca', label: 'Northern Central America', tiers: ['nca'], activeColor: '#2F4A3C' },
	{ code: 'wide', label: 'Widespread', tiers: ['mxca', 'wide'], activeColor: '#8A94A6' }
];

/** Habitat zones, in the order the live filter bar shows them. */
export const ZONES: Record<ZoneCode, { label: string; chipLabel: string; color: string }> = {
	cloud: { label: 'Cloud forest', chipLabel: 'Cloud forest', color: '#2E6E52' },
	pineoak: { label: 'Pine-oak', chipLabel: 'Pine-oak', color: '#6E8B4A' },
	pacslope: { label: 'Pacific slope', chipLabel: 'Pacific slope', color: '#3E8C7E' },
	rainforest: { label: 'Rainforest', chipLabel: 'Rainforest', color: '#1E6E5A' },
	thorn: { label: 'Thorn forest & arid scrub', chipLabel: 'Thorn forest', color: '#B08033' },
	coast: { label: 'Pacific coast', chipLabel: 'Pacific coast', color: '#4E7A9B' },
	wetland: { label: 'Wetland', chipLabel: 'Wetland', color: '#5B8A72' }
};

export const ZONE_ORDER: ZoneCode[] = [
	'cloud',
	'pineoak',
	'pacslope',
	'rainforest',
	'thorn',
	'coast',
	'wetland'
];
