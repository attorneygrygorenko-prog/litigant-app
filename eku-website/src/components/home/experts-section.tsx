"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { experts } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ExpertsSection() {
  return (
    <section id="experts" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Команда"
            title="Експерти, чиї висновки звучать у судах"
            description="Кожен експерт — сертифікований фахівець із багаторічною практикою у своїй галузі."
          />
          <Link
            href="/experts"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold-bright)] hover:text-[var(--color-gold)]"
          >
            Усі експерти
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {experts.map((e, idx) => (
            <motion.article
              key={e.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="group flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/70 p-7 transition-colors hover:border-[var(--color-gold)]/40"
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/40 bg-gradient-to-br from-[var(--color-gold)]/15 to-transparent font-display text-lg font-semibold text-[var(--color-gold-bright)]"
                >
                  {initials(e.name)}
                </div>
                <div>
                  <h3 className="font-display text-lg leading-tight text-[var(--color-fg)]">
                    {e.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                    {e.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {e.bio}
              </p>

              <ul className="mt-5 space-y-1.5">
                {e.credentials.slice(0, 3).map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-xs text-[var(--color-fg-muted)]"
                  >
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-gold)]" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
