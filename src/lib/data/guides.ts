export interface Guide {
	slug: string;
	name: string;
	photoUrl: string;
	bio: string;
}

// TODO: replace with the real bios from the /valente-and-ben export.
export const guides: Guide[] = [
	{
		slug: 'valente',
		name: 'Valente',
		photoUrl: '/images/guides/valente.webp',
		bio: ''
	},
	{
		slug: 'ben',
		name: 'Ben',
		photoUrl: '/images/guides/ben.webp',
		bio: ''
	}
];
