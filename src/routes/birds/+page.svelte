<script lang="ts">
	import { base } from '$app/paths';
	import { species, familyOrder, type Species } from '$lib/data/species';
	import {
		TIER_GROUPS,
		ZONES,
		ZONE_ORDER,
		type TierGroupCode,
		type ZoneCode
	} from '$lib/data/taxonomy';
	import HabitatIcon from '$lib/components/HabitatIcon.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { photosFor } from '$lib/ledger';
	import type { TourPhoto } from '$lib/data/tourDetails';

	let query = $state('');
	let activeTiers = $state<TierGroupCode[]>([]);
	/** Mobile only: the filters collapse so the sticky bar stays one row tall. */
	let filtersOpen = $state(false);

	let activeZones = $state<ZoneCode[]>([]);
	let openGallery = $state<string | null>(null);

	const activeCount = $derived(activeTiers.length + activeZones.length);

	// Photos open in two stages. The camera button expands a modest strip in
	// place, so a curious tap doesn't take over the screen; clicking one of those
	// hands off to the same lightbox the tour pages use, at full size and with
	// the photographer credited.
	let lightboxPhotos = $state<TourPhoto[]>([]);
	let lightboxIndex = $state<number | null>(null);

	/**
	 * Photos come from the ledger rather than a list baked into species.ts. The
	 * two had drifted — nine birds had more pictures in the ledger than the
	 * library was showing, the Pink-headed Warbler six against one — and each
	 * photo carries its own photographer, so a species shot by two people credits
	 * both correctly.
	 */
	function shots(bird: Species) {
		return photosFor(bird.commonName);
	}

	function openLightbox(bird: Species, i: number) {
		lightboxPhotos = shots(bird).map((p, n) => ({
			thumb: p.src,
			full: p.src,
			alt: `${bird.commonName}, photo ${n + 1}`,
			caption: bird.commonName,
			credit: p.credit || undefined
		}));
		lightboxIndex = i;
	}

	function toggleTier(code: TierGroupCode) {
		activeTiers = activeTiers.includes(code)
			? activeTiers.filter((t) => t !== code)
			: [...activeTiers, code];
		openGallery = null;
	}

	function toggleZone(code: ZoneCode) {
		activeZones = activeZones.includes(code)
			? activeZones.filter((z) => z !== code)
			: [...activeZones, code];
		openGallery = null;
	}

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return species.filter((s) => {
			const okName =
				!q ||
				s.commonName.toLowerCase().includes(q) ||
				s.scientificName.toLowerCase().includes(q);
			const okTier =
				activeTiers.length === 0 ||
				activeTiers.some((g) => TIER_GROUPS.find((t) => t.code === g)?.tiers.includes(s.tier));
			const okZone = activeZones.length === 0 || s.zones.some((z) => activeZones.includes(z));
			return okName && okTier && okZone;
		});
	});

	// Keep the live site's taxonomic family ordering, dropping families with no matches.
	const grouped = $derived(
		familyOrder
			.map((family) => ({ family, list: filtered.filter((s) => s.family === family) }))
			.filter((g) => g.list.length > 0)
	);
</script>

<svelte:head>
	<title>Birdwatching Guide to Chiapas | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="A working reference to the endemics, near-endemics and specialities of Chiapas, with habitat and elevation. Filter by range or habitat, or search by name."
	/>
</svelte:head>

<div class="wrap masthead">
	<p class="eyebrow">Chiapas Bird Library</p>
	<h1>The birds worth travelling for</h1>
	<!-- The count does the telling. The filters and the search box are visible
	     directly below, so describing them was explaining the furniture. -->
	<p class="intro">
		{species.length} endemics, near-endemics and specialities, with habitat and elevation. Not the
		full state list —
		<a href="https://ebird.org/region/MX-CHP" target="_blank" rel="noopener">eBird</a> has that.
	</p>
</div>

