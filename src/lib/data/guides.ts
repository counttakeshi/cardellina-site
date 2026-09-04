import { imageUrl } from '$lib/ledger';

export interface GuideFact {
	label: string;
	/** Trusted HTML — may wrap a species name in <span class="sp">. */
	html: string;
	/** Spans the full width of the fact grid. */
	wide?: boolean;
}

export interface GuideReview {
	quote: string;
	who: string;
}

/**
 * Which treatment a guide gets on the page.
 *
 *   lead  — the two of us: full block, fact cards, reviews
 *   wider — people who guide with us: photo, name, where, bio, project link
 *
 * The lighter card is the point, not a shortfall of content. Padding a wider-team
 * card out to match a lead block would erase the distinction the tier exists to
 * draw.
 */
export type GuideTier = 'lead' | 'wider';

export interface GuideLink {
	label: string;
	url: string;
}

export interface Guide {
	slug: string;
	name: string;
	tier: GuideTier;
	/** Lead guides only: the line under the name. */
	role?: string;
	photo: string;
	/**
	 * Small 4:5 crop for the contact cards. Not a circle: as the homepage note
	 * puts it, a circle throws away the binoculars, the scope and the habitat,
	 * which is most of what makes a guide photo persuasive.
	 */
	avatar?: string;
	/** Where they guide. A badge over the photo on lead blocks, a line on cards. */
	tag: string;
	bio: string[];
	/** Optional throughout: a guide without them renders no empty block. */
	facts?: GuideFact[];
	reviews?: GuideReview[];
	projectLink?: GuideLink;
	/** Mirrors the live layout, which alternates photo/copy sides. */
	flip?: boolean;
}

