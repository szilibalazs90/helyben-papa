'use client';
import { useMemo } from 'react';
import { DISTRICTS, ft } from '@/lib/data';
import { useShop } from '@/lib/store';

type Rec = { ts: number; name: string; phone: string; email: string; district: string; total: number; items: string[] };
const DAY = 864e5, HOURS = Array.from({ length: 11 }, (_, i) => 10 + i);

function Bars({ data, fmt }: { data: { label: string; v: number }[]; fmt?: (n: number) => string }) {
  const max = Math.max(1, ...data.map((d) => d.v));
  return (
    <div className="flex h-40 items-end gap-1.5" role="img" aria-label="Oszlopdiagram">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-1">
          <span className="text-[10px] font-extrabold text-slate-950">{d.v ? (fmt ? fmt(d.v) : d.v) : ''}</span>
          <div className="w-full rounded-t-md bg-amber-600" style={{ height: `${Math.max(3, (d.v / max) * 100)}%` }} />
          <span className="text-[11px] font-bold text-slate-800">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => <section className="glass space-y-3 rounded-3xl p-5"><h2 className="display text-xl font-bold text-slate-950">{title}</h2>{children}</section>;
const Kpi = ({ l, v }: { l: string; v: string | number }) => <div className="glass rounded-2xl p-4"><p className="text-xs font-extrabold uppercase text-slate-700">{l}</p><p className="display text-2xl font-bold text-slate-950">{v}</p></div>;

export default function CRM() {
  const { partner, orders, bookings } = useShop();
  // Csak a bejelentkezett partner saját rekordjai kerülnek a számításba.
  const recs = useMemo<Rec[]>(() => {
    if (!partner) return [];
    if (partner.kind === 'restaurant') return orders.filter((o) => o.rid === partner.id).map((o) => ({ ts: o.ts, name: o.name, phone: o.phone, email: o.email ?? '–', district: o.district, total: o.total, items: o.lines.flatMap((l) => Array(l.qty).fill(l.name) as string[]) }));
    return bookings.filter((b) => b.pid === partner.id && b.status === 'confirmed').map((b) => ({ ts: new Date(`${b.date}T${b.time}`).getTime(), name: b.name, phone: b.phone, email: '–', district: 'Nincs megadva', total: b.price, items: [b.service] }));
  }, [partner, orders, bookings]);

  const m = useMemo(() => {
    const t0 = new Date(); t0.setHours(0, 0, 0, 0); const start = t0.getTime(), now = Date.now();
    const sum = (a: Rec[]) => a.reduce((s, r) => s + r.total, 0);
    const today = recs.filter((r) => r.ts >= start), month = recs.filter((r) => r.ts >= now - 30 * DAY);
    const cust = new Map<string, { name: string; phone: string; email: string; n: number; ltv: number; d: Record<string, number> }>();
    for (const r of recs) {
      const k = r.phone.replace(/\D/g, '') || r.name; const c = cust.get(k) ?? { name: r.name, phone: r.phone, email: r.email, n: 0, ltv: 0, d: {} };
      c.n++; c.ltv += r.total; c.d[r.district] = (c.d[r.district] ?? 0) + 1; cust.set(k, c);
    }
    const customers = [...cust.values()].sort((a, b) => b.ltv - a.ltv);
    const items: Record<string, number> = {}; month.forEach((r) => r.items.forEach((i) => (items[i] = (items[i] ?? 0) + 1)));
    const rows = Array.from(new Set([...DISTRICTS, ...recs.map((r) => r.district)]));
    const heat = rows.map((d) => HOURS.map((h) => recs.filter((r) => r.district === d && new Date(r.ts).getHours() === h).length));
    let peak = { d: '', h: 0, n: 0 }; heat.forEach((row, i) => row.forEach((n, j) => { if (n > peak.n) peak = { d: rows[i], h: HOURS[j], n }; }));
    return {
      today, month, avg: month.length ? Math.round(sum(month) / month.length) : 0, customers,
      retention: customers.length ? Math.round((customers.filter((c) => c.n > 1).length / customers.length) * 100) : 0,
      top: Object.entries(items).sort((a, b) => b[1] - a[1]).slice(0, 5),
      week: Array.from({ length: 7 }, (_, i) => { const s = start - (6 - i) * DAY; return { label: new Date(s).toLocaleDateString('hu-HU', { weekday: 'short' }), v: sum(recs.filter((r) => r.ts >= s && r.ts < s + DAY)) }; }),
      byHour: HOURS.map((h) => ({ label: `${h}`, v: recs.filter((r) => new Date(r.ts).getHours() === h).length })),
      rows, heat, peak, sumToday: sum(today), sumMonth: sum(month),
    };
  }, [recs]);
  if (!partner) return null;
  const hmax = Math.max(1, ...m.heat.flat());
  return (
    <div className="space-y-6">
      <p className="rounded-xl border-2 border-amber-600 bg-amber-50 p-3 text-sm font-bold text-slate-950">Demó előzmény: a korábbi rendelések mintaadatok, a mai rendelések a valós használatból gyűlnek.</p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Kpi l="Mai bevétel" v={ft(m.sumToday)} /><Kpi l="Havi bevétel" v={ft(m.sumMonth)} /><Kpi l="Rendelés (30 nap)" v={m.month.length} /><Kpi l="Átlagos kosárérték" v={ft(m.avg)} /><Kpi l="Visszatérő ügyfelek" v={`${m.retention}%`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Bevétel az elmúlt 7 napban"><Bars data={m.week} fmt={(n) => `${Math.round(n / 1000)}e`} /></Card>
        <Card title="Rendelések óránként (csúcsidők)"><Bars data={m.byHour} /></Card>
      </div>
      <Card title="Hőtérkép: városrész × időpont">
        <div className="overflow-x-auto"><table className="w-full border-separate border-spacing-1 text-center text-xs font-bold">
          <thead><tr><th className="text-left text-slate-800">Városrész</th>{HOURS.map((h) => <th key={h} className="text-slate-800">{h}:00</th>)}</tr></thead>
          <tbody>{m.rows.map((d, i) => <tr key={d}><th className="whitespace-nowrap pr-2 text-left text-slate-950">{d}</th>{m.heat[i].map((n, j) => <td key={j} className="rounded-md py-2" style={{ background: `rgba(180,83,9,${n ? 0.12 + (n / hmax) * 0.88 : 0.04})`, color: n / hmax > 0.45 ? '#fff' : '#0f172a' }}>{n || ''}</td>)}</tr>)}</tbody>
        </table></div>
        <p className="text-sm font-bold text-slate-950">{m.peak.n ? `Legnagyobb kereslet: ${m.peak.d}, ${m.peak.h}:00 körül (${m.peak.n} rendelés).` : 'Még nincs elég adat a csúcsidők kimutatásához.'}</p>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <Card title="Népszerű tételek (30 nap)">
          <ol className="space-y-1.5">{m.top.map(([n, c], i) => <li key={n} className="flex justify-between gap-2 text-sm font-bold text-slate-950"><span>{i + 1}. {n}</span><span>{c} db</span></li>)}</ol>
          {m.top.length === 0 && <p className="text-sm font-medium text-slate-800">Még nincs adat.</p>}
        </Card>
        <Card title={`Ügyfélkönyv (${m.customers.length})`}>
          <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-950">
            <thead><tr className="border-b-2 border-slate-300 text-xs font-extrabold uppercase"><th className="py-2">Név</th><th>Telefon</th><th>E-mail</th><th>Rendelés</th><th>Összérték</th><th>Városrész</th></tr></thead>
            <tbody>{m.customers.slice(0, 12).map((c) => <tr key={c.phone + c.name} className="border-b border-slate-200 font-medium"><td className="py-2 font-extrabold">{c.name}</td><td>{c.phone}</td><td>{c.email}</td><td>{c.n}</td><td>{ft(c.ltv)}</td><td>{Object.entries(c.d).sort((a, b) => b[1] - a[1])[0][0]}</td></tr>)}</tbody>
          </table></div>
        </Card>
      </div>
    </div>
  );
}
