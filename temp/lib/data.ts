export const CITIES = ['Pápa', 'Veszprém', 'Ajka', 'Zirc', 'Celldömölk'];
export const ft = (n: number) => n.toLocaleString('hu-HU') + ' Ft';
export const PAY = [{ id: 'cash', label: 'Készpénz', icon: '💵' }, { id: 'card', label: 'Bankkártya', icon: '💳' }, { id: 'szep', label: 'SZÉP kártya', icon: '🏖️' }];

export type Menu = { id: string; soup: string; main: string; price: number; left: number };
export type Restaurant = { id: string; name: string; city: string; tag: string; emoji: string; tint: string; eta: string; menus: Menu[] };

export const RESTAURANTS: Restaurant[] = [
  { id: 'jokai', name: 'Jókai Kisvendéglő', city: 'Pápa', tag: 'Magyaros házi ízek', emoji: '🍲', tint: 'from-orange-200 to-rose-200', eta: '30–40 perc', menus: [
    { id: 'jokai-a', soup: 'Gulyásleves', main: 'Csirkepaprikás nokedlivel', price: 2490, left: 12 },
    { id: 'jokai-b', soup: 'Gulyásleves', main: 'Rántott szelet petrezselymes burgonyával', price: 2790, left: 5 },
    { id: 'jokai-c', soup: 'Zöldségkrémleves', main: 'Gombás rizottó', price: 2290, left: 0 } ] },
  { id: 'esterhazy', name: 'Esterházy Étterem', city: 'Pápa', tag: 'Klasszikus ebédmenü', emoji: '🥘', tint: 'from-amber-200 to-yellow-100', eta: '35–45 perc', menus: [
    { id: 'est-a', soup: 'Húsleves cérnametélttel', main: 'Töltött káposzta', price: 2690, left: 8 },
    { id: 'est-b', soup: 'Húsleves cérnametélttel', main: 'Sült csirkecomb rizibizivel', price: 2390, left: 3 } ] },
  { id: 'kerti', name: 'Kerti Csárda', city: 'Pápa', tag: 'Naponta egy menü, frissen', emoji: '🥖', tint: 'from-rose-200 to-orange-100', eta: '25–35 perc', menus: [
    { id: 'kerti-a', soup: 'Hideg meggyleves', main: 'Marhapörkölt galuskával', price: 2990, left: 9 } ] },
  { id: 'bakony', name: 'Bakonyi Fogadó', city: 'Veszprém', tag: 'Vadas és halas napok', emoji: '🐟', tint: 'from-orange-200 to-amber-100', eta: '35–50 perc', menus: [
    { id: 'bak-a', soup: 'Halászlé', main: 'Harcsapaprikás túrós csuszával', price: 3290, left: 6 },
    { id: 'bak-b', soup: 'Gombaleves', main: 'Vadas marha knédlivel', price: 3190, left: 7 } ] },
  { id: 'tiszta', name: 'Ajkai Ebédlő', city: 'Ajka', tag: 'Gyors, laktató ebéd', emoji: '🍛', tint: 'from-yellow-200 to-orange-100', eta: '20–30 perc', menus: [
    { id: 'ajka-a', soup: 'Tárkonyos raguleves', main: 'Brassói aprópecsenye', price: 2390, left: 10 } ] },
];

export type Category = { slug: string; job: string; emoji: string; text: string };
export const CATEGORIES: Category[] = [
  { slug: 'fodrasz', job: 'Fodrász', emoji: '✂️', text: 'Hajvágás, festés, alkalmi frizura' },
  { slug: 'kormos', job: 'Körmös', emoji: '💅', text: 'Gél lakk, építés, díszítés' },
  { slug: 'kozmetikus', job: 'Kozmetikus', emoji: '🌸', text: 'Arckezelés, szempilla, szemöldök' },
  { slug: 'maszor', job: 'Masszőr', emoji: '💆', text: 'Svéd, frissítő és sportmasszázs' },
];

export type Service = { name: string; min: number; price: number };
export type Provider = { id: string; name: string; city: string; cat: string; emoji: string; tint: string; rating: number; services: Service[] };
export const PROVIDERS: Provider[] = [
  { id: 'anna', name: 'Anna Hajszalon', city: 'Pápa', cat: 'fodrasz', emoji: '✂️', tint: 'from-fuchsia-200 to-rose-100', rating: 4.9, services: [{ name: 'Női hajvágás', min: 60, price: 6500 }, { name: 'Festés + szárítás', min: 120, price: 16900 }, { name: 'Férfi hajvágás', min: 30, price: 3800 }] },
  { id: 'marcell', name: 'Marcell Barber', city: 'Pápa', cat: 'fodrasz', emoji: '💈', tint: 'from-stone-200 to-amber-100', rating: 4.8, services: [{ name: 'Hajvágás', min: 30, price: 4200 }, { name: 'Szakáll formázás', min: 30, price: 3200 }] },
  { id: 'lili', name: 'Lili Nails', city: 'Pápa', cat: 'kormos', emoji: '💅', tint: 'from-pink-200 to-violet-100', rating: 5.0, services: [{ name: 'Gél lakk', min: 60, price: 7500 }, { name: 'Építés + díszítés', min: 120, price: 11900 }] },
  { id: 'zsofi', name: 'Zsófi Beauty Studio', city: 'Pápa', cat: 'kozmetikus', emoji: '🌸', tint: 'from-violet-200 to-sky-100', rating: 4.8, services: [{ name: 'Arckezelés', min: 60, price: 9800 }, { name: 'Szempilla lifting', min: 75, price: 12500 }, { name: 'Szemöldök formázás', min: 30, price: 4500 }] },
  { id: 'bence', name: 'Bence Masszázs', city: 'Pápa', cat: 'maszor', emoji: '💆', tint: 'from-emerald-200 to-sky-100', rating: 4.9, services: [{ name: 'Svéd masszázs', min: 60, price: 8900 }, { name: 'Nyakmasszázs', min: 30, price: 4900 }] },
  { id: 'vera', name: 'Vera Hajműhely', city: 'Veszprém', cat: 'fodrasz', emoji: '💇‍♀️', tint: 'from-rose-200 to-amber-100', rating: 4.7, services: [{ name: 'Hajvágás + mosás', min: 60, price: 7200 }, { name: 'Alkalmi frizura', min: 75, price: 9900 }] },
  { id: 'nora', name: 'Nóra Nails', city: 'Veszprém', cat: 'kormos', emoji: '💅', tint: 'from-pink-200 to-rose-100', rating: 4.9, services: [{ name: 'Gél lakk', min: 60, price: 7900 }] },
  { id: 'eszter', name: 'Eszter Kozmetika', city: 'Ajka', cat: 'kozmetikus', emoji: '🌿', tint: 'from-lime-200 to-emerald-100', rating: 4.8, services: [{ name: 'Tisztító arckezelés', min: 60, price: 8500 }] },
];
