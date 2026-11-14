/**
 * Mirror a lead into Litigant CRM (litigant-crm-app → POST /api/intake/litigant).
 * Env: CRM_WEBHOOK_URL (full intake URL), CRM_WEBHOOK_TOKEN (Bearer, = CRM's INTAKE_TOKEN).
 * Never blocks or fails the user's request: 4 s cap, errors only logged.
 */
export async function notifyCrm(payload: Record<string, string>): Promise<void> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  const token = process.env.CRM_WEBHOOK_TOKEN;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000)
    });
    if (!res.ok) console.error('crm webhook status', res.status);
  } catch (err) {
    console.error('crm webhook failed', err);
  }
}
