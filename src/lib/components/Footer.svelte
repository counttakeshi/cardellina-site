<footer class="footer">
	<div class="wrap footer-inner">
		<p>&copy; {new Date().getFullYear()} Cardellina Birdwatching Tours</p>
		<a href="/privacy-policy">Privacy policy</a>
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
		gap: 1rem;
		flex-wrap: wrap;
		padding-block: 1.6rem;
		font-size: 14px;
		color: var(--stone);
	}

	.footer-inner a {
		color: var(--stone);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 1px;
	}

	.footer-inner a:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}
</style>
