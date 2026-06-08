"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductsFilters from "@/components/user/products/ProductsFilters";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/components/user/products/ProductCard";
import { containerVariants } from "@/animation/globalVariants";


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
      {/* Background honeycomb overlay */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <Image
          src="/honey-comb.webp"
          fill
          className="object-cover animate-pulse"
          alt=""
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
          <Link href="/" className="hover:text-primary transition-colors">
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
          <p className="text-sm text-gray-400 hidden md:block">
            Showing {from}–{to} of {total} results
          </p>
          <ProductsFilters
            searchParams={resolvedParams}
            categories={categoriesList}
          />
        </motion.div>

        {/* Grid */}
        {products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
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
              className="text-primary text-sm underline"
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
