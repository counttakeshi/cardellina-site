<script lang="ts">
	import { asset } from '$lib/ledger';
	import { base } from '$app/paths';
	import { headliners, tripTeasers, guides, warblers, reviews, principles } from '$lib/data/home';

	const HERO_IMG = asset('images/sabes_aves_pink-headed_warbler-A0xjy2JlD8TLpRLX-full.webp');
	const GOOGLE_REVIEWS_URL = 'https://share.google/P1kf5lWkcsJoRDRXU';

	let videoPlaying = $state(false);
	let revTrack = $state<HTMLDivElement | null>(null);

	function scrollReviews(direction: 1 | -1) {
		if (!revTrack) return;
		const card = revTrack.querySelector('.rev');
		const step = card ? card.getBoundingClientRect().width + 19 : 350;
		revTrack.scrollBy({ left: step * direction, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Cardellina Birdwatching Tours in Chiapas | Cardellina - Chiapas Birding Tours</title>
	<meta
		name="description"
		content="Nearly 700 species and more than forty endemics and near-endemics. Small-group and bespoke birding tours across Chiapas, guided by two obsessives who live here."
	/>
</svelte:head>

<!-- ═══ HERO ═══ -->
<header class="hero" style="--hero-img: url('{HERO_IMG}')">
	<div class="wrap hero-inner">
		<p class="eyebrow">Chiapas · Southern Mexico</p>
		<h1>Mexico's most unique birding, <em>off the beaten track</em>.</h1>
		<p>
			700 species in one state, with Mexican endemics, Central American highland specialities, and
			the stunning birds of the tropical lowlands. Guided by two passionate birders.
		</p>
		<div class="hero-actions">
			<a href="{base}/contact" class="btn btn-primary">Plan your trip</a>
			<a href="{base}/birds" class="btn btn-ghost">Explore the birds</a>
			<a class="hero-rating" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">
				<span class="stars">★★★★★</span> <b>5.0</b> · 51 Google reviews
			</a>
		</div>
	</div>
</header>

<!-- ═══ STATS ═══ -->
<section class="stats" aria-label="Chiapas by the numbers">
	<div class="wrap">
		<div class="stats-grid">
			<div class="stat">
				<div class="n">~700</div>
				<div class="l">Species recorded<br />in the state</div>
			</div>
			<div class="stat">
				<div class="n">40+</div>
				<div class="l">Endemics &amp;<br />near-endemics</div>
			</div>
			<div class="stat">
				<div class="n">0–4,060m</div>
				<div class="l">Sea level to the<br />summit of Tacaná</div>
			</div>
			<div class="stat">
				<div class="n">6</div>
				<div class="l">Major habitats, coast<br />to cloud forest</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ THE CASE ═══ -->
<section class="case" id="why-chiapas">
	<div class="wrap">
		<div class="case-head">
			<p class="eyebrow">The case for Chiapas</p>
			<h2>More than forty endemic and near-endemic birds</h2>
		</div>

		<!-- Three birds, each with a one-line reason it matters. The description
		     replaces both the habitat paragraph and the MX/NCA tag key, which
		     needed a legend to decode. -->
		<div class="headliners">
			{#each headliners as bird (bird.name)}
				<a class="hl" href={base + bird.href}>
					<span class="hl-img"><img src={bird.img} alt={bird.name} loading="lazy" /></span>
					<span class="hl-name">{bird.name}</span>
					<span class="hl-sci">{bird.sci}</span>
					<span class="hl-blurb">{bird.blurb}</span>
				</a>
			{/each}
		</div>

		<a class="library-cta" href="{base}/birds">
			<span class="lc-text">
				<strong>Explore our complete Chiapas bird list</strong>
				<span>Every endemic and speciality worth travelling for, with an interactive map of where
					to find them.</span>
			</span>
			<span class="lc-go" aria-hidden="true">→</span>
		</a>
	</div>
</section>

<!-- ═══ TRIPS ═══ -->
<section class="trips" id="trips">
	<div class="wrap">
		<div class="trips-head">
			<p class="eyebrow">Trips</p>
			<h2>From a single morning to a full expedition</h2>
			<p class="lede">
				Some people join us for a day, others for a fortnight across the whole state. Take one of
				the trips we already run, or tell us how long you have and which birds you're after and
				we'll build the route around it.
			</p>
		</div>

		<div class="trip-grid">
			{#each tripTeasers as card (card.title)}
				<article class="trip-card">
					<div class="strip">
						{#each card.strip as img (img.src)}
							<div><img src={img.src} alt={img.alt} loading="lazy" /></div>
						{/each}
					</div>
					<div class="trip-body">
						<h3>{card.title}</h3>
						<p>{card.body}</p>
						<a class="arrow-link" href={base + card.href}>{card.cta}</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ═══ GUIDES ═══ -->
<section class="guides" id="guides">
	<div class="wrap">
		<div class="guides-lead">
			<div class="guides-head">
				<p class="eyebrow">Your guides</p>
				<h2>Two obsessive birders</h2>
				<p class="lede">
					Based in Chiapas, with an unhealthy preoccupation with identification and a soft spot
					for the difficult birds. We're colleagues and great friends.
				</p>
				<p class="proof">
					Between us: four languages, years of birding and guiding across Latin America, and
					personal Chiapas lists of around <em>600 species each</em> — from a state total of about
					700.
				</p>
				<a class="guides-link" href="{base}/guides">Meet us properly →</a>
			</div>
			<figure class="guides-shot">
				<img
					src={asset('images/ben-cloud-forest-full.webp')}
					alt="Ben listening for a bird in bromeliad-covered highland forest"
					loading="lazy"
				/>
			</figure>
		</div>

		<div class="guide-grid">
			{#each guides as guide (guide.name)}
				<article class="guide">
					<img class="portrait" src={guide.portrait} alt={guide.name} loading="lazy" />
					<div class="guide-body">
						<div class="nm">{guide.name}</div>
						<div class="role">{guide.role}</div>
						<p>{guide.bio}</p>
						<div class="super">Superpower · <b>{guide.superpower}</b></div>
					</div>
				</article>
			{/each}
		</div>

		<div class="film">
			{#if videoPlaying}
				<div class="lite-yt">
					<iframe
						src="https://www.youtube-nocookie.com/embed/dKPXRY2PC8U?autoplay=1&rel=0"
						title="In search of the Horned Guan on Tacaná"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			{:else}
				<button
					class="lite-yt"
					onclick={() => (videoPlaying = true)}
					aria-label="Play video: see us in the field"
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
				<h3>See us in the field</h3>
				<p>
					A scouting trip up Tacaná Volcano after the Horned Guan, one of the most sought-after
					birds in the Americas. The best look you'll get at how we work, the ground we cover, and
					who you'd actually be birding with.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ═══ REVIEWS ═══ -->
<section class="reviews" id="reviews">
	<div class="wrap">
		<div class="rev-head">
			<div class="g-badge">
				<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
					<path
						fill="#4285F4"
						d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
					/>
					<path
						fill="#34A853"
						d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
					/>
					<path
						fill="#FBBC05"
						d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
					/>
					<path
						fill="#EA4335"
						d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
					/>
				</svg>
				<span>Google Reviews</span>
			</div>
			<div class="rev-score">
				<b>5.0</b> <span class="stars">★★★★★</span> <span class="rev-count">51 reviews</span>
			</div>
		</div>

		<div class="rev-track" bind:this={revTrack}>
			{#each reviews as review (review.name)}
				<div class="rev">
					<div class="rev-who">
						<span class="av">{review.initials}</span><span class="rev-name">{review.name}</span>
					</div>
					<span class="stars">★★★★★</span>
					<blockquote>{review.text}</blockquote>
				</div>
			{/each}
		</div>

		<div class="rev-controls">
			<button class="rev-btn" onclick={() => scrollReviews(-1)} aria-label="Previous reviews">←</button>
			<button class="rev-btn" onclick={() => scrollReviews(1)} aria-label="Next reviews">→</button>
			<a class="rev-all" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">
				Read all 51 on Google →
			</a>
		</div>
	</div>
</section>

<!-- ═══ WHY CARDELLINA ═══ -->
<section class="genus">
	<div class="wrap">
		<div class="genus-grid">
			<figure class="genus-mark">
				<img
					src={asset('images/cardellina-logo-r-ouLe0QMSi7BFi1G9-md.webp')}
					alt="The Cardellina Birding Tours logo: three Cardellina warblers"
					loading="lazy"
				/>
				<figcaption>Red Warbler · Red-faced Warbler · Pink-headed Warbler</figcaption>
			</figure>

			<div>
				<p class="eyebrow">Why "Cardellina"</p>
				<h2>Four of the five live here</h2>
				<p class="lede">
					<em>Cardellina</em> is a genus of five warblers, and four of them occur in Chiapas,
					including the Pink-headed Warbler, which is found almost nowhere else. The three on our
					logo reflect our team.
				</p>

				<ul class="warblers">
					{#each warblers as w (w.name)}
						<li>
							<span class="dot"></span>
							<div>
								<span class="nm">{w.name}</span><span class="sci">{w.sci}</span>
								<p class="rl">{@html w.role}</p>
							</div>
						</li>
					{/each}
				</ul>

				<p class="genus-foot">
					The remaining two, Wilson's and Canada Warbler, pass through Chiapas on migration each
					year.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ═══ HOW WE BIRD ═══ -->
<section class="how">
	<div class="wrap">
		<div class="how-grid">
			<div>
				<p class="eyebrow">In the field</p>
				<h2>How we like to bird</h2>
				<p class="lede">
					A few things matter to us beyond the birds themselves, mainly how we treat the places we
					visit, the people who live there, and our guests.
				</p>
				<ul class="principles">
					{#each principles as p (p)}
						<li>{p}</li>
					{/each}
				</ul>
			</div>
			<figure class="how-img">
				<img
					src={asset('images/customer-birding-with-sabes-aves-and-valente-A85E1ZjQr2IV3DBy-full.webp')}
					alt="Valente watching a guest get onto a bird in the highlands"
					loading="lazy"
				/>
				<figcaption>Valente with a guest, above San Cristóbal</figcaption>
			</figure>
		</div>
	</div>
</section>

<style>
	/* ═══ HERO ═══ */
	.hero {
		position: relative;
		min-height: clamp(460px, 54vw, 720px);
		display: flex;
		align-items: flex-end;
		background:
			linear-gradient(
				180deg,
				rgba(22, 36, 31, 0.55) 0%,
				rgba(22, 36, 31, 0.35) 35%,
				rgba(22, 36, 31, 0.94) 100%
			),
			var(--hero-img) 0% center/cover no-repeat;
		background-color: var(--ink);
		background-size: auto, 150%;
	}

	.hero-inner {
		padding-bottom: 4rem;
		padding-top: 9.5rem;
		width: 100%;
	}

	.hero h1 {
		font-family: var(--display);
		font-weight: 300;
		font-size: clamp(38px, 6vw, 72px);
		line-height: 1.04;
		letter-spacing: -0.025em;
		color: var(--white);
		max-width: 15ch;
		margin-bottom: 1.6rem;
	}
	.hero h1 :global(em) {
		font-style: italic;
		font-weight: 400;
	}

	.hero p {
		font-size: clamp(17px, 1.5vw, 20px);
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.82);
		max-width: 54ch;
		margin-bottom: 2.2rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.4rem;
	}

	.hero-rating {
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.72);
	}
	.hero-rating b {
		color: #fff;
		font-weight: 700;
	}
	.hero-rating:hover {
		color: #fff;
	}

	/* ═══ STATS BAND ═══ */
	.stats {
		background: var(--ink);
		border-top: 1px solid rgba(255, 255, 255, 0.09);
		padding: 0;
	}
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
	.stat {
		padding: 2.1rem 1.5rem;
		border-right: 1px solid rgba(255, 255, 255, 0.09);
	}
	.stat:last-child {
		border-right: none;
	}
	.stat .n {
		font-family: var(--display);
		font-size: 34px;
		font-weight: 400;
		color: #fff;
		line-height: 1.05;
		margin-bottom: 0.45rem;
		letter-spacing: -0.01em;
	}
	/* The last stat used to be a long phrase and needed shrinking; now it is a
	   numeral like the others, so it keeps the same size. */
	.stat .l {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--moss);
		line-height: 1.5;
	}

	/* ═══ THE CASE ═══ */
	.case {
		background: var(--white);
	}
	.case-head {
		max-width: 66ch;
		margin-bottom: 2.8rem;
	}
	.case-head h2 {
		margin-bottom: 1.1rem;
	}

	.headliners {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.6rem;
		margin-bottom: 2rem;
	}
	.hl {
		display: block;
		text-decoration: none;
	}
	.hl-img {
		display: block;
		aspect-ratio: 4/3;
		border-radius: 4px;
		overflow: hidden;
		background: var(--ink);
		margin-bottom: 0.85rem;
	}
	.hl-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.hl:hover .hl-img img {
		transform: scale(1.05);
	}
	.hl-name {
		display: block;
		font-family: var(--display);
		font-weight: 500;
		font-size: 21px;
		line-height: 1.2;
		color: var(--ink);
	}
	.hl:hover .hl-name {
		color: var(--phwa);
	}
	.hl-sci {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		font-style: italic;
		color: var(--stone);
		margin: 2px 0 0.5rem;
	}
	.hl-blurb {
		display: block;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--stone);
	}

	/* Sits directly under the birds with no rule between them: it is the same
	   thought continued, not a new section. */
	.library-cta {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		background: var(--ink);
		border-radius: 8px;
		padding: 1.4rem 1.7rem;
		text-decoration: none;
		transition:
			background 0.18s ease,
			transform 0.18s ease;
	}
	.library-cta:hover {
		background: #1d3129;
		transform: translateY(-2px);
	}
	.lc-text strong {
		display: block;
		font-family: var(--display);
		font-weight: 500;
		font-size: 21px;
		color: #fff;
		margin-bottom: 0.2rem;
	}
	.lc-text span {
		display: block;
		font-size: 14.5px;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.72);
		max-width: 62ch;
	}
	.lc-go {
		margin-left: auto;
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--phwa);
		color: #fff;
		font-size: 20px;
		transition: transform 0.18s ease;
	}
	.library-cta:hover .lc-go {
		transform: translateX(3px);
	}

	@media (max-width: 760px) {
		.headliners {
			grid-template-columns: 1fr;
			gap: 1.8rem;
		}
		.library-cta {
			flex-wrap: wrap;
			gap: 1rem;
		}
		.lc-go {
			margin-left: 0;
		}
	}





	/* ═══ TRIPS ═══ */
	.trips {
		background: var(--paper);
	}
	.trips-head {
		margin-bottom: 2.6rem;
		max-width: 62ch;
	}
	.trips-head h2 {
		margin-bottom: 0.9rem;
	}

	.trip-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.trip-card {
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}
	.trip-card:hover {
		border-color: var(--canopy);
		transform: translateY(-2px);
	}

	.strip {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--rule);
		height: 132px;
	}
	.strip div {
		overflow: hidden;
	}
	.strip img {
		width: 100%;
		height: 132px;
		object-fit: cover;
		transition: transform 0.35s ease;
	}
	.trip-card:hover .strip img {
		transform: scale(1.06);
	}

	.trip-body {
		padding: 1.5rem 1.6rem 1.7rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.trip-body h3 {
		font-size: 26px;
		margin-bottom: 0.7rem;
	}
	.trip-body p {
		font-size: 15.5px;
		color: var(--stone);
		line-height: 1.65;
		margin-bottom: 1.4rem;
		flex: 1;
	}

	/* ═══ GUIDES ═══ */
	.guides {
		background: var(--ink);
		color: var(--mist);
	}
	.guides h2 {
		color: #fff;
		margin-bottom: 1rem;
	}
	.guides :global(.lede) {
		color: rgba(255, 255, 255, 0.68);
	}
	/* The copy used to sit alone at 64ch, leaving most of a dark band empty —
	   which reads as the page ending rather than as a section. The photograph
	   now fills that half, and bleeds off the right edge so the band opens on an
	   image instead of on space. */
	.guides-lead {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
		gap: 3rem;
		align-items: center;
		margin-bottom: 3.5rem;
	}
	.guides-head {
		max-width: 54ch;
	}
	.proof {
		font-size: 15px;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.6);
		border-left: 2px solid var(--phwa);
		padding-left: 1rem;
		margin: 1.4rem 0 1.6rem;
	}
	.proof em {
		color: rgba(255, 255, 255, 0.85);
	}
	.guides-link {
		display: inline-block;
		font-weight: 700;
		font-size: 15px;
		color: #fff;
		text-decoration: none;
		border-bottom: 1.5px solid var(--phwa);
		padding-bottom: 3px;
		transition: color 0.18s;
	}
	.guides-link:hover {
		color: var(--phwa);
	}
	.guides-shot {
		margin: 0;
		border-radius: 4px;
		overflow: hidden;
	}
	.guides-shot img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		max-height: 460px;
		object-fit: cover;
	}

	.guide-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.guide {
		display: grid;
		grid-template-columns: 152px minmax(0, 1fr);
		gap: 1.4rem;
		align-items: start;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.11);
		border-radius: 3px;
		padding: 1.5rem;
	}
	/* 4:5 rather than a circle: the crop that keeps the bins, the scope and the
	   habitat, all of which do more selling than the face alone. */
	.portrait {
		width: 152px;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		border-radius: 3px;
		background: var(--canopy);
	}
	.guide .nm {
		font-family: var(--display);
		font-size: 22px;
		color: #fff;
		line-height: 1.2;
	}
	.guide .role {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--phwa);
		margin-top: 3px;
	}
	.guide p {
		font-size: 15px;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.72);
		margin: 0.9rem 0 1.1rem;
	}
	.guide .super {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		color: var(--moss);
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.11);
	}
	.guide .super b {
		color: var(--mist);
		font-weight: 500;
	}

	/* film / lite YouTube embed */
	.film {
		border: 1px solid rgba(255, 255, 255, 0.11);
		border-radius: 3px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.04);
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		align-items: center;
	}
	.film-copy {
		padding: 2rem 2.2rem;
	}
	.film-copy h3 {
		color: #fff;
		margin-bottom: 0.7rem;
		font-size: 24px;
	}
	.film-copy p {
		font-size: 15.5px;
		color: rgba(255, 255, 255, 0.68);
		line-height: 1.7;
	}

	.lite-yt {
		position: relative;
		display: block;
		width: 100%;
		aspect-ratio: 16/9;
		background: #000;
		padding: 0;
		border: 0;
		cursor: pointer;
		overflow: hidden;
	}
	.lite-thumb {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition:
			transform 0.4s ease,
			filter 0.3s ease;
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
		transition: transform 0.2s ease;
	}
	.lite-play-bg {
		transition:
			fill 0.2s ease,
			opacity 0.2s ease;
	}
	.lite-yt:hover .lite-play svg {
		transform: scale(1.1);
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

	/* ═══ WHY CARDELLINA ═══ */
	.genus {
		background: var(--paper);
	}
	.genus-grid {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 4.5rem;
		align-items: center;
	}
	.genus-mark img {
		width: 100%;
		max-width: 290px;
	}
	.genus-mark figcaption {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		color: var(--stone);
		text-align: center;
		margin-top: 1rem;
		line-height: 1.7;
	}
	.genus h2 {
		margin-bottom: 1rem;
	}
	.genus :global(.lede) {
		margin-bottom: 2rem;
	}

	.warblers {
		list-style: none;
		margin: 0;
	}
	.warblers li {
		display: grid;
		grid-template-columns: 8px 1fr;
		gap: 1rem;
		padding: 1.05rem 0;
		border-top: 1px solid var(--rule);
		align-items: start;
	}
	.warblers li:last-child {
		border-bottom: 1px solid var(--rule);
	}
	.warblers .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-top: 9px;
	}
	.warblers li:nth-child(1) .dot {
		background: #e8a0bc;
	}
	.warblers li:nth-child(2) .dot {
		background: #c0392b;
	}
	.warblers li:nth-child(3) .dot {
		background: #9b1b12;
	}
	.warblers .nm {
		font-family: var(--display);
		font-size: 18px;
		font-weight: 500;
	}
	.warblers .sci {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
		margin-left: 7px;
	}
	.warblers .rl {
		font-size: 15px;
		color: var(--stone);
		line-height: 1.6;
		margin-top: 2px;
	}
	.warblers .rl :global(b) {
		color: var(--ink);
		font-weight: 700;
	}

	.genus-foot {
		font-size: 14.5px;
		color: var(--stone);
		margin-top: 1.5rem;
		font-style: italic;
		line-height: 1.6;
	}

	/* ═══ REVIEWS ═══ */
	.reviews {
		background: var(--mist);
		overflow: hidden;
	}
	.rev-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
	}
	.g-badge {
		display: flex;
		align-items: center;
		gap: 9px;
		font-family: 'Roboto', var(--body);
		font-size: 18px;
		font-weight: 500;
		color: #3c4043;
	}
	.rev-score {
		display: flex;
		align-items: center;
		gap: 9px;
	}
	.rev-score b {
		font-family: 'Roboto', var(--body);
		font-size: 26px;
		font-weight: 500;
		color: #3c4043;
	}
	.rev-score :global(.stars) {
		color: #fbbc04;
		font-size: 17px;
		letter-spacing: 1px;
	}
	.rev-count {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--stone);
	}

	.rev-track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(330px, 1fr);
		gap: 1.2rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		padding-bottom: 0.5rem;
		scrollbar-width: none;
	}
	.rev-track::-webkit-scrollbar {
		display: none;
	}
	.rev {
		scroll-snap-align: start;
		background: var(--white);
		border: 1px solid #e4e4e4;
		border-radius: 8px;
		padding: 1.6rem 1.7rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
	}
	.rev-who {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 0.9rem;
	}
	.rev .av {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: var(--canopy);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 500;
		flex-shrink: 0;
		font-family: 'Roboto', var(--body);
	}
	.rev-name {
		font-family: 'Roboto', var(--body);
		font-size: 14px;
		font-weight: 500;
		color: #3c4043;
	}
	.rev :global(.stars) {
		color: #fbbc04;
		letter-spacing: 1px;
		font-size: 15px;
		margin-bottom: 0.7rem;
		display: block;
	}
	.rev blockquote {
		font-family: 'Roboto', var(--body);
		font-size: 15px;
		line-height: 1.65;
		font-weight: 400;
		color: #3c4043;
	}

	.rev-controls {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: 1.6rem;
	}
	.rev-btn {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: 1px solid #cfd4cc;
		background: var(--white);
		font-size: 17px;
		color: var(--canopy);
		cursor: pointer;
		transition:
			background 0.16s,
			border-color 0.16s;
	}
	.rev-btn:hover {
		background: #fff;
		border-color: var(--canopy);
	}
	.rev-all {
		margin-left: auto;
		font-family: var(--body);
		font-size: 14px;
		font-weight: 700;
		color: var(--canopy);
		text-decoration: none;
		border-bottom: 1.5px solid var(--canopy);
		padding-bottom: 2px;
	}
	.rev-all:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	/* ═══ HOW WE BIRD ═══ */
	.how {
		background: var(--mist);
	}
	.how-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}
	.how h2 {
		margin-bottom: 1.2rem;
	}
	.how :global(.lede) {
		margin-bottom: 2rem;
	}
	.principles {
		list-style: none;
	}
	.principles li {
		padding: 0.85rem 0 0.85rem 1.6rem;
		border-top: 1px solid var(--rule);
		font-size: 16px;
		line-height: 1.6;
		position: relative;
	}
	.principles li:last-child {
		border-bottom: 1px solid var(--rule);
	}
	.principles li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 1.45rem;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--phwa);
	}
	.how-img img {
		width: 100%;
		border-radius: 3px;
	}
	.how-img figcaption {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
		margin-top: 0.7rem;
		letter-spacing: 0.04em;
	}

	/* ═══ RESPONSIVE ═══ */
	@media (max-width: 900px) {
		.hero {
			background-position:
				100% center,
				50% center;
			background-size: auto, cover;
			min-height: clamp(420px, 90vw, 560px);
		}
		.stats-grid {
			grid-template-columns: 1fr 1fr;
		}
		.stat:nth-child(2) {
			border-right: none;
		}
		.stat:nth-child(1),
		.stat:nth-child(2) {
			border-bottom: 1px solid rgba(255, 255, 255, 0.09);
		}
		.guides-lead {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.trip-grid,
		.guide-grid,
		.how-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.genus-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.genus-mark {
			max-width: 240px;
			margin: 0 auto;
		}
		.film {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 560px) {
		.guide {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		.portrait {
			width: 100%;
			max-width: 220px;
			aspect-ratio: 5 / 4;
			object-position: 50% 25%;
		}

		.strip,
		.strip img {
			height: 100px;
		}
		.stats-grid {
			grid-template-columns: 1fr;
		}
		.stat {
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.09);
		}
	}
</style>
