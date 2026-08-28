<script lang="ts">
	import { CONTACT_ENDPOINT } from '$lib/config';

	type Status = 'idle' | 'sending' | 'sent' | 'error';

	let status = $state<Status>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form).entries());

		status = 'sending';
		errorMessage = '';

		try {
			const res = await fetch(CONTACT_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (!res.ok) throw new Error(`Request failed (${res.status})`);

			status = 'sent';
			form.reset();
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
		}
	}
</script>

<div class="contact">
	<h2>Get in touch</h2>

	<div class="contact__details">
		<p><a href="mailto:info@cardellina.com">info@cardellina.com</a></p>
		<p><a href="https://wa.me/529615164020">WhatsApp +52 961 516 4020</a></p>
		<p>San Cristóbal de las Casas, Chiapas, Mexico</p>
		<p class="muted">We aim to reply within 24 hours</p>
	</div>

	<form onsubmit={handleSubmit}>
		<label>
			Name*
			<input type="text" name="name" required />
		</label>

		<label>
			Email*
			<input type="email" name="email" required />
		</label>

		<label>
			Preferred dates
			<input type="text" name="preferredDates" />
		</label>

		<label>
			Group size
			<input type="text" name="groupSize" />
		</label>

		<fieldset>
			<legend>Trip type</legend>
			<label class="radio"><input type="radio" name="tripType" value="day-tour" /> Day-tour</label>
			<label class="radio"
				><input type="radio" name="tripType" value="multi-day" /> Multi-day</label
			>
			<label class="radio"
				><input type="radio" name="tripType" value="bespoke" /> Bespoke itinerary</label
			>
			<label class="radio"
				><input type="radio" name="tripType" value="not-sure" /> Not sure yet</label
			>
		</fieldset>

		<label>
			Target species
			<input type="text" name="targetSpecies" />
		</label>

		<label>
			Anything else
			<textarea name="message" rows="4"></textarea>
		</label>

		<button type="submit" disabled={status === 'sending'}>
			{status === 'sending' ? 'Sending…' : 'Send enquiry'}
		</button>

		{#if status === 'sent'}
			<p class="status status--ok">Thanks — we'll be in touch within 24 hours.</p>
		{:else if status === 'error'}
			<p class="status status--error">
				Couldn't send that ({errorMessage}). Please email info@cardellina.com directly.
			</p>
		{/if}
	</form>
</div>

<style>
	.contact {
		display: grid;
		gap: 2rem;
	}

	@media (min-width: 800px) {
		.contact {
			grid-template-columns: 1fr 1.5fr;
		}
	}

	.contact__details p {
		margin: 0 0 0.5rem;
	}

	.muted {
		color: var(--color-text-muted);
		font-size: 0.9rem;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	label.radio {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-right: 1rem;
	}

	input[type='text'],
	input[type='email'],
	textarea {
		font: inherit;
		padding: 0.6rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-surface);
		color: var(--color-text);
	}

	fieldset {
		border: none;
		padding: 0;
		margin: 0;
	}

	legend {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		padding: 0;
		margin-bottom: 0.35rem;
	}

	button {
		justify-self: start;
	}

	.status {
		margin: 0;
	}

	.status--ok {
		color: #2e7d4f;
	}

	.status--error {
		color: #b3261e;
	}
</style>
