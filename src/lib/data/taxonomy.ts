export type TierCode = 'mx' | 'wmx' | 'nca' | 'mxca' | 'wide';
export type ZoneCode =
	| 'cloud'
	| 'pineoak'
	| 'pacslope'
	| 'rainforest'
	| 'thorn'
	| 'coast'
	| 'wetland';

/** Range tiers, in the order the live filter bar shows them. */
export const TIERS: { code: TierCode; label: string; activeColor: string }[] = [
	{ code: 'mx', label: 'Mexican endemic', activeColor: '#B8305A' },
	{ code: 'wmx', label: 'West Mexican endemic', activeColor: '#9C5A16' },
	{ code: 'nca', label: 'Northern Central America', activeColor: '#2F4A3C' },
	{ code: 'mxca', label: 'Mexico & Central America', activeColor: '#6E7671' },
	{ code: 'wide', label: 'Widespread Neotropical', activeColor: '#8A94A6' }
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
