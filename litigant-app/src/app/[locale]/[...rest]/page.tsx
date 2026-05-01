import { notFound } from "next/navigation";

/**
 * Catch-all маршрут для будь-якого URL всередині [locale] segment, що
 * не співпадає з конкретною сторінкою (pro-nas / kontakty / ekspertyza /
 * analityka / checklist). Викликає notFound() → render-иться
 * [locale]/not-found.tsx з повним layout (Header + Footer + i18n).
 *
 * Без цього catch-all Next 14 для unmatched URL fallback-ив на root
 * `app/_not-found` без Header/Footer — UX dead-end.
 *
 * Redirects з next.config.mjs (e.g., /ua/about → /ua/pro-nas) спрацьовують
 * на Vercel routing-layer до того, як хіт сюди дійде; це не конфліктує.
 */
export default function CatchAllNotFound() {
  notFound();
}
