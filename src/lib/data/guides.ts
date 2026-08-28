const CDN = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto';
const BUCKET = 'YofU1cddTQzjoQ8J';

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

export interface Guide {
	slug: string;
	name: string;
	role: string;
	photo: string;
	/** Location badge shown over the photo. */
	tag: string;
	bio: string[];
	facts: GuideFact[];
	reviews: GuideReview[];
	/** Mirrors the live layout, which alternates photo/copy sides. */
	flip?: boolean;
}

export const guides: Guide[] = [
	{
		slug: 'valente',
		name: 'Valente González',
		role: 'Tour leader & guide · born in Chiapas',
		photo: `${CDN},w=900,h=1080,fit=crop/${BUCKET}/valente-guiding-photo-YBgb3LeK7nUXWJr2.jpg`,
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
		name: 'Ben Simmons',
		role: 'Tour leader & guide · from London, in Latin America since 2011',
		photo: `${CDN},w=900,h=980,fit=crop/${BUCKET}/ben-guide-photo-Awv4vr7rLzfqJD6j.jpg`,
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
