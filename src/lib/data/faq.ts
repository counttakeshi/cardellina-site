/**
 * The questions that arrive by email often enough to be worth answering once,
 * in public, before anybody has to ask.
 *
 * Every answer here is short on purpose and several are deliberately incomplete:
 * the job is to get somebody past the thing that was stopping them, not to
 * replace the tour pages. Where a full answer already exists on the site, the
 * entry links to it rather than restating it — a second copy of the price list
 * is a second copy to keep correct.
 *
 * Nothing in here may state a fact the site does not already state elsewhere.
 * Prices, inclusions, pick-up points and languages all come from
 * `tourDetails.ts`; if they change there, they change here.
 */

export interface FaqEntry {
	q: string;
	/** One or two short paragraphs. Plain text — no markup. */
	a: string[];
	/** Where the full answer lives, when there is one. Site-relative. */
	link?: { label: string; href: string };
}

export const faq: FaqEntry[] = [
	{
		q: 'What does a day tour cost, and what is included?',
		a: [
			'Range from 230–365 USD for 1–2 people. Most tours include transport and site entrances. Check individual tour pages for more information.'
		],
		link: { label: 'See the day tours', href: '/trips#day' }
	},
	{
		q: 'Are the tours private, or do we join a group?',
		a: [
			'Private. Day tours are priced for 1–2 people but you may include more, just let us know so we can quote an itinerary accordingly.'
		]
	},
	{
		q: 'Which languages do you guide in?',
		a: ['English, Spanish and Dutch.']
	},
	{
		q: 'Do I need to be an experienced birder?',
		a: [
			'No. We guide serious listers working a target list and people who have never used binoculars before.'
		]
	},
	{
		q: 'Can you target a particular species?',
		a: [
			"Yes! We'll give you a sense of the chances and effort required. Of course, as with all birding, there are unfortunately no guarantees."
		],
		link: { label: 'Browse the bird library', href: '/birds' }
	},
	{
		q: 'Where do you pick us up?',
		a: [
			'It depends on the tour: San Cristóbal de las Casas, Comitán, Palenque and Tuxtla Gutiérrez all appear as starting points, and the tour page names the one for that day.',
			'Tell us where you are staying and we will sort the meeting point out with you.'
		],
		link: { label: 'See the day tours', href: '/trips#day' }
	},
	{
		q: 'Are the multi-day itineraries fixed?',
		a: [
			'No. They are sample routes showing the kind of trip we run. We can tailor the days, the sites and the pace, including where you overnight.'
		],
		link: { label: 'Build your own trip', href: '/trips#personalised' }
	},
	{
		q: 'How does booking work?',
		a: [
			'You send an enquiry, we come back within 24 hours with availability and what the trip would look like, and we settle the details between us from there.',
			'Nothing is booked until we have replied and you have agreed it.'
		]
	}
];
