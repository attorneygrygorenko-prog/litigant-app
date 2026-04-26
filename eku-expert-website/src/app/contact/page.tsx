import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { LeadForm } from "@/components/contact/lead-form";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакти — замовити експертизу",
  description:
    "Замовити судову експертизу або оцінку. Безкоштовна попередня консультація. Конфіденційність гарантується.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакти"
        title="Замовити експертизу"
        description="Опишіть вашу справу — підкажемо, який тип експертизи потрібен. До 24 годин на відповідь, без зобов'язань."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-xl text-[var(--color-fg)]">
              Як з нами зв&apos;язатися
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              Найшвидше отримати відповідь — заповнити форму праворуч. Ми
              зв&apos;яжемося з вами протягом робочого дня.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <ContactRow
                icon={<Mail className="h-4 w-4 text-[var(--color-gold)]" />}
                label="Email"
              >
                <a
                  href={`mailto:${company.email}`}
                  className="text-[var(--color-fg)] hover:text-[var(--color-gold-bright)]"
                >
                  {company.email}
                </a>
              </ContactRow>
              <ContactRow
                icon={<Phone className="h-4 w-4 text-[var(--color-gold)]" />}
                label="Телефон"
              >
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="text-[var(--color-fg)] hover:text-[var(--color-gold-bright)]"
                >
                  {company.phone}
                </a>
              </ContactRow>
              <ContactRow
                icon={<MapPin className="h-4 w-4 text-[var(--color-gold)]" />}
                label="Адреса"
              >
                <span className="text-[var(--color-fg)]">
                  {company.address}
                </span>
              </ContactRow>
              <ContactRow
                icon={<Clock className="h-4 w-4 text-[var(--color-gold)]" />}
                label="Графік"
              >
                <span className="text-[var(--color-fg)]">
                  Пн–Пт, 09:00–18:00
                </span>
              </ContactRow>
            </ul>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 p-7 sm:p-9">
              <LeadForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10">
        {icon}
      </span>
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
          {label}
        </div>
        <div className="mt-0.5">{children}</div>
      </div>
    </li>
  );
}
