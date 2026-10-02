<script lang="ts">
	import { base } from '$app/paths';
	import { whatsappLink, CONTACT_EMAIL, WHATSAPP_DISPLAY } from '$lib/config';
</script>

<!--
	The footer carried nothing but a copyright line and the privacy policy, which
	meant every way of reaching us lived on one page: a reader three thousand words
	into a trip report had to go and find the contact page to ask a question. An
	address and a number in the footer is the oldest way of saying a real business
	is behind the site, and it costs one row.
-->
<footer class="footer">

	<div class="wrap footer-inner">
		<div class="f-contact">
			<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>
			<a href={whatsappLink()} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a>
			<span class="f-place">San Cristóbal de las Casas, Chiapas</span>
		</div>
		<div class="f-links">
			<a href="{base}/plan">Plan a trip</a>
			<a href="{base}/privacy-policy">Privacy policy</a>
		</div>
		<p class="f-copy">&copy; {new Date().getFullYear()} Cardellina Birdwatching Tours</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--paper);
		border-top: 1px solid var(--rule);
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.9rem 2rem;
		flex-wrap: wrap;
		padding-block: 1.8rem;
		font-size: 14px;
		color: var(--stone);
	}

	.f-contact,
	.f-links {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem 1.4rem;
	}

	.footer-inner a {
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 1px;
	}

	.footer-inner a:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.f-links a {
		color: var(--stone);
	}

	.f-copy {
		margin: 0;
	}

	@media (max-width: 680px) {
		.footer-inner {
			justify-content: flex-start;
		}
	}
</style>
