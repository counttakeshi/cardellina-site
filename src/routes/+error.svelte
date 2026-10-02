<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import { TITLE_SUFFIX } from '$lib/seo';

	/**
	 * The page GitHub Pages serves for anything it cannot find.
	 *
	 * Twenty-nine old cardellina.com URLs are kept alive by redirect stubs, but
	 * no stub list is ever complete: links get mistyped, shared with a trailing
	 * character, or point at a page that has moved since. This is where all of
	 * that lands, so it carries the nav, the footer and three ways onward rather
	 * than GitHub's bare default.
	 *
	 * noindex, because a 404 served with a 200 status is exactly the "soft 404"
	 * search engines penalise, and GitHub Pages gives us no way to set the real
	 * status code.
	 */
</script>

<Seo title={'Page not found | ' + TITLE_SUFFIX} noindex />

<div class="wrap e-wrap">
	<p class="eyebrow">404</p>
	<h1>Page not found</h1>

	<nav class="e-links" aria-label="Where to go instead">
		<a href="{base}/trips">Trips</a>
		<a href="{base}/birds">Bird Library</a>
		<a href="{base}/contact">Contact</a>
	</nav>
</div>

<style>
	.e-wrap {
		max-width: 1080px;
		padding-top: 5rem;
		padding-bottom: 6rem;
	}

	h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(34px, 5vw, 54px);
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin-bottom: 1.8rem;
	}

	.e-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem 1.6rem;
	}

	.e-links a {
		font-family: var(--body);
		font-weight: 700;
		font-size: 16px;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
		transition:
			color 0.18s,
			border-color 0.18s;
	}

	.e-links a:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.e-links a:focus-visible {
		outline: 2px solid var(--phwa);
		outline-offset: 3px;
	}
</style>
