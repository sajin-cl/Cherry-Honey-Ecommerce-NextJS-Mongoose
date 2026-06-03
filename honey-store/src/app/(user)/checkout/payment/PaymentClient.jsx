"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { calculateDelivery, calculateGrandTotal, TAXES } from "@/lib/pricing";

const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

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

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash On Delivery (COD)" },
  { id: "online", label: "Online Payment" },
];

export default function PaymentClient({ cartSubtotal, isBuyNow = false }) {
  const [method, setMethod] = useState("cod");
  const [buyNowSubtotal, setBuyNowSubtotal] = useState(0);

  useEffect(() => {
    const saved = sessionStorage.getItem("paymentMethod");
    if (saved) {
      setMethod(saved);
    } else {
      sessionStorage.setItem("paymentMethod", "cod");
    }

    if (isBuyNow) {
      try {
        const item = JSON.parse(sessionStorage.getItem("buyNowItem") || "null");
        if (item) {
          setBuyNowSubtotal(item.price * item.qty);
        }
      } catch (e) {
        console.error("Failed to load buyNow item:", e);
      }
    }
  }, [isBuyNow]);

  const selectMethod = (m) => {
    setMethod(m);
    sessionStorage.setItem("paymentMethod", m);
  };

  const subtotal = isBuyNow ? buyNowSubtotal : cartSubtotal;
  const delivery = calculateDelivery(subtotal);
  const grandTotal = calculateGrandTotal(subtotal);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#C8A84B] transition-colors">Cart</Link>
          <span>/</span>
          <Link href="/checkout" className="hover:text-[#C8A84B] transition-colors">Address</Link>
          <span>/</span>
          <span className="text-gray-300">Payment Method</span>
        </nav>

        <h1 className="text-3xl text-white mb-8" style={serif}>Payment Method</h1>

        <div className="flex items-center mb-10 max-w-2xl">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 flex items-center justify-center transition-colors ${i <= 1 ? "bg-[#C8A84B] text-black" : "bg-[#1a1a1a] border border-gray-700 text-gray-500"
                  }`}>
                  {step.icon}
                </div>
                <span className={`text-xs whitespace-nowrap ${i <= 1 ? "text-[#C8A84B]" : "text-gray-500"}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 mb-5 ${i === 0 ? "bg-[#C8A84B]/50" : "bg-gray-800"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => selectMethod(pm.id)}
                  className={`flex items-start gap-4 w-full border px-5 py-4 transition-all duration-200 text-left ${method === pm.id ? "border-gray-600 bg-[#111]" : "border-gray-800 bg-[#0d0d0d] hover:border-gray-700"
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${method === pm.id ? "border-[#C8A84B]" : "border-gray-600"
                    }`}>
                    {method === pm.id && <div className="w-2 h-2 rounded-full bg-[#C8A84B]" />}
                  </div>
                  <div>
                    <span className={`text-sm font-semibold block transition-colors ${method === pm.id ? "text-white" : "text-gray-400"
                      }`}>
                      {pm.label}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {pm.id === "cod"
                        ? "Pay in cash (Indian Rupee) when your order is delivered to your doorstep."
                        : "Pay online securely via credit/debit cards, UPI, net banking using Cashfree gateway."}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-[#111] border border-gray-800 p-5">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Taxes</span>
                  <span className="text-white font-medium">₹{TAXES.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className={delivery === 0 ? "text-green-400 font-semibold" : "text-white font-medium"}>
                    {delivery === 0 ? "FREE" : `₹${delivery.toFixed(2)}`}
                  </span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between font-bold">
                  <span className="text-white text-sm">Grand Total</span>
                  <span className="text-white text-base">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href={isBuyNow ? "/checkout/review?buyNow=true" : "/checkout/review"}
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
