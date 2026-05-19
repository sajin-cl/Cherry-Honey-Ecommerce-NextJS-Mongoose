"use client";

import { useState, useEffect } from "react";

const DEFAULT_OPTIONS = [
  "placed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function StatusDropdown({ current, options = DEFAULT_OPTIONS, onChange }) {
  const [selected, setSelected] = useState(current);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(current);
  }, [current]);

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    if (onChange) onChange(opt);
  };

  const getLabel = (opt) => {
    const labels = {
      placed: "Placed",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
      pending: "Pending",
      paid: "Paid",
      failed: "Failed",
      refunded: "Refunded",
    };
    return labels[opt] || opt;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium hover:border-gray-300 transition-all min-w-[150px] justify-between"
      >
        <span className="capitalize">{getLabel(selected)}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-40 overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-3 py-2 text-[13px] transition-colors hover:bg-gray-50 capitalize ${
                  selected === opt ? "text-amber-700 font-medium bg-amber-50" : "text-gray-700"
                }`}
              >
                {getLabel(opt)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
