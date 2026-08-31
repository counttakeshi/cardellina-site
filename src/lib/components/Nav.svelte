<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { asset } from '$lib/ledger';

	const LOGO = asset('images/cardellina-logo-r-ouLe0QMSi7BFi1G9-md.webp');

	interface NavChild {
		label: string;
		href: string;
		hint: string;
	}
	interface NavItem {
		id: string;
		label: string;
		href?: string;
		children?: NavChild[];
	}

	const items: NavItem[] = [
		{
			id: 'trips',
			label: 'Trips',
			children: [
				{ label: 'Day Tours', href: '/trips#day', hint: 'Full mornings out, highlands to coast' },
				{
					label: 'Multi-day Tours',
					href: '/trips#multi-day',
					hint: 'Three days to a full expedition'
				},
				{
					label: 'Build Your Own',
					href: '/trips#personalised',
					hint: 'Your dates, your target birds'
				}
			]
		},
		{ id: 'birds', label: 'Chiapas Birds', href: '/birds' },
		{
			id: 'guides',
			label: 'Guides',
			children: [
				{ label: 'Valente & Ben', href: '/guides', hint: 'The two of us, and how we guide' },
				{ label: 'Partners', href: '/partners', hint: 'Projects and people we work with' }
			]
		}
	];

	let openMenu = $state<string | null>(null);
	let mobileOpen = $state(false);
	let scrolled = $state(false);
	let canHover = $state(true);
	let headerEl = $state<HTMLElement | null>(null);

	/** Path with the deploy base stripped, so route matching works on GitHub Pages too. */
	const path = $derived.by(() => {
		const p = page.url.pathname;
		const stripped = base && p.startsWith(base) ? p.slice(base.length) : p;
		return stripped || '/';
	});

	function isActive(href: string) {
		return href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
	}

	function itemActive(item: NavItem) {
		return item.href ? isActive(item.href) : !!item.children?.some((c) => isActive(c.href));
	}

	// Only drive dropdowns from hover on devices that actually hover; on touch the
	// same gesture would fire hover and click together and flicker the menu shut.
	$effect(() => {
		const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
		const sync = () => (canHover = mq.matches);
		sync();
		mq.addEventListener('change', sync);
		return () => mq.removeEventListener('change', sync);
	});

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Close everything after a client-side navigation.
	$effect(() => {
		path;
		openMenu = null;
		mobileOpen = false;
	});

	$effect(() => {
		if (!openMenu && !mobileOpen) return;

		const onPointerDown = (e: PointerEvent) => {
			if (headerEl && !headerEl.contains(e.target as Node)) {
				openMenu = null;
				mobileOpen = false;
			}
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			openMenu = null;
			mobileOpen = false;
		};

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	});

	function toggle(id: string) {
		openMenu = openMenu === id ? null : id;
	}
</script>

<a class="skip" href="#main">Skip to content</a>

