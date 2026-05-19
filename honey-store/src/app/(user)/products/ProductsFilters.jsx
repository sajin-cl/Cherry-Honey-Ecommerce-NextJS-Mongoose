"use client";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Thin client component — only handles the filter drawer.
 * Updates URL searchParams → triggers server re-render of parent page.
 */
export default function ProductsFilters({ searchParams }) {
  const router = useRouter();

  function applyFilter(e) {
    e.preventDefault();
    const form   = e.currentTarget;
    const params = new URLSearchParams(searchParams);
    const max    = form.maxPrice.value;
    const search = form.search.value;
    if (max)    params.set("maxPrice", max);   else params.delete("maxPrice");
    if (search) params.set("search", search);  else params.delete("search");
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  }

  return (
    <form onSubmit={applyFilter} className="flex items-center gap-2">
      <input
        name="search"
        defaultValue={searchParams?.search || ""}
        placeholder="Search..."
        className="bg-[#111] border border-gray-700 text-white text-xs px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-[#C8A84B]"
      />
      <input
        name="maxPrice"
        type="number"
        defaultValue={searchParams?.maxPrice || ""}
        placeholder="Max price ₹"
        className="bg-[#111] border border-gray-700 text-white text-xs px-3 py-2 w-28 placeholder-gray-500 focus:outline-none focus:border-[#C8A84B]"
      />
      <button type="submit" className="flex items-center gap-2 bg-[#C8A84B] hover:bg-[#b8973e] text-black text-xs font-semibold px-5 py-2.5 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
        </svg>
        FILTER
      </button>
    </form>
  );
}
