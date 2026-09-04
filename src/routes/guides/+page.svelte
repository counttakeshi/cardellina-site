<script lang="ts">
	import { base } from '$app/paths';
	import { guides, guideValues } from '$lib/data/guides';
	import { asset } from '$lib/ledger';

	let videoPlaying = $state(false);

	// ── the two tiers ─────────────────────────────────────────────────────────
	const leadGuides = guides.filter((g) => g.tier === 'lead');
	const widerGuides = guides.filter((g) => g.tier === 'wider');

	type Tab = 'your-guides' | 'wider-team';

	const TABS: { id: Tab; label: string; blurb: string }[] = [
		{ id: 'your-guides', label: 'Your guides', blurb: 'Meet Cardellina founders Ben & Valente' },
		{
			id: 'wider-team',
			label: 'The wider team',
			blurb: 'Guides that help us from time to time'
		}
	];

	let tab = $state<Tab>('your-guides');

	// Same reasoning as the trips page: this route is prerendered, so searchParams
	// are unavailable and a hash is the only thing that can carry which tier is
	// open. The buttons carry the ids, so #wider-team is a real anchor too.
	function tabFromHash(hash: string): Tab | null {
		const id = hash.replace(/^#/, '');
		return TABS.some((t) => t.id === id) ? (id as Tab) : null;
	}

	$effect(() => {
		const sync = () => {
			const found = tabFromHash(window.location.hash);
			if (found) tab = found;
		};
		sync();
		window.addEventListener('hashchange', sync);
		return () => window.removeEventListener('hashchange', sync);
	});

	function show(id: Tab) {
		tab = id;
		history.replaceState(null, '', `#${id}`);
	}
</script>

<svelte:head>
	<title>Valente & Ben | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="Meet Valente González and Ben Simmons, the two birders behind Cardellina, and the way we run a trip in Chiapas."
	/>
</svelte:head>

<div class="wrap masthead">
	<p class="eyebrow">Your guides</p>
	<h1>The two of us, and the birds we know</h1>
	<p>
		Guides who'd rather you felt like you were birding with friends. We can bird at a gentle pace
		or unleash our inner listers at a moment's notice, and we build each trip around our guests,
		drawing on our experience across many cultures and languages.
	</p>
</div>

<div class="wrap">
	<nav class="tabs" aria-label="Who guides with us">
		{#each TABS as t (t.id)}
			<button id={t.id} class="tab" class:on={tab === t.id} onclick={() => show(t.id)}>
				<span class="t-label">{t.label}</span>
				<span class="t-blurb">{t.blurb}</span>
			</button>
		{/each}
	</nav>
</div>

<div class="tier" hidden={tab !== 'wider-team'}>
	<section class="wider">
		<div class="wrap">
			<div class="wgrid">
				{#each widerGuides as guide (guide.slug)}
					<article class="wcard">
						<div class="wcard-body">
							<img
								class="wcard-img"
								src={guide.photo}
								alt="{guide.name}, Chiapas bird guide"
								loading="lazy"
							/>
							<h2>{guide.name}</h2>
							<p class="wwhere">{guide.tag}</p>
							{#each guide.bio as para (para)}
								<p>{para}</p>
							{/each}
							{#if guide.projectLink}
								<a class="wlink" href={guide.projectLink.url} target="_blank" rel="noopener">
									{guide.projectLink.label} →
								</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
</div>

<div class="tier" hidden={tab !== 'your-guides'}>
	{#each leadGuides as guide, i (guide.slug)}
		{#if i > 0}
			<div class="wrap"><div class="divider"></div></div>
		{/if}
		<div class="wrap">
			<div class="guide" class:flip={guide.flip}>
				<div class="g-photo">
					<img src={guide.photo} alt="{guide.name}, Chiapas bird guide" />
					<span class="tag">{guide.tag}</span>
				</div>
				<div class="g-copy">
					<h2 class="g-name">{guide.name}</h2>
					{#if guide.role}
						<p class="g-role">{guide.role}</p>
					{/if}
					<div class="g-bio">
						{#each guide.bio as para (para)}
							<p>{para}</p>
						{/each}
					</div>

					{#if guide.facts?.length}
						<div class="facts">
							{#each guide.facts as fact (fact.label)}
								<div class="fact" class:wide={fact.wide}>
									<div class="flbl">{fact.label}</div>
									<div class="fval">{@html fact.html}</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Outside the two-column grid on purpose: three quotes stacked in a
			     narrow column were most of what made the text run so far past the
			     photo. Across the full width they are one row instead of three. -->
			{#if guide.reviews?.length}
				<div class="g-reviews">
					{#each guide.reviews as review (review.who)}
						<div class="g-review">
							<p>{review.quote}</p>
							<p class="who">{review.who}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>

<!-- VIDEO FEATURE -->
<section class="film">
	<div class="wrap">
		<div class="film-grid">
			{#if videoPlaying}
				<div class="lite-yt">
					<iframe
						src="https://www.youtube-nocookie.com/embed/Xoe_0QTEUGM?autoplay=1&rel=0"
						title="In search of the Horned Guan on Tacaná"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			{:else}
				<button
					class="lite-yt"
					onclick={() => (videoPlaying = true)}
					aria-label="Play video: in search of the Horned Guan on Tacaná"
				>
					<img
						class="lite-thumb"
						src={asset('images/dsc01506-edit-gmwe9PWpByoJSYdo-md.webp')}
						alt="Cloud forest on Tacaná Volcano"
						loading="lazy"
					/>
					<span class="lite-play" aria-hidden="true">
						<svg viewBox="0 0 68 48" width="68" height="48">
							<path
								class="lite-play-bg"
								d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.5C4 2.3 2.3 4.8 1.5 7.7.1 13 0 24 0 24s.1 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.5c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24s-.1-11-1.5-16.3z"
								fill="#000"
								opacity=".8"
							/>
							<path d="M45 24 27 14v20" fill="#fff" />
						</svg>
					</span>
				</button>
			{/if}
			<div class="film-copy">
				<p class="eyebrow">See us in the field</p>
				<h2>Get a sense of how we bird</h2>
				<p>
					This is us on a scouting trip up Tacaná Volcano, in search of one of the hardest birds in
					the Americas. It's a good look at who you'll actually be birding with, how we work, and the
					kind of ground we cover.
				</p>
				<p>Chasing weird calls, sharing bad jokes, and filming when we get the chance.</p>
			</div>
		</div>
	</div>
</section>

<!-- SPEAK TO ONE OF US -->
<section class="direct">
	<div class="wrap">
		<p class="eyebrow">No middle man</p>
		<h2>Speak to one of us directly</h2>
		<p class="sub">
			Pick whichever of us you'd rather talk to and the enquiry comes to them by name.
		</p>
		<div class="dgrid">
			{#each leadGuides as guide (guide.slug)}
				<a class="dcard" href="{base}/contact?guide={guide.slug}">
					{#if guide.avatar}
						<img src={guide.avatar} alt="" loading="lazy" />
					{/if}
					<span class="dtext">
						<span class="dname">{guide.name}</span>
						<span class="dwhere">{guide.tag}</span>
					</span>
					<span class="darrow" aria-hidden="true">→</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- VALUES -->
<section class="values">
	<div class="wrap">
		<p class="eyebrow">How we guide</p>
		<h2>The way we run a trip</h2>
		<p class="sub">
			Local knowledge, honest guiding, and a considered approach to the birds we've come to see.
		</p>
		<div class="vgrid">
			{#each guideValues as value (value.title)}
				<div class="vcard">
					<h3>{value.title}</h3>
					<p>{value.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.masthead {
		padding: 3.2rem 0 0.5rem;
	}
	.masthead h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(32px, 4.6vw, 48px);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-bottom: 1rem;
	}
	.masthead p {
		font-size: 19px;
		color: var(--stone);
		line-height: 1.65;
		max-width: 66ch;
	}

	.tier[hidden] {
		display: none;
	}

	/* Matches the trips page tab strip, so the two sub-navs on the site behave and
	   read the same way. */
	.tabs {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.8rem;
		margin-top: 2rem;
	}
	.tab {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: left;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 5px;
		padding: 0.9rem 1.1rem;
		cursor: pointer;
		transition:
			border-color 0.16s,
			background 0.16s;
	}
	.tab:hover {
		border-color: var(--canopy);
	}
	.tab.on {
		background: var(--ink);
		border-color: var(--ink);
	}
	.t-label {
		font-family: var(--display);
		font-size: 19px;
		color: var(--ink);
		line-height: 1.15;
	}
	.tab.on .t-label {
		color: #fff;
	}
	.t-blurb {
		font-size: 13px;
		line-height: 1.45;
		color: var(--stone);
	}
	.tab.on .t-blurb {
		color: rgba(255, 255, 255, 0.66);
	}

	/* The wider team: a card, not a block. Deliberately lighter than a lead
	   guide — no fact cards, no quotes — because the difference in weight is
	   what tells you who leads your trip. */
	.wider {
		padding: 2.8rem 0 1rem;
	}
	.wgrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}
	.wcard {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 8px;
	}
	/* Floated rather than given its own grid column. A column stretches to the
	   card's full height, and these are phone photos in portrait: at 190px wide
	   against a 500px card that crop threw away the bird in Andrea's hand. A
	   float keeps the picture at its own 4:5 shape and lets the bio close up
	   underneath it, so neither the photo nor the card carries dead space. */
	.wcard-img {
		float: left;
		width: 168px;
		aspect-ratio: 4/5;
		object-fit: cover;
		border-radius: 6px;
		background: var(--ink);
		margin: 0 1.2rem 0.6rem 0;
	}
	.wcard-body {
		padding: 1.4rem 1.5rem 1.5rem;
		overflow: hidden;
	}
	.wcard-body::after {
		content: '';
		display: block;
		clear: both;
	}
	.wcard h2 {
		font-family: var(--display);
		font-weight: 500;
		font-size: 22px;
		line-height: 1.15;
		margin-bottom: 0.15rem;
	}
	.wwhere {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.8rem;
	}
	.wcard-body p:not(.wwhere) {
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--stone);
		margin-bottom: 0.7rem;
	}
	.wlink {
		display: inline-block;
		margin-top: 0.4rem;
		font-weight: 700;
		font-size: 13.5px;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
	}
	.wlink:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	.guide {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 3rem;
		padding: 3.5rem 0;
		align-items: start;
	}
	.guide.flip .g-photo {
		order: 2;
	}
	.g-photo {
		position: sticky;
		top: calc(var(--header-h) + 1.5rem);
	}
	.g-photo img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		display: block;
	}
	.g-photo .tag {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #fff;
		background: rgba(22, 36, 31, 0.78);
		padding: 5px 11px;
		border-radius: 2px;
	}
	.g-name {
		font-family: var(--display);
		font-weight: 500;
		font-size: clamp(28px, 3.4vw, 38px);
		line-height: 1.05;
		margin-bottom: 0.2rem;
	}
	.g-role {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 1.3rem;
	}
	.g-bio p {
		margin-bottom: 1.1rem;
		color: var(--ink);
	}

	.facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.9rem;
		margin: 1.8rem 0 0;
	}
	.fact {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 6px;
		padding: 1rem 1.2rem;
	}
	.fact.wide {
		grid-column: 1/-1;
	}
	.fact .flbl {
		font-family: var(--mono);
		font-size: 9.5px;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--phwa);
		margin-bottom: 0.4rem;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.fact .fval {
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--ink);
	}
	.fact .fval :global(.sp) {
		font-style: italic;
		color: var(--canopy);
	}

	.g-reviews {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.6rem 2rem;
		margin: 0 0 1rem;
		align-items: start;
	}
	.g-review {
		border-left: 3px solid var(--phwa);
		padding: 0.3rem 0 0.3rem 1.3rem;
	}
	.g-review p {
		font-family: var(--display);
		font-style: italic;
		font-size: 15.5px;
		line-height: 1.55;
		color: var(--ink);
		margin-bottom: 0.4rem;
	}
	.g-review .who {
		font-family: var(--mono);
		font-style: normal;
		font-size: 11px;
		color: var(--stone);
		letter-spacing: 0.03em;
	}

	.divider {
		height: 1px;
		background: var(--rule);
		margin: 0;
	}

	.film {
		background: var(--ink);
		color: var(--mist);
		padding: 4.5rem 0;
	}
	.film-grid {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 3rem;
		align-items: center;
	}
	.film h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(26px, 3.2vw, 38px);
		color: #fff;
		line-height: 1.15;
		margin-bottom: 1rem;
	}
	.film p {
		color: rgba(255, 255, 255, 0.75);
		font-size: 16px;
		line-height: 1.65;
		margin-bottom: 1rem;
	}
	.lite-yt {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		cursor: pointer;
		overflow: hidden;
		border-radius: 8px;
		aspect-ratio: 16/9;
		background: #000;
	}
	.lite-thumb {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition:
			transform 0.4s,
			filter 0.3s;
	}
	.lite-yt:hover .lite-thumb {
		transform: scale(1.03);
		filter: brightness(0.9);
	}
	.lite-play {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
	.lite-play svg {
		filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
		transition: transform 0.2s;
	}
	.lite-yt:hover .lite-play svg {
		transform: scale(1.1);
	}
	.lite-play-bg {
		transition:
			fill 0.2s,
			opacity 0.2s;
	}
	.lite-yt:hover .lite-play-bg {
		fill: #d6446f;
		opacity: 1;
	}
	.lite-yt iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.direct {
		padding: 4.5rem 0;
		background: var(--paper);
	}
	.direct h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(24px, 3vw, 34px);
		margin-bottom: 0.6rem;
	}
	.direct .sub {
		color: var(--stone);
		max-width: 56ch;
		margin-bottom: 2.2rem;
	}
	.dgrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.2rem;
	}
	.dcard {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 8px;
		padding: 1.1rem 1.3rem;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.16s,
			transform 0.16s;
	}
	.dcard:hover {
		border-color: var(--canopy);
		transform: translateY(-2px);
	}
	.dcard img {
		width: 76px;
		height: 95px;
		border-radius: 6px;
		object-fit: cover;
		flex-shrink: 0;
	}
	.dtext {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
	}
	.dname {
		font-family: var(--display);
		font-size: 20px;
		line-height: 1.15;
	}
	.dwhere {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
	}
	.darrow {
		font-size: 18px;
		color: var(--canopy);
		flex-shrink: 0;
	}
	.dcard:hover .darrow {
		color: var(--phwa);
	}

	.values {
		background: var(--mist);
		padding: 4.5rem 0;
	}
	.values h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(24px, 3vw, 34px);
		margin-bottom: 0.6rem;
	}
	.values .sub {
		color: var(--stone);
		margin-bottom: 2.4rem;
		max-width: 60ch;
	}
	.vgrid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}
	.vcard {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 6px;
		padding: 1.6rem 1.7rem;
	}
	.vcard h3 {
		font-family: var(--display);
		font-weight: 500;
		font-size: 20px;
		margin-bottom: 0.6rem;
	}
	.vcard p {
		font-size: 14.5px;
		color: var(--stone);
		line-height: 1.6;
	}

	@media (max-width: 820px) {
		.guide,
		.film-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.guide.flip .g-photo {
			order: 0;
		}
		.g-photo {
			position: static;
		}
		.vgrid,
		.wgrid,
		.dgrid,
		.tabs {
			grid-template-columns: 1fr;
		}
		.tabs {
			gap: 0.6rem;
		}
		.film-grid .film-copy {
			order: 2;
		}
	}
	@media (max-width: 520px) {
		.facts {
			grid-template-columns: 1fr;
		}
		/* On a phone a 168px float leaves about twenty characters beside it, so the
		   photo goes full width and the bio runs underneath. */
		.wcard-img {
			float: none;
			width: 100%;
			aspect-ratio: 3/2;
			margin: 0 0 1rem;
		}
	}
</style>
