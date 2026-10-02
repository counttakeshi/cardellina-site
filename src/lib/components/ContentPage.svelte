<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { TITLE_SUFFIX, pageTitle, pageDescription } from '$lib/seo';
	import { breadcrumbJsonLd, articleJsonLd } from '$lib/jsonld';
	import { SITE_ORIGIN } from '$lib/config';
	import type { Crumb } from '$lib/breadcrumbs';
	import type { ContentPage } from '$lib/content';

	/**
	 * One long-form Markdown page.
	 *
	 * A draft reaches this only under PREVIEW_DRAFTS, and when it does it is
	 * marked noindex. That is belt and braces: a draft is not in a production
	 * build at all, so the tag only matters if somebody publishes a preview
	 * build by mistake.
	 */
	interface Props {
		page: ContentPage;
		/** Where it sits, for the trail and the canonical. */
		path: string;
		crumbs: Crumb[];
		/** Blocks built from existing data, rendered under the body. */
		children?: import('svelte').Snippet;
		/** Anything that belongs above the prose: a hero, a facts table. */
		aboveBody?: import('svelte').Snippet;
	}
	let { page, path, crumbs, children, aboveBody }: Props = $props();

	const fm = $derived(page.frontmatter);
	const draft = $derived(fm.status !== 'live');
</script>

<Seo
	jsonLd={[
		breadcrumbJsonLd(crumbs),
		articleJsonLd({
			headline: fm.title,
			url: `${SITE_ORIGIN}${path}`,
			authorSlug: fm.author,
			datePublished: fm.updated,
			dateModified: fm.updated,
			sources: (fm.sources ?? []).map((s) => [s.title, s.publisher, s.url].filter(Boolean).join('. '))
		})
	]}
	title={pageTitle(fm.seoTitle, `${fm.title} | ${TITLE_SUFFIX}`)}
	description={pageDescription(fm.metaDescription)}
	type="article"
	noindex={draft}
/>

<Breadcrumbs {crumbs} />

<div class="wrap content">
	{#if draft}
		<!-- Only ever visible in a preview build. Production does not render drafts. -->
		<p class="draft-flag">
			Draft. Not published, not indexed, not in the sitemap. Search this page for
			<code>COPY:</code> to find what is still to write.
		</p>
	{/if}

	<h1>{fm.title}</h1>

	{#if aboveBody}
		{@render aboveBody()}
	{/if}

	<article class="prose">
		{@html page.html}
	</article>

	{#if children}
		<div class="blocks">
			{@render children()}
		</div>
	{/if}

	{#if fm.renderSources && fm.sources?.length}
		<section class="sources">
			<h2>Sources</h2>
			<ol>
				{#each fm.sources as source, i (i)}
					<li>
						{#if source.url}
							<a href={source.url} target="_blank" rel="noopener">{source.title}</a>
						{:else}
							{source.title}
						{/if}
						{#if source.publisher}<span class="pub">{source.publisher}</span>{/if}
						{#if source.verified === false}
							<span class="unchecked" title="This URL could not be opened and checked">unchecked</span>
						{/if}
					</li>
				{/each}
			</ol>
		</section>
	{/if}
</div>

<style>
	.content {
		max-width: 1080px;
		padding-top: 3rem;
		padding-bottom: 4rem;
	}

	.draft-flag {
		background: #fff6e5;
		border: 1px solid #e8c88a;
		border-left: 3px solid var(--lichen);
		border-radius: 6px;
		padding: 0.9rem 1.2rem;
		margin-bottom: 2rem;
		font-size: 15px;
		color: #6b4e18;
		max-width: 70ch;
	}
	.draft-flag code {
		font-family: var(--mono);
		font-size: 13px;
	}

	h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(34px, 5vw, 54px);
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin-bottom: 1.6rem;
		max-width: 20ch;
	}

	/* The body is Markdown, so these are element selectors on :global. Svelte
	   scopes styles at compile time and never sees inside {@html}. */
	.prose {
		max-width: 68ch;
	}
	.prose :global(h2) {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(24px, 3vw, 31px);
		line-height: 1.2;
		margin: 2.6rem 0 0.9rem;
	}
	.prose :global(h3) {
		font-family: var(--display);
		font-weight: 500;
		font-size: 21px;
		margin: 1.8rem 0 0.6rem;
	}
	.prose :global(p) {
		font-size: 17px;
		line-height: 1.75;
		color: var(--ink);
		margin-bottom: 1.1rem;
	}
	.prose :global(ul),
	.prose :global(ol) {
		font-size: 17px;
		line-height: 1.75;
		margin: 0 0 1.1rem 1.2rem;
	}
	.prose :global(li) {
		margin-bottom: 0.4rem;
	}
	.prose :global(a) {
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
	}
	.prose :global(a:hover) {
		color: var(--phwa);
		border-color: var(--phwa);
	}
	.prose :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1.4rem;
		font-size: 15.5px;
	}
	.prose :global(th),
	.prose :global(td) {
		text-align: left;
		padding: 0.6rem 0.8rem 0.6rem 0;
		border-bottom: 1px solid var(--rule);
		vertical-align: top;
	}
	.prose :global(th) {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--stone);
	}
	/* The COPY: notes are HTML comments, so they never render. This is here for
	   anything a writer leaves as an explicit placeholder paragraph. */
	.prose :global(blockquote) {
		border-left: 3px solid var(--rule);
		padding-left: 1.1rem;
		margin: 0 0 1.1rem;
		color: var(--stone);
	}

	.blocks {
		margin-top: 2.5rem;
	}

	.sources {
		margin-top: 3rem;
		padding-top: 1.6rem;
		border-top: 1px solid var(--rule);
		max-width: 70ch;
	}
	.sources h2 {
		font-family: var(--mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.8rem;
	}
	.sources ol {
		margin: 0 0 0 1.1rem;
		padding: 0;
	}
	.sources li {
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--stone);
		margin-bottom: 0.5rem;
	}
	.sources a {
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
	}
	.sources a:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}
	.pub {
		margin-left: 0.4rem;
	}
	.unchecked {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--lichen);
		margin-left: 0.4rem;
	}
</style>
