"use client";

import { useState } from "react";

const STATUS_OPTIONS = [
  "Order placed",
  "Pick-up",
  "Dispatched",
  "Package arrived",
  "Dispatched for delivery",
  "Delivery",
];

export default function StatusDropdown({ current }) {
  const [selected, setSelected] = useState(current);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium hover:border-gray-300 transition-all min-w-[200px] justify-between"
      >
        <span>{selected}</span>
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
        <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-[13px] transition-colors hover:bg-gray-50 ${
                selected === opt ? "text-amber-700 font-medium bg-amber-50" : "text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
