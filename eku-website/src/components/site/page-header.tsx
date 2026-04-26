import { Container } from "./container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-elev)]/30 pt-16 pb-14 sm:pt-24 sm:pb-20">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)]">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-[var(--color-fg)] sm:text-5xl md:text-[56px]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
