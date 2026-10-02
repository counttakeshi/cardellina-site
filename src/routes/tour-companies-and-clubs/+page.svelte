<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { crumbsFor } from '$lib/breadcrumbs';

	let { data } = $props();
	const crumbs = $derived(crumbsFor(data.path));
</script>

<ContentPage page={data.page} path={data.path} {crumbs} />
