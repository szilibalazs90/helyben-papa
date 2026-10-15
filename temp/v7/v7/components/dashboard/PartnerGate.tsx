'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useShop } from '@/lib/store';

export default function PartnerGate({ children }: { children: ReactNode }) {
  const { partner, partnerLogin, partnerLogout } = useShop();
  const path = usePathname();
  const [f, setF] = useState({ email: '', pin: '' });
  const [err, setErr] = useState('');
  if (!partner) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); setErr(partnerLogin(f.email, f.pin) ? '' : 'Hibás e-mail vagy PIN.'); }} className="glass mx-auto max-w-md space-y-4 rounded-3xl p-8" noValidate>
        <h1 className="display text-3xl font-bold text-slate-950">Szolgáltatóknak</h1>
        <p className="text-sm font-medium text-slate-800">Lépj be a saját üzleted kezelőfelületére. Csak a saját adataidat látod.</p>
        <input className="field" placeholder="Partner e-mail" aria-label="Partner e-mail" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="username" />
        <input className="field" placeholder="PIN" aria-label="PIN" type="password" value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value })} autoComplete="current-password" />
        {err && <p role="alert" className="text-sm font-bold text-red-800">{err}</p>}
        <button className="btn btn-emerald w-full py-3.5">Belépés</button>
        <p className="text-xs font-medium text-slate-700">Demó belépő: kossuth@helyben.hu / 2468. Éles rendszerben ezt az adatbázis és a szerveroldali munkamenet váltja ki.</p>
      </form>
    );
  }
  const tab = (href: string, label: string) => (
    <Link href={href} aria-current={path === href ? 'page' : undefined} className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${path === href ? 'border-emerald-800 bg-emerald-700 text-white' : 'border-slate-300 bg-white text-slate-900 hover:border-emerald-700'}`}>{label}</Link>
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="display text-4xl font-bold text-slate-950">{partner.name}</h1><p className="text-sm font-bold text-slate-800">Saját partner felület</p></div>
        <button onClick={partnerLogout} className="ghost px-4 py-2 text-sm">Kijelentkezés</button>
      </div>
      <nav className="flex flex-wrap gap-2" aria-label="Partner navigáció">{tab('/dashboard', 'Rendelések és menü')}{tab('/dashboard/crm', 'Ügyfelek és riportok')}</nav>
      {children}
    </div>
  );
}
