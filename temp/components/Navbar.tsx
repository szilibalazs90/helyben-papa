'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useShop } from '@/lib/store';

const LINKS = [{ href: '/', label: 'Főoldal' }, { href: '/napi-menu', label: 'Napi menü' }, { href: '/foglalas', label: 'Foglalás' }, { href: '/admin', label: 'Admin' }];

export default function Navbar() {
  const path = usePathname();
  const { city, count, setCartOpen } = useShop();
  return (
    <header className="glass sticky top-3 z-30 mx-auto mt-3 flex max-w-6xl items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-5" style={{ width: 'calc(100% - 1.5rem)' }}>
      <Link href="/" className="display flex items-center gap-2 text-xl font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#c93a22] to-[#a31f1a] text-base">📍</span>
        <span className="hidden sm:inline">Helyben</span>
      </Link>
      <LayoutGroup id="nav">
        <nav className="flex rounded-full border border-[var(--line)] bg-white/40 p-1" aria-label="Fő navigáció">
          {LINKS.map((l) => {
            const active = l.href === '/' ? path === '/' : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} aria-current={active ? 'page' : undefined} className="relative whitespace-nowrap px-2.5 py-1.5 text-xs font-bold sm:px-4 sm:text-sm">
                {active && <motion.span layoutId="pill" transition={{ type: 'spring', stiffness: 420, damping: 30 }} className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c93a22] to-[#a31f1a]" />}
                <span className={`relative ${active ? 'text-white' : 'text-[var(--mute)]'}`}>{l.label}</span>
              </Link>
            );
          })}
        </nav>
      </LayoutGroup>
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-[var(--mute)] md:inline">📍 {city}</span>
        {path.startsWith('/napi-menu') && (
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCartOpen(true)} aria-label={`Kosár megnyitása, ${count} tétel`} className="ghost relative grid h-10 w-10 place-items-center">
            🛒
            <AnimatePresence>
              {count > 0 && <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: [1.8, 1] }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--red)] px-1 text-xs font-extrabold text-white">{count}</motion.span>}
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </header>
  );
}
