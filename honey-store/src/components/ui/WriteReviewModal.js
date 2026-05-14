"use client";

import { useState } from "react";

const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
};

/* ── Clickable star picker ── */
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(null)}
          className="focus:outline-none transition-transform hover:scale-110"
          aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
        >
          <svg
            className={`w-9 h-9 transition-colors duration-150 ${
              s <= (hovered ?? value) ? "text-white" : "text-gray-600"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════
   WriteReviewModal
   Props:
     isOpen   — boolean
     onClose  — () => void
     onSubmit — (review: { name, email, rating, text, date }) => void
════════════════════════════════════════════════ */
export default function WriteReviewModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", rating: 0, text: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) {
      setError("Please enter a valid email address."); return;
    }
    if (form.rating === 0) { setError("Please select a star rating."); return; }
    if (!form.text.trim()) { setError("Please write your review."); return; }

    const dateStr = new Date().toLocaleDateString("en-IN", {
      year: "numeric", month: "long", day: "numeric",
    });

    onSubmit?.({
      name: form.name.trim(),
      email: form.email.trim(),
      rating: form.rating,
      text: form.text.trim(),
      date: dateStr,
      avatar: form.name.trim()[0].toUpperCase(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", rating: 0, text: "" });
      setError("");
      onClose();
    }, 1800);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[#0d0d0d] w-full max-w-lg shadow-[0_0_80px_rgba(200,168,75,0.15)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          {submitted ? (
            /* ── Success screen ── */
            <div className="px-8 py-16 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold text-xl" style={serifItalic}>
                Thank you!
              </p>
              <p className="text-gray-400 text-sm text-center">
                Your review has been submitted successfully.
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate>
              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-5">
                <h2
                  id="review-modal-title"
                  className="text-white text-2xl"
                  style={serifItalic}
                >
                  Write A Review
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
                  aria-label="Close review form"
                >
                  ×
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-800" />

              <div className="px-8 pt-6 pb-0 space-y-5">
                {/* Stars */}
                <StarPicker
                  value={form.rating}
                  onChange={(r) => setForm((f) => ({ ...f, rating: r }))}
                />

                {/* Name */}
                <div>
                  <label className="block text-gray-300 text-sm mb-1.5" htmlFor="review-name">
                    Name
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Alexa Johnson"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-gray-500 text-white text-sm px-4 py-3 outline-none transition-colors placeholder-gray-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-300 text-sm mb-1.5" htmlFor="review-email">
                    Email Address
                  </label>
                  <input
                    id="review-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="alexa.johnson@example.com"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-gray-500 text-white text-sm px-4 py-3 outline-none transition-colors placeholder-gray-600"
                  />
                </div>

                {/* Review textarea + char counter */}
                <div>
                  <textarea
                    id="review-text"
                    rows={5}
                    maxLength={100}
                    value={form.text}
                    onChange={update("text")}
                    placeholder="Enter Your Review"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-gray-500 text-white text-sm px-4 py-3 outline-none transition-colors placeholder-gray-600 resize-y"
                  />
                  <div className="text-right text-gray-500 text-xs -mt-1">
                    {form.text.length}/100
                  </div>
                </div>

                {/* Error */}
                {error && <p className="text-red-400 text-xs -mt-2">{error}</p>}
              </div>

              {/* Full-width SUBMIT button */}
              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full bg-[#C8A84B] hover:bg-[#b8973e] text-white font-semibold text-sm tracking-[0.2em] uppercase py-5 transition-colors duration-200"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
