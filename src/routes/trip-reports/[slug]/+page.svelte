<script lang="ts">
	import { base } from '$app/paths';
	import { tripReports } from '$lib/data/tripReports';

	let { data } = $props();
	const report = $derived(data.report);

	// Image sources are stored with an __ASSET__ placeholder because the deploy
	// base is only known at runtime — the same reason every other image on the
	// site goes through asset(). Here the markup is opaque HTML, so the swap
	// happens on the string instead.
	const body = $derived(report.body.replaceAll('__ASSET__', `${base}/`));

	const others = $derived(tripReports.filter((r) => r.slug !== report.slug).slice(0, 2));

	const fmt = (iso: string) =>
		new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		});
</script>

<svelte:head>
	<title>{report.title} — Trip Report | Cardellina - Chiapas Birding Tours</title>
	<meta name="description" content={report.description} />
</svelte:head>

<header class="hero">
	<img class="hero-img" src={report.hero} alt={report.heroAlt} />
	<div class="hero-shade"></div>
	<div class="wrap hero-inner">
		<p class="kicker">Trip report · {report.dates}</p>
		<h1>{report.title}</h1>
		<p class="sub">{report.subtitle}</p>
	</div>
</header>

<div class="wrap page">
	<a class="back" href="{base}/trip-reports">← All trip reports</a>

	<article class="report">
		<p class="published">
			Published <time datetime={report.published}>{fmt(report.published)}</time>
		</p>
		<!-- Transcribed from the original site; its own stylesheet is stripped so it
		     inherits the typography below. -->
		{@html body}
	</article>

	<aside class="after">
		<div class="cta">
			<h2>Fancy this trip?</h2>
			<p>
				Every one of these started as an enquiry much like yours. Tell us how long you have and
				what you'd like to see.
			</p>
			<a class="btn" href="{base}/trips#personalised">Build your own trip →</a>
		</div>

		{#if others.length}
			<div class="more">
				<p class="more-lbl">More reports</p>
				<ul>
					{#each others as other (other.slug)}
						<li>
							<a href="{base}/trip-reports/{other.slug}">
								<span class="m-name">{other.title}</span>
								<span class="m-sub">{other.dates}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</aside>
</div>

<style>
	.hero {
		position: relative;
		min-height: clamp(240px, 30vw, 380px);
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
		object-position: 50% 40%;
	}
	.hero-shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(22, 36, 31, 0.25) 0%,
			rgba(22, 36, 31, 0.35) 40%,
			rgba(22, 36, 31, 0.92) 100%
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
		font-size: clamp(30px, 4.6vw, 48px);
		line-height: 1.04;
		letter-spacing: -0.02em;
		color: #fff;
		margin: 0;
	}
	.sub {
		font-family: var(--display);
		font-style: italic;
		font-size: 19px;
		color: #f2b9cb;
		margin: 0.4rem 0 0;
		max-width: 54ch;
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

	.report {
		max-width: 72ch;
	}
	.published {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		color: var(--lichen);
		padding-bottom: 1.4rem;
		margin-bottom: 1.8rem;
		border-bottom: 1px solid var(--rule);
	}

	/* ── transcribed report body ──────────────────────────────────────────────
	   Svelte scopes styles at compile time and never reaches {@html} content, so
	   every rule here has to be :global, anchored to .report so it cannot leak. */
	.report :global(h2) {
		font-family: var(--display);
		font-weight: 500;
		font-size: 26px;
		line-height: 1.15;
		color: var(--ink);
		margin: 2.6rem 0 0.8rem;
	}
	.report :global(h3) {
		font-family: var(--display);
		font-weight: 500;
		font-size: 20px;
		line-height: 1.2;
		color: var(--ink);
		margin: 2rem 0 0.6rem;
	}
	.report :global(p) {
		font-size: 16.5px;
		line-height: 1.75;
		color: var(--stone);
		margin-bottom: 1.1rem;
	}
	.report :global(strong) {
		color: var(--ink);
		font-weight: 600;
	}
	.report :global(em) {
		font-style: italic;
	}
	.report :global(a) {
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1px solid rgba(47, 74, 60, 0.35);
	}
	.report :global(a:hover) {
		color: var(--phwa);
		border-color: var(--phwa);
	}
	.report :global(ul),
	.report :global(ol) {
		margin: 0 0 1.3rem 0;
		padding-left: 1.4rem;
		color: var(--stone);
		font-size: 16.5px;
		line-height: 1.7;
	}
	.report :global(li) {
		margin-bottom: 0.45rem;
	}
	.report :global(li::marker) {
		color: var(--phwa);
	}
	.report :global(hr) {
		border: 0;
		border-top: 1px solid var(--rule);
		margin: 2.4rem 0;
	}
	.report :global(img) {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 6px;
		margin: 1.8rem 0 0.6rem;
		background: var(--mist);
	}
	.report :global(.cap) {
		font-family: var(--mono);
		font-size: 11.5px;
		line-height: 1.6;
		letter-spacing: 0.02em;
		color: var(--lichen);
		margin-bottom: 2rem;
	}

	/* Species checklists run wider than a phone; each table scrolls on its own
	   rather than forcing the whole page sideways. */
	.report :global(.tw) {
		overflow-x: auto;
		margin: 1.4rem 0 1.8rem;
		border: 1px solid var(--rule);
		border-radius: 5px;
		background: var(--white);
	}
	.report :global(table) {
		border-collapse: collapse;
		width: 100%;
		min-width: 460px;
		font-size: 14.5px;
	}
	.report :global(th) {
		text-align: left;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		font-weight: 500;
		padding: 0.7rem 0.9rem;
		border-bottom: 1px solid var(--rule);
		background: var(--mist);
		white-space: nowrap;
	}
	.report :global(td) {
		padding: 0.55rem 0.9rem;
		border-bottom: 1px solid var(--rule);
		color: var(--stone);
		vertical-align: top;
	}
	.report :global(tbody tr:last-child td) {
		border-bottom: 0;
	}
	.report :global(tbody tr:hover td) {
		background: var(--mist);
	}

	.after {
		max-width: 72ch;
		margin-top: 3.5rem;
	}
	.cta {
		background: var(--ink);
		color: var(--mist);
		border-radius: 6px;
		padding: 2rem 2.2rem;
	}
	.cta h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 24px;
		color: #fff;
		margin-bottom: 0.5rem;
	}
	.cta p {
		font-size: 15px;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 1.4rem;
	}

	.more {
		margin-top: 2.4rem;
	}
	.more-lbl {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.6rem;
	}
	.more ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.more li a {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding: 0.8rem 0;
		border-top: 1px solid var(--rule);
		text-decoration: none;
	}
	.more li:last-child a {
		border-bottom: 1px solid var(--rule);
	}
	.m-name {
		font-family: var(--display);
		font-size: 19px;
		color: var(--ink);
	}
	.more li a:hover .m-name {
		color: var(--phwa);
	}
	.m-sub {
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--stone);
		white-space: nowrap;
	}
</style>
