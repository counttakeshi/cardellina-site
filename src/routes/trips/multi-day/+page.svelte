<script lang="ts">
	import TourCard from '$lib/components/TourCard.svelte';
	import SiteMap from '$lib/components/SiteMap.svelte';
	import { getTripsByType } from '$lib/data/trips';

	const multiDayTrips = getTripsByType('multi-day');
</script>

<svelte:head>
	<title>Birdwatching in Chiapas - Multi-day Tours | Cardellina - Chiapas Birding Tours</title>
</svelte:head>

<header class="hero">
	<div class="container">
		<h1>Multi-day Tours</h1>
	</div>
</header>

<section class="container page">
	<div class="grid">
		{#each multiDayTrips as trip (trip.slug)}
			<TourCard {trip} />
		{/each}
	</div>

	<section class="reports">
		<h2>See trip reports from our previous birding adventures</h2>
		<p class="note">Trip-report content is pending migration.</p>
	</section>

	<section class="explore">
		<p class="eyebrow">Explore the possibilities</p>
		<h2>Everywhere we bird</h2>
		<p>
			Tap a site to see what lives there, or switch to species mode to find where a particular
			bird is. Dashed lines are the roads between sites.
		</p>
		<SiteMap />
	</section>
</section>

<style>
	.hero {
		background: var(--color-dark);
		color: white;
		padding-block: 3rem;
	}

	.page {
		padding-block: 2.5rem 4rem;
		display: grid;
		gap: 3.5rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.reports .note {
		color: var(--color-text-muted);
	}

	.explore {
		border-top: 1px solid var(--color-border);
		padding-top: 2.5rem;
	}
</style>
