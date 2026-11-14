import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const revalidate = 86400;

/** 512×512 PNG of the Litigant mark — for JSON-LD Organization.logo and anywhere a raster is required. */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0b0d' }}>
        <svg width="400" height="400" viewBox="0 0 48 48" fill="none" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M9 5V41H33" stroke="#f2ede4" />
          <path d="M17 11V33H39" stroke="#c9a96e" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
