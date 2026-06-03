/**
 * SSR My Orders — fetches user's orders directly from DB.
 * Tab filtering happens client-side since data is already loaded.
 */
import { requireUser } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import MyOrdersClient from "./MyOrdersClient";

export const metadata = { title: "My Orders | Cherrys Honey" };

export default async function MyOrdersPage() {
  const user = await requireUser();
  await dbConnect();

  const raw = await Order.find({ user: user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const orders = raw.map((o) => ({
    id: o._id.toString(),
    shortId: "#" + o._id.toString().slice(-6).toUpperCase(),
    date: new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    status: o.orderStatus,
    paymentStatus: o.paymentStatus,
    grandTotal: o.grandTotal,
    items: (o.items || []).map((item) => ({
      id: item._id?.toString() || item.product?.toString(),
      name: item.name,
      qty: item.qty,
      price: item.price,
      image: item.image || "/hero-honey-jar.webp",
    })),
  }));

  return <MyOrdersClient orders={orders} />;
};
