<script lang="ts">
	import type { TourPhoto } from '$lib/data/tourDetails';

	interface Props {
		photos: TourPhoto[];
		/** Index of the open photo, or null when closed. Bindable. */
		index: number | null;
	}

	let { photos, index = $bindable() }: Props = $props();

	const photo = $derived(index === null ? null : photos[index]);

	function close() {
		index = null;
	}

	function step(delta: number) {
		if (index === null || photos.length === 0) return;
		index = (index + delta + photos.length) % photos.length;
	}

	// The original site's lightbox was mouse-only. Wiring up Escape and the arrow
	// keys costs nothing and makes it usable from the keyboard.
	$effect(() => {
		if (index === null) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
			else if (e.key === 'ArrowRight') step(1);
			else if (e.key === 'ArrowLeft') step(-1);
		};

		document.addEventListener('keydown', onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
		};
	});
</script>

{#if photo}
	<div
		class="lb"
		role="dialog"
		aria-modal="true"
		aria-label={photo.caption || photo.alt}
		tabindex="-1"
	>
		<button class="scrim" onclick={close} aria-label="Close"></button>

		<button class="close" onclick={close} aria-label="Close">×</button>

		{#if photos.length > 1}
			<button class="nav prev" onclick={() => step(-1)} aria-label="Previous photo">‹</button>
			<button class="nav next" onclick={() => step(1)} aria-label="Next photo">›</button>
		{/if}

		<figure>
			<img src={photo.full} alt={photo.alt} />
			{#if photo.caption}
				<figcaption>
					{photo.caption}
					{#if photo.credit}
						<span class="credit">photo by {photo.credit}</span>
					{/if}
					{#if photos.length > 1}
						<span class="count">{(index ?? 0) + 1} / {photos.length}</span>
					{/if}
				</figcaption>
			{/if}
		</figure>
	</div>
{/if}

<style>
	.lb {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem 1.5rem;
	}

	.scrim {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		background: rgba(12, 20, 17, 0.92);
		cursor: zoom-out;
	}

	figure {
		position: relative;
		z-index: 2;
		margin: 0;
		max-width: min(1100px, 100%);
		max-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.7rem;
		pointer-events: none;
	}

	img {
		max-width: 100%;
		max-height: 78vh;
		width: auto;
		height: auto;
		border-radius: 6px;
		display: block;
	}

	figcaption {
		font-family: var(--mono);
		font-size: 11.5px;
		letter-spacing: 0.03em;
		color: rgba(255, 255, 255, 0.75);
		text-align: center;
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
	.count {
		color: rgba(255, 255, 255, 0.45);
	}
	/* Credits live here rather than on the thumbnails: at grid size the
	   photographer's name was longer than the bird's and wrapped the captions
	   onto three ragged lines. */
	.credit {
		color: rgba(255, 255, 255, 0.5);
	}

	.close,
	.nav {
		position: absolute;
		z-index: 3;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #fff;
		cursor: pointer;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background 0.16s ease,
			border-color 0.16s ease;
	}
	.close:hover,
	.nav:hover {
		background: rgba(255, 255, 255, 0.22);
		border-color: rgba(255, 255, 255, 0.45);
	}

	.close {
		top: 1rem;
		right: 1rem;
		width: 44px;
		height: 44px;
		font-size: 26px;
		line-height: 1;
	}

	.nav {
		top: 50%;
		transform: translateY(-50%);
		width: 48px;
		height: 48px;
		font-size: 30px;
		line-height: 1;
	}
	.prev {
		left: 1rem;
	}
	.next {
		right: 1rem;
	}

	@media (max-width: 560px) {
		.lb {
			padding: 3.5rem 0.75rem;
		}
		.nav {
			width: 40px;
			height: 40px;
			font-size: 24px;
		}
		.prev {
			left: 0.4rem;
		}
		.next {
			right: 0.4rem;
		}
	}
</style>
