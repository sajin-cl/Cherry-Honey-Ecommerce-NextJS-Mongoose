"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterSidebar from "@/components/products/FilterSidebar";

/**
 * Filter bar component.
 * Displays search bar + a dynamic trigger button to open the slide-out FilterSidebar.
 * Updates URL searchParams to trigger server-side (SSR) updates.
 */
export default function ProductsFilters({ searchParams, categories }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams?.search || "");

  // Search input trigger
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  // Callback when FilterSidebar applies options
  const handleApplyFilters = (filters) => {
    const params = new URLSearchParams(searchParams);

    // Categories
    if (filters.categories && filters.categories.length > 0) {
      params.set("category", filters.categories.join(","));
    } else {
      params.delete("category");
    }

    // Sizes
    if (filters.sizes && filters.sizes.length > 0) {
      params.set("size", filters.sizes.join(","));
    } else {
      params.delete("size");
    }

    // Max Price
    if (filters.maxPrice && filters.maxPrice < 2000) {
      params.set("maxPrice", filters.maxPrice);
    } else {
      params.delete("maxPrice");
    }

    // Reset to page 1
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            className="bg-[#111] border border-gray-800 hover:border-gray-700 text-white text-xs px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:border-primary transition-all w-48 sm:w-64"
          />
          <button
            type="submit"
            className="bg-gray-900 border border-l-0 border-gray-800 text-gray-400 hover:text-white px-3 py-2.5 transition-colors text-xs font-semibold"
          >
            Go
          </button>
        </form>

        {/* Filter Drawer Toggle Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-secondary text-black text-xs font-bold px-5 py-2.5 transition-all uppercase tracking-wider"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
          </svg>
          <span className="hidden md:block">Filter</span>
        </button>
      </div>

      {/* ── Slide-out Drawer ── */}
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Sidebar Container */}
      <div
        className={`fixed right-0 top-8 h-full w-full max-w-sm bg-[#111] z-50 border-l border-gray-800 shadow-2xl transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <FilterSidebar
          key={`${isOpen}-${JSON.stringify(searchParams || {})}`}
          initialParams={searchParams}
          categories={categories}
          onClose={() => setIsOpen(false)}
          onApply={handleApplyFilters}
        />
      </div>
    </>
  );
};
