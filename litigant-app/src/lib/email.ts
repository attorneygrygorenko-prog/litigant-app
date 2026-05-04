import { Resend } from 'resend';

const FROM = 'Litigant <noreply@litigant.legal>';
const TO = process.env.LEAD_NOTIFY_EMAIL || 'yuriy@litigant.legal';

let client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

// HTML-escape user-controlled values before they go into the email body —
// otherwise a malicious "challenge" submission could inject markup that
// renders inside the inbox.
function esc(value: string | undefined | null): string {
  if (!value) return '—';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nowKyiv(): string {
  return new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
}

export interface LeadEmailPayload {
  name: string;
  position: string;
  company: string;
  industry: string;
  challenge: string;
  asset_value: string;
  contact: string;
  locale: string;
  page: string;
  source?: string;
  ai_review?: string;
}

export async function sendLeadEmail(payload: LeadEmailPayload): Promise<void> {
  const c = getClient();
  if (!c) return;
  const subject = `Нова заявка — ${payload.company || '—'} (${payload.position || '—'})`;
  const aiReview = payload.ai_review ? esc(payload.ai_review) : 'обробляється...';
  // Spec keeps source-or-locale fallback; locale is descriptive enough as a
  // last-resort label and matches what the user specified.
  const sourceLabel = payload.source ? esc(payload.source) : esc(payload.locale);

  const html = `<div style="font-family:sans-serif;max-width:600px">
  <h2 style="color:#0D1B3E;border-bottom:2px solid #B8941E;padding-bottom:8px">
    Нова заявка · Litigant Law Office
  </h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:8px;color:#666;width:140px">Контакт</td>
        <td style="padding:8px;font-weight:500">${esc(payload.name)}, ${esc(payload.position)}</td></tr>
    <tr style="background:#f9f9f9">
        <td style="padding:8px;color:#666">Компанія</td>
        <td style="padding:8px">${esc(payload.company)} · ${esc(payload.industry)}</td></tr>
    <tr><td style="padding:8px;color:#666">Актив</td>
        <td style="padding:8px">${esc(payload.asset_value)}</td></tr>
    <tr style="background:#f9f9f9">
        <td style="padding:8px;color:#666">Зв'язок</td>
        <td style="padding:8px"><a href="tel:${esc(payload.contact)}">${esc(payload.contact)}</a></td></tr>
    <tr><td style="padding:8px;color:#666;vertical-align:top">Виклик</td>
        <td style="padding:8px;white-space:pre-wrap">${esc(payload.challenge)}</td></tr>
    <tr style="background:#f9f9f9">
        <td style="padding:8px;color:#666;vertical-align:top">AI аналіз</td>
        <td style="padding:8px;font-style:italic">${aiReview}</td></tr>
    <tr><td style="padding:8px;color:#666">Джерело</td>
        <td style="padding:8px">${sourceLabel}</td></tr>
    <tr style="background:#f9f9f9">
        <td style="padding:8px;color:#666">Час</td>
        <td style="padding:8px">${nowKyiv()}</td></tr>
  </table>
  <p style="margin-top:24px;padding:12px;background:#0D1B3E;color:#B8941E;font-size:12px">
    litigant.legal · Відповідь клієнту очікується протягом 24 годин
  </p>
</div>`;

  try {
    await c.emails.send({ from: FROM, to: TO, subject, html });
  } catch (err) {
    console.error('lead email failed', err);
  }
}

export interface LeadMagnetEmailPayload {
  name: string;
  contact: string;
  locale: string;
  page: string;
  magnet: string;
}

export async function sendLeadMagnetEmail(payload: LeadMagnetEmailPayload): Promise<void> {
  const c = getClient();
  if (!c) return;
  const subject = `Лід-магніт — ${payload.contact}`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F6F5F1;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #CCC8BE;padding:32px;">
    <h2 style="font-family:Georgia,serif;color:#0D1B3E;font-weight:600;letter-spacing:0.04em;margin:0 0 8px;font-size:22px;">
      Завантаження лід-магніту
    </h2>
    <p style="color:#B8941E;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 20px;">
      Litigant Law Office · ${esc(payload.locale)}
    </p>
    <table cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;color:#0F0F0F;">
      <tr><td style="background:#F6F5F1;width:30%;border-bottom:1px solid #E5E2DA;"><b>Магніт:</b></td><td style="border-bottom:1px solid #E5E2DA;">${esc(payload.magnet)}</td></tr>
      <tr><td style="background:#F6F5F1;border-bottom:1px solid #E5E2DA;"><b>Ім'я:</b></td><td style="border-bottom:1px solid #E5E2DA;">${esc(payload.name)}</td></tr>
      <tr><td style="background:#F6F5F1;border-bottom:1px solid #E5E2DA;"><b>Контакт:</b></td><td style="border-bottom:1px solid #E5E2DA;">${esc(payload.contact)}</td></tr>
      <tr><td style="background:#F6F5F1;border-bottom:1px solid #E5E2DA;"><b>Сторінка:</b></td><td style="border-bottom:1px solid #E5E2DA;">${esc(payload.page)}</td></tr>
      <tr><td style="background:#F6F5F1;"><b>Час:</b></td><td>${nowKyiv()}</td></tr>
    </table>
  </div>
</body></html>`;

  try {
    await c.emails.send({ from: FROM, to: TO, subject, html });
  } catch (err) {
    console.error('lead magnet email failed', err);
  }
}
