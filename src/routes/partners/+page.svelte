<script lang="ts">
	import { partners } from '$lib/data/partners';
</script>

<svelte:head>
	<title>Partner Projects | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="The projects and companion guides we work with in Chiapas and neighbouring Oaxaca: OATL and Siyaj Chan."
	/>
</svelte:head>

<div class="wrap masthead">
	<p class="eyebrow">Partner projects</p>
	<h1>People we work with</h1>
	<p>
		Projects that we want to highlight, and our occasional companion guides, in Chiapas and
		neighbouring Oaxaca.
	</p>
</div>

{#each partners as partner, i (partner.slug)}
	{#if i > 0}
		<div class="wrap"><div class="divider"></div></div>
	{/if}
	<div class="wrap">
		<div class="proj" class:flip={partner.flip}>
			<div class="pj-media">
				<img
					src={partner.image}
					alt={partner.imageAlt}
					style="--pos:{partner.imagePosition}"
					loading="lazy"
				/>
			</div>
			<div>
				<div class="pj-head">
					<div class="pj-logo">
						<img src={partner.logo} alt="{partner.name} logo" loading="lazy" />
					</div>
					<div>
						<div class="pj-name">{partner.name}</div>
						<div class="pj-where">{partner.where}</div>
					</div>
				</div>
				<div class="pj-body">
					{#each partner.body as para (para)}
						<p>{para}</p>
					{/each}
				</div>
				<div class="pj-facts">
					{#each partner.facts as fact (fact)}
						<span>{fact}</span>
					{/each}
				</div>
				<a class="pj-link" href={partner.link.href} target="_blank" rel="noopener">
					{partner.link.label}
				</a>
			</div>
		</div>
	</div>
{/each}

<style>
	.masthead {
		padding: 3.2rem 0 0.5rem;
	}
	.masthead h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(32px, 4.6vw, 48px);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-bottom: 1rem;
	}
	.masthead p {
		font-size: 19px;
		color: var(--stone);
		line-height: 1.65;
		max-width: 66ch;
	}

	.proj {
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 3rem;
		padding: 3.5rem 0;
		align-items: start;
	}
	.proj.flip .pj-media {
		order: 2;
	}
	.pj-media img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		display: block;
		object-position: var(--pos, 50% 50%);
	}

	.pj-head {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1.4rem;
	}
	.pj-logo {
		flex-shrink: 0;
		width: 66px;
		height: 66px;
		border-radius: 6px;
		background: var(--paper);
		border: 1px solid var(--rule);
		padding: 6px;
	}
	.pj-logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.pj-name {
		font-family: var(--display);
		font-weight: 500;
		font-size: clamp(26px, 3.2vw, 34px);
		line-height: 1.1;
	}
	.pj-where {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
		margin-top: 0.25rem;
	}

	.pj-body p {
		margin-bottom: 1.1rem;
		color: var(--ink);
		line-height: 1.75;
	}

	.pj-facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.4rem 0 0;
	}
	.pj-facts span {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.04em;
		color: var(--stone);
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 2px;
		padding: 5px 10px;
	}

	.pj-link {
		display: inline-block;
		margin-top: 1.6rem;
		font-weight: 700;
		font-size: 14.5px;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
	}
	.pj-link:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.divider {
		height: 1px;
		background: var(--rule);
		margin: 0;
	}

	@media (max-width: 820px) {
		.proj {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.proj.flip .pj-media {
			order: 0;
		}
	}
</style>
