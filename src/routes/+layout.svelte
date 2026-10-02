<script lang="ts">
	import '$lib/styles/global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Clarity from '$lib/components/Clarity.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	import { asset } from '$lib/ledger';
	import type { ConsentChoice } from '$lib/consent';
	import { track, linkEvent } from '$lib/analytics';

	let { children } = $props();

	// Passed straight to Clarity so an answer takes effect on the page the
	// visitor is already on, rather than waiting for the next navigation.
	let consent = $state<ConsentChoice | null>(null);

	/**
	 * C8. One delegated listener for every outbound contact link on the site.
	 *
	 * These sit in the nav, the footer, the contact page, the plan page, every
	 * tour page and inside the enquiry form's error state. A handler per link
	 * would have to be remembered at each new one, and a forgotten one is
	 * invisible: the link still works, the event simply never arrives.
	 *
	 * Capture phase, because a WhatsApp link navigates away and a listener that
	 * waits its turn can lose the race.
	 */
	$effect(() => {
		const onClick = (e: MouseEvent) => {
			const link = (e.target as Element | null)?.closest?.('a[href]');
			if (!link) return;
			const event = linkEvent(link.getAttribute('href') ?? '');
			if (event) track(event);
		};
		document.addEventListener('click', onClick, { capture: true });
		return () => document.removeEventListener('click', onClick, { capture: true });
	});
</script>

<svelte:head>
	<!-- Files in static/, not Vite asset imports. The skeleton shipped
	     svelte-logo.svg imported here, which Vite inlined as a data URI into the
	     head of every page — so the tab showed Svelte's mark and there was no
	     favicon file to serve. Sized from the 1254px original rather than
	     shipping it: the full artwork is 616KB, heavier than any photo on the
	     site. asset() carries the base path, so these resolve on the project URL
	     too. The tab icons keep the transparent surround; the Apple one is
	     flattened onto white, since iOS composites it onto its own ground. -->
	<link rel="icon" type="image/png" sizes="32x32" href={asset('favicon-32.png')} />
	<link rel="icon" type="image/png" sizes="180x180" href={asset('favicon-180.png')} />
	<link rel="apple-touch-icon" sizes="180x180" href={asset('apple-touch-icon.png')} />
</svelte:head>

<Clarity choice={consent} />

<Nav />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<Footer />

<CookieBanner onchoice={(c) => (consent = c)} />
