"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import OrderConfirmedModal from "@/components/ui/OrderConfirmedModal";

/* ── design tokens ── */
const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

/* ── Stepper ── */
const STEPS = [
  {
    label: "Address",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: "Payment Method",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    label: "Review",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
];

/* ── pencil edit icon ── */
function EditIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

/* ── mock order data ── */
const INITIAL_ITEMS = [
  { id: 1, name: "Honey", price: 75,  qty: 1, image: "/hero-honey-jar.png" },
  { id: 2, name: "Honey", price: 120, qty: 1, image: "/honey-jar-bees.png" },
  { id: 3, name: "Honey", price: 145, qty: 1, image: "/hero-honey-jar.png" },
];

const SHIPPING = {
  name: "Alexa Johnson",
  address: "3891 Ranchview Dr, Richardson, California 62639",
};

const PAYMENT = {
  type: "Credit Card",
  last: "8910 6722 4788 XX56",
};


/* ════════════════════════════════════════
   REVIEW ORDER PAGE
════════════════════════════════════════ */
export default function ReviewPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [placed, setPlaced] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const taxes = 10;
  const grandTotal = subtotal + taxes;

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const handlePlaceOrder = () => setPlaced(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-24 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#C8A84B] transition-colors">Cart</Link>
          <span>/</span>
          <Link href="/checkout" className="hover:text-[#C8A84B] transition-colors">Address</Link>
          <span>/</span>
          <Link href="/checkout/payment" className="hover:text-[#C8A84B] transition-colors">Payment</Link>
          <span>/</span>
          <span className="text-gray-300">Review</span>
        </nav>

        {/* Page title */}
        <h1 className="text-3xl text-white mb-8" style={serif}>Review Order</h1>

        {/* ── Progress stepper — all 3 active ── */}
        <div className="flex items-center mb-10 max-w-2xl">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 flex items-center justify-center bg-[#C8A84B] text-black">
                  {step.icon}
                </div>
                <span className="text-xs whitespace-nowrap text-[#C8A84B]">
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-[#C8A84B]/40 mx-3 mb-5" />
              )}
            </div>
          ))}
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ════ LEFT ════ */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* ── Order items ── */}
            <div>
              <p className="text-gray-300 text-sm mb-4">
                Estimated Delivery:{" "}
                <span className="text-white font-medium">December 15, 2024</span>
              </p>

              <div className="divide-y divide-gray-800 border border-gray-800">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-4 py-4 relative">
                    {/* Image */}
                    <div className="relative w-16 h-16 flex-shrink-0 bg-black border border-gray-800">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-contain p-1" />
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium mb-0.5">{item.name}</p>
                      <p className="text-[#C8A84B] text-sm font-semibold mb-0.5">${item.price.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs">QTY: {item.qty}</p>
                    </div>
                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
                      aria-label="Remove item"
                    >×</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Shipping Address ── */}
            <div>
              <h2 className="text-white text-base font-semibold mb-3">Shipping Address</h2>
              <div className="border border-gray-800 px-5 py-4 flex items-start justify-between gap-4 bg-[#111]">
                <div>
                  <p className="text-white text-sm font-medium mb-1">{SHIPPING.name}</p>
                  <p className="text-gray-400 text-xs">{SHIPPING.address}</p>
                </div>
                <Link href="/checkout" className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:text-[#C8A84B] hover:border-[#C8A84B] transition-colors" aria-label="Edit address">
                  <EditIcon />
                </Link>
              </div>
            </div>

            {/* ── Payment Method ── */}
            <div>
              <h2 className="text-white text-base font-semibold mb-3">Payment Method</h2>
              <div className="border border-gray-800 px-5 py-4 flex items-start justify-between gap-4 bg-[#111]">
                <div>
                  <p className="text-white text-sm font-medium mb-1">{PAYMENT.type}</p>
                  <p className="text-gray-400 text-xs">{PAYMENT.last}</p>
                </div>
                <Link href="/checkout/payment" className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:text-[#C8A84B] hover:border-[#C8A84B] transition-colors" aria-label="Edit payment">
                  <EditIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* ════ RIGHT — order summary ════ */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-[#111] border border-gray-800 p-5">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Taxes</span>
                  <span className="text-white font-medium">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between font-bold">
                  <span className="text-white text-sm">Grand Total</span>
                  <span className="text-white text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={items.length === 0}
                className="block w-full bg-[#C8A84B] hover:bg-[#b8973e] disabled:opacity-50 disabled:cursor-not-allowed text-white text-center font-bold text-sm tracking-[0.2em] uppercase py-4 transition-colors"
              >
                PLACE ORDER
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      {/* ── Order Confirmed Modal (overlay on top of page) ── */}
      {placed && <OrderConfirmedModal onClose={() => setPlaced(false)} />}
    </div>
  );
}
