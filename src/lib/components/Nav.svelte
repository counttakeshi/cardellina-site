<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const LOGO =
		'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=180,fit=contain/YofU1cddTQzjoQ8J/cardellina-logo-r-ouLe0QMSi7BFi1G9.png';

	let openMenu = $state<'trips' | 'guides' | null>(null);
	let mobileOpen = $state(false);

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<header class="nav">
	<div class="wrap nav-inner">
		<a href="{base}/" class="logo" aria-label="Cardellina — home">
			<img src={LOGO} alt="Cardellina - Chiapas Birding Tours logo" />
		</a>

		<button
			class="burger"
			aria-label="Menu"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span></span><span></span><span></span>
		</button>

		<nav class="menu" class:open={mobileOpen} aria-label="Primary">
			<ul>
				<li><a href="{base}/" class:active={page.url.pathname === '/'}>Home</a></li>

				<li
					class="has-sub"
					onmouseenter={() => (openMenu = 'trips')}
					onmouseleave={() => (openMenu = null)}
				>
					<button
						class="sub-toggle"
						class:active={isActive('/trips')}
						aria-expanded={openMenu === 'trips'}
						onclick={() => (openMenu = openMenu === 'trips' ? null : 'trips')}
					>
						Trips <span class="caret" aria-hidden="true">▾</span>
					</button>
					{#if openMenu === 'trips'}
						<ul class="sub">
							<li><a href="{base}/trips/day">Day Tours</a></li>
							<li><a href="{base}/trips/multi-day">Multi-day Tours</a></li>
						</ul>
					{/if}
				</li>

				<li><a href="{base}/birds" class:active={isActive('/birds')}>Chiapas Birds</a></li>

				<li
					class="has-sub"
					onmouseenter={() => (openMenu = 'guides')}
					onmouseleave={() => (openMenu = null)}
				>
					<button
						class="sub-toggle"
						class:active={isActive('/guides') || isActive('/partners')}
						aria-expanded={openMenu === 'guides'}
						onclick={() => (openMenu = openMenu === 'guides' ? null : 'guides')}
					>
						Guides <span class="caret" aria-hidden="true">▾</span>
					</button>
					{#if openMenu === 'guides'}
						<ul class="sub">
							<li><a href="{base}/guides">Valente &amp; Ben</a></li>
							<li><a href="{base}/partners">Partners</a></li>
						</ul>
					{/if}
				</li>

				<li><a href="{base}/contact" class:active={isActive('/contact')}>Contact</a></li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.nav {
		position: relative;
		z-index: 50;
		background: var(--paper);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding-block: 0.9rem;
	}

	.logo img {
		width: 92px;
		height: auto;
	}

	.menu {
		margin-left: auto;
	}

	.menu > ul {
		display: flex;
		align-items: center;
		gap: 2.4rem;
		list-style: none;
	}

	.menu a,
	.sub-toggle {
		font-family: var(--body);
		font-size: 17px;
		font-weight: 700;
		color: var(--phwa);
		text-decoration: none;
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.menu a:hover,
	.sub-toggle:hover {
		color: #bf3a61;
	}

	.menu a.active,
	.sub-toggle.active {
		border-bottom: 1.5px solid currentColor;
		padding-bottom: 2px;
	}

	.caret {
		font-size: 10px;
		opacity: 0.8;
	}

	.has-sub {
		position: relative;
	}

	.sub {
		position: absolute;
		top: calc(100% + 0.6rem);
		left: 0;
		min-width: 200px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		box-shadow: 0 6px 18px rgba(22, 36, 31, 0.1);
		list-style: none;
		padding: 0.4rem 0;
	}

	.sub a {
		display: block;
		padding: 0.55rem 1.1rem;
		font-size: 15.5px;
		white-space: nowrap;
	}

	.sub a:hover {
		background: var(--paper);
	}

	.burger {
		display: none;
		margin-left: auto;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: 0;
		cursor: pointer;
		padding: 6px;
	}

	.burger span {
		width: 24px;
		height: 2px;
		background: var(--phwa);
		border-radius: 2px;
	}

	@media (max-width: 900px) {
		.burger {
			display: flex;
		}

		.menu {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--white);
			border-top: 1px solid var(--rule);
			border-bottom: 1px solid var(--rule);
			padding: 1rem 1.5rem 1.4rem;
		}

		.menu.open {
			display: block;
		}

		.menu > ul {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.sub {
			position: static;
			border: none;
			box-shadow: none;
			padding: 0.4rem 0 0 1rem;
		}
	}
</style>
