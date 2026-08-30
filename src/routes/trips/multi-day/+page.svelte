<script lang="ts">
	import { base } from '$app/paths';
	import { multiDayTrips } from '$lib/data/trips';
	import SiteMap from '$lib/components/SiteMap.svelte';

	const HERO =
		'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600,h=600,fit=crop/YofU1cddTQzjoQ8J/tacana-photo-YbNB1ybokJuXrOor.jpg';

	function scrollToMap(event: MouseEvent) {
		event.preventDefault();
		document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Birdwatching in Chiapas - Multi-day Tours | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="Multi-day birding trips across Chiapas, from focused three-day routes to a full expedition across the state."
	/>
</svelte:head>

<header class="hero" style="--hero-img:url('{HERO}')">
	<div class="wrap hero-inner">
		<h1>Multi-day tours</h1>
		<p>
			From a few focused days to a full expedition across the state. Take one of the trips below, or
			build something around your own targets.
		</p>
	</div>
</header>

<section class="intro">
	<div class="wrap">
		<p class="lede">
			Every one of these is a starting point rather than a fixed package. They're the routes we know
			best and run most often, but the dates, pace and targets are yours to shape. The short trips
			focus on one part of the state; the longer ones sweep across several. Below them, a map of
			everywhere we bird, so you can see the possibilities for yourself.
		</p>
	</div>
</section>

<div class="wrap">
	<a class="map-teaser" href="#explore" onclick={scrollToMap}>
		<div class="map-teaser-inner">
			<svg
				class="mt-icon"
				viewBox="0 0 48 48"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<path d="M18 6 6 10v32l12-4 12 4 12-4V6L30 10 18 6z" />
				<path d="M18 6v32M30 10v32" />
				<circle cx="24" cy="22" r="3" fill="currentColor" stroke="none" />
			</svg>
			<div class="mt-text">
				<h3>Where we go</h3>
				<p>See how the trips fit together across Chiapas, and what lives where.</p>
			</div>
			<span class="mt-go">Explore the map ↓</span>
		</div>
	</a>
</div>

<section class="tours">
	<div class="wrap">
		<div class="tour-grid">
			{#each multiDayTrips as trip (trip.slug)}
				<article class="tour-card">
					<div class="tc-img">
						<img src={trip.image} alt={trip.name} loading="lazy" />
						<span class="tc-days">{trip.days}</span>
					</div>
					<div class="tc-body">
						<p class="tc-theme">{trip.theme}</p>
						<h3 class="tc-name">
							<!-- Stretched link: the whole card is clickable, but only this
							     anchor is in the tab order and read out by screen readers. -->
							<a class="tc-stretch" href="{base}/trips/{trip.slug}">{trip.name}</a>
						</h3>
						<p class="tc-summary">{trip.summary}</p>
						<p class="tc-birds">{trip.birds.join(' · ')}</p>
						<div class="tc-foot">
							<span class="tc-link">See the itinerary →</span>
							{#if trip.sampleItinerary}
								<span class="tc-draft">Sample itinerary</span>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="mapsec" id="explore">
	<div class="wrap">
		<p class="eyebrow">Explore the possibilities</p>
		<h2>Everywhere we bird</h2>
		<p class="lede">
			Tap a site to see what lives there, or switch to species mode to find where a particular bird
			is.
		</p>
		<SiteMap />
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: clamp(220px, 30vw, 340px);
		display: flex;
		align-items: flex-end;
		background:
			linear-gradient(
				180deg,
				rgba(22, 36, 31, 0.35) 0%,
				rgba(22, 36, 31, 0.32) 40%,
				rgba(22, 36, 31, 0.88) 100%
			),
			var(--hero-img) center 45%/cover no-repeat;
		background-color: var(--ink);
	}
	.hero-inner {
		padding: 1.8rem 0 2rem;
		width: 100%;
	}
	.hero h1 {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(30px, 4.5vw, 44px);
		line-height: 1.05;
		letter-spacing: -0.015em;
		color: #fff;
		margin-bottom: 0.4rem;
	}
	.hero p {
		font-size: 15.5px;
		color: rgba(255, 255, 255, 0.82);
		max-width: 62ch;
	}

	.intro {
		padding: 3.5rem 0 1.5rem;
	}

	.map-teaser {
		display: block;
		text-decoration: none;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 5px;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}
	.map-teaser:hover {
		border-color: var(--canopy);
		box-shadow: 0 10px 26px rgba(22, 36, 31, 0.07);
	}
	.map-teaser-inner {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		padding: 1.3rem 1.6rem;
		flex-wrap: wrap;
	}
	.mt-icon {
		width: 34px;
		height: 34px;
		color: var(--canopy);
		flex-shrink: 0;
	}
	.mt-text {
		flex: 1;
		min-width: 220px;
	}
	.mt-text h3 {
		font-family: var(--display);
		font-weight: 500;
		font-size: 20px;
		margin-bottom: 0.15rem;
	}
	.mt-text p {
		font-size: 14.5px;
		color: var(--stone);
		margin: 0;
	}
	.mt-go {
		font-weight: 700;
		font-size: 14px;
		color: var(--canopy);
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
		white-space: nowrap;
	}
	.map-teaser:hover .mt-go {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.tours {
		padding: 2.5rem 0 1rem;
	}
	.tour-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.6rem;
	}
	.tour-card {
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 5px;
		overflow: hidden;
		transition:
			border-color 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.tc-stretch {
		text-decoration: none;
		color: inherit;
	}
	/* Expands the single anchor to cover the card, so the whole thing is clickable
	   without nesting interactive elements or duplicating links. */
	.tc-stretch::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
	}
	.tour-card:focus-within {
		border-color: var(--canopy);
		box-shadow: 0 0 0 3px rgba(214, 68, 111, 0.25);
	}
	.tour-card:hover {
		border-color: var(--canopy);
		transform: translateY(-3px);
		box-shadow: 0 12px 30px rgba(22, 36, 31, 0.08);
	}
	.tc-img {
		position: relative;
		aspect-ratio: 3/2;
		overflow: hidden;
		background: var(--ink);
	}
	.tc-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.tour-card:hover .tc-img img {
		transform: scale(1.05);
	}
	.tc-days {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		background: rgba(22, 36, 31, 0.88);
		color: #fff;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		padding: 4px 9px;
		border-radius: 3px;
	}
	.tc-body {
		padding: 1.5rem 1.6rem 1.6rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.tc-theme {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.6rem;
	}
	.tc-name {
		font-family: var(--display);
		font-weight: 500;
		font-size: 26px;
		line-height: 1.1;
		color: var(--ink);
		margin-bottom: 0.7rem;
	}
	.tc-summary {
		font-size: 15px;
		color: var(--stone);
		line-height: 1.6;
		margin-bottom: 1rem;
	}
	.tc-birds {
		font-size: 13px;
		color: var(--canopy);
		line-height: 1.55;
		padding: 0.8rem 0;
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		margin-bottom: 1.1rem;
	}
	.tc-foot {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.tc-link {
		font-weight: 700;
		font-size: 14px;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
		transition:
			color 0.18s,
			border-color 0.18s;
	}
	.tour-card:hover .tc-link {
		color: var(--phwa);
		border-color: var(--phwa);
	}
	.tc-draft {
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--lichen);
		border: 1px solid rgba(168, 118, 47, 0.4);
		background: rgba(168, 118, 47, 0.08);
		border-radius: 2px;
		padding: 3px 7px;
	}

	.mapsec {
		padding: 3.5rem 0 4.5rem;
	}
	.mapsec h2 {
		margin-bottom: 0.8rem;
	}
	.mapsec .lede {
		margin-bottom: 1.8rem;
	}

	@media (max-width: 820px) {
		.tour-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
