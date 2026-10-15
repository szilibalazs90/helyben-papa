import RestaurantMenu from '@/components/menu/RestaurantMenu';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RestaurantMenu id={id} />;
}
