# PR 1: SEO groundwork, parts A to C

Branch `seo-groundwork`, from `main` at `231b882`. Technical only. No copy was
written: every place copy belongs is an empty field with a `COPY:` comment
saying what goes there, so `grep -rn "COPY:" src/` finds every gap.

`gh` is not installed on this machine, so this file is the pull request
description. Open the PR at:
https://github.com/counttakeshi/cardellina-site/compare/main...seo-groundwork

---

## What changed, task by task

### Part A: head tags, canonicals and social previews

| | |
|---|---|
| **A1** | `SITE_ORIGIN`, `BRAND_NAME`, `PHONE`, `WHATSAPP_URL`, `SOCIAL_PROFILES` in `config.ts`. `PHONE` takes over the literal `WHATSAPP_DISPLAY` held, so the number exists once. |
| **A2** | `Seo.svelte` replaces the hand-written `<svelte:head>` on all twelve routes. Canonical, Open Graph, `twitter:card`, JSON-LD slot, `alternates` slot for the Spanish pages. Titles and descriptions pass through byte-identical. |
| **A3** | Optional `seoTitle` / `metaDescription` on tours, accounts, trip reports, and a map for the fixed pages. Empty keeps today's wording exactly. |
| **A4** | `scripts/make-og.mjs` builds twenty 1200x630 JPEGs into `static/og/`. One per tour, account and report, plus a default. |
| **A5** | Adapter fallback set to `404.html`; `+error.svelte` with "Page not found" and links to Trips, Bird Library and Contact. |
| **A6** | `static/muni/index.html` is now `noindex`. |

### Part B: structured data

52 blocks across 28 pages, all validating.

| | |
|---|---|
| **B1** | `WebSite` and `TravelAgency` on the homepage. `alternateName` carries "Sabes Aves". |
| **B2** | `BreadcrumbList` on every page but the homepage, from the same source as the visible trail. |
| **B3** | `TouristTrip` on all ten tours, `Offer` on the six day tours, `itinerary` on the four routes. |
| **B4** | `Article` on four accounts and five reports, with `citation` built from each page's sources. |
| **B5** | `Person` for each of the four guides. |
| **B6** | No `FAQPage`, deliberately. Google stopped showing FAQ rich results on 7 May 2026. |
| **B7** | `npm run seo:jsonld` parses every block and fails on malformed JSON, a missing required property, or an unescaped `<`. |

**No `aggregateRating` or `review` markup.** Google's review snippet guidance
says a page where the business controls the reviews about itself is ineligible,
and that ratings must not be aggregated from other sites. The homepage reviews
are ours, copied from Google and Tripadvisor, which is the pattern the guidance
names.

### Part C: crawlable links, images and measurement

| | |
|---|---|
| **C1** | All three `/trips` panels render, inactive ones `hidden`. The four routes were invisible to crawlers: their links lived in a branch that never ran at build time. |
| **C2** | The four routes by name on the homepage. |
| **C3** | Each account's CTA points at the tour its own copy already names. Wording unchanged. |
| **C4** | Related-link blocks on tours, accounts and reports, plus a visible breadcrumb trail. |
| **C5** | Footer links to all six sections. |
| **C6** | All 205 images declare width and height; alt text comes from the ledger where it knows the subject; 176 images in the sitemap; two audit CSVs. **One bullet outstanding, see below.** |
| **C7** | Optional "How did you find us?" on every enquiry kind. |
| **C8** | `enquiry_submit`, `whatsapp_click`, `email_click`, `phone_click` to Clarity, under the existing consent logic. |
| **C9** | WhatsApp beside the booking button on every tour page, prefilled with the tour name. |
| **C10** | Sitemap excludes noindex pages and takes `lastmod` from each page's own date. |
| **C11** | IndexNow key committed; workflow job submits the live sitemap after a successful deploy on the custom domain. |
| **C12** | `npm run seo:report` and `npm run seo:links`. |

---

## Not done