<div class="controls">
	<div class="wrap">
		<input
			class="search"
			type="text"
			placeholder="Search for a bird…"
			aria-label="Search birds"
			bind:value={query}
			oninput={() => (openGallery = null)}
		/>

		<button
			class="filter-toggle"
			aria-expanded={filtersOpen}
			onclick={() => (filtersOpen = !filtersOpen)}
		>
			Filters{#if activeCount}<span class="ft-count">{activeCount}</span>{/if}
			<span class="ft-caret" class:up={filtersOpen}>▾</span>
		</button>

		<div class="filters" class:open={filtersOpen}>
			<div class="chips">
				<span class="lbl">Range</span>
				{#each TIER_GROUPS as tier (tier.code)}
					<button
						class="chip tchip"
						data-tier={tier.code}
						aria-pressed={activeTiers.includes(tier.code)}
						onclick={() => toggleTier(tier.code)}
					>
						{tier.label}
					</button>
				{/each}
			</div>

			<div class="chips">
				<span class="lbl">Habitat</span>
				{#each ZONE_ORDER as zone (zone)}
					<button
						class="chip zchip"
						aria-pressed={activeZones.includes(zone)}
						onclick={() => toggleZone(zone)}
					>
						<HabitatIcon {zone} size={14} />
						{ZONES[zone].chipLabel}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>

<div class="wrap library">
	{#each grouped as group (group.family)}
		<h3 class="fam">{group.family}</h3>
		<div class="fam-list">
			{#each group.list as bird (bird.slug)}
				{@const pics = shots(bird)}
				<div class="sp">
					<div class="sp-main">
						<span class="bn">
							{#if bird.hasAccount}
								<a href="{base}/birds/{bird.slug}">{bird.commonName}</a>
							{:else}
								{bird.commonName}
							{/if}
						</span>
						{#if bird.tierBadge}
							<i class="tier t-{bird.tier}">{bird.tierBadge}</i>
						{/if}
						<span class="bs">{bird.scientificName}</span>
					</div>

					<span class="right">
						{#if pics.length}
							<button
								class="mbtn"
								class:active={openGallery === bird.slug}
								aria-label="Photos of {bird.commonName}"
								aria-expanded={openGallery === bird.slug}
								onclick={() => (openGallery = openGallery === bird.slug ? null : bird.slug)}
							>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
									<path
										d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
									/>
									<circle cx="12" cy="13" r="4" />
								</svg>
								<span class="mbtn-t">
									{#if openGallery === bird.slug}Hide{:else if pics.length > 1}{pics.length}
										photos{:else}Photo{/if}
								</span>
							</button>
						{/if}
						<span class="zones">
							{#each bird.zones as zone (zone)}
								<HabitatIcon {zone} />
							{/each}
						</span>
					</span>
				</div>

				{#if openGallery === bird.slug && pics.length}
					<div class="photo-panel">
						<div class="pp-inner">
							{#each pics as pic, i (pic.src)}
								<figure>
									<button
										class="pp-zoom"
										onclick={() => openLightbox(bird, i)}
										aria-label="View {bird.commonName} full size"
									>
										<img src={pic.src} alt="{bird.commonName} photo {i + 1}" loading="lazy" />
										<span class="pp-hint">Full size ⤡</span>
									</button>
									<figcaption>
										{bird.commonName}
										{#if pic.credit}<span class="pp-credit">photo by {pic.credit}</span>{/if}
									</figcaption>
								</figure>
							{/each}
						</div>
						<button class="pp-close" onclick={() => (openGallery = null)}>× Close</button>
					</div>
				{/if}
			{/each}
		</div>
	{/each}

	{#if grouped.length === 0}
		<p class="noresult">No birds match those filters.</p>
	{/if}

	<div class="foot-cta">
		<div>
			<h2>Want to see some of these?</h2>
			<p>
				Tell us which birds you're after and we'll build a trip around them — or read the
				<a class="cta-link" href="{base}/trip-reports">trip reports</a> to see what turned up, and
				where.
			</p>
		</div>
		<a class="btn" href="{base}/contact">Plan a trip</a>
	</div>
</div>

<Lightbox photos={lightboxPhotos} bind:index={lightboxIndex} />

<style>
	.wrap {
		max-width: 960px;
	}

	.masthead {
		padding: 3.2rem 0 1.6rem;
	}
	.masthead h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(30px, 4.4vw, 46px);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-bottom: 1rem;
	}
	.masthead p.intro {
		font-size: 18px;
		color: var(--stone);
		max-width: 60ch;
	}
	.masthead p.intro a {
		color: var(--canopy);
	}

	/* Desktop shows every filter; the toggle is a mobile affordance only. */
	.filter-toggle {
		display: none;
	}

	.controls {
		position: sticky;
		top: var(--header-h);
		background: var(--paper);
		padding: 1.1rem 0 1rem;
		border-bottom: 1px solid var(--rule);
		z-index: 10;
	}
	.search {
		width: 100%;
		font-family: var(--body);
		font-size: 16px;
		padding: 11px 14px;
		border: 1px solid var(--rule);
		border-radius: 3px;
		background: var(--white);
		margin-bottom: 0.9rem;
	}
	.search:focus {
		outline: none;
		border-color: var(--phwa);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		align-items: center;
		margin-bottom: 0.55rem;
	}
	.chips:last-child {
		margin-bottom: 0;
	}
	.chips .lbl {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--stone);
		margin-right: 0.3rem;
		min-width: 56px;
	}
	.chip {
		font-family: var(--body);
		font-size: 12px;
		padding: 6px 11px;
		border: 1px solid var(--rule);
		background: var(--white);
		border-radius: 2px;
		cursor: pointer;
		color: var(--canopy);
		display: inline-flex;
		align-items: center;
		gap: 6px;
		transition: all 0.14s;
	}
	.chip.tchip {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
	}
	.chip[aria-pressed='true'] {
		background: var(--ink);
		color: #fff;
		border-color: var(--ink);
	}
	.tchip[data-tier='mx'][aria-pressed='true'] {
		background: #b8305a;
		border-color: #b8305a;
		color: #fff;
	}
	.tchip[data-tier='wmx'][aria-pressed='true'] {
		background: #9c5a16;
		border-color: #9c5a16;
		color: #fff;
	}
	.tchip[data-tier='nca'][aria-pressed='true'] {
		background: var(--canopy);
		border-color: var(--canopy);
		color: #fff;
	}
	.tchip[data-tier='mxca'][aria-pressed='true'] {
		background: var(--stone);
		border-color: var(--stone);
		color: #fff;
	}
	.tchip[data-tier='wide'][aria-pressed='true'] {
		background: #8a94a6;
		border-color: #8a94a6;
		color: #fff;
	}

	.library {
		padding: 1.5rem 0 3rem;
	}
	.fam {
		font-family: var(--display);
		font-weight: 500;
		font-size: 15px;
		color: var(--phwa);
		letter-spacing: 0.02em;
		text-transform: uppercase;
		margin: 2rem 0 0.2rem;
		padding-bottom: 0.4rem;
	}
	.fam-list {
		display: flex;
		flex-direction: column;
	}
	.sp {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding: 0.6rem 0;
		border-top: 1px solid var(--rule);
	}
	.sp-main {
		display: flex;
		align-items: baseline;
		gap: 9px;
		flex-wrap: wrap;
	}
	.bn {
		font-size: 16px;
	}
	.bn a {
		text-decoration: none;
		border-bottom: 1.5px solid var(--phwa);
		padding-bottom: 1px;
	}
	.bn a:hover {
		color: var(--phwa);
	}
	.right {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		flex-shrink: 0;
	}
	.zones {
		display: flex;
		gap: 5px;
		align-items: center;
		flex-shrink: 0;
	}
	/* A bare icon in a circle read as decoration next to the habitat icons, which
	   are genuinely non-interactive. Labelling it and tinting it with the accent
	   colour makes it the one thing in the row that looks like a control. */
	.mbtn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 9px 3px 7px;
		border-radius: 999px;
		border: 1px solid rgba(214, 68, 111, 0.4);
		background: rgba(214, 68, 111, 0.07);
		color: var(--phwa);
		cursor: pointer;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.04em;
		white-space: nowrap;
		transition:
			background 0.13s,
			border-color 0.13s,
			color 0.13s;
	}
	.mbtn:hover,
	.mbtn.active {
		background: var(--phwa);
		color: #fff;
		border-color: var(--phwa);
	}
	.mbtn svg {
		width: 13px;
		height: 13px;
		flex-shrink: 0;
	}
	.mbtn-t {
		line-height: 1;
	}
	.bs {
		font-family: var(--mono);
		font-size: 11px;
		font-style: italic;
		color: var(--stone);
	}
	.tier {
		font-family: var(--mono);
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.06em;
		padding: 2px 5px;
		border-radius: 2px;
		border: 1px solid;
		white-space: nowrap;
	}
	.t-mx {
		color: #b8305a;
		border-color: rgba(214, 68, 111, 0.4);
		background: rgba(214, 68, 111, 0.06);
	}
	.t-wmx {
		color: #9c5a16;
		border-color: rgba(168, 118, 47, 0.4);
		background: rgba(168, 118, 47, 0.08);
	}
	.t-nca {
		color: var(--canopy);
		border-color: rgba(47, 74, 60, 0.35);
		background: rgba(47, 74, 60, 0.06);
	}
	.noresult {
		padding: 2rem 0;
		color: var(--stone);
		font-style: italic;
	}

	/* inline photo panel — expands under the row rather than as an overlay */
	.photo-panel {
		padding: 0.4rem 0 1.1rem;
	}
	.pp-inner {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		align-items: flex-start;
	}
	.photo-panel figure {
		margin: 0;
		position: relative;
	}
	/* Stage one stays deliberately small — enough to recognise the bird, not so
	   big that expanding a row shoves the rest of the family off screen. */
	.pp-zoom {
		display: block;
		position: relative;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		border-radius: 6px;
		overflow: hidden;
	}
	.photo-panel img {
		max-height: 230px;
		max-width: 100%;
		width: auto;
		height: auto;
		display: block;
		background: var(--mist);
	}
	.pp-hint {
		position: absolute;
		right: 6px;
		bottom: 6px;
		font-family: var(--mono);
		font-size: 9.5px;
		letter-spacing: 0.05em;
		color: #fff;
		background: rgba(12, 20, 17, 0.6);
		border-radius: 3px;
		padding: 3px 6px;
		opacity: 0;
		transition: opacity 0.16s ease;
	}
	.pp-zoom:hover .pp-hint,
	.pp-zoom:focus-visible .pp-hint {
		opacity: 1;
	}
	.photo-panel figcaption {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--stone);
		margin-top: 5px;
		letter-spacing: 0.02em;
		max-width: 30ch;
		line-height: 1.5;
	}
	.pp-credit {
		display: block;
		color: var(--lichen);
	}
	.pp-close {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-top: 0.7rem;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--stone);
		background: none;
		border: 0;
		cursor: pointer;
		padding: 0;
	}
	.pp-close:hover {
		color: var(--phwa);
	}

	.foot-cta {
		background: var(--ink);
		color: var(--mist);
		border-radius: 6px;
		padding: 2.2rem 2.4rem;
		margin-top: 2.5rem;
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
	.cta-link {
		color: #fff;
		text-decoration: none;
		border-bottom: 1px solid var(--phwa);
	}
	.cta-link:hover {
		color: var(--phwa);
	}

	@media (max-width: 600px) {
		.sp {
			flex-direction: column;
			gap: 0.4rem;
		}
		.right {
			gap: 0.6rem;
		}

		/* The masthead and a two-row filter bar were together taller than the
		   viewport's reading area, so scrolling the list showed three or four birds
		   at a time. The heading tightens, and the filters fold behind a button so
		   the sticky bar stays one row deep. */
		.masthead {
			padding: 1.8rem 0 1rem;
		}
		.masthead h1 {
			margin-bottom: 0.6rem;
		}
		.masthead p.intro {
			font-size: 15.5px;
			line-height: 1.55;
		}
		.controls {
			padding: 0.7rem 0;
		}
		.search {
			font-size: 16px;
			padding: 9px 12px;
			margin-bottom: 0;
		}
		.filter-toggle {
			display: inline-flex;
			align-items: center;
			gap: 7px;
			margin-top: 0.6rem;
			padding: 6px 11px;
			font-family: var(--mono);
			font-size: 11px;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			color: var(--canopy);
			background: var(--white);
			border: 1px solid var(--rule);
			border-radius: 3px;
			cursor: pointer;
		}
		.ft-count {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: 16px;
			height: 16px;
			padding: 0 4px;
			border-radius: 999px;
			background: var(--phwa);
			color: #fff;
			font-size: 10px;
		}
		.ft-caret {
			transition: transform 0.15s ease;
		}
		.ft-caret.up {
			transform: rotate(180deg);
		}
		.filters {
			display: none;
			padding-top: 0.7rem;
		}
		.filters.open {
			display: block;
		}
		.chips .lbl {
			min-width: 0;
			width: 100%;
			margin-bottom: 0.15rem;
		}
	}
</style>
