<script lang="ts">
	import { base } from '$app/paths';
	import { species, familyOrder } from '$lib/data/species';
	import { TIERS, ZONES, ZONE_ORDER, type TierCode, type ZoneCode } from '$lib/data/taxonomy';
	import HabitatIcon from '$lib/components/HabitatIcon.svelte';

	let query = $state('');
	let activeTiers = $state<TierCode[]>([]);
	let activeZones = $state<ZoneCode[]>([]);
	let openGallery = $state<string | null>(null);

	function toggleTier(code: TierCode) {
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
			const okTier = activeTiers.length === 0 || activeTiers.includes(s.tier);
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
	<p class="intro">
		A working reference to the endemics, near-endemics and specialities of Chiapas, plus some
		emblematic lowland neotropical birds, with habitat and elevation. Filter by what you're after,
		or search by name. We're adding full accounts as we go; linked names have them so far.
	</p>
	<p class="nb">
		<b>NB</b> This isn't an exhaustive list of every bird in Chiapas. For the full state list,
		<a href="https://ebird.org/region/MX-CHP" target="_blank" rel="noopener">eBird</a> is the place to
		go.
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

		<div class="chips">
			<span class="lbl">Range</span>
			{#each TIERS as tier (tier.code)}
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

<div class="wrap library">
	{#each grouped as group (group.family)}
		<h3 class="fam">{group.family}</h3>
		<div class="fam-list">
			{#each group.list as bird (bird.slug)}
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
						<span class="zones">
							{#each bird.zones as zone (zone)}
								<HabitatIcon {zone} />
							{/each}
						</span>
						{#if bird.photos?.length}
							<span class="media">
								<button
									class="mbtn"
									class:active={openGallery === bird.slug}
									title="Photos"
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
								</button>
							</span>
						{/if}
					</span>
				</div>

				{#if openGallery === bird.slug && bird.photos?.length}
					<div class="photo-panel">
						<div class="pp-inner">
							{#each bird.photos as photo, i (photo)}
								<figure>
									<img src={photo} alt="{bird.commonName} photo {i + 1}" loading="lazy" />
									<figcaption>{bird.commonName}</figcaption>
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
			<p>Tell us which birds you're after and we'll build a trip around them.</p>
		</div>
		<a class="btn" href="{base}/contact">Plan a trip</a>
	</div>
</div>

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
		max-width: 66ch;
		margin-bottom: 0.9rem;
	}
	.masthead p.nb {
		font-size: 14px;
		color: var(--stone);
		max-width: 66ch;
		font-style: italic;
		padding-left: 0.9rem;
		border-left: 2px solid var(--rule);
	}
	.masthead p.nb b {
		font-style: normal;
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--lichen);
		margin-right: 0.3rem;
	}
	.masthead p.nb a {
		color: var(--canopy);
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
	.media {
		display: flex;
		gap: 4px;
		align-items: center;
	}
	.mbtn {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid var(--rule);
		background: var(--white);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--canopy);
		transition: all 0.13s;
		padding: 0;
	}
	.mbtn:hover,
	.mbtn.active {
		background: var(--ink);
		color: #fff;
		border-color: var(--ink);
	}
	.mbtn svg {
		width: 14px;
		height: 14px;
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
	.photo-panel img {
		max-height: 440px;
		max-width: 100%;
		width: auto;
		height: auto;
		border-radius: 6px;
		display: block;
		background: var(--mist);
	}
	.photo-panel figcaption {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--stone);
		margin-top: 5px;
		letter-spacing: 0.02em;
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

	@media (max-width: 600px) {
		.sp {
			flex-direction: column;
			gap: 0.4rem;
		}
		.right {
			gap: 0.6rem;
		}
	}
</style>
