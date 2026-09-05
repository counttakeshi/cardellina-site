<script lang="ts">
	import { base } from '$app/paths';
	import { consentRequired, storedChoice, remember, type ConsentChoice } from '$lib/consent';

	interface Props {
		/** Reported upward so Clarity can start on this page view, not the next. */
		onchoice?: (choice: ConsentChoice) => void;
	}
	let { onchoice }: Props = $props();

	// Hidden until the client has worked out whether this visitor needs asking.
	// Nothing renders during prerendering, so the HTML is identical for everyone
	// and the bar cannot flash up for a reader who does not need it.
	let show = $state(false);

	$effect(() => {
		show = consentRequired() && storedChoice() === null;
	});

	function answer(choice: ConsentChoice) {
		remember(choice);
		show = false;
		onchoice?.(choice);
	}
</script>

{#if show}
	<!-- Fixed rather than in the flow: a bar that pushed the page down would
	     move the content under a reader who is already reading it. -->
	<section class="cookie" aria-label="Cookie choice">
		<p>
			We'd like to set one cookie, so we can see which pages people actually read and write more of
			what works. No advertising, and nothing passed on to anyone.
			<a href="{base}/privacy-policy">What we collect</a>
		</p>
		<div class="acts">
			<button class="ok" onclick={() => answer('granted')}>Allow</button>
			<button class="no" onclick={() => answer('denied')}>No thanks</button>
		</div>
	</section>
{/if}

<style>
	.cookie {
		position: fixed;
		z-index: 60;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		max-width: 660px;
		margin: 0 auto;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 8px;
		box-shadow: 0 6px 28px rgba(22, 36, 31, 0.16);
		padding: 1.1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		animation: rise 0.28s ease-out;
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cookie {
			animation: none;
		}
	}

	.cookie p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--stone);
	}
	.cookie a {
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1px solid currentColor;
		white-space: nowrap;
	}
	.cookie a:hover {
		color: var(--phwa);
	}

	.acts {
		display: flex;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	/* Allow is the filled button and reads first, which is as far as a nudge
	   should go. Both are one click, the same size and equally legible: making
	   the refusal the harder path is the specific thing regulators fine for,
	   and it would put the site at more risk than the analytics are worth. */
	.cookie button {
		font-family: var(--body);
		font-size: 14px;
		font-weight: 700;
		padding: 0.6rem 1.1rem;
		border-radius: 5px;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.16s,
			border-color 0.16s,
			color 0.16s;
	}
	.ok {
		background: var(--phwa);
		border: 1px solid var(--phwa);
		color: #fff;
	}
	.ok:hover {
		background: #b8305a;
		border-color: #b8305a;
	}
	.no {
		background: transparent;
		border: 1px solid var(--rule);
		color: var(--ink);
	}
	.no:hover {
		border-color: var(--stone);
	}
	.cookie button:focus-visible {
		outline: 2px solid var(--canopy);
		outline-offset: 2px;
	}

	@media (max-width: 620px) {
		.cookie {
			flex-direction: column;
			align-items: stretch;
			gap: 0.9rem;
		}
		.acts button {
			flex: 1;
		}
	}
</style>
