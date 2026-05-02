import { NextResponse } from 'next/server';
import { appendLead, type LeadRow } from '@/lib/sheets';
import { sendLeadEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED: (keyof LeadRow)[] = ['name', 'position', 'company', 'challenge', 'contact'];

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
      // Don't block the user response on slow CRMs; cap at 4s.
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

  const row: LeadRow = {
    name: clean(body.name, 200),
    position: clean(body.position, 200),
    company: clean(body.company, 200),
    industry: clean(body.industry, 200),
    challenge: clean(body.challenge, 4000),
    asset_value: clean(body.asset_value, 200),
    contact: clean(body.contact, 200),
    locale: clean(body.locale, 8),
    page: clean(body.page, 500)
  };

  for (const k of REQUIRED) {
    if (!row[k]) {
      return NextResponse.json({ ok: false, error: `missing-${k}` }, { status: 400 });
    }
  }

  const utm = {
    utm_source: clean(body.utm_source, 200),
    utm_medium: clean(body.utm_medium, 200),
    utm_campaign: clean(body.utm_campaign, 200),
    utm_content: clean(body.utm_content, 200),
    utm_term: clean(body.utm_term, 200)
  };

  try {
    await appendLead(row);
  } catch (err) {
    console.error('lead append failed', err);
    return NextResponse.json({ ok: false, error: 'sheets-failed' }, { status: 500 });
  }

  await notifyCrm({
    timestamp: new Date().toISOString(),
    name: row.name,
    position: row.position,
    company: row.company,
    industry: row.industry,
    challenge: row.challenge,
    asset_value: row.asset_value,
    contact: row.contact,
    locale: row.locale,
    source_page: row.page,
    ai_score: '',
    ...utm
  });

  // Email notification — fully isolated from the user response by the helper's
  // internal try/catch. A Resend outage / unverified domain / missing API key
  // will not flip the form into the err state.
  await sendLeadEmail({
    ...row,
    source: clean(body.source, 200),
    ai_review: clean(body.ai_review, 2000)
  });

  return NextResponse.json({ ok: true });
}
