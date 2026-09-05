<script lang="ts">
	import { CLARITY_PROJECT_ID } from '$lib/config';
	import { consentRequired, storedChoice, signalClarity, type ConsentChoice } from '$lib/consent';

	interface Props {
		/**
		 * Set by the cookie banner the moment someone answers, so Clarity starts
		 * on the same page view rather than the next one.
		 */
		choice?: ConsentChoice | null;
	}
	let { choice = null }: Props = $props();

	let loaded = false;

	/** Clarity's own loader snippet, injected rather than written into the head. */
	function load(id: string) {
		if (loaded) return;
		loaded = true;
		const w = window as unknown as Record<string, unknown>;
		w.clarity =
			w.clarity ??
			function (...args: unknown[]) {
				((w.clarity as { q?: unknown[] }).q ??= []).push(args);
			};
		const s = document.createElement('script');
		s.async = true;
		s.src = `https://www.clarity.ms/tag/${id}`;
		document.head.appendChild(s);
	}

	/**
	 * Where consent is required, Clarity is not loaded at all until it is given.
	 * Loading it and then saying "denied" would still send the visit — including
	 * an IP address — to a third party before being allowed to, which is the
	 * thing the rule is about. Declining here means the script never arrives.
	 *
	 * Everywhere else it loads and says nothing about consent.
	 *
	 * Saying nothing is the important part. We work out the region from the
	 * visitor's timezone, and Clarity works it out from their IP address, so the
	 * two can disagree: a VPN, or somebody travelling, or a laptop still set to
	 * the clock of wherever it was bought. When they disagree the wrong way — our
	 * guess says Mexico, their address says Austria — signalling "granted" would
	 * be claiming a consent nobody ever gave.
	 *
	 * So the guess is only ever allowed to *suppress* the banner, never to
	 * manufacture an answer. If it is wrong, Clarity's own enforcement notices
	 * the address, finds no signal, and runs in no-consent mode: an incomplete
	 * session rather than a fabricated permission. Worse analytics is the right
	 * way for this to fail.
	 */
	$effect(() => {
		if (!CLARITY_PROJECT_ID) return;

		const decided = choice ?? storedChoice();
		if (consentRequired()) {
			if (decided !== 'granted') return;
			load(CLARITY_PROJECT_ID);
			signalClarity('granted');
			return;
		}

		load(CLARITY_PROJECT_ID);
		// Only if they were actually asked at some point — someone who answered in
		// Berlin last month and is reading in Mexico City today.
		if (decided) signalClarity(decided);
	});
</script>
