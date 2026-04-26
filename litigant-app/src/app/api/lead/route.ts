import { NextResponse } from 'next/server';
import { appendLead, type LeadRow } from '@/lib/sheets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED: (keyof LeadRow)[] = ['name', 'position', 'company', 'challenge', 'contact'];

function clean(v: unknown, max = 2000) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
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

  try {
    await appendLead(row);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('lead append failed', err);
    return NextResponse.json({ ok: false, error: 'sheets-failed' }, { status: 500 });
  }
}
