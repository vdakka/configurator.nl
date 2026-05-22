import { NextResponse } from 'next/server';

/**
 * Placeholder endpoint. Replace with real CRM/mail integration before go-live.
 * For now: logs to server console and returns 200.
 *
 * TODO go-live:
 *  - validate reCAPTCHA token (server-side verify against Google API)
 *  - send to HubSpot/Mailgun/eigen endpoint
 *  - sla nieuwsbrief-opt-in apart op
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // eslint-disable-next-line no-console
    console.info('[contact-submit]', body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}
