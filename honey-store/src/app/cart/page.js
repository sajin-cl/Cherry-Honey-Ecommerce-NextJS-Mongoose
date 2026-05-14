"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

/* ── design tokens ── */
const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

/* ── mock cart data ── */
const INITIAL_CART = [
  { id: 1, name: "Honey Bee", price: 75, original: 80, image: "/hero-honey-jar.png", qty: 1 },
  { id: 2, name: "Honey Bee", price: 120, original: 135, image: "/honey-jar-bees.png", qty: 1 },
  { id: 3, name: "Honey Bee", price: 145, original: 160, image: "/hero-honey-jar.png", qty: 1 },
];

const SIMILAR = [
  { id: 10, name: "Honey", price: 145, original: 160, image: "/hero-honey-jar.png" },
  { id: 11, name: "Honey", price: 130, original: 148, image: "/honey-jar-bees.png" },
  { id: 12, name: "Honey", price: 88, original: 90, image: "/hero-honey-jar.png" },
  { id: 13, name: "Mac Studio Fix Fluid Foundation", price: 90, original: 95, image: "/honey-jar-bees.png" },
];

const TAXES = 10;
const DELIVERY_THRESHOLD = 500;

/* ── tiny helpers ── */
function QtySelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-[#1a1a1a] border border-gray-700 text-white text-xs px-2 py-1 outline-none cursor-pointer"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <option key={n} value={n}>Qty {n}</option>
      ))}
    </select>
  );
}

/* ════════════════════════════════
   CART PAGE
════════════════════════════════ */
export default function CartPage() {
  const [items, setItems] = useState(INITIAL_CART);
  const [selected, setSelected] = useState(new Set(INITIAL_CART.map((i) => i.id)));
  const [email, setEmail] = useState("");

  /* helpers */
  const toggleAll = () => {
    if (selected.size === items.length) setSelected(new Set());
    else setSelected(new Set(items.map((i) => i.id)));
  };
  const toggleItem = (id) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };
  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    const s = new Set(selected);
    s.delete(id);
    setSelected(s);
  };
  const updateQty = (id, qty) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));

  const subtotal = items.filter((i) => selected.has(i.id)).reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal >= DELIVERY_THRESHOLD ? 0 : 0; // free for demo
  const grandTotal = subtotal + TAXES + delivery;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-20">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">My Cart</span>
        </nav>

        {/* ── Page title ── */}
        <h1 className="text-3xl text-white mb-8" style={serif}>My Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ════ LEFT — cart items ════ */}
          <div className="flex-1  w-full min-w-0">

            {/* Select-all bar */}
            <div className="flex items-center justify-between bg-[#111] border border-gray-800 px-4 py-3 mb-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <button
                  onClick={toggleAll}
                  className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${selected.size === items.length
                      ? "bg-[#C8A84B] border-[#C8A84B]"
                      : "border-gray-600"
                    }`}
                  aria-label="Select all"
                >
                  {selected.size === items.length && (
                    <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 5l3 4 7-8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-gray-300">
                  {selected.size}/{items.length} Items Selected
                </span>
              </label>
              {/* Trash icon */}
              <button
                onClick={() => {
                  setItems((prev) => prev.filter((i) => !selected.has(i.id)));
                  setSelected(new Set());
                }}
                className="text-gray-500 hover:text-red-400 transition-colors"
                aria-label="Remove selected"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>

            {/* Cart item rows */}
            {items.length === 0 ? (
              <div className="bg-[#111] border border-gray-800 p-12 text-center">
                <p className="text-gray-400 text-sm mb-4">Your cart is empty.</p>
                <Link href="/products" className="bg-[#C8A84B] hover:bg-[#b8973e] text-black text-sm font-semibold px-6 py-2.5 transition-colors inline-block">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="bg-[#111] border border-gray-800 px-4 py-4 flex gap-4 relative">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-4 h-4 border flex-shrink-0 mt-1 flex items-center justify-center transition-colors ${selected.has(item.id)
                          ? "bg-[#C8A84B] border-[#C8A84B]"
                          : "border-gray-600"
                        }`}
                      aria-label={`Select ${item.name}`}
                    >
                      {selected.has(item.id) && (
                        <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M1 5l3 4 7-8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>

                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-black">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                        loading="eager"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium mb-1">{item.name}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#C8A84B] text-sm font-semibold">${item.price.toFixed(2)}</span>
                        <span className="text-gray-500 text-xs line-through">${item.original.toFixed(2)}</span>
                      </div>
                      <QtySelect value={item.qty} onChange={(q) => updateQty(item.id, q)} />

                      {/* Meta info */}
                      <div className="flex flex-col gap-1 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <svg className="w-3.5 h-3.5 text-[#C8A84B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                          </svg>
                          15 Days return available
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <svg className="w-3.5 h-3.5 text-[#C8A84B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                          </svg>
                          Delivered by <span className="text-white ml-1">Dec 15, 2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Remove × */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                  <span className="text-white font-medium">${TAXES.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-white">Grand Total</span>
                  <span className="text-white">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#C8A84B] hover:bg-[#b8973e] text-white text-center font-bold text-sm tracking-[0.2em] uppercase py-4 transition-colors"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        </div>

        {/* ════ SIMILAR PRODUCTS ════ */}
        <section className="mt-20">
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

      {/* ════ FOOTER ════ */}
      <Footer />
    </div>
  );
}
