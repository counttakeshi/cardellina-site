/**
 * Real pixel dimensions for an image URL, so every <img> can declare its shape.
 *
 * Without width and height the browser does not know how tall an image will be
 * until the bytes arrive, so it lays the page out as if the image were nothing
 * and then shoves everything down when it loads. On the bird library that is
 * 132 images each nudging the page under a reader's thumb, and it is what
 * Cumulative Layout Shift measures.
 *
 * Giving both attributes lets the browser reserve the right box from the first
 * paint. The CSS still decides the displayed size; these are the aspect ratio,
 * not a width in pixels.
 */
import { base } from '$app/paths';
import manifest from './data/image-sizes.json';

// JSON imports widen tuples to number[], so the pair is checked rather than
// asserted. A malformed entry then yields no attributes, which is the safe
// failure: a width without a height makes the browser reserve a square.
const fixed: Record<string, number[]> = manifest.fixed;
const sizes: Record<string, Record<string, number[]>> = manifest.sizes;

export interface Dimensions {
	width: number;
	height: number;
}

/** The dimensions for a built image URL, or null when we do not hold them. */
export function imageSize(src: string | undefined | null): Dimensions | null {
	if (!src) return null;

	let path = src;
	if (base && path.startsWith(base)) path = path.slice(base.length);
	const m = path.match(/(?:^|\/)images\/(.+)-(full|md|card|sq|thumb|portrait)\.webp$/);
	if (!m) return null;

	const [, stem, variant] = m;
	const pair = fixed[variant] ?? sizes[stem]?.[variant];
	return pair?.length === 2 ? { width: pair[0], height: pair[1] } : null;
}

/**
 * Spreadable width and height attributes, or nothing at all.
 *
 * Spread rather than two props because an unknown image must emit neither
 * attribute: a width with no height is worse than neither, since the browser
 * then derives a 1:1 ratio and reserves a square.
 */
export function imageAttrs(src: string | undefined | null): Dimensions | Record<string, never> {
	return imageSize(src) ?? {};
}
