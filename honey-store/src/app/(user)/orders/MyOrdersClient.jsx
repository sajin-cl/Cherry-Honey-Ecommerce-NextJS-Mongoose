"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TABS = ["All Orders", "Pending", "Delivered", "Cancelled"];

const STATUS_CLS = {
  placed:     "border border-[#C8A84B] text-[#C8A84B]",
  processing: "border border-blue-400 text-blue-400",
  shipped:    "border border-purple-400 text-purple-400",
  delivered:  "border border-green-400 text-green-400",
  cancelled:  "border border-red-400 text-red-400",
};

function OrderCard({ order }) {
  return (
    <div className="bg-[#111] border border-gray-800">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <span className="border border-[#C8A84B] text-[#C8A84B] text-xs px-3 py-1 font-mono">
            Order : {order.shortId}
          </span>
          <span className="text-gray-400 text-xs">{order.date}</span>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 ${STATUS_CLS[order.status] ?? "border border-gray-600 text-gray-400"}`}>
          {order.status}
        </span>
      </div>

      <div className="divide-y divide-gray-800/60">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-5 py-3">
            <div className="relative w-12 h-12 flex-shrink-0 bg-black border border-gray-800">
              <Image src={item.image} alt={item.name} fill sizes="48px" className="object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{item.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">Qty : {item.qty}</p>
            </div>
            <span className="text-white text-sm font-semibold flex-shrink-0">
              ₹{item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800 flex-wrap gap-3">
        <span className="text-gray-400 text-xs">
          Grand Total: <span className="text-white font-semibold">₹{order.grandTotal?.toFixed(2)}</span>
        </span>
        <div className="flex items-center gap-3">
          <Link
            href={`/orders/${order.id}`}
            className="bg-[#C8A84B] hover:bg-[#b8973e] text-white text-xs font-semibold px-4 py-2 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MyOrdersClient({ orders }) {
  const [activeTab, setActiveTab] = useState("All Orders");

  const filtered = orders.filter((o) => {
    if (activeTab === "All Orders") return true;
    if (activeTab === "Pending")   return ["placed", "processing", "shipped"].includes(o.status);
    if (activeTab === "Delivered") return o.status === "delivered";
    if (activeTab === "Cancelled") return o.status === "cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-16">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-300">My Orders</span>
        </nav>

        <h1 className="text-2xl font-bold text-white mb-6">My Orders</h1>

        <div className="flex items-center gap-0 border-b border-gray-800 mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                activeTab === tab ? "border-[#C8A84B] text-[#C8A84B]" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-5">
            {filtered.map((order) => <OrderCard key={order.id} order={order} />)}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-sm mb-4">No orders found.</p>
            <Link href="/products" className="bg-[#C8A84B] hover:bg-[#b8973e] text-black font-semibold text-sm px-8 py-3 transition-colors">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
