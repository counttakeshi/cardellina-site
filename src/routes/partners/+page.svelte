<script lang="ts">
	import { partners } from '$lib/data/partners';
</script>

<svelte:head>
	<title>Partners | Cardellina - Chiapas Birding Tours</title>
</svelte:head>

<section class="container page">
	<h1>Partners</h1>

	{#if partners.length}
		<div class="partners">
			{#each partners as partner (partner.slug)}
				<article class="partner">
					{#if partner.logoUrl}
						<img src={partner.logoUrl} alt={partner.name} />
					{/if}
					<h2>{partner.name}</h2>
					<p>{partner.description}</p>
					{#if partner.url}
						<a href={partner.url} target="_blank" rel="noreferrer">Visit site →</a>
					{/if}
				</article>
			{/each}
		</div>
	{:else}
		<p class="note">Partner project listings are pending migration.</p>
	{/if}
</section>

<style>
	.page {
		padding-block: 2.5rem 4rem;
	}

	.partners {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.note {
		color: var(--color-text-muted);
	}
</style>
