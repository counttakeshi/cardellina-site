<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { SITE_ORIGIN, BRAND_NAME } from '$lib/config';

	/**
	 * Everything that belongs in a page's head, in one place.
	 *
	 * It replaced a hand-written <svelte:head> on every route, which is how the
	 * site ended up with no canonical tags and no social previews at all: there
	 * was no single place to add them, so adding them meant editing twenty-seven
	 * files and remembering to do it again on the twenty-eighth.
	 *
	 * The canonical is always built from SITE_ORIGIN rather than from the host
	 * serving the page. That matters because the site is also published to a
	 * github.io project URL as a staging copy: a full duplicate of the site on a
	 * domain we do not own. Pointing its canonicals at www means the duplicate
	 * hands its authority to the real site instead of competing with it.
	 */
	interface Alternate {
		hreflang: string;
		href: string;
	}

	interface Props {
		/** The full <title>, already composed by the route. */
		title: string;
		/** Omitted entirely when empty, rather than rendered blank. */
		description?: string;
		/** Keeps the page out of search results. Drafts and the field map use it. */
		noindex?: boolean;
		/** og:type. Species accounts and trip reports are articles; the rest are not. */
		type?: 'website' | 'article';
		/** Site-root-relative path to the 1200x630 preview, e.g. 'og/trips-palenque.jpg'. */
		image?: string;
		/** JSON-LD objects, rendered one <script> each. See Part B. */
		jsonLd?: unknown[];
		/** hreflang links. Nothing uses this yet; the Spanish pages will. */
		alternates?: Alternate[];
	}

	let {
		title,
		description,
		noindex = false,
		type = 'website',
		image,
		jsonLd = [],
		alternates = []
	}: Props = $props();

	/**
	 * The path this page is served at, with any deploy base path removed, so the
	 * staging build under /cardellina-site still produces www.cardellina.com/trips
	 * rather than www.cardellina.com/cardellina-site/trips.
	 *
	 * Trailing slashes are stripped everywhere except the root, because a
	 * canonical that disagrees with itself across pages is worse than either
	 * convention consistently applied.
	 */
	const path = $derived.by(() => {
		const raw = page.url.pathname;
		const stripped = base && raw.startsWith(base) ? raw.slice(base.length) : raw;
		const clean = stripped.replace(/\/+$/, '');
		return clean === '' ? '/' : clean;
	});

	const canonical = $derived(`${SITE_ORIGIN}${path === '/' ? '/' : path}`);

	/** Falls back to the homepage hero, so every page has a preview of something. */
	const ogImage = $derived(`${SITE_ORIGIN}/${(image ?? 'og/default.jpg').replace(/^\//, '')}`);

	/**
	 * JSON-LD, with every `<` written as its JSON escape.
	 *
	 * The sequence that ends a script element is `</`, and an HTML parser looks
	 * for it without caring that it sits inside a JSON string. A bird name
	 * containing one would end the block early and spill the rest of the data
	 * into the page as text. < is the same character to any JSON parser and
	 * invisible to the HTML one.
	 */
	function serialise(value: unknown): string {
		return JSON.stringify(value).replace(/</g, '\\u003c');
	}

	const blocks = $derived(
		jsonLd
			.filter(Boolean)
			.map((obj) => `<script type="application/ld+json">${serialise(obj)}<\/script>`)
	);
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}

	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}

	{#each alternates as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}

	<meta property="og:site_name" content={BRAND_NAME} />
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />

	{#each blocks as block, i (i)}
		{@html block}
	{/each}
</svelte:head>
