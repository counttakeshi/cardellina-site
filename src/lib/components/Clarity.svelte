<script lang="ts">
	import { CLARITY_PROJECT_ID } from '$lib/config';

	// Clarity's own loader snippet with the project ID injected. It goes into the
	// document head rather than being appended after hydration, which is what
	// lets it capture the first paint of a page.
	//
	// The guard is inside <svelte:head> rather than around it: Svelte requires
	// svelte:head at the top level of a component. With no ID configured nothing
	// is emitted at all, so a forgotten config value fails closed — no
	// third-party script, no session recording.
	const snippet = `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script",${JSON.stringify(CLARITY_PROJECT_ID)});`;
</script>

<svelte:head>
	{#if CLARITY_PROJECT_ID}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script>${snippet}<` + `/script>`}
	{/if}
</svelte:head>
