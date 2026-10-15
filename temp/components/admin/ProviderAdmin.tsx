'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ft, PROVIDERS } from '@/lib/data';
import { useShop } from '@/lib/store';

export default function ProviderAdmin({ pid }: { pid: string }) {
  const { bookings, cancelBooking } = useShop();
  const p = PROVIDERS.find((x) => x.id === pid)!;
  const mine = bookings.filter((b) => b.pid === pid).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const active = mine.filter((b) => b.status === 'confirmed');
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <section aria-label="Foglalások" className="space-y-3">
        <h2 className="display text-2xl font-bold">Foglalások ({active.length})</h2>
        <AnimatePresence initial={false}>
          {mine.map((b) => (
            <motion.div key={b.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 ${b.status === 'cancelled' ? 'opacity-50' : ''}`}>
              <div>
                <p className="font-extrabold">{b.label}, {b.time}</p>
                <p className="text-sm">{b.service} · {b.min} perc · {ft(b.price)}</p>
                <p className="text-sm text-[var(--mute)]">{b.name} · {b.phone}</p>
              </div>
              {b.status === 'confirmed'
                ? <button onClick={() => cancelBooking(b.id)} className="ghost px-4 py-2 text-sm text-[var(--red)]">Lemondás</button>
                : <span className="text-sm font-bold">Lemondva</span>}
            </motion.div>
          ))}
        </AnimatePresence>
        {mine.length === 0 && <p className="glass rounded-2xl p-6 text-center text-[var(--mute)]">Még nincs foglalás. Foglalj egy időpontot a vendégfelületen, és itt azonnal megjelenik.</p>}
      </section>
      <section aria-label="Szolgáltatások" className="space-y-3">
        <h2 className="display text-2xl font-bold">{p.name}</h2>
        {p.services.map((s) => <p key={s.name} className="glass flex justify-between rounded-2xl p-4 text-sm"><b>{s.name}</b><span>{s.min} perc · {ft(s.price)}</span></p>)}
        <p className="text-sm text-[var(--mute)]">A lemondott időpont újra szabad lesz, és az ügyfél felé SMS értesítés indulna.</p>
      </section>
    </div>
  );
}
