import Link from "next/link";
import { getLocale } from "next-intl/server";

const COPY = {
  ua: {
    title: "Сторінку не знайдено",
    description:
      "Можливо, адресу введено з помилкою або сторінку було перенесено.",
    back: "← Повернутись на головну",
  },
  en: {
    title: "Page not found",
    description:
      "The address may have been mistyped or the page has been moved.",
    back: "← Back to home",
  },
  ro: {
    title: "Pagina nu a fost găsită",
    description:
      "Este posibil ca adresa să fie greșită sau pagina să fi fost mutată.",
    back: "← Înapoi la pagina principală",
  },
} as const;

type LocaleKey = keyof typeof COPY;

/**
 * 404 для будь-якого invalid маршруту всередині [locale]. Render-ається
 * усередині [locale]/layout.tsx → автоматично огорнутий Header + Footer.
 * Server Component — використовує `getLocale()` з next-intl/server.
 */
export default async function NotFound() {
  const locale = (await getLocale()) as LocaleKey;
  const m = COPY[locale] ?? COPY.ua;

  return (
    <section className="sec">
      <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
            maxWidth: 640,
          }}
        >
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--g)",
              margin: 0,
            }}
          >
            404
          </p>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600,
              color: "var(--n)",
              margin: 0,
              letterSpacing: ".04em",
              lineHeight: 1.15,
            }}
          >
            {m.title}
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "#4A4845",
              margin: 0,
            }}
          >
            {m.description}
          </p>
          <Link
            href={`/${locale}`}
            style={{
              fontFamily: "var(--sans)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--n)",
              padding: "11px 22px",
              border: "1px solid var(--n)",
              textDecoration: "none",
              marginTop: 8,
              display: "inline-block",
            }}
          >
            {m.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
