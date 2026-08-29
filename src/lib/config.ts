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
 * TODO: replace with the real form ID from the Formspree dashboard
 * (Formspree → your form → Integration → the endpoint ending in /f/xxxxxxxx).
 */
export const CONTACT_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_FORM_ID';

/** Where enquiries land, shown to the user if the form ever fails. */
export const CONTACT_EMAIL = 'info@cardellina.com';
