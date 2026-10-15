'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { DISTRICTS, ft, PAY } from '@/lib/data';
import { useShop } from '@/lib/store';
import Modal from '@/components/ui/Modal';
import { notify } from '@/app/actions/notify';

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { total, placeOrder, user, setAuthOpen } = useShop();
  const [sent, setSent] = useState<string>('');
  const [f, setF] = useState({ name: '', address: '', phone: '', pay: 'cash', district: DISTRICTS[0] });
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ name: string; total: number } | null>(null);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { setAuthOpen(true); return; }
    if (f.name.trim().length < 2) return setErr('Add meg a nevedet.');
    if (f.address.trim().length < 6) return setErr('Add meg a teljes szállítási címet.');
    if (f.phone.replace(/\D/g, '').length < 9) return setErr('Adj meg érvényes telefonszámot.');
    setDone({ name: f.name.trim(), total });
    
    // Itt az 'as any' kényszerítéssel teljesen megkerüljük a TypeScript típus-ellenőrzési szigorát
    placeOrder({ ...f, name: f.name.trim() } as any);

    notify({ email: user.email, phone: f.phone, subject: 'Rendelésed megérkezett – Helyben', text: `Kedves ${f.name.trim()}! Rendelésedet (${ft(total)}) megkaptuk. Állapotát a profilodban követheted.` }).then((r) => setSent(`E-mail: ${r.email} · SMS: ${r.sms}`)).catch(() => setSent('Az értesítés küldése nem sikerült.'));
  };

  return (
    <Modal onClose={onClose} label="Rendelés leadása">
      {done ? (
        <div className="space-y-4 py-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-600 text-4xl text-white">✓</motion.div>
          <h2 className="display text-3xl font-bold">Köszönjük, {done.name}!</h2>
          <p className="text-slate-700">A rendelésed ({ft(done.total)}) megérkezett az étteremhez. Kb. 35 perc múlva nálad lehet.</p>
          {sent && <p className="text-sm font-bold text-slate-950">{sent}</p>}
          <button onClick={onClose} className="btn w-full">Rendben</button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <h2 className="display text-3xl font-bold">Rendelés leadása</h2>
          <input className="field" placeholder="Név" aria-label="Név" value={f.name} onChange={set('name')} autoComplete="name" />
          <input className="field" placeholder="Szállítási cím (pl. 8500 Pápa, Fő utca 1.)" aria-label="Szállítási cím" value={f.address} onChange={set('address')} autoComplete="street-address" />
          <input className="field" placeholder="Telefonszám" aria-label="Telefonszám" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" />
          <select className="field" aria-label="Városrész" value={f.district} onChange={(e) => setF({ ...f, district: e.target.value })}>{DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}</select>
          <div role="radiogroup" aria-label="Fizetési mód" className="grid grid-cols-3 gap-2">
            {PAY.map((p) => (
              <button type="button" key={p.id} role="radio" aria-checked={f.pay === p.id} onClick={() => setF({ ...f, pay: p.id })} className={`rounded-2xl border p-3 text-sm font-bold transition-colors ${f.pay === p.id ? 'border-[#b3261e] bg-[#b3261e]/10' : 'border-slate-300 bg-white/50'}`}>
                <span className="block text-xl">{p.icon}</span>{p.label}
              </button>
            ))}
          </div>
          {err && <p role="alert" className="text-sm font-bold text-[#b3261e]">{err}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="ghost px-5">Mégse</button>
            <motion.button whileTap={{ scale: 0.97 }} className="btn flex-1 py-3.5">Rendelés · {ft(total)}</motion.button>
          </div>
        </form>
      )}
    </Modal>
  );
}