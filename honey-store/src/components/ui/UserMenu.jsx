"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * UserMenu
 * Dropdown popup shown when the avatar icon is clicked.
 *
 * Props:
 *   onClose  — () => void   close the menu
 *   onLogout — () => void   handle logout action
 */
export default function UserMenu({ onClose, onLogout }) {
  const ref = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="User menu"
      className="absolute right-0 top-[calc(100%+30px)] w-40 bg-[#111] border-t-2 border-[#C8A84B] shadow-[0_8px_40px_rgba(200,168,75,0.15)] z-50"
    >
      {/* My Orders */}
      <Link
        href="/orders"
        onClick={onClose}
        role="menuitem"
        className="flex items-center gap-3 px-1 py-2 text-white hover:text-[#C8A84B] transition-colors group"
      >
        {/* Package / box icon */}
        <svg
          className="w-6 h-6 flex-shrink-0 transition-colors group-hover:text-[#C8A84B]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.375c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
        <span className="text-sm font-medium">My Orders</span>
      </Link>

      {/* LOG OUT */}
      <button
        onClick={() => { onLogout?.(); onClose(); }}
        role="menuitem"
        className="w-full bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-xs tracking-[0.15em] uppercase py-2 transition-colors"
      >
        LOG OUT
      </button>
    </div>
  );
}
