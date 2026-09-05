/**
 * Cookie consent: whether this visitor needs to be asked, what they answered,
 * and telling Clarity about it.
 *
 * Since 31 October 2025 Clarity enforces a consent signal for visits from the
 * EEA, the UK and Switzerland. Without one it assigns a fresh ID to every page
 * view, so a visitor who reads four pages arrives as four separate one-page
 * visits and session recordings, heatmaps and funnels are incomplete. That is
 * the whole reason this exists.
 *
 * Nowhere else requires opt-in consent for analytics cookies — not Mexico, not
 * the US, not most of the world — so nobody else is shown a banner.
 */
import { browser } from '$app/environment';

export type ConsentChoice = 'granted' | 'denied';

const KEY = 'cardellina.consent';

/**
 * Consent goes stale. Twelve months is the interval regulators point to most
 * often, and it means a visitor who declined once is not asked again for a
 * year.
 */
const MAX_AGE_DAYS = 365;

interface StoredConsent {
	choice: ConsentChoice;
	at: number;
}

/**
 * Timezones where opt-in consent is required: the EEA, the UK and Switzerland.
 *
 * A static site on GitHub Pages has no server and therefore no country header,
 * so the visitor's own timezone stands in for their location. It costs no
 * network request and nothing leaves the device — which matters, because
 * calling a geo-IP service to decide whether to ask about privacy would send
 * the visitor's address to a third party to do it.
 *
 * Deliberately generous: every `Europe/*` zone matches, including a handful
 * outside the EEA. Showing the banner to someone in Belgrade costs a click;
 * failing to show it to someone in Berlin is the error that matters. The
 * non-European entries are EU and EEA territory that sorts elsewhere in the
 * IANA database.
 */
const EXTRA_ZONES = new Set([
	'Atlantic/Azores', // Portugal
	'Atlantic/Madeira', // Portugal
	'Atlantic/Canary', // Spain
	'Atlantic/Reykjavik', // Iceland
	'Atlantic/Faroe', // Denmark
	'Atlantic/Jan_Mayen', // Norway
	'Asia/Nicosia', // Cyprus
	'Asia/Famagusta', // Cyprus
	'Indian/Mayotte', // France
	'Indian/Reunion', // France
	'America/Cayenne', // France
	'America/Martinique', // France
	'America/Guadeloupe' // France
]);

/**
 * Region codes of the EEA, the UK and Switzerland, as they appear in a browser
 * language tag: the `AT` in `de-AT`.
 */
const REGIONS = new Set([
	'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
	'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
	'SE', 'IS', 'LI', 'NO', 'GB', 'UK', 'CH'
]);

/**
 * Whether this visitor is somewhere that requires being asked first.
 *
 * Two independent signals, and either one is enough to ask. Neither costs a
 * network request, which matters: looking a visitor up in a geo-IP service to
 * decide whether to ask permission would mean handing their address to a third
 * party in order to do it. The one endpoint that reports a country accurately
 * sets a cookie of its own on the way, which for a consent mechanism is
 * self-defeating.
 *
 *   timezone — catches residents, whose clock matches where they live
 *   language — catches travellers, whose clock has followed them but whose
 *              browser still says de-AT
 *
 * Neither sees through a VPN, because a VPN changes the address and nothing
 * else. That is a testing inconvenience rather than a compliance hole: if both
 * signals are wrong, Clarity's own enforcement reads the real address, finds no
 * consent signal from us, and runs without a cookie. See Clarity.svelte.
 */
export function consentRequired(): boolean {
	if (!browser) return false;

	try {
		const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
		if (zone.startsWith('Europe/') || EXTRA_ZONES.has(zone)) return true;
	} catch {
		// No timezone available — a locked-down or very old browser. Ask, since the
		// alternative is setting cookies on somebody who may be entitled to refuse.
		return true;
	}

	const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
	return tags.some((tag) => {
		const region = tag?.split('-')[1]?.toUpperCase();
		return !!region && REGIONS.has(region);
	});
}

/** The stored answer, or null if they have not answered or it has expired. */
export function storedChoice(): ConsentChoice | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as StoredConsent;
		if (parsed.choice !== 'granted' && parsed.choice !== 'denied') return null;
		const age = (Date.now() - parsed.at) / 86_400_000;
		return age > MAX_AGE_DAYS ? null : parsed.choice;
	} catch {
		// Private windows and cleared site data both land here. Treat it as
		// unanswered rather than assuming either way.
		return null;
	}
}

export function remember(choice: ConsentChoice): void {
	if (!browser) return;
	try {
		localStorage.setItem(KEY, JSON.stringify({ choice, at: Date.now() } satisfies StoredConsent));
	} catch {
		// Storage refused. The choice still applies to this page load; they will
		// simply be asked again next visit, which is the safe way to fail.
	}
}

/**
 * Tell Clarity what was decided, using the consentv2 API.
 *
 * `ad_Storage` is denied outright and always: the field is required, and this
 * site runs no advertising, so there is nothing it could honestly consent to.
 * `analytics_Storage` is the one that lets Clarity keep its cookie and stitch
 * page views into a single visit.
 */
export function signalClarity(choice: ConsentChoice): void {
	if (!browser) return;
	const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity;
	if (typeof clarity !== 'function') return;
	clarity('consentv2', {
		ad_Storage: 'denied',
		analytics_Storage: choice === 'granted' ? 'granted' : 'denied'
	});
}
