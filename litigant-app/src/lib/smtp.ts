import nodemailer from 'nodemailer';

export type Office = 'kyiv' | 'odesa';

interface ContactPayload {
  name: string;
  contact: string; // phone OR email — single user-input field
  office: Office;
  message?: string;
  page?: string;
  locale?: string;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    // 587 = STARTTLS (secure: false + requireTLS); 465 = implicit TLS.
    secure: Number(port) === 465,
    requireTLS: Number(port) === 587,
    auth: { user, pass }
  });
  return transporter;
}

function esc(value: string | undefined | null): string {
  if (!value) return '—';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const KYIV_INBOX = process.env.SMTP_INBOX_KYIV || 'kyiv@litigant.legal';
const ODESA_INBOX = process.env.SMTP_INBOX_ODESA || 'odesa@litigant.legal';

function recipientFor(office: Office): { to: string; cc: string; label: string } {
  return office === 'kyiv'
    ? { to: KYIV_INBOX, cc: ODESA_INBOX, label: 'Київ' }
    : { to: ODESA_INBOX, cc: KYIV_INBOX, label: 'Одеса' };
}

// Cheap email-shape detector — used only to decide whether to set
// Reply-To and to render the contact value as a mailto link in the body.
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(payload: ContactPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const t = getTransporter();
  if (!t) return { ok: false, error: 'smtp-not-configured' };

  const { to, cc, label } = recipientFor(payload.office);
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || '';
  const subject = `Нова заявка з сайту — ${label}`;
  const isEmail = EMAIL_RX.test(payload.contact);
  const contactCell = isEmail
    ? `<a href="mailto:${esc(payload.contact)}" style="color:#0D1B3E;">${esc(payload.contact)}</a>`
    : `<a href="tel:${esc(payload.contact)}" style="color:#0D1B3E;">${esc(payload.contact)}</a>`;

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F6F5F1;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #CCC8BE;padding:32px;">
    <h2 style="font-family:Georgia,serif;color:#0D1B3E;font-weight:600;letter-spacing:0.04em;margin:0 0 8px;font-size:22px;">
      Нова заявка з сайту
    </h2>
    <p style="color:#B8941E;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 20px;">
      Litigant Law Office · Офіс ${esc(label)}
    </p>
    <table cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;color:#0F0F0F;">
      <tr><td style="background:#F6F5F1;width:30%;border-bottom:1px solid #E5E2DA;"><b>Ім'я:</b></td><td style="border-bottom:1px solid #E5E2DA;">${esc(payload.name)}</td></tr>
      <tr><td style="background:#F6F5F1;border-bottom:1px solid #E5E2DA;"><b>Контакт:</b></td><td style="border-bottom:1px solid #E5E2DA;">${contactCell}</td></tr>
      <tr><td style="background:#F6F5F1;border-bottom:1px solid #E5E2DA;"><b>Офіс:</b></td><td style="border-bottom:1px solid #E5E2DA;">${esc(label)}</td></tr>
      <tr><td style="background:#F6F5F1;border-bottom:1px solid #E5E2DA;vertical-align:top;"><b>Повідомлення:</b></td><td style="border-bottom:1px solid #E5E2DA;white-space:pre-wrap;">${esc(payload.message)}</td></tr>
      <tr><td style="background:#F6F5F1;border-bottom:1px solid #E5E2DA;"><b>Сторінка:</b></td><td style="border-bottom:1px solid #E5E2DA;">${esc(payload.page)}</td></tr>
      <tr><td style="background:#F6F5F1;"><b>Час:</b></td><td>${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}</td></tr>
    </table>
  </div>
</body></html>`;

  const text =
    `Нова заявка з сайту — Офіс ${label}\n\n` +
    `Ім'я: ${payload.name}\n` +
    `Контакт: ${payload.contact}\n` +
    `Офіс: ${label}\n` +
    `Повідомлення: ${payload.message || '—'}\n` +
    `Сторінка: ${payload.page || '—'}\n` +
    `Час: ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}\n`;

  try {
    await t.sendMail({
      from,
      to,
      cc,
      replyTo: isEmail ? payload.contact : undefined,
      subject,
      text,
      html
    });
    return { ok: true };
  } catch (err) {
    console.error('contact email failed', err);
    return { ok: false, error: 'send-failed' };
  }
}
