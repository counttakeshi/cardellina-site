<script lang="ts">
	import { base } from '$app/paths';
	import { asset } from '$lib/ledger';
	import { tripReports } from '$lib/data/tripReports';

	const HERO = asset('images/tacana-photo-YbNB1ybokJuXrOor-full.webp');

	const fmt = (iso: string) =>
		new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		});
</script>

<svelte:head>
	<title>Birding Trip Reports from Chiapas | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="Reports from trips we've run in Chiapas, with the sites we birded, what we found, and links to the eBird checklists."
	/>
</svelte:head>

<header class="hero" style="--hero-img:url('{HERO}')">
	<div class="wrap hero-inner">
		<h1>Trip reports</h1>
		<p>Where we went, what we found, and the eBird checklists.</p>
	</div>
</header>

<section class="list">
	<div class="wrap">
		<div class="grid">
			{#each tripReports as report (report.slug)}
				<article class="card">
					<div class="c-img">
						<img src={report.hero} alt={report.heroAlt} loading="lazy" />
					</div>
					<div class="c-body">
						<p class="c-when">
							<time datetime={report.published}>{fmt(report.published)}</time>
							<!-- Only when it adds something: for a trip written up the same month,
							     the two read as the same date printed twice. -->
							{#if report.dates !== fmt(report.published)}
								<span class="c-dates">{report.dates}</span>
							{/if}
						</p>
						<h2 class="c-name">
							<!-- Stretched link: whole card clickable, one tab stop. -->
							<a class="stretch" href="{base}/trip-reports/{report.slug}">{report.title}</a>
						</h2>
						<p class="c-sub">{report.subtitle}</p>
						<span class="c-link">Read the report →</span>
					</div>
				</article>
			{/each}
		</div>

		<div class="foot-cta">
			<div>
				<h2>Want a trip like one of these?</h2>
				<p>Tell us which of them appeals, or which birds you're after, and we'll build it.</p>
			</div>
			<a class="btn" href="{base}/trips#personalised">Build your own →</a>
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
			var(--hero-img) center 45%/cover no-repeat;
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
		max-width: 62ch;
	}

	.list {
		padding: 3.5rem 0 4rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.6rem;
	}
	.card {
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
	.stretch {
		text-decoration: none;
		color: inherit;
	}
	.stretch::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
	}
	.card:focus-within {
		border-color: var(--canopy);
		box-shadow: 0 0 0 3px rgba(214, 68, 111, 0.25);
	}
	.card:hover {
		border-color: var(--canopy);
		transform: translateY(-3px);
		box-shadow: 0 12px 30px rgba(22, 36, 31, 0.08);
	}
	.c-img {
		aspect-ratio: 16/10;
		overflow: hidden;
		background: var(--ink);
	}
	.c-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.card:hover .c-img img {
		transform: scale(1.05);
	}
	.c-body {
		padding: 1.4rem 1.6rem 1.6rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.c-when {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		flex-wrap: wrap;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.6rem;
	}
	.c-dates {
		color: var(--lichen);
		text-transform: none;
		letter-spacing: 0.02em;
	}
	.c-name {
		font-family: var(--display);
		font-weight: 500;
		font-size: 26px;
		line-height: 1.1;
		color: var(--ink);
		margin-bottom: 0.5rem;
	}
	.c-sub {
		font-size: 15px;
		color: var(--stone);
		line-height: 1.6;
		margin-bottom: 1.2rem;
	}
	.c-link {
		margin-top: auto;
		font-weight: 700;
		font-size: 14px;
		color: var(--canopy);
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
		align-self: flex-start;
		transition:
			color 0.18s,
			border-color 0.18s;
	}
	.card:hover .c-link {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.foot-cta {
		background: var(--ink);
		color: var(--mist);
		border-radius: 6px;
		padding: 2.2rem 2.4rem;
		margin-top: 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
	}
	.foot-cta h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 24px;
		color: #fff;
		margin-bottom: 0.4rem;
	}
	.foot-cta p {
		font-size: 15px;
		color: rgba(255, 255, 255, 0.7);
		max-width: 46ch;
	}

	@media (max-width: 820px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
