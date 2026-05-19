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
export default function UserMenu({ user, onClose, onLogout }) {
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
      className="absolute right-0 top-[calc(100%+30px)] w-48 bg-[#111] border border-gray-800 border-t-2 border-t-[#C8A84B] shadow-[0_8px_40px_rgba(0,0,0,0.5)] z-50 py-1"
    >
      {/* Profile Row */}
      {user ? (
        <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#C8A84B] text-black flex items-center justify-center text-xs font-bold shrink-0">
            {(user.fullName?.[0] || "U").toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white truncate leading-tight">{user.fullName}</p>
            <p className="text-[10px] text-gray-400 truncate leading-tight mt-0.5">{user.email}</p>
          </div>
        </div>
      ) : (
        <div className="px-4 py-3 border-b border-gray-800">
          <p className="text-[12px] font-semibold text-gray-400">Welcome Guest</p>
        </div>
      )}

      {/* Navigation links */}
      <div className="p-1">
        {user ? (
          <>
            <Link
              href="/orders"
              onClick={onClose}
              role="menuitem"
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-[#C8A84B] hover:bg-white/5 rounded-md transition-all group"
            >
              <svg
                className="w-4 h-4 flex-shrink-0 transition-colors group-hover:text-[#C8A84B]"
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
              <span className="text-xs font-medium">My Orders</span>
            </Link>

            <button
              onClick={() => { onLogout?.(); onClose(); }}
              role="menuitem"
              className="w-full mt-2 bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-[10px] tracking-[0.15em] uppercase py-2 rounded transition-colors"
            >
              LOG OUT
            </button>
          </>
        ) : (
          <>
            <Link
              href="/accounts/login"
              onClick={onClose}
              role="menuitem"
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-[#C8A84B] hover:bg-white/5 rounded-md transition-all group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C8A84B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="text-xs font-medium">Log In</span>
            </Link>
            <Link
              href="/accounts/register"
              onClick={onClose}
              role="menuitem"
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-[#C8A84B] hover:bg-white/5 rounded-md transition-all group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C8A84B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="text-xs font-medium">Register</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
