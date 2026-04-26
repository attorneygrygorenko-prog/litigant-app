"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { publications } from "@/lib/data";

function authorInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PublicationsSection() {
  return (
    <section
      id="publications"
      className="border-y border-[var(--color-border)] bg-[var(--color-bg-elev)]/30 py-20 sm:py-28"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Публікації"
            title="Експерти ЕКУ в провідних виданнях"
            description="Колонки та коментарі наших фахівців у Liga.net, Юридичній газеті та інших профільних медіа."
          />
          <Link
            href="/publications"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold-bright)] hover:text-[var(--color-gold)]"
          >
            Усі публікації
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {publications.map((p, idx) => (
            <motion.a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev-2)]/70 transition-all hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-bg-elev-2)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 px-6 py-3">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-gold)]">
                  <Newspaper className="h-3.5 w-3.5" />
                  {p.source}
                </div>
                <span className="text-xs text-[var(--color-fg-dim)]">
                  {p.date}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block self-start rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)]/60 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                  {p.category}
                </span>

                <h3 className="mt-4 font-display text-lg leading-snug text-[var(--color-fg)] group-hover:text-[var(--color-gold-bright)]">
                  {p.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {p.preview}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      aria-hidden
                      className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[10px] font-semibold text-[var(--color-gold-bright)]"
                    >
                      {authorInitials(p.authorName)}
                    </div>
                    <span className="text-xs text-[var(--color-fg-muted)]">
                      {p.authorName}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[var(--color-fg-dim)] transition-colors group-hover:text-[var(--color-gold)]" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
