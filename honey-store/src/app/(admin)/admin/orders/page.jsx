/**
 * SSR Admin Orders — real orders from DB with server-side search.
 */
import { requireAdmin } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import Link from "next/link";
import User from "@/models/user.model";
import AdminOrdersClient from "../../../../components/admin/orders/OrdersPage";

export const metadata = { title: "Orders | Admin" };

export default async function OrdersPage({ searchParams }) {
  await requireAdmin();
  await dbConnect();

  const resolvedSearchParams = await searchParams;
  const page  = Math.max(1, parseInt(resolvedSearchParams?.page || "1"));
  const limit = 10;
  const search = resolvedSearchParams?.search || "";

  const query = search
    ? { $or: [{ "shippingAddress.name": { $regex: search, $options: "i" } }] }
    : {};

  const [raw, total] = await Promise.all([
    Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "fullName email")
      .lean(),
    Order.countDocuments(query),
  ]);

  const orders = raw.map((o) => ({
    id: o._id.toString(),
    shortId: "#" + o._id.toString().slice(-6).toUpperCase(),
    date: new Date(o.createdAt).toLocaleDateString("en-IN"),
    customer: { name: o.user?.fullName ?? "Guest", email: o.user?.email ?? "" },
    paymentStatus: o.paymentStatus,
    orderStatus: o.orderStatus,
    grandTotal: o.grandTotal,
    paymentMethod: o.paymentMethod,
  }));

  const totalPages = Math.ceil(total / limit);

  return (
    <AdminOrdersClient
      orders={orders}
      page={page}
      totalPages={totalPages}
      total={total}
      search={search}
    />
  );
}
