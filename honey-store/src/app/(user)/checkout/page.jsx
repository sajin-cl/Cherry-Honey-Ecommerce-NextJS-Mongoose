"use client";

import { useState } from "react";
import Link from "next/link";

/* ── design tokens ── */
const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

/* ── mock addresses ── */
const DEFAULT_ADDRESS = {
  id: 1,
  name: "Alexa Johnson",
  tag: "HOME",
  line1: "3891 Ranchview Dr, Richardson, California 62639",
  phone: "(205) 555-0100",
};

const OTHER_ADDRESSES = [
  { id: 2, name: "Alexa Johnson", line1: "2464 Royal Ln, Mesa, New Jersey 45463",           phone: "(217) 555-0113" },
  { id: 3, name: "Jane Cooper",   line1: "2972 Westheimer Rd, Santa Ana, Illinois 85486",    phone: "(603) 555-0123" },
  { id: 4, name: "Wade Warren",   line1: "2715 Ash Dr, San Jose, South Dakota 83475",        phone: "(208) 555-0112" },
];

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

/* ── dot-menu component ── */
function DotMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
        aria-label="Options"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5"  r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-20 bg-[#1a1a1a] border border-gray-700 shadow-xl w-28 py-1">
            <button onClick={() => { onEdit?.(); setOpen(false); }} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#C8A84B]/10 hover:text-[#C8A84B] transition-colors">Edit</button>
            <button onClick={() => { onDelete?.(); setOpen(false); }} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── address card ── */
function AddressCard({ addr, selected, onSelect, onDelete }) {
  return (
    <div
      className={`border px-5 py-4 flex items-start gap-4 transition-all duration-200 cursor-pointer ${
        selected ? "border-gray-600 bg-[#111]" : "border-gray-800 bg-[#0d0d0d] hover:border-gray-700"
      }`}
      onClick={onSelect}
    >
      {/* Radio */}
      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
        selected ? "border-[#C8A84B]" : "border-gray-600"
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-[#C8A84B]" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-sm font-medium">{addr.name}</span>
          {addr.tag && (
            <span className="border border-[#C8A84B] text-[#C8A84B] text-[10px] font-semibold px-1.5 py-0.5 tracking-wide">
              {addr.tag}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-xs mb-2">{addr.line1}</p>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          {addr.phone}
        </div>
      </div>

      {/* Dot menu */}
      <DotMenu onDelete={onDelete} />
    </div>
  );
}

/* ════════════════════════════════════════
   CHECKOUT PAGE
════════════════════════════════════════ */
export default function CheckoutPage() {
  const [selectedId, setSelectedId] = useState(DEFAULT_ADDRESS.id);
  const [otherAddrs, setOtherAddrs] = useState(OTHER_ADDRESSES);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: "", line1: "", phone: "" });

  const allAddrs = [DEFAULT_ADDRESS, ...otherAddrs];
  const subtotal = 340;
  const taxes = 10;
  const grandTotal = subtotal + taxes;

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newAddr.name.trim() || !newAddr.line1.trim()) return;
    setOtherAddrs((prev) => [
      ...prev,
      { id: Date.now(), name: newAddr.name, line1: newAddr.line1, phone: newAddr.phone },
    ]);
    setNewAddr({ name: "", line1: "", phone: "" });
    setShowNewForm(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
    

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-24 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#C8A84B] transition-colors">Cart</Link>
          <span>/</span>
          <span className="text-gray-300">Checkout</span>
        </nav>

        {/* Page title */}
        <h1 className="text-3xl text-white mb-8" style={serif}>Select Address</h1>

        {/* ── Progress stepper ── */}
        <div className="flex items-center mb-10 max-w-2xl">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              {/* Icon */}
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 flex items-center justify-center transition-colors ${
                  i === 0 ? "bg-[#C8A84B] text-black" : "bg-[#1a1a1a] border border-gray-700 text-gray-500"
                }`}>
                  {step.icon}
                </div>
                <span className={`text-xs whitespace-nowrap ${i === 0 ? "text-[#C8A84B]" : "text-gray-500"}`}>
                  {step.label}
                </span>
              </div>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-gray-800 mx-3 mb-5" />
              )}
            </div>
          ))}
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ════ LEFT — address list ════ */}
          <div className="flex-1 min-w-0">

            {/* Default Address */}
            <h2 className="text-sm font-semibold text-white mb-3 tracking-wide">Default Address</h2>
            <div className="mb-6">
              <AddressCard
                addr={DEFAULT_ADDRESS}
                selected={selectedId === DEFAULT_ADDRESS.id}
                onSelect={() => setSelectedId(DEFAULT_ADDRESS.id)}
              />
            </div>

            {/* Other Addresses */}
            {otherAddrs.length > 0 && (
              <>
                <h2 className="text-sm font-semibold text-white mb-3 tracking-wide">Other Address</h2>
                <div className="space-y-3 mb-6">
                  {otherAddrs.map((addr) => (
                    <AddressCard
                      key={addr.id}
                      addr={addr}
                      selected={selectedId === addr.id}
                      onSelect={() => setSelectedId(addr.id)}
                      onDelete={() => setOtherAddrs((prev) => prev.filter((a) => a.id !== addr.id))}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Add new address */}
            {showNewForm ? (
              <form onSubmit={handleAddNew} className="border border-gray-700 p-5 space-y-4 mb-4">
                <h3 className="text-white text-sm font-medium">New Address</h3>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newAddr.name}
                    onChange={(e) => setNewAddr((a) => ({ ...a, name: e.target.value }))}
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-[#C8A84B] text-white text-sm px-4 py-2.5 outline-none transition-colors placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Address</label>
                  <input
                    type="text"
                    value={newAddr.line1}
                    onChange={(e) => setNewAddr((a) => ({ ...a, line1: e.target.value }))}
                    placeholder="Street, City, State ZIP"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-[#C8A84B] text-white text-sm px-4 py-2.5 outline-none transition-colors placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr((a) => ({ ...a, phone: e.target.value }))}
                    placeholder="(000) 000-0000"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-[#C8A84B] text-white text-sm px-4 py-2.5 outline-none transition-colors placeholder-gray-600"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewForm(false)}
                    className="flex-1 py-2.5 border border-gray-700 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#C8A84B] hover:bg-[#b8973e] text-black font-semibold text-sm transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowNewForm(true)}
                className="flex items-center gap-2 border border-[#C8A84B] text-[#C8A84B] hover:bg-[#C8A84B]/10 text-sm font-semibold px-5 py-3 transition-colors tracking-widest"
              >
                <span className="text-lg leading-none">+</span>
                ADD NEW ADDRESS
              </button>
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
                  <span className="text-white font-medium">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-white">Grand Total</span>
                  <span className="text-white text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout/payment"
                className="block w-full bg-[#C8A84B] hover:bg-[#b8973e] text-white text-center font-bold text-sm tracking-[0.2em] uppercase py-4 transition-colors"
              >
                CONTINUE
              </Link>
            </div>
          </div>

        </div>
      </div>

     
    </div>
  );
}
