'use server';
import { NotifyInput, NotifyResult, sendEmail, sendSms } from '@/lib/notify';

export async function notify(p: NotifyInput): Promise<NotifyResult> {
  const [email, sms] = await Promise.all([
    p.email ? sendEmail(p.email, p.subject, p.text) : Promise.resolve('nincs beállítva' as const),
    p.phone ? sendSms(p.phone, p.text) : Promise.resolve('nincs beállítva' as const),
  ]);
  return { email, sms };
}
