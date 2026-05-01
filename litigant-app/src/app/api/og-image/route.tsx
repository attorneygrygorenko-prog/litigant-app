import { ImageResponse } from "next/og";

export const runtime = "edge";
export const revalidate = 86400;

const NAVY = "#0D1B3E";
const NAVY_LIGHT = "#1A2B64";
const GOLD = "#B8941E";
const GOLD_LIGHT = "#CDA82A";
const IVORY = "#F6F5F1";

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
          {/* Big "L" — gold square with serif L */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "200px",
              background: GOLD,
              fontSize: "180px",
              fontWeight: 700,
              color: NAVY,
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            L
          </div>

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
      ...(fonts.length > 0 ? { fonts } : {}),
    }
  );
}
