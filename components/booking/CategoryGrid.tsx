'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES, PROVIDERS } from '@/lib/data';
import { useShop } from '@/lib/store';
import CitySelector from '@/components/CitySelector';

export default function CategoryGrid() {
  const { city } = useShop();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="display text-4xl font-bold sm:text-5xl">Szolgáltatások: {city}</h1>
        <p className="mt-2 text-slate-700">Milyen szolgáltatásra szeretnél időpontot?</p>
      </div>
      <CitySelector />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => {
          const n = PROVIDERS.filter((p) => p.cat === c.slug && p.city === city).length;
          return (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 220, damping: 22 }} whileHover={{ y: -6 }} whileTap={{ scale: 0.97 }}>
              <Link href={`/foglalas/${c.slug}`} className="glass flex h-full flex-col gap-3 rounded-[2rem] p-6">
                <span className="text-5xl">{c.emoji}</span>
                <h2 className="display text-2xl font-bold">{c.job}</h2>
                <p className="text-sm text-slate-700">{c.text}</p>
                <p className="mt-auto text-sm font-bold">{n ? `${n} szolgáltató` : 'Itt még nincs szolgáltató'}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
