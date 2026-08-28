export interface Site {
	id: string;
	name: string;
	/** Latitude/longitude, used to project onto the SVG map. */
	lat: number;
	lng: number;
	/** Species slugs (see species.ts) recorded at this site. */
	speciesSlugs: string[];
}

export interface SiteConnection {
	from: string; // Site id
	to: string; // Site id
}

// TODO: replace with the real geodata behind "Everywhere we bird" (site coordinates,
// per-site species lists, and the road connections drawn as dashed lines). Extract
// from the live map's data/network output if the content export doesn't include it.
export const sites: Site[] = [];

export const siteConnections: SiteConnection[] = [];
