<script lang="ts">
	import { guides } from '$lib/data/guides';
</script>

<svelte:head>
	<title>Valente & Ben | Cardellina - Chiapas Birding Tours</title>
</svelte:head>

<section class="container page">
	<h1>Valente & Ben</h1>

	<div class="guides">
		{#each guides as guide (guide.slug)}
			<article class="guide">
				<img src={guide.photoUrl} alt={guide.name} />
				<h2>{guide.name}</h2>
				{#if guide.bio}
					<p>{guide.bio}</p>
				{:else}
					<p class="note">Bio pending migration.</p>
				{/if}
			</article>
		{/each}
	</div>
</section>

<style>
	.page {
		padding-block: 2.5rem 4rem;
	}

	.guides {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.guide img {
		border-radius: 6px;
		aspect-ratio: 1;
		object-fit: cover;
		margin-bottom: 1rem;
	}

	.note {
		color: var(--color-text-muted);
	}
</style>
