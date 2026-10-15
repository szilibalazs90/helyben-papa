'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ft } from '@/lib/data';
import { useShop } from '@/lib/store';
import Bounce from '@/components/ui/Bounce';
import CheckoutModal from '@/components/menu/CheckoutModal';

export default function CartDrawer() {
  const { cart, menuIndex, setQty, total, count, cartOpen, setCartOpen } = useShop();
  const [checkout, setCheckout] = useState(false);
  const lines = Object.entries(cart).filter(([id, q]) => q > 0 && menuIndex[id]);
  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-[#2b2118]/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
            <motion.aside role="dialog" aria-label="Kosár" className="panel fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col p-6" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="display text-3xl font-bold">Kosár</h2>
                <button onClick={() => setCartOpen(false)} aria-label="Kosár bezárása" className="ghost h-10 w-10">✕</button>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {lines.length === 0 && <p className="pt-10 text-center text-[var(--mute)]">A kosarad üres. Válassz egy éttermet, és add hozzá a mai menüt.</p>}
                <AnimatePresence initial={false}>
                  {lines.map(([id, q]) => {
                    const m = menuIndex[id];
                    return (
                      <motion.div key={id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }} className="glass flex items-center gap-3 rounded-2xl p-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{m.main}</p>
                          <p className="text-xs text-[var(--mute)]">{m.rname} · {ft(m.price * q)}</p>
                        </div>
                        <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty(id, q - 1)} aria-label="Eggyel kevesebb" className="ghost h-8 w-8">−</motion.button>
                        <Bounce value={q} className="w-5 justify-center font-bold" />
                        <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty(id, q + 1)} aria-label="Eggyel több" className="ghost h-8 w-8">+</motion.button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
              <div className="mt-4 space-y-3 border-t border-[var(--line)] pt-4">
                <div className="flex justify-between text-lg font-extrabold"><span>Összesen</span><span>{ft(total)}</span></div>
                <motion.button whileTap={{ scale: 0.97 }} disabled={!count} onClick={() => setCheckout(true)} className="btn w-full py-4">Tovább a rendeléshez</motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>{checkout && <CheckoutModal onClose={() => { setCheckout(false); setCartOpen(false); }} />}</AnimatePresence>
    </>
  );
}
