"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Container } from "@/components/site/container";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-[var(--color-gold)]/25 bg-gradient-to-br from-[var(--color-bg-elev-2)] to-[var(--color-bg-elev)] p-10 text-center sm:p-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(600px 280px at 50% 0%, rgba(212,175,55,0.15), transparent 70%)",
            }}
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-gold-bright)]">
            <MessageSquareText className="h-3.5 w-3.5" />
            Безкоштовна попередня консультація
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl leading-tight tracking-tight text-[var(--color-fg)] sm:text-5xl">
            Опишіть вашу справу — підкажемо,{" "}
            <span className="text-gradient-gold">який тип експертизи</span>{" "}
            потрібен
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)]">
            До 24 годин на відповідь. Конфіденційність гарантується. Без
            зобов&apos;язань.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-gold)] px-7 py-3 text-sm font-semibold text-[#1a1408] shadow-[0_8px_30px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02]"
            >
              Залишити заявку
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+380000000000"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)]/60 px-7 py-3 text-sm font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-gold)]/40"
            >
              Зателефонувати
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
