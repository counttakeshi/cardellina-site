<script lang="ts">
	import { sites, siteConnections } from '$lib/data/sites';
	import { species } from '$lib/data/species';

	type Mode = 'site' | 'species';

	let mode = $state<Mode>('site');
	let selectedSiteId = $state<string | null>(null);
	let selectedSpeciesSlug = $state<string | null>(null);

	// Project lat/lng onto a simple 0-100 viewBox. Real bounds should be tuned once
	// the actual site coordinates are in (this assumes Chiapas' rough lat/lng box).
	const bounds = { minLat: 14.5, maxLat: 17.5, minLng: -94.2, maxLng: -90.2 };

	function project(lat: number, lng: number) {
		const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
		const y = 100 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
		return { x, y };
	}

	const selectedSite = $derived(sites.find((s) => s.id === selectedSiteId) ?? null);
	const speciesAtSelectedSite = $derived(
		selectedSite ? species.filter((s) => selectedSite.speciesSlugs.includes(s.slug)) : []
	);
	const sitesWithSelectedSpecies = $derived.by(() => {
		const slug = selectedSpeciesSlug;
		return slug ? sites.filter((s) => s.speciesSlugs.includes(slug)) : [];
	});

	function selectSite(id: string) {
		selectedSiteId = selectedSiteId === id ? null : id;
	}
</script>

<div class="sitemap">
	<div class="sitemap__controls">
		<div class="toggle">
			<button
				type="button"
				class:active={mode === 'site'}
				onclick={() => {
					mode = 'site';
					selectedSpeciesSlug = null;
				}}>Site mode</button
			>
			<button
				type="button"
				class:active={mode === 'species'}
				onclick={() => {
					mode = 'species';
					selectedSiteId = null;
				}}>Species mode</button
			>
		</div>

		{#if mode === 'species'}
			<select bind:value={selectedSpeciesSlug} aria-label="Choose a species">
				<option value={null}>Choose a species…</option>
				{#each species as s (s.slug)}
					<option value={s.slug}>{s.commonName}</option>
				{/each}
			</select>
		{/if}
	</div>

	{#if sites.length === 0}
		<p class="empty">
			Map data (site coordinates, per-site species, and road connections) hasn't been migrated
			yet — this component is wired up and ready for it.
		</p>
	{:else}
		<svg class="map" viewBox="0 0 100 100" role="img" aria-label="Map of Cardellina birding sites">
			{#each siteConnections as conn (conn.from + conn.to)}
				{@const from = sites.find((s) => s.id === conn.from)}
				{@const to = sites.find((s) => s.id === conn.to)}
				{#if from && to}
					{@const p1 = project(from.lat, from.lng)}
					{@const p2 = project(to.lat, to.lng)}
					<line
						x1={p1.x}
						y1={p1.y}
						x2={p2.x}
						y2={p2.y}
						stroke="var(--color-text-muted)"
						stroke-width="0.3"
						stroke-dasharray="1,1"
					/>
				{/if}
			{/each}

			{#each sites as site (site.id)}
				{@const p = project(site.lat, site.lng)}
				{@const highlighted =
					(mode === 'site' && selectedSiteId === site.id) ||
					(mode === 'species' && sitesWithSelectedSpecies.includes(site))}
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -- role/tabindex are only set when mode === 'site' -->
				<circle
					cx={p.x}
					cy={p.y}
					r={highlighted ? 2 : 1.4}
					fill={highlighted ? 'var(--color-accent-dark)' : 'var(--color-accent)'}
					role={mode === 'site' ? 'button' : undefined}
					tabindex={mode === 'site' ? 0 : undefined}
					onclick={mode === 'site' ? () => selectSite(site.id) : undefined}
					onkeydown={mode === 'site'
						? (e: KeyboardEvent) => e.key === 'Enter' && selectSite(site.id)
						: undefined}
				/>
			{/each}
		</svg>

		{#if mode === 'site' && selectedSite}
			<div class="panel">
				<h3>{selectedSite.name}</h3>
				<ul>
					{#each speciesAtSelectedSite as s (s.slug)}
						<li>{s.commonName}</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/if}
</div>

<style>
	.sitemap {
		display: grid;
		gap: 1rem;
	}

	.sitemap__controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.toggle {
		display: inline-flex;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		overflow: hidden;
	}

	.toggle button {
		border: none;
		border-radius: 0;
		padding: 0.4rem 1rem;
		font-size: 0.85rem;
	}

	.toggle button.active {
		background: var(--color-accent);
		color: white;
	}

	select {
		font: inherit;
		padding: 0.4rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
	}

	.empty {
		color: var(--color-text-muted);
		border: 1px dashed var(--color-border);
		border-radius: 6px;
		padding: 1.5rem;
	}

	.map {
		width: 100%;
		aspect-ratio: 4 / 3;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 6px;
	}

	.map circle {
		cursor: pointer;
	}

	.panel {
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 1rem 1.5rem;
	}

	.panel ul {
		margin: 0;
		padding-left: 1.2rem;
	}
</style>
