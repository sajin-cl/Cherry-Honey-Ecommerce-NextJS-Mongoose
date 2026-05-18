"use client";

import { useState } from "react";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import Image from "next/image";

/* ─── Placeholder data ─────────────────────────────────── */
const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Honey",
    description: "Choose from wide range of travel accessories from popular brands",
    totalProducts: "1,186",
    image: "/category-honey.png",
  },
  {
    id: 2,
    name: "Kashmir Honey",
    description: "Choose from wide range of smartphones from popular brands",
    totalProducts: "2,344",
    image: "/category-honey.png",
  },
  {
    id: 3,
    name: "Honey",
    description: "Choose from wide range of home decor from popular brands",
    totalProducts: "4,378",
    image: "/category-honey.png",
  },
  {
    id: 4,
    name: "Honey",
    description: "Dive into world of Virtual Reality with latest games",
    totalProducts: "1,982",
    image: "/category-honey.png",
  },
];

/* ─── Search Icon ──────────────────────────────────────── */
function SearchIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ─── Edit Icon ────────────────────────────────────────── */
function EditIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

/* ─── Delete Icon ──────────────────────────────────────── */
function DeleteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

/* ─── Category Row ─────────────────────────────────────── */
function CategoryRow({ category, onDelete }) {
  return (
    <div className="flex items-center px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors group">
      {/* Thumbnail */}
      <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 overflow-hidden flex-shrink-0 mr-4 flex items-center justify-center">
        <span className="text-lg">🍯</span>
      </div>

      {/* Name + desc */}
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-semibold text-gray-800 truncate">{category.name}</p>
        <p className="text-[12px] text-gray-400 truncate mt-0.5">{category.description}</p>
      </div>

      {/* Total products */}
      <div className="w-36 text-[13.5px] text-gray-700 font-medium">{category.totalProducts}</div>

      {/* Actions */}
      <div className="w-24 flex items-center justify-end gap-3">
        <button
          className="text-gray-400 hover:text-amber-500 transition-colors p-1 rounded-md hover:bg-amber-50"
          aria-label="Edit category"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
          aria-label="Delete category"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────── */
export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd({ title, description }) {
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: title,
        description: description || "No description provided",
        totalProducts: "0",
        image: "/category-honey.png",
      },
    ]);
  }

  function handleDelete(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <>
      {/* Page header row */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Category List</h1>
          <p className="text-[13px] text-gray-400 mt-1">Track orders list across your store.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[13px] font-semibold rounded-xl shadow-sm transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm mb-5">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all shadow-sm"
        />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="flex items-center px-5 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="flex-1 text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
            Categories
          </div>
          <div className="w-36 text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
            Total Product
          </div>
          <div className="w-24 text-right text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
            Actions
          </div>
        </div>

        {/* Rows */}
        {filtered.length > 0 ? (
          filtered.map((cat) => (
            <CategoryRow key={cat.id} category={cat} onDelete={handleDelete} />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-[13px] text-gray-400">No categories found.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddCategoryModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </>
  );
}
