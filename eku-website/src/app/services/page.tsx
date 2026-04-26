import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  Gem,
  Building2,
  LineChart,
  ArrowRight,
  Check,
} from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Послуги — судова експертиза та оцінка",
  description:
    "Чотири напрями: судово-економічна, товарознавча, будівельно-технічна експертиза та незалежна оцінка.",
};

const ICONS = {
  scale: Scale,
  gem: Gem,
  building: Building2,
  lineChart: LineChart,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Послуги"
        title="Чотири напрями експертизи"
        description="Кожен напрям ведуть профільні експерти з багаторічною практикою. Висновки оформлюються відповідно до вимог процесуального законодавства України."
      />

      <Container className="py-16 sm:py-20">
        <div className="space-y-20">
          {services.map((s) => {
            const Icon = ICONS[s.iconKey];
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="scroll-mt-24 grid gap-10 md:grid-cols-12"
              >
                <div className="md:col-span-4">
                  <div className="grid h-14 w-14 place-items-center rounded-lg border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl leading-tight tracking-tight text-[var(--color-fg)] sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {s.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold-bright)] hover:text-[var(--color-gold)]"
                  >
                    Замовити цю експертизу
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="md:col-span-8">
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 p-7">
                    <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      Що входить
                    </h3>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm text-[var(--color-fg)]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      Типові ситуації
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {s.situations.map((q) => (
                        <li
                          key={q}
                          className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev-2)]/60 px-4 py-3 text-sm text-[var(--color-fg-muted)]"
                        >
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </>
  );
}
