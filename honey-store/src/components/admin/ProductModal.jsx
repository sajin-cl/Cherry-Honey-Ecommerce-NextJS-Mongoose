"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const CATEGORIES = ["Honey", "Black Honey", "Kashmir Honey", "Wild Honey", "Organic Honey"];

/* ── tiny helpers ─────────────────────────────────────── */
function Label({ children }) {
  return <p className="text-[12px] text-gray-500 mb-1.5">{children}</p>;
}
function Field({ children }) {
  return <div className="mb-4">{children}</div>;
}
function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-gray-800 bg-[#fdf8f0] focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all placeholder-gray-300"
    />
  );
}
function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-gray-800 bg-[#fdf8f0] focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all resize-none placeholder-gray-300"
    />
  );
}

/* ── image upload slot ────────────────────────────────── */
function ImageSlot({ preview, onFile, main = false }) {
  const inputRef = useRef();

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed border-amber-200 rounded-xl bg-[#fdf8f0] flex items-center justify-center cursor-pointer hover:border-amber-400 transition-all overflow-hidden ${main ? "w-full h-44" : "flex-1 h-24"
        }`}
    >
      {preview ? (
        <Image src={preview} alt="preview" fill className="object-cover rounded-xl" />
      ) : (
        <div className="flex flex-col items-center gap-1.5 text-gray-400 select-none">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
            <circle cx="16" cy="6" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-[11px] text-center leading-tight">Drag and drop or<br />browse</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
    </div>
  );
}

/* ── main modal ───────────────────────────────────────── */
export default function ProductModal({ mode = "add", product = null, onClose, onSave }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    discountPrice: product?.discountPrice || "",
    stock: product?.stock || "",
    category: product?.category || CATEGORIES[0],
  });

  const [mainImage, setMainImage] = useState(product?.image || null);
  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  function fileToUrl(file, setter) {
    const url = URL.createObjectURL(file);
    setter(url);
  }

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function closeWithAnimation(cb) {
    setVisible(false);
    setTimeout(() => { cb?.(); onClose(); }, 250);
  }

  function handleSave() {
    if (!form.name.trim()) return;
    onSave?.({ ...form, image: mainImage, id: product?.id ?? Date.now() });
    closeWithAnimation();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-250"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={() => closeWithAnimation()}
      />

      {/* Modal card */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col transition-all duration-250"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1) translateY(0)" : "scale(0.97) translateY(12px)" }}
      >
        {/* ── Modal header ── */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-[16px] font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={() => closeWithAnimation()}
            className="text-gray-400 hover:text-gray-700 rounded-lg p-1.5 hover:bg-gray-100 transition-all"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {/* back + title */}
          <button
            onClick={() => closeWithAnimation()}
            className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-[12px] font-medium mb-2 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            BACK TO LIST
          </button>
          <h3 className="text-[22px] font-bold text-gray-900 leading-tight">
            {isEdit ? "Edit Product" : "Add Product"}
          </h3>
          <p className="text-[13px] text-gray-400 mt-0.5 mb-6">Orders placed across your store.</p>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            {/* ── LEFT column ── */}
            <div>
              {/* General Information */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <h4 className="text-[13.5px] font-semibold text-gray-800">General Information</h4>
                </div>

                <Field>
                  <Label>Product Name</Label>
                  <Input value={form.name} onChange={set("name")} placeholder="e.g. Pure Blossom Honey" />
                </Field>

                <Field>
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={set("description")} rows={5} placeholder="Write a short description..." />
                </Field>
              </div>

              {/* Pricing + Inventory side by side */}
              <div className="grid grid-cols-2 gap-6">
                {/* Pricing */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <h4 className="text-[13.5px] font-semibold text-gray-800">Pricing</h4>
                  </div>
                  <Field>
                    <Label>Price</Label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">$</span>
                      <input
                        type="number"
                        value={form.price}
                        onChange={set("price")}
                        placeholder="0"
                        className="w-full border border-gray-200 rounded-lg pl-7 pr-3.5 py-2.5 text-[13.5px] text-gray-800 bg-[#fdf8f0] focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
                      />
                    </div>
                  </Field>
                  <Field>
                    <Label>Discount Price</Label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">$</span>
                      <input
                        type="number"
                        value={form.discountPrice}
                        onChange={set("discountPrice")}
                        placeholder="0"
                        className="w-full border border-gray-200 rounded-lg pl-7 pr-3.5 py-2.5 text-[13.5px] text-gray-800 bg-[#fdf8f0] focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
                      />
                    </div>
                  </Field>
                </div>

                {/* Inventory */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <h4 className="text-[13.5px] font-semibold text-gray-800">Inventory</h4>
                  </div>
                  <Field>
                    <Label>Stock Quantity</Label>
                    <input
                      type="number"
                      value={form.stock}
                      onChange={set("stock")}
                      placeholder="0"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-gray-800 bg-[#fdf8f0] focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* ── RIGHT column ── */}
            <div className="flex flex-col gap-6">
              {/* Product Photos */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                  </svg>
                  <h4 className="text-[13.5px] font-semibold text-gray-800">Product Photos</h4>
                </div>

                {/* Main image */}
                <div className="mb-2">
                  <ImageSlot
                    main
                    preview={mainImage}
                    onFile={(f) => fileToUrl(f, setMainImage)}
                  />
                </div>

                {/* Two small slots */}
                <div className="flex gap-2">
                  <ImageSlot preview={slot1} onFile={(f) => fileToUrl(f, setSlot1)} />
                  <ImageSlot preview={slot2} onFile={(f) => fileToUrl(f, setSlot2)} />
                </div>
              </div>

              {/* Organization */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <h4 className="text-[13.5px] font-semibold text-gray-800">Organization</h4>
                </div>
                <Label>Category</Label>
                <select
                  value={form.category}
                  onChange={set("category")}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-gray-800 bg-[#fdf8f0] focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={() => closeWithAnimation()}
            className="px-6 py-2.5 text-[13px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.name.trim()}
            className="px-7 py-2.5 text-[13px] font-semibold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm"
          >
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
