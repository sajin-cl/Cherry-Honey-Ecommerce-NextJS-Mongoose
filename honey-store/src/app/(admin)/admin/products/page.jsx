"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductModal from "@/components/admin/ProductModal";

/* ── sample data ─────────────────────────────────────── */
const INITIAL_PRODUCTS = [
  { id: 1, name: "Honey", description: "Ready to hit the streets with sophistication.", category: "Honey", price: 124, discountPrice: 100, stock: 32, image: null },
  { id: 2, name: "Honey", description: "The best-selling Nike polo just got better.", category: "Honey", price: 60, discountPrice: 50, stock: 31, image: null },
  { id: 3, name: "Honey", description: "A modern shoe built on the Air Jordan legacy.", category: "Honey", price: 124, discountPrice: 100, stock: 21, image: null },
  { id: 4, name: "Honey", description: "iPhone 13 Pro Max, 128GB", category: "Black Honey", price: 124, discountPrice: 110, stock: 121, image: null },
  { id: 5, name: "Honey", description: "New advancements for upgraded performance", category: "Kashmir Honey", price: 124, discountPrice: 100, stock: 133, image: null },
  { id: 6, name: "Honey", description: "An immersive 24-inch 4.5K Retina display", category: "Honey", price: 124, discountPrice: 100, stock: 233, image: null },
  { id: 7, name: "Honey", description: "M2 Max takes power and speed to the next level", category: "Honey", price: 2500, discountPrice: 2200, stock: 120, image: null },
  { id: 8, name: "Honey", description: "Harvested from wildflower meadows in the highlands.", category: "Wild Honey", price: 89, discountPrice: 75, stock: 88, image: null },
  { id: 9, name: "Honey", description: "Premium royal jelly infused honey blend.", category: "Organic Honey", price: 199, discountPrice: 175, stock: 45, image: null },
  { id: 10, name: "Honey", description: "Rare Sidr honey sourced from ancient forests.", category: "Kashmir Honey", price: 350, discountPrice: 300, stock: 27, image: null },
];

const STATUSES = ["All Status", "In Stock", "Low Stock", "Out of Stock"];
const CATEGORIES = ["All Category", "Honey", "Black Honey", "Kashmir Honey", "Wild Honey", "Organic Honey"];
const PAGE_SIZE = 7;

