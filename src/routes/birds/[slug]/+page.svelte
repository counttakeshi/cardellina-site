<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();
	const account = $derived(data.account);
</script>

<svelte:head>
	<title>{account.metaTitle} | Cardellina - Chiapas Birding Tours</title>
</svelte:head>

<div class="page-wrap">
	<h1 class="page-title">{account.title}</h1>
	<p class="page-subtitle">{account.subtitle}</p>

	{#if account.hero && 'placeholder' in account.hero}
		<div class="hero-placeholder" role="img" aria-label={account.hero.alt}>
			<span>{account.hero.caption}</span>
		</div>
	{:else if account.hero}
		<figure class="hero-image">
			<img src={account.hero.src} alt={account.hero.alt} />
			{#if account.creditHtml}
				<figcaption class="photo-credit">{@html account.creditHtml}</figcaption>
			{/if}
		</figure>
	{/if}

	<div class="quick-ref" role="complementary" aria-label="Species quick reference">
		<table>
			<tbody>
				{#each account.quickRef as row (row.label)}
					<tr>
						<td>{row.label}</td>
						<td>{@html row.value}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#each account.body as block, i (i)}
		{#if block.type === 'heading'}
			<h2>{block.text}</h2>
		{:else if block.type === 'note'}
			<div class="authors-note">
				<div class="authors-note-label">{block.label}</div>
				<p>{@html block.html}</p>
			</div>
		{:else}
			<p>{@html block.html}</p>
		{/if}
	{/each}

	{#if account.cta}
		<div class="cta-block">
			<p>{@html account.cta.html}</p>
			<a href={base + account.cta.href} class="btn">{account.cta.label}</a>
		</div>
	{/if}

	{#if account.sources.length}
		<div class="sources">
			<h3>Sources</h3>
			<ol>
				{#each account.sources as source, i (i)}
					<!-- id targets the <sup> footnote links in the body copy -->
					<li id="src{i + 1}">{@html source}</li>
				{/each}
			</ol>
		</div>
	{/if}
</div>

<style>
	.page-wrap {
		max-width: 860px;
		margin: 0 auto;
		padding: 3rem 1.5rem 4.5rem;
		font-size: 17px;
		line-height: 1.75;
	}

	.page-title {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(34px, 5vw, 52px);
		line-height: 1.08;
		letter-spacing: -0.015em;
		color: var(--ink);
		margin: 0 0 0.4rem;
	}
	.page-subtitle {
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.04em;
		color: var(--stone);
		margin: 0 0 2rem;
	}

	.hero-image {
		margin: 0 0 2.2rem;
	}
	.hero-image img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 6px;
	}

	/* Shown for birds we don't have our own photo of yet. */
	.hero-placeholder {
		margin: 0 0 2.2rem;
		border-radius: 6px;
		background: linear-gradient(135deg, #1e5a3f 0%, #2d6235 55%, #7a1d2e 100%);
		aspect-ratio: 3/2;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}
	.hero-placeholder span {
		font-family: var(--mono);
		color: rgba(255, 255, 255, 0.9);
		font-size: 13px;
		letter-spacing: 0.02em;
		line-height: 1.7;
		max-width: 38ch;
	}

	.photo-credit {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
		margin-top: 7px;
		text-align: right;
		letter-spacing: 0.02em;
	}
	.photo-credit :global(a) {
		color: var(--stone);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
	}
	.photo-credit :global(a:hover) {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.quick-ref {
		border: 1px solid var(--rule);
		border-left: 3px solid var(--phwa);
		background: var(--white);
		border-radius: 6px;
		padding: 1.4rem 1.6rem;
		margin: 2.2rem 0 2.6rem;
	}
	.quick-ref table {
		width: 100%;
		border-collapse: collapse;
	}
	.quick-ref td {
		padding: 6px 0;
		vertical-align: top;
		font-size: 14.5px;
	}
	.quick-ref td:first-child {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
		width: 40%;
		padding-right: 1rem;
	}
	.quick-ref td:last-child {
		color: var(--ink);
	}

	.quick-ref :global(.status-badge),
	.quick-ref :global(.status-badge-red) {
		display: inline-block;
		font-family: var(--mono);
		border-radius: 3px;
		padding: 2px 8px;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.03em;
	}
	.quick-ref :global(.status-badge) {
		background: rgba(168, 118, 47, 0.1);
		color: #8a5e1e;
		border: 1px solid rgba(168, 118, 47, 0.35);
	}
	.quick-ref :global(.status-badge-red) {
		background: rgba(214, 68, 111, 0.08);
		color: #b8305a;
		border: 1px solid rgba(214, 68, 111, 0.35);
	}

	h2 {
		font-family: var(--display);
		font-weight: 500;
		font-size: 24px;
		line-height: 1.25;
		color: var(--ink);
		margin: 2.8rem 0 0.9rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--rule);
	}

	p {
		margin: 0 0 1.4rem;
		color: var(--ink);
	}

	.page-wrap :global(em) {
		font-style: italic;
		color: var(--canopy);
	}

	.page-wrap :global(sup) {
		font-size: 11px;
		line-height: 0;
		position: relative;
		vertical-align: baseline;
		top: -0.5em;
	}
	.page-wrap :global(sup a) {
		color: var(--phwa);
		text-decoration: none;
		font-weight: 700;
	}
	.page-wrap :global(sup a:hover) {
		text-decoration: underline;
	}

	.authors-note {
		border-left: 3px solid var(--lichen);
		background: var(--white);
		border-radius: 0 6px 6px 0;
		padding: 1.1rem 1.35rem;
		margin: 0 0 1.8rem;
		font-size: 15.5px;
		line-height: 1.75;
		color: var(--ink);
	}
	.authors-note-label {
		font-family: var(--mono);
		font-size: 10.5px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--lichen);
		margin-bottom: 0.45rem;
	}
	.authors-note p {
		margin: 0;
		color: var(--ink);
	}

	.cta-block {
		margin: 3rem 0 0;
		background: var(--ink);
		border-radius: 8px;
		padding: 2rem 2.2rem;
	}
	.cta-block p {
		margin: 0 0 1.2rem;
		font-size: 16px;
		color: rgba(255, 255, 255, 0.82);
		line-height: 1.6;
	}
	.cta-block a.btn {
		display: inline-block;
		background: var(--phwa);
		color: #fff;
		text-decoration: none;
		padding: 0.75rem 1.6rem;
		border-radius: 3px;
		font-family: var(--body);
		font-size: 14.5px;
		font-weight: 700;
		letter-spacing: 0.01em;
	}
	.cta-block a.btn:hover {
		background: #bf3a61;
	}

	.sources {
		margin: 3.2rem 0 0;
		padding-top: 1.6rem;
		border-top: 1px solid var(--rule);
		font-size: 13.5px;
		color: var(--stone);
	}
	.sources h3 {
		font-family: var(--mono);
		font-size: 11px;
		font-weight: 500;
		color: var(--ink);
		margin: 0 0 0.8rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.sources ol {
		margin: 0;
		padding-left: 1.25rem;
	}
	.sources li {
		margin-bottom: 0.6rem;
		line-height: 1.55;
	}
	.sources :global(a) {
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
	}
	.sources :global(a:hover) {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	@media (max-width: 560px) {
		.page-wrap {
			padding: 2rem 1.1rem 3rem;
		}
		.quick-ref td:first-child {
			width: 46%;
		}
	}
</style>
