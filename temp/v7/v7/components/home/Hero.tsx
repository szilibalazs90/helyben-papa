'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CitySelector from '@/components/CitySelector';
import { PROVIDERS } from '@/lib/data';
import { useShop } from '@/lib/store';

export default function Hero() {
  const { city, restaurants } = useShop();
  const nR = restaurants.filter((r) => r.city === city).length;
  const nP = PROVIDERS.filter((p) => p.city === city).length;
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Felső sáv / Főcím szekció */}
      <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#c93a22] animate-pulse" />
            Helyi vállalkozások egy helyen • {city}
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.08]">
            Ebéd, frizura, körmös. <br />
            <span className="text-[#c93a22]">Minden helyben.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            Válaszd ki a városodat, aztán csapj le a legfrissebb mai menükre, vagy foglald le az azonnali időpontodat kompromisszumok nélkül.
          </p>
        </div>

        {/* Jobb oldali gyors városválasztó / stat doboz */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Válassz várost a folytatáshoz</p>
          <CitySelector />
          <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="text-2xl font-black text-slate-900">{nR}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Aktív étterem</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="text-2xl font-black text-slate-900">{nP}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Szolgáltató</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alsó kártyák: Asimmetrikus, modern prémium rács */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Napi menü kártya */}
        <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
          <Link href="/napi-menu" className="group flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:border-[#c93a22]/50 hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl p-3 bg-red-50 rounded-xl">🍲</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-[#c93a22] bg-red-50 border border-red-100">
                  {city}: {nR} étterem
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[#c93a22] transition-colors">Napi Menü</h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Mai levesek és főételek, valós idejű adagszámlálóval. Amíg a készlet tart, add le a rendelésed villámgyorsan.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between font-semibold text-sm text-slate-900">
              <span>Éttermek böngészése</span>
              <span className="text-[#c93a22] group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </motion.div>

        {/* Szolgáltatások kártya */}
        <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
          <Link href="/foglalas" className="group flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:border-[#c93a22]/50 hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl p-3 bg-amber-50 rounded-xl">✨</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50 border border-amber-100">
                  {city}: {nP} szakember
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[#c93a22] transition-colors">Szolgáltatások & Időpontok</h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Fodrászat, körmös, kozmetika és masszázs profiktól. Azonnali foglalás visszaigazolással és SMS értesítéssel.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between font-semibold text-sm text-slate-900">
              <span>Időpontfoglalás</span>
              <span className="text-[#c93a22] group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}