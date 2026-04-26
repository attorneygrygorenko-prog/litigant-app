"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { partners } from "@/lib/data";

export function PartnersSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Партнери"
          title="Працюємо з провідними інституціями"
          align="center"
        />

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.url}
                target={p.url.startsWith("http") ? "_blank" : undefined}
                rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/40 px-5 py-7 text-center transition-colors hover:border-[var(--color-gold)]/40"
              >
                <span className="font-display text-base font-semibold text-[var(--color-fg)]">
                  {p.short}
                </span>
                <span className="text-xs leading-snug text-[var(--color-fg-muted)]">
                  {p.name}
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
