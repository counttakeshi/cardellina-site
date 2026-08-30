/**
 * Typed access to the photo/location ledger (src/lib/data/ledger.json).
 *
 * Everything that needs an image URL, a photo credit, or the species list for a
 * site or tour should go through here rather than reaching into the JSON. That
 * keeps the data shape in one place — and, importantly, keeps every image URL
 * behind `imageUrl()`, so moving off the Zyro CDN is a one-line change.
 */
import ledger from './data/ledger.json';

/** Where the ledger's bare filenames actually live. */
const ASSET_BASE = 'https://assets.zyrosite.com/YofU1cddTQzjoQ8J';
const RESIZE_BASE = 'https://assets.zyrosite.com/cdn-cgi/image';

export interface LedgerLocation {
	name: string;
	habitat: string;
	/** Elevation in metres. */
	elev: number;
	blurb: string;
	key_species: string[];
	must_show: string[];
}

export interface LedgerPhoto {
	name: string;
	/** Photo quality only — NOT an instruction to use it. */
	star: boolean;
	/** Photographer. Empty string means no credit required. */
	credit: string;
	/** First file is the primary image; the rest are alternates. */
	files: string[];
	used_on: string[];
	note: string;
}

export interface LedgerTour {
	name: string;
	slug: string;
	days: number;
	sites: string[];
	must_show: string[];
}

const locations = ledger.locations as Record<string, LedgerLocation>;
const photos = ledger.photos as Record<string, LedgerPhoto>;
const tours = ledger.tours as Record<string, LedgerTour>;

/**
 * Species lists use display names ("Bearded Screech-Owl") while photos are keyed
 * by slug ("bearded-screech-owl"), so lookups have to bridge the two.
 */
export function slugifySpecies(name: string): string {
	return name
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/**
 * Cases where slugifying the display name does not produce the photo key, either
 * because the ledger spells the bird differently in the two places or because the
 * photo is filed under an older/alternative name. Verified against the ledger by
 * audit rather than assumed.
 */
const PHOTO_ALIASES: Record<string, string> = {
	// Ledger writes "Mountaingem" in species lists but "mountain-gem" as the key.
	'green-throated-mountaingem': 'green-throated-mountain-gem',
	// Tilmatura dupontii: renamed Woodstar, still filed under the old name.
	'sparkling-tailed-woodstar': 'sparkling-tailed-hummingbird',
	// The ledger's own note: "Spizaetus tyrannus = Black Hawk-Eagle".
	'black-hawk-eagle': 'black-crested-eagle',
	// Same bird, longer form used as the photo key.
	'royal-flycatcher': 'tropical-royal-flycatcher'
	// NB the ledger spells Montezuma('s) Oropendola both ways across sites, but
	// there is no photo under either, so no alias is needed yet.
};

/** Build an image URL, optionally resized through the CDN. */
export function imageUrl(filename: string, width?: number): string {
	if (!filename) return '';
	if (/^https?:\/\//.test(filename)) return filename;
	return width
		? `${RESIZE_BASE}/format=auto,w=${width}/YofU1cddTQzjoQ8J/${filename}`
		: `${ASSET_BASE}/${filename}`;
}

/** Square crop, for gallery thumbnails. */
export function thumbUrl(filename: string, size = 500): string {
	if (!filename) return '';
	return `${RESIZE_BASE}/format=auto,w=${size},h=${size},fit=crop/YofU1cddTQzjoQ8J/${filename}`;
}

/** The photo entry for a species, by display name. Undefined when we have none. */
export function photoFor(speciesName: string): LedgerPhoto | undefined {
	const slug = slugifySpecies(speciesName);
	return photos[slug] ?? photos[PHOTO_ALIASES[slug] ?? ''];
}

/** Primary image URL for a species, or '' when we have no photo of it. */
export function imageFor(speciesName: string, width?: number): string {
	const photo = photoFor(speciesName);
	return photo?.files[0] ? imageUrl(photo.files[0], width) : '';
}

/** Photographer for a species, or '' when none is required. */
export function creditFor(speciesName: string): string {
	return photoFor(speciesName)?.credit ?? '';
}

export function getLocation(id: string): LedgerLocation | undefined {
	return locations[id];
}

export function allLocations(): (LedgerLocation & { id: string })[] {
	return Object.entries(locations).map(([id, l]) => ({ id, ...l }));
}

export function getLedgerTour(id: string): LedgerTour | undefined {
	return tours[id];
}

/**
 * Every species a tour can offer: the union of its sites' key species, plus
 * anything explicitly flagged must_show. Computed rather than hardcoded, so
 * changing a site's list updates every tour that visits it.
 */
export function speciesForTour(tourId: string): string[] {
	const tour = tours[tourId];
	if (!tour) return [];

	const seen = new Set<string>();
	for (const siteId of tour.sites) {
		for (const s of locations[siteId]?.key_species ?? []) seen.add(s);
	}
	for (const s of tour.must_show) seen.add(s);
	return [...seen];
}

/** Species a tour must illustrate, in the ledger's stated priority order. */
export function mustShowForTour(tourId: string): string[] {
	const tour = tours[tourId];
	if (!tour) return [];

	const seen = new Set(tour.must_show);
	for (const siteId of tour.sites) {
		for (const s of locations[siteId]?.must_show ?? []) seen.add(s);
	}
	return [...seen];
}

/**
 * Pick images for a list of species, honouring the ledger's coverage rule:
 * a named species should show *some* image, preferring starred and unused ones.
 * Species we have no photo of are dropped — callers can compare lengths to see
 * how many were skipped.
 */
export function galleryFor(
	speciesNames: string[],
	opts: { limit?: number; width?: number } = {}
): { species: string; file: string; credit: string; star: boolean }[] {
	const { limit, width } = opts;

	const picked = speciesNames
		.map((species) => ({ species, photo: photoFor(species) }))
		.filter((x): x is { species: string; photo: LedgerPhoto } => !!x.photo?.files.length)
		.map(({ species, photo }) => ({
			species,
			file: width ? imageUrl(photo.files[0], width) : imageUrl(photo.files[0]),
			credit: photo.credit,
			star: photo.star,
			unused: photo.used_on.length === 0
		}))
		// Prefer starred, then unused, but keep every species represented.
		.sort((a, b) => Number(b.star) - Number(a.star) || Number(b.unused) - Number(a.unused));

	return (limit ? picked.slice(0, limit) : picked).map(({ species, file, credit, star }) => ({
		species,
		file,
		credit,
		star
	}));
}

/** Species named somewhere in the ledger that we have no photo for. */
export function speciesWithoutPhotos(): string[] {
	const all = new Set<string>();
	for (const loc of Object.values(locations)) {
		for (const s of loc.key_species) all.add(s);
		for (const s of loc.must_show) all.add(s);
	}
	for (const t of Object.values(tours)) for (const s of t.must_show) all.add(s);
	return [...all].filter((s) => !photoFor(s)).sort();
}
