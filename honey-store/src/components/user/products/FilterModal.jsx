"use client";

import { useState } from "react";
import Checkbox from "@/components/ui/Checkbox";
import { FILTER_SIZES } from "@/config/staticData";


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

export default function FilterSidebar({ onClose, onApply, initialParams, categories: passedCategories }) {
  const categoriesList = passedCategories || [];

  const [catChecked, setCatChecked] = useState(() => {
    const checked = {};
    if (initialParams?.category) {
      initialParams.category.split(",").forEach((cat) => {
        checked[cat] = true;
      });
    }
    return checked;
  });
  const [sizeChecked, setSizeChecked] = useState(() => {
    const checked = {};
    if (initialParams?.size) {
      initialParams.size.split(",").forEach((sz) => {
        checked[sz] = true;
      });
    }
    return checked;
  });
  const [price, setPrice] = useState(() => {
    return initialParams?.maxPrice ? Number(initialParams.maxPrice) : 2000;
  });
  const [catOpen, setCatOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const toggle = (state, setState, id, val) => {
    setState((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => {

    const resetFilters = {
      categories: [],
      sizes: [],
      maxPrice: 2000,
    }

    setCatChecked({});
    setSizeChecked({});
    setPrice(2000);

    onApply?.(resetFilters);
    onClose?.();
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
    <div className="flex flex-col h-full bg-[#111111] w-full pt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <span></span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-amber-200 transition-colors border-x border-gray-200 rounded-full p-1 cursor-pointer"
          aria-label="Close filter"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 no-scrollbar">

        {/* Categories */}
        <div>
          <SectionHeader title="Categories" open={catOpen} onToggle={() => setCatOpen(!catOpen)} />
          <div className="border-t border-gray-800 mb-2" />
          {catOpen && (
            <div className="space-y-1 pb-4">
              {categoriesList.map((cat) => (
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
              {FILTER_SIZES.map((size) => (
                <Checkbox
                  key={size.id}
                  id={`size-${size?.id}`}
                  label={size?.label}
                  count={size?.count}
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
              <p className="text-sm text-gray-400 mb-4">Price: ₹0 - ₹{price.toLocaleString()}</p>
              <div className="relative w-full h-6 flex items-center">
                {/* Track */}
                <div className="absolute left-0 right-0 h-0.5 bg-gray-700 rounded-full pointer-events-none z-0">
                  <div
                    className="h-full bg-primary rounded-full absolute left-0"
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
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  aria-label="Price range"
                />
                {/* Left dot */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary pointer-events-none z-10" />
                {/* Right thumb dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary pointer-events-none z-10"
                  style={{ left: `calc(${(price / 2000) * 100}% - 6px)` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 py-5 border-t border-gray-800 flex gap-3 mb-4">
        <button
          onClick={handleReset}
          className="flex-1 py-3 border border-gray-600 text-white text-sm font-semibold tracking-wide hover:border-white transition-colors"
        >
          RESET
        </button>
        <button
          onClick={handleApply}
          className="flex-1 py-3 bg-primary hover:bg-secondary text-black text-sm font-semibold tracking-wide transition-colors"
        >
          APPLY FILTER
        </button>
      </div>
    </div>
  );
}