<header class="site-header" class:scrolled bind:this={headerEl}>
	<div class="wrap bar">
		<a href="{base}/" class="brand" aria-label="Cardellina — home">
			<img src={LOGO} alt="" width="52" height="52" />
			<span class="brand-text">
				<strong>Cardellina</strong>
				<em>Chiapas Birding Tours</em>
			</span>
		</a>

		<button
			class="burger"
			class:open={mobileOpen}
			aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileOpen}
			aria-controls="site-menu"
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span></span><span></span><span></span>
		</button>

		<nav id="site-menu" class="menu" class:open={mobileOpen} aria-label="Primary">
			<ul class="level1">
				{#each items as item (item.id)}
					{#if item.children}
						<li
							class="has-sub"
							onmouseenter={() => canHover && (openMenu = item.id)}
							onmouseleave={() => canHover && (openMenu = null)}
						>
							<button
								class="link toggle"
								class:active={itemActive(item)}
								aria-expanded={openMenu === item.id}
								aria-controls="sub-{item.id}"
								onclick={() => toggle(item.id)}
							>
								{item.label}
								<svg class="caret" viewBox="0 0 10 6" aria-hidden="true">
									<path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" />
								</svg>
							</button>

							<!-- Wrapper carries the visual offset as padding, so there is no dead
							     gap between the trigger and the panel to lose the pointer in. -->
							<div class="sub" id="sub-{item.id}" hidden={openMenu !== item.id}>
								<ul>
									{#each item.children as child (child.href)}
										<li>
											<a href="{base}{child.href}" class:active={isActive(child.href)}>
												<span class="sub-label">{child.label}</span>
												<span class="sub-hint">{child.hint}</span>
											</a>
										</li>
									{/each}
								</ul>
							</div>
						</li>
					{:else}
						<li>
							<a class="link" class:active={itemActive(item)} href="{base}{item.href}">
								{item.label}
							</a>
						</li>
					{/if}
				{/each}

				<li class="cta-item">
					<a class="cta" class:active={isActive('/contact')} href="{base}/contact">Plan a trip</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.skip {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 200;
		background: var(--ink);
		color: #fff;
		padding: 0.7rem 1.1rem;
		border-radius: 0 0 4px 0;
		font-size: 14px;
		text-decoration: none;
	}
	.skip:focus {
		left: 0;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: color-mix(in srgb, var(--paper) 88%, transparent);
		backdrop-filter: saturate(180%) blur(12px);
		-webkit-backdrop-filter: saturate(180%) blur(12px);
		border-bottom: 1px solid transparent;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}
	.site-header.scrolled {
		border-bottom-color: var(--rule);
		box-shadow: 0 6px 20px rgba(22, 36, 31, 0.06);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		min-height: 74px;
	}

	/* ── Brand ── */
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		text-decoration: none;
		flex-shrink: 0;
	}
	.brand img {
		width: 52px;
		height: 52px;
		object-fit: contain;
	}
	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}
	.brand-text strong {
		font-family: var(--display);
		font-weight: 500;
		font-size: 21px;
		letter-spacing: -0.01em;
		color: var(--ink);
	}
	.brand-text em {
		font-family: var(--mono);
		font-style: normal;
		font-size: 9.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--stone);
		margin-top: 3px;
	}

	/* ── Menu ── */
	.menu {
		margin-left: auto;
	}
	.level1 {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* Ink by default with pink kept for state — the old all-pink nav had poor
	   hierarchy and only ~3.9:1 contrast on the paper background. */
	.link {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--body);
		font-size: 15.5px;
		font-weight: 700;
		color: var(--ink);
		text-decoration: none;
		background: none;
		border: 0;
		cursor: pointer;
		padding: 0.55rem 0.8rem;
		border-radius: 4px;
		transition:
			color 0.16s ease,
			background 0.16s ease;
	}
	.link:hover {
		color: var(--phwa);
		background: color-mix(in srgb, var(--phwa) 7%, transparent);
	}
	.link.active {
		color: var(--phwa);
	}
	/* Underline as a pseudo-element so switching pages never shifts the layout. */
	.link.active::after {
		content: '';
		position: absolute;
		left: 0.8rem;
		right: 0.8rem;
		bottom: 0.28rem;
		height: 1.5px;
		background: currentColor;
		border-radius: 2px;
	}

	.caret {
		width: 10px;
		height: 6px;
		opacity: 0.55;
		transition: transform 0.18s ease;
	}
	.toggle[aria-expanded='true'] .caret {
		transform: rotate(180deg);
		opacity: 1;
	}

	.has-sub {
		position: relative;
	}

	.sub {
		position: absolute;
		top: 100%;
		left: 0;
		padding-top: 0.5rem; /* transparent bridge — keeps the pointer inside the item */
	}
	.sub[hidden] {
		display: none;
	}
	.sub ul {
		list-style: none;
		margin: 0;
		padding: 0.4rem;
		min-width: 268px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 8px;
		box-shadow: 0 14px 34px rgba(22, 36, 31, 0.13);
	}
	.sub a {
		display: block;
		padding: 0.6rem 0.75rem;
		border-radius: 5px;
		text-decoration: none;
		transition: background 0.14s ease;
	}
	.sub a:hover {
		background: var(--paper);
	}
	.sub-label {
		display: block;
		font-size: 15px;
		font-weight: 700;
		color: var(--ink);
	}
	.sub a:hover .sub-label,
	.sub a.active .sub-label {
		color: var(--phwa);
	}
	.sub-hint {
		display: block;
		font-size: 12.5px;
		color: var(--stone);
		line-height: 1.45;
		margin-top: 1px;
	}

	/* ── CTA ── */
	.cta-item {
		margin-left: 0.6rem;
	}
	.cta {
		display: inline-block;
		background: var(--phwa);
		color: #fff;
		font-family: var(--body);
		font-weight: 700;
		font-size: 15px;
		text-decoration: none;
		padding: 0.62rem 1.15rem;
		border-radius: 4px;
		transition:
			background 0.16s ease,
			transform 0.16s ease;
	}
	.cta:hover {
		background: #bf3a61;
		transform: translateY(-1px);
	}

	/* ── Burger ── */
	.burger {
		display: none;
		margin-left: auto;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 44px;
		height: 44px;
		background: none;
		border: 0;
		cursor: pointer;
		padding: 0;
	}
	.burger span {
		display: block;
		width: 24px;
		height: 2px;
		margin: 0 auto;
		background: var(--ink);
		border-radius: 2px;
		transition:
			transform 0.22s ease,
			opacity 0.16s ease;
	}
	.burger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.burger.open span:nth-child(2) {
		opacity: 0;
	}
	.burger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	@media (max-width: 900px) {
		.bar {
			min-height: 64px;
		}
		.burger {
			display: flex;
		}

		.menu {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--white);
			border-top: 1px solid var(--rule);
			border-bottom: 1px solid var(--rule);
			box-shadow: 0 16px 30px rgba(22, 36, 31, 0.1);
			padding: 0.6rem 1.5rem 1.1rem;
			max-height: calc(100dvh - 64px);
			overflow-y: auto;
			display: none;
		}
		.menu.open {
			display: block;
		}

		.level1 {
			flex-direction: column;
			align-items: stretch;
			gap: 0.1rem;
		}

		.link {
			width: 100%;
			justify-content: space-between;
			font-size: 17px;
			padding: 0.85rem 0.25rem;
			border-radius: 5px;
		}
		.link.active::after {
			left: 0.25rem;
			right: auto;
			width: 18px;
			bottom: 0.5rem;
		}

		/* Submenus become inline accordions rather than floating panels. */
		.sub {
			position: static;
			padding-top: 0;
		}
		.sub ul {
			min-width: 0;
			border: 0;
			border-left: 2px solid var(--rule);
			border-radius: 0;
			box-shadow: none;
			margin: 0.1rem 0 0.5rem 0.35rem;
			padding: 0 0 0 0.6rem;
			background: none;
		}
		.sub a {
			padding: 0.6rem 0.25rem;
		}

		.cta-item {
			margin: 0.7rem 0 0.2rem;
		}
		.cta {
			display: block;
			text-align: center;
			padding: 0.85rem 1.15rem;
			font-size: 16px;
		}
	}

	@media (max-width: 380px) {
		.brand-text strong {
			font-size: 18px;
		}
		.brand-text em {
			font-size: 8.5px;
			letter-spacing: 0.1em;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-header,
		.link,
		.caret,
		.cta,
		.burger span,
		.sub a {
			transition: none;
		}
	}
</style>
