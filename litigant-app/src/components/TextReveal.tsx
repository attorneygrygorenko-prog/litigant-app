'use client';

interface Props {
  text: string;
  baseDelay?: number; // ms
  step?: number; // ms per word
  className?: string;
}

/**
 * Word-by-word clip-path reveal. Renders an inline-block .tr-word for each
 * whitespace-separated token. The .tr-inner translates from translateY(100%)
 * to 0 with a staggered animation-delay. CSS in globals.css.
 *
 * Reduced-motion: globals.css resets .tr-inner to opacity:1 / no transform.
 */
export default function TextReveal({ text, baseDelay = 0, step = 80, className }: Props) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="tr-word">
          <span
            className="tr-inner"
            style={{ animationDelay: `${baseDelay + i * step}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
