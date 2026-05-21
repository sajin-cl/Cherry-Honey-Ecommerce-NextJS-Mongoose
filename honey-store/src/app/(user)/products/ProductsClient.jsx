"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductsFilters from "./ProductsFilters";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ProductCard({ product }) {
  const price = product.discountPrice ?? product.price;
  const original = product.price;
  const img = product.image?.url || "/hero-honey-jar.webp";

  return (
    <motion.div variants={itemVariants}>
      <Link href={`/products/${product._id}`} className="group block">
        <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/50 transition-all duration-300 group-hover:-translate-y-1">
          <div className="relative h-52 bg-black overflow-hidden">
            <Image
              src={img}
              alt={product.name}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="text-white text-sm mb-1 truncate transition-colors group-hover:text-[#C8A84B]">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[#C8A84B] text-sm font-semibold">
                ₹{price.toFixed(2)}
              </span>
              {product.discountPrice && (
                <span className="text-gray-500 text-xs line-through">
                  ₹{original.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Pagination({ page, totalPages, searchParams }) {
  function buildUrl(p) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    return `/products?${params.toString()}`;
  }
  if (totalPages <= 1) return null;

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-14"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {page > 1 && (
        <Link
          href={buildUrl(page - 1)}
          className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors tracking-widest"
        >
          PREV
        </Link>
      )}
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
        (p) => (
          <Link
            key={p}
            href={buildUrl(p)}
            className={`w-9 h-9 flex items-center justify-center text-xs border transition-colors ${
              p === page
                ? "bg-[#C8A84B] border-[#C8A84B] text-black font-bold"
                : "border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B]"
            }`}
          >
            {p < 10 ? `0${p}` : p}
          </Link>
        )
      )}
      {page < totalPages && (
        <Link
          href={buildUrl(page + 1)}
          className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors tracking-widest"
        >
          NEXT
        </Link>
      )}
    </motion.div>
  );
}

export default function ProductsClient({
  products,
  total,
  totalPages,
  page,
  from,
  to,
  categoriesList,
  resolvedParams,
}) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background honeycomb overlay matching About page */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/honey-comb.png"
          fill
          className="object-cover"
          alt="honeycomb pattern"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 relative z-10">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 text-xs text-gray-500 mb-4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-300">Our Products</span>
        </motion.div>

        {/* Top bar */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <p className="text-sm text-gray-400">
            Showing {from}–{to} of {total} results
          </p>
          {/* Filter drawer — client component */}
          <ProductsFilters
            searchParams={resolvedParams}
            categories={categoriesList}
          />
        </motion.div>

        {/* Grid */}
        {products.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {products.map((p) => (
              <ProductCard key={p._id.toString()} product={p} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-500 text-sm mb-4">No products found.</p>
            <Link
              href="/products"
              className="text-[#C8A84B] text-sm underline"
            >
              Clear filters
            </Link>
          </motion.div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          searchParams={resolvedParams}
        />
      </div>
    </div>
  );
}
