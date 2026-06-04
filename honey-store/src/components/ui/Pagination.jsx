import { motion } from "framer-motion";
import Link from "next/link";


export default function Pagination({ page, totalPages, searchParams }) {
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
          className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-primary hover:text-primary transition-colors tracking-widest active:scale-95"
        >
          PREV
        </Link>
      )}
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
        (p) => (
          <Link
            key={p}
            href={buildUrl(p)}
            className={`w-9 h-9 flex items-center justify-center text-xs border transition-colors ${p === page
              ? "bg-primary border-primary text-black font-bold"
              : "border-gray-700 text-gray-400 hover:border-primary hover:text-primary active:scale-95"
              }`}
          >
            {p < 10 ? `0${p}` : p}
          </Link>
        )
      )}
      {page < totalPages && (
        <Link
          href={buildUrl(page + 1)}
          className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-primary hover:text-primary transition-colors tracking-widest active:scale-95"
        >
          NEXT
        </Link>
      )}
    </motion.div>
  );
}