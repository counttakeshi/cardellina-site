<script lang="ts">
	import { CONTACT_ENDPOINT, CONTACT_EMAIL } from '$lib/config';

	type Status = 'idle' | 'sending' | 'sent' | 'error';

	let status = $state<Status>('idle');
	let errorMessage = $state('');

	const configured = $derived(!CONTACT_ENDPOINT.includes('REPLACE_WITH_FORM_ID'));

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;

		status = 'sending';
		errorMessage = '';

		try {
			// Submitting as FormData with an Accept: application/json header keeps
			// Formspree from redirecting to its own thank-you page, so we can show
			// the confirmation inline instead.
			const res = await fetch(CONTACT_ENDPOINT, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(form)
			});

			if (!res.ok) {
				const body = await res.json().catch(() => null);
				const detail = body?.errors?.map((e: { message: string }) => e.message).join(', ');
				throw new Error(detail || `Request failed (${res.status})`);
			}

			status = 'sent';
			form.reset();
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
		}
	}
</script>

<form onsubmit={handleSubmit}>
	<!-- Subject line for the notification email, so enquiries are scannable in the inbox. -->
	<input type="hidden" name="_subject" value="New enquiry from cardellina.com" />

	<!-- Honeypot: invisible to people, but bots fill every field they find.
	     Formspree silently discards any submission where _gotcha has a value. -->
	<input
		class="gotcha"
		type="text"
		name="_gotcha"
		tabindex="-1"
		autocomplete="off"
		aria-hidden="true"
	/>

	<div class="field-row">
		<div class="field">
			<label for="cf-name">Name*</label>
			<input id="cf-name" name="name" type="text" required />
		</div>
		<div class="field">
			<label for="cf-email">Email*</label>
			<input id="cf-email" name="email" type="email" required />
		</div>
	</div>

	<div class="field-row">
		<div class="field">
			<label for="cf-dates">Preferred dates or months</label>
			<input id="cf-dates" name="preferredDates" type="text" />
		</div>
		<div class="field">
			<label for="cf-group">Group size</label>
			<input id="cf-group" name="groupSize" type="text" />
		</div>
	</div>

	<fieldset class="field">
		<legend>Trip type</legend>
		<div class="radios">
			<label><input type="radio" name="tripType" value="Day tour" /> Day tour</label>
			<label><input type="radio" name="tripType" value="Multi-day tour" /> Multi-day tour</label>
			<label><input type="radio" name="tripType" value="Bespoke itinerary" /> Bespoke itinerary</label>
			<label><input type="radio" name="tripType" value="Not sure yet" /> Not sure yet</label>
		</div>
	</fieldset>

	<div class="field">
		<label for="cf-species">Target species</label>
		<input id="cf-species" name="targetSpecies" type="text" />
	</div>

	<div class="field">
		<label for="cf-msg">Anything else you'd like to tell us*</label>
		<textarea id="cf-msg" name="message" rows="5" required></textarea>
	</div>

	<button class="submit-btn" type="submit" disabled={status === 'sending' || !configured}>
		{status === 'sending' ? 'Sending…' : 'Send enquiry'}
	</button>

	{#if !configured}
		<p class="status warn">
			The form isn't connected yet. In the meantime, please email
			<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.
		</p>
	{:else if status === 'sent'}
		<p class="status ok">Thanks — we'll be in touch within 24 hours.</p>
	{:else if status === 'error'}
		<p class="status err">
			Couldn't send that ({errorMessage}). Please email
			<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a> directly.
		</p>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 720px;
	}

	.field label,
	legend {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--stone);
		margin-bottom: 0.4rem;
		padding: 0;
	}

	.field input[type='text'],
	.field input[type='email'],
	.field textarea {
		width: 100%;
		font-family: var(--body);
		font-size: 15px;
		color: var(--ink);
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: 3px;
		padding: 11px 13px;
	}

	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--phwa);
	}

	.field textarea {
		resize: vertical;
		min-height: 110px;
	}

	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
	}

	.radios {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.4rem;
	}

	.radios label {
		font-family: var(--body);
		font-size: 15px;
		text-transform: none;
		letter-spacing: 0;
		color: var(--ink);
		display: inline-flex;
		align-items: center;
		gap: 7px;
		margin: 0;
	}

	.submit-btn {
		background: var(--phwa);
		color: #fff;
		border: 0;
		border-radius: 3px;
		font-family: var(--body);
		font-weight: 700;
		font-size: 15px;
		letter-spacing: 0.02em;
		padding: 14px 30px;
		cursor: pointer;
		align-self: flex-start;
		transition: background 0.18s;
	}
	.submit-btn:hover:not(:disabled) {
		background: #bf3a61;
	}
	.submit-btn:disabled {
		opacity: 0.6;
		cursor: default;
	}

	.status {
		font-size: 15px;
		margin: 0;
	}
	.status.ok {
		color: var(--canopy);
	}
	.status.err {
		color: #b8305a;
	}
	.status.warn {
		color: var(--lichen);
	}

	/* Off-screen rather than display:none — some bots skip hidden inputs. */
	.gotcha {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	.submit-btn:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	@media (max-width: 560px) {
		.field-row {
			grid-template-columns: 1fr;
		}
	}
</style>
