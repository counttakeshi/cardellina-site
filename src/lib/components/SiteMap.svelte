<script lang="ts">
	import { sites, mapBirds, MAP_VIEWBOX, TIER_LABELS, type Site } from '$lib/data/sites';
	import mapBase from './map-base.svg?raw';

	type Mode = 'site' | 'species';

	let mode = $state<Mode>('site');
	let selectedSiteId = $state<string | null>(null);
	let selectedBird = $state<string | null>(null);
	let birdQuery = $state('');

	const selectedSite = $derived(sites.find((s) => s.id === selectedSiteId) ?? null);

	const birdMatches = $derived.by(() => {
		const q = birdQuery.trim().toLowerCase();
		if (!q) return [];
		return mapBirds.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 8);
	});

	const activeBird = $derived(mapBirds.find((b) => b.name === selectedBird) ?? null);

	const highlightedSiteIds = $derived.by(() => {
		if (mode === 'species') return new Set(activeBird?.sites ?? []);
		return new Set(selectedSiteId ? [selectedSiteId] : []);
	});

	function pickSite(site: Site) {
		if (mode !== 'site') return;
		selectedSiteId = selectedSiteId === site.id ? null : site.id;
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

<div class="mapwrap">
	<div class="mapbar">
		<div class="modes">
			<button class:on={mode === 'site'} onclick={() => setMode('site')}>Sites</button>
			<button class:on={mode === 'species'} onclick={() => setMode('species')}>Species</button>
		</div>

		{#if mode === 'species'}
			<div class="birdsearch">
				<input
					type="text"
					placeholder="Find a bird…"
					aria-label="Find a bird"
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
		{/if}
	</div>

	<div class="mapgrid">
		<div class="mapcanvas">
			<svg class="cmap" viewBox={MAP_VIEWBOX} role="img" aria-label="Map of birding sites across Chiapas">
				{@html mapBase}

				{#each sites as site (site.id)}
					{@const on = highlightedSiteIds.has(site.id)}
					{@const dim = highlightedSiteIds.size > 0 && !on}
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -- tabindex is -1 unless the group is a button -->
					<g
						class="pin"
						class:on
						class:dim
						role={mode === 'site' ? 'button' : 'img'}
						tabindex={mode === 'site' ? 0 : -1}
						aria-label={site.name}
						aria-selected={mode === 'site' ? on : undefined}
						onclick={() => pickSite(site)}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && pickSite(site)}
					>
						<circle class="pin-hit" cx={site.x} cy={site.y} r="15" fill="transparent" />
						<circle class="pin-dot" cx={site.x} cy={site.y} r="6" style="--pc:{site.zoneColor}" />
						<text class="pin-label" x={site.x} y={site.y - 12} text-anchor="middle">
							{site.name}
						</text>
					</g>
				{/each}
			</svg>
		</div>

		<aside class="sidecard">
			{#if mode === 'site' && selectedSite}
				<div class="site-card">
					<div class="sc-hab">
						<span class="sc-hdot" style="background:{selectedSite.zoneColor}"></span>
						{selectedSite.habitat}
					</div>
					<h3 class="sc-name">{selectedSite.name}</h3>
					<div class="sc-elev">{selectedSite.elev} m</div>
					<p class="sc-blurb">{selectedSite.blurb}</p>
					<div class="sc-birds">
						{#each selectedSite.birds as bird (bird.name)}
							<span class="bird" class:tier-nca={bird.tier === 'nca'} class:tier-mx={bird.tier === 'mx'} class:tier-wmx={bird.tier === 'wmx'}>
								{bird.name}{#if bird.tier}<i class="bt">{TIER_LABELS[bird.tier]}</i>{/if}
							</span>
						{/each}
					</div>
				</div>
			{:else if mode === 'species' && activeBird}
				<div class="site-card">
					<div class="sc-hab">Found at {activeBird.sites.length} site{activeBird.sites.length === 1 ? '' : 's'}</div>
					<h3 class="sc-name">
						{activeBird.name}{#if activeBird.tier}<i class="bt">{TIER_LABELS[activeBird.tier]}</i>{/if}
					</h3>
					<ul class="sc-sitelist">
						{#each activeBird.sites as id (id)}
							{@const s = sites.find((x) => x.id === id)}
							{#if s}
								<li>
									<span class="sc-hdot" style="background:{s.zoneColor}"></span>
									<span>
										<b>{s.name}</b>
										<em>{s.habitat}</em>
									</span>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			{:else}
				<p class="ph">
					{#if mode === 'site'}
						Tap a site to see what lives there.
					{:else}
						Search for a bird to see where we find it.
					{/if}
				</p>
			{/if}
		</aside>
	</div>
</div>

<style>
	.mapwrap {
		display: grid;
		gap: 1.2rem;
	}

	.mapbar {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.modes {
		display: inline-flex;
		border: 1px solid var(--rule);
		border-radius: 999px;
		overflow: hidden;
		background: var(--white);
	}
	.modes button {
		border: 0;
		background: none;
		padding: 0.45rem 1.1rem;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		cursor: pointer;
	}
	.modes button.on {
		background: var(--ink);
		color: #fff;
	}

	.birdsearch {
		position: relative;
		flex: 1;
		min-width: 220px;
		max-width: 340px;
	}
	.birdsearch input {
		width: 100%;
		font-family: var(--body);
		font-size: 14px;
		padding: 9px 12px;
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
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		box-shadow: 0 8px 20px rgba(22, 36, 31, 0.1);
		list-style: none;
		z-index: 20;
		max-height: 260px;
		overflow-y: auto;
	}
	.suggest button {
		width: 100%;
		text-align: left;
		border: 0;
		background: none;
		padding: 0.5rem 0.8rem;
		font-size: 14px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.suggest button:hover {
		background: var(--paper);
	}

	.mapgrid {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: 1.4rem;
		align-items: start;
	}

	.mapcanvas {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 6px;
		overflow: hidden;
	}
	.cmap {
		width: 100%;
		height: auto;
		display: block;
	}

	/* Pins */
	.pin {
		cursor: pointer;
		transition: opacity 0.18s ease;
	}
	.pin-dot {
		fill: var(--pc);
		stroke: #fff;
		stroke-width: 2;
		transition:
			r 0.16s ease,
			stroke-width 0.16s ease;
	}
	.pin:hover .pin-dot,
	.pin.on .pin-dot {
		r: 8.5;
		stroke-width: 3;
	}
	.pin.dim {
		opacity: 0.3;
	}
	.pin-label {
		font-family: var(--mono);
		font-size: 10px;
		fill: var(--ink);
		paint-order: stroke;
		stroke: rgba(248, 247, 243, 0.9);
		stroke-width: 3.5;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.16s ease;
	}
	.pin:hover .pin-label,
	.pin.on .pin-label {
		opacity: 1;
	}

	/* Side card */
	.sidecard {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 6px;
		padding: 1.4rem 1.5rem;
		min-height: 220px;
	}
	.ph {
		color: var(--stone);
		font-size: 15px;
		font-style: italic;
	}
	.sc-hab {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
		display: flex;
		align-items: center;
		gap: 7px;
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}
	.sc-hdot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.sc-name {
		font-family: var(--display);
		font-weight: 500;
		font-size: 23px;
		line-height: 1.15;
		margin-bottom: 0.2rem;
	}
	.sc-elev {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
		margin-bottom: 0.8rem;
	}
	.sc-blurb {
		font-size: 15px;
		color: var(--stone);
		line-height: 1.6;
		margin-bottom: 1rem;
	}
	.sc-birds {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		padding-top: 0.9rem;
		border-top: 1px solid var(--rule);
	}
	.bird {
		font-size: 12.5px;
		background: var(--paper);
		border: 1px solid var(--rule);
		border-radius: 2px;
		padding: 3px 7px;
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.bird.tier-nca {
		border-color: rgba(47, 74, 60, 0.35);
		background: rgba(47, 74, 60, 0.06);
	}
	.bird.tier-mx {
		border-color: rgba(214, 68, 111, 0.4);
		background: rgba(214, 68, 111, 0.06);
	}
	.bird.tier-wmx {
		border-color: rgba(168, 118, 47, 0.4);
		background: rgba(168, 118, 47, 0.08);
	}
	.bt {
		font-family: var(--mono);
		font-size: 8.5px;
		font-style: normal;
		letter-spacing: 0.05em;
		color: var(--stone);
	}

	.sc-sitelist {
		list-style: none;
		margin: 0.8rem 0 0;
		padding-top: 0.9rem;
		border-top: 1px solid var(--rule);
	}
	.sc-sitelist li {
		display: flex;
		gap: 8px;
		align-items: baseline;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--rule);
	}
	.sc-sitelist li:last-child {
		border-bottom: 0;
	}
	.sc-sitelist b {
		display: block;
		font-weight: 400;
		font-size: 15px;
	}
	.sc-sitelist em {
		font-family: var(--mono);
		font-style: normal;
		font-size: 10.5px;
		color: var(--stone);
		line-height: 1.5;
	}

	@media (max-width: 860px) {
		.mapgrid {
			grid-template-columns: 1fr;
		}
	}
</style>
