'use client';
import { useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { PROVIDERS } from '@/lib/data';
import { useShop } from '@/lib/store';
import RestaurantAdmin from '@/components/admin/RestaurantAdmin';
import ProviderAdmin from '@/components/admin/ProviderAdmin';

export default function AdminPanel() {
  const { restaurants } = useShop();
  const [mode, setMode] = useState<'rest' | 'prov'>('rest');
  const [rid, setRid] = useState(restaurants[0].id);
  const [pid, setPid] = useState(PROVIDERS[0].id);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="display text-4xl font-bold sm:text-5xl">Kezelőfelület</h1>
        <p className="mt-2 text-[var(--mute)]">Demó nézet: éles használathoz bejelentkezés és jogosultságkezelés kell.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <LayoutGroup id="admin">
          <div className="glass flex rounded-full p-1" role="tablist">
            {([['rest', 'Étterem'], ['prov', 'Szolgáltató']] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className="relative px-5 py-2 text-sm font-bold">
                {mode === k && <motion.span layoutId="admin-pill" transition={{ type: 'spring', stiffness: 420, damping: 30 }} className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c93a22] to-[#a31f1a]" />}
                <span className={`relative ${mode === k ? 'text-white' : 'text-[var(--mute)]'}`}>{l}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        {mode === 'rest'
          ? <select aria-label="Étterem" className="field w-auto" value={rid} onChange={(e) => setRid(e.target.value)}>{restaurants.map((r) => <option key={r.id} value={r.id}>{r.name} ({r.city})</option>)}</select>
          : <select aria-label="Szolgáltató" className="field w-auto" value={pid} onChange={(e) => setPid(e.target.value)}>{PROVIDERS.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.city})</option>)}</select>}
      </div>
      {mode === 'rest' ? <RestaurantAdmin key={rid} rid={rid} /> : <ProviderAdmin key={pid} pid={pid} />}
    </div>
  );
}
