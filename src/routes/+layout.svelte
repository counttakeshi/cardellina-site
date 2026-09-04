<script lang="ts">
	import '$lib/styles/global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Clarity from '$lib/components/Clarity.svelte';
	import { asset } from '$lib/ledger';

	let { children } = $props();
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

<Clarity />

<Nav />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<Footer />
