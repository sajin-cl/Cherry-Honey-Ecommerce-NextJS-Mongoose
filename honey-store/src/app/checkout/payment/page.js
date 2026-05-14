"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

/* ── design tokens ── */
const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

/* ── Stepper config ── */
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

/* ── Payment methods ── */
const PAYMENT_METHODS = [
  { id: "card",     label: "Credit/Debit Card" },
  { id: "paypal",   label: "Paypal" },
  { id: "phonepay", label: "Phone Pay" },
  { id: "cod",      label: "Cash On Delivery" },
];

/* ── Shared input style ── */
const inputCls =
  "w-full bg-[#111] border border-gray-700 focus:border-gray-500 text-white text-sm px-4 py-3 outline-none transition-colors placeholder-gray-600";

/* ════════════════════════════════════════
   PAYMENT PAGE
════════════════════════════════════════ */
export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", holder: "", expiry: "", cvc: "" });

  const subtotal = 340;
  const taxes = 10;
  const grandTotal = subtotal + taxes;

  const update = (f) => (e) => setCard((c) => ({ ...c, [f]: e.target.value }));

  /* Format card number with spaces every 4 chars */
  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  /* All payment methods go to review page */
  const goToReview = () => router.push("/checkout/review");

  const handleCardPay = (e) => {
    e.preventDefault();
    goToReview();
  };

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
          <span className="text-gray-300">Payment Method</span>
        </nav>

        {/* Page title */}
        <h1 className="text-3xl text-white mb-8" style={serif}>Payment Method</h1>

        {/* ── Progress stepper ── */}
        <div className="flex items-center mb-10 max-w-2xl">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 flex items-center justify-center transition-colors ${
                  i <= 1
                    ? "bg-[#C8A84B] text-black"
                    : "bg-[#1a1a1a] border border-gray-700 text-gray-500"
                }`}>
                  {step.icon}
                </div>
                <span className={`text-xs whitespace-nowrap ${
                  i <= 1 ? "text-[#C8A84B]" : "text-gray-500"
                }`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 mb-5 ${
                  i === 0 ? "bg-[#C8A84B]/50" : "bg-gray-800"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ════ LEFT — payment options ════ */}
          <div className="flex-1 min-w-0">
            <div className="space-y-3">
              {PAYMENT_METHODS.map((pm) => (
                <div key={pm.id}>
                  {/* Radio row */}
                  <button
                    type="button"
                    onClick={() => setMethod(pm.id)}
                    className="flex items-center gap-3 w-full text-left py-2"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      method === pm.id ? "border-[#C8A84B]" : "border-gray-600"
                    }`}>
                      {method === pm.id && (
                        <div className="w-2 h-2 rounded-full bg-[#C8A84B]" />
                      )}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${
                      method === pm.id ? "text-white" : "text-gray-400"
                    }`}>
                      {pm.label}
                    </span>
                  </button>

                  {/* ── Card expanded ── */}
                  {pm.id === "card" && method === "card" && (
                    <form onSubmit={handleCardPay} className="mt-3 mb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1.5">Card Number</label>
                          <input
                            type="text"
                            value={card.number}
                            onChange={(e) => setCard((c) => ({ ...c, number: formatCard(e.target.value) }))}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1.5">Card Holder Name</label>
                          <input
                            type="text"
                            value={card.holder}
                            onChange={update("holder")}
                            placeholder="Full name"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1.5">Expiry Date</label>
                          <input
                            type="text"
                            value={card.expiry}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "").slice(0, 6);
                              if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                              setCard((c) => ({ ...c, expiry: v }));
                            }}
                            placeholder="MM/YYYY"
                            maxLength={7}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1.5">CVC</label>
                          <input
                            type="password"
                            value={card.cvc}
                            onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                            placeholder="••••"
                            maxLength={4}
                            className={inputCls}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-sm tracking-widest uppercase px-8 py-3 transition-colors"
                      >
                        PAY NOW
                      </button>
                    </form>
                  )}

                  {/* ── PayPal expanded ── */}
                  {pm.id === "paypal" && method === "paypal" && (
                    <div className="mt-3 mb-2 bg-[#111] border border-gray-800 p-5 flex flex-col items-start gap-3">
                      <p className="text-gray-400 text-sm">You will be redirected to PayPal to complete your payment securely.</p>
                      <button
                        onClick={goToReview}
                        className="bg-[#003087] hover:bg-[#002166] text-white font-bold text-sm px-8 py-3 transition-colors"
                      >
                        Continue with PayPal
                      </button>
                    </div>
                  )}

                  {/* ── PhonePe expanded ── */}
                  {pm.id === "phonepay" && method === "phonepay" && (
                    <div className="mt-3 mb-2 bg-[#111] border border-gray-800 p-5 flex flex-col items-start gap-3">
                      <p className="text-gray-400 text-sm">Open your PhonePe app, scan the QR or enter UPI ID to pay.</p>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          className={`${inputCls} max-w-xs`}
                        />
                        <button
                          onClick={goToReview}
                          className="bg-[#5f259f] hover:bg-[#4a1b7a] text-white font-bold text-sm px-6 py-3 transition-colors whitespace-nowrap"
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Cash on Delivery expanded ── */}
                  {pm.id === "cod" && method === "cod" && (
                    <div className="mt-3 mb-2 bg-[#111] border border-gray-800 p-5 flex flex-col items-start gap-3">
                      <p className="text-gray-400 text-sm">Pay in cash when your order is delivered to your doorstep.</p>
                     
                    </div>
                  )}
                </div>
              ))}
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

              <Link
                href="/checkout/review"
                className="block w-full bg-[#C8A84B] hover:bg-[#b8973e] text-white text-center font-bold text-sm tracking-[0.2em] uppercase py-4 transition-colors"
              >
                CONTINUE
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}