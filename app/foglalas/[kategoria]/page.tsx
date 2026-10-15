import ProviderList from '@/components/booking/ProviderList';

export default async function Page({ params }: { params: Promise<{ kategoria: string }> }) {
  const { kategoria } = await params;
  return <ProviderList slug={kategoria} />;
}
