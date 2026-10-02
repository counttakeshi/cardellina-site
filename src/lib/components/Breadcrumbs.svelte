<script lang="ts">
	import { base } from '$app/paths';
	import type { Crumb } from '$lib/breadcrumbs';

	/**
	 * The visible trail, from the same definition as the BreadcrumbList in the
	 * structured data. Google requires the two to agree, and the only way to
	 * guarantee that is to give both the same source.
	 *
	 * The last crumb is the page you are on, so it is text rather than a link to
	 * itself.
	 */
	interface Props {
		crumbs: Crumb[];
	}
	let { crumbs }: Props = $props();
</script>

{#if crumbs.length > 1}
	<nav class="crumbs" aria-label="Breadcrumb">
		<div class="wrap">
			<ol>
				{#each crumbs as crumb, i (crumb.path)}
					<li>
						{#if i === crumbs.length - 1}
							<span aria-current="page">{crumb.name}</span>
						{:else}
							<a href="{base}{crumb.path === '/' ? '/' : crumb.path}">{crumb.name}</a>
							<span class="sep" aria-hidden="true">›</span>
						{/if}
					</li>
				{/each}
			</ol>
		</div>
	</nav>
{/if}

<style>
	.crumbs {
		border-bottom: 1px solid var(--rule);
		background: var(--paper);
	}

	ol {
		list-style: none;
		margin: 0;
		padding: 0.75rem 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0 0.5rem;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.04em;
	}

	li {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	a {
		color: var(--stone);
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	a:hover {
		color: var(--phwa);
		border-bottom-color: var(--phwa);
	}

	.sep {
		color: var(--rule);
	}

	[aria-current='page'] {
		color: var(--ink);
	}
</style>
