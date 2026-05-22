import { NextResponse } from 'next/server';

/**
 * Placeholder endpoint. Replace with real CRM/mail integration before go-live.
 * For now: logs to server console and returns 200.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // eslint-disable-next-line no-console
    console.info('[quickscan-submit]', body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}
