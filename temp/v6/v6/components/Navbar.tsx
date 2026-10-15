'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useShop } from '@/lib/store';

const LINKS = [
  { href: '/', label: 'Főoldal' },
  { href: '/napi-menu', label: 'Napi menü' },
  { href: '/foglalas', label: 'Foglalás' },
  { href: '/profil', label: 'Profil' }
];

export default function Navbar() {
  const path = usePathname();
  const { city, count, setCartOpen } = useShop();
  
  return (
    <header className="sticky top-4 z-30 mx-auto flex max-w-5xl items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 px-5 py-3 shadow-sm" style={{ width: 'calc(100% - 2rem)' }}>
      {/* Bal oldal: Profi márkaidentitás a "A városod egy helyen" szlogennel */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0 group py-0.5">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#c93a22] to-[#a32d18] text-white shadow-md shadow-red-900/15 group-hover:scale-105 transition-transform duration-300">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
            Helyben
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c93a22] mt-0.5">
            A városod egy helyen
          </span>
        </div>
      </Link>
      
      {/* Közép: Kompakt navigáció */}
      <LayoutGroup id="nav">
        <nav className="flex rounded-xl bg-slate-100/80 p-1 border border-slate-200/60" aria-label="Fő navigáció">
          {LINKS.map((l) => {
            const active = l.href === '/' ? path === '/' : path.startsWith(l.href);
            return (
              <Link 
                key={l.href} 
                href={l.href} 
                aria-current={active ? 'page' : undefined} 
                className="relative whitespace-nowrap px-3.5 py-1.5 text-xs font-bold sm:text-sm transition-colors"
              >
                {active && (
                  <motion.span 
                    layoutId="pill" 
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }} 
                    className="absolute inset-0 rounded-xl bg-[#c93a22] shadow-sm" 
                  />
                )}
                <span className={`relative z-10 ${active ? 'text-white font-extrabold' : 'text-slate-600 hover:text-slate-900'}`}>
                  {l.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </LayoutGroup>

      {/* Jobb oldal: Város és Kosár */}
      <div className="flex items-center justify-end gap-2.5 shrink-0">
        <Link href="/admin" className="hidden rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-100 md:inline-block">Szolgáltatóknak</Link>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
          <span className="text-[#c93a22]">📍</span>
          <span>{city}</span>
        </div>
        
        {path.startsWith('/napi-menu') && (
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={() => setCartOpen(true)} 
            aria-label={`Kosár megnyitása, ${count} tétel`} 
            className="relative grid h-9 w-9 place-items-center rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors shrink-0"
          >
            🛒
            <AnimatePresence>
              {count > 0 && (
                <motion.span 
                  key={count} 
                  initial={{ scale: 0 }} 
                  animate={{ scale: [1.8, 1] }} 
                  exit={{ scale: 0 }} 
                  transition={{ type: 'spring', stiffness: 500, damping: 12 }} 
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#c93a22] px-1 text-xs font-extrabold text-white shadow-sm"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </header>
  );
}