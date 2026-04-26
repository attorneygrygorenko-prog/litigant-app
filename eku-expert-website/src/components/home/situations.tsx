"use client";

import { motion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { services } from "@/lib/data";

export function Situations() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-elev)]/30 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Чи вам потрібна експертиза?"
          title="Конкретні ситуації, з якими до нас приходять"
          description="Якщо у вашій справі звучить щось схоже — це привід для попередньої консультації."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, idx) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev-2)]/50 p-6"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                {s.short.split(",")[0]}
              </div>
              <h3 className="mt-2 font-display text-lg leading-snug text-[var(--color-fg)]">
                {s.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {s.situations.map((q) => (
                  <li
                    key={q}
                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]"
                  >
                    <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]/70" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
