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
