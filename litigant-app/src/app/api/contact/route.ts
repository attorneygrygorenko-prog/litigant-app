import { NextResponse } from 'next/server';
import { sendContactEmail, type Office } from '@/lib/smtp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clean(v: unknown, max = 2000): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function isOffice(v: string): v is Office {
  return v === 'kyiv' || v === 'odesa';
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const name = clean(body.name, 200);
  const contact = clean(body.contact, 200);
  const office = clean(body.office, 16);
  const message = clean(body.message, 4000);
  const page = clean(body.page, 500);
  const locale = clean(body.locale, 8);

  if (!name) return NextResponse.json({ error: 'missing-name' }, { status: 400 });
  if (!contact) return NextResponse.json({ error: 'missing-contact' }, { status: 400 });
  if (!office) return NextResponse.json({ error: 'missing-office' }, { status: 400 });
  if (!isOffice(office)) return NextResponse.json({ error: 'invalid-office' }, { status: 400 });

  const result = await sendContactEmail({
    name,
    contact,
    office,
    message: message || undefined,
    page: page || undefined,
    locale: locale || undefined
  });

  if (!result.ok) {
    const status = result.error === 'smtp-not-configured' ? 503 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true });
}