/* ── icons ───────────────────────────────────────────── */
function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function DeleteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function DotsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}
function ChevronIcon({ dir = "down" }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: dir === "left" ? "rotate(90deg)" : dir === "right" ? "rotate(-90deg)" : "none" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── stock badge ─────────────────────────────────────── */
function StockBadge({ stock }) {
  if (stock === 0) return <span className="text-red-500 text-[13px] font-medium">{stock}</span>;
  if (stock < 30) return <span className="text-amber-500 text-[13px] font-medium">{stock}</span>;
  return <span className="text-gray-700 text-[13px] font-medium">{stock}</span>;
}

/* ── main page ───────────────────────────────────────── */
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("All Status");
  const [catFilter, setCat] = useState("All Category");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  async function loadData() {
    try {
      setLoading(true);
      const [resProducts, resCategories] = await Promise.all([
        fetch("/api/products?limit=100"),
        fetch("/api/categories")
      ]);
      const dataProducts = await resProducts.json();
      const dataCategories = await resCategories.json();

      if (resProducts.ok) {
        setProducts(dataProducts.products || []);
      }
      if (resCategories.ok) {
        setDbCategories(dataCategories.categories || []);
      }
    } catch (err) {
      console.error("Error loading products/categories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  /* filtering */
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All Category" || p.category === catFilter;
    const matchStatus =
      statusFilter === "All Status" ? true :
        statusFilter === "In Stock" ? p.stock > 30 :
          statusFilter === "Low Stock" ? p.stock > 0 && p.stock <= 30 :
            p.stock === 0;
    return matchSearch && matchCat && matchStatus;
  });

  /* pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function pageNumbers() {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) pages.push(i);
    return pages;
  }

  /* handlers */
  async function handleAdd(data) {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to add product");
    }
    loadData();
  }

  async function handleEdit(data) {
    const res = await fetch(`/api/products/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update product");
    }
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        loadData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  }

  return (
    <>
      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Products</h1>
          <p className="text-[13px] text-gray-400 mt-1">Monitor your store's products to increase your sales.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[13px] font-semibold rounded-xl shadow-sm transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </button>
      </div>

      {/* ── Filters row ── */}
      <div className="flex items-center gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all shadow-sm"
          />
        </div>

        <div className="flex-1" />

        {/* Status dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all shadow-sm cursor-pointer"
          >
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"><ChevronIcon /></span>
        </div>

        {/* Category dropdown */}
        <div className="relative">
          <select
            value={catFilter}
            onChange={(e) => { setCat(e.target.value); setPage(1); }}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all shadow-sm cursor-pointer"
          >
            <option value="All Category">All Category</option>
            {dbCategories.map((c) => (
              <option key={c._id || c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"><ChevronIcon /></span>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        {/* header row */}
        <div className="grid grid-cols-[1fr_140px_90px_80px_110px] px-5 py-3 border-b border-gray-100 bg-gray-50/80">
          {["PRODUCT", "CATEGORY", "PRICE", "STOCK", "ACTIONS"].map((h) => (
            <div key={h} className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">{h}</div>
          ))}
        </div>

        {/* rows */}
        {/* rows */}
        {loading ? (
          <div className="py-24 text-center text-[13px] text-gray-400">Loading products...</div>
        ) : pageItems.length > 0 ? pageItems.map((p) => {
          const currentId = p._id || p.id;
          return (
            <div
              key={currentId}
              className="grid grid-cols-[1fr_140px_90px_80px_110px] px-5 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors items-center"
            >
              {/* Product */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                  {p.image?.url ? (
                    (() => {
                      let url = p.image.url;
                      if (!url.startsWith("http") && !url.startsWith("blob:") && !url.startsWith("data:") && !url.startsWith("/")) {
                        url = `/${url}`;
                      }
                      /* eslint-disable-next-line @next/next/no-img-element */
                      return <img src={url} alt={p.name} className="w-full h-full object-cover" />;
                    })()
                  ) : (
                    <span className="text-lg">🍯</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-gray-800 truncate">{p.name}</p>
                  <p className="text-[12px] text-gray-400 truncate">{p.description}</p>
                </div>
              </div>

              {/* Category */}
              <div>
                <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[12px] font-medium">
                  {p.category}
                </span>
              </div>

              {/* Price */}
              <div className="text-[13.5px] font-medium text-gray-700">
                ₹{p.price.toLocaleString()}
              </div>

              {/* Stock */}
              <div>
                <StockBadge stock={p.stock} />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditProduct(p)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-all"
                  aria-label="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(currentId)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </button>
                <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="More">
                  <DotsIcon />
                </button>
              </div>
            </div>
          );
        }) : (
          <div className="py-14 text-center text-[13px] text-gray-400">No products found.</div>
        )}
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between px-1">
        {/* Prev */}
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-transparent hover:border-gray-200"
        >
          <ChevronIcon dir="left" /> Previous
        </button>

        {/* page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers().map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-all ${n === currentPage
                ? "bg-amber-500 text-white shadow-sm"
                : "text-gray-500 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200"
                }`}
            >
              {n}
            </button>
          ))}
          {totalPages > 5 && <span className="text-gray-400 px-1">...</span>}
          {totalPages > 5 && (
            <button
              onClick={() => setPage(totalPages)}
              className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-all ${currentPage === totalPages
                ? "bg-amber-500 text-white"
                : "text-gray-500 hover:bg-white hover:shadow-sm"
                }`}
            >
              {totalPages}
            </button>
          )}
        </div>

        {/* Next + count */}
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-gray-400">
            Displaying {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-transparent hover:border-gray-200"
          >
            Next <ChevronIcon dir="right" />
          </button>
        </div>
      </div>

      {/* ── Modals ── */}
      {showAdd && (
        <ProductModal
          mode="add"
          categories={dbCategories}
          onClose={() => setShowAdd(false)}
          onSave={handleAdd}
        />
      )}
      {editProduct && (
        <ProductModal
          mode="edit"
          product={editProduct}
          categories={dbCategories}
          onClose={() => setEditProduct(null)}
          onSave={handleEdit}
        />
      )}
    </>
  );
}
