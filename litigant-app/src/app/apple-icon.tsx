import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0b0d' }}>
        <svg width="132" height="132" viewBox="0 0 48 48" fill="none" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M9 5V41H33" stroke="#f2ede4" />
          <path d="M17 11V33H39" stroke="#c9a96e" />
        </svg>
      </div>
    ),
    size
  );
}
