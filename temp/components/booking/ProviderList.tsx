'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES, ft, PROVIDERS, Provider } from '@/lib/data';
import { useShop } from '@/lib/store';
import CitySelector from '@/components/CitySelector';
import BookingPanel from '@/components/booking/BookingPanel';

export default function ProviderList({ slug }: { slug: string }) {
  const { city } = useShop();
  const [active, setActive] = useState<Provider | null>(null);
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return <p className="glass rounded-3xl p-8 text-center">Ismeretlen kategória. <Link href="/foglalas" className="font-bold underline">Vissza</Link></p>;
  const list = PROVIDERS.filter((p) => p.cat === slug && p.city === city);
  return (
    <div className="space-y-6">
      <Link href="/foglalas" className="text-sm font-bold text-[var(--mute)] underline">← Minden szolgáltatás</Link>
      <h1 className="display text-4xl font-bold sm:text-5xl">{cat.emoji} {cat.job}: {city}</h1>
      <CitySelector />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article key={p.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} className="glass overflow-hidden rounded-[2rem]">
              <div className={`flex items-center justify-between bg-gradient-to-br ${p.tint} p-6`}>
                <span className="text-5xl">{p.emoji}</span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-sm font-bold">★ {p.rating.toFixed(1)}</span>
              </div>
              <div className="space-y-3 p-5">
                <h2 className="display text-xl font-bold">{p.name}</h2>
                <p className="text-sm text-[var(--mute)]">{p.services.length} szolgáltatás, {ft(Math.min(...p.services.map((s) => s.price)))}-tól</p>
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => setActive(p)} className="btn btn-plum w-full">Időpontot foglalok</motion.button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      {list.length === 0 && <p className="glass rounded-3xl p-8 text-center text-[var(--mute)]">Ebben a városban még nincs {cat.job.toLowerCase()} a listán. Válassz másik várost.</p>}
      <AnimatePresence>{active && <BookingPanel key={active.id} p={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </div>
  );
}
