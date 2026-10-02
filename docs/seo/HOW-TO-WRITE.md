# Writing for the site

Everything in Part D is scaffolding: pages that exist, route correctly and are
invisible until you say otherwise. This is where each thing you write lives.

**The one rule worth knowing:** `status: draft` means a page is not built at
all. Not hidden, not noindexed — absent from the output, the sitemap, the nav
and every related-links block. You cannot publish something by accident. You
publish by changing one word.

## Finding the gaps

```sh
grep -rn "COPY:" src/
```

Every place a page is waiting for words, with a note saying what belongs there
and roughly how long. `npm run seo:report` counts them per page.

## Writing a page

Pages live in `src/content/` as Markdown with a YAML block on top.

```
src/content/chiapas/index.md              ->  /chiapas
src/content/chiapas/when-to-go.md         ->  /chiapas/when-to-go
src/content/mexico/index.md               ->  /mexico
src/content/birds/giant-wren.md           ->  /birds/giant-wren
src/content/tours/palenque.md             ->  extra sections on /trips/palenque
src/content/tour-companies-and-clubs.md   ->  /tour-companies-and-clubs
```

Write Markdown below the `---`. The headings are already there; delete the
`<!-- COPY: ... -->` comment as you replace it.

### To see a draft

```sh
PREVIEW_DRAFTS=1 npm run build && npm run preview
```

Drafts carry an orange flag and `noindex` so a preview build can never be
mistaken for the real thing.

### To publish

Change `status: draft` to `status: live`, then build. The page appears, joins
the sitemap, and if it is `/chiapas`, `/mexico` or the trade page, its nav item
appears with it.

Set `updated` to the date you last meaningfully changed it. The sitemap uses it
to tell search engines what is new, so a wrong date is worse than none.

## The fields

### Every page

| Field | What it does |
|---|---|
| `title` | The H1 |
| `seoTitle` | The `<title>`, ~50 characters. Empty uses `title` |
| `metaDescription` | The search result text, 150 to 160 characters |
| `status` | `draft` or `live` |
| `updated` | ISO date, e.g. `2026-10-14` |
| `author` | `valente` or `ben`. Omitted from the markup until filled |
| `sources` | See below |

Why `seoTitle` exists: the long brand tail is 38 characters of the 60 Google
shows, which leaves no room for a title written to be found. A filled
`seoTitle` gets the short tail instead.

### Species accounts

The quick-reference table is frontmatter. An empty row is not rendered, so fill
what you know and leave the rest.

```yaml
scientificName: "Campylorhynchus chiapensis"   # filled already, from species.ts
conservationStatus: ""                          # "Least Concern (IUCN)"
range: ""                                       # "The Pacific slope of Chiapas"
elevation: ""                                   # "0 m - 900 m"
bestMonths: ""                                  # "Year-round"
difficulty: ""                                  # "Easy. Common in the right habitat."
cta:
  text: ""                                      # one or two sentences
  href: "/trips/volcano-endemics"               # already the most specific tour
```

The hero photograph and its credit come from the ledger automatically when we
hold one. The monthly chart appears on its own once the phenology import has
been run.

### Sources

```yaml
sources:
  - title: "Species factsheet: Giant Wren"
    publisher: "BirdLife International"
    url: "https://datazone.birdlife.org/..."
    note: "What this is for. Notes to you, not the reader."
    verified: false
    accessed: "2026-10-02"
```

They render as a numbered list when `renderSources: true`, which is set on the
hub, guide, safety and species pages. It is `false` on the tour extensions,
where sources are your working notes.

Every scaffolded URL went in as `verified: false`. To check them:

```sh
node scripts/check-sources.mjs            # report
node scripts/check-sources.mjs --write    # record the results
```

It opens each one, one at a time with a pause, so 23 accounts take a couple of
minutes. The xeno-canto and BirdLife URLs were built from a naming pattern and
those two services use their own taxonomy, so expect some to fail. **Fix or
delete a failing URL.** A source a reader cannot open is worse than no source.

## Tours

Facts are TypeScript, in `src/lib/data/tourDetails.ts`. All optional, all
rendering nothing until filled:

```ts
bestMonths: "November to March",
difficulty: "Easy. Two to three hours walking on tracks.",
maxAltitudeM: 2400,
startTime: "05:30",
pickupPoints: ["San Cristóbal de las Casas, any hotel"],
whatToBring: ["Binoculars", "A warm layer for the first hour"],
fromPriceUsd: 1850,              // routes only; until filled they advertise no price
outsideAdvisoryAreas: true,      // only if you have checked it against the current advisories
```

Long-form sections go in `src/content/tours/<slug>.md`.

### A review

```ts
reviews: [
  {
    quote: "Exactly as written. Never tidied.",
    name: "Jane Smith",
    country: "UK",
    month: "March 2026",
    sourceUrl: "https://..."
  }
]
```

Quote verbatim. These are deliberately not marked up as structured data:
Google's guidance is that a business is ineligible for review stars on pages
where it controls the reviews about itself, so marking them up risks a penalty
for a snippet we would not get.

The homepage reviews in `src/lib/data/home.ts` take the same `tours`, `month`,
`country` and `sourceUrl`. Only Peter Standring's has `tours` filled, because
his review names Palenque; the rest need you.

### A group departure

```ts
groupDepartures: [
  { start: "2027-02-14", end: "2027-02-22", priceUsd: 2950, seats: 8, seatsLeft: 3, status: "open" }
]
```

`status` is `open`, `nearly full`, `full` or `cancelled`. The page grows a
dates table and the structured data gains one dated offer per departure,
replacing the from-price.

### Hit rates

`src/lib/data/hitRates.ts`, then set `hitRates: true` on the tour.

```ts
{ tour: "volcano-endemics", species: "Horned Guan", outingsWithSpecies: 11, outings: 14, period: "2023-2026" }
```

This is the most convincing thing the site could say and the one number a
reader will hold you to. Use real counts or leave it empty.

## Phenology

Export a CSV with these columns:

```
species_code, common_name, scientific_name, month, frequency, n_checklists
```

`month` 1 to 12, `frequency` 0 to 1, `n_checklists` the sample behind it.

```sh
node scripts/import-phenology.mjs birds.csv --source "eBird Basic Dataset, Jun 2026"
```

Pass `--source` so the chart can cite what it is drawing. Months with fewer
than ten checklists are drawn paler with a note, because a frequency from two
checklists is not a fact.

## The reports

```sh
npm run seo:report    # titles, descriptions, h1, word counts, links, COPY gaps
npm run seo:links     # orphans, broken links, redirect hops, pages buried deep
npm run seo:jsonld    # validates every structured data block
npm run seo:images    # the image audit and the rename proposal
```

Run `seo:report` after writing. It currently flags 31 things, all copy, and it
is the shortest useful to-do list on this project.

## After adding images

```sh
node scripts/image-sizes.mjs    # remeasure, so every img declares its shape
node scripts/make-thumbs.mjs    # square crops for the galleries
node scripts/make-og.mjs        # social previews, if a hero changed
```
