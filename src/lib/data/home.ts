import { imageUrl } from '$lib/ledger';

// Portrait flagship cards and the small strip/avatar thumbnails all read well
// enough from the square crop; the taller originals are only needed full size.
const card = (file: string) => imageUrl(file, 'sq');
const strip = (file: string) => imageUrl(file, 'sq');
const avatar = (file: string) => imageUrl(file, 'sq');

export const flagships = [
	{
		name: 'Horned Guan',
		sci: 'Oreophasis derbianus',
		flag: 'NCA',
		href: '/birds/horned-guan',
		img: card('horned-guan-mv02ExGWQJC0k2xv.jpg')
	},
	{
		name: 'Pink-headed Warbler',
		sci: 'Cardellina versicolor',
		flag: 'NCA',
		href: '/birds/pink-headed-warbler',
		img: card('pink-headed-warbler-Y4LDbp8VMLCx8rRX.jpg')
	},
	{
		name: 'Resplendent Quetzal',
		sci: 'Pharomachrus mocinno',
		flag: null,
		href: '/birds/resplendent-quetzal',
		img: card('resplendent-quetzal-mnlW0616OoTEDEj3.jpg')
	},
	{
		name: 'Rose-bellied Bunting',
		sci: 'Passerina rositae',
		flag: 'MX',
		href: '/birds/rose-bellied-bunting',
		img: card('5a00c77407956732f80e74b002410be9-mk3qQ8RrkvuyPp7o.jpg')
	},
	{
		name: 'Bearded Screech-Owl',
		sci: 'Megascops barbarus',
		flag: 'NCA',
		href: '/birds',
		img: card('screech-owl-dOq8VPoBxgFQDKM9.jpg')
	},
	{
		name: 'Wine-throated Hummingbird',
		sci: 'Selasphorus ellioti',
		flag: 'NCA',
		href: '/birds',
		img: card('sabes_aves_wine-thorated_hummingbird-2-A1azLaRJ6zsGPE7K.jpg')
	}
];

export const elevationBands = [
	{
		alt: 'PACIFIC LOWLANDS',
		h: 'Coast & dry forest',
		sp: 'Rose-bellied Bunting, Giant Wren, Yellow-headed Amazon, Long-tailed Manakin'
	},
	{
		alt: 'NORTHERN LOWLANDS',
		h: 'Lacandón rainforest',
		sp: 'Lovely Cotinga, Stripe-tailed Hummingbird, Tawny-collared Nightjar, Chestnut-headed Oropendola'
	},
	{
		alt: 'FOOTHILLS',
		h: 'Limestone & dry forest',
		sp: "Nava's Wren, Belted Flycatcher, Red-breasted Chat, Russet-crowned Motmot"
	},
	{
		alt: 'HIGHLANDS',
		h: 'Cloud forest',
		sp: 'Pink-headed Warbler, Resplendent Quetzal, Bearded Screech-Owl, Black-throated Jay'
	},
	{
		alt: '2,100–4,060 M',
		h: 'Tacaná Volcano',
		sp: 'Horned Guan, Black-capped Siskin, Highland Guan, Wine-throated Hummingbird'
	}
];

export const tripTeasers = [
	{
		title: 'Day tours',
		body: 'San Cristóbal, Sumidero Canyon, La Sepultura, the Comitán wetlands, or the ruins and rainforest at Palenque. Good on their own, and easy to string together.',
		cta: 'See day tours →',
		href: '/trips/day',
		strip: [
			{ src: strip('pink-headed-warbler-Y4LDbp8VMLCx8rRX.jpg'), alt: 'Pink-headed Warbler' },
			{ src: strip('screech-owl-dOq8VPoBxgFQDKM9.jpg'), alt: 'Bearded Screech-Owl' },
			{ src: strip('banded-wren-YanqLvXMD1UNgz3v.jpg'), alt: 'Banded Wren' },
			{ src: strip('russet-crowned-motmot-AR0MD0JLlJi4JGXO.jpg'), alt: 'Russet-crowned Motmot' },
			{ src: strip('_dsc0475-YyvZOGKXLBFjQ2E6.JPG'), alt: "Rivoli's Hummingbird" }
		]
	},
	{
		title: 'Full trips',
		body: 'Anything from a few days to a couple of weeks, put together around your target birds. Most people send us a list and their dates, and leave the planning with us.',
		cta: 'Plan a full trip →',
		href: '/trips/multi-day',
		strip: [
			{ src: strip('horned-guan-mv02ExGWQJC0k2xv.jpg'), alt: 'Horned Guan' },
			{ src: strip('resplendent-quetzal-mnlW0616OoTEDEj3.jpg'), alt: 'Resplendent Quetzal' },
			{ src: strip('ornate-hawk-eagle-mP4OGNwpvehoNJQq.jpg'), alt: 'Ornate Hawk-Eagle' },
			{
				src: strip('5a00c77407956732f80e74b002410be9-mk3qQ8RrkvuyPp7o.jpg'),
				alt: 'Rose-bellied Bunting'
			},
			{
				src: strip('long-tailed-manakin-photo_-jaime-pa-c-rez-AoPWPGpV7yI0kkl5.jpg'),
				alt: 'Long-tailed Manakin'
			}
		]
	}
];

