"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, Gem, Building2, LineChart, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { services } from "@/lib/data";

const ICONS = {
  scale: Scale,
  gem: Gem,
  building: Building2,
  lineChart: LineChart,
} as const;

export function ServicesGrid() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Спектр послуг"
          title="Чотири напрями експертизи під одним дахом"
          description="Від бухгалтерських спорів до гемологічної експертизи — ми покриваємо повний цикл задач, з якими стикаються адвокати, бізнес та приватні особи."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((service, idx) => {
            const Icon = ICONS[service.iconKey];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <Link
                  href={`/services#${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/70 p-7 transition-all hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-bg-elev-2)]"
                >
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--color-gold)]/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-lg border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[var(--color-fg-dim)] transition-all group-hover:text-[var(--color-gold)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-[var(--color-fg)]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-1.5 text-sm text-[var(--color-fg-muted)]">
                    {service.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-gold)]/60"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
