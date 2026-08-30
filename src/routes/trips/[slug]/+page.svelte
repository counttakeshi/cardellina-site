<script lang="ts">
	import { base } from '$app/paths';
	import Lightbox from '$lib/components/Lightbox.svelte';

	let { data } = $props();
	const tour = $derived(data.tour);

	const backHref = $derived(tour.kind === 'day' ? '/trips/day' : '/trips/multi-day');
	const backLabel = $derived(tour.kind === 'day' ? 'All day tours' : 'All multi-day tours');

	let lightboxIndex = $state<number | null>(null);
</script>

<svelte:head>
	<title>{tour.title} | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content={tour.kind === 'day' ? tour.intro[0] ?? tour.tagline : tour.summary}
	/>
</svelte:head>

<header class="hero">
	<img class="hero-img" src={tour.hero} alt={tour.title} />
	<div class="hero-shade"></div>
	<div class="wrap hero-inner">
		<p class="kicker">{tour.kind === 'day' ? tour.habitat : tour.length}</p>
		<h1>{tour.title}</h1>
		{#if tour.kind === 'day'}
			<p class="tag">{tour.tagline}</p>
		{/if}
	</div>
</header>

<div class="wrap page">
	<a class="back" href="{base}{backHref}">← {backLabel}</a>

	<div class="layout">
		<div class="body">
			{#if tour.kind === 'day'}
				{#each tour.intro as para (para)}
					<p class="lead">{@html para}</p>
				{/each}

				{#if tour.targets.length}
					<section class="block">
						<h2>Target birds</h2>
						<div class="chips">
							{#each tour.targets as bird (bird)}
								<span class="chip">{bird}</span>
							{/each}
						</div>
					</section>
				{/if}
			{:else}
				<p class="lead">{@html tour.summary}</p>

				{#if tour.draftNote}
					<p class="note">{tour.draftNote}</p>
				{/if}

				{#if tour.headlineBirds.length}
					<section class="headline">
						<div class="hl-label">Headline birds</div>
						<div class="chips">
							{#each tour.headlineBirds as bird (bird)}
								<span class="chip">{bird}</span>
							{/each}
						</div>
					</section>
				{/if}
			{/if}

			{#if tour.gallery.length}
				<section class="block">
					<h2>{tour.kind === 'day' ? 'From the field' : 'On this trip'}</h2>
					<p class="sub">A selection of birds from this route. Tap to enlarge.</p>
					<div class="gallery">
						{#each tour.gallery as photo, i (photo.full + i)}
							<figure>
								<button onclick={() => (lightboxIndex = i)} aria-label="Enlarge {photo.alt}">
									<img src={photo.thumb} alt={photo.alt} loading="lazy" />
								</button>
								<figcaption>{photo.caption}</figcaption>
							</figure>
						{/each}
					</div>
				</section>
			{/if}

			{#if tour.kind === 'multi-day' && tour.days.length}
				<section class="block">
					<h2>Day by day</h2>
					<ol class="itin">
						{#each tour.days as day (day.label)}
							<li class="day">
								<div class="day-n"><span>{day.label}</span></div>
								<div class="day-body">
									<h3>{day.title}</h3>
									{#each day.body as para (para)}
										<p>{@html para}</p>
									{/each}
									{#if day.stay}
										<p class="stay">{day.stay}</p>
									{/if}
								</div>
							</li>
						{/each}
					</ol>
				</section>
			{/if}
		</div>

		<aside class="card">
			{#if tour.facts.length}
				<table>
					<tbody>
						{#each tour.facts as fact (fact.label)}
							<tr>
								<td>{fact.label}</td>
								<td>{@html fact.value}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
			<a class="book" href="{base}/contact?tour={tour.slug}">
				{tour.kind === 'day' ? 'Book this tour' : 'Enquire about this trip'}
			</a>
		</aside>
	</div>
</div>

<Lightbox photos={tour.gallery} bind:index={lightboxIndex} />

<style>
	.hero {
		position: relative;
		min-height: clamp(260px, 34vw, 420px);
		display: flex;
		align-items: flex-end;
		background: var(--ink);
		overflow: hidden;
	}
	.hero-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.hero-shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(22, 36, 31, 0.25) 0%,
			rgba(22, 36, 31, 0.3) 40%,
			rgba(22, 36, 31, 0.9) 100%
		);
	}
	.hero-inner {
		position: relative;
		z-index: 2;
		padding: 2rem 1.5rem 2.2rem;
		width: 100%;
	}
	.kicker {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.75);
		margin-bottom: 0.5rem;
	}
	.hero h1 {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(32px, 5vw, 52px);
		line-height: 1.04;
		letter-spacing: -0.02em;
		color: #fff;
		margin: 0;
	}
	.tag {
		font-family: var(--display);
		font-style: italic;
		font-size: 19px;
		color: #f2b9cb;
		margin: 0.35rem 0 0;
	}

	.page {
		padding: 1.6rem 1.5rem 4.5rem;
	}
	.back {
		display: inline-block;
		font-family: var(--mono);
		font-size: 11.5px;
		letter-spacing: 0.05em;
		color: var(--stone);
		text-decoration: none;
		margin-bottom: 1.8rem;
	}
	.back:hover {
		color: var(--phwa);
	}

	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 300px;
		gap: 3rem;
		align-items: start;
	}

	.lead {
		font-size: 18px;
		line-height: 1.7;
		margin-bottom: 1.1rem;
	}
	.note {
		font-size: 14px;
		font-style: italic;
		color: var(--stone);
		border-left: 2px solid var(--rule);
		padding-left: 0.9rem;
		margin-bottom: 1.6rem;
	}

	.block {
		margin-top: 2.6rem;
	}
	.block h2,
	.headline .hl-label {
		font-family: var(--display);
		font-weight: 500;
		font-size: 22px;
		margin-bottom: 0.6rem;
	}
	.sub {
		font-size: 14px;
		color: var(--stone);
		margin-bottom: 1rem;
	}

	.headline {
		margin-top: 1.8rem;
		padding-top: 1.4rem;
		border-top: 1px solid var(--rule);
	}
	.headline .hl-label {
		font-family: var(--mono);
		font-size: 10.5px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--phwa);
		margin-bottom: 0.7rem;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.chip {
		font-size: 13px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		padding: 5px 10px;
		color: var(--canopy);
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 10px;
	}
	.gallery figure {
		margin: 0;
	}
	.gallery button {
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		border-radius: 4px;
		overflow: hidden;
	}
	.gallery img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		display: block;
		transition: transform 0.35s ease;
	}
	.gallery button:hover img {
		transform: scale(1.05);
	}
	.gallery figcaption {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--stone);
		margin-top: 5px;
		line-height: 1.4;
	}

	.itin {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.day {
		display: grid;
		grid-template-columns: 76px minmax(0, 1fr);
		gap: 1.2rem;
		padding: 1.4rem 0;
		border-top: 1px solid var(--rule);
	}
	.day-n span {
		display: inline-block;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--canopy);
		background: var(--mist);
		border-radius: 3px;
		padding: 4px 8px;
		white-space: nowrap;
	}
	.day-body h3 {
		font-family: var(--display);
		font-weight: 500;
		font-size: 19px;
		margin-bottom: 0.5rem;
	}
	.day-body p {
		font-size: 15.5px;
		line-height: 1.7;
		color: var(--stone);
		margin-bottom: 0.6rem;
	}
	.stay {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--lichen) !important;
		margin: 0 !important;
	}

	.card {
		position: sticky;
		top: calc(var(--header-h) + 1.5rem);
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 8px;
		padding: 1.4rem 1.5rem 1.5rem;
	}
	.card table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1.2rem;
	}
	.card td {
		padding: 0.55rem 0;
		font-size: 14px;
		vertical-align: top;
		border-bottom: 1px solid var(--rule);
	}
	.card tr:last-child td {
		border-bottom: 0;
	}
	.card td:first-child {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
		width: 40%;
		padding-right: 0.8rem;
	}
	.card :global(.muted) {
		color: var(--stone);
		font-size: 12.5px;
	}
	.book {
		display: block;
		text-align: center;
		background: var(--phwa);
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 15px;
		padding: 0.85rem 1.2rem;
		border-radius: 3px;
		transition: background 0.18s;
	}
	.book:hover {
		background: #bf3a61;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
			gap: 2.2rem;
		}
		.card {
			position: static;
		}
	}
	@media (max-width: 560px) {
		.day {
			grid-template-columns: 1fr;
			gap: 0.6rem;
		}
	}
</style>
