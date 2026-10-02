<script lang="ts">
	import { base } from '$app/paths';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageTitle, pageDescription } from '$lib/seo';
	import { crumbsFor } from '$lib/breadcrumbs';
	import { breadcrumbJsonLd, tourJsonLd } from '$lib/jsonld';
	import { SITE_ORIGIN, whatsappLink } from '$lib/config';
	import { dayTours } from '$lib/data/trips';
	import { hitRatesFor } from '$lib/data/hitRates';
	import { contentFor } from '$lib/content';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import RelatedLinks from '$lib/components/RelatedLinks.svelte';
	import { tourBirdLinks, routesIncludingSite, reportsForTour } from '$lib/related';
	import { imageAttrs } from '$lib/imageSize';
	import { altFor } from '$lib/ledger';

	let { data } = $props();
	const tour = $derived(data.tour);

	const backHref = $derived(tour.kind === 'day' ? '/trips#day' : '/trips#multi-day');
	const backLabel = $derived(tour.kind === 'day' ? 'All day tours' : 'All multi-day tours');

	let lightboxIndex = $state<number | null>(null);

	// The price lives in trips.ts with the listing cards, not in the detail data,
	// so the offer is looked up rather than duplicated.
	const dayTour = $derived(
		tour.kind === 'day' ? dayTours.find((t) => t.slug === tour.slug) : undefined
	);
	const tourUrl = $derived(`${SITE_ORIGIN}/trips/${tour.slug}`);

	// D4, D7, D8. Every one of these renders nothing until it is filled.
	const rates = $derived(tour.hitRates ? hitRatesFor(tour.slug) : []);
	const departures = $derived(tour.groupDepartures ?? []);
	const extension = $derived(contentFor(`tours/${tour.slug}`));

	/** The optional facts, skipping anything still empty. */
	const extraFacts = $derived(
		(
			[
				['Best months', tour.bestMonths],
				['Difficulty', tour.difficulty],
				['Highest point', tour.maxAltitudeM ? `${tour.maxAltitudeM.toLocaleString()} m` : ''],
				['Starts', tour.startTime]
			] as [string, unknown][]
		)
			.map(([l, v]) => [l, typeof v === 'string' ? v.trim() : v ? String(v) : ''] as const)
			.filter(([, v]) => v !== '')
	);

	/** Whether any of the optional blocks has anything to show. */
	const hasExtra = $derived(
		extraFacts.length > 0 ||
			departures.length > 0 ||
			rates.length > 0 ||
			(tour.pickupPoints?.length ?? 0) > 0 ||
			(tour.whatToBring?.length ?? 0) > 0 ||
			(tour.reviews?.length ?? 0) > 0 ||
			extension !== undefined
	);

	const fmtDate = (iso: string) =>
		new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			timeZone: 'UTC'
		});
</script>

<Seo
	jsonLd={[
		breadcrumbJsonLd(crumbsFor('/trips/' + tour.slug, tour.title)),
		tourJsonLd({
			name: tour.title,
			description: tour.kind === 'day' ? (tour.intro[0] ?? tour.tagline) : tour.summary,
			image: tour.hero,
			url: tourUrl,
			// Multi-day routes carry no offer until Ben fills fromPriceUsd (D4):
			// a trip advertised with no price is better than one advertised wrong.
			offer: dayTour
				? { priceUsd: dayTour.priceUsd, note: dayTour.party }
				: tour.fromPriceUsd
					? { priceUsd: tour.fromPriceUsd, note: 'From, per person' }
					: undefined,
			departures: departures.map((d) => ({
				start: d.start,
				end: d.end,
				priceUsd: d.priceUsd,
				soldOut: d.status === 'full' || d.status === 'cancelled'
			})),
			itinerary:
				tour.kind === 'multi-day' ? tour.days.map((d) => ({ name: d.title })) : undefined
		})
	]}
	title={pageTitle(tour.seoTitle, tour.title + ' | Cardellina - Chiapas Birding Tours')}
	description={pageDescription(
		tour.metaDescription,
		tour.kind === 'day' ? (tour.intro[0] ?? tour.tagline) : tour.summary
	)}
	image={'og/trips-' + tour.slug + '.jpg'}
