"use client";

import { useState, useEffect } from "react";

export default function AddCategoryModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);

  /* trigger slide-in after mount */
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  function closeWithAnimation(cb) {
    setVisible(false);
    setTimeout(() => {
      cb?.();
      onClose();
    }, 300);
  }

  function handleAdd() {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim() });
    closeWithAnimation();
  }

  function handleDiscard() {
    closeWithAnimation();
  }

  return (
    /* Full-screen container */
    <div className="fixed inset-0 z-50 flex">
      {/* Dimmed overlay — clicking closes the panel */}
      <div
        className="flex-1 transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.18)", opacity: visible ? 1 : 0 }}
        onClick={() => closeWithAnimation()}
      />

      {/* Slide-in panel */}
      <div
        className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-gray-100">
          <h2 className="text-[18px] font-semibold text-gray-900">Add Category</h2>
          <button
            onClick={() => closeWithAnimation()}
            className="text-gray-400 hover:text-gray-700 transition-colors rounded-lg p-1.5 hover:bg-gray-100"
            aria-label="Close panel"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-[12px] text-gray-500 mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] text-gray-500 mb-1.5">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder=""
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all resize-none bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-7 py-5 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={handleDiscard}
            className="px-5 py-2.5 text-[13px] font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            Discard
          </button>
          <button
            onClick={handleAdd}
            disabled={!title.trim()}
            className="px-6 py-2.5 text-[13px] font-semibold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}
