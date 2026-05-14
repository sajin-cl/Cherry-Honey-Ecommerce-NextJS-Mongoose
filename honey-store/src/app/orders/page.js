"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

/* ── design tokens ── */
const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

/* ── Filter tabs ── */
const TABS = ["All Orders", "Pending Orders", "Completed Orders", "Cancelled Orders"];

/* ── Mock orders ── */
const ORDERS = [
  {
    id: "#125424", date: "15 Jun, 2022", status: "Completed", rating: 4,
    items: [
      { id: 1, name: "Honey", qty: 2, price: 254.50, image: "/hero-honey-jar.png" },
      { id: 2, name: "Honey", qty: 2, price: 254.50, image: "/honey-jar-bees.png" },
    ],
  },
  {
    id: "#125424", date: "15 Jun, 2022", status: "Completed", rating: 4,
    items: [
      { id: 3, name: "Honey", qty: 2, price: 254.50, image: "/hero-honey-jar.png" },
      { id: 4, name: "Honey", qty: 2, price: 254.50, image: "/honey-jar-bees.png" },
    ],
  },
  {
    id: "#122424", date: "10 Jun, 2022", status: "Completed", rating: 4,
    items: [
      { id: 5, name: "Honey", qty: 2, price: 254.50, image: "/hero-honey-jar.png" },
      { id: 6, name: "Honey", qty: 3, price: 254.50, image: "/honey-jar-bees.png" },
    ],
  },
];

const SIMILAR = [
  { id: 10, name: "Honey",                           price: 145, original: 160, image: "/hero-honey-jar.png" },
  { id: 11, name: "Honey",                           price: 130, original: 148, image: "/honey-jar-bees.png" },
  { id: 12, name: "Honey",                           price: 80,  original: 90,  image: "/hero-honey-jar.png" },
  { id: 13, name: "Mac Studio Fix Fluid Foundation", price: 90,  original: 95,  image: "/honey-jar-bees.png" },
];

/* ── status pill colours ── */
const STATUS_CLS = {
  Pending:   "border border-[#C8A84B] text-[#C8A84B]",
  Completed: "border border-green-400 text-green-400",
  Cancelled: "border border-red-400 text-red-400",
};

/* ── Static star display ── */
function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-[#C8A84B]" : "text-gray-700"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Single order card ── */
function OrderCard({ order }) {
  return (
    <div className="bg-[#111] border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <span className="border border-[#C8A84B] text-[#C8A84B] text-xs px-3 py-1 font-mono">
            Order : {order.id}
          </span>
          <span className="text-gray-400 text-xs">{order.date}</span>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 ${STATUS_CLS[order.status]}`}>
          {order.status}
        </span>
      </div>

      {/* Items */}
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
              $ {item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800 flex-wrap gap-3">
        {/* Stars + label */}
        <div className="flex items-center gap-2">
          <StarDisplay rating={order.rating} />
          <span className="text-gray-400 text-xs">Review Product</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button className="border border-gray-700 text-gray-300 hover:border-[#C8A84B] hover:text-[#C8A84B] text-xs font-semibold px-4 py-2 transition-colors">
            Order Again
          </button>
          <Link
            href={`/orders/${order.id.replace("#", "")}`}
            className="bg-[#C8A84B] hover:bg-[#b8973e] text-white text-xs font-semibold px-4 py-2 transition-colors"
          >
            View Order Details
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MY ORDERS PAGE
════════════════════════════════════════ */
export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");

  /* Filter by status */
  const filtered = ORDERS.filter((o) => {
    if (activeTab === "All Orders") return true;
    if (activeTab === "Pending Orders")   return o.status === "Pending";
    if (activeTab === "Completed Orders") return o.status === "Completed";
    if (activeTab === "Cancelled Orders") return o.status === "Cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-20 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <span className="text-gray-300">My Orders</span>
        </nav>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-0 border-b border-gray-800 mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#C8A84B] text-[#C8A84B]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Order cards ── */}
        {filtered.length > 0 ? (
          <div className="space-y-5 mb-16">
            {filtered.map((order, i) => (
              <OrderCard key={i} order={order} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-sm mb-4">No orders found.</p>
            <Link href="/products" className="bg-[#C8A84B] hover:bg-[#b8973e] text-black font-semibold text-sm px-8 py-3 transition-colors">
              Shop Now
            </Link>
          </div>
        )}

        {/* ── Similar Products ── */}
        <section>
          <h2 className="text-2xl text-white mb-8" style={serif}>
            <span className="text-[#C8A84B]">Similar</span> Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SIMILAR.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group block">
                <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/40 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="relative h-44 bg-black">
                    <Image src={p.image} alt={p.name} fill sizes="(max-width:640px) 50vw, 25vw" className="object-contain p-3" />
                  </div>
                  <div className="p-3">
                    <p className="text-white text-xs mb-1 truncate group-hover:text-[#C8A84B] transition-colors">{p.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#C8A84B] text-xs font-semibold">${p.price.toFixed(2)}</span>
                      <span className="text-gray-500 text-xs line-through">${p.original.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