export const guides = [
	{
		name: 'Ben Simmons',
		role: 'Co-founder & Guide',
		avatar: avatar('ben-guide-photo-Awv4vr7rLzfqJD6j.jpg'),
		bio: "Originally from the UK and a birder across Latin America for years, Ben has guided in Costa Rica and now calls the Chiapas highlands home. He's a fluent Spanish speaker with a sharp eye for a rarity, a patient teacher, and easy company through a long day in the field.",
		superpower: 'Rarity magnet'
	},
	{
		name: 'Valente González',
		role: 'Co-founder & Guide',
		avatar: avatar('valente-guiding-photo-YBgb3LeK7nUXWJr2.jpg'),
		bio: 'A Chiapaneco from birth and a birder since childhood, Valente pores over historical records and satellite imagery to track down birds in places nobody thought to look. He brings deep local knowledge and three languages to every trip.',
		superpower: 'Owl ears'
	}
];

export const warblers = [
	{
		name: 'Pink-headed Warbler',
		sci: 'C. versicolor',
		role: 'A resident of the Chiapas highlands, found almost nowhere else. <b>Valente</b>, born and raised here.'
	},
	{
		name: 'Red-faced Warbler',
		sci: 'C. rubrifrons',
		role: 'A migrant from the north that winters in these mountains. <b>Ben</b>, who arrived from further afield and settled here.'
	},
	{
		name: 'Red Warbler',
		sci: 'C. rubra',
		role: "A Mexican endemic of the highlands further north, and the one of the three you won't find in Chiapas. Representing Mexico as a whole and our plan to extend our tours <b>throughout the country.</b>"
	}
];

export const reviews = [
	{
		initials: 'NB',
		name: 'Nick Brickle',
		text: 'Spent a great four days birding with Valente and Ben. [...] Saw almost all the birds I was hoping to see, (including Pink-headed Warbler!). Their knowledge of the sites and the calls was impressive, and it felt more like I was birding with friends than with a guide.'
	},
	{
		initials: 'RW',
		name: 'Robert Wilcox',
		text: 'Carry and I were lucky enough to have a 4-day birding adventure in the highlands of Chiapas with Valente and Ben as guides. We could not have been happier with the adventure. [...] saw the Pink-headed Warbler, heard the Resplendant Quetzal. I listed 45 life species. [...] Thanks again, Ben and Valente, for making our trip to Chiapas something special.'
	},
	{
		initials: 'BS',
		name: 'Brianna Singh',
		text: "Valente and Ben are a treat to bird with. It's like birding with friends except those friends are really experienced birders and are really good at helping you find the birds. It's wild how many calls Valente can ID. Or that he remembers exactly what two trees the screeching owls like to roost in."
	},
	{
		initials: 'PS',
		name: 'Peter Standring',
		text: 'I had a great day of birding with Valente in Palenque. We started early, and hiked through the national park, not far from the famous ruins. Along the road, and in the forest we saw dozens and dozens of lovely birds. [...] toucans, trogons, parrots, raptors, flycatchers, hummingbirds, and all kinds of warblers. I think all total, I was able to add about 50 birds to my life list'
	},
	{
		initials: 'BS',
		name: 'Barbara Stahler',
		text: "An absolutely magical day birding. In the drizzle and cold, birding guide Valente and I saw almost 30 species. As a local, his knowledge and ability to identify sounds individualy in a mixed flock are incredible. I also learned so much about the local flora. Can't wait to return for a longer trip."
	},
	{
		initials: 'DR',
		name: 'David Robinson',
		text: 'I hired Valente to be my birding guide in Chiapas for five days [...] the trip was everything I hoped for. [...] The locations he recommended [...] were excellent, allowing me to see a wide variety of birds in a relatively short time. Valente was always great company: friendly, interesting, easygoing, well organized, and easy to converse with. [...] Birding with Valente was a pleasure from start to finish.'
	}
];

export const principles = [
	'Ethical field craft, meaning careful use of playback and a respectful distance from nesting birds',
	'We seek out local guides and families doing good work, and build them into our trips',
	'As friends ourselves, we want our guests to feel like one of the gang, to have a birding-with-friends feel',
	'Free birding workshops where we can, to encourage local interest in conservation',
	'Constant scouting, so you see birds few visitors reach'
];
