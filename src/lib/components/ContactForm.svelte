<script lang="ts">
	import { CONTACT_ENDPOINT, CONTACT_EMAIL } from '$lib/config';

	export type EnquiryKind = 'general' | 'day' | 'multi-day' | 'personalised';

	interface Props {
		kind?: EnquiryKind;
		/** Name of the specific tour being booked, when one is in context. */
		tourName?: string;
		/** Extra context echoed into the email so we know what they were looking at. */
		tourMeta?: string;
		/**
		 * Answers already given elsewhere on the page, sent as hidden fields so the
		 * form never asks the same question twice. Blank values are dropped. Used by
		 * the trip builder, which collects the shape of the trip before this form
		 * collects who is asking.
		 */
		prefill?: Record<string, string>;
	}

	let { kind = 'general', tourName, tourMeta, prefill }: Props = $props();

	const prefilled = $derived(
		Object.entries(prefill ?? {}).filter(([, v]) => v && v.trim() !== '')
	);

	type Status = 'idle' | 'sending' | 'sent' | 'error';

	let status = $state<Status>('idle');
	let errorMessage = $state('');

	const booking = $derived(kind === 'day' || kind === 'multi-day');

	const subject = $derived(
		tourName
			? `${kind === 'day' ? 'Day tour' : 'Multi-day'} booking: ${tourName}`
			: kind === 'personalised'
				? 'Personalised trip enquiry from cardellina.com'
				: 'New enquiry from cardellina.com'
	);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;

		status = 'sending';
		errorMessage = '';

		try {
			// FormData + Accept: application/json keeps Formspree from redirecting to
			// its own thank-you page, so the confirmation stays inline on our site.
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

{#if status === 'sent'}
	<div class="done">
		<h3>Thanks — that's with us.</h3>
		<p>
			{#if booking && tourName}
				We've got your enquiry about <strong>{tourName}</strong> and we'll come back to you within
				24 hours, usually sooner.
			{:else}
				We'll come back to you within 24 hours, usually sooner.
			{/if}
		</p>
		<button class="again" onclick={() => (status = 'idle')}>Send another enquiry</button>
	</div>
{:else}
	<form onsubmit={handleSubmit}>
		<!-- Context for the notification email, so enquiries are sortable in the inbox. -->
		<input type="hidden" name="_subject" value={subject} />
		{#if tourName}
			<input type="hidden" name="Tour" value={tourName} />
		{/if}
		{#if tourMeta}
			<input type="hidden" name="Tour details" value={tourMeta} />
		{/if}
		<input
			type="hidden"
			name="Enquiry type"
			value={kind === 'day'
				? 'Day tour booking'
				: kind === 'multi-day'
					? 'Multi-day booking'
					: kind === 'personalised'
						? 'Personalised trip'
						: 'General enquiry'}
		/>
		{#each prefilled as [label, value] (label)}
			<input type="hidden" name={label} value={value} />
		{/each}

		<!-- Honeypot: off-screen rather than display:none, since some bots skip
		     hidden inputs but will fill anything they can read. -->
		<input class="gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />

		{#if booking && tourName}
			<p class="booking-banner">
				<span class="bb-label">Enquiring about</span>
				<span class="bb-name">{tourName}</span>
				{#if tourMeta}<span class="bb-meta">{tourMeta}</span>{/if}
			</p>
		{/if}

		<div class="field-row">
			<div class="field">
				<label for="cf-name">Your name *</label>
				<input id="cf-name" name="Name" type="text" autocomplete="name" required />
			</div>
			<div class="field">
				<label for="cf-email">Email *</label>
				<input id="cf-email" name="email" type="email" autocomplete="email" required />
			</div>
		</div>

		<div class="field-row">
			<div class="field">
				<label for="cf-phone">WhatsApp or phone</label>
				<input id="cf-phone" name="Phone" type="tel" autocomplete="tel" />
			</div>
			<div class="field">
				<label for="cf-country">Where are you travelling from?</label>
				<input id="cf-country" name="Travelling from" type="text" autocomplete="country-name" />
			</div>
		</div>

		{#if kind === 'day'}
			<div class="field-row">
				<div class="field">
					<label for="cf-date">Preferred date *</label>
					<input id="cf-date" name="Preferred date" type="date" required />
				</div>
				<div class="field">
					<label for="cf-alt">Alternative date</label>
					<input id="cf-alt" name="Alternative date" type="date" />
				</div>
			</div>

			<div class="field-row">
				<div class="field">
					<label for="cf-people">How many people? *</label>
					<input id="cf-people" name="Number of people" type="number" min="1" required />
				</div>
				<div class="field">
					<label for="cf-exp">Birding experience</label>
					<select id="cf-exp" name="Birding experience">
						<option value="">Select…</option>
						<option>First time birding</option>
						<option>Casual — I enjoy birds</option>
						<option>Experienced birder</option>
						<option>Serious lister</option>
					</select>
				</div>
			</div>

			<div class="field">
				<label for="cf-pickup">Where are you staying? (for pickup)</label>
				<input id="cf-pickup" name="Pickup location" type="text" />
			</div>
		{:else if kind === 'multi-day'}
			<div class="field-row">
				<div class="field">
					<label for="cf-start">Preferred start date or month *</label>
					<input id="cf-start" name="Preferred start" type="text" placeholder="e.g. March 2027" required />
				</div>
				<div class="field">
					<label for="cf-flex">How flexible are those dates?</label>
					<select id="cf-flex" name="Date flexibility">
						<option value="">Select…</option>
						<option>Fixed — these exact dates</option>
						<option>A few days either way</option>
						<option>Very flexible</option>
					</select>
				</div>
			</div>

			<div class="field-row">
				<div class="field">
					<label for="cf-people">How many people? *</label>
					<input id="cf-people" name="Number of people" type="number" min="1" required />
				</div>
				<div class="field">
					<label for="cf-rooms">Room setup</label>
					<select id="cf-rooms" name="Room setup">
						<option value="">Select…</option>
						<option>Single</option>
						<option>Double (one bed)</option>
						<option>Twin (two beds)</option>
						<option>A mix — we'll explain below</option>
					</select>
				</div>
			</div>

			<div class="field-row">
				<div class="field">
					<label for="cf-exp">Birding experience</label>
					<select id="cf-exp" name="Birding experience">
						<option value="">Select…</option>
						<option>First time birding</option>
						<option>Casual — I enjoy birds</option>
						<option>Experienced birder</option>
						<option>Serious lister</option>
					</select>
				</div>
				<div class="field">
					<label for="cf-fitness">Comfortable with steep hiking?</label>
					<select id="cf-fitness" name="Fitness">
						<option value="">Select…</option>
						<option>Yes — bring it on</option>
						<option>Moderate walking is fine</option>
						<option>Prefer to keep it gentle</option>
					</select>
				</div>
			</div>

			<div class="field">
				<label for="cf-arrival">Arrival and departure plans</label>
				<input
					id="cf-arrival"
					name="Arrival and departure"
					type="text"
					placeholder="Which airport, and which dates, if you know"
				/>
			</div>
		{:else if kind === 'personalised'}
			<div class="field-row">
				<div class="field">
					<label for="cf-group">How many of you? *</label>
					<input id="cf-group" name="Group size" type="text" required />
				</div>
				<div class="field">
					<label for="cf-exp">Birding experience</label>
					<select id="cf-exp" name="Birding experience">
						<option value="">Select…</option>
						<option>First time birding</option>
						<option>Casual — I enjoy birds</option>
						<option>Experienced birder</option>
						<option>Serious lister</option>
					</select>
				</div>
			</div>
		{:else}
			<div class="field-row">
				<div class="field">
					<label for="cf-dates">Preferred dates or months</label>
					<input id="cf-dates" name="Preferred dates" type="text" />
				</div>
				<div class="field">
					<label for="cf-group">Group size</label>
					<input id="cf-group" name="Group size" type="text" />
				</div>
			</div>

			<fieldset class="field">
				<legend>What sort of trip?</legend>
				<div class="radios">
					<label><input type="radio" name="Trip type" value="Day tour" /> Day tour</label>
					<label><input type="radio" name="Trip type" value="Multi-day tour" /> Multi-day tour</label>
					<label><input type="radio" name="Trip type" value="Bespoke itinerary" /> Bespoke itinerary</label>
					<label><input type="radio" name="Trip type" value="Not sure yet" /> Not sure yet</label>
				</div>
			</fieldset>
		{/if}

		{#if kind !== 'personalised'}
			<div class="field">
				<label for="cf-species">Target species</label>
				<input
					id="cf-species"
					name="Target species"
					type="text"
					placeholder="Birds you'd most like to see"
				/>
			</div>
		{/if}

		{#if booking}
			<div class="field">
				<label for="cf-needs">Dietary or mobility needs</label>
				<input id="cf-needs" name="Dietary or mobility needs" type="text" />
			</div>
		{/if}

		<div class="field">
			<label for="cf-msg">
				{booking || kind === 'personalised'
					? 'Anything else we should know?'
					: "Anything else you'd like to tell us *"}
			</label>
			<textarea
				id="cf-msg"
				name="Message"
				rows="5"
				required={kind === 'general'}
			></textarea>
		</div>

		<button class="submit-btn" type="submit" disabled={status === 'sending'}>
			{status === 'sending'
				? 'Sending…'
				: booking
					? 'Send booking enquiry'
					: kind === 'personalised'
						? 'Send this to us'
						: 'Send enquiry'}
		</button>

		{#if status === 'error'}
			<p class="status err">
				Couldn't send that ({errorMessage}). Please email
				<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a> directly.
			</p>
		{/if}
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 720px;
	}

	.booking-banner {
		display: flex;
		flex-direction: column;
		gap: 2px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-left: 3px solid var(--phwa);
		border-radius: 6px;
		padding: 0.9rem 1.1rem;
		margin: 0;
	}
	.bb-label {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--stone);
	}
	.bb-name {
		font-family: var(--display);
		font-size: 21px;
		line-height: 1.2;
		color: var(--ink);
	}
	.bb-meta {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--stone);
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
	.field input[type='tel'],
	.field input[type='date'],
	.field input[type='number'],
	.field select,
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
	.field select:focus,
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
		opacity: 0.55;
		cursor: not-allowed;
	}

	.status {
		font-size: 15px;
		margin: 0;
	}
	.status.err {
		color: #b8305a;
	}

	.gotcha {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	.done {
		background: var(--white);
		border: 1px solid var(--rule);
		border-left: 3px solid var(--canopy);
		border-radius: 6px;
		padding: 1.6rem 1.8rem;
		max-width: 720px;
	}
	.done h3 {
		font-family: var(--display);
		font-weight: 500;
		font-size: 22px;
		margin-bottom: 0.5rem;
	}
	.done p {
		color: var(--stone);
		margin-bottom: 1rem;
	}
	.again {
		background: none;
		border: 0;
		padding: 0;
		font-family: var(--body);
		font-weight: 700;
		font-size: 14.5px;
		color: var(--canopy);
		border-bottom: 1.5px solid var(--canopy);
		cursor: pointer;
	}
	.again:hover {
		color: var(--phwa);
		border-color: var(--phwa);
	}

	@media (max-width: 560px) {
		.field-row {
			grid-template-columns: 1fr;
		}
	}
</style>
