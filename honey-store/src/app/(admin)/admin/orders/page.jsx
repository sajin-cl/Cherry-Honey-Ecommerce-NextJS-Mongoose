import OrderTable from "@/components/admin/OrderTable";

export const metadata = {
  title: "Orders | Cherry Honey Admin",
  description: "Track and manage all orders across your store.",
};

export default function OrdersPage() {
  return <OrderTable />;
}
