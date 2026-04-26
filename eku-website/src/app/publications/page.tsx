import type { Metadata } from "next";
import { Newspaper, ExternalLink } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { publications, experts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Публікації експертів",
  description:
    "Колонки та коментарі експертів ЕКУ в Liga.net, Юридичній газеті та інших профільних медіа.",
};

function authorInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PublicationsPage() {
  const grouped = experts.map((e) => ({
    expert: e,
    items: publications.filter((p) => p.authorSlug === e.slug),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Публікації"
        title="Експерти ЕКУ в провідних виданнях"
        description="Колонки, коментарі та аналітика наших фахівців у Liga.net, Юридичній газеті та інших профільних медіа."
      />

      <Container className="py-16 sm:py-20">
        <div className="space-y-16">
          {grouped.map(({ expert, items }) =>
            items.length === 0 ? null : (
              <section
                key={expert.slug}
                id={expert.slug}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 text-xs font-semibold text-[var(--color-gold-bright)]"
                  >
                    {authorInitials(expert.name)}
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-[var(--color-fg)]">
                      {expert.name}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                      {expert.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {items.map((p) => (
                    <a
                      key={p.title}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 transition-all hover:border-[var(--color-gold)]/40"
                    >
                      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-elev-2)]/50 px-5 py-3">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-gold)]">
                          <Newspaper className="h-3.5 w-3.5" />
                          {p.source}
                        </div>
                        <span className="text-xs text-[var(--color-fg-dim)]">
                          {p.date}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="inline-block self-start rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elev-2)]/60 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                          {p.category}
                        </span>
                        <h3 className="mt-3 font-display text-base leading-snug text-[var(--color-fg)] group-hover:text-[var(--color-gold-bright)]">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                          {p.preview}
                        </p>
                        <div className="mt-5 flex items-center justify-end border-t border-[var(--color-border)] pt-3">
                          <ExternalLink className="h-4 w-4 text-[var(--color-fg-dim)] transition-colors group-hover:text-[var(--color-gold)]" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ),
          )}
        </div>
      </Container>
    </>
  );
}
