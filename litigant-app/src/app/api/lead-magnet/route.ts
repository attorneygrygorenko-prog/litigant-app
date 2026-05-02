import { NextResponse } from 'next/server';
import { appendLead } from '@/lib/sheets';
import { sendLeadMagnetEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clean(v: unknown, max = 2000) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

async function notifyCrm(payload: Record<string, string>) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000)
    });
  } catch (err) {
    console.error('crm webhook failed', err);
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  const name = clean(body.name, 200);
  const contact = clean(body.contact, 200);
  const locale = clean(body.locale, 8);
  const page = clean(body.page, 500);
  const magnet = clean(body.magnet, 80) || 'search-checklist';

  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: 'missing-fields' }, { status: 400 });
  }

  const utm = {
    utm_source: clean(body.utm_source, 200),
    utm_medium: clean(body.utm_medium, 200),
    utm_campaign: clean(body.utm_campaign, 200),
    utm_content: clean(body.utm_content, 200),
    utm_term: clean(body.utm_term, 200)
  };

  try {
    await appendLead({
      name,
      position: '',
      company: '',
      industry: `lead_magnet:${magnet}`,
      challenge: 'Lead magnet download request',
      asset_value: '',
      contact,
      locale,
      page
    });
  } catch (err) {
    console.error('lead magnet append failed', err);
    return NextResponse.json({ ok: false, error: 'sheets-failed' }, { status: 500 });
  }

  await notifyCrm({
    timestamp: new Date().toISOString(),
    type: 'lead_magnet',
    magnet,
    name,
    contact,
    locale,
    source_page: page,
    ...utm
  });

  await sendLeadMagnetEmail({ name, contact, locale, page, magnet });

  return NextResponse.json({ ok: true });
}
