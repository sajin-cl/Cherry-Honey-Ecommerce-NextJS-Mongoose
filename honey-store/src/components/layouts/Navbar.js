"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Left nav links */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <li><Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link></li>
          <li><Link href="/products" className="hover:text-[#C8A84B] transition-colors">Products</Link></li>
          <li><Link href="/about" className="hover:text-[#C8A84B] transition-colors">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#C8A84B] transition-colors">Contact</Link></li>
        </ul>

        {/* Center logo */}
        <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <svg className="w-7 h-7 text-[#C8A84B]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.5 2 7 4 7 7c0 1.5.5 2.8 1.3 3.8C6.5 12 5.5 14 5.5 16c0 3.5 3 6 6.5 6s6.5-2.5 6.5-6c0-2-1-4-2.8-5.2C16.5 9.8 17 8.5 17 7c0-3-2.5-5-5-5zm0 2c1.5 0 3 1.2 3 3s-1.5 3-3 3-3-1.2-3-3 1.5-3 3-3z"/>
          </svg>
          <span className="text-[#C8A84B] font-bold text-lg tracking-wide" style={{ fontFamily: "'Georgia', serif" }}>
            Cherry Honey
          </span>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/cart" className="text-gray-300 hover:text-[#C8A84B] transition-colors relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </Link>
          {/* User */}
          <Link href="/accounts/login" className="bg-[#C8A84B] hover:bg-[#b8973e] text-black rounded-full p-1.5 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>
          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 px-6 py-4 space-y-3">
          <Link href="/" className="block text-gray-300 hover:text-[#C8A84B] text-sm">Home</Link>
          <Link href="/products" className="block text-gray-300 hover:text-[#C8A84B] text-sm">Products</Link>
          <Link href="/about" className="block text-gray-300 hover:text-[#C8A84B] text-sm">About</Link>
          <Link href="/contact" className="block text-gray-300 hover:text-[#C8A84B] text-sm">Contact</Link>
        </div>
      )}
    </nav>
  );
}
