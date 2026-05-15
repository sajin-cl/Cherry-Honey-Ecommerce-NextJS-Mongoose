"use client";

import Link from "next/link";
import { useState } from "react";
import UserMenu from "@/components/ui/UserMenu";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">

          {/* Left nav links — desktop only */}
          <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-[#C8A84B] transition-colors">Products</Link></li>
            <li><Link href="/about" className="hover:text-[#C8A84B] transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-[#C8A84B] transition-colors">Contact</Link></li>
          </ul>

          {/* Mobile: Hamburger (left) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-[#C8A84B] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
            </svg>
          </button>

          {/* Center logo */}
          <Link
            href="/"
            className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src={'/logo.png'}
              alt="Logo"
              width={100}
              height={100}
              className="mt-3"

            />
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4 md:gap-5">

            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-300 hover:text-[#C8A84B] transition-colors"
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {/* Cart icon */}
            <Link
              href="/cart"
              className="text-gray-300 hover:text-[#C8A84B] transition-colors relative"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </Link>

            {/* Order icon */}
            <Link
              href="/orders"
              className="text-gray-300 hover:text-[#C8A84B] transition-colors"
              aria-label="Orders"
            >
              <svg
                className="w-5 h-5 flex-shrink-0 transition-colors group-hover:text-[#C8A84B]"
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
            </Link>

            {/* User avatar — toggles UserMenu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="bg-[#C8A84B] hover:bg-[#b8973e] text-black rounded-full p-1.5 transition-colors"
                aria-label="Account menu"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>

              {userMenuOpen && (
                <UserMenu
                  onClose={() => setUserMenuOpen(false)}
                  onLogout={() => {
                    /* TODO: call your auth sign-out here */
                    setUserMenuOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Search bar — slides down when open */}
        {searchOpen && (
          <div className="bg-black/95 border-t border-gray-800 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-[#C8A84B] transition-colors text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-800 px-6 py-4 space-y-4">
            <Link href="/" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-[#C8A84B] text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Home
            </Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-[#C8A84B] text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              Products
            </Link>
            <Link href="/orders" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-[#C8A84B] text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Orders
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-[#C8A84B] text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-[#C8A84B] text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Contact
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}