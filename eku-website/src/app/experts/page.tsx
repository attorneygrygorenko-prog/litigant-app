import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { experts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Експерти — команда ЕКУ",
  description:
    "Сертифіковані експерти ЕКУ: економічна, товарознавча, гемологічна та інші напрями експертизи.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ExpertsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Команда"
        title="Експерти ЕКУ"
        description="Кожен експерт — сертифікований фахівець із багаторічною практикою. Працюють у тісній взаємодії з адвокатами, нотаріусами, бізнесом та фізичними особами."
      />

      <Container className="py-16 sm:py-20">
        <div className="space-y-10">
          {experts.map((e) => (
            <article
              key={e.slug}
              id={e.slug}
              className="scroll-mt-24 grid gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 p-8 md:grid-cols-12 md:p-10"
            >
              <div className="md:col-span-3">
                <div
                  aria-hidden
                  className="grid h-24 w-24 place-items-center rounded-full border border-[var(--color-gold)]/40 bg-gradient-to-br from-[var(--color-gold)]/15 to-transparent font-display text-2xl font-semibold text-[var(--color-gold-bright)]"
                >
                  {initials(e.name)}
                </div>
                <h2 className="mt-5 font-display text-xl leading-tight text-[var(--color-fg)]">
                  {e.name}
                </h2>
                <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                  {e.role}
                </p>
              </div>

              <div className="md:col-span-9">
                <p className="text-base leading-relaxed text-[var(--color-fg-muted)]">
                  {e.bio}
                </p>

                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      Регалії
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {e.credentials.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 text-sm text-[var(--color-fg)]"
                        >
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      Спеціалізація
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {e.expertise.map((x) => (
                        <li
                          key={x}
                          className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elev-2)]/60 px-3 py-1 text-xs text-[var(--color-fg-muted)]"
                        >
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/publications#${e.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold-bright)] hover:text-[var(--color-gold)]"
                  >
                    Публікації експерта
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
