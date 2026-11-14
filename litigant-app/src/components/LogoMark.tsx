/**
 * Litigant mark — "Evolution": two nested hairline L's (ink + gold),
 * the 2026 refinement of the original double-L. Inline SVG, no raster.
 * tone="dark" → for dark grounds (ivory + champagne gold);
 * tone="light" → for light grounds (ink + deep gold).
 */
export const MARK_OUTER = 'M9 5V41H33';
export const MARK_INNER = 'M17 11V33H39';

export default function LogoMark({
  tone = 'dark',
  size = 44,
  className
}: {
  tone?: 'dark' | 'light';
  size?: number;
  className?: string;
}) {
  const ink = tone === 'dark' ? '#f2ede4' : '#16140f';
  const gold = tone === 'dark' ? '#c9a96e' : '#7a5c24';
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth={2.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path className="lm-outer" d={MARK_OUTER} stroke={ink} />
      <path className="lm-inner" d={MARK_INNER} stroke={gold} />
    </svg>
  );
}
