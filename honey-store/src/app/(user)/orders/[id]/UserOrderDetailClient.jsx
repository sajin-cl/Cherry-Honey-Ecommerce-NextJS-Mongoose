"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";

const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

const STATUS_STYLES = {
  placed: "border border-gray-600 text-gray-300",
  processing: "border border-amber-500 text-amber-500",
  shipped: "border border-blue-400 text-blue-400",
  delivered: "border border-green-400 text-green-400",
  cancelled: "border border-red-400 text-red-400",
};

const STATUS_LABELS = {
  placed: "Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function UserOrderDetailClient({ initialOrder, similarProducts }) {
  const [order, setOrder] = useState(initialOrder);
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: "cancelled" }),
      });
      const data = await res.json();
      if (res.ok && data.order) {
        // Normalize returned order
        const o = data.order;
        setOrder({
          id: o._id,
          date: new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          status: o.orderStatus,
          items: o.items.map((i, index) => ({
            id: i._id || index,
            name: i.name,
            qty: i.qty,
            price: i.price,
            image: i.image || "/hero-honey-jar.webp",
          })),
          shipping: {
            name: o.shippingAddress?.name || "N/A",
            address: o.shippingAddress?.line1 || "N/A",
            phone: o.shippingAddress?.phone || "N/A",
          },
          payment: {
            type: o.paymentMethod === "cod" ? "Cash On Delivery (COD)" : "Online Payment",
            status: o.paymentStatus || "pending",
          },
          summary: {
            subtotal: o.itemsTotal,
            shipping: o.shippingCharge,
            tax: o.tax,
            total: o.grandTotal,
          },
          tracking: [
            { label: "Order Placed", done: true, time: new Date(o.createdAt).toLocaleString("en-IN", { hour: "numeric", minute: "numeric", hour12: true }) },
            { label: "Order Processing", done: ["processing", "shipped", "delivered"].includes(o.orderStatus) },
            { label: "Order Shipped", done: ["shipped", "delivered"].includes(o.orderStatus) },
            { label: "Order Delivered", done: o.orderStatus === "delivered" },
          ],
        });
      } else {
        alert( "Failed to cancel order");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  const isCancellable = ["placed", "processing"].includes(order.status);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/orders" className="hover:text-[#C8A84B] transition-colors">My Orders</Link>
          <span>&rsaquo;</span>
          <span className="text-gray-300">Order Details</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 min-w-0 space-y-5 w-full">
            <div className="bg-[#111] border border-gray-800 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="border border-gray-600 text-gray-300 text-xs px-3 py-1 font-mono">
                  Order ID: {order.id}
                </span>
                <span className="text-gray-400 text-xs">{order.date}</span>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 capitalize ${STATUS_STYLES[order.status]}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>

            <div className="bg-[#111] border border-gray-800">
              <div className="divide-y divide-gray-800">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="relative w-14 h-14 shrink-0 bg-black border border-gray-800">
                      <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Qty : {item.qty}</p>
                    </div>
                    <span className="text-white text-sm font-semibold shrink-0">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {isCancellable && (
                <div className="px-5 py-4 flex justify-end border-t border-gray-800">
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="border border-[#C8A84B] text-[#C8A84B] hover:bg-[#C8A84B] hover:text-black disabled:opacity-50 text-xs font-semibold px-6 py-2.5 transition-all tracking-wider uppercase"
                  >
                    {cancelling ? "Cancelling..." : "Cancel Order"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-[#111] border border-gray-800 px-5 py-5">
                <h3 className="text-white text-sm font-semibold mb-3">Shipping Details</h3>
                <p className="text-white text-sm font-medium mb-1">{order?.shipping?.name}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{order?.shipping?.address}</p>
                <p className="text-gray-400 text-xs mt-2">Phone: {order?.shipping?.phone}</p>
              </div>

              <div className="bg-[#111] border border-gray-800 px-5 py-5">
                <h3 className="text-white text-sm font-semibold mb-3">Payment Details</h3>
                <div className="space-y-1">
                  <p className="text-white text-sm font-medium">{order?.payment?.type}</p>
                  <p className="text-gray-400 text-xs mt-0.5">Status: <span className="text-gray-300 capitalize">{order?.payment?.status}</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-64 shrink-0 space-y-5">
            {order.status !== "cancelled" && (
              <div className="bg-[#111] border border-gray-800 px-5 py-5">
                <h3 className="text-white text-sm font-semibold mb-5">Track Order</h3>
                <div className="relative">
                  <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-800" />
                  <div className="space-y-6">
                    {order.tracking.map((step, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div className={`relative z-10 w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 ${step.done
                          ? "bg-[#C8A84B] border-[#C8A84B]"
                          : "bg-[#0a0a0a] border-gray-600"
                          }`}>
                          {step.done && (
                            <div className="absolute inset-0 rounded-full bg-[#C8A84B]/30 scale-150" />
                          )}
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${step.done ? "text-white" : "text-gray-500"}`}>
                            {step?.label}
                          </p>
                          {step?.time && <p className="text-gray-600 text-[10px] mt-0.5">{step.time}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#111] border border-gray-800 px-5 py-5">
              <h3 className="text-white text-sm font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{order?.summary?.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400 font-medium">
                    {order?.summary?.shipping === 0 ? "Free" : `₹${order?.summary?.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">₹{order?.summary?.tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">₹{order?.summary?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl text-white mb-8" style={serif}>
              <span className="text-[#C8A84B]">Similar</span> Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
