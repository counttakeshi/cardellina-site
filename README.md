# Cardellina

Source for cardellina.com — SvelteKit, prerendered to static HTML/CSS/JS and deployed
to GitHub Pages. Replaces the old Hostinger/Zyro no-code build.

See `.claude` plan history or ask for the migration plan for full background. Short
version:

- `src/lib/data/*.ts` — content (species, trips, guides, partners, map sites). These
  currently hold placeholder entries marked `TODO` pending the real content export
  from the old site; swap the arrays for real data and everything else (routing,
  filtering, the species/trip detail pages) works as-is.
- `src/routes/` — one route per page; `birds/[slug]` and `trips/[slug]` are
  data-driven and prerender one static page per entry via `entries()`.
- `worker/` — a small Cloudflare Worker that relays contact-form submissions to
  Resend (GitHub Pages can't run server code, so this is the one non-static piece).

## Developing

```sh
npm install
npm run dev -- --open
```

## Building

```sh
npm run build   # outputs static site to ./build
npm run preview
```

## Deploying

Push to `main` — `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages automatically. `static/CNAME` points Pages at `cardellina.com`; DNS for the
domain needs an A/ALIAS record (or `www` CNAME) pointed at GitHub Pages before the
custom domain will resolve — see the migration plan's cutover step.

The contact-form worker deploys separately:

```sh
cd worker
npm install
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

Then update `src/lib/config.ts`'s `CONTACT_ENDPOINT` to the deployed worker URL.
