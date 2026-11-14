import { ImageResponse } from "next/og";

export const runtime = "edge";
export const revalidate = 86400;

const NAVY = "#0b0b0d";
const NAVY_LIGHT = "#1d1d21";
const GOLD = "#c9a96e";
const GOLD_LIGHT = "#d6b981";
const IVORY = "#f2ede4";

/**
 * Load a Cyrillic-capable Google Font as ArrayBuffer for satori.
 * Manrope ships Cyrillic subset; fetched once and cached by Vercel
 * `revalidate=86400` (24h) — refresh free.
 */
async function loadFont(weight: 400 | 600 | 700): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&display=swap&subset=cyrillic`;
    const cssRes = await fetch(cssUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+\.woff2)\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET() {
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]);

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }> = [];
  if (regular)
    fonts.push({ name: "Manrope", data: regular, weight: 400, style: "normal" });
  if (bold)
    fonts.push({ name: "Manrope", data: bold, weight: 700, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: NAVY,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope, sans-serif",
          color: IVORY,
          position: "relative",
        }}
      >
        {/* Top accent — thin gold gradient line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, transparent 0%, ${GOLD} 50%, transparent 100%)`,
            display: "flex",
          }}
        />

        {/* Main content — L logo + LITIGANT wordmark */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            padding: "0 80px",
          }}
        >
          {/* Litigant mark — two nested hairline L's */}
          <svg width="200" height="200" viewBox="0 0 48 48" fill="none" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter" style={{ flexShrink: 0 }}>
            <path d="M9 5V41H33" stroke={IVORY} />
            <path d="M17 11V33H39" stroke={GOLD} />
          </svg>

          {/* Wordmark + subtitle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: "96px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: IVORY,
                lineHeight: 1,
              }}
            >
              LITIGANT
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 400,
                color: GOLD_LIGHT,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Law Office
            </div>
          </div>
        </div>

        {/* Bottom band — subtitle + URL */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            padding: "0 80px 60px",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              fontWeight: 400,
              color: "rgba(246, 245, 241, 0.78)",
              letterSpacing: "0.06em",
              display: "flex",
            }}
          >
            Адвокатське бюро · Київ · Одеса
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: GOLD,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            www.litigant.legal
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // default is `immutable, max-age=1y` — messengers then never refetch
      headers: { 'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' },
      ...(fonts.length > 0 ? { fonts } : {}),
    }
  );
}
