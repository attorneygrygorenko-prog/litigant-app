import { NextResponse } from 'next/server';
import { getOgPreview } from '@/lib/og';

export const runtime = 'nodejs';
export const revalidate = 86400;

function isAllowedUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url || !isAllowedUrl(url)) {
    return NextResponse.json({ ok: false, error: 'invalid-url' }, { status: 400 });
  }

  const preview = await getOgPreview(url);
  return NextResponse.json(
    { ok: true, preview },
    { headers: { 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800' } }
  );
}
