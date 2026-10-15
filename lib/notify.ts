import 'server-only';

export type NotifyInput = { email?: string; phone?: string; subject: string; text: string };
export type NotifyResult = { email: 'elküldve' | 'hiba' | 'nincs beállítva'; sms: 'elküldve' | 'hiba' | 'nincs beállítva' };

export const toE164 = (raw: string) => {
  const d = raw.replace(/[^\d+]/g, '');
  if (d.startsWith('+')) return d;
  if (d.startsWith('06')) return '+36' + d.slice(2);
  if (d.startsWith('36')) return '+' + d;
  return '+36' + d;
};

export async function sendEmail(to: string, subject: string, text: string): Promise<NotifyResult['email']> {
  const key = process.env.RESEND_API_KEY, from = process.env.MAIL_FROM;
  if (!key || !from) return 'nincs beállítva';
  const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to, subject, text }) });
  return r.ok ? 'elküldve' : 'hiba';
}

export async function sendSms(to: string, body: string): Promise<NotifyResult['sms']> {
  const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN, from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) return 'nincs beállítva';
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ To: toE164(to), From: from, Body: body }),
  });
  return r.ok ? 'elküldve' : 'hiba';
}