**C6, the three CSS-background heroes** on `/`, `/trips` and `/trip-reports`
are still CSS backgrounds. Converting them to `<img>` is meant to produce no
visible change, and the brief rightly asks for before and after screenshots at
390px and 1440px to prove it. That needs a running preview server, which was
not available. Everything else in C6 is done.

**Before and after screenshots** for the same reason. The text diff below is
the substitute, and it is stronger for the things it covers: it compares every
word on every page rather than a few viewports.

---

## Text diff against the baseline

`docs/seo/baseline/` holds the visible text of all 28 pages built from `main`
before any change. `node scripts/page-text.mjs docs/seo/after` rebuilds it for
comparison.

**283 lines added, 10 replaced, 0 lost.** All ten replacements are the tour
booking button gaining "WhatsApp" on the same line.

Every addition is accounted for:

| Change | Pages | What appears |
|---|---|---|
| Breadcrumb trail (C4) | 27 | `Home › Trips › Palenque` |
| Footer sections (C5) | 28 | `Trips Bird Library Trip Reports Guides Partners Contact` |
| Hidden panels (C1) | `/trips` | 82 lines: the four routes and the builder |
| Route names (C2) | `/` | four route names |
| Related links (C4) | tours, accounts, reports | the blocks listed below |
| Referral select (C7) | `/contact`, `/trips` | ten options |
| WhatsApp (C9) | 10 tour pages | one word |
| New page (A5) | `/404` | the error page |

Parts A and B changed **nothing** visible: A1 through B7 each verified against
the baseline with an empty diff.

---

## `npm run seo:links`

```
seo:links: 60 files, 27 in the sitemap, reached 28 from /

Orphans (in the sitemap, nothing links to them): 0
Broken internal links: 0
Links pointing at a redirect stub: 0
Pages more than 3 clicks from the homepage: 0

Deepest reached page: /trips/san-cristobal at 2 clicks
```

## `npm run seo:report`

Full table in `docs/seo/report.md`. It flags **31 things, all of them copy**,
and all fixable in the fields A3 added without touching a route:

- Four species account titles at 92 to 101 characters, and all four with **no
  meta description at all**.
- The homepage title at 77 characters; `/trips` 61; `/birds` 66.
- Five trip report titles between 65 and 78 characters.
- Eleven tour descriptions between 164 and 397 characters. These are the intro
  paragraphs standing in for a description, and Google cuts at about 160.

## Rich Results Test

Once this is on the live site, paste these into
https://search.google.com/test/rich-results

- https://www.cardellina.com/
- https://www.cardellina.com/trips/san-cristobal
- https://www.cardellina.com/trips/full-endemics
- https://www.cardellina.com/birds/horned-guan
- https://www.cardellina.com/trip-reports/tacana-volcano
- https://www.cardellina.com/guides

---

## Every heading and label added

All of these are renameable in one place each.

**Related-link block headings** (`src/lib/related.ts` call sites):
- Birds on this tour with full accounts
- Routes that include this site
- Trip reports from here
- Tours that look for this bird
- Trip reports
- The tour behind this report
- Birds in this report with full accounts

**Breadcrumb labels** (`src/lib/breadcrumbs.ts`), all words the site already
used: Home, Trips, Bird Library, Trip Reports, Guides, Partners, Contact, Plan
a trip, Privacy policy.

**Footer section links** (`Footer.svelte`), the nav's own labels: Trips, Bird
Library, Trip Reports, Guides, Partners, Contact.

**404 page** (`+error.svelte`): "Page not found", and Trips / Bird Library /
Contact.

**Form labels** (`ContactForm.svelte`): "How did you find us?" with the ten
options from the brief, verbatim.

**Tour pages** (`trips/[slug]`): "WhatsApp".

---

## Needs Ben

See `docs/seo/NEEDS-BEN.md`.

## New commands

```
npm run seo:jsonld    validate every JSON-LD block
npm run seo:report    write docs/seo/report.md
npm run seo:links     crawl for orphans and broken links
npm run seo:images    write the two image CSVs
node scripts/make-og.mjs        rebuild social previews after a hero changes
node scripts/image-sizes.mjs    remeasure after adding images
```
