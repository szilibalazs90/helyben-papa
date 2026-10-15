'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ft, PAY } from '@/lib/data';
import { OStatus, useShop } from '@/lib/store';
import Bounce from '@/components/ui/Bounce';

const LABEL: Record<OStatus, string> = { new: 'Új rendelés', cooking: 'Készül', ready: 'Kész, átadásra vár', done: 'Átadva' };
const ACTION: Record<OStatus, string> = { new: 'Elkezdem', cooking: 'Kész', ready: 'Átadva', done: '' };

export default function RestaurantAdmin({ rid }: { rid: string }) {
  const { restaurants, patchMenu, addMenu, removeMenu, orders, advanceOrder } = useShop();
  const r = restaurants.find((x) => x.id === rid)!;
  const mine = orders.filter((o) => o.rid === rid && o.status !== 'done');
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <section aria-label="Mai menü" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="display text-2xl font-bold">Mai menü</h2>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => addMenu(rid)} className="btn text-sm">+ Új menü</motion.button>
        </div>
        <AnimatePresence initial={false}>
          {r.menus.map((m) => (
            <motion.div key={m.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }} className="glass space-y-3 rounded-2xl p-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <input className="field" aria-label="Leves" value={m.soup} onChange={(e) => patchMenu(rid, m.id, { soup: e.target.value })} />
                <input className="field" aria-label="Főétel" value={m.main} onChange={(e) => patchMenu(rid, m.id, { main: e.target.value })} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-bold">Ár (Ft)
                  <input type="number" min={0} step={50} className="field w-28" value={m.price} onChange={(e) => patchMenu(rid, m.id, { price: Math.max(0, +e.target.value || 0) })} />
                </label>
                <div className="flex items-center gap-2" role="group" aria-label="Adagok">
                  <motion.button whileTap={{ scale: 0.85 }} onClick={() => patchMenu(rid, m.id, { left: m.left - 1 })} aria-label="Eggyel kevesebb adag" className="ghost h-9 w-9">−</motion.button>
                  <span className="w-20 text-center text-sm font-bold"><Bounce value={m.left} /> adag</span>
                  <motion.button whileTap={{ scale: 0.85 }} onClick={() => patchMenu(rid, m.id, { left: m.left + 1 })} aria-label="Eggyel több adag" className="ghost h-9 w-9">+</motion.button>
                </div>
                <button onClick={() => patchMenu(rid, m.id, { left: 0 })} className="ghost px-3 py-1.5 text-sm">Elfogyott</button>
                <button onClick={() => removeMenu(rid, m.id)} className="ml-auto text-sm font-bold text-[var(--red)] underline">Törlés</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {r.menus.length === 0 && <p className="glass rounded-2xl p-6 text-center text-[var(--mute)]">Nincs menü. Adj hozzá egyet az „Új menü” gombbal.</p>}
      </section>
      <section aria-label="Beérkező rendelések" className="space-y-3">
        <h2 className="display text-2xl font-bold">Beérkező rendelések</h2>
        <AnimatePresence initial={false}>
          {mine.map((o) => (
            <motion.div key={o.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} className="glass relative space-y-2 rounded-2xl p-4">
              {o.status === 'new' && <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[var(--red)]" animate={{ opacity: [0.7, 0], scale: [1, 1.03] }} transition={{ duration: 1.6, repeat: Infinity }} />}
              <div className="flex items-center justify-between text-sm">
                <b>#{o.id} · {o.name}</b><span className="font-bold text-[var(--mute)]">{o.at} · {LABEL[o.status]}</span>
              </div>
              <ul className="text-sm">{o.lines.map((l) => <li key={l.name}><b>{l.qty}×</b> {l.name}</li>)}</ul>
              <p className="text-xs text-[var(--mute)]">{o.address} · {o.phone} · {PAY.find((p) => p.id === o.pay)?.label} · {ft(o.total)}</p>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => advanceOrder(o.id)} className="btn w-full py-2 text-sm">{ACTION[o.status]}</motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
        {mine.length === 0 && <p className="glass rounded-2xl p-6 text-center text-[var(--mute)]">Nincs nyitott rendelés. Az újak itt jelennek meg.</p>}
      </section>
    </div>
  );
}
