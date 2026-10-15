'use client';
import { LayoutGroup, motion } from 'framer-motion';
import { CITIES } from '@/lib/data';
import { useShop } from '@/lib/store';

export default function CitySelector() {
  const { city, setCity } = useShop();
  return (
    <LayoutGroup id="city">
      <div role="radiogroup" aria-label="Város kiválasztása" className="glass inline-flex flex-wrap justify-center gap-1 rounded-3xl p-1.5 sm:rounded-full">
        {CITIES.map((c) => (
          <button key={c} role="radio" aria-checked={city === c} onClick={() => setCity(c)} className="relative rounded-full px-4 py-2 text-sm font-bold">
            {city === c && <motion.span layoutId="city-pill" transition={{ type: 'spring', stiffness: 420, damping: 30 }} className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c93a22] to-[#a31f1a]" />}
            <span className={`relative ${city === c ? 'text-white' : 'text-[var(--mute)]'}`}>{c}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
