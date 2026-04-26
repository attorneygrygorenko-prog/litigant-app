import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-[var(--color-fg)] sm:text-4xl md:text-[42px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
