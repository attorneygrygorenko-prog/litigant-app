"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--color-gold)]" />
        <h3 className="mt-4 font-display text-xl text-[var(--color-fg)]">
          Заявку прийнято
        </h3>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
          Зв&apos;яжемося протягом 24 годин.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold-bright)] hover:text-[var(--color-gold)]"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ім'я" name="name" required />
        <Field
          label="Контактний телефон або email"
          name="contact"
          required
          type="text"
          placeholder="+380 / your@email"
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-muted)]"
        >
          Тип експертизи
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className="mt-2 w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elev-2)]/60 px-4 py-2.5 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]/60"
        >
          <option value="">Не впевнений / порадьте</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-muted)]"
        >
          Стисло про справу
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Опишіть ситуацію — суть спору, зразкові суми, чи є вже ухвала суду тощо."
          className="mt-2 w-full resize-y rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elev-2)]/60 px-4 py-3 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-dim)] focus:border-[var(--color-gold)]/60"
        />
      </div>

      <p className="text-xs text-[var(--color-fg-dim)]">
        Натискаючи «Надіслати», ви погоджуєтесь з обробкою персональних даних
        для цілей зв&apos;язку. Конфіденційність гарантується.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[#1a1408] shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Надсилаємо…" : "Надіслати заявку"}
        {status !== "submitting" && (
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>

      {status === "error" && (
        <p className="text-sm text-[var(--color-danger)]">
          Не вдалося надіслати. Спробуйте ще раз або напишіть нам напряму.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-muted)]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elev-2)]/60 px-4 py-2.5 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-dim)] focus:border-[var(--color-gold)]/60"
      />
    </div>
  );
}
