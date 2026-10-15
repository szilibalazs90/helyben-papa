'use client';
import Link from 'next/link';
import { ft } from '@/lib/data';
import { useShop } from '@/lib/store';
import { OrderPipeline, StatusBadge } from '@/components/ui/StatusBadge';


export default function Profile() {
  const { user, logout, setAuthOpen, orders, bookings } = useShop();
  if (!user) return (
    <div className="glass space-y-4 rounded-3xl p-8 text-center">
      <p className="font-bold text-slate-950">A profilod megtekintéséhez lépj be.</p>
      <button onClick={() => setAuthOpen(true)} className="btn">Belépés</button>
    </div>
  );
  const myO = orders.filter((o) => o.uid === user.id), myB = bookings.filter((b) => b.uid === user.id);
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="display text-4xl font-bold text-slate-950">Szia, {user.name}!</h1><p className="font-medium text-slate-800">{user.email} · {user.phone}</p></div>
        <button onClick={logout} className="ghost px-4 py-2 text-sm">Kilépés</button>
      </div>
      <section className="space-y-3" aria-label="Rendeléseim">
        <h2 className="display text-2xl font-bold text-slate-950">Rendeléseim</h2>
        {myO.map((o) => (
          <div key={o.id} className="glass space-y-3 rounded-2xl p-4 text-slate-950">
            <div className="flex justify-between font-extrabold"><span>#{o.id} · {o.rname}</span><span className="flex items-center gap-2"><StatusBadge status={o.status} />{ft(o.total)}</span></div>
            <ul className="text-sm font-medium">{o.lines.map((l) => <li key={l.name}>{l.qty}× {l.name}</li>)}</ul>
            <OrderPipeline status={o.status} />
          </div>
        ))}
        {myO.length === 0 && <p className="glass rounded-2xl p-6 font-medium text-slate-900">Még nincs rendelésed. <Link href="/napi-menu" className="font-bold underline">Mai menük</Link></p>}
      </section>
      <section className="space-y-3" aria-label="Időpontjaim">
        <h2 className="display text-2xl font-bold text-slate-950">Időpontjaim</h2>
        {myB.map((b) => (
          <div key={b.id} className="glass flex justify-between gap-3 rounded-2xl p-4 text-slate-950">
            <div><p className="font-extrabold">{b.label}, {b.time}</p><p className="text-sm font-medium">{b.service} · {ft(b.price)}</p></div>
            <span className={`h-fit rounded-full px-3 py-1 text-xs font-extrabold ${b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-950' : 'bg-slate-200 text-slate-800'}`}>{b.status === 'confirmed' ? 'Visszaigazolva' : 'Lemondva'}</span>
          </div>
        ))}
        {myB.length === 0 && <p className="glass rounded-2xl p-6 font-medium text-slate-900">Még nincs foglalt időpontod. <Link href="/foglalas" className="font-bold underline">Időpontfoglalás</Link></p>}
      </section>
    </div>
  );
}
