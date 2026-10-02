<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { dayTours, multiDayTrips } from '$lib/data/trips';
	import { faq } from '$lib/data/faq';
	import { whatsappLink, WHATSAPP_DISPLAY, CONTACT_EMAIL } from '$lib/config';
	import Seo from '$lib/components/Seo.svelte';
	import { pageTitle, pageDescription, fixedSeo } from '$lib/seo';

	/** Title and description overrides for this page; empty until Ben fills them. */
	const seo = fixedSeo('/contact');

	// Tour cards link here as /contact?tour=<slug>. One prerendered page serves all
	// of them, so the query string is only read in the browser — SvelteKit rejects
	// touching searchParams during prerendering, since the HTML can't vary by query.
	const slug = $derived(browser ? page.url.searchParams.get('tour') : null);

	type Context = {
		kind: 'general' | 'day' | 'multi-day';
		tourName?: string;
		tourMeta?: string;
	};

	const context = $derived.by((): Context => {
		if (!slug) return { kind: 'general' };

		const day = dayTours.find((t) => t.slug === slug);
		if (day) {
			return {
				kind: 'day',
				tourName: day.name,
				tourMeta: `${day.priceUsd} USD · ${day.party}`
			};
		}

		const trip = multiDayTrips.find((t) => t.slug === slug);
		if (trip) {
			return { kind: 'multi-day', tourName: trip.name, tourMeta: trip.days };
		}

		return { kind: 'general' };
	});

	const heading = $derived(
		context.tourName ? `Book ${context.tourName}` : 'What can we help you with?'
	);

	/** WhatsApp opens on an empty thread, so the tour goes in the first message. */
	const waHref = $derived(whatsappLink(context.tourName));
</script>

<Seo
	title={pageTitle(seo.seoTitle, 'Contact | Cardellina - Chiapas Birding Tours')}
	description={pageDescription(seo.metaDescription, "Ask us anything about birding in Chiapas — a species you're chasing, what a tour costs, or how to get here. You don't need a plan to get in touch.")}
/>

<div class="wrap c-head">
	<p class="eyebrow">{context.kind === 'general' ? 'Get in touch' : 'Booking enquiry'}</p>
	<h1>{heading}</h1>
	<p>
		{#if context.kind === 'general'}
			Whether you're planning a birding trip to Chiapas, looking for a particular species or simply
			have a question about our tours, we'd be happy to hear from you.
		{:else}
			Tell us your dates and who's coming, and we'll confirm availability and everything else you
			need to know. Nothing is booked until we've replied and agreed the details with you.
		{/if}
	</p>

	<div class="direct">
		<a class="wa" href={waHref} target="_blank" rel="noopener">
			<svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" aria-hidden="true">
				<path
					d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2z"
				/>
			</svg>
			Message us on WhatsApp
		</a>
		<span class="or">or email <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a></span>
	</div>

	<p class="form-label">Or write to us here</p>
</div>

<div class="wrap c-form">
	<ContactForm kind={context.kind} tourName={context.tourName} tourMeta={context.tourMeta} />
</div>

<!--
	The FAQ sits after the form, not before it. Somebody who arrived ready to ask
	should not have to read eight answers first — but somebody who stalled halfway
	down the form usually stalled on something factual, and this is where they are
	when it happens. Native <details>, so it works with no JavaScript, opens to an
	in-page search, and is keyboard-operable without any of our help.
-->
<div class="wrap c-faq">
	<h2>FAQs</h2>
	<div class="faq-list">
		{#each faq as item (item.q)}
			<details>
				<summary>
					<span class="q-text">{item.q}</span>
					<span class="q-mark" aria-hidden="true"></span>
				</summary>
				<div class="answer">
					{#each item.a as para (para)}
						<p>{para}</p>
					{/each}
					{#if item.link}
						<a class="faq-link" href="{base}{item.link.href}">
							{item.link.label} <span aria-hidden="true">→</span>
						</a>
					{/if}
				</div>
			</details>
		{/each}
	</div>
	<p class="faq-foot">
		Not covered? That's what the form is for — ask, and one of us will answer properly.
	</p>
</div>

<div class="wrap c-info">
	<div class="info-grid">
		<div class="info-card">
			<div class="lbl">Email &amp; WhatsApp</div>
			<p class="big"><a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a></p>
			<p class="big spaced">
				<a href={waHref} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a>
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
				<a href={waHref} target="_blank" rel="noopener" aria-label="WhatsApp">
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

	/* WhatsApp and email side by side, because they are the same offer at
	   different speeds and neither should look like the consolation prize. */
	.direct {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.8rem 1.3rem;
		margin-top: 1.6rem;
	}
	.wa {
		display: inline-flex;
		align-items: center;
		gap: 9px;
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
	.or {
		font-size: 16px;
		color: var(--stone);
	}
	.or a {
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 1px;
	}
	.or a:hover {
		color: var(--phwa);
		border-color: var(--phwa);
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

	/* ── FAQ ── */
	.c-faq {
		padding-top: 3rem;
	}
	.c-faq h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(24px, 3vw, 32px);
		margin-bottom: 1.2rem;
	}
	.faq-list {
		border-top: 1px solid var(--rule);
		max-width: 780px;
	}
	.faq-list details {
		border-bottom: 1px solid var(--rule);
	}
	.faq-list summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.05rem 0;
		cursor: pointer;
		list-style: none;
		color: var(--ink);
	}
	.faq-list summary::-webkit-details-marker {
		display: none;
	}
	.faq-list summary:focus-visible {
		outline: 2px solid var(--phwa);
		outline-offset: 2px;
	}
	.q-text {
		font-family: var(--display);
		font-size: 19px;
		line-height: 1.35;
	}
	details[open] .q-text {
		color: var(--phwa);
	}
	/* Drawn rather than a glyph, so it rotates cleanly and needs no font. */
	.q-mark {
		position: relative;
		width: 13px;
		height: 13px;
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}
	.q-mark::before,
	.q-mark::after {
		content: '';
		position: absolute;
		background: var(--phwa);
		border-radius: 1px;
	}
	.q-mark::before {
		top: 6px;
		left: 0;
		width: 13px;
		height: 1.5px;
	}
	.q-mark::after {
		left: 6px;
		top: 0;
		width: 1.5px;
		height: 13px;
		transition: opacity 0.2s ease;
	}
	details[open] .q-mark::after {
		opacity: 0;
	}
	@media (prefers-reduced-motion: reduce) {
		.q-mark,
		.q-mark::after {
			transition: none;
		}
	}
	.answer {
		padding: 0 0 1.3rem;
		max-width: 64ch;
	}
	.answer p {
		font-size: 16px;
		line-height: 1.7;
		color: var(--stone);
		margin-bottom: 0.7rem;
	}
	.faq-link {
		display: inline-block;
		font-weight: 700;
		font-size: 14.5px;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
	}
	.faq-link:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}
	.faq-foot {
		margin-top: 1.3rem;
		font-size: 15px;
		color: var(--stone);
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
