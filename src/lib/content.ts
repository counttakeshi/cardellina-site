/**
 * Long-form pages, written as Markdown with YAML frontmatter in src/content/.
 *
 * Everything else on this site lives in TypeScript, which is right for the
 * things that are really data: a tour has a price and a party size and a list
 * of target birds. It is wrong for prose. Writing four hundred words inside a
 * quoted string means escaping every apostrophe, losing every paragraph break
 * to \n\n, and getting no help at all from an editor. Nobody writes well in
 * those conditions, which is part of why the long-form pages do not exist yet.
 *
 * So: Markdown files, parsed once at build time, with the publishing state in
 * the frontmatter.
 *
 * `status: draft` is the safety property the whole of Part D rests on. A draft
 * is not prerendered in a production build at all, never appears in the
 * sitemap, the nav or a related-links block, and carries noindex if it is built
 * at all. Half-written pages cannot reach the live site by accident; they
 * arrive when somebody changes one word in the frontmatter.
 */
import { marked } from 'marked';
import { parse as parseYaml } from 'yaml';

export type ContentStatus = 'draft' | 'live';

export interface Source {
	title: string;
	publisher?: string;
	url?: string;
	/** What this source is for. Notes to Ben, not shown unless renderSources. */
	note?: string;
	/** False when the URL could not be opened and checked. */
	verified?: boolean;
	/** ISO date the URL was last opened. */
	accessed?: string;
}

export interface Frontmatter {
	/** The H1. */
	title: string;
	seoTitle?: string;
	metaDescription?: string;
	status: ContentStatus;
	/** ISO date last meaningfully revised. Feeds dateModified and the sitemap. */
	updated?: string;
	/** A guide slug from guides.ts. Left out of the markup until filled. */
	author?: string;
	/**
	 * Whether the sources appear on the page. True for the hub, guide, safety
	 * and species pages, where citing the government advisory or the BirdLife
	 * factsheet is the point. False for the tour extensions, where the sources
	 * are Ben's working notes rather than a bibliography.
	 */
	renderSources?: boolean;
	sources?: Source[];
	/** Anything a particular page type needs. Typed at the point of use. */
	[key: string]: unknown;
}

export interface ContentPage {
	/** Path within src/content, without extension: 'chiapas/when-to-go'. */
	slug: string;
	frontmatter: Frontmatter;
	/** The body, already rendered to HTML. */
	html: string;
	/** The raw body, for counting COPY: gaps without re-reading the file. */
	markdown: string;
}

/**
 * Every Markdown file under src/content, read at build time.
 *
 * eager so the parse happens once during the build rather than per request;
 * there is no request, the whole site is prerendered.
 */
const files = import.meta.glob('/src/content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseFile(path: string, raw: string): ContentPage | null {
	const match = raw.match(FRONTMATTER);
	if (!match) {
		console.warn(`content: ${path} has no frontmatter, skipped`);
		return null;
	}

	let frontmatter: Frontmatter;
	try {
		frontmatter = (parseYaml(match[1]) ?? {}) as Frontmatter;
	} catch (err) {
		console.warn(`content: ${path} has unreadable frontmatter, skipped`, err);
		return null;
	}

	if (!frontmatter.title) {
		console.warn(`content: ${path} has no title, skipped`);
		return null;
	}

	const markdown = raw.slice(match[0].length);
	return {
		slug: path.replace('/src/content/', '').replace(/\.md$/, ''),
		// Default to draft when the file does not say. Spreading first and then
		// setting would silently overwrite a file that does say 'live'.
		frontmatter: { ...frontmatter, status: frontmatter.status ?? 'draft' },
		html: marked.parse(markdown, { async: false }) as string,
		markdown
	};
}

/** Every page, draft and live. */
export const allContent: ContentPage[] = Object.entries(files)
	.map(([path, raw]) => parseFile(path, raw))
	.filter((p): p is ContentPage => p !== null)
	.sort((a, b) => a.slug.localeCompare(b.slug));

/**
 * Whether drafts are built at all.
 *
 * PREVIEW_DRAFTS=1 npm run build renders them locally so Ben can read what he
 * is writing. Without it they do not exist in the output, which is the only
 * guarantee worth having: not hidden, not noindexed, not there.
 */
export const previewDrafts =
	typeof process !== 'undefined' && process.env?.PREVIEW_DRAFTS === '1';

export const isLive = (page: ContentPage) => page.frontmatter.status === 'live';

/** The pages a production build should render. */
export const buildableContent = (): ContentPage[] =>
	previewDrafts ? allContent : allContent.filter(isLive);

/** Pages under a directory, e.g. 'birds' or 'chiapas'. */
export function contentIn(dir: string): ContentPage[] {
	const prefix = dir.replace(/\/+$/, '') + '/';
	return buildableContent().filter((p) => p.slug.startsWith(prefix));
}

/** One page by slug, or undefined when it is missing or a draft. */
export function contentFor(slug: string): ContentPage | undefined {
	return buildableContent().find((p) => p.slug === slug);
}

/** How many gaps a page still has. Used by the SEO report. */
export const copyGaps = (page: ContentPage) => (page.markdown.match(/COPY:/g) ?? []).length;
