import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// SvelteKit types `base` as '' or a '/'-prefixed string, so normalise whatever
// BASE_PATH holds (and tolerate a trailing slash) before handing it over.
const raw = (process.env.BASE_PATH ?? '').trim().replace(/\/+$/, '');
const basePath: '' | `/${string}` = raw === '' ? '' : raw.startsWith('/') ? (raw as `/${string}`) : `/${raw}`;

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Static adapter: prerenders the whole site to plain HTML/CSS/JS for GitHub Pages.
			// See https://svelte.dev/docs/kit/adapter-static for more information.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),

			// Base path for the site. Empty for a root domain (cardellina.com);
			// set BASE_PATH=/cardellina-site to serve from the GitHub Pages
			// project URL at counttakeshi.github.io/cardellina-site.
			paths: {
				base: basePath
			},

			prerender: {
				// TODO: remove once real images are in place (see src/lib/data/*.ts TODOs) —
				// this only exists so placeholder image paths don't hard-fail the build.
				handleHttpError: 'warn'
			}
		})
	]
});
