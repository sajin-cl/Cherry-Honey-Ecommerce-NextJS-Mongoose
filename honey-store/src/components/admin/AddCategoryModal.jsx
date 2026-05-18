"use client";

import { useState } from "react";

export default function AddCategoryModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd() {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
    onClose();
  }

  function handleDiscard() {
    setTitle("");
    setDescription("");
    onClose();
  }

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[17px] font-semibold text-gray-900">Add Category</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors rounded-md p-1 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Title field */}
        <div className="mb-4">
          <label className="block text-[12px] text-gray-500 mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13.5px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
          />
        </div>

        {/* Description field */}
        <div className="mb-7">
          <label className="block text-[12px] text-gray-500 mb-1.5">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder=""
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13.5px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleDiscard}
            className="px-4 py-2 text-[13px] font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            Discard
          </button>
          <button
            onClick={handleAdd}
            disabled={!title.trim()}
            className="px-5 py-2 text-[13px] font-semibold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}
