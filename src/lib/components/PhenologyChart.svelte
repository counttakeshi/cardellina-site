<script lang="ts">
	import phenology from '$lib/data/phenology.json';

	/**
	 * Twelve bars: how often this bird is reported in Chiapas, month by month.
	 *
	 * "When should I come?" is the most asked question in birding travel, and
	 * the honest answer is per species. This is that answer for one bird, from
	 * real checklists rather than from memory.
	 *
	 * Renders nothing at all when there is no data, which is the state until
	 * Ben has run the import. A chart of twelve zeroes would read as "never
	 * recorded", which is a far worse lie than silence.
	 */
	interface Props {
		/** eBird species code, from the account's frontmatter. */
		code?: string;
		/** Falls back to matching on name when there is no code. */
		name?: string;
	}
	let { code, name }: Props = $props();

	const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
	const FULL = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	interface Entry {
		code: string;
		commonName: string;
		scientificName: string;
		monthly: number[];
		checklists: number[];
	}

	const entry = $derived.by((): Entry | undefined => {
		const all = phenology.species as Entry[];
		if (code) {
			const byCode = all.find((s) => s.code === code);
			if (byCode) return byCode;
		}
		if (name) {
			const lower = name.trim().toLowerCase();
			return all.find((s) => s.commonName.trim().toLowerCase() === lower);
		}
		return undefined;
	});

	const peak = $derived(entry ? Math.max(...entry.monthly, 0.0001) : 0);

	/**
	 * Below this the sample is too small to draw a conclusion from. The bar is
	 * still shown, marked, rather than hidden: "we hardly looked in June" is
	 * useful, and silently dropping it would imply the bird is absent.
	 */
	const THIN = 10;
</script>

{#if entry}
	<figure class="phen">
		<figcaption>
			Reported on eBird checklists in Chiapas, by month
			{#if phenology.source}<span class="src">{phenology.source}</span>{/if}
		</figcaption>

		<div class="bars" role="img" aria-label={FULL.map((m, i) => `${m}: ${Math.round(entry.monthly[i] * 100)}%`).join(', ')}>
			{#each entry.monthly as value, i (i)}
				{@const thin = entry.checklists[i] < THIN}
				<div class="col">
					<div class="track">
						<div
							class="bar"
							class:thin
							style="height: {Math.max(2, (value / peak) * 100)}%"
							title="{FULL[i]}: {Math.round(value * 100)}% of {entry.checklists[i]} checklists"
						></div>
					</div>
					<span class="m">{MONTHS[i]}</span>
				</div>
			{/each}
		</div>

		{#if entry.checklists.some((n) => n < THIN)}
			<p class="caveat">
				Paler bars are months with fewer than {THIN} checklists, where the figure is too thin to
				read much into.
			</p>
		{/if}
	</figure>
{/if}

<style>
	.phen {
		margin: 0 0 2rem;
		max-width: 560px;
	}

	figcaption {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.7rem;
	}
	.src {
		text-transform: none;
		letter-spacing: 0;
		display: block;
		margin-top: 0.2rem;
	}

	.bars {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 4px;
		align-items: end;
	}

	.col {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	.track {
		width: 100%;
		height: 72px;
		display: flex;
		align-items: flex-end;
		background: var(--mist);
		border-radius: 2px;
	}

	.bar {
		width: 100%;
		background: var(--canopy);
		border-radius: 2px;
	}
	.bar.thin {
		background: var(--moss);
	}

	.m {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--stone);
	}

	.caveat {
		font-size: 13px;
		line-height: 1.5;
		color: var(--stone);
		margin: 0.7rem 0 0;
	}
</style>
