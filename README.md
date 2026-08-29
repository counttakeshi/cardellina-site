# Cardellina

Source for cardellina.com — a SvelteKit site prerendered to plain static
HTML/CSS/JS and hosted on GitHub Pages. Replaces the old Hostinger/Zyro build.

Live preview: <https://counttakeshi.github.io/cardellina-site/>

## Layout

- `src/lib/data/*.ts` — all content lives here, transcribed from the old site:
  125 species across 26 families (`species.ts`), long-form species accounts
  (`accounts.ts`), day and multi-day trips (`trips.ts`), guide bios
  (`guides.ts`), partner projects (`partners.ts`), and the 18 birding sites
  behind the interactive map (`sites.ts`). Editing content means editing these
  files — no page markup to touch.
- `src/routes/` — one route per page. `birds/[slug]` is data-driven and
  prerenders one static page per species that has a full account.
- `src/lib/components/` — nav, footer, contact form, habitat icons, and the
  `SiteMap` (a hand-drawn SVG of Chiapas; no mapping library).

## Developing

```sh
npm install
npm run dev -- --open
```

## Building

```sh
npm run check    # typecheck
npm run build    # static output in ./build
npm run preview
```

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages automatically.

The site is currently served from the Pages project URL, so it is built with
`BASE_PATH=/cardellina-site` to prefix every link. The workflow derives this
from the repo name.

### Moving to the custom domain

1. Add a repository variable `USE_CUSTOM_DOMAIN` = `true`
   (Settings → Secrets and variables → Actions → Variables). This drops the
   base path and writes a `CNAME` file into the build.
2. Point DNS at GitHub Pages — replace the `A` records for the apex with
   GitHub's four addresses, and repoint the `www` CNAME at
   `counttakeshi.github.io`.
3. Leave `MX`, SPF and DMARC alone: email for info@cardellina.com stays on
   Hostinger and is unrelated to where the website is hosted.

## Contact form

GitHub Pages serves static files and cannot process a form submission, so the
enquiry form posts to [Formspree](https://formspree.io), which emails
submissions to info@cardellina.com.

Set the endpoint in `src/lib/config.ts`. It is a public URL, not a secret. The
form includes a hidden honeypot field to absorb bot spam.

## Known gaps

- Images are still served from the old Zyro CDN (`assets.zyrosite.com`) rather
  than from this repo, so the site still depends on Hostinger for assets.
- Individual tour detail pages (e.g. the old `/san-cristobal-birding-day-tour`)
  have not been migrated; those calls to action currently point at `/contact`.
- The privacy policy still describes the Hostinger-era stack (Google Analytics,
  Microsoft Clarity, Mailchimp) and needs rewriting to match what this site
  actually uses.
