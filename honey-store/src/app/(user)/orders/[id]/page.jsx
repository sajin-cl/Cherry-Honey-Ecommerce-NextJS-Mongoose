import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import { getServerUser } from "@/lib/auth";
import UserOrderDetailClient from "./UserOrderDetailClient";
import mongoose from "mongoose";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order Details | Cherrys Honey`,
    description: `View your order details, delivery status, purchased products, and tracking information for your Cherrys Honey order.`,
    alternates: {
      canonical: `/orders/${id}`,
    }
  };
}

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  const userPayload = await getServerUser();
  if (!userPayload) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4 font-light">Please login to view your order details.</p>
          <Link
            href={`/accounts/login?redirect=/orders/${id}`}
            className="bg-primary hover:bg-secondary px-8 py-3 text-black font-semibold text-sm tracking-[0.1em] uppercase transition-colors inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  await dbConnect();

  // Guard against invalid ObjectIds
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-400 font-light">Order not found.</p>
      </div>
    );
  }

  const orderRaw = await Order.findById(id).lean();

  if (!orderRaw) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-400 font-light">Order not found.</p>
      </div>
    );
  }

  // Double check authorization
  if (userPayload.role !== "admin" && orderRaw.user.toString() !== userPayload.id) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-400 font-light">You are not authorized to view this order.</p>
      </div>
    );
  }

  // Normalize order object
  const initialOrder = {
    id: orderRaw._id.toString(),
    date: new Date(orderRaw.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    status: orderRaw.orderStatus,
    items: orderRaw.items.map((i, index) => ({
      id: i?._id?.toString() || index,
      productId: i?.product?.toString() || "",
      name: i?.name,
      qty: i?.qty,
      price: i?.price,
      image: i?.image || "/hero-honey-jar.webp",
    })),
    shipping: {
      name: orderRaw.shippingAddress?.name || "N/A",
      address: orderRaw?.shippingAddress?.line1 || "N/A",
      phone: orderRaw?.shippingAddress?.phone || "N/A",
    },
    payment: {
      type: orderRaw?.paymentMethod === "cod" ? "Cash On Delivery (COD)" : "Online Payment",
      status: orderRaw?.paymentStatus || "pending",
    },
    summary: {
      subtotal: orderRaw?.itemsTotal,
      shipping: orderRaw?.shippingCharge,
      tax: orderRaw?.tax,
      total: orderRaw.grandTotal,
    },
    tracking: [
      { label: "Order Placed", done: true, time: new Date(orderRaw.createdAt).toLocaleString("en-IN", { hour: "numeric", minute: "numeric", hour12: true }) },
      { label: "Order Processing", done: ["processing", "shipped", "delivered"].includes(orderRaw.orderStatus) },
      { label: "Order Shipped", done: ["shipped", "delivered"].includes(orderRaw.orderStatus) },
      { label: "Order Delivered", done: orderRaw.orderStatus === "delivered" },
    ],
  };

  // Find similar products based on the category of the first product in the order
  let similarProducts = [];
  try {
    const firstProduct = await Product.findById(orderRaw.items[0]?.product).lean();
    if (firstProduct && firstProduct.category) {
      similarProducts = await Product.find({
        category: firstProduct.category,
        _id: { $ne: firstProduct._id }
      })
        .limit(4)
        .lean();
    }
  } catch (err) {
    console.error("Failed to load similar products:", err);
  }

  // If no similar products found, fetch top 4 best sellers
  if (similarProducts.length === 0) {
    try {
      similarProducts = await Product.find({}).limit(4).lean();
    } catch (err) {
      console.error(err);
    }
  }

  // Serialize similarProducts to remove Mongoose-specific objects (like ObjectIds/Dates inside reviews)
  const serializedSimilar = JSON.parse(JSON.stringify(similarProducts));

  return <UserOrderDetailClient initialOrder={initialOrder} similarProducts={serializedSimilar} />;
}
