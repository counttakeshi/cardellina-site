# PR 2: scaffolds for the new content (Part D)

Branch `seo-content-scaffolds`, from `main` after PR 1 merged.

Open it at:
https://github.com/counttakeshi/cardellina-site/compare/main...seo-content-scaffolds

## The property that makes this safe to merge

**Nothing in this PR is visible on the live site**, except four new rows in the
bird library.

Every new page is `status: draft`, and a draft is not hidden or noindexed — it
is **not built**. `entries()` lists only live pages, so a production build
produces the same 29 pages it did before. `PREVIEW_DRAFTS=1` produces 60.

Verified both ways on every commit.

| | Production | `PREVIEW_DRAFTS=1` |
|---|--:|--:|
| Pages built | 29 | 60 |
| In the sitemap | 27 | 27 |
| Nav items | unchanged | grows by two |

The only visible change on the live site: the bird library gains four species
and its count moves 132 to 136.

## What you get

**395 `COPY:` gaps across 41 files.** `grep -rn "COPY:" src/` finds every one.
Each says what belongs there and roughly how long.

### D1, D2: the content layer and eight pages

Markdown with YAML frontmatter in `src/content/`, because prose does not belong
in TypeScript strings. Eight pages scaffolded with their working headings:

- `/chiapas`, `/chiapas/when-to-go`, `/chiapas/safety`, `/chiapas/getting-there`
- `/mexico`, `/mexico/chiapas-or-costa-rica`, `/mexico/first-tropical-birding-trip`
- `/tour-companies-and-clubs`

Sources are pre-filled from the brief with publisher, a note on what each is
for, and the date checked.

### D3: 23 species accounts

One Markdown file per bird, using the slugs already in `species.ts`. Quick-
reference rows as frontmatter with the scientific name filled, the most
specific tour as the CTA link, and six sources per bird built from its eBird
code.

Four birds the brief found missing are now in `species.ts`: Wine-throated
Hummingbird, Bearded Screech-Owl, Fulvous Owl, Unspotted Saw-whet Owl.

**`hasAccount` no longer decides anything.** It was a third copy of a fact held
in two other places, and the one most likely to be wrong. The library and the
site map now derive the set from the four original accounts plus any live
Markdown one.

### D4, D7, D8: tour fields

Eleven optional fields, all empty, all rendering nothing: best months,
difficulty, highest point, start time, pick-up points, what to bring, reviews,
from-price, group departures, hit rates, and the advisory-area flag. Plus
`src/content/tours/<slug>.md` for long-form sections.

Tested by filling one tour, confirming every block rendered, then emptying it
and confirming the wrapper disappears entirely.

### D5: review metadata

`tours`, `month`, `country`, `sourceUrl` on the homepage reviews. **The text is
untouched** and verified byte for byte. Only Peter Standring's `tours` is
filled, because his review names Palenque.

### D6: phenology

`scripts/import-phenology.mjs` turns an eBird CSV into `phenology.json`, and
`PhenologyChart.svelte` draws twelve monthly bars on a species account.

Tested end to end on sample data: CSV in, chart out, with the accessible
month-by-month label, the source cited, and the thin-sample caveat appearing
for the month with seven checklists. Committed empty.

### D9: the guide

`docs/seo/HOW-TO-WRITE.md`. Where every field lives, how to preview a draft,
how to publish, how to add a review, a departure or a hit rate, and how to
import the phenology CSV.

## New commands

```
PREVIEW_DRAFTS=1 npm run build   build drafts too, flagged and noindexed
npm run seo:sources              check every source URL
npm run seo:sources -- --write   and record the result
node scripts/import-phenology.mjs <csv> --source "EBD version"
```

## Needs Ben

Added to `docs/seo/NEEDS-BEN.md`. The ones that matter most:

1. **Confirm the tier and zones** on the four new species.
2. **`northern-swamps` has no tour mapping.** Left empty rather than guessed.
3. **Review metadata.** Who went on which tour, and where each review was
   published.
4. **The phenology CSV**, and the eBird Basic Dataset version to cite.
5. **Hit rates.** Real counts or nothing: it is the one number a reader will
   hold you to.
6. **The RNT number and insurer** for the trade page.
7. **Which operators will be named** as references.
