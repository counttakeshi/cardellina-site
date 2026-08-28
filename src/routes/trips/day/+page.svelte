<script lang="ts">
	import { base } from '$app/paths';
	import { dayTours } from '$lib/data/trips';

	const HERO =
		"https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1600,h=360,fit=crop,gravity=0.8x0.2/YofU1cddTQzjoQ8J/dscn5960-AGB2B6qXevFLZNPP.JPG";
</script>

<svelte:head>
	<title>Birdwatching in Chiapas - Full-day Tours | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="Full-day birding tours across Chiapas, from the highlands of San Cristóbal to the Pacific slope and the Lacandón rainforest."
	/>
</svelte:head>

<header class="hero" style="--hero-img:url('{HERO}')">
	<div class="wrap hero-inner">
		<h1>Day Tours</h1>
		<p>Full mornings out across Chiapas, from the highlands to the coast.</p>
	</div>
</header>

<section class="intro">
	<div class="wrap">
		<p class="lede">
			Pick a single day out, or string several together across a visit. Every tour is small (one to
			two people at this price, more on request), guided by Ben or Valente, and shaped around what
			you most want to see.
		</p>
	</div>
</section>

<section class="tours">
	<div class="wrap">
		<div class="tour-grid">
			{#each dayTours as tour (tour.slug)}
				<article class="tour-card">
					<div class="tc-img"><img src={tour.image} alt={tour.name} loading="lazy" /></div>
					<div class="tc-body">
						<p class="tc-hab">{tour.habitat}</p>
						<h3 class="tc-name">{tour.name}</h3>
						<p class="tc-tag">{tour.tagline}</p>
						<p class="tc-blurb">{tour.blurb}</p>
						<p class="tc-birds">{tour.birds.join(' · ')}</p>
						<div class="tc-foot">
							<div class="tc-meta">
								<span class="tc-price">{tour.priceUsd} USD</span>
								<span class="tc-party">{tour.party}</span>
							</div>
							<a class="tc-link" href="{base}/contact">Enquire →</a>
						</div>
						{#if tour.note}
							<span class="tc-note">{tour.note}</span>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: clamp(200px, 26vw, 300px);
		display: flex;
		align-items: flex-end;
		background:
			linear-gradient(
				180deg,
				rgba(22, 36, 31, 0.35) 0%,
				rgba(22, 36, 31, 0.3) 40%,
				rgba(22, 36, 31, 0.9) 100%
			),
			var(--hero-img) center/cover no-repeat;
		background-color: var(--ink);
	}
	.hero-inner {
		padding: 1.6rem 0 1.8rem;
		width: 100%;
	}
	.hero h1 {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(30px, 4.5vw, 44px);
		line-height: 1.05;
		letter-spacing: -0.015em;
		color: #fff;
		margin-bottom: 0.35rem;
	}
	.hero p {
		font-size: 15px;
		color: rgba(255, 255, 255, 0.82);
	}

	.intro {
		padding: 3.5rem 0 1rem;
	}

	.tours {
		padding: 2.5rem 0 4rem;
	}
	.tour-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.6rem;
	}
	.tour-card {
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
	.tour-card:hover {
		border-color: var(--canopy);
		transform: translateY(-3px);
		box-shadow: 0 12px 30px rgba(22, 36, 31, 0.08);
	}
	.tc-img {
		aspect-ratio: 16/10;
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
	.tc-body {
		padding: 1.5rem 1.6rem 1.6rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.tc-hab {
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
	}
	.tc-tag {
		font-family: var(--display);
		font-style: italic;
		font-size: 17px;
		color: var(--phwa);
		margin-bottom: 0.9rem;
	}
	.tc-blurb {
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
		align-items: flex-end;
		gap: 1rem;
	}
	.tc-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.tc-price {
		font-family: var(--display);
		font-size: 22px;
		color: var(--ink);
		line-height: 1;
	}
	.tc-party {
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--stone);
		letter-spacing: 0.02em;
	}
	.tc-link {
		font-weight: 700;
		font-size: 14px;
		color: var(--canopy);
		white-space: nowrap;
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
	.tc-note {
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--lichen);
		margin-top: 0.9rem;
	}

	@media (max-width: 820px) {
		.tour-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
