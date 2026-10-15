import PartnerGate from '@/components/dashboard/PartnerGate';

export const metadata = { title: 'Partner felület – Helyben' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PartnerGate>{children}</PartnerGate>;
}