export const guides: Guide[] = [
	{
		slug: 'valente',
		tier: 'lead',
		name: 'Valente González',
		role: 'Tour leader & guide · born in Chiapas',
		photo: imageUrl('valente-guiding-photo-YBgb3LeK7nUXWJr2.jpg', 'full'),
		avatar: imageUrl('valente-explaining.png', 'portrait'),
		tag: 'Comitán, Chiapas',
		bio: [
			'Valente, born in San Cristóbal de las Casas, got his first pair of binoculars at seven years old. Watching birds in his garden as a child and learning their habitat ranges, he has been in love with birding ever since. His knowledge of Chiapas’s birds, their niches and secret habitats is unrivalled.',
			'With perfect English, Spanish and Dutch, he’s a wise and extremely capable pair of hands in the field. Trained as an industrial ecologist at TU Delft in the Netherlands, he also runs a parallel career producing sustainable charcoal briquettes. He brings an analytical streak to the chase too, using GIS and mapping to work out where the odds of a rare bird are best before we’ve even set out.'
		],
		facts: [
			{
				label: '◆ Superpower',
				html: 'Owl ears. Valente seems to hear the bird before it even calls.'
			},
			{
				label: '★ Favourite bird',
				html: 'The <span class="sp">Black-throated Jay</span>. So shy that seeing one feels like a gift from the bird gods, only the quietest-moving birders are ever treated to birds from the Cyanolyca genus.'
			},
			{
				label: '✦ Proudest find',
				html: 'A <span class="sp">Stygian Owl</span> in Chiapas, the first eBird record in the state since the 1980s.',
				wide: true
			}
		],
		reviews: [
			{
				quote:
					'“I hired Valente to be my birding guide in Chiapas for five days [...] the trip was everything I hoped for. [...] The locations he recommended [...] were excellent, allowing me to see a wide variety of birds in a relatively short time. Valente was always great company: friendly, interesting, easygoing, well organized, and easy to converse with. [...] he’s an expert birder and naturalist. Birding with Valente was a pleasure from start to finish.”',
				who: 'David Robinson'
			},
			{
				quote:
					'“Valente led my wife and I on a 3-day birding tour of the area around the ejido at El Ocote [...]. Every aspect of the trip was fabulous. [...] we saw many species of birds, turtles, stingless bees as well as archaeological sites. Valente looked after my wife and I at all times [...]. We are looking forward to doing more trips with Valente when we return to Chiapas.”',
				who: 'Bill Leonard'
			},
			{
				quote:
					'“It’s wild how many calls Valente can ID. Or that he remembers exactly what two trees the screeching owls like to roost in.”',
				who: 'Brianna Singh'
			}
		]
	},
	{
		slug: 'ben',
		tier: 'lead',
		name: 'Ben Simmons',
		role: 'Tour leader & guide · from London, in Latin America since 2011',
		photo: imageUrl('ben-guide-photo-Awv4vr7rLzfqJD6j.jpg', 'full'),
		avatar: imageUrl('ben-guide-photo-Awv4vr7rLzfqJD6j.jpg', 'portrait'),
		tag: 'San Cristóbal de las Casas',
		flip: true,
		bio: [
			"Ben first discovered birding through his dad's binoculars, watching a Golden-hooded Tanager in La Fortuna, Costa Rica, and quickly took after his bird-obsessed parents. He has lived in Latin America since 2011 and now San Cristóbal in Chiapas, where he found his home.",
			"He came to birding from natural history at large, with a naturalist's eye and a habit of learning fast and never quite stopping, his knowledge of the region's birds and their calls deepening every season. A native English speaker, fluent in Spanish and Portuguese and a Natural Sciences student with the Open University, he bridges the gap between our English-speaking guests and Mexican people and culture."
		],
		facts: [
			{
				label: '◆ Superpower',
				html: 'Rarity magnet. Mangrove Cuckoos at 3000m, Prothonotary Warblers in central Chiapas. Ben seems to attract the bizarre.'
			},
			{
				label: '★ Favourite bird',
				html: 'The <span class="sp">Wine-throated Hummingbird</span>. I was amazed once by the courtship flight where the hummer flared its gorget and began rotating slowly in a full circle.'
			},
			{
				label: '✦ Proudest find',
				html: 'Six <span class="sp">Jabirus</span> together, far off across the Catazajá wetlands, an exceptionally rare sight in Chiapas.',
				wide: true
			}
		],
		reviews: [
			{
				quote:
					'“We had a full and exciting day with Ben, on the outskirts of the Palenque National Park, and in the park. The species total for the day was 77 I believe and included several unknown to me. His hearing was acute, his pointing and descriptions accurate. Inside the park his knowledge of the Mayan ruins was impressive, never forgetting that our prime objective was. Birds. He is equally at home in English and Spanish, including bird names! If you can book Ben you’ll be a happy party!”',
				who: 'William Kirkland'
			},
			{
				quote:
					'“Ben is such a spectacular bird guide and it’s clear to see his love and appreciation for the nature of chiapas, from the birds, to plants and flowers [...]. Ben has such a wealth of knowledge and even as a birder for several years, he has taught me so much! [...] I would definitely recommend both and even multi day tours [...]. Muchas gracias Ben!!”',
				who: 'Aarti Patel'
			},
			{
				quote:
					'“Spent a great four days birding with Valente and Ben. [...] Saw almost all the birds I was hoping to see, (including Pink-headed Warbler!). Their knowledge of the sites and the calls was impressive, and it felt more like I was birding with friends than with a guide. Would thoroughly recommend Sabes Aves for the serious or casual birder alike.”',
				who: 'Nick Brickle'
			}
		]
	},
	{
		slug: 'gabriel',
		tier: 'wider',
		name: 'Gabriel Hernández',
		photo: imageUrl('gabriel-hernandez.jpg', 'portrait'),
		tag: 'Palenque',
		bio: [
			'What began as a school project on bird ecology became a lifelong passion. Gabriel started out birding in his native semi-desert of San Luis Potosí, and that passion led him to conservation work in the Lacandón rainforest.',
			'Trained as an environmental engineer in the classroom and as a naturalist in the field, he now lives in Palenque, where he’s found his second home. His knowledge of the local forest and his ear and eye for identification are exactly what you want for building your life list, he even holds the first eBird record of White-faced Ground-Sparrow for the municipality of Palenque.'
		]
	},
	{
		slug: 'andrea',
		tier: 'wider',
		name: 'Andrea Quintero',
		photo: imageUrl('andrea-quintero.jpg', 'portrait'),
		tag: 'San Cristóbal & the coast',
		bio: [
			'A marine biologist and naturalist who grew up in the pine-oak highlands outside Mexico City. She’s now completing a master’s on a multi-species waterbird nesting colony in a coastal Chiapas lagoon, working alongside the local fishing communities on ethical birdwatching and conservation of the lagoon.',
			'Before Chiapas she spent eight years guiding in Baja California Sur, snorkelling, diving and whale-watching across the Gulf of California, including three seasons as a certified whale-shark guide in La Paz Bay. Birds and nature photography drew her in during the pandemic, and Chiapas captured her heart.'
		]
	}
];

export const guideValues = [
	{
		title: 'Careful in the field',
		body: "We use playback with caution and stay mindful of the birds' wellbeing, so the places we love keep working for the next people through."
	},
	{
		title: 'Ground we know',
		body: "We guide the places we know deeply and stay in constant contact with local people at every destination, for the safest and most intimate access to the region's birds and cultures."
	},
	{
		title: 'Built around you',
		body: "Beginner or hardened lister, we shape each trip to your pace, your interests and your targets, and keep you comfortable and well fed while we're at it."
	}
];
