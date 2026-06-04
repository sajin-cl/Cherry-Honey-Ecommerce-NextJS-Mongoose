"use client";

import { useState } from "react";

const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

const EMPTY_FORM = { name: "", line1: "", phone: "", tag: "HOME" };

/**
 * AddressModal
 * Props:
 *  - isOpen   {boolean}  — controls visibility
 *  - onClose  {function} — called when modal should close
 *  - onSave   {function(normalizedAddresses)} — called after a successful save
 */
export default function AddressModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.line1.trim() || !form.phone.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.addresses) {
        const normalized = data.addresses.map((addr) => ({
          id: addr?._id,
          name: addr?.name,
          tag: addr?.tag,
          line1: addr?.line1,
          phone: addr?.phone,
          isDefault: addr?.isDefault,
        }));
        onSave(normalized);
        setForm(EMPTY_FORM);
        onClose();
      } else {
        alert( "Failed to save address");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-4 bg-[#111] border border-gray-700 shadow-2xl animate-fadeIn">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-white font-semibold text-base" style={serif}>
            Add New Address
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={field("name")}
              placeholder="e.g. Alexa Johnson"
              className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-primary text-white text-sm px-4 py-2.5 outline-none transition-colors placeholder-gray-600"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Address Details</label>
            <input
              type="text"
              required
              value={form.line1}
              onChange={field("line1")}
              placeholder="Street, City, State PIN"
              className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-primary text-white text-sm px-4 py-2.5 outline-none transition-colors placeholder-gray-600"
            />
          </div>

          {/* Phone + Tag */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Phone (10 digits)</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={form.phone}
                onChange={field("phone")}
                placeholder="9876543210"
                className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-primary text-white text-sm px-4 py-2.5 outline-none transition-colors placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Tag</label>
              <select
                value={form.tag}
                onChange={field("tag")}
                className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-primary text-white text-sm px-4 py-2.5 outline-none transition-colors"
              >
                <option value="HOME">HOME</option>
                <option value="WORK">WORK</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>

          {/* ── Footer Buttons ── */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 border border-gray-700 text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-primary hover:bg-secondary disabled:opacity-50 text-black font-semibold text-sm transition-colors"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
