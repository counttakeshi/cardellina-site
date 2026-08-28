<script lang="ts">
	import TourCard from '$lib/components/TourCard.svelte';
	import { getTripsByType } from '$lib/data/trips';

	const dayTrips = getTripsByType('day');
</script>

<svelte:head>
	<title>Birdwatching in Chiapas - Full-day Tours | Cardellina - Chiapas Birding Tours</title>
</svelte:head>

<header class="hero">
	<div class="container">
		<h1>Day Tours</h1>
		<p>Full mornings out across Chiapas, from the highlands to the coast.</p>
	</div>
</header>

<section class="container page">
	<p class="intro">
		Pick a single day out, or string several together across a visit. Every tour is small (one
		to two people at this price, more on request), guided by Ben or Valente, and shaped around
		what you most want to see.
	</p>

	{#if dayTrips.length}
		<div class="grid">
			{#each dayTrips as trip (trip.slug)}
				<TourCard {trip} />
			{/each}
		</div>
	{:else}
		<p>Day tour listings are being migrated — check back shortly.</p>
	{/if}
</section>

<style>
	.hero {
		background: var(--color-dark);
		color: white;
		padding-block: 3rem;
	}

	.hero p {
		margin: 0;
		opacity: 0.85;
	}

	.page {
		padding-block: 2.5rem 4rem;
	}

	.intro {
		max-width: 640px;
		font-size: 1.05rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
</style>
