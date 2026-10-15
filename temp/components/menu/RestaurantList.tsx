'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useShop } from '@/lib/store';
import CitySelector from '@/components/CitySelector';
import Bounce from '@/components/ui/Bounce';

export default function RestaurantList() {
  const { city, restaurants } = useShop();
  const list = restaurants.filter((r) => r.city === city);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="display text-4xl font-bold sm:text-5xl">Éttermek: {city}</h1>
        <p className="mt-2 text-[var(--mute)]">Válassz éttermet, és nézd meg a mai menüt.</p>
      </div>
      <CitySelector />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((r) => {
            const left = r.menus.reduce((s, m) => s + m.left, 0);
            return (
              <motion.div key={r.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}>
                <Link href={`/napi-menu/${r.id}`} className="glass block overflow-hidden rounded-[2rem]">
                  <div className={`flex items-center justify-between bg-gradient-to-br ${r.tint} p-6`}>
                    <span className="text-5xl">{r.emoji}</span>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold">{r.eta}</span>
                  </div>
                  <div className="space-y-2 p-5">
                    <h2 className="display text-2xl font-bold">{r.name}</h2>
                    <p className="text-sm text-[var(--mute)]">{r.tag}</p>
                    <p className="text-sm font-bold">
                      {left === 0 ? 'Ma már elfogyott minden' : <><Bounce value={left} /> adag maradt, {r.menus.length} menü</>}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {list.length === 0 && <p className="glass rounded-3xl p-8 text-center text-[var(--mute)]">Ebben a városban még nincs étterem a listán. Válassz másik várost.</p>}
    </div>
  );
}
