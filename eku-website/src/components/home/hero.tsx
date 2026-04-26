"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, FileCheck2, Scale } from "lucide-react";
import { Container } from "@/components/site/container";

const TRUST = [
  { icon: ShieldCheck, label: "Незалежний експертний висновок" },
  { icon: FileCheck2, label: "Тримається в суді" },
  { icon: Scale, label: "Сертифіковані експерти" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(800px 400px at 50% -10%, rgba(212,175,55,0.12), transparent 70%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-gold-bright)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
            Експертно-Криміналістична Установа
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-[var(--color-fg)] sm:text-6xl md:text-[68px]"
          >
            Експертні висновки, що{" "}
            <span className="text-gradient-gold">тримаються в суді</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg"
          >
            Судово-економічна, товарознавча, будівельно-технічна експертиза та
            незалежна оцінка. Працюємо з адвокатами, бізнесом та фізичними
            особами по всій Україні.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[#1a1408] shadow-[0_8px_30px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02]"
            >
              Замовити експертизу
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)]/60 px-6 py-3 text-sm font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-gold)]/40"
            >
              Послуги установи
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-3"
          >
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 px-3 py-2.5 text-[var(--color-fg-muted)]"
              >
                <Icon className="h-4 w-4 text-[var(--color-gold)]" />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
