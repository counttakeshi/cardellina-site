import { imageUrl } from '$lib/ledger';

export interface Partner {
	slug: string;
	name: string;
	/** Location / affiliation line under the name. */
	where: string;
	logo: string;
	image: string;
	imageAlt: string;
	/** Object-position for the hero crop, matching the live layout. */
	imagePosition: string;
	body: string[];
	/** Short pills summarising the project. */
	facts: string[];
	link: { href: string; label: string };
	/** Short summary used on the guides page teaser cards. */
	teaser: string;
	/** Mirrors the live layout, which alternates image/copy sides. */
	flip?: boolean;
}

export const partners: Partner[] = [
	{
		slug: 'oatl',
		name: 'OATL',
		where: 'Observatorio de Aves Tlaxiaco · Oaxaca',
		logo: imageUrl('oatl-logo-S1RPBoJAo9FcNlXk.webp', 'md'),
		image: imageUrl('sergio-guiding-5RYqe2csqZF2rGx3.png', 'full'),
		imageAlt: 'Sergio Gómez Villaverde guiding',
		imagePosition: '50% 40%',
		body: [
			"Since 2018, OATL has worked in the Ñu'u Savi community of Santa María Yucuhíti, in the Mixteca Alta of Oaxaca. The work combines bird research and ethnobiology with environmental education, run alongside efforts to strengthen the Tu'un Savi language.",
			"The area holds 38% of the bird species recorded for Oaxaca in 0.09% of the state's territory. In 2023 OATL received a Western Hummingbird Partnership grant to study Rufous Hummingbird distribution at high altitude, and their use of artificial drinking troughs through the winter.",
			"OATL is Sergio Gómez Villaverde's project. He guides with us from time to time, and a good number of the photographs on this site are his."
		],
		facts: ['Founded 2018', 'Santa María Yucuhíti', 'Research & education'],
		link: { href: 'https://www.instagram.com/oatl_mx/', label: 'OATL on Instagram →' },
		teaser:
			"Sergio Gómez Villaverde's bird observatory in the Mixteca Alta, running research and environmental education with the community at Santa María Yucuhíti."
	},
	{
		slug: 'siyaj-chan',
		name: 'Siyaj Chan',
		where: 'Frontera Corozal · Selva Lacandona',
		logo: imageUrl('siyaj-chan-logo-xnkC7HfdiToY6kqz.webp', 'md'),
		image: imageUrl('silvano-guiding-OA0YRiZbZC3lStwz.webp', 'full'),
		imageAlt: 'Silvano guiding on the Usumacinta at Yaxchilán',
		imagePosition: '50% 40%',
		flip: true,
		body: [
			'Siyaj Chan is a group of Chol community guides based at Frontera Corozal, on the Usumacinta at the edge of the Lacandón. They describe themselves as a group of Chol people offering community guiding to promote and encourage a culture of caring for their environment.',
			'Alongside the guiding they run monitoring and vigilance patrols in the Yaxchilán Natural Monument, and visitors are welcome to join them on a patrol rather than simply visit the ruins.',
			'Silvano and his team are brilliant guides with some of the most impressive reports, including the Harpy Eagle, in all of Mexico. They run the boats that take us upriver to Yaxchilán and help with our guiding in the region.'
		],
		facts: ['Chol community guides', 'Yaxchilán monitoring', 'Usumacinta boats'],
		link: {
			href: 'https://www.facebook.com/silvano.lopezgomez',
			label: 'facebook.com/silvano.lopezgomez →'
		},
		teaser:
			'Chol community guides who monitor and patrol the Yaxchilán Natural Monument. They run the boats that take us up the Usumacinta.'
	}
];
