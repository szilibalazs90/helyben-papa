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
        <h1 className="display text-4xl font-bold sm:text-5xl" style={{ color: '#0f172a' }}>
          Éttermek: {city}
        </h1>
        <p className="mt-2 font-medium" style={{ color: '#475569' }}>
          Válassz éttermet, és nézd meg a mai menüt.
        </p>
      </div>
      <CitySelector />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((r) => {
            const left = r.menus.reduce((s, m) => s + m.left, 0);
            return (
              <motion.div key={r.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}>
                <Link href={`/napi-menu/${r.id}`} className="glass block overflow-hidden rounded-[2rem] bg-white border border-slate-200/80 shadow-sm">
                  <div className={`flex items-center justify-between bg-gradient-to-br ${r.tint} p-6`}>
                    <span className="text-5xl">{r.emoji}</span>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold shadow-sm" style={{ color: '#1e293b' }}>
                      {r.eta}
                    </span>
                  </div>
                  <div className="space-y-2 p-5">
                    <h2 className="display text-2xl font-bold" style={{ color: '#0f172a' }}>
                      {r.name}
                    </h2>
                    <p className="text-sm font-medium" style={{ color: '#475569' }}>
                      {r.tag}
                    </p>
                    <p className="text-sm font-bold" style={{ color: '#0f172a' }}>
                      {left === 0 ? (
                        <span style={{ color: '#c93a22' }}>Ma már elfogyott minden</span>
                      ) : (
                        <><Bounce value={left} /> adag maradt, {r.menus.length} menü</>
                      )}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {list.length === 0 && (
        <p className="glass rounded-3xl p-8 text-center font-medium bg-white border border-slate-200" style={{ color: '#334155' }}>
          Ebben a városban még nincs étterem a listán. Válassz másik várost.
        </p>
      )}
    </div>
  );
}