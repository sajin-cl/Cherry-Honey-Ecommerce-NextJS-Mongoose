"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


/* ── design tokens ── */
const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

/* ── mock order data ── */
const ORDER = {
  id: "#125424",
  date: "15 Jun, 2022",
  status: "Pending",
  items: [
    { id: 1, name: "Honey Bee",  qty: 2, price: 254.50, image: "/hero-honey-jar.png" },
    { id: 2, name: "Honey Wild", qty: 2, price: 254.50, image: "/honey-jar-bees.png" },
  ],
  shipping: { name: "Alexa Johnson", address: "3891 Ranchview Dr, Richardson, California 62639" },
  payment:  { type: "Credit Card", holder: "ALEXA JOHNSON", number: "4591 •••• •••• 3214" },
  summary:  { subtotal: 254.22, shipping: 0, discount: 10, tax: 0.21, total: 254.22 },
  tracking: [
    { label: "Order Created",   time: "16 Jun 2021, 05:00 PM", done: true  },
    { label: "Order Shipped",   time: "16 Jun 2021, 05:00 PM", done: false },
    { label: "Order Delivered", time: "16 Jun 2022, 05:00 PM", done: false },
  ],
};

const SIMILAR = [
  { id: 10, name: "Honey",                        price: 145, original: 160, image: "/hero-honey-jar.png" },
  { id: 11, name: "Honey",                        price: 130, original: 148, image: "/honey-jar-bees.png" },
  { id: 12, name: "Honey",                        price: 80,  original: 90,  image: "/hero-honey-jar.png" },
  { id: 13, name: "Mac Studio Fix Fluid Foundation", price: 90, original: 95, image: "/honey-jar-bees.png" },
];

/* ── status pill ── */
const STATUS_STYLES = {
  Pending:   "border border-[#C8A84B] text-[#C8A84B]",
  Shipped:   "border border-blue-400 text-blue-400",
  Delivered: "border border-green-400 text-green-400",
  Cancelled: "border border-red-400 text-red-400",
};

/* ── Mastercard SVG ── */
function MastercardIcon() {
  return (
    <svg className="w-8 h-5" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="4" fill="#252525" />
      <circle cx="15" cy="12" r="7" fill="#EB001B" />
      <circle cx="23" cy="12" r="7" fill="#F79E1B" />
      <path d="M19 6.8a7 7 0 010 10.4A7 7 0 0119 6.8z" fill="#FF5F00" />
    </svg>
  );
}

/* ════════════════════════════════════════
   ORDER DETAILS PAGE
════════════════════════════════════════ */
export default function OrderDetailsPage() {
  const order = ORDER;
  const [cancelled, setCancelled] = useState(false);
  const [items, setItems] = useState(order.items);

  const handleCancel = () => setCancelled(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-20 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/orders" className="hover:text-[#C8A84B] transition-colors">My Orders</Link>
          <span>&rsaquo;</span>
          <span className="text-gray-300">Order Details</span>
        </nav>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ════ LEFT column ════ */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Order header */}
            <div className="bg-[#111] border border-gray-800 px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="border border-gray-600 text-gray-300 text-xs px-3 py-1 font-mono">
                  Order : {order.id}
                </span>
                <span className="text-gray-400 text-xs">{order.date}</span>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 ${STATUS_STYLES[cancelled ? "Cancelled" : order.status]}`}>
                {cancelled ? "Cancelled" : order.status}
              </span>
            </div>

            {/* Order items */}
            <div className="bg-[#111] border border-gray-800">
              <div className="divide-y divide-gray-800">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    {/* Image */}
                    <div className="relative w-14 h-14 flex-shrink-0 bg-black border border-gray-800">
                      <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain p-1" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Qty : {item.qty}</p>
                    </div>
                    {/* Price */}
                    <span className="text-white text-sm font-semibold flex-shrink-0">
                      $ {item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cancel Order button */}
              {!cancelled && (
                <div className="px-5 py-4 flex justify-end border-t border-gray-800">
                  <button
                    onClick={handleCancel}
                    className="border border-[#C8A84B] text-[#C8A84B] hover:bg-[#C8A84B] hover:text-black text-xs font-semibold px-6 py-2.5 transition-colors tracking-wider uppercase"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>

            {/* Shipping + Payment panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Shipping Details */}
              <div className="bg-[#111] border border-gray-800 px-5 py-5">
                <h3 className="text-white text-sm font-semibold mb-3">Shipping Details</h3>
                <p className="text-white text-sm font-medium mb-1">{order.shipping.name}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{order.shipping.address}</p>
              </div>

              {/* Payment Method */}
              <div className="bg-[#111] border border-gray-800 px-5 py-5">
                <h3 className="text-white text-sm font-semibold mb-3">Payment Method</h3>
                <div className="flex items-center gap-3">
                  <MastercardIcon />
                  <div>
                    <p className="text-white text-sm font-medium">{order.payment.holder}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{order.payment.number}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ════ RIGHT column ════ */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-5">

            {/* Track Order */}
            <div className="bg-[#111] border border-gray-800 px-5 py-5">
              <h3 className="text-white text-sm font-semibold mb-5">Track Order</h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-800" />

                <div className="space-y-6">
                  {order.tracking.map((step, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      {/* Circle */}
                      <div className={`relative z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                        step.done
                          ? "bg-[#C8A84B] border-[#C8A84B]"
                          : "bg-[#0a0a0a] border-gray-600"
                      }`}>
                        {step.done && (
                          <div className="absolute inset-0 rounded-full bg-[#C8A84B]/30 scale-150" />
                        )}
                      </div>
                      {/* Label + time */}
                      <div>
                        <p className={`text-xs font-medium ${step.done ? "text-white" : "text-gray-500"}`}>
                          {step.label}
                        </p>
                        <p className="text-gray-600 text-[10px] mt-0.5">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#111] border border-gray-800 px-5 py-5">
              <h3 className="text-white text-sm font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">$ {order.summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Discount</span>
                  <span className="text-[#C8A84B] font-medium">{order.summary.discount}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">$ {order.summary.tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">$ {order.summary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ════ SIMILAR PRODUCTS ════ */}
        <section className="mt-16">
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

    </div>
  );
}
