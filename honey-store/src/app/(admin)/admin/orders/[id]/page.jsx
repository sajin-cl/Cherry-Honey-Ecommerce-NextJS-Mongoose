import OrderDetails from "@/components/admin/OrderDetails";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order ${id} | Cherry Honey Admin`,
    description: `Order details for order ${id}`,
  };
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  // Pass orderId — OrderDetails fetches/uses data server-side
  return <OrderDetails orderId={id} />;
}
