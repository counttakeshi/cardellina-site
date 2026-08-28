<script lang="ts">
	import { privacyPolicyHtml } from '$lib/data/privacy';
</script>

<svelte:head>
	<title>Privacy Policy | Cardellina - Chiapas Birding Tours</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="wrap policy">
	<h1>Privacy Policy</h1>
	<div class="policy-body">{@html privacyPolicyHtml}</div>
</div>

<style>
	.policy {
		max-width: 780px;
		padding: 3.5rem 1.5rem 4.5rem;
	}

	h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(32px, 4.6vw, 46px);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-bottom: 1.6rem;
	}

	.policy-body {
		font-size: 16.5px;
		line-height: 1.75;
	}

	.policy-body :global(h2) {
		font-family: var(--display);
		font-weight: 500;
		font-size: 22px;
		line-height: 1.25;
		margin: 2.4rem 0 0.8rem;
		padding-bottom: 0.45rem;
		border-bottom: 1px solid var(--rule);
	}

	.policy-body :global(p) {
		margin-bottom: 1.1rem;
		color: var(--ink);
	}

	.policy-body :global(ul) {
		margin: 0 0 1.3rem;
		padding-left: 1.2rem;
	}

	.policy-body :global(li) {
		margin-bottom: 0.5rem;
	}

	.policy-body :global(li p) {
		margin: 0;
	}

	.policy-body :global(a) {
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
	}

	.policy-body :global(a:hover) {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.policy-body :global(em) {
		font-style: italic;
		color: var(--canopy);
	}
</style>
