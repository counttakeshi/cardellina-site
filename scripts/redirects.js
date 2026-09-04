/**
 * Old cardellina.com URLs → where they live on the new site.
 *
 * The old site was a Zyro build with a flat, keyword-shaped URL for every page.
 * Those URLs are indexed and ranking, so when the domain moves to GitHub Pages
 * each one has to keep resolving or the ranking goes with it.
 *
 * GitHub Pages cannot issue a 301 — it serves files and nothing else — so each
 * entry here becomes a small HTML stub carrying a canonical link and a
 * zero-delay meta refresh, which Google treats as a permanent move. See
 * scripts/postbuild.mjs.
 *
 * Every path is emitted twice, as `slug.html` and `slug/index.html`, because
 * the old WordPress at sabesaves.com spent months redirecting to the
 * trailing-slash form and those URLs are in the index too.
 */
export const redirects = {
	// ── top-level pages ──────────────────────────────────────────────────
	'/chiapas-birding-day-tours': '/trips#day',
	'/birdwatching-chiapas-multi-day-tours': '/trips#multi-day',
	'/birding-trips-in-chiapas-contact': '/contact',
	'/valente-and-ben': '/guides',
	'/partner-projects': '/partners',
	'/birds-of-chiapas': '/birds',
	'/chiapas-birdwatching-blog': '/trip-reports',
	// NB /privacy-policy is deliberately absent: the slug is identical on both
	// sites, so the real page already answers that URL. A stub here would
	// overwrite it with a page that redirects to itself.

	// ── bird accounts ────────────────────────────────────────────────────
	'/pink-headed-warbler': '/birds/pink-headed-warbler',
	'/horned-guan': '/birds/horned-guan',
	'/resplendent-quetzal': '/birds/resplendent-quetzal',
	'/rose-bellied-bunting': '/birds/rose-bellied-bunting',

	// ── day tours ────────────────────────────────────────────────────────
	'/san-cristobal-birding-day-tour': '/trips/san-cristobal',
	'/sumidero-canyon-birding-day-tour': '/trips/sumidero-canyon',
	'/palenque-birding-day-tour': '/trips/palenque',
	'/la-sepultura-birding-day-tour': '/trips/la-sepultura',
	'/montebello-lakes-birding-day-tour': '/trips/montebello-lakes',
	'/comitan-birding-day-tour': '/trips/comitan',

	// ── multi-day routes ─────────────────────────────────────────────────
	'/chiapas-highlights-birding-tour': '/trips/chiapas-highlights',
	'/volcano-endemics-birding-tour': '/trips/volcano-endemics',
	'/full-endemics-birding-tour': '/trips/full-endemics',
	'/lowland-jungles-birding-tour': '/trips/lowland-jungles',

	// ── trip reports ─────────────────────────────────────────────────────
	'/birding-trip-report-palenque-and-catazaja-region': '/trip-reports/palenque-and-catazaja',
	'/birding-trip-report-san-cristobal-full-day': '/trip-reports/san-cristobal-full-day',
	'/birding-trip-report-san-cristobal-to-montebello-2024':
		'/trip-reports/san-cristobal-to-montebello',
	'/northern-swamps-of-chiapas-day-1': '/trip-reports/northern-swamps',
	'/tacana-volcano-chiapas-2025': '/trip-reports/tacana-volcano',

	// The set-departure tour (1–10 March 2026, $3,250) has no equivalent yet.
	// Pointed at the multi-day panel so the URL keeps working; change this line
	// if the page is ever rebuilt.
	'/chiapas-birding-adventure-2026': '/trips#multi-day'
};

/**
 * Pages that only ever existed on the sabesaves.com WordPress. They are handled
 * here too because sabesaves.com forwards to this domain, so the old slug
 * arrives at cardellina.com and has to resolve.
 */
export const wordpressOnly = {
	'/faqs': '/contact',
	'/chiapas-coastline': '/trips',
	'/chiapas-birdwatching-guides': '/guides',
	'/chiapas-birdwatching-guide': '/guides'
};
