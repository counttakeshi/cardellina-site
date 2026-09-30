<script lang="ts">
	import { CHIAPAS_OUTLINE, CHIAPAS_VIEWBOX } from '$lib/data/chiapas-outline';

	/**
	 * Chiapas with a route drawn across it — the builder's own map, shrunk to a
	 * badge. The outline and the stops are the real ones from the interactive map,
	 * not a generic squiggle, so the icon is a small true picture of what the card
	 * leads to.
	 *
	 * Stops, west to east: La Sepultura, Sumidero, San Cristóbal, Comitán,
	 * Montebello. Coordinates copied from MAP_META in sites.ts.
	 */
	const STOPS = [
		{ x: 156, y: 314.2 },
		{ x: 261, y: 228.9 },
		{ x: 338, y: 244.7 },
		{ x: 427.3, y: 322.1 },
		{ x: 506, y: 344.2 }
	];

	const route = STOPS.map((s, i) => `${i === 0 ? 'M' : 'L'}${s.x},${s.y}`).join(' ');
</script>

<svg viewBox={CHIAPAS_VIEWBOX} class="route-icon" aria-hidden="true">
	<path class="state" d={CHIAPAS_OUTLINE} />
	<path class="line" d={route} />
	{#each STOPS as stop, i (i)}
		<circle class="stop" class:end={i === STOPS.length - 1} cx={stop.x} cy={stop.y} r="13" />
	{/each}
</svg>

<style>
	.route-icon {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.state {
		fill: color-mix(in srgb, var(--canopy) 14%, transparent);
		stroke: var(--canopy);
		stroke-width: 5;
		stroke-linejoin: round;
		opacity: 0.75;
	}

	/* Dashed, because the route is the thing you have not decided yet. Short dashes
	   on a wide gap read as a dotted trail at this size; a solid line reads as a
	   border and disappears into the outline. */
	.line {
		fill: none;
		stroke: var(--phwa);
		stroke-width: 8;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 1 22;
	}

	.stop {
		fill: var(--white);
		stroke: var(--phwa);
		stroke-width: 8;
	}
	.stop.end {
		fill: var(--phwa);
	}
</style>
