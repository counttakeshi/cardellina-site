/**
 * Custom events, sent to Clarity and only to Clarity.
 *
 * The site has been live with no measurement of the one thing that matters.
 * Clarity records sessions, so it can show somebody filling in the enquiry form
 * and can show them stopping, but it cannot tell a submission that succeeded
 * from one that silently failed, and it cannot see a WhatsApp tap at all
 * because that leaves the site. Those are the conversions. Without them the
 * dashboard reports traffic and nothing else.
 */
import { browser } from '$app/environment';

type ClarityFn = (...args: unknown[]) => void;

/**
 * Sends an event, if and only if Clarity is actually running.
 *
 * Clarity.svelte installs `window.clarity` as part of loading the tag, and it
 * does not load it at all for a visitor in the EEA who has not consented. So
 * the presence of the function is itself the consent check: no tag, no global,
 * no event. There is no separate flag to keep in step with the banner.
 */
export function track(event: string): void {
	if (!browser) return;
	const clarity = (window as unknown as { clarity?: ClarityFn }).clarity;
	if (typeof clarity !== 'function') return;
	try {
		clarity('event', event);
	} catch {
		// Analytics must never be able to break the page it is measuring.
	}
}

/**
 * The event name for a link, or null if it is not one we count.
 *
 * Matching on the href rather than wiring handlers to each link is deliberate:
 * these links appear in the nav, the footer, the contact page, the plan page,
 * every tour page and inside the enquiry form's error state. Hand-wired
 * handlers would have to be remembered at each new one, and the first forgotten
 * one is invisible: the link still works and the event simply never arrives.
 */
export function linkEvent(href: string): string | null {
	if (href.startsWith('mailto:')) return 'email_click';
	if (href.startsWith('tel:')) return 'phone_click';
	if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp_click';
	return null;
}
