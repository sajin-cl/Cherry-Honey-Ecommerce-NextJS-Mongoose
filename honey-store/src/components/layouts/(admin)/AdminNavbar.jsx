"use client";

import { useState, useRef, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";

export default function AdminNavbar({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const ref = useRef(null);

  /* fetch admin user details on mount */
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await apiClient.getMe();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch admin user:", err);
      }
    }
    fetchUser();
  }, []);

  /* close dropdown when clicking outside */
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const displayName = user?.fullName || "Admin";
  const displayEmail = user?.email || "admin@honeybee.com";
  const avatarLetter = (displayName[0] || "A").toUpperCase();
  const roleName = user?.role ? (user.role.charAt(0).toUpperCase() + user?.role.slice(1)) : "Admin";

  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center px-4 md:px-6 gap-4 sticky top-0 z-30">
      {/* Hamburger menu button */}
      <button
        onClick={onMenuClick}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors md:hidden"
        aria-label="Open sidebar"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Profile + Dropdown */}
      <div className="relative flex items-center gap-3" ref={ref}>
        {/* Name / role text */}
        <div className="text-right hidden sm:block">
          <p className="text-[13px] font-semibold text-gray-900 leading-tight">{displayName}</p>
          <p className="text-[11px] text-gray-400 leading-tight">{roleName}</p>
        </div>

        {/* Avatar button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-100 focus:outline-none focus:ring-amber-300 transition-all"
          aria-label="Open profile menu"
          aria-expanded={open}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold">
            {avatarLetter}
          </div>
        </button>

        {/* Dropdown card */}
        {open && (
          <div className="absolute right-0 top-[calc(100%+10px)] w-[220px] bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User info row */}
            <div className="flex items-center gap-3 mb-4">
              {/* Mini avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-amber-100">
                {avatarLetter}
              </div>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-gray-900 truncate">{displayName}</p>
                <p className="text-[11.5px] text-gray-400 truncate">{displayEmail}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-3" />

            {/* Logout */}
            <button
              onClick={async () => {
                setOpen(false);
                try {
                  await apiClient.logout();
                  window.location.href = "/accounts/login";
                } catch (err) {
                  console.error("Logout failed:", err);
                }
              }}
              className="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 transition-all group"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
