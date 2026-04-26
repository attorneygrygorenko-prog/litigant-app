import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ЕКУ — головна"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className="relative grid h-9 w-9 place-items-center rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-bg-elev)] shadow-[0_0_24px_rgba(212,175,55,0.15)] transition-shadow group-hover:shadow-[0_0_32px_rgba(212,175,55,0.35)]"
      >
        <span className="font-display text-[15px] font-semibold tracking-tight text-gradient-gold">
          Е
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-semibold tracking-tight text-[var(--color-fg)]">
          ЕКУ
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          Експертно-криміналістична установа
        </span>
      </span>
    </Link>
  );
}
