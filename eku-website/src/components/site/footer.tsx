import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "./container";
import { company, services } from "@/lib/data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-elev)]/40">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-fg-muted)]">
            Незалежна судова експертиза та оцінка. Висновки, що тримаються в
            суді — від економічних спорів до товарознавчих та будівельних справ.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[var(--color-gold)]" />
              <a
                href={`mailto:${company.email}`}
                className="hover:text-[var(--color-fg)]"
              >
                {company.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[var(--color-gold)]" />
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="hover:text-[var(--color-fg)]"
              >
                {company.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
              {company.address}
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-xs uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
            Послуги
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
            Установа
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/experts"
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                Команда експертів
              </Link>
            </li>
            <li>
              <Link
                href="/publications"
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                Публікації
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                Замовити експертизу
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[var(--color-border)]">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-[var(--color-fg-dim)] sm:flex-row">
          <span>
            © {year} {company.fullName}. Всі права захищені.
          </span>
          <span>
            {company.city}, {company.country}
          </span>
        </Container>
      </div>
    </footer>
  );
}
