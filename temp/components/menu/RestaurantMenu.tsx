'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ft } from '@/lib/data';
import { useShop } from '@/lib/store';
import Bounce from '@/components/ui/Bounce';

export default function RestaurantMenu({ id }: { id: string }) {
  const { restaurants, cart, setQty } = useShop();
  const r = restaurants.find((x) => x.id === id);
  if (!r) return <p className="glass rounded-3xl p-8 text-center">Ez az étterem nem található. <Link href="/napi-menu" className="font-bold underline">Vissza az éttermekhez</Link></p>;
  return (
    <div className="space-y-6">
      <Link href="/napi-menu" className="text-sm font-bold text-[var(--mute)] underline">← Összes étterem</Link>
      <div className={`flex items-center justify-between rounded-[2rem] bg-gradient-to-br ${r.tint} p-7`}>
        <div>
          <h1 className="display text-4xl font-bold">{r.name}</h1>
          <p className="mt-1 text-[var(--mute)]">{r.tag} · kiszállítás {r.eta}</p>
        </div>
        <span className="text-6xl">{r.emoji}</span>
      </div>
      <h2 className="display text-2xl font-bold">Mai menü</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {r.menus.map((m, i) => {
          const q = cart[m.id] ?? 0, out = m.left === 0, low = m.left > 0 && m.left <= 3;
          return (
            <motion.article key={m.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 24 }} className={`glass rounded-3xl p-5 ${out ? 'opacity-60' : ''}`}>
              <p className="text-sm text-[var(--mute)]">Leves: {m.soup}</p>
              <p className="display mt-1 text-xl font-bold leading-snug">{m.main}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-lg font-extrabold">{ft(m.price)}</span>
                {out ? <span className="rounded-full bg-[#2b2118] px-3 py-1 text-xs font-extrabold text-white">Elfogyott</span>
                  : low ? <span className="relative rounded-full bg-[var(--red)] px-3 py-1 text-xs font-extrabold text-white"><motion.span aria-hidden className="absolute inset-0 rounded-full bg-[var(--red)]" animate={{ scale: [1, 1.35], opacity: [0.5, 0] }} transition={{ duration: 1.4, repeat: Infinity }} /><span className="relative">Csak <Bounce value={m.left} /> adag maradt!</span></span>
                  : <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold"><Bounce value={m.left} /> adag maradt</span>}
              </div>
              <div className="mt-4">
                {q === 0 ? (
                  <motion.button whileTap={{ scale: 0.94 }} whileHover={{ scale: 1.03 }} disabled={out} onClick={() => setQty(m.id, 1)} className="btn w-full">{out ? 'Elfogyott' : 'Kosárba'}</motion.button>
                ) : (
                  <div className="flex items-center justify-between rounded-full border border-[var(--line)] bg-white/60 p-1">
                    <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty(m.id, q - 1)} aria-label="Eggyel kevesebb" className="h-10 w-10 rounded-full bg-white font-bold">−</motion.button>
                    <span className="font-bold"><Bounce value={q} /> a kosárban</span>
                    <motion.button whileTap={{ scale: 0.85 }} disabled={q >= m.left} onClick={() => setQty(m.id, q + 1)} aria-label="Eggyel több" className="h-10 w-10 rounded-full bg-[var(--red)] font-bold text-white disabled:opacity-40">+</motion.button>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
      {r.menus.length === 0 && <p className="glass rounded-3xl p-8 text-center text-[var(--mute)]">Ma még nincs feltöltött menü.</p>}
    </div>
  );
}
