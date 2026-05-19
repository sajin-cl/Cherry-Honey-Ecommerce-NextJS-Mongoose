/**
 * SSR Products Page — data fetched from DB via searchParams.
 * Pagination and filters change the URL → triggers a server re-render.
 */
import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import ProductsFilters from "./ProductsFilters";

export const metadata = { title: "Our Products | Cherry Honey" };

const PER_PAGE = 12;

async function fetchProducts({ page, maxPrice, search, category }) {
  await dbConnect();
  const query = {};
  if (category) query.category = category;
  if (search)   query.name = { $regex: search, $options: "i" };
  if (maxPrice) query.price = { $lte: Number(maxPrice) };

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PER_PAGE)
      .limit(PER_PAGE)
      .lean(),
    Product.countDocuments(query),
  ]);

  return { products, total, totalPages: Math.ceil(total / PER_PAGE) };
}

function ProductCard({ product }) {
  const price    = product.discountPrice ?? product.price;
  const original = product.price;
  const img      = product.image?.url || "/hero-honey-jar.png";

  return (
    <Link href={`/products/${product._id}`} className="group block">
      <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/40 transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative h-52 bg-black">
          <Image src={img} alt={product.name} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-contain p-4" />
        </div>
        <div className="p-4">
          <h3 className="text-white text-sm mb-1 truncate">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-[#C8A84B] text-sm font-semibold">₹{price.toFixed(2)}</span>
            {product.discountPrice && (
              <span className="text-gray-500 text-xs line-through">₹{original.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
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
    <div className="flex items-center justify-center gap-2 mt-14">
      {page > 1 && (
        <Link href={buildUrl(page - 1)} className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors tracking-widest">
          PREV
        </Link>
      )}
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
        <Link key={p} href={buildUrl(p)} className={`w-9 h-9 flex items-center justify-center text-xs border transition-colors ${p === page ? "bg-[#C8A84B] border-[#C8A84B] text-black font-bold" : "border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B]"}`}>
          {p < 10 ? `0${p}` : p}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={buildUrl(page + 1)} className="px-4 py-2 text-xs border border-gray-700 text-gray-400 hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors tracking-widest">
          NEXT
        </Link>
      )}
    </div>
  );
}

export default async function ProductsPage({ searchParams }) {
  const page     = Math.max(1, parseInt(searchParams?.page    || "1"));
  const maxPrice = searchParams?.maxPrice || "";
  const search   = searchParams?.search   || "";
  const category = searchParams?.category || "";

  const { products, total, totalPages } = await fetchProducts({ page, maxPrice, search, category });

  const from = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const to   = Math.min(page * PER_PAGE, total);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">Our Products</span>
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-400">
            Showing {from}–{to} of {total} results
          </p>
          {/* Filter drawer — client component */}
          <ProductsFilters searchParams={searchParams} />
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p._id.toString()} product={p} />)}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-gray-500 text-sm mb-4">No products found.</p>
            <Link href="/products" className="text-[#C8A84B] text-sm underline">Clear filters</Link>
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} searchParams={searchParams} />
      </div>
    </div>
  );
}
