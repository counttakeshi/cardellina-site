# Needs Ben

Everything from parts A to C that I could not settle without you. Nothing here
blocks the merge; each one is a field left empty or a fact I would not invent.

## Decisions

**The brand is written three different ways.** The footer says "Cardellina
Birdwatching Tours", page titles say "Cardellina - Chiapas Birding Tours", and
the structured data now says "Cardellina Birding Tours" (`BRAND_NAME` in
`config.ts`). I changed none of the existing strings. Pick one and the rest can
follow it. This is what Google uses to decide the site name in a result.

**The Google Business Profile URL.** `SOCIAL_PROFILES` has a slot for it. The
homepage links reviews through a `share.google` short link, which redirects and
is no use in `sameAs`. The full `maps.google.com` URL for the listing is what
belongs there. Facebook, Instagram and Tripadvisor are already in.

**Guide languages.** The bios give Valente English, Spanish and Dutch, and Ben
English, Spanish and Portuguese. The multi-day tour pages advertise "English,
Spanish, Dutch", which leaves Portuguese out. I used what the bios say. Confirm
which is right, in `guides.ts`.

**Guide profile URLs.** `profiles` on each guide has empty slots for eBird,
iNaturalist and Instagram. These are what let a search engine join a guide's
eBird record and their photographs to this site as one person. An empty slot is
dropped; a wrong URL claims the wrong person, so I left them blank.

**`phone_click` cannot fire.** Nothing on the site is a `tel:` link; the number
on the contact page points at WhatsApp. The handler is ready if you want a real
telephone link somewhere.

**The ledger spells one bird "Rose Bellied Bunting"**, without hyphens, and
that is now the alt text on the Full Endemics hero. Worth fixing in
`ledger.json` if it bothers you.

## Mappings I pre-filled from the brief

All in `src/lib/related.ts`. Nothing in the data states any of these.

**Ledger site to day tour.** `sancris` → `san-cristobal`, `sumidero` →
`sumidero-canyon`, `comitan` → `comitan`, `montebello` → `montebello-lakes`,
`sepultura` → `la-sepultura`, `palenque` → `palenque`. Six of the eighteen
ledger locations have a day tour; the rest are visited only on a route.

**Report to tour.** `tacana-volcano` → Volcano Endemics and Full Endemics;
`palenque-and-catazaja` → Palenque and Lowland Jungles; `san-cristobal-full-day`
→ San Cristóbal; `san-cristobal-to-montebello` → San Cristóbal and Montebello
Lakes. **`northern-swamps` is deliberately empty** and needs you.

**The brief's ledger tour mapping was stale.** It listed keys like
`chiapas-highlights-birding-tour`, but the ledger's keys are already the route
slugs (`chiapas-highlights`). No mapping is needed. Worth knowing in case that
longer name exists somewhere else.

## Copy, all of it

`grep -rn "COPY:" src/` finds every gap. The ones the report says matter most:

**Four species accounts have no meta description at all**, and their titles run
92 to 101 characters, so Google is cutting them. `seoTitle` and
`metaDescription` in `accounts.ts` fix both without touching a route.

**Eleven tour descriptions are 164 to 397 characters.** They are the intro
paragraphs standing in for a description; Google cuts at about 160.
`metaDescription` in `tourDetails.ts`.

**Author and date fields** on accounts and reports are empty, so the `author`,
`datePublished` and `dateModified` are left out of the structured data
entirely. A named author is a strong signal and an invented one is a lie. The
reports already have `published`, which the sitemap now uses.

## Things I did not do

**The three CSS-background heroes** on `/`, `/trips` and `/trip-reports` are
still CSS backgrounds, so they carry no alt text and cannot be indexed as
images. Converting them should be invisible, which needs before and after
screenshots to prove. Tell me when a preview server can run and I will finish
it.

**The `/trips` hero subject is unknown.** `dscn5960-AGB2B6qXevFLZNPP` is not in
the ledger, so when that hero becomes an `<img>` it needs an alt from you.

**No image was renamed.** `docs/seo/image-renames.csv` proposes names for the
13 photographs across 64 files still carrying "sabes_aves" or the misspelled
"saves_aves" in the filename. Renaming changes the URL, and the old URLs are
what Google Images holds, so that is a migration with redirects.

**Six photographs on disk are reachable from nowhere** (3.2MB), and 29 ledger
entries are of birds the library does not list, so no page can ask for them.
Separate from this brief; the audit is in the conversation.

---

# Part D

## Facts only you have

**The four new species.** Wine-throated Hummingbird, Bearded Screech-Owl,
Fulvous Owl and Unspotted Saw-whet Owl are now in `species.ts` with the tier
and zones the brief proposed. Confirm each: the tier decides which range filter
finds them in the library.

**`northern-swamps` has no tour.** Every other trip report is mapped to the
tours it came out of. That one is empty in `src/lib/related.ts` because nothing
in the data says, and a guess would put a report under the wrong trip.

**The reviews.** `tours`, `month`, `country` and `sourceUrl` are empty on all
but Peter Standring's, whose review names Palenque itself. `sourceUrl` is the
one worth most: a review a reader can go and check beats one they cannot.

**Hit rates.** `src/lib/data/hitRates.ts` is empty. This is the single most
convincing thing the site could publish, and the one number a reader will hold
you to, so it takes real counts or nothing.

**The phenology CSV**, and the eBird Basic Dataset version to pass as
`--source` so the chart can cite what it is drawing.

**The trade page** needs the RNT registration number, the insurer, and a
decision on which operators are willing to be named as references.

**Protected-area pages.** `/chiapas` cites CONANP's page for El Triunfo. Find
the equivalent for every protected area the tours visit, and list any that have
none.

## Decisions

**Tour pricing for the routes.** `fromPriceUsd` is empty on all four, so they
advertise no price in their structured data. That is deliberate: a trip
advertised with no price beats one advertised wrong. Filling it turns on the
offer.

**`outsideAdvisoryAreas`** is a claim about safety. Only set it on a route you
have checked against the three current advisories, and recheck when they
change.

## Sources

Every scaffolded URL went in as `verified: false`. `npm run seo:sources`
opens them all and `-- --write` records the result. The xeno-canto and BirdLife
URLs were built from a naming pattern and both services use their own taxonomy,
so some will fail. Fix or delete a failing URL rather than leaving it: a source
a reader cannot open is worse than no source.

The Resplendent Quetzal's likely sources are a comment in `accounts.ts`,
unrendered, for you to confirm.
