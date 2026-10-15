'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShop } from '@/lib/store';
import Modal from '@/components/ui/Modal';

export default function AuthModal() {
  const { authOpen, setAuthOpen, login } = useShop();
  const [f, setF] = useState({ name: '', email: '', phone: '' });
  const [err, setErr] = useState<string | null>(null);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Add meg a nevedet.');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Adj meg érvényes e-mail címet.');
    if (f.phone.replace(/\D/g, '').length < 9) return setErr('Adj meg érvényes telefonszámot.');
    login({ id: f.email.trim().toLowerCase(), name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim() });
    setErr(null);
  };
  return (
    <AnimatePresence>
      {authOpen && (
        <Modal onClose={() => setAuthOpen(false)} label="Belépés">
          <form onSubmit={submit} className="space-y-4" noValidate>
            <h2 className="display text-3xl font-bold text-slate-950">Belépés a rendeléshez</h2>
            <p className="text-sm font-medium text-slate-800">A rendelés és az időpontfoglalás belépéshez kötött, így a profilodban követheted az állapotukat.</p>
            <input className="field" placeholder="Név" aria-label="Név" value={f.name} onChange={set('name')} autoComplete="name" />
            <input className="field" placeholder="E-mail" aria-label="E-mail" type="email" value={f.email} onChange={set('email')} autoComplete="email" />
            <input className="field" placeholder="Telefonszám" aria-label="Telefonszám" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" />
            {err && <p role="alert" className="text-sm font-bold text-red-800">{err}</p>}
            <motion.button whileTap={{ scale: 0.97 }} className="btn w-full py-3.5">Belépés / regisztráció</motion.button>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
}
