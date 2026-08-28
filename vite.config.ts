import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

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

			prerender: {
				// TODO: remove once real images are in place (see src/lib/data/*.ts TODOs) —
				// this only exists so placeholder image paths don't hard-fail the build.
				handleHttpError: 'warn'
			}
		})
	]
});
