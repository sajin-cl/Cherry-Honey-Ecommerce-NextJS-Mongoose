"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { calculateDelivery, calculateGrandTotal, TAXES } from "@/lib/pricing";

const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };

function QtySelect({ value, stock = 10, onChange }) {
  const maxQty = Math.max(1, Math.min(stock, 10));
  const optionsArray = Array.from({ length: maxQty }, (_, i) => i + 1);

  if (stock === 0) {
    return (
      <span className="text-red-500 text-xs font-semibold uppercase tracking-wider block mb-1">
        Out of Stock
      </span>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-[#1a1a1a] border border-gray-700 text-white text-xs px-2 py-1 outline-none cursor-pointer"
    >
      {optionsArray.map((n) => (
        <option key={n} value={n}>Qty {n}</option>
      ))}
    </select>
  );
}

export default function CartClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selected, setSelected] = useState(new Set(initialItems.map((i) => i.id)));
  const [similar, setSimilar] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Notify Navbar of initial cart size on mount
    window.dispatchEvent(new Event("cartUpdate"));
    // Keep localstorage synced as fallback
    localStorage.setItem("cart", JSON.stringify(items));

    async function fetchSimilar() {
      try {
        const res = await fetch("/api/products?limit=4");
        if (res.ok) {
          const data = await res.json();
          setSimilar(data.products || []);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSimilar();
  }, [items]);

  const toggleAll = () => {
    if (selected.size === items.length) setSelected(new Set());
    else setSelected(new Set(items.map((i) => i.id)));
  };

  const toggleItem = (id) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  const removeItem = async (id) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemIds: [id] }),
      });
      if (res.ok) {
        const updated = items.filter((i) => i.id !== id);
        setItems(updated);
        const s = new Set(selected);
        s.delete(id);
        setSelected(s);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const removeSelected = async () => {
    const selectedIds = Array.from(selected);
    if (selectedIds.length === 0) return;
    setUpdating(true);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemIds: selectedIds }),
      });
      if (res.ok) {
        const updated = items.filter((i) => !selected.has(i.id));
        setItems(updated);
        setSelected(new Set());
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const updateQty = async (id, qty) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: id, qty }),
      });
      if (res.ok) {
        const updated = items.map((i) => i.id === id ? { ...i, qty } : i);
        setItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const subtotal = items.filter((i) => selected.has(i.id)).reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = calculateDelivery(subtotal);
  const grandTotal = calculateGrandTotal(subtotal);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-20">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">My Cart</span>
        </nav>

        <h1 className="text-3xl text-white mb-8" style={serif}>My Cart</h1>

        {items.length === 0 ? (
          <div className="border border-gray-800 p-12 text-center max-w-md mx-auto my-12 rounded-3xl">
            <p className="text-gray-400 text-sm mb-4">Your cart is empty.</p>
            <Link href="/products" className="bg-primary hover:bg-secondary text-black text-sm font-semibold px-6 py-2.5 transition-colors inline-block active:scale-95 rounded-full">
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 w-full min-w-0">
                <div className="flex items-center justify-between bg-[#111] border border-gray-800 px-4 py-3 mb-3">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <button
                      disabled={updating}
                      onClick={toggleAll}
                      className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${selected.size === items.length
                        ? "bg-primary border-primary"
                        : "border-gray-600"
                        }`}
                      aria-label="Select all"
                    >
                      {selected.size === items.length && (
                        <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M1 5l3 4 7-8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm text-gray-300">
                      {selected.size}/{items.length} Items Selected
                    </span>
                  </label>
                  <button
                    disabled={updating || selected.size === 0}
                    onClick={removeSelected}
                    className="text-gray-500 hover:text-red-400 disabled:opacity-30 transition-colors"
                    aria-label="Remove selected"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="bg-[#111] border border-gray-800 px-4 py-4 flex gap-4 relative">
                      <button
                        disabled={updating}
                        onClick={() => toggleItem(item.id)}
                        className={`w-4 h-4 border shrink-0 mt-1 flex items-center justify-center transition-colors ${selected.has(item.id)
                          ? "bg-primary border-primary"
                          : "border-gray-600"
                          }`}
                        aria-label={`Select ${item.name}`}
                      >
                        {selected.has(item.id) && (
                          <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M1 5l3 4 7-8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>

                      <div className="relative w-20 h-20 shrink-0 bg-black">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                          loading="eager"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium mb-1">{item.name}</p>
                        {item.weight && (
                          <p className="text-gray-500 text-xs mb-1">
                            Size: <span className="text-gray-300">{item.weight}</span>
                          </p>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-primary text-sm font-semibold">₹{item.price.toFixed(2)}</span>
                          {item.original && item.original > item.price && (
                            <span className="text-gray-500 text-xs line-through">₹{item.original.toFixed(2)}</span>
                          )}
                        </div>

                        {/* Stock Alerts */}
                        {item.stock <= 5 && item.stock > 0 && (
                          <p className="text-amber-500 text-[10px] mb-2 font-semibold uppercase tracking-wider">
                            Only {item.stock} left in stock!
                          </p>
                        )}
                        {item.stock === 0 && (
                          <p className="text-red-500 text-[10px] mb-2 font-semibold uppercase tracking-wider">
                            Out of Stock
                          </p>
                        )}

                        <QtySelect value={item.qty} stock={item.stock} onChange={(q) => updateQty(item.id, q)} />

                        <div className="flex flex-col gap-1 mt-3">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            15 Days return available
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={updating}
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-72 shrink-0">
                <div className="bg-[#111] border border-gray-800 p-5">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Taxes</span>
                      <span className="text-white font-medium">₹{TAXES.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Delivery Fee</span>
                      <span className={delivery === 0 ? "text-green-400 font-semibold" : "text-white font-medium"}>
                        {delivery === 0 ? "FREE" : `₹${delivery.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-px bg-gray-800" />
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-white">Grand Total</span>
                      <span className="text-white">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className={`block w-full bg-primary hover:bg-secondary text-white text-center font-bold text-sm tracking-[0.2em] uppercase py-4 transition-colors ${items.length === 0 ? "pointer-events-none opacity-50" : ""
                      }`}
                  >
                    CHECKOUT
                  </Link>
                </div>
              </div>
            </div>

            <section className="mt-20">
              <h2 className="text-2xl text-white mb-8" style={serif}>
                <span className="text-primary">Similar</span> Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similar.map((p) => {

                  return (
                    <ProductCard key={p._id.toString()} product={p} />
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
