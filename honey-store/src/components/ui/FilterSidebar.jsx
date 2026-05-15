"use client";

import { useState } from "react";
import Checkbox from "@/components/ui/Checkbox";

const CATEGORIES = [
  { id: "black-honey",   label: "Black Honey",   count: 120 },
  { id: "white-honey",   label: "White Honey",   count: 240 },
  { id: "pure-honey",    label: "Pure Honey",    count: 175 },
  { id: "kashmir-honey", label: "Kashmir Honey", count: 120 },
  { id: "normal-honey",  label: "Normal Honey",  count: 90  },
];

const SIZES = [
  { id: "s-30",     label: "<30 ml",     count: 120 },
  { id: "s-30-50",  label: "30 - 50 ml", count: 240 },
  { id: "s-50-75",  label: "50-75 ml",   count: 175 },
  { id: "s-75-100", label: "75-100 ml",  count: 120 },
  { id: "s-100-200",label: "100-200 ml", count: 90  },
  { id: "s-250-500",label: "250-500 ml", count: 85  },
  { id: "s-500",    label: "500 ml +",   count: 50  },
];

function SectionHeader({ title, open, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-4 text-left"
    >
      <span className="text-base font-semibold text-white">{title}</span>
      <svg
        className={`w-4 h-4 text-gray-400 transition-transform ${open ? "" : "rotate-180"}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function FilterSidebar({ onClose, onApply }) {
  const [catChecked, setCatChecked] = useState({});
  const [sizeChecked, setSizeChecked] = useState({});
  const [price, setPrice] = useState(2000);
  const [catOpen, setCatOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const toggle = (state, setState, id, val) => {
    setState((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => {
    setCatChecked({});
    setSizeChecked({});
    setPrice(2000);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        categories: Object.keys(catChecked).filter((k) => catChecked[k]),
        sizes: Object.keys(sizeChecked).filter((k) => sizeChecked[k]),
        maxPrice: price,
      });
    }
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full bg-[#111111] w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h2 className="text-2xl text-white" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
          Filter
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close filter"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6">

        {/* Divider */}
        <div className="border-t border-gray-800 mt-2" />

        {/* Categories */}
        <div>
          <SectionHeader title="Categories" open={catOpen} onToggle={() => setCatOpen(!catOpen)} />
          <div className="border-t border-gray-800 mb-2" />
          {catOpen && (
            <div className="space-y-1 pb-4">
              {CATEGORIES.map((cat) => (
                <Checkbox
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  label={cat.label}
                  count={cat.count}
                  checked={!!catChecked[cat.id]}
                  onChange={(val) => toggle(catChecked, setCatChecked, cat.id, val)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Size */}
        <div>
          <SectionHeader title="Size" open={sizeOpen} onToggle={() => setSizeOpen(!sizeOpen)} />
          <div className="border-t border-gray-800 mb-2" />
          {sizeOpen && (
            <div className="space-y-1 pb-4">
              {SIZES.map((size) => (
                <Checkbox
                  key={size.id}
                  id={`size-${size.id}`}
                  label={size.label}
                  count={size.count}
                  checked={!!sizeChecked[size.id]}
                  onChange={(val) => toggle(sizeChecked, setSizeChecked, size.id, val)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Filter by Price */}
        <div>
          <SectionHeader title="Filter by Price" open={priceOpen} onToggle={() => setPriceOpen(!priceOpen)} />
          <div className="border-t border-gray-800 mb-4" />
          {priceOpen && (
            <div className="pb-6">
              <p className="text-sm text-gray-400 mb-4">Price: $0 - ${price.toLocaleString()}</p>
              <div className="relative">
                {/* Track */}
                <div className="h-0.5 bg-gray-700 rounded-full w-full relative">
                  <div
                    className="h-0.5 bg-[#C8A84B] rounded-full absolute left-0"
                    style={{ width: `${(price / 2000) * 100}%` }}
                  />
                </div>
                {/* Range input */}
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={10}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-4 -top-1.5"
                  aria-label="Price range"
                />
                {/* Left dot */}
                <div className="absolute left-0 -top-1.5 w-3 h-3 rounded-full bg-[#C8A84B]" />
                {/* Right thumb dot */}
                <div
                  className="absolute -top-1.5 w-3 h-3 rounded-full bg-[#C8A84B]"
                  style={{ left: `calc(${(price / 2000) * 100}% - 6px)` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 py-5 border-t border-gray-800 flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 py-3.5 border border-gray-600 text-white text-sm font-semibold tracking-wide hover:border-white transition-colors"
        >
          RESET
        </button>
        <button
          onClick={handleApply}
          className="flex-1 py-3.5 bg-[#C8A84B] hover:bg-[#b8973e] text-black text-sm font-semibold tracking-wide transition-colors"
        >
          APPLY FILTER
        </button>
      </div>
    </div>
  );
}
