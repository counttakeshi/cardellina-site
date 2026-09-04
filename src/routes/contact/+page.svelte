<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { dayTours, multiDayTrips } from '$lib/data/trips';
	import { guides } from '$lib/data/guides';

	const WHATSAPP = 'https://wa.me/5219615164020';

	// Tour cards link here as /contact?tour=<slug>. One prerendered page serves all
	// of them, so the query string is only read in the browser — SvelteKit rejects
	// touching searchParams during prerendering, since the HTML can't vary by query.
	const slug = $derived(browser ? page.url.searchParams.get('tour') : null);

	// The guides page links here as /contact?guide=<slug> so an enquiry can be
	// addressed to one of us by name. Read in the browser only, for the same
	// reason as `tour` above.
	const askedFor = $derived.by(() => {
		if (!browser) return null;
		const g = page.url.searchParams.get('guide');
		return guides.find((x) => x.slug === g) ?? null;
	});

	const context = $derived.by(() => {
		if (!slug) return { kind: 'general' as const };

		const day = dayTours.find((t) => t.slug === slug);
		if (day) {
			return {
				kind: 'day' as const,
				tourName: day.name,
				tourMeta: `${day.priceUsd} USD · ${day.party}`
			};
		}

		const trip = multiDayTrips.find((t) => t.slug === slug);
		if (trip) {
			return { kind: 'multi-day' as const, tourName: trip.name, tourMeta: trip.days };
		}

		return { kind: 'general' as const };
	});

	const heading = $derived(
		context.tourName
			? `Book ${context.tourName}`
			: askedFor
				? `Speak to ${askedFor.name.split(' ')[0]}`
				: "Let's plan your trip"
	);
</script>

<svelte:head>
	<title>Contact | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="Tell us what you'd like to see and when you're thinking of coming, and we'll come back with ideas for your Chiapas birding trip."
	/>
</svelte:head>

<div class="wrap c-head">
	<p class="eyebrow">{context.kind === 'general' ? 'Get in touch' : 'Booking enquiry'}</p>
	<h1>{heading}</h1>
	<p>
		{#if context.kind === 'general'}
			Tell us what you'd like to see, when you're thinking of coming, and how you like to bird.
			We'll come back with ideas, whether that's one of our set trips or something built from
			scratch.
		{:else}
			Tell us your dates and who's coming, and we'll confirm availability and everything else you
			need to know. Nothing is booked until we've replied and agreed the details with you.
		{/if}
	</p>
	<a class="wa" href={WHATSAPP} target="_blank" rel="noopener">
		<svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" aria-hidden="true">
			<path
				d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2z"
			/>
		</svg>
		Message us on WhatsApp
	</a>
	<p class="form-label">Or talk to us via email</p>
</div>

<div class="wrap c-form">
	<ContactForm
		kind={context.kind}
		tourName={context.tourName}
		tourMeta={context.tourMeta}
		prefill={askedFor ? { 'Asked for': askedFor.name } : undefined}
	/>
</div>

<div class="wrap c-info">
	<div class="info-grid">
		<div class="info-card">
			<div class="lbl">Email &amp; phone</div>
			<p class="big"><a href="mailto:info@cardellina.com">info@cardellina.com</a></p>
			<p class="big spaced">
				<a href={WHATSAPP} target="_blank" rel="noopener">+52 961 516 4020</a>
			</p>
		</div>

		<div class="info-card">
			<div class="lbl">Where to find us</div>
			<address>
				Prol. Los Arcos 10, Barrio de Cuxtitali<br />
				San Cristóbal de las Casas, 29250<br />
				Chiapas, Mexico
			</address>
		</div>

		<div class="info-card">
			<div class="lbl">Follow along</div>
			<div class="social">
				<a
					href="https://www.facebook.com/CardellinaBirding"
					target="_blank"
					rel="noopener"
					aria-label="Facebook"
				>
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
						<path
							d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"
						/>
					</svg>
				</a>
				<a
					href="https://www.instagram.com/CardellinaBirding"
					target="_blank"
					rel="noopener"
					aria-label="Instagram"
				>
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
						<path
							d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z"
						/>
					</svg>
				</a>
				<a href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
						<path
							d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>

	<p class="reply-note">We aim to reply within 24 hours.</p>
</div>

<style>
	.wrap {
		max-width: 1080px;
	}

	.c-head {
		padding-top: 3.5rem;
		padding-bottom: 2rem;
	}
	.c-head :global(.eyebrow),
	.c-head h1,
	.c-head p {
		max-width: 720px;
	}
	.c-head h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(34px, 5vw, 54px);
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin-bottom: 1.1rem;
	}
	.c-head p {
		font-size: 19px;
		color: var(--stone);
		line-height: 1.6;
	}
	.wa {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		margin-top: 1.6rem;
		background: #25d366;
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 15px;
		padding: 12px 22px;
		border-radius: 3px;
	}
	.wa:hover {
		background: #1eb356;
	}
	.form-label {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--stone);
		margin: 2.4rem 0 0.2rem;
	}

	.c-form {
		padding-bottom: 1rem;
	}

	.c-info {
		padding-top: 2.5rem;
		padding-bottom: 3.5rem;
	}
	.info-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
	}
	.info-card {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 8px;
		padding: 1.6rem 1.7rem;
	}
	.info-card .lbl {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--phwa);
		margin-bottom: 0.7rem;
	}
	.info-card a {
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
	}
	.info-card a:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}
	.info-card .big {
		font-family: var(--display);
		font-size: 19px;
		line-height: 1.3;
		color: var(--ink);
		margin: 0;
	}
	.info-card .big.spaced {
		margin-top: 0.5rem;
	}
	.info-card address {
		font-style: normal;
		font-size: 15px;
		line-height: 1.65;
		color: var(--stone);
	}
	.social {
		display: flex;
		gap: 0.8rem;
		margin-top: 0.4rem;
	}
	.social a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: 1px solid var(--rule);
		border-radius: 50%;
		color: var(--canopy);
		transition: all 0.15s;
	}
	.social a:hover {
		background: var(--ink);
		color: #fff;
		border-color: var(--ink);
	}
	.reply-note {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
		margin-top: 1.8rem;
		text-align: center;
	}

	@media (max-width: 760px) {
		.info-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
