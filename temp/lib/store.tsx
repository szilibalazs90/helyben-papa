'use client';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CITIES, Menu, Restaurant, RESTAURANTS } from '@/lib/data';

export type MenuRef = Menu & { rid: string; rname: string };
export type Info = { name: string; phone: string; address: string; pay: string };
export type OStatus = 'new' | 'cooking' | 'ready' | 'done';
export type Order = Info & { id: number; rid: string; rname: string; lines: { name: string; qty: number; price: number }[]; total: number; status: OStatus; at: string };
export type Booking = { id: number; pid: string; service: string; min: number; price: number; date: string; label: string; time: string; name: string; phone: string; status: 'confirmed' | 'cancelled' };

type S = {
  city: string; setCity: (c: string) => void;
  restaurants: Restaurant[]; menuIndex: Record<string, MenuRef>;
  patchMenu: (rid: string, mid: string, p: Partial<Menu>) => void;
  addMenu: (rid: string) => void; removeMenu: (rid: string, mid: string) => void;
  cart: Record<string, number>; setQty: (id: string, q: number) => void; count: number; total: number;
  cartOpen: boolean; setCartOpen: (o: boolean) => void;
  placeOrder: (i: Info) => void;
  orders: Order[]; advanceOrder: (id: number) => void;
  bookings: Booking[]; book: (b: Omit<Booking, 'id' | 'status'>) => void; cancelBooking: (id: number) => void;
  isTaken: (pid: string, date: string, time: string) => boolean;
};
const Ctx = createContext<S | null>(null);
export const useShop = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('ShopProvider hiányzik');
  return c;
};
const NEXT: Record<OStatus, OStatus> = { new: 'cooking', cooking: 'ready', ready: 'done', done: 'done' };

export function ShopProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState(CITIES[0]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(RESTAURANTS);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const menuIndex = useMemo(() => Object.fromEntries(restaurants.flatMap((r) => r.menus.map((m) => [m.id, { ...m, rid: r.id, rname: r.name }]))) as Record<string, MenuRef>, [restaurants]);
  const mapMenus = (rid: string, fn: (m: Menu[]) => Menu[]) => setRestaurants((rs) => rs.map((r) => (r.id === rid ? { ...r, menus: fn(r.menus) } : r)));

  // DEMO: más vendégek rendelését szimulálja. Éles appban websocket/SSE/polling hozza a készletet.
  useEffect(() => {
    const t = setInterval(() => setRestaurants((rs) => {
      const all = rs.flatMap((r) => r.menus.filter((m) => m.left > 0).map((m) => m.id));
      if (!all.length) return rs;
      const id = all[Math.floor(Math.random() * all.length)];
      return rs.map((r) => ({ ...r, menus: r.menus.map((m) => (m.id === id ? { ...m, left: m.left - 1 } : m)) }));
    }), 10000);
    return () => clearInterval(t);
  }, []);

  const lines = Object.entries(cart).filter(([id, q]) => q > 0 && menuIndex[id]);
  const count = lines.reduce((a, [, q]) => a + q, 0);
  const total = lines.reduce((s, [id, q]) => s + menuIndex[id].price * q, 0);
  const setQty = (id: string, q: number) => setCart((c) => ({ ...c, [id]: Math.max(0, Math.min(q, menuIndex[id]?.left ?? 0)) }));

  const placeOrder = (info: Info) => {
    const byR: Record<string, [string, number][]> = {};
    for (const [id, q] of lines) (byR[menuIndex[id].rid] ??= []).push([id, Math.min(q, menuIndex[id].left)]);
    const at = new Date().toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });
    const made: Order[] = Object.entries(byR).map(([rid, ls], i) => ({
      ...info, id: 1001 + orders.length + i, rid, rname: menuIndex[ls[0][0]].rname, at, status: 'new',
      lines: ls.map(([id, qty]) => ({ name: menuIndex[id].main, qty, price: menuIndex[id].price })),
      total: ls.reduce((s, [id, q]) => s + menuIndex[id].price * q, 0),
    }));
    setOrders((o) => [...made, ...o]);
    setRestaurants((rs) => rs.map((r) => ({ ...r, menus: r.menus.map((m) => (cart[m.id] ? { ...m, left: Math.max(0, m.left - cart[m.id]) } : m)) })));
    setCart({});
  };

  const value: S = {
    city, setCity, restaurants, menuIndex, cart, setQty, count, total, cartOpen, setCartOpen, placeOrder, orders, bookings,
    patchMenu: (rid, mid, p) => mapMenus(rid, (ms) => ms.map((m) => (m.id === mid ? { ...m, ...p, left: Math.max(0, p.left ?? m.left) } : m))),
    addMenu: (rid) => mapMenus(rid, (ms) => [...ms, { id: `${rid}-${Date.now()}`, soup: 'Új leves', main: 'Új főétel', price: 2500, left: 10 }]),
    removeMenu: (rid, mid) => mapMenus(rid, (ms) => ms.filter((m) => m.id !== mid)),
    advanceOrder: (id) => setOrders((os) => os.map((o) => (o.id === id ? { ...o, status: NEXT[o.status] } : o))),
    book: (b) => setBookings((bs) => [...bs, { ...b, id: 2001 + bs.length, status: 'confirmed' }]),
    cancelBooking: (id) => setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))),
    isTaken: (pid, date, time) => bookings.some((b) => b.pid === pid && b.date === date && b.time === time && b.status === 'confirmed'),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
