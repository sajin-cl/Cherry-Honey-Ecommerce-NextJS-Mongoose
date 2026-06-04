"use client";

import { useState, useCallback, useEffect } from "react";
import { getMultiplier } from "@/lib/pricing";

/**
 * Manages cart count from localStorage and provides addToCart helper.
 *
 * Usage:
 *   const { cartCount, updateCartCount, addToCart, added } = useCart();
 */
export function useCart() {
    const [cartCount, setCartCount] = useState(0);
    const [added, setAdded] = useState(false);

    // ── Read cart count from localStorage ─────────────────────────────────────
    const updateCartCount = useCallback(() => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            setCartCount(count);
        } catch {
            setCartCount(0);
        }
    }, []);

    useEffect(() => {
        updateCartCount();
        window.addEventListener("cartUpdate", updateCartCount);
        window.addEventListener("storage", updateCartCount);
        return () => {
            window.removeEventListener("cartUpdate", updateCartCount);
            window.removeEventListener("storage", updateCartCount);
        };
    }, [updateCartCount]);

    // ── Sync server cart to localStorage and update count ─────────────────────
    const syncServerCart = useCallback((serverCart) => {
        const localCart = serverCart.map((item) => {
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
    }, [updateCartCount]);

    // ── Add to cart ───────────────────────────────────────────────────────────
    /**
     * @param {object} params
     * @param {string} params.productId
     * @param {string} params.weight
     * @param {number} params.qty
     * @param {number} params.price  - resolved price for localStorage
     * @returns {"ok"|"unauthorized"|"error"}
     */
    const addToCart = useCallback(async ({ productId, weight, qty, price }) => {
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, weight, qty }),
            });

            if (res.status === 401) return "unauthorized";

            const data = await res.json();
            if (!res.ok) return "error";

            if (data.cart) {
                const cart = data.cart.map((item) => {
                    const prod = item?.product;
                    const mult = getMultiplier(item.weight, prod?.quantity);
                    const itemPrice = prod ? (prod.discountPrice ?? prod.price) * mult : (price ?? 0);
                    return {
                        id: item?._id,
                        productId: prod?._id || "",
                        name: prod?.name || "",
                        weight: item?.weight,
                        qty: item?.qty,
                        image: prod?.image?.url || "/hero-honey-jar.webp",
                        price: itemPrice,
                    };
                });
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            window.dispatchEvent(new Event("cartUpdate"));
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
            return "ok";
        } catch (err) {
            console.error("Cart error:", err);
            return "error";
        }
    }, []);

    return { cartCount, updateCartCount, syncServerCart, addToCart, added, setAdded };
}
