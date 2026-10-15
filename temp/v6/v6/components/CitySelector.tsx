'use client';
import { LayoutGroup, motion } from 'framer-motion';
import { CITIES } from '@/lib/data';
import { useShop } from '@/lib/store';

export default function CitySelector() {
  const { city, setCity } = useShop();
  
  return (
    <LayoutGroup id="city">
      <div role="radiogroup" aria-label="Város kiválasztása" className="inline-flex flex-wrap justify-center gap-1.5 rounded-2xl bg-slate-50 border border-slate-200 p-1.5 shadow-sm">
        {CITIES.map((c) => {
          const active = city === c;
          return (
            <button 
              key={c} 
              role="radio" 
              aria-checked={active} 
              onClick={() => setCity(c)} 
              className="relative rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-colors"
            >
              {active && (
                <motion.span 
                  layoutId="city-pill" 
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }} 
                  className="absolute inset-0 rounded-xl bg-[#c93a22] shadow-sm" 
                />
              )}
              <span className={`relative z-10 ${active ? 'text-white font-extrabold' : 'text-slate-600 hover:text-slate-900'}`}>
                {c}
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}