'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CitySelector from '@/components/CitySelector';
import { PROVIDERS } from '@/lib/data';
import { useShop } from '@/lib/store';

function Pillar({ href, emoji, title, text, meta, cta, glow, delay }: { href: string; emoji: string; title: string; text: string; meta: string; cta: string; glow: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: 'spring', stiffness: 160, damping: 20 }} whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}>
      <Link href={href}
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`); }}
        className="glass group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[2rem] p-8">
        <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(420px circle at var(--x,50%) var(--y,50%), ${glow}, transparent 60%)` }} />
        <motion.span className="relative text-6xl" animate={{ rotate: [0, -6, 6, 0] }} transition={{ duration: 5, repeat: Infinity, delay }}>{emoji}</motion.span>
        <div className="relative">
          <p className="text-sm font-bold text-[var(--mute)]">{meta}</p>
          <h2 className="display text-3xl font-bold">{title}</h2>
          <p className="mt-2 max-w-sm text-[var(--mute)]">{text}</p>
          <span className="ghost mt-5 inline-block px-4 py-2 text-sm transition-colors group-hover:bg-white">{cta}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Hero() {
  const { city, restaurants } = useShop();
  const nR = restaurants.filter((r) => r.city === city).length;
  const nP = PROVIDERS.filter((p) => p.city === city).length;
  return (
    <div className="space-y-12">
      <section className="pt-4 text-center sm:pt-10">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="display mx-auto max-w-3xl text-5xl font-bold leading-[1.05] sm:text-7xl">
          Ebéd, frizura, körmös. Minden helyben.
        </motion.h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--mute)]">Válaszd ki a városodat, aztán rendelj mai menüt, vagy foglalj időpontot.</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm font-bold">Város</p>
          <CitySelector />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="display text-center text-2xl font-bold">Mire van szükséged?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Pillar href="/napi-menu" emoji="🍲" title="Napi menü" meta={`${city}: ${nR} étterem`} text="Mai levesek és főételek, élő adagszámlálóval. Amíg van adag, rendelhetsz." cta="Éttermek megnézése" glow="rgba(201,58,34,.18)" delay={0.15} />
          <Pillar href="/foglalas" emoji="💅" title="Szolgáltatások" meta={`${city}: ${nP} szolgáltató`} text="Fodrász, körmös, kozmetikus, masszőr. Azonnali visszaigazolás és SMS emlékeztető." cta="Időpontot foglalok" glow="rgba(109,58,94,.2)" delay={0.28} />
        </div>
      </section>
    </div>
  );
}
