export const CITIES = ['Pápa', 'Veszprém', 'Ajka', 'Zirc', 'Celldömölk'];
export const ft = (n: number) => n.toLocaleString('hu-HU') + ' Ft';
export const PAY = [{ id: 'cash', label: 'Készpénz', icon: '💵' }, { id: 'card', label: 'Bankkártya', icon: '💳' }, { id: 'szep', label: 'SZÉP kártya', icon: '🏖️' }];

export type Menu = { id: string; soup: string; main: string; price: number; left: number };
export type Restaurant = { id: string; name: string; city: string; tag: string; emoji: string; tint: string; eta: string; district?: string; address: string; verified: boolean; menus: Menu[] };

export const RESTAURANTS: Restaurant[] = [
  {"id": "kossuth", "district": "Belsőváros", "name": "Kossuth Étterem", "city": "Pápa", "tag": "Magyaros házi ízek", "emoji": "🍲", "tint": "from-orange-200 to-rose-200", "eta": "30–45 perc", "address": "8500 Pápa, Kossuth u. 22.", "verified": false, "menus": [{"id": "kossuth-1", "soup": "Gulyásleves", "main": "Csirkepaprikás nokedlivel", "price": 2490, "left": 12}, {"id": "kossuth-2", "soup": "Húsleves cérnametélttel", "main": "Rántott szelet burgonyapürével", "price": 2690, "left": 8}]},
  {"id": "vitafit", "district": "Belsőváros", "name": "Vitafit Étterem és Kávézó", "city": "Pápa", "tag": "Egészséges, friss ételek", "emoji": "🥗", "tint": "from-lime-200 to-emerald-100", "eta": "30–45 perc", "address": "8500 Pápa, Kossuth Lajos u. 18.", "verified": false, "menus": [{"id": "vitafit-1", "soup": "Zöldségkrémleves", "main": "Grillezett csirkemell párolt zöldségekkel", "price": 2790, "left": 10}, {"id": "vitafit-2", "soup": "Zöldségkrémleves", "main": "Sütőtökös quinoa saláta", "price": 2490, "left": 6}]},
  {"id": "varkert", "district": "Belsőváros", "name": "Pápai Várkert Étterem", "city": "Pápa", "tag": "Hagyományos magyar konyha", "emoji": "🥘", "tint": "from-amber-200 to-yellow-100", "eta": "30–45 perc", "address": "8500 Pápa, Várkert út 5.", "verified": false, "menus": [{"id": "varkert-1", "soup": "Gulyásleves", "main": "Vadas marha knédlivel", "price": 3190, "left": 7}, {"id": "varkert-2", "soup": "Húsleves cérnametélttel", "main": "Sült csirkecomb rizzsel", "price": 2790, "left": 9}]},
  {"id": "gambrinus", "name": "Gambrinus Étterem", "city": "Pápa", "tag": "Klasszikus ebédmenü", "emoji": "🍺", "tint": "from-yellow-200 to-orange-100", "eta": "30–45 perc", "address": "8500 Pápa, Árok utca 20.", "verified": false, "menus": [{"id": "gambrinus-1", "soup": "Tárkonyos raguleves", "main": "Rántott sajt hasábburgonyával", "price": 2590, "left": 9}, {"id": "gambrinus-2", "soup": "Gulyásleves", "main": "Töltött káposzta", "price": 2790, "left": 5}]},
  {"id": "fecske", "name": "Konyhaház Fecske", "city": "Pápa", "tag": "Házias napi menü", "emoji": "🥖", "tint": "from-rose-200 to-orange-100", "eta": "30–45 perc", "address": "8500 Pápa, Fecske utca 3.", "verified": false, "menus": [{"id": "fecske-1", "soup": "Húsleves cérnametélttel", "main": "Paprikás krumpli virslivel", "price": 2190, "left": 12}, {"id": "fecske-2", "soup": "Zöldségleves", "main": "Sertéspörkölt tarhonyával", "price": 2590, "left": 8}]},
  {"id": "grof11", "name": "Gróf 11 Étterem", "city": "Pápa", "tag": "Kiadós főételek", "emoji": "🍽️", "tint": "from-stone-200 to-amber-100", "eta": "30–45 perc", "address": "8500 Pápa, Gróf út 11.", "verified": false, "menus": [{"id": "grof11-1", "soup": "Zöldségkrémleves", "main": "Pulykamell sajtmártással", "price": 2890, "left": 6}, {"id": "grof11-2", "soup": "Gulyásleves", "main": "Sertésszelet gombamártással", "price": 2990, "left": 7}]},
  {"id": "korvin", "name": "Korvin Étterem", "city": "Pápa", "tag": "Napi menü és à la carte", "emoji": "🍖", "tint": "from-red-200 to-orange-100", "eta": "30–45 perc", "address": "8500 Pápa, Korvin u. 16-18.", "verified": false, "menus": [{"id": "korvin-1", "soup": "Húsleves cérnametélttel", "main": "Rakott krumpli", "price": 2290, "left": 10}, {"id": "korvin-2", "soup": "Gulyásleves", "main": "Cigánypecsenye hasábburgonyával", "price": 2690, "left": 8}]},
  {"id": "boszorkany", "name": "Boszorkánykonyha Gyorsétterem", "city": "Pápa", "tag": "Gyors, laktató ebéd", "emoji": "🍔", "tint": "from-orange-200 to-amber-100", "eta": "30–45 perc", "address": "8500 Pápa, Rákóczi utca 10.", "verified": false, "menus": [{"id": "boszorkany-1", "soup": "Napi leves", "main": "Rántott csirkemell menü", "price": 2290, "left": 15}, {"id": "boszorkany-2", "soup": "Napi leves", "main": "Sajtos-tejfölös tészta", "price": 1890, "left": 12}]},
  {"id": "deli12", "name": "Déli 12 Étterem", "city": "Pápa", "tag": "Déli menü", "emoji": "🕛", "tint": "from-sky-200 to-sky-100", "eta": "30–45 perc", "address": "Pápa (pontos cím a partner profilban egészül ki)", "verified": false, "menus": [{"id": "deli12-1", "soup": "Napi leves", "main": "Napi főétel", "price": 2390, "left": 10}]},
  {"id": "viktoria", "name": "Viktória Önkiszolgáló Gyorsétterem", "city": "Pápa", "tag": "Önkiszolgáló, gyors ebéd", "emoji": "🍛", "tint": "from-yellow-200 to-orange-100", "eta": "30–45 perc", "address": "8500 Pápa, Vízmű u. 7/C", "verified": false, "menus": [{"id": "viktoria-1", "soup": "Húsleves", "main": "Sertéskaraj rántva, párolt rizs", "price": 1990, "left": 20}, {"id": "viktoria-2", "soup": "Napi leves", "main": "Lecsós kolbász tarhonyával", "price": 1890, "left": 16}]},
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
  { id: 'anna', name: 'Anna Hajszalon', city: 'Pápa', cat: 'fodrasz', emoji: '✂️', tint: 'from-orange-200 to-rose-100', rating: 4.9, services: [{ name: 'Női hajvágás', min: 60, price: 6500 }, { name: 'Festés + szárítás', min: 120, price: 16900 }, { name: 'Férfi hajvágás', min: 30, price: 3800 }] },
  { id: 'marcell', name: 'Marcell Barber', city: 'Pápa', cat: 'fodrasz', emoji: '💈', tint: 'from-stone-200 to-amber-100', rating: 4.8, services: [{ name: 'Hajvágás', min: 30, price: 4200 }, { name: 'Szakáll formázás', min: 30, price: 3200 }] },
  { id: 'lili', name: 'Lili Nails', city: 'Pápa', cat: 'kormos', emoji: '💅', tint: 'from-rose-200 to-amber-100', rating: 5.0, services: [{ name: 'Gél lakk', min: 60, price: 7500 }, { name: 'Építés + díszítés', min: 120, price: 11900 }] },
  { id: 'zsofi', name: 'Zsófi Beauty Studio', city: 'Pápa', cat: 'kozmetikus', emoji: '🌸', tint: 'from-amber-200 to-sky-100', rating: 4.8, services: [{ name: 'Arckezelés', min: 60, price: 9800 }, { name: 'Szempilla lifting', min: 75, price: 12500 }, { name: 'Szemöldök formázás', min: 30, price: 4500 }] },
  { id: 'bence', name: 'Bence Masszázs', city: 'Pápa', cat: 'maszor', emoji: '💆', tint: 'from-emerald-200 to-sky-100', rating: 4.9, services: [{ name: 'Svéd masszázs', min: 60, price: 8900 }, { name: 'Nyakmasszázs', min: 30, price: 4900 }] },
  { id: 'vera', name: 'Vera Hajműhely', city: 'Veszprém', cat: 'fodrasz', emoji: '💇‍♀️', tint: 'from-rose-200 to-amber-100', rating: 4.7, services: [{ name: 'Hajvágás + mosás', min: 60, price: 7200 }, { name: 'Alkalmi frizura', min: 75, price: 9900 }] },
  { id: 'nora', name: 'Nóra Nails', city: 'Veszprém', cat: 'kormos', emoji: '💅', tint: 'from-rose-200 to-rose-100', rating: 4.9, services: [{ name: 'Gél lakk', min: 60, price: 7900 }] },
  { id: 'eszter', name: 'Eszter Kozmetika', city: 'Ajka', cat: 'kozmetikus', emoji: '🌿', tint: 'from-lime-200 to-emerald-100', rating: 4.8, services: [{ name: 'Tisztító arckezelés', min: 60, price: 8500 }] },
];

export const DISTRICTS = ['Belsőváros', 'Tapolcafő', 'Gyimót', 'Városmajor'];

export type PartnerAccount = { email: string; pin: string; id: string; kind: 'restaurant' | 'service' };
// DEMÓ belépők. Éles rendszerben a User táblát (role = PARTNER, partnerId) és jelszó-hash-t használj.
export const PARTNER_ACCOUNTS: PartnerAccount[] = [
  ...RESTAURANTS.map((r) => ({ email: `${r.id}@helyben.hu`, pin: '2468', id: r.id, kind: 'restaurant' as const })),
  ...PROVIDERS.map((p) => ({ email: `${p.id}@helyben.hu`, pin: '2468', id: p.id, kind: 'service' as const })),
];
