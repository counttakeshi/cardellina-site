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

	<!--
		C5. Every section, linked from every page.

		Until now the footer named no page at all, so the only route into the bird
		library or the trip reports was the nav dropdowns, which need a hover or a
		tap to open and leave nothing in the HTML for a crawler to follow from
		most pages. A footer is the one block that appears on all 28.

		Labels are the nav's own words, so the same page is never called two
		different things.
	-->
	<nav class="f-nav" aria-label="Sections">
		<div class="wrap f-nav-inner">
			<a href="{base}/trips">Trips</a>
			<a href="{base}/birds">Bird Library</a>
			<a href="{base}/trip-reports">Trip Reports</a>
			<a href="{base}/guides">Guides</a>
			<a href="{base}/partners">Partners</a>
			<a href="{base}/contact">Contact</a>
		</div>
	</nav>
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

	.f-nav {
		border-bottom: 1px solid var(--rule);
	}
	.f-nav-inner {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.8rem;
		padding-block: 1.4rem;
	}
	.f-nav a {
		font-family: var(--body);
		font-size: 14.5px;
		font-weight: 700;
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		padding-bottom: 1px;
	}
	.f-nav a:hover {
		color: var(--phwa);
		border-bottom-color: var(--phwa);
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
