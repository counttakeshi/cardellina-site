export interface Env {
	RESEND_API_KEY: string;
	ALLOWED_ORIGIN?: string;
	TO_EMAIL?: string;
}

interface EnquiryPayload {
	name?: string;
	email?: string;
	preferredDates?: string;
	groupSize?: string;
	tripType?: string;
	targetSpecies?: string;
	message?: string;
}

function corsHeaders(origin: string) {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	};
}

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const origin = env.ALLOWED_ORIGIN ?? 'https://cardellina.com';

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders(origin) });
		}

		if (request.method !== 'POST') {
			return new Response('Method not allowed', { status: 405, headers: corsHeaders(origin) });
		}

		let payload: EnquiryPayload;
		try {
			payload = await request.json();
		} catch {
			return new Response('Invalid JSON', { status: 400, headers: corsHeaders(origin) });
		}

		const name = (payload.name ?? '').trim();
		const email = (payload.email ?? '').trim();

		if (!name || !email || !isValidEmail(email)) {
			return new Response('Missing or invalid required fields', {
				status: 400,
				headers: corsHeaders(origin)
			});
		}

		const lines = [
			`Name: ${name}`,
			`Email: ${email}`,
			payload.preferredDates ? `Preferred dates: ${payload.preferredDates}` : null,
			payload.groupSize ? `Group size: ${payload.groupSize}` : null,
			payload.tripType ? `Trip type: ${payload.tripType}` : null,
			payload.targetSpecies ? `Target species: ${payload.targetSpecies}` : null,
			payload.message ? `Message: ${payload.message}` : null
		].filter(Boolean);

		const resendRes = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'Cardellina site <enquiries@cardellina.com>',
				to: [env.TO_EMAIL ?? 'info@cardellina.com'],
				reply_to: email,
				subject: `New enquiry from ${name}`,
				text: lines.join('\n')
			})
		});

		if (!resendRes.ok) {
			const detail = await resendRes.text();
			return new Response(`Failed to send: ${detail}`, {
				status: 502,
				headers: corsHeaders(origin)
			});
		}

		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
		});
	}
};