/>

<header class="hero">
	<img
		class="hero-img"
		src={tour.hero} {...imageAttrs(tour.hero)}
		alt={altFor(tour.hero, tour.title)}
		style="object-position: {tour.heroFocus ?? '50% 40%'}"
	/>
	<div class="hero-shade"></div>
	<div class="wrap hero-inner">
		<p class="kicker">{tour.kind === 'day' ? tour.habitat : tour.length}</p>
		<h1>{tour.title}</h1>
		{#if tour.kind === 'day'}
			<p class="tag">{tour.tagline}</p>
		{/if}
	</div>
</header>

<Breadcrumbs crumbs={crumbsFor('/trips/' + tour.slug, tour.title)} />

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
									<img src={photo.thumb} {...imageAttrs(photo.thumb)} alt={photo.alt} loading="lazy" />
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
			<!--
				C9. The enquiry form is a page away and asks for a name and an address
				before it asks anything else. Plenty of people would rather just ask,
				and in Mexico that means WhatsApp. The message arrives naming the tour,
				so the first reply can answer rather than ask what they were reading.
			-->
			<a class="wa" href={whatsappLink(tour.title)} target="_blank" rel="noopener">
				<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
					<path
						d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2z"
					/>
				</svg>
				WhatsApp
			</a>
		</aside>
	</div>
</div>

{#if hasExtra}
<div class="wrap tour-extra">
	{#if extraFacts.length}
		<table class="x-facts">
			<tbody>
				{#each extraFacts as [label, value] (label)}
					<tr><th>{label}</th><td>{value}</td></tr>
				{/each}
			</tbody>
		</table>
	{/if}

	{#if departures.length}
		<section class="x-block">
			<h2>Dates</h2>
			<table class="x-dep">
				<thead>
					<tr><th>Dates</th><th>Price</th><th>Places</th></tr>
				</thead>
				<tbody>
					{#each departures as d (d.start)}
						<tr class:gone={d.status === 'full' || d.status === 'cancelled'}>
							<td>{fmtDate(d.start)} to {fmtDate(d.end)}</td>
							<td>{d.priceUsd.toLocaleString()} USD</td>
							<td>
								{#if d.status === 'full'}Full
								{:else if d.status === 'cancelled'}Cancelled
								{:else}{d.seatsLeft} of {d.seats}{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>
	{/if}

	{#if rates.length}
		<section class="x-block">
			<h2>How often we find them</h2>
			<ul class="x-rates">
				{#each rates as r (r.species)}
					<li>
						<span class="r-sp">{r.species}</span>
						<span class="r-n">
							Seen on {r.outingsWithSpecies} of {r.outings} outings ({r.period})
						</span>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if tour.pickupPoints?.length}
		<section class="x-block">
			<h2>Pick-up</h2>
			<ul class="x-list">
				{#each tour.pickupPoints as place (place)}<li>{place}</li>{/each}
			</ul>
		</section>
	{/if}

	{#if tour.whatToBring?.length}
		<section class="x-block">
			<h2>What to bring</h2>
			<ul class="x-list">
				{#each tour.whatToBring as item (item)}<li>{item}</li>{/each}
			</ul>
		</section>
	{/if}

	{#if extension}
		<!--
			The long-form extension, src/content/tours/<slug>.md. A draft is not
			built, so this is absent until Ben publishes it.
		-->
		<section class="x-block x-prose">
			{@html extension.html}
		</section>
	{/if}

	{#if tour.reviews?.length}
		<section class="x-block">
			<h2>What people said</h2>
			<!--
				Verbatim, and deliberately not marked up as structured data. Google's
				guidance is that a business is ineligible for review stars on pages
				where it controls the reviews about itself.
			-->
			{#each tour.reviews as review (review.quote)}
				<figure class="x-review">
					<blockquote>{review.quote}</blockquote>
					<figcaption>
						{review.name}{#if review.country}, {review.country}{/if}{#if review.month}
							· {review.month}{/if}
						{#if review.sourceUrl}
							<a href={review.sourceUrl} target="_blank" rel="noopener">source</a>
						{/if}
					</figcaption>
				</figure>
			{/each}
		</section>
	{/if}
</div>
{/if}

<div class="wrap related-wrap">
	<RelatedLinks heading="Birds on this tour with full accounts" links={tourBirdLinks(tour.slug, base)} />
	<RelatedLinks heading="Routes that include this site" links={routesIncludingSite(tour.slug, base)} />
	<RelatedLinks heading="Trip reports from here" links={reportsForTour(tour.slug, base)} />
</div>

<Lightbox photos={tour.gallery} bind:index={lightboxIndex} />

<style>
	.tour-extra {
		max-width: 1120px;
	}
	.x-block {
		margin-top: 2.4rem;
		max-width: 720px;
	}
	.x-block h2 {
		font-family: var(--mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.8rem;
	}
	.x-facts,
	.x-dep {
		width: 100%;
		max-width: 620px;
		border-collapse: collapse;
		margin-top: 2rem;
		font-size: 16px;
	}
	.x-facts th,
	.x-dep th {
		text-align: left;
		font-family: var(--mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		padding: 0.6rem 1.2rem 0.6rem 0;
		white-space: nowrap;
		vertical-align: top;
		border-bottom: 1px solid var(--rule);
	}
	.x-facts td,
	.x-dep td {
		padding: 0.6rem 1.2rem 0.6rem 0;
		border-bottom: 1px solid var(--rule);
		line-height: 1.5;
	}
	.x-dep tr.gone td {
		color: var(--stone);
		text-decoration: line-through;
	}
	.x-list,
	.x-rates {
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 16px;
		line-height: 1.7;
	}
	.x-list li {
		padding-left: 1.1rem;
		position: relative;
	}
	.x-list li::before {
		content: '·';
		position: absolute;
		left: 0.2rem;
		color: var(--phwa);
	}
	.x-rates li {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.7rem;
		align-items: baseline;
		padding: 0.35rem 0;
		border-bottom: 1px solid var(--rule);
	}
	.r-sp {
		font-weight: 700;
	}
	.r-n {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--stone);
	}
	.x-prose :global(h2) {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(22px, 2.6vw, 28px);
		text-transform: none;
		letter-spacing: 0;
		color: var(--ink);
		margin: 2rem 0 0.8rem;
	}
	.x-prose :global(p) {
		font-size: 17px;
		line-height: 1.75;
		margin-bottom: 1rem;
	}
	.x-review {
		margin: 0 0 1.4rem;
		padding-left: 1.1rem;
		border-left: 3px solid var(--rule);
	}
	.x-review blockquote {
		margin: 0 0 0.4rem;
		font-size: 17px;
		line-height: 1.7;
	}
	.x-review figcaption {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--stone);
	}
	.x-review a {
		color: var(--canopy);
	}

	.related-wrap {
		max-width: 1120px;
		padding-bottom: 3rem;
	}

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

	/* global.css gives every <section> 5.5rem of band padding. These are content
	   groupings inside an article, not page bands, so they opt out and space
	   themselves with margin instead. */
	.block {
		padding: 0;
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
		padding: 1.4rem 0 0;
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
	/* Secondary to the booking button, not a competing offer: same width, no
	   fill, WhatsApp's own green only on the mark. */
	.wa {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 0.6rem;
		padding: 12px 20px;
		border: 1px solid var(--rule);
		border-radius: 3px;
		font-family: var(--body);
		font-weight: 700;
		font-size: 15px;
		color: var(--ink);
		text-decoration: none;
		transition:
			border-color 0.18s,
			color 0.18s;
	}
	.wa svg {
		color: #25d366;
		flex-shrink: 0;
	}
	.wa:hover {
		border-color: #25d366;
		color: #1a9e4b;
	}
	.wa:focus-visible {
		outline: 2px solid var(--canopy);
		outline-offset: 2px;
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
