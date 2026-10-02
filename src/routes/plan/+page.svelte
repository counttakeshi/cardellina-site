<script lang="ts">
	import { asset, imageUrl } from '$lib/ledger';
	import { base } from '$app/paths';
	import RouteIcon from '$lib/components/RouteIcon.svelte';
	import { whatsappLink, CONTACT_EMAIL } from '$lib/config';
	import Seo from '$lib/components/Seo.svelte';
	import { pageTitle, pageDescription, fixedSeo } from '$lib/seo';
	import { crumbsFor } from '$lib/breadcrumbs';
	import { breadcrumbJsonLd } from '$lib/jsonld';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { imageAttrs } from '$lib/imageSize';

	/** Title and description overrides for this page; empty until Ben fills them. */
	const seo = fixedSeo('/plan');

	/**
	 * The fork in the road. Everything that says "plan a trip" lands here rather
	 * than on the enquiry form, because they are not the same request: somebody who
	 * has just read the homepage does not yet know enough about us to fill in a
	 * form, and asking them to is how an enquiry becomes a closed tab.
	 *
	 * Each route gets a picture and one line. The picture carries the difference —
	 * a route across the state, two people birding together, a place — so the words
	 * do not have to, and a card headed "Ask us a question" does not also need a
	 * paragraph explaining what a question is.
	 */
	const HERO = asset(
		'images/feizal-and-valente-birdwatching-at-sumidero-canyon-AE0P0plDJlTR6J5M-full.webp'
	);
	const ASK_IMG = imageUrl('customer-birding-with-sabes-aves-and-valente-A85E1ZjQr2IV3DBy.jpg', 'card');
	const TOURS_IMG = imageUrl('tacana-photo-YbNB1ybokJuXrOor.jpg', 'card');
</script>

<Seo
	jsonLd={[breadcrumbJsonLd(crumbsFor('/plan'))]}
	title={pageTitle(seo.seoTitle, 'Plan a trip | Cardellina - Chiapas Birding Tours')}
	description={pageDescription(seo.metaDescription, 'Build a trip around your own dates and target birds, ask us a question, or browse the day tours and multi-day routes we run in Chiapas.')}
/>

<Breadcrumbs crumbs={crumbsFor('/plan')} />

<header class="hero" style="--hero-img:url('{HERO}')">
	<div class="wrap hero-inner">
		<h1>Plan a trip</h1>
	</div>
</header>

<div class="wrap routes">
	<a class="route lead" href="{base}/trips#personalised">
		<span class="art map"><RouteIcon /></span>
		<span class="txt">
			<span class="r-title">Build your trip</span>
			<span class="r-line">
				Let us know your dates, targets, and explore the map. From there we'll create an itinerary
				together.
			</span>
		</span>
	</a>

	<div class="pair">
		<a class="route" href="{base}/contact">
			<span class="art"><img src={ASK_IMG} {...imageAttrs(ASK_IMG)} alt="A guest birding with one of our guides" loading="lazy" /></span>
			<span class="txt">
				<span class="r-title">Ask us a question</span>
				<span class="r-line">No dates or plan needed.</span>
			</span>
		</a>

		<a class="route" href="{base}/trips">
			<span class="art"><img src={TOURS_IMG} {...imageAttrs(TOURS_IMG)} alt="The Tacaná volcano above cloud forest" loading="lazy" /></span>
			<span class="txt">
				<span class="r-title">Explore our tours</span>
				<span class="r-line">From day trips to a full fortnight.</span>
			</span>
		</a>
	</div>

	<div class="direct">
		<a class="wa" href={whatsappLink()} target="_blank" rel="noopener">
			<svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" aria-hidden="true">
				<path
					d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2z"
				/>
			</svg>
			WhatsApp
		</a>
		<a class="mail" href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>
	</div>
</div>

<style>
	.hero {
		position: relative;
		min-height: clamp(200px, 26vw, 320px);
		display: flex;
		align-items: flex-end;
		background:
			linear-gradient(
				180deg,
				rgba(22, 36, 31, 0.25) 0%,
				rgba(22, 36, 31, 0.3) 45%,
				rgba(22, 36, 31, 0.88) 100%
			),
			var(--hero-img) center 35% / cover no-repeat;
	}
	.hero-inner {
		/* .wrap centres itself with auto margins; as a flex child it would shrink
		   to the width of the heading and take the centring with it. */
		width: 100%;
		padding-block: 2.6rem 2rem;
	}
	.hero h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(34px, 5vw, 54px);
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: #fff;
	}

	.routes {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		padding-block: 3rem 4rem;
	}

	.pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.2rem;
	}

	.route {
		display: flex;
		flex-direction: column;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 10px;
		overflow: hidden;
		text-decoration: none;
		transition:
			border-color 0.18s ease,
			box-shadow 0.18s ease,
			transform 0.18s ease;
	}
	.route:hover {
		border-color: var(--phwa);
		box-shadow: 0 8px 26px rgba(22, 36, 31, 0.08);
		transform: translateY(-2px);
	}
	.route:focus-visible {
		outline: 2px solid var(--phwa);
		outline-offset: 3px;
	}

	.art {
		display: block;
		background: var(--mist);
	}
	.art img {
		display: block;
		width: 100%;
		height: 180px;
		object-fit: cover;
	}

	/* The map is a drawing, not a photograph, so it gets air and a paper ground
	   rather than being cropped to the same band as the two pictures. */
	.art.map {
		display: grid;
		place-items: center;
		background: var(--paper);
		padding: 1.2rem;
		flex-shrink: 0;
	}

	.txt {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 1.3rem 1.5rem 1.5rem;
	}
	.r-title {
		font-family: var(--display);
		font-weight: 400;
		font-size: 25px;
		line-height: 1.15;
		color: var(--ink);
	}
	.r-line {
		font-size: 15.5px;
		line-height: 1.55;
		color: var(--stone);
	}

	/* The lead route reads across rather than down, and is the only card with the
	   pink rule. Size and position are the whole of the emphasis — three cards
	   each shouting in a different colour is the sales page we are avoiding. */
	.route.lead {
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		border-left: 3px solid var(--phwa);
	}
	.route.lead .art.map {
		width: 240px;
		height: 190px;
		padding: 1.4rem 1.2rem;
	}
	.route.lead .txt {
		padding: 1.5rem 2rem 1.5rem 0.5rem;
	}
	.route.lead .r-title {
		font-size: clamp(28px, 3.2vw, 36px);
	}
	.route.lead .r-line {
		font-size: 17px;
	}

	.direct {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.8rem 1.4rem;
		border-top: 1px solid var(--rule);
		margin-top: 1rem;
		padding-top: 2rem;
	}
	.wa {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		background: #25d366;
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 15px;
		padding: 12px 22px;
		border-radius: 3px;
	}
	.wa:hover {
		background: #1eb356;
	}
	.mail {
		font-size: 15px;
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 1px;
	}
	.mail:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	@media (max-width: 860px) {
		.route.lead {
			flex-direction: column;
			align-items: stretch;
		}
		.route.lead .art.map {
			width: 100%;
			height: 170px;
		}
		.route.lead .txt {
			padding: 1.3rem 1.5rem 1.5rem;
		}
	}

	@media (max-width: 680px) {
		.pair {
			grid-template-columns: 1fr;
		}
		.art img {
			height: 160px;
		}
	}
</style>
