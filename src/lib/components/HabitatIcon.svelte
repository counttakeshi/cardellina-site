<script lang="ts">
	import { ZONES, type ZoneCode } from '$lib/data/taxonomy';

	let { zone, size = 15 }: { zone: ZoneCode; size?: number } = $props();

	const meta = $derived(ZONES[zone]);
</script>

<span class="hi" style="color:{meta.color}" title={meta.label} aria-label={meta.label}>
	{#if zone === 'cloud'}
		<svg viewBox="0 0 16 16" width={size} height={size} role="img">
			<path d="M4 11h8a2.5 2.5 0 0 0 .2-5 3.5 3.5 0 0 0-6.7-1A2.6 2.6 0 0 0 4 11z" fill="currentColor" />
		</svg>
	{:else if zone === 'pineoak'}
		<svg viewBox="0 0 16 16" width={size} height={size} role="img">
			<path d="M8 1.5l3 4.5H9.5l2.5 4H10l2.5 4H3.5L6 10H4l2.5-4H5L8 1.5z" fill="currentColor" />
		</svg>
	{:else if zone === 'pacslope'}
		<svg viewBox="0 0 16 16" width={size} height={size} role="img">
			<path d="M1.5 13l4-7 3 4 2.5-4.5L14.5 13H1.5z" fill="currentColor" />
		</svg>
	{:else if zone === 'rainforest'}
		<svg viewBox="0 0 16 16" width={size} height={size} role="img">
			<path d="M8 2C5.5 4 4 6.5 4 9a4 4 0 1 0 8 0c0-2.5-1.5-5-4-7z" fill="currentColor" />
			<rect x="7.4" y="10" width="1.2" height="4" fill="currentColor" />
		</svg>
	{:else if zone === 'thorn'}
		<svg viewBox="0 0 16 16" width={size} height={size} role="img">
			<path
				d="M8 14V4M8 7l3-2M8 9l-3-2M8 11l3-2M8 6L5 4"
				stroke="currentColor"
				stroke-width="1.3"
				fill="none"
				stroke-linecap="round"
			/>
		</svg>
	{:else if zone === 'coast'}
		<svg viewBox="0 0 16 16" width={size} height={size} role="img">
			<path
				d="M2 6c1.2 1.2 2.8 1.2 4 0s2.8-1.2 4 0 2.8 1.2 4 0M2 10c1.2 1.2 2.8 1.2 4 0s2.8-1.2 4 0 2.8 1.2 4 0"
				stroke="currentColor"
				stroke-width="1.3"
				fill="none"
				stroke-linecap="round"
			/>
		</svg>
	{:else if zone === 'wetland'}
		<svg viewBox="0 0 16 16" width={size} height={size} role="img">
			<path
				d="M5 14V6M8 14V4M11 14V7"
				stroke="currentColor"
				stroke-width="1.3"
				fill="none"
				stroke-linecap="round"
			/>
			<ellipse cx="8" cy="3.2" rx="1.1" ry="2" fill="currentColor" />
			<ellipse cx="5" cy="5.4" rx="1" ry="1.7" fill="currentColor" />
			<ellipse cx="11" cy="6.2" rx="1" ry="1.7" fill="currentColor" />
		</svg>
	{/if}
</span>

<style>
	.hi {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		line-height: 0;
	}
	.hi :global(svg) {
		display: block;
	}
</style>
