<script lang="ts">
	import { CONTACT_ENDPOINT, CONTACT_EMAIL, ENQUIRY_TOPICS, whatsappLink } from '$lib/config';

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
	/** The optional topic, held in state only so it can shape the subject line. */
	let topic = $state('');

	const booking = $derived(kind === 'day' || kind === 'multi-day');

	const subject = $derived(
		tourName
			? `${kind === 'day' ? 'Day tour' : 'Multi-day'} booking: ${tourName}`
			: kind === 'personalised'
				? 'Personalised trip enquiry from cardellina.com'
				: topic
					? `Enquiry: ${topic}`
					: 'New enquiry from cardellina.com'
	);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		// A second submit while the first is in flight would send the enquiry twice.
		// The button is disabled as well, but Enter pressed in a text field can beat
		// the re-render, so the guard lives here too.
		if (status === 'sending') return;

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

			// Only past this line has anything actually been delivered. Nothing above
			// claims it was: a form that says "sent" when it wasn't costs us the
			// enquiry and the sender never learns to try again.
			status = 'sent';
			form.reset();
			topic = '';
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
		}
	}
</script>

{#if status === 'sent'}
	<div class="done" role="status" aria-live="polite">
		<h3>Thanks — that's with us.</h3>
		<p>
			{#if booking && tourName}
				We've got your enquiry about <strong>{tourName}</strong>. One of us will read it and reply
				within 24 hours, usually sooner. Nothing is booked until we've agreed the details with you.
			{:else}
				One of us will read it and reply within 24 hours, usually sooner. The reply comes from
				<strong>{CONTACT_EMAIL}</strong>, so it is worth a glance in your spam folder if nothing
				turns up.
			{/if}
		</p>
		<button class="again" onclick={() => (status = 'idle')}>Send another enquiry</button>
	</div>
{:else}
	<!--
		action and method are set for the case where this form is submitted before
		Svelte has hydrated, or on a visit where the JavaScript never arrives at all.
		The browser default for a form with neither is a GET to the current URL,
		which reloads the page, discards the enquiry, and writes the sender's name,
		address and message into the query string, the history and the referrer.
		Pointing the fallback at the real endpoint means a submit that beats
		hydration still delivers; it simply lands on Formspree's own confirmation
		page rather than ours. handleSubmit prevents the default once hydrated, so
		this path is only ever the safety net.
	-->
	<form action={CONTACT_ENDPOINT} method="post" onsubmit={handleSubmit}>
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

		{#if kind !== 'general'}
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
		{/if}

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
					<input
						id="cf-start"
						name="Preferred start"
						type="text"
						placeholder="e.g. March 2027"
						required
					/>
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
			<!-- General enquiry: four fields, one of them optional. Somebody who only
			     wants to ask a question has not decided anything yet — dates, group
			     size and a target list are the things they came here to work out, so
			     asking for them here is asking for the answer before the question. -->
			<div class="field">
				<label for="cf-topic">What it's about <span class="opt">optional</span></label>
				<select id="cf-topic" name="Topic" bind:value={topic}>
					<option value="">No need to pick one — it just helps us answer faster</option>
					{#each ENQUIRY_TOPICS as t (t)}
						<option>{t}</option>
					{/each}
				</select>
			</div>
		{/if}

		{#if booking}
			<div class="field">
				<label for="cf-species">Target species</label>
				<input
					id="cf-species"
					name="Target species"
					type="text"
					placeholder="Birds you'd most like to see"
				/>
			</div>

			<div class="field">
				<label for="cf-needs">Dietary or mobility needs</label>
				<input id="cf-needs" name="Dietary or mobility needs" type="text" />
			</div>
		{/if}

		<div class="field">
			<label for="cf-msg">
				{#if booking || kind === 'personalised'}
					Anything else we should know?
				{:else}
					Your message *
				{/if}
			</label>
			<textarea
				id="cf-msg"
				name="Message"
				rows="5"
				placeholder={kind === 'general'
					? "A question, a bird you're chasing, or just where you've got to in planning"
					: ''}
				required={kind === 'general'}
			></textarea>
		</div>

		<!-- Unticked, and it stays unticked. Adding an enquirer to a mailing list
		     without asking is the thing that generates complaints, and in the EU
		     a pre-ticked box is not consent at all — so the tick here is what
		     makes the list lawful, not the paragraph in the privacy policy.
		     Someone already writing in about a trip ticks this readily. -->
		<label class="optin">
			<input type="checkbox" name="Mailing list" value="Yes, add me" />
			<span>Send me the occasional trip report and news of new routes. No more than a few a year.</span>
		</label>

		<!-- Honeypot: off-screen rather than display:none, since some bots skip
		     hidden inputs but will fill anything they can read. Last in the form
		     rather than first — an unlabelled text input at the top of a contact
		     form is exactly what a password manager or an eager autofill reaches
		     for, and anything landing here gets the enquiry silently binned as
		     spam while the sender is still shown a success message. -->
		<input
			class="gotcha"
			type="text"
			name="_gotcha"
			tabindex="-1"
			autocomplete="off"
			aria-hidden="true"
		/>

		<div class="actions">
			<button class="submit-btn" type="submit" disabled={status === 'sending'}>
				{#if status === 'sending'}
					Sending…
				{:else if booking}
					Send booking enquiry
				{:else if kind === 'personalised'}
					Send this to us
				{:else}
					Send it
				{/if}
			</button>
			<p class="fine">We reply within 24 hours. Your details stay with us.</p>
		</div>

		<p class="status err" role="alert" aria-live="assertive" hidden={status !== 'error'}>
			That didn't send ({errorMessage}). Please email
			<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>
			or
			<a href={whatsappLink()} target="_blank" rel="noopener">message us on WhatsApp</a> — we would
			much rather hear from you than lose the question.
		</p>
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

	/* 12px and the ink, not 11px and the stone. These are the only thing telling
	   somebody what to type, they are set in uppercase mono with letter-spacing,
	   and a good share of the people reading them are birders in their sixties
	   on a phone in daylight. */
	.field label {
		display: block;
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--ink);
		margin-bottom: 0.4rem;
		padding: 0;
	}

	.opt {
		font-weight: 400;
		letter-spacing: 0.04em;
		color: var(--stone);
		text-transform: none;
	}
	.opt::before {
		content: '· ';
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
		/* 16px, or iOS zooms the page in on focus and never zooms back out. */
		font-size: 16px;
		color: var(--ink);
		background: var(--white);
		/* --rule against --paper is 1.28:1, well under the 3:1 WCAG asks of a
		   control's boundary — white boxes on off-white paper, findable only by
		   their labels. This is the border that makes them read as fields. */
		border: 1px solid #8b918c;
		border-radius: 3px;
		padding: 12px 13px;
	}

	.field input:focus,
	.field select:focus,
	.field textarea:focus {
		outline: 2px solid var(--phwa);
		outline-offset: -1px;
		border-color: var(--phwa);
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: var(--stone);
	}

	.field textarea {
		resize: vertical;
		min-height: 120px;
	}

	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.optin {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		margin-top: 0.2rem;
		font-size: 14px;
		line-height: 1.55;
		color: var(--stone);
		cursor: pointer;
		max-width: 56ch;
	}
	.optin input {
		width: 18px;
		height: 18px;
		margin-top: 0.14em;
		flex-shrink: 0;
		accent-color: var(--phwa);
		cursor: pointer;
	}
	.optin input:focus-visible {
		outline: 2px solid var(--canopy);
		outline-offset: 2px;
	}

	.actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.6rem 1.2rem;
		margin-top: 0.6rem;
	}

	.submit-btn {
		background: var(--phwa);
		color: #fff;
		border: 0;
		border-radius: 3px;
		font-family: var(--body);
		font-weight: 700;
		font-size: 16px;
		letter-spacing: 0.02em;
		padding: 15px 32px;
		min-height: 48px;
		cursor: pointer;
		transition: background 0.18s;
	}
	.submit-btn:hover:not(:disabled) {
		background: #bf3a61;
	}
	.submit-btn:focus-visible {
		outline: 2px solid var(--ink);
		outline-offset: 2px;
	}
	.submit-btn:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.fine {
		font-size: 13.5px;
		color: var(--stone);
		margin: 0;
	}

	.status {
		font-size: 15px;
		line-height: 1.6;
		margin: 0;
	}
	.status.err {
		color: #a82a52;
	}
	.status[hidden] {
		display: none;
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
		line-height: 1.65;
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
		.submit-btn {
			width: 100%;
		}
	}
</style>
