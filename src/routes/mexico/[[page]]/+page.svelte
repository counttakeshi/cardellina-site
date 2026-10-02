<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { crumbsFor } from '$lib/breadcrumbs';

	let { data } = $props();
	const crumbs = $derived(
		crumbsFor(data.path, data.path === '/mexico' ? undefined : data.page.frontmatter.title)
	);
</script>

<ContentPage page={data.page} path={data.path} {crumbs} />
