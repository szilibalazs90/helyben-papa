'use client';
import { useShop } from '@/lib/store';
import RestaurantAdmin from '@/components/admin/RestaurantAdmin';
import ProviderAdmin from '@/components/admin/ProviderAdmin';

// Csak a bejelentkezett partner saját azonosítóját kapja meg: más partner adata ide nem kerülhet.
export default function DashboardHome() {
  const { partner } = useShop();
  if (!partner) return null;
  return partner.kind === 'restaurant' ? <RestaurantAdmin key={partner.id} rid={partner.id} /> : <ProviderAdmin key={partner.id} pid={partner.id} />;
}
