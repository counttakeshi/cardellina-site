<script lang="ts">
	import type { Trip } from '$lib/data/trips';

	let { trip }: { trip: Trip } = $props();
</script>

<article class="card">
	<div class="card__image">
		<img src={trip.imageUrl} alt={trip.title} loading="lazy" />
		{#if trip.days}
			<span class="card__badge">{trip.days}</span>
		{/if}
	</div>

	<div class="card__body">
		<p class="eyebrow">{trip.eyebrow}</p>
		<h3>{trip.title}</h3>
		<p>{trip.summary}</p>

		{#if trip.targetSpecies.length}
			<p class="card__species">{trip.targetSpecies.join(' · ')}</p>
		{/if}

		<div class="card__actions">
			<a href="/trips/{trip.slug}">See the itinerary →</a>
			{#if trip.sampleItineraryUrl}
				<a class="button" href={trip.sampleItineraryUrl}>Sample itinerary</a>
			{/if}
		</div>
	</div>
</article>

<style>
	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.card__image {
		position: relative;
		aspect-ratio: 4 / 3;
		background: var(--color-border);
	}

	.card__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card__badge {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background: var(--color-dark);
		color: white;
		font-size: 0.75rem;
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
	}

	.card__body {
		padding: 1.25rem;
		display: grid;
		gap: 0.5rem;
	}

	.card__species {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		border-top: 1px solid var(--color-border);
		padding-top: 0.5rem;
	}

	.card__actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 0.5rem;
	}
</style>
