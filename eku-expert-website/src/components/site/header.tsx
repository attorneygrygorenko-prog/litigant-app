"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "./container";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/services", label: "Послуги" },
  { href: "/experts", label: "Експерти" },
  { href: "/publications", label: "Публікації" },
  { href: "/contact", label: "Контакти" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] glass-strong">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 inline-flex items-center gap-1.5 rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-4 py-2 text-sm font-medium text-[var(--color-gold-bright)] transition-all hover:bg-[var(--color-gold)]/20 hover:border-[var(--color-gold)]/70"
          >
            Замовити експертизу
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-[var(--color-border)] text-[var(--color-fg)] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-[var(--color-border)] transition-[max-height] duration-300",
          open ? "max-h-[420px]" : "max-h-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base text-[var(--color-fg)] transition-colors hover:bg-[var(--color-bg-elev)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/15 px-4 py-3 text-sm font-medium text-[var(--color-gold-bright)]"
          >
            Замовити експертизу
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </div>
    </header>
  );
}
