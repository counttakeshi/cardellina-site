<script lang="ts">
	let { data } = $props();
	const trip = $derived(data.trip);
</script>

<svelte:head>
	<title>{trip.title} | Cardellina - Chiapas Birding Tours</title>
</svelte:head>

<article class="container page">
	<p class="eyebrow">{trip.eyebrow}</p>
	<h1>{trip.title}</h1>
	{#if trip.days}<p class="days">{trip.days}</p>{/if}

	<img class="cover" src={trip.imageUrl} alt={trip.title} />

	<p class="summary">{trip.summary}</p>

	{#if trip.description}
		<div class="description">{trip.description}</div>
	{:else}
		<p class="note">Full itinerary copy is pending migration.</p>
	{/if}

	{#if trip.targetSpecies.length}
		<h2>Target species</h2>
		<p>{trip.targetSpecies.join(' · ')}</p>
	{/if}

	<a class="button" href="/contact">Enquire about this trip</a>
</article>

<style>
	.page {
		padding-block: 2rem 4rem;
		max-width: 760px;
	}

	.days {
		color: var(--color-text-muted);
	}

	.cover {
		width: 100%;
		border-radius: 6px;
		margin: 1.5rem 0;
	}

	.summary {
		font-size: 1.1rem;
	}

	.note {
		color: var(--color-text-muted);
	}

	.button {
		display: inline-block;
		margin-top: 1.5rem;
	}
</style>
