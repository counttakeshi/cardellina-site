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
export const CLARITY_PROJECT_ID = '';
