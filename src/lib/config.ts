/**
 * Formspree endpoint for the enquiry form.
 *
 * GitHub Pages only serves static files, so it can't process a form submission
 * itself — Formspree receives the POST and emails it to info@cardellina.com.
 *
 * This URL is public by design (it's in the page source either way); it is not
 * a secret and carries no account access. Spam control is handled by the
 * honeypot field in ContactForm.svelte plus Formspree's own filtering.
 *
 * One endpoint serves every enquiry type. The form varies its fields and subject
 * line by context (general / day tour / multi-day), so all enquiries land in a
 * single inbox while still carrying the details each type needs.
 */
export const CONTACT_ENDPOINT = 'https://formspree.io/f/xvkogdon';

/** Where enquiries land, shown to the user if the form ever fails. */
export const CONTACT_EMAIL = 'info@cardellina.com';

/**
 * eBird's target-list tool, scoped to Chiapas against a life list. The fastest
 * way for a visiting birder to turn "I want lifers" into an actual list.
 */
export const EBIRD_TARGETS =
	'https://ebird.org/targets?r1=MX-CHP&r2=world&t2=life&bmo=1&emo=12&print=true';

/**
 * Microsoft Clarity project ID. Paste the ten-character ID from the Clarity
 * dashboard (Settings → Overview → Project ID) between the quotes; leave it
 * empty and no Clarity script is loaded at all.
 *
 * Not a secret — it ships in the page like any analytics tag — but it is the
 * one thing that decides whether we are recording sessions, so it lives here
 * rather than being buried in a template.
 */
export const CLARITY_PROJECT_ID = 'x2y20srabx';

/**
 * WhatsApp, in the shape wa.me expects: country code then number, no plus, no
 * spaces. Unchanged from the number the business has always used — the format
 * is worth checking from a real handset if messages ever stop arriving, since
 * Mexico's mobile numbering changed under WhatsApp and the legacy `1` after the
 * 52 is carried here.
 */
export const WHATSAPP_NUMBER = '5219615164020';

/** The number, as a person writes it. */
export const PHONE = '+52 961 516 4020';

/** The same thing under its older name, kept so existing call sites still work. */
export const WHATSAPP_DISPLAY = PHONE;

/**
 * A wa.me link with the first message already typed.
 *
 * The prefill does more work than it looks like it does. WhatsApp opens on an
 * empty thread with no subject and no referrer, so without one we get "hi" from
 * an unknown number and have to spend the first reply asking what they were
 * reading. Naming the site, and the tour when there is one, means the first
 * answer can be the useful one.
 */
export function whatsappLink(about?: string): string {
	const text = about
		? `Hello Cardellina — I'm on cardellina.com looking at ${about}, and I have a question.`
		: `Hello Cardellina — I'm on cardellina.com and I have a question about birding in Chiapas.`;
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * The topic selector on the general enquiry form. Optional by design: it sorts
 * the inbox and tells us which page of the site failed to answer the question,
 * but nobody should have to classify their own enquiry before asking it.
 */
export const ENQUIRY_TOPICS = [
	'Birding in Chiapas',
	'Finding a particular bird',
	'Tour availability',
	'Prices and what’s included',
	'Travel and logistics',
	'Something else'
] as const;

/**
 * The canonical origin. Every absolute URL the site emits — canonicals, Open
 * Graph, JSON-LD, the sitemap — is built from this and not from the host the
 * page happens to be served by, so the github.io staging copy still points
 * search engines at the real domain instead of competing with it.
 */
export const SITE_ORIGIN = 'https://www.cardellina.com';

/**
 * The name for structured data.
 *
 * NEEDS BEN: the site currently says three different things. The footer reads
 * "Cardellina Birdwatching Tours", page titles read "Cardellina - Chiapas
 * Birding Tours", and this says "Cardellina Birding Tours". Neither of the
 * other two has been changed. Pick one and the rest can follow.
 */
export const BRAND_NAME = 'Cardellina Birding Tours';

/** wa.me with no message attached, for structured data and plain links. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Profiles that are unmistakably this business, for the `sameAs` of the
 * organisation. The point of sameAs is to let a search engine join a scattered
 * set of listings into one entity, so a wrong entry is worse than a missing
 * one: empty slots are filtered out before the JSON-LD is written.
 *
 * NEEDS BEN: the Google Business Profile. The homepage links its reviews
 * through a share.google short link, which redirects and is no use here; the
 * full maps.google.com URL for the listing is what belongs in this slot.
 */
export const SOCIAL_PROFILES: string[] = [
	'https://www.facebook.com/CardellinaBirding',
	'https://www.instagram.com/CardellinaBirding',
	'https://www.tripadvisor.com.mx/Attraction_Review-g150802-d33020997-Reviews-Birding_Tours_in_Chiapas_with_Sabes_Aves-San_Cristobal_de_las_Casas_Southern_Mex.html'
	// '' — Google Business Profile
].filter(Boolean);
