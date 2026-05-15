"use client";

import Link from "next/link";

/**
 * OrderConfirmedModal
 * Shows a centered overlay confirming the user's order.
 *
 * Props:
 *   onClose  — () => void   (optional, called if user clicks backdrop)
 *   homeHref — string       (default "/")
 *   orderHref— string       (default "/products")
 */
export default function OrderConfirmedModal({
  onClose,
  homeHref = "/",
  orderHref = "/products",
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px] z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmed-title"
      >
        <div className="bg-[#111] w-full max-w-sm mx-auto flex flex-col items-center py-10 px-8 text-center">

          {/* Concentric rings + checkmark icon */}
          <div className="relative flex items-center justify-center mb-7">
            {/* Outermost ring */}
            <div className="absolute w-28 h-28 rounded-full border border-[#C8A84B]/20" />
            {/* Middle ring */}
            <div className="absolute w-20 h-20 rounded-full border border-[#C8A84B]/40" />
            {/* Inner filled circle */}
            <div className="w-14 h-14 rounded-full bg-[#C8A84B] flex items-center justify-center">
              <svg
                className="w-7 h-7 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2
            id="order-confirmed-title"
            className="text-white text-2xl leading-tight mb-3"
            style={{
              fontFamily: "'Georgia','Times New Roman',serif",
              fontStyle: "italic",
            }}
          >
            Your Order is
            <br />
            Confirmed
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-xs leading-relaxed mb-8 max-w-xs">
            Thanks for shopping! Your order hasn&apos;t shipped yet,
            but we will send you an email when it&apos;s done.
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 w-full">
            <Link
              href={homeHref}
              className="flex-1 py-3 border border-gray-600 text-white text-xs font-semibold uppercase tracking-widest hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors text-center"
            >
              BACK TO HOME
            </Link>
            <Link
              href={orderHref}
              className="flex-1 py-3 bg-[#C8A84B] hover:bg-[#b8973e] text-white text-xs font-semibold uppercase tracking-widest transition-colors text-center"
            >
              VIEW ORDER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
