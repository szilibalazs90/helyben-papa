import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/menu/CartDrawer';
import { ShopProvider } from '@/lib/store';

const display = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-display' });
const body = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-body' });

export const metadata: Metadata = { title: 'Helyben – napi menü és időpontfoglalás', description: 'Helyi éttermek napi menüi és szolgáltatók időpontfoglalója egy helyen.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${display.variable} ${body.variable}`}>
      <body>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-orange-300/35 blur-[110px]" />
          <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-rose-300/30 blur-[110px]" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-amber-200/50 blur-[110px]" />
        </div>
        <ShopProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">{children}</main>
          <CartDrawer />
        </ShopProvider>
      </body>
    </html>
  );
}
