"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/ui/UserMenu";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MOBILE_NAV_ITEMS } from '@/config/staticData'
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);




  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);

            // Sync database cart with localStorage cache in the background
            const cartRes = await fetch("/api/cart");
            if (cartRes.ok) {
              const cartData = await cartRes.json();
              if (cartData.cart) {
                const getMultiplier = (selected, base) => {
                  const s = String(selected).toLowerCase().trim();
                  const b = String(base || "500g").toLowerCase().trim();
                  if (s === b) return 1.0;

                  const getVal = (str) => {
                    const num = parseFloat(str);
                    const isKg = str.includes("kg") || str.includes("kilogram");
                    return isKg ? num * 1000 : num;
                  };

                  const sVal = getVal(s);
                  const bVal = getVal(b);
                  if (isNaN(sVal) || isNaN(bVal) || bVal === 0) return 1.0;

                  const ratio = sVal / bVal;
                  if (Math.abs(ratio - 2.0) < 0.1) return 1.8;
                  if (Math.abs(ratio - 4.0) < 0.1) return 3.4;
                  return ratio;
                };

                const localCart = cartData.cart.map((item) => {
                  const prod = item.product;
                  const pQtyNorm = prod?.quantity ? prod.quantity.trim() : "500g";
                  const mult = getMultiplier(item.weight, pQtyNorm);
                  return {
                    id: item._id,
                    productId: prod?._id || "",
                    name: prod?.name || "Deleted Product",
                    price: prod ? (prod.discountPrice ?? prod.price) * mult : 0,
                    original: prod ? prod.price * mult : 0,
                    image: prod?.image?.url || "/hero-honey-jar.webp",
                    qty: item.qty,
                    weight: item.weight,
                    stock: prod ? prod.stock : 0,
                  };
                });
                localStorage.setItem("cart", JSON.stringify(localCart));
                updateCartCount();
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to check user:", err);
      }
    }
    checkUser();

    // Cart listeners
    updateCartCount();
    window.addEventListener("cartUpdate", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdate", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">

          {/* Left nav links — desktop only */}
          <ul className="hidden md:flex items-center gap-8 text-sm">
            <li>
              <Link
                href="/"
                className={`transition-colors duration-200 font-mono uppercase ${isActive('/') ? 'text-[#C8A84B] font-medium' : 'text-gray-300 hover:text-[#C8A84B]'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`transition-colors duration-200 font-mono uppercase ${isActive('/products') ? 'text-[#C8A84B] font-medium' : 'text-gray-300 hover:text-[#C8A84B]'}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`transition-colors duration-200 font-mono uppercase ${isActive('/about') ? 'text-[#C8A84B] font-medium' : 'text-gray-300 hover:text-[#C8A84B]'}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`transition-colors duration-200 font-mono uppercase ${isActive('/contact') ? 'text-[#C8A84B] font-medium' : 'text-gray-300 hover:text-[#C8A84B]'}`}
              >
                Contact
              </Link>
            </li>
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
          <div className="flex items-center gap-4 md:gap-8">

            {/* Cart icon */}
            <Link
              href="/cart"
              className="group text-gray-300 hover:text-[#C8A84B] transition-colors relative"
              aria-label="Cart"
              title="cart"
            >
              <MdOutlineShoppingCartCheckout
                size={25}
                className="text-current group-hover:text-[#C8A84B] transition-colors"
              />

              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C8A84B] text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Order icon */}
            <Link
              href="/orders"
              className="text-gray-300 hover:text-[#C8A84B] transition-colors"
              aria-label="Orders"
              title="my orders"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>

            </Link>

            {/* User avatar — toggles UserMenu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="w-7 h-7 bg-[#C8A84B] hover:bg-[#b8973e] text-black rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 focus:outline-none"
                aria-label="Account menu"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                title='account'
              >
                {user ? (
                  (user.fullName?.[0] || "U").toUpperCase()
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </button>

              {userMenuOpen && (
                <UserMenu
                  user={user}
                  onClose={() => setUserMenuOpen(false)}
                  onLogout={async () => {
                    try {
                      await fetch("/api/auth/logout", { method: "POST" });
                      setUser(null);
                      window.location.href = "/accounts/login";
                    } catch (err) {
                      console.error("Logout failed:", err);
                    }
                    setUserMenuOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>


        {/* Mobile menu drawer */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-800 px-6 py-4 space-y-4">
            {MOBILE_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 text-sm tracking-widest transition-colors duration-200 hover:ml-1 ${isActive(item.href)
                  ? "text-[#C8A84B] font-medium"
                  : "text-gray-300 hover:text-[#C8A84B]"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}