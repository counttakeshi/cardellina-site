<script lang="ts">
	import { asset } from '$lib/ledger';
	import { base } from '$app/paths';
	import { dayTours, multiDayTrips } from '$lib/data/trips';
	import SiteMap from '$lib/components/SiteMap.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { EBIRD_TARGETS } from '$lib/config';

	const HERO = asset('images/dscn5960-AGB2B6qXevFLZNPP-full.webp');

	type Panel = 'day' | 'multi-day' | 'personalised';

	const PANELS: { id: Panel; label: string; blurb: string }[] = [
		{ id: 'day', label: 'Day tours', blurb: 'One morning out, from the highlands to the coast' },
		{
			id: 'multi-day',
			label: 'Multi-day',
			blurb: 'Routes we know well, three days to a full expedition'
		},
		{ id: 'personalised', label: 'Build your own', blurb: 'Tell us the shape and we plan it' }
	];

	let panel = $state<Panel>('day');

	// The page is prerendered, so the open panel cannot come from a query string:
	// SvelteKit rejects searchParams during prerendering, because one HTML file
	// has to serve every URL. A hash never reaches the server, so it is safe.
	function panelFromHash(hash: string): Panel | null {
		const id = hash.replace(/^#/, '');
		return PANELS.some((p) => p.id === id) ? (id as Panel) : null;
	}

	$effect(() => {
		const sync = () => {
			const found = panelFromHash(window.location.hash);
			if (found) panel = found;
		};
		sync();
		window.addEventListener('hashchange', sync);
		return () => window.removeEventListener('hashchange', sync);
	});

	function show(id: Panel) {
		panel = id;
		// replaceState rather than assigning location.hash, which would also jump.
		history.replaceState(null, '', `#${id}`);
	}

	// ── the builder ───────────────────────────────────────────────────────────
	const DURATIONS = [
		'A single day',
		'2–3 days',
		'4–7 days',
		'8–14 days',
		'Longer than two weeks',
		'Not sure yet'
	];

	let duration = $state('');
	let startDate = $state('');
	let targets = $state('');
	// Filled from the map: sites added to the itinerary, birds added to the list.
	let pickedSites = $state<string[]>([]);
	let pickedBirds = $state<string[]>([]);

	const answered = $derived(
		[duration, startDate, targets].filter((v) => v.trim() !== '').length +
			pickedSites.length +
			pickedBirds.length
	);
</script>

<svelte:head>
	<title>Birding Tours in Chiapas | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="Day tours, multi-day routes, and trips built from scratch around your target birds, across the whole of Chiapas."
	/>
</svelte:head>

<header class="hero" style="--hero-img:url('{HERO}')">
	<div class="wrap hero-inner">
		<h1>Trips</h1>
		<p>A morning out, a fortnight across the state, or something built around your list.</p>
	</div>
</header>

<div class="wrap">
	<nav class="tabs" aria-label="Kinds of trip">
		{#each PANELS as p (p.id)}
			<!-- The id makes #day a real anchor, so the link scrolls to the tab strip
			     as well as opening the panel — and the prerenderer can verify it. -->
			<button id={p.id} class="tab" class:on={panel === p.id} onclick={() => show(p.id)}>
				<span class="t-label">{p.label}</span>
				<span class="t-blurb">{p.blurb}</span>
			</button>
		{/each}
	</nav>
</div>

{#if panel === 'day'}
	<section class="panel">
		<div class="wrap">
			<div class="grid">
				{#each dayTours as tour (tour.slug)}
					<article class="card">
						<div class="c-img"><img src={tour.image} alt={tour.name} loading="lazy" /></div>
						<div class="c-body">
							<p class="c-kicker">{tour.habitat}</p>
							<h3 class="c-name">
								<a class="stretch" href="{base}/trips/{tour.slug}">{tour.name}</a>
							</h3>
							<p class="c-tag">{tour.tagline}</p>
							<p class="c-blurb">{tour.blurb}</p>
							<p class="c-birds">{tour.birds.join(' · ')}</p>
							<div class="c-foot">
								<div class="c-meta">
									<span class="c-price">{tour.priceUsd} USD</span>
									<span class="c-party">{tour.party}</span>
								</div>
								<span class="c-link">See the tour →</span>
							</div>
							{#if tour.note}<span class="c-note">{tour.note}</span>{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
{:else if panel === 'multi-day'}
	<section class="panel">
		<div class="wrap">
			<div class="grid">
				{#each multiDayTrips as trip (trip.slug)}
					<article class="card">
						<div class="c-img">
							<img src={trip.image} alt={trip.name} loading="lazy" />
							<span class="c-days">{trip.days}</span>
						</div>
						<div class="c-body">
							<p class="c-kicker">{trip.theme}</p>
							<h3 class="c-name">
								<a class="stretch" href="{base}/trips/{trip.slug}">{trip.name}</a>
							</h3>
							<p class="c-blurb">{trip.summary}</p>
							<p class="c-birds">{trip.birds.join(' · ')}</p>
							<div class="c-foot">
								<span class="c-link">See the itinerary →</span>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<p class="panel-foot">
				None of these quite right?
				<button class="inline-link" onclick={() => show('personalised')}>Build your own →</button>
			</p>
		</div>
	</section>
{:else}
	<section class="panel">
		<div class="wrap">
			<div class="build">
				<div class="q">
					<h3><span class="qn">1</span> How long do you have?</h3>
					<div class="chips">
						{#each DURATIONS as d (d)}
							<button
								class="chip"
								class:on={duration === d}
								onclick={() => (duration = duration === d ? '' : d)}
							>
								{d}
							</button>
						{/each}
					</div>
				</div>

				<div class="q">
					<h3><span class="qn">2</span> When might you come?</h3>
					<input
						class="txt"
						type="text"
						bind:value={startDate}
						placeholder="e.g. March 2027, or sometime next winter"
						aria-label="Possible start date"
					/>
				</div>

				<div class="q">
					<h3><span class="qn">3</span> Which birds are you after?</h3>
					<textarea
						class="txt"
						rows="4"
						bind:value={targets}
						placeholder="Horned Guan, Pink-headed Warbler, anything endemic…"
						aria-label="Target birds"
					></textarea>
					<a class="ebird" href={EBIRD_TARGETS} target="_blank" rel="noopener">
						Build a Chiapas target list on eBird →
					</a>
				</div>

				<div class="q">
					<h3><span class="qn">4</span> Anywhere you already want to go?</h3>
					<SiteMap inForm bind:pickedSites bind:pickedBirds />

					{#if pickedSites.length || pickedBirds.length}
						<div class="picked">
							{#if pickedSites.length}
								<div class="pk-row">
									<span class="pk-lbl">Itinerary</span>
									<div class="pk-chips">
										{#each pickedSites as site (site)}
											<button
												class="pk"
												onclick={() => (pickedSites = pickedSites.filter((s) => s !== site))}
											>
												{site}<span class="pk-x">×</span>
											</button>
										{/each}
									</div>
								</div>
							{/if}
							{#if pickedBirds.length}
								<div class="pk-row">
									<span class="pk-lbl">Birds</span>
									<div class="pk-chips">
										{#each pickedBirds as bird (bird)}
											<button
												class="pk"
												onclick={() => (pickedBirds = pickedBirds.filter((b) => b !== bird))}
											>
												{bird}<span class="pk-x">×</span>
											</button>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>

			<div class="handoff">
				<div class="ho-head">
					<h2>Send it over</h2>
					{#if answered > 0}
						<p class="ho-sum">
							Coming with your message:
							{#if duration}<b>{duration}</b>{/if}
							{#if startDate}<b>{startDate}</b>{/if}
							{#if targets}<b>your target birds</b>{/if}
							{#if pickedSites.length}
								<b>{pickedSites.length} site{pickedSites.length === 1 ? '' : 's'}</b>
							{/if}
							{#if pickedBirds.length}
								<b>{pickedBirds.length} bird{pickedBirds.length === 1 ? '' : 's'}</b>
							{/if}
						</p>
					{:else}
						<p class="ho-sum muted">
							Nothing filled in above yet — that's fine, tell us in the message instead.
						</p>
					{/if}
				</div>
				<ContactForm
					kind="personalised"
					prefill={{
						'Trip length': duration,
						'Possible dates': startDate,
						'Target birds': targets,
						'Sites chosen on the map': pickedSites.join(', '),
						'Birds chosen on the map': pickedBirds.join(', ')
					}}
				/>
			</div>
		</div>
	</section>
{/if}

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
			/* Original crop used gravity 0.8x0.2; centring cut the trogon's head off. */
			var(--hero-img) 80% 20%/cover no-repeat;
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

	/* Three real choices rather than a row of words: each tab carries the line
	   that tells you whether it is the one you want. */
	.tabs {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.8rem;
		margin-top: 2.2rem;
	}
	.tab {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: left;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 5px;
		padding: 0.9rem 1.1rem;
		cursor: pointer;
		transition:
			border-color 0.16s,
			background 0.16s;
	}
	.tab:hover {
		border-color: var(--canopy);
	}
	.tab.on {
		background: var(--ink);
		border-color: var(--ink);
	}
	.t-label {
		font-family: var(--display);
		font-size: 19px;
		color: var(--ink);
		line-height: 1.15;
	}
	.tab.on .t-label {
		color: #fff;
	}
	.t-blurb {
		font-size: 13px;
		line-height: 1.45;
		color: var(--stone);
	}
	.tab.on .t-blurb {
		color: rgba(255, 255, 255, 0.66);
	}

	.panel {
		padding: 2.8rem 0 4rem;
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
	/* One anchor stretched over the card: whole-card click, single tab stop. */
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
		position: relative;
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
	.c-days {
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
	.c-body {
		padding: 1.5rem 1.6rem 1.6rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.c-kicker {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.6rem;
	}
	.c-name {
		font-family: var(--display);
		font-weight: 500;
		font-size: 26px;
		line-height: 1.1;
		color: var(--ink);
	}
	.c-tag {
		font-family: var(--display);
		font-style: italic;
		font-size: 17px;
		color: var(--phwa);
		margin-bottom: 0.9rem;
	}
	.c-blurb {
		font-size: 15px;
		color: var(--stone);
		line-height: 1.6;
		margin: 0.7rem 0 1rem;
	}
	.c-birds {
		font-size: 13px;
		color: var(--canopy);
		line-height: 1.55;
		padding: 0.8rem 0;
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		margin-bottom: 1.1rem;
	}
	.c-foot {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.c-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.c-price {
		font-family: var(--display);
		font-size: 22px;
		color: var(--ink);
		line-height: 1;
	}
	.c-party {
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--stone);
	}
	.c-link {
		font-weight: 700;
		font-size: 14px;
		color: var(--canopy);
		white-space: nowrap;
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
		transition:
			color 0.18s,
			border-color 0.18s;
	}
	.card:hover .c-link {
		color: var(--phwa);
		border-color: var(--phwa);
	}
	.c-note {
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--lichen);
		margin-top: 0.9rem;
	}

	.panel-foot {
		margin-top: 2rem;
		font-size: 15.5px;
		color: var(--stone);
	}
	.inline-link {
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		font-weight: 700;
		color: var(--canopy);
		border-bottom: 1.5px solid var(--canopy);
		cursor: pointer;
	}
	.inline-link:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	/* ── builder ── */
	.build {
		display: flex;
		flex-direction: column;
		gap: 2.8rem;
	}
	.q h3 {
		font-family: var(--display);
		font-weight: 500;
		font-size: 22px;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		margin-bottom: 0.9rem;
	}
	.qn {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--phwa);
		border: 1px solid rgba(214, 68, 111, 0.4);
		border-radius: 50%;
		width: 24px;
		height: 24px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.chip {
		font-size: 14px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		padding: 8px 14px;
		color: var(--canopy);
		cursor: pointer;
		transition:
			background 0.14s,
			border-color 0.14s,
			color 0.14s;
	}
	.chip:hover {
		border-color: var(--canopy);
	}
	.chip.on {
		background: var(--ink);
		border-color: var(--ink);
		color: #fff;
	}
	.txt {
		/* Inputs and textareas are inline-level by default, so the eBird link below
		   flowed up beside the box instead of under it. */
		display: block;
		width: 100%;
		max-width: 620px;
		font-family: var(--body);
		font-size: 15px;
		padding: 0.75rem 0.9rem;
		border: 1px solid var(--rule);
		border-radius: 4px;
		background: var(--white);
		color: var(--ink);
	}
	.txt:focus {
		outline: 2px solid var(--phwa);
		outline-offset: 1px;
		border-color: transparent;
	}
	textarea.txt {
		resize: vertical;
	}
	.ebird {
		display: inline-block;
		margin-top: 0.9rem;
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.03em;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 2px;
	}
	.ebird:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	/* What the map has added so far, kept in view while you carry on choosing —
	   and removable here, since going back to find the site again to un-add it
	   would be the long way round. */
	.picked {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		margin-top: 1.2rem;
		padding: 1rem 1.1rem;
		border: 1px solid var(--rule);
		border-radius: 5px;
		background: var(--white);
	}
	.pk-row {
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		flex-wrap: wrap;
	}
	.pk-lbl {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--stone);
		min-width: 62px;
	}
	.pk-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.pk {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-family: var(--body);
		font-size: 13px;
		background: var(--mist);
		border: 1px solid var(--rule);
		border-radius: 3px;
		padding: 4px 9px;
		color: var(--ink);
		cursor: pointer;
	}
	.pk:hover {
		border-color: var(--phwa);
		color: var(--phwa);
	}
	.pk-x {
		color: var(--stone);
		font-size: 14px;
		line-height: 1;
	}
	.pk:hover .pk-x {
		color: var(--phwa);
	}

	.handoff {
		margin-top: 3.5rem;
		padding-top: 2.5rem;
		border-top: 1px solid var(--rule);
	}
	.ho-head h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 30px;
		margin-bottom: 0.5rem;
	}
	.ho-sum {
		font-size: 15px;
		color: var(--stone);
		margin-bottom: 1.8rem;
	}
	.ho-sum b {
		color: var(--ink);
		font-weight: 400;
		background: var(--mist);
		border-radius: 3px;
		padding: 2px 8px;
		margin-right: 4px;
		display: inline-block;
	}
	.ho-sum.muted {
		font-style: italic;
	}

	@media (max-width: 820px) {
		.tabs {
			grid-template-columns: 1fr;
			gap: 0.6rem;
		}
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
