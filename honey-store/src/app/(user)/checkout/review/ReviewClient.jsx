"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import OrderConfirmedModal from "@/components/ui/OrderConfirmedModal";

const serif = { fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic" };
const TAXES = 10;

function EditIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

export default function ReviewClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const addrStr = sessionStorage.getItem("shippingAddress");
      if (addrStr) {
        setShippingAddress(JSON.parse(addrStr));
      }
      const payMethod = sessionStorage.getItem("paymentMethod");
      if (payMethod) {
        setPaymentMethod(payMethod);
      }
    } catch (e) {
      console.error("Failed to load checkout settings:", e);
    }
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const grandTotal = subtotal + TAXES;

  const removeItem = async (id) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemIds: [id] }),
      });
      if (res.ok) {
        const updated = items.filter((i) => i.id !== id);
        setItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      alert("Missing shipping address. Please go back and select one.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(item => ({
            product: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            qty: item.qty
          })),
          shippingAddress: {
            name: shippingAddress.name,
            line1: shippingAddress.line1,
            phone: shippingAddress.phone
          },
          paymentMethod: paymentMethod === "cod" ? "cod" : "cashfree",
          itemsTotal: subtotal,
          tax: TAXES,
          shippingCharge: 0,
          grandTotal: grandTotal
        })
      });

      const data = await res.json();
      if (res.ok) {
        setPlaced(true);
        // Clear local storage and session storage
        localStorage.removeItem("cart");
        sessionStorage.removeItem("shippingAddress");
        sessionStorage.removeItem("paymentMethod");
        window.dispatchEvent(new Event("cartUpdate"));
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#C8A84B] transition-colors">Cart</Link>
          <span>/</span>
          <Link href="/checkout" className="hover:text-[#C8A84B] transition-colors">Address</Link>
          <span>/</span>
          <Link href="/checkout/payment" className="hover:text-[#C8A84B] transition-colors">Payment</Link>
          <span>/</span>
          <span className="text-gray-300">Review</span>
        </nav>

        <h1 className="text-3xl text-white mb-8" style={serif}>Review Order</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-6">
            <div>
              <p className="text-gray-300 text-sm mb-4">
                Estimated Delivery:{" "}
                <span className="text-white font-medium">Within 3-5 working days</span>
              </p>

              {items.length === 0 ? (
                <div className="bg-[#111] border border-gray-800 p-8 text-center text-gray-400">
                  No items to place order.
                </div>
              ) : (
                <div className="divide-y divide-gray-800 border border-gray-800 bg-[#111]">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 px-4 py-4 relative">
                      <div className="relative w-16 h-16 flex-shrink-0 bg-black border border-gray-800">
                        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium mb-0.5">{item.name}</p>
                        {item.weight && <p className="text-gray-400 text-xs mb-0.5">Size: {item.weight}</p>}
                        <p className="text-[#C8A84B] text-sm font-semibold mb-0.5">₹{item.price.toFixed(2)}</p>
                        <p className="text-gray-500 text-xs">QTY: {item.qty}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-white text-base font-semibold mb-3">Shipping Address</h2>
              <div className="border border-gray-800 px-5 py-4 flex items-start justify-between gap-4 bg-[#111]">
                {shippingAddress ? (
                  <div>
                    <p className="text-white text-sm font-medium mb-1">{shippingAddress.name}</p>
                    <p className="text-gray-400 text-xs">{shippingAddress.line1}</p>
                    <p className="text-gray-400 text-xs mt-1">Phone: {shippingAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-red-400 text-xs">No address selected.</p>
                )}
                <Link href="/checkout" className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:text-[#C8A84B] hover:border-[#C8A84B] transition-colors" aria-label="Edit address">
                  <EditIcon />
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-white text-base font-semibold mb-3">Payment Method</h2>
              <div className="border border-gray-800 px-5 py-4 flex items-start justify-between gap-4 bg-[#111]">
                <div>
                  <p className="text-white text-sm font-medium mb-1">
                    {paymentMethod === "cod" ? "Cash On Delivery (COD)" : "Online Payment (Cashfree)"}
                  </p>
                </div>
                <Link href="/checkout/payment" className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:text-[#C8A84B] hover:border-[#C8A84B] transition-colors" aria-label="Edit payment">
                  <EditIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72 flex-shrink-0">
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
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between font-bold">
                  <span className="text-white text-sm">Grand Total</span>
                  <span className="text-white text-base">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={items.length === 0 || !shippingAddress || loading}
                className="block w-full bg-[#C8A84B] hover:bg-[#b8973e] disabled:opacity-50 disabled:cursor-not-allowed text-white text-center font-bold text-sm tracking-[0.2em] uppercase py-4 transition-colors"
              >
                {loading ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {placed && <OrderConfirmedModal onClose={() => { setPlaced(false); window.location.href = "/orders"; }} />}
    </div>
  );
}
