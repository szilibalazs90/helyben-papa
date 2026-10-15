'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ft, Provider, Service } from '@/lib/data';
import { useShop } from '@/lib/store';
import Modal from '@/components/ui/Modal';
import { notify } from '@/app/actions/notify';

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const pad = (n: number) => String(n).padStart(2, '0');
const TIMES = Array.from({ length: 16 }, (_, i) => `${pad(9 + Math.floor(i / 2))}:${i % 2 ? '30' : '00'}`);
const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dayLabel = (d: Date) => d.toLocaleDateString('hu-HU', { weekday: 'short', day: 'numeric', month: 'short' });

export default function BookingPanel({ p, onClose }: { p: Provider; onClose: () => void }) {
  const { book, isTaken, user, setAuthOpen } = useShop();
  const [notes, setNotes] = useState<string[]>(['Értesítések küldése…']);
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState('');
  const [f, setF] = useState({ name: '', phone: '', email: '' });
  const [err, setErr] = useState<string | null>(null);

  const days = useMemo(() => {
    const out: Date[] = [];
    for (let i = 0; out.length < 7; i++) { const d = new Date(); d.setDate(d.getDate() + i); if (d.getDay() !== 0) out.push(d); }
    return out;
  }, []);
  const day = days[dayIdx], key = dayKey(day), now = new Date();
  const taken = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    const past = key === dayKey(now) && h * 60 + m <= now.getHours() * 60 + now.getMinutes();
    return past || hash(p.id + key + t) % 4 === 0 || isTaken(p.id, key, t);
  };
  const when = `${dayLabel(day)}, ${time}`;

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Add meg a nevedet.');
    if (f.phone.replace(/\D/g, '').length < 9) return setErr('Adj meg érvényes telefonszámot az SMS-hez.');
    if (!service) return;
    if (!user) { setAuthOpen(true); return; }
    book({ pid: p.id, service: service.name, min: service.min, price: service.price, date: key, label: dayLabel(day), time, name: f.name.trim(), phone: f.phone });
    setErr(null); setStep(4);
    notify({ email: f.email || user.email, phone: f.phone, subject: `Időpont visszaigazolás – ${p.name}`, text: `Kedves ${f.name.trim()}! Időpontod: ${p.name}, ${service.name}, ${dayLabel(day)} ${time}. Lemondás a profilodban.` }).then((r) => setNotes([`E-mail: ${r.email}`, `SMS: ${r.sms}`])).catch(() => setNotes(['Az értesítés küldése nem sikerült.']));
  };

  return (
    <Modal onClose={onClose} label={`Időpontfoglalás: ${p.name}`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="display text-2xl font-bold">{p.emoji} {p.name}</h2>
          {step < 4 && <div className="mt-2 flex gap-1.5" aria-label={`${step}. lépés a 3-ból`}>{[1, 2, 3].map((d) => <span key={d} className={`h-1.5 w-8 rounded-full transition-colors ${d <= step ? 'bg-[#6d3a5e]' : 'bg-black/10'}`} />)}</div>}
        </div>
        <button onClick={onClose} aria-label="Bezárás" className="ghost h-10 w-10">✕</button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
          {step === 1 && (
            <div className="space-y-2">
              <p className="mb-3 font-bold">Mit szeretnél?</p>
              {p.services.map((s) => (
                <motion.button key={s.name} whileTap={{ scale: 0.98 }} onClick={() => { setService(s); setStep(2); }} className="glass flex w-full items-center justify-between rounded-2xl p-4 text-left">
                  <span><b>{s.name}</b><br /><span className="text-sm text-slate-700">{s.min} perc</span></span>
                  <span className="font-extrabold">{ft(s.price)}</span>
                </motion.button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-base font-extrabold text-slate-950">1. Válassz napot</p>
              <div className="grid grid-cols-4 gap-2">
                {days.map((d, i) => (
                  <button key={i} onClick={() => { setDayIdx(i); setTime(''); }} aria-pressed={dayIdx === i} className={`rounded-xl border-2 px-1 py-2 text-center text-sm font-extrabold leading-tight ${dayIdx === i ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-950 hover:border-slate-950'}`}>
                    {d.toLocaleDateString('hu-HU', { weekday: 'short' })}<br />{d.toLocaleDateString('hu-HU', { day: 'numeric', month: 'short' })}
                  </button>
                ))}
              </div>
              <p className="text-base font-extrabold text-slate-950">2. Válassz időpontot</p>
              <div className="grid grid-cols-4 gap-2">
                {TIMES.map((t) => { const x = taken(t); return (
                  <button key={t} disabled={x} onClick={() => { setTime(t); setStep(3); }} className={`rounded-xl border-2 py-2.5 text-base font-extrabold ${x ? 'cursor-not-allowed border-slate-300 bg-slate-100 text-slate-600' : 'border-emerald-700 bg-emerald-50 text-emerald-950 hover:bg-emerald-700 hover:text-white'}`}>
                    <span className={x ? 'line-through' : ''}>{t}</span>{x && <span className="block text-[11px] font-bold">Foglalt</span>}
                  </button>
                ); })}
              </div>
              <p className="text-sm font-bold text-slate-900">Zöld: szabad · Szürke: foglalt</p>
              <button onClick={() => setStep(1)} className="text-sm font-bold text-slate-900 underline">Vissza</button>
            </div>
          )}
          {step === 3 && service && (
            <form onSubmit={confirm} className="space-y-3" noValidate>
              <div className="glass rounded-2xl p-4 text-sm"><b>{service.name}</b> · {service.min} perc · {ft(service.price)}<br />{when}</div>
              <input className="field" placeholder="Név" aria-label="Név" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
              <input className="field" placeholder="Telefonszám (SMS-hez)" aria-label="Telefonszám" inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} autoComplete="tel" />
              <input className="field" placeholder="E-mail (nem kötelező)" aria-label="E-mail" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" />
              {err && <p role="alert" className="text-sm font-bold text-[#b3261e]">{err}</p>}
              <motion.button whileTap={{ scale: 0.97 }} className="btn btn-plum w-full py-3.5">Foglalás megerősítése</motion.button>
              <button type="button" onClick={() => setStep(2)} className="text-sm text-slate-700 underline">Vissza</button>
            </form>
          )}
          {step === 4 && service && (
            <div className="space-y-4 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-600 text-4xl text-white">✓</motion.div>
              <h3 className="display text-2xl font-bold">Foglalásod rögzítettük!</h3>
              <p className="text-slate-700">{service.name} · {when}</p>
              <div className="space-y-2 text-left text-sm">
                {notes.map((t, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.6 }} className="glass rounded-2xl p-3">{t}</motion.p>
                ))}
              </div>
              <button onClick={onClose} className="btn btn-plum w-full">Kész</button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}
