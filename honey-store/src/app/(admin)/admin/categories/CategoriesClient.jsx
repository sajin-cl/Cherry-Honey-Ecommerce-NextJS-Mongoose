"use client";

import { useState } from "react";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import EditCategoryModal from "@/components/admin/EditCategoryModal";

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function CategoryRow({ category, onEdit, onDelete, deleting }) {
  return (
    <div className="flex items-center px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors group">
      <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 overflow-hidden flex-shrink-0 mr-4 flex items-center justify-center">
        <span className="text-lg">🍯</span>
      </div>

      {/* Name + description + slug (slug only shows on mobile, hidden on md+) */}
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-semibold text-gray-800 truncate">{category.name}</p>
        <p className="text-[12px] text-gray-400 truncate mt-0.5">{category.description || "No description"}</p>
        {/* Slug inline on mobile */}
        <p className="text-[11px] text-gray-400 font-mono truncate mt-0.5 md:hidden">{category.slug}</p>
      </div>

      {/* Slug column hidden on mobile */}
      <div className="w-36 text-[13.5px] text-gray-500 font-mono hidden md:block">{category.slug}</div>

      <div className="w-24 flex items-center justify-end gap-3">
        <button onClick={() => onEdit(category)} className="text-gray-400 hover:text-amber-500 transition-colors p-1 rounded-md hover:bg-amber-50" aria-label="Edit">
          <EditIcon />
        </button>
        <button onClick={() => onDelete(category.id)} disabled={deleting === category.id} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 disabled:opacity-40" aria-label="Delete">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default function CategoriesClient({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch]         = useState("");
  const [showAdd, setShowAdd]       = useState(false);
  const [editing, setEditing]       = useState(null);
  const [deleting, setDeleting]     = useState(null);

  const filtered = categories.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd({ title, description }) {
    const res  = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: title, description }),
    });
    const data = await res.json();
    if (res.ok) {
      setCategories((prev) => [{ id: data.category._id, name: data.category.name, slug: data.category.slug, description: data.category.description ?? "" }, ...prev]);
    }
  }

  async function handleEdit({ id, name, description }) {
    const res  = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name, description } : c)));
    }
  }

  async function handleDelete(id) {
    setDeleting(id);
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleting(null);
  }

  return (
    <>
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Category List</h1>
          <p className="text-[13px] text-gray-400 mt-1">{categories.length} categories total.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[13px] font-semibold rounded-xl shadow-sm transition-all w-full sm:w-auto"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Category
        </button>
      </div>

      {/* ── Search bar ── */}
      <div className="relative w-full sm:max-w-sm mb-5">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all shadow-sm"
        />
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="flex items-center px-5 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="flex-1 text-[11px] font-semibold text-gray-400 tracking-widest uppercase">Categories</div>
          {/* Slug header — hidden on mobile */}
          <div className="w-36 text-[11px] font-semibold text-gray-400 tracking-widest uppercase hidden md:block">Slug</div>
          <div className="w-24 text-right text-[11px] font-semibold text-gray-400 tracking-widest uppercase">Actions</div>
        </div>

        {filtered.length > 0
          ? filtered.map((cat) => (
              <CategoryRow key={cat.id} category={cat} onEdit={setEditing} onDelete={handleDelete} deleting={deleting} />
            ))
          : (
            <div className="py-12 text-center">
              <p className="text-[13px] text-gray-400">No categories found.</p>
            </div>
          )}
      </div>

      {showAdd   && <AddCategoryModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {editing   && <EditCategoryModal category={editing} onClose={() => setEditing(null)} onSave={handleEdit} />}
    </>
  );
}
