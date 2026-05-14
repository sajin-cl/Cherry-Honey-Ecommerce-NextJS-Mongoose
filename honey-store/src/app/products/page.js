"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import FilterSidebar from "@/components/ui/FilterSidebar";

/* ── Mock product data ── */
const ALL_PRODUCTS = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: "Honey",
  image: i % 2 === 0 ? "/hero-honey-jar.png" : "/honey-jar-bees.png",
  price: [145, 130, 80, 100, 95, 110, 120, 90][i % 8],
  original: [160, 140, 90, 120, 115, 130, 140, 105][i % 8],
}));

const PER_PAGE = 10;

export default function ProductsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ categories: [], sizes: [], maxPrice: 2000 });

  /* Apply filters */
  const filtered = ALL_PRODUCTS.filter((p) => p.price <= filters.maxPrice);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">Our Products</span>
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {/* Grid icon */}
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} results
          </div>

          {/* Filter button */}
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 bg-[#C8A84B] hover:bg-[#b8973e] text-black text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            FILTER
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayed.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block">
              <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/40 transition-all duration-300 group-hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-52 bg-black">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-4"
                  />
                </div>
                {/* Info */}
                <div className="p-4">
                  <h3 className="text-white text-sm mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C8A84B] text-sm font-semibold">${product.price.toFixed(2)}</span>
                    <span className="text-gray-500 text-xs line-through">${product.original.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B] disabled:opacity-30 disabled:cursor-not-allowed transition-colors tracking-widest"
            >
              PREV
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 text-xs border transition-colors ${
                    page === p
                      ? "bg-[#C8A84B] border-[#C8A84B] text-black font-bold"
                      : "border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B]"
                  }`}
                >
                  {p < 10 ? `0${p}` : p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B] disabled:opacity-30 disabled:cursor-not-allowed transition-colors tracking-widest"
            >
              NEXT
            </button>
          </div>
        )}
      </div>

      {/* Filter Drawer Overlay */}
      {filterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setFilterOpen(false)}
          />
          {/* Sidebar panel slides in from right */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm z-50 shadow-2xl">
            <FilterSidebar
              onClose={() => setFilterOpen(false)}
              onApply={handleApplyFilter}
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
