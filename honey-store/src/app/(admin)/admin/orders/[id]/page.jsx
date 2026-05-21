import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import { getServerUser } from "@/lib/auth";
import OrderDetails from "@/components/admin/OrderDetails";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order Details #${id} | Cherry Honey Admin`,
    description: `Admin control panel for order #${id}`,
  };
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const userPayload = await getServerUser();

  if (!userPayload || userPayload.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Access denied. Admins only.</p>
      </div>
    );
  }

  await dbConnect();
  const orderRaw = await Order.findById(id)
    .populate("user", "fullName email mobile")
    .lean();

  if (!orderRaw) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Order not found.</p>
      </div>
    );
  }

  const initialOrder = {
    id: orderRaw._id.toString(),
    createdAt: new Date(orderRaw.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }),
    customer: {
      name: orderRaw.user?.fullName || "Guest Customer",
      customerId: orderRaw.user?._id?.toString() || "Guest ID",
      email: orderRaw.user?.email || "N/A",
      phone: orderRaw.user?.mobile || "N/A",
    },
    items: orderRaw.items.map((i, index) => ({
      id: i._id?.toString() || index,
      name: i.name,
      price: i.price,
      qty: i.qty,
      image: i.image || "/hero-honey-jar.webp",
    })),
    payment: {
      subtotal: orderRaw.itemsTotal,
      delivery: orderRaw.shippingCharge,
      tax: orderRaw.tax,
      total: orderRaw.grandTotal,
    },
    delivery: {
      name: orderRaw.shippingAddress?.name || "N/A",
      address: orderRaw.shippingAddress?.line1 || "N/A",
      phone: orderRaw.shippingAddress?.phone || "N/A",
    },
    paymentMethod: orderRaw.paymentMethod || "cod",
    paymentStatus: orderRaw.paymentStatus || "pending",
    orderStatus: orderRaw.orderStatus || "placed",
  };

  return <OrderDetails initialOrder={initialOrder} />;
}
