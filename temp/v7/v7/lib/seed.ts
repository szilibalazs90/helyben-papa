import { RESTAURANTS, DISTRICTS } from '@/lib/data';
import type { Order } from '@/lib/store';

// DEMÓ előzmény a riportokhoz és a hőtérképhez (kitalált vevők, example.com címek). Éles rendszerben az adatbázisból jön.
const PEOPLE = ['Kovács Anna', 'Nagy Péter', 'Szabó Eszter', 'Tóth Gábor', 'Horváth Réka', 'Varga Bence', 'Kiss Dóra', 'Molnár Zoltán', 'Farkas Lilla', 'Balogh Márk', 'Papp Nóra', 'Takács Ádám'];
const HOURS = [11, 12, 12, 12, 13, 13, 14, 17, 18, 18, 19];

export function seedOrders(): Order[] {
  let x = 7; const rnd = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
  const now = Date.now(); const out: Order[] = []; let id = 900000;
  for (const r of RESTAURANTS) {
    for (let i = 0; i < 45; i++) {
      const pi = Math.floor(rnd() * PEOPLE.length), name = PEOPLE[pi];
      const d = new Date(now - Math.floor(rnd() * rnd() * 30) * 864e5);
      d.setHours(HOURS[Math.floor(rnd() * HOURS.length)], Math.floor(rnd() * 60), 0, 0);
      if (d.getTime() > now) d.setTime(now - 36e5);
      const picks = r.menus.slice(0, 1 + Math.floor(rnd() * 2)).map((m) => ({ name: m.main, qty: 1 + Math.floor(rnd() * 2), price: m.price }));
      const old = d.getTime() < now - 3 * 36e5;
      out.push({
        id: id++, uid: undefined, ts: d.getTime(), rid: r.id, rname: r.name, name, email: `${name.split(' ')[0].toLowerCase()}${pi}@example.com`,
        phone: `+36 30 555 ${String(1000 + pi * 137).slice(0, 4)}`, address: 'Pápa', pay: ['cash', 'card', 'szep'][Math.floor(rnd() * 3)],
        district: DISTRICTS[(pi + (rnd() < 0.25 ? 1 : 0)) % DISTRICTS.length], lines: picks, total: picks.reduce((s, l) => s + l.price * l.qty, 0),
        status: old ? 'done' : (['new', 'cooking', 'ready'] as const)[Math.floor(rnd() * 3)], at: d.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }),
      });
    }
  }
  return out.sort((a, b) => b.ts - a.ts);
}
