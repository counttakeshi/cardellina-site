<script lang="ts">
	import type { RelatedLink } from '$lib/related';

	/**
	 * A block of links to related pages, or nothing at all.
	 *
	 * The empty case is the point. Each of these blocks is derived from the data,
	 * so any of them can legitimately come back empty: a tour whose targets have
	 * no accounts yet, a report nobody has matched to a tour. A heading over an
	 * empty list reads as a fault on a page that is otherwise fine.
	 */
	interface Props {
		heading: string;
		links: RelatedLink[];
	}
	let { heading, links }: Props = $props();
</script>

{#if links.length}
	<nav class="related" aria-label={heading}>
		<h2>{heading}</h2>
		<ul>
			{#each links as link (link.href)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.related {
		margin-top: 2.2rem;
	}

	h2 {
		font-family: var(--mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.7rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.3rem;
	}

	a {
		font-family: var(--body);
		font-size: 15.5px;
		font-weight: 700;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1.5px solid var(--rule);
		padding-bottom: 1px;
		transition:
			color 0.18s,
			border-color 0.18s;
	}

	a:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	a:focus-visible {
		outline: 2px solid var(--phwa);
		outline-offset: 3px;
	}
</style>
