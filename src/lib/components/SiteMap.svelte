<script lang="ts">
	import { base } from '$app/paths';
	import { sites, mapBirds, MAP_VIEWBOX, TIER_LABELS, type Site } from '$lib/data/sites';
	import mapBase from './map-base.svg?raw';

	type Mode = 'site' | 'species';

	/**
	 * `compact` is the homepage taster: site mode only, a shorter bird list, and a
	 * link through to the full explorer. Same data and same map, less machinery.
	 *
	 * `inForm` is for the trip builder, where the map sits above an enquiry form
	 * the reader is already filling in. The site card's call to action would send
	 * them to a second, emptier form and lose their answers, so it is dropped.
	 */
	let { compact = false, inForm = false }: { compact?: boolean; inForm?: boolean } = $props();

	/** How many birds to list in the card before linking on. */
	const BIRD_LIMIT = $derived(compact ? 10 : Infinity);

	let mode = $state<Mode>('site');
	let selectedSiteId = $state<string | null>(null);
	let selectedBird = $state<string | null>(null);
	let birdQuery = $state('');
	let cardEl = $state<HTMLElement | null>(null);

	/**
	 * Habitat key. The map draws six colours — coast and wetland share one — so
	 * this is stated explicitly rather than derived from the seven habitat codes.
	 */
	const LEGEND = [
		{ color: '#2E6E52', label: 'Cloud forest' },
		{ color: '#6E8B4A', label: 'Pine-oak' },
		{ color: '#3E8C7E', label: 'Pacific slope' },
		{ color: '#1E6E5A', label: 'Rainforest' },
		{ color: '#B08033', label: 'Thorn forest' },
		{ color: '#4E7A9B', label: 'Coast & wetland' }
	];

	const selectedSite = $derived(sites.find((s) => s.id === selectedSiteId) ?? null);
	const activeBird = $derived(mapBirds.find((b) => b.name === selectedBird) ?? null);

	const birdMatches = $derived.by(() => {
		const q = birdQuery.trim().toLowerCase();
		if (!q) return [];
		return mapBirds.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 10);
	});

	const highlighted = $derived.by(() => {
		if (mode === 'species') return new Set(activeBird?.sites ?? []);
		return new Set(selectedSiteId ? [selectedSiteId] : []);
	});

	/** Sites grouped by habitat colour, so the side list doubles as the key. */
	const grouped = $derived(
		LEGEND.map((l) => ({
			...l,
			sites: sites.filter((s) => s.zoneColor === l.color).sort((a, b) => a.name.localeCompare(b.name))
		})).filter((g) => g.sites.length)
	);

	function pickSite(site: Site) {
		selectedSiteId = selectedSiteId === site.id ? null : site.id;
		// On a narrow screen the card is below the fold; bring it into view.
		if (selectedSiteId && window.matchMedia('(max-width: 900px)').matches) {
			requestAnimationFrame(() => cardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
		}
	}

	function pickBird(name: string) {
		selectedBird = name;
		birdQuery = name;
	}

	function setMode(next: Mode) {
		mode = next;
		selectedSiteId = null;
		selectedBird = null;
		birdQuery = '';
	}
</script>

<div class="explorer" class:compact>
	{#if !compact}
		<div class="modebar" role="tablist" aria-label="How to explore the map">
			<button
				class="mode"
				role="tab"
				aria-selected={mode === 'site'}
				onclick={() => setMode('site')}
			>
				Explore by site
			</button>
			<button
				class="mode"
				role="tab"
				aria-selected={mode === 'species'}
				onclick={() => setMode('species')}
			>
				Find by species
			</button>
		</div>
	{/if}

	<div class="grid">
		<div class="map-panel">
			<p class="hint">
				<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" /></svg>
				{#if mode === 'site'}
					Tap any coloured dot to see the birds at that site.
				{:else}
					Search for a bird below — the map lights up where we find it.
				{/if}
			</p>

			<div class="map-wrap">
				<svg
					class="cmap"
					viewBox={MAP_VIEWBOX}
					role="img"
					aria-label="Map of birding sites across Chiapas"
				>
					{@html mapBase}

					{#each sites as site (site.id)}
						{@const on = highlighted.has(site.id)}
						{@const dim = highlighted.size > 0 && !on}
						<!-- svelte-ignore a11y_no_noninteractive_tabindex -- role/tabindex are only set in site mode -->
						<g
							class="pin"
							class:on
							class:dim
							role={mode === 'site' ? 'button' : 'img'}
							tabindex={mode === 'site' ? 0 : -1}
							aria-label={site.name}
							aria-pressed={mode === 'site' ? on : undefined}
							onclick={() => pickSite(site)}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && pickSite(site)}
						>
							<circle class="pin-hit" cx={site.x} cy={site.y} r="18" fill="transparent" />
							<circle class="pin-ring" cx={site.x} cy={site.y} r="11" />
							<circle class="pin-dot" cx={site.x} cy={site.y} r="7" style="--pc:{site.zoneColor}" />
							<text class="pin-label" x={site.x} y={site.y - 14} text-anchor="middle">
								{site.name}
							</text>
						</g>
					{/each}
				</svg>
			</div>

			<div class="map-legend">
				{#each LEGEND as l (l.color)}
					<span><span class="dot" style="background:{l.color}"></span>{l.label}</span>
				{/each}
			</div>
		</div>

		<div class="detail" bind:this={cardEl}>
			{#if mode === 'species'}
				<div class="birdsearch">
					<label for="sp-search">Search for a bird</label>
					<input
						id="sp-search"
						type="text"
						placeholder="e.g. Resplendent Quetzal"
						bind:value={birdQuery}
						oninput={() => (selectedBird = null)}
					/>
					{#if birdMatches.length && !selectedBird}
						<ul class="suggest">
							{#each birdMatches as b (b.name)}
								<li>
									<button onclick={() => pickBird(b.name)}>
										{b.name}
										{#if b.tier}<i class="bt">{TIER_LABELS[b.tier]}</i>{/if}
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>

				{#if activeBird}
					<div class="site-card">
						<div class="sc-hab">Found at {activeBird.sites.length} of our sites</div>
						<h3 class="sc-name">
							{activeBird.name}{#if activeBird.tier}<i class="bt">{TIER_LABELS[activeBird.tier]}</i
								>{/if}
						</h3>
						<ul class="sc-sites">
							{#each activeBird.sites as id (id)}
								{@const s = sites.find((x) => x.id === id)}
								{#if s}
									<li>
										<button onclick={() => (mode = 'site') || pickSite(s)}>
											<span class="dot" style="background:{s.zoneColor}"></span>
											<span>
												<b>{s.name}</b>
												<em>{s.habitat}</em>
											</span>
										</button>
									</li>
								{/if}
							{/each}
						</ul>
					</div>
				{:else if birdQuery.trim() && !birdMatches.length}
					<p class="placeholder">No bird of that name in our site lists.</p>
				{/if}
			{:else if selectedSite}
				<div class="site-card">
					<div class="sc-hab">
						<span class="sc-hdot" style="background:{selectedSite.zoneColor}"></span>
						{selectedSite.habitat}
					</div>
					<h3 class="sc-name">{selectedSite.name}</h3>
					<div class="sc-elev">{selectedSite.elev} m</div>
					<p class="sc-blurb">{selectedSite.blurb}</p>
					<div class="sc-birds-lbl">Birds here</div>
					<div class="sc-birds">
						{#each selectedSite.birds.slice(0, BIRD_LIMIT) as bird (bird.name)}
							<span
								class="bird"
								class:tier-nca={bird.tier === 'nca'}
								class:tier-mx={bird.tier === 'mx'}
								class:tier-wmx={bird.tier === 'wmx'}
							>
								{bird.name}{#if bird.tier}<i class="bt">{TIER_LABELS[bird.tier]}</i>{/if}
							</span>
						{/each}
						{#if selectedSite.birds.length > BIRD_LIMIT}
							<span class="bird more">+{selectedSite.birds.length - BIRD_LIMIT} more</span>
						{/if}
					</div>
					<div class="sc-foot">
						{#if compact}
							<a class="btn" href="{base}/trips#personalised">See the full map</a>
						{:else if !inForm}
							<a class="btn" href="{base}/contact">Ask about birding here</a>
						{/if}
						<button class="clear" onclick={() => (selectedSiteId = null)}>Back to all sites</button>
					</div>
				</div>
			{:else}
				<!-- Rather than an empty box, the default state lists every site. It fills
				     the column, teaches the colour key, and gives a way in that does not
				     depend on spotting that the dots are clickable. -->
				<div class="sitelist">
					<p class="sl-lead">Or pick a site from the list:</p>
					{#if compact}
						<!-- Wraps horizontally under the map rather than forming a tall
						     column, which on the homepage ran far past the map itself. -->
						<div class="sl-chips">
							{#each sites as s (s.id)}
								<button onclick={() => pickSite(s)}>
									<span class="dot" style="background:{s.zoneColor}"></span>{s.name}
								</button>
							{/each}
						</div>
					{:else}
						{#each grouped as group (group.color)}
							<div class="sl-group">
								<div class="sl-head">
									<span class="dot" style="background:{group.color}"></span>{group.label}
								</div>
								<ul>
									{#each group.sites as s (s.id)}
										<li>
											<button onclick={() => pickSite(s)}>
												{s.name}<span class="sl-elev">{s.elev} m</span>
											</button>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* ── Mode switch ── */
	.modebar {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.6rem;
		flex-wrap: wrap;
	}
	.mode {
		font-family: var(--mono);
		font-size: 12px;
		padding: 10px 18px;
		border: 1px solid var(--rule);
		background: var(--white);
		border-radius: 2px;
		cursor: pointer;
		color: var(--stone);
		transition:
			background 0.15s,
			color 0.15s,
			border-color 0.15s;
	}
	.mode:hover {
		border-color: var(--canopy);
		color: var(--canopy);
	}
	.mode[aria-selected='true'] {
		background: var(--ink);
		color: #fff;
		border-color: var(--ink);
	}

	.grid {
		display: grid;
		grid-template-columns: 1.45fr 1fr;
		gap: 2rem;
		align-items: start;
	}

	.map-panel {
		position: sticky;
		top: calc(var(--header-h) + 1rem);
	}

	/* ── Instruction ── */
	.hint {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 14.5px;
		color: var(--canopy);
		margin: 0 0 0.7rem;
	}
	.hint svg {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		fill: var(--phwa);
		stroke: #fff;
		stroke-width: 2;
	}

	/* The soft gradient card the map sits on — this is what made the original
	   read as a map rather than a diagram floating on the page. */
	.map-wrap {
		background: linear-gradient(170deg, #e8efe9, #d7e2da);
		border: 1px solid var(--rule);
		border-radius: 8px;
		padding: 0.4rem;
	}
	/* Cap the height so the whole map stays on screen alongside the header —
	   at full width the 760x660 viewBox was taller than a laptop viewport. */
	.cmap {
		width: 100%;
		height: auto;
		max-height: min(58vh, 520px);
		display: block;
	}

	/* Base-map graphics. The SVG is injected with {@html}, and Svelte scopes
	   styles at compile time, so these must be :global to reach it. */
	.cmap :global(.neighbour) {
		fill: #e6e6de;
		stroke: #fff;
		stroke-width: 1;
		opacity: 0.7;
	}
	.cmap :global(.state-fill) {
		fill: #cbd8c7;
	}
	.cmap :global(.state-line) {
		fill: none;
		stroke: #fff;
		stroke-width: 1.8;
	}
	.cmap :global(.roads .road),
	.cmap :global(.roads .road-curve) {
		stroke: #b98a6a;
		stroke-width: 1.6;
		stroke-dasharray: 2 3;
		opacity: 0.75;
		fill: none;
	}
	.cmap :global(.sea) {
		font-family: var(--display);
		font-style: italic;
		font-size: 13px;
		fill: #9bb0bc;
	}
	.cmap :global(.nlabel) {
		font-family: var(--mono);
		font-size: 10px;
		fill: #a9a98f;
		letter-spacing: 0.12em;
	}
	.cmap :global(.glabel) {
		font-family: var(--mono);
		font-size: 11px;
		fill: #a9a98f;
		letter-spacing: 0.14em;
	}
	.cmap :global(.air-label) {
		font-family: var(--mono);
		font-size: 9.5px;
		fill: var(--stone);
		letter-spacing: 0.06em;
	}

	/* ── Pins ── */
	.pin {
		cursor: pointer;
		transition: opacity 0.18s ease;
	}
	/* A permanent white ring so the dots read as buttons rather than decoration. */
	.pin-ring {
		fill: rgba(255, 255, 255, 0.55);
		stroke: rgba(255, 255, 255, 0.9);
		stroke-width: 1;
		transition: r 0.16s ease;
	}
	.pin-dot {
		fill: var(--pc);
		stroke: #fff;
		stroke-width: 2;
		transition: r 0.16s ease;
	}
	.pin:hover .pin-dot,
	.pin:focus-visible .pin-dot,
	.pin.on .pin-dot {
		r: 10;
	}
	.pin:hover .pin-ring,
	.pin.on .pin-ring {
		r: 14;
	}
	.pin.on .pin-dot {
		fill: var(--phwa);
	}
	.pin.dim {
		opacity: 0.22;
	}
	.pin-label {
		font-family: var(--mono);
		font-size: 10px;
		fill: var(--ink);
		paint-order: stroke;
		stroke: #e8efe9;
		stroke-width: 3.5px;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.15s;
	}
	.pin:hover .pin-label,
	.pin:focus-visible .pin-label,
	.pin.on .pin-label {
		opacity: 1;
	}

	.map-legend {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--stone);
		padding: 0.7rem 0.3rem 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem 0.9rem;
	}
	.map-legend span {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.dot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		display: inline-block;
		flex-shrink: 0;
	}

	/* ── Detail column ── */
	.detail {
		min-height: 320px;
	}
	.placeholder {
		border: 1px dashed var(--rule);
		border-radius: 6px;
		padding: 2rem 1.4rem;
		text-align: center;
		color: var(--stone);
		font-style: italic;
	}

	/* Default state: a real list, not an empty box. Capped to the map's own height
	   so the two columns end together — all eighteen sites at full height ran to
	   twice the map, leaving a long ragged tail beside nothing. */
	.sitelist {
		max-height: min(58vh, 520px);
		overflow-y: auto;
		padding-right: 0.6rem;
	}
	.sl-lead {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.9rem;
	}
	.sl-group {
		margin-bottom: 1.1rem;
	}
	.sl-head {
		display: flex;
		align-items: center;
		gap: 7px;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--canopy);
		margin-bottom: 0.3rem;
	}
	.sl-group ul {
		list-style: none;
		margin: 0;
		padding: 0 0 0 16px;
	}
	.sl-group li button {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.8rem;
		width: 100%;
		text-align: left;
		background: none;
		border: 0;
		border-bottom: 1px solid var(--rule);
		padding: 0.5rem 0.2rem;
		font-family: var(--body);
		font-size: 15px;
		color: var(--ink);
		cursor: pointer;
	}
	.sl-group li button:hover {
		color: var(--phwa);
		background: var(--white);
	}
	.sl-elev {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--stone);
		flex-shrink: 0;
	}
	.sl-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.sl-chips button {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--body);
		font-size: 13.5px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		padding: 5px 10px;
		color: var(--ink);
		cursor: pointer;
		transition:
			border-color 0.14s,
			color 0.14s;
	}
	.sl-chips button:hover {
		border-color: var(--phwa);
		color: var(--phwa);
	}

	.bird.more {
		background: none;
		border-style: dashed;
		color: var(--stone);
	}

	/* Homepage taster: one column. A side panel here ran far past the bottom of
	   the map, so the site chips and the card stack underneath it instead. */
	.compact .grid {
		grid-template-columns: 1fr;
		gap: 1.4rem;
	}
	.compact .map-panel {
		position: static;
	}
	.compact .detail {
		min-height: 0;
	}
	.compact .site-card {
		max-width: 760px;
	}

	/* ── Site card ── */
	.site-card {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 8px;
		padding: 1.7rem 1.8rem;
		animation: fade 0.25s ease;
	}
	@keyframes fade {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	.sc-hab {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--phwa);
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}
	.sc-hdot {
		display: inline-block;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		margin-right: 6px;
		vertical-align: 1px;
	}
	.sc-name {
		font-family: var(--display);
		font-weight: 500;
		font-size: 27px;
		line-height: 1.1;
		margin-bottom: 0.35rem;
	}
	.sc-elev {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
		margin-bottom: 1.1rem;
	}
	.sc-blurb {
		font-size: 15px;
		color: var(--ink);
		line-height: 1.65;
		padding-bottom: 1.3rem;
		margin-bottom: 1.3rem;
		border-bottom: 1px solid var(--rule);
	}
	.sc-birds-lbl {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.7rem;
	}
	.sc-birds {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.bird {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		background: var(--paper);
		border: 1px solid var(--rule);
		border-radius: 3px;
		padding: 4px 9px;
		color: var(--canopy);
	}
	.bt {
		font-family: var(--mono);
		font-size: 8.5px;
		font-style: normal;
		font-weight: 500;
		letter-spacing: 0.04em;
		padding: 1px 4px;
		border-radius: 2px;
		background: var(--white);
		border: 1px solid var(--rule);
		color: var(--stone);
		margin-left: 5px;
	}
	.bird.tier-mx {
		border-color: rgba(214, 68, 111, 0.45);
		color: #b8305a;
	}
	.bird.tier-wmx {
		border-color: rgba(168, 118, 47, 0.45);
		color: #9c5a16;
	}
	.bird.tier-nca .bt {
		color: var(--canopy);
		border-color: rgba(47, 74, 60, 0.35);
	}

	.sc-foot {
		margin-top: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.btn {
		display: inline-block;
		background: var(--phwa);
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 14px;
		padding: 11px 22px;
		border-radius: 2px;
	}
	.btn:hover {
		background: #bf3a61;
	}
	.clear {
		background: none;
		border: 0;
		padding: 0;
		font-family: var(--body);
		font-size: 14px;
		color: var(--stone);
		cursor: pointer;
		text-decoration: underline;
	}
	.clear:hover {
		color: var(--phwa);
	}

	/* ── Species search ── */
	.birdsearch {
		position: relative;
		margin-bottom: 1.2rem;
	}
	.birdsearch label {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.4rem;
	}
	.birdsearch input {
		width: 100%;
		font-family: var(--body);
		font-size: 15px;
		padding: 11px 13px;
		border: 1px solid var(--rule);
		border-radius: 3px;
		background: var(--white);
	}
	.birdsearch input:focus {
		outline: none;
		border-color: var(--phwa);
	}
	.suggest {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		box-shadow: 0 8px 20px rgba(22, 36, 31, 0.1);
		list-style: none;
		z-index: 20;
		max-height: 280px;
		overflow-y: auto;
		margin: 0;
		padding: 0;
	}
	.suggest button {
		width: 100%;
		text-align: left;
		border: 0;
		background: none;
		padding: 0.55rem 0.8rem;
		font-family: var(--body);
		font-size: 14.5px;
		cursor: pointer;
	}
	.suggest button:hover {
		background: var(--paper);
	}

	.sc-sites {
		list-style: none;
		margin: 0.9rem 0 0;
		padding-top: 1rem;
		border-top: 1px solid var(--rule);
	}
	.sc-sites li button {
		display: flex;
		gap: 9px;
		align-items: baseline;
		width: 100%;
		text-align: left;
		background: none;
		border: 0;
		border-bottom: 1px solid var(--rule);
		padding: 0.6rem 0.2rem;
		cursor: pointer;
		font-family: var(--body);
	}
	.sc-sites li:last-child button {
		border-bottom: 0;
	}
	.sc-sites li button:hover b {
		color: var(--phwa);
	}
	.sc-sites b {
		display: block;
		font-weight: 400;
		font-size: 15px;
		color: var(--ink);
	}
	.sc-sites em {
		font-family: var(--mono);
		font-style: normal;
		font-size: 10px;
		color: var(--stone);
		line-height: 1.5;
	}

	/* ── Narrow screens ── */
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 1.6rem;
		}
		.map-panel {
			position: static;
		}
		/* Break out of the page gutter so the map gets the full screen width —
		   at 390px every 40px of padding is a real loss of legibility. */
		.map-wrap {
			margin-inline: calc(-1 * var(--map-bleed, 1.5rem));
			border-radius: 0;
			border-left: 0;
			border-right: 0;
			padding: 0.25rem;
		}
		.map-legend {
			font-size: 10.5px;
		}
		/* Bigger pins for finger-sized targets. Labels stay hidden until a pin is
		   chosen — showing all eighteen at once collides badly around Tacaná and
		   reads as broken. Discovery is handled by the site list below instead. */
		.pin-dot {
			r: 9;
		}
		.pin-ring {
			r: 14;
		}
		.pin-label {
			font-size: 14px;
			stroke-width: 5px;
		}
		.detail {
			min-height: 0;
		}
	}

	@media (max-width: 560px) {
		.pin-dot {
			r: 11;
		}
		.pin-ring {
			r: 17;
		}
		.pin-label {
			font-size: 16px;
		}
		.site-card {
			padding: 1.3rem 1.2rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-card {
			animation: none;
		}
	}
</style>
