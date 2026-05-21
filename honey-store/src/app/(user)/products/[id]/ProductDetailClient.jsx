"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WriteReviewModal from "@/components/ui/WriteReviewModal";

/* ── helpers ── */
const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
};

function StarRating({ rating = 4.5, count = 128 }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            className={`w-4 h-4 ${s <= Math.floor(rating)
              ? "text-[#C8A84B]"
              : s - 0.5 <= rating
                ? "text-[#C8A84B]"
                : "text-gray-600"
              }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {count !== null && <span className="text-gray-400 text-xs">({count} reviews)</span>}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-white text-sm font-medium group-hover:text-[#C8A84B] transition-colors pr-4">
          {q}
        </span>
        <span
          className={`text-[#C8A84B] text-lg font-bold flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"
            }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 pb-4" : "max-h-0"
          }`}
      >
        <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function ProductDetailClient({ product, similar }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(product.quantity || "500g");
  const [qty, setQty] = useState(product.stock === 0 ? 0 : 1);
  const [sellerTab, setSellerTab] = useState("shipping");
  const [added, setAdded] = useState(false);
  const [localReviews, setLocalReviews] = useState(product.reviews || []);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (product.quantity) {
      setSelectedWeight(product.quantity);
    }
    if (product.stock === 0) {
      setQty(0);
    } else {
      setQty(1);
    }
  }, [product]);

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

  const multiplier = getMultiplier(selectedWeight, product.quantity);
  const price = (product.discountPrice ?? product.price) * multiplier;
  const original = product.price * multiplier;
  const discount = product.price > 0 && product.discountPrice ? Math.round((((product.price - (product.discountPrice ?? product.price)) / product.price) * 100)) : 0;

  const getWeightVal = (str) => {
    const num = parseFloat(str);
    const isKg = String(str).toLowerCase().includes("kg") || String(str).toLowerCase().includes("kilogram");
    return isKg ? num * 1000 : num;
  };

  const weightOptions = ["250g", "500g", "1kg"];
  const prodQtyNormalized = product.quantity ? product.quantity.trim() : "";
  if (prodQtyNormalized && !weightOptions.some(w => w.toLowerCase() === prodQtyNormalized.toLowerCase())) {
    weightOptions.push(prodQtyNormalized);
  }
  weightOptions.sort((a, b) => getWeightVal(a) - getWeightVal(b));

  const images = [];
  if (product.image?.url) images.push(product.image.url);
  if (product.image1?.url) images.push(product.image1.url);
  if (product.image2?.url) images.push(product.image2.url);
  if (images.length === 0) images.push("/hero-honey-jar.webp");

  const specs = {
    inTheBox: [
      { label: "Sales Package", value: `1 Bottle Pure ${product.name}` },
      { label: "Pack of", value: "1" },
    ],
    general: [
      { label: "Product Name", value: product.name },
      { label: "Category", value: product.category },
      { label: "Flavour", value: "Natural Sweet" },
      { label: "Container type", value: "Glass Bottle" },
      { label: "Shelf Life", value: "12 Months" },
    ],
  };

  const faqs = [
    {
      q: `What makes ${product.name} different from regular honey?`,
      a: "Our honey is ethically sourced, raw, and organic. Unlike regular honey, it preserves all natural nutrients, enzymes, and antioxidants.",
    },
    {
      q: "How should I store this honey?",
      a: "Store at room temperature away from direct sunlight. Do not refrigerate as it accelerates crystallisation.",
    },
  ];

  const shippingDetails = {
    shipping: "We ensure fast and secure delivery of your honey products. Orders are processed within 24 hours and delivered within 3–5 business days.",
    returns: "If you receive a damaged or incorrect product, you can request a return within 7 days of delivery.",
  };

  const handleAddToCart = async () => {
    // 1. Optimistic local cart update
    const localCartStr = localStorage.getItem("cart") || "[]";
    let localCart = [];
    try {
      localCart = JSON.parse(localCartStr);
    } catch {
      localCart = [];
    }

    const tempId = product._id + "_" + selectedWeight;
    const existingIndex = localCart.findIndex(
      (item) => item.productId === product._id && item.weight === selectedWeight
    );

    if (existingIndex > -1) {
      localCart[existingIndex].qty += qty;
    } else {
      localCart.push({
        id: tempId,
        productId: product._id,
        name: product.name,
        price: price,
        original: original,
        image: product.image?.url || "/hero-honey-jar.webp",
        qty: qty,
        weight: selectedWeight,
        stock: product.stock
      });
    }

    localStorage.setItem("cart", JSON.stringify(localCart));
    window.dispatchEvent(new Event("cartUpdate"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    // 2. Database background sync
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          weight: selectedWeight,
          qty: qty
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.cart) {
          const syncedCart = data.cart.map(item => {
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
              stock: prod ? prod.stock : 0
            };
          });
          localStorage.setItem("cart", JSON.stringify(syncedCart));
          window.dispatchEvent(new Event("cartUpdate"));
        }
      }
    } catch (err) {
      console.error("Cart background sync error:", err);
    }
  };

  const handleBuyNow = async () => {
    // 1. Optimistically write to localStorage
    const localCartStr = localStorage.getItem("cart") || "[]";
    let localCart = [];
    try {
      localCart = JSON.parse(localCartStr);
    } catch {
      localCart = [];
    }

    const tempId = product._id + "_" + selectedWeight;
    const existingIndex = localCart.findIndex(
      (item) => item.productId === product._id && item.weight === selectedWeight
    );

    if (existingIndex > -1) {
      localCart[existingIndex].qty += qty;
    } else {
      localCart.push({
        id: tempId,
        productId: product._id,
        name: product.name,
        price: price,
        original: original,
        image: product.image?.url || "/hero-honey-jar.webp",
        qty: qty,
        weight: selectedWeight,
        stock: product.stock
      });
    }

    localStorage.setItem("cart", JSON.stringify(localCart));
    window.dispatchEvent(new Event("cartUpdate"));

    // 2. Perform DB sync API call
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          weight: selectedWeight,
          qty: qty
        })
      });

      if (res.status === 401) {
        // Guest user goes to login, but must return to checkout after logging in
        window.location.href = `/accounts/login?next=/checkout`;
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.cart) {
          const syncedCart = data.cart.map(item => {
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
              stock: prod ? prod.stock : 0
            };
          });
          localStorage.setItem("cart", JSON.stringify(syncedCart));
          window.dispatchEvent(new Event("cartUpdate"));
        }
      }
    } catch (err) {
      console.error("Cart merge error before checkout:", err);
    }

    // 3. Redirect directly to checkout
    window.location.href = "/checkout";
  };

  const handleReviewSubmit = async (review) => {
    try {
      const res = await fetch(`/api/products/${product._id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(review.rating),
          comment: review.text,
        }),
      });

      if (res.status === 401) {
        window.location.href = `/accounts/login?next=/products/${product._id}`;
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to submit review");
        return;
      }

      if (data.product) {
        setLocalReviews(data.product.reviews || []);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Something went wrong while submitting the review");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-16">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#C8A84B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#C8A84B] transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </nav>

        {/* ══════════════════════════════════════════════
            PRODUCT HERO — image + info
        ══════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left — images */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative w-full aspect-square bg-[#111] border border-gray-800 overflow-hidden flex items-center justify-center">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10 transition-opacity duration-300"
                loading="eager"
                priority
              />
              {/* Discount badge */}
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#C8A84B] text-black text-xs font-bold px-2.5 py-1">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-24 h-24 flex-shrink-0 border-2 transition-all duration-200 overflow-hidden bg-[#111] ${activeImage === i
                      ? "border-[#C8A84B]"
                      : "border-gray-800 hover:border-gray-600"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — product info */}
          <div className="flex flex-col">
            {/* Rating */}
            <StarRating rating={product.rating} count={product.numReviews} />

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl text-white mt-3 mb-4 leading-tight"
              style={serifItalic}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-[#C8A84B]">
                ₹{price}
              </span>
              {product.discountPrice && (
                <span className="text-gray-500 text-lg line-through">
                  ₹{original}
                </span>
              )}
              {discount > 0 && (
                <span className="text-green-400 text-sm font-medium">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Gold divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#C8A84B] via-[#e8c96b] to-transparent mb-6" />

            {/* Weight selector */}
            <div className="mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
                Quantity
              </p>
              <div className="flex gap-2 flex-wrap">
                {weightOptions.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-5 py-2 text-sm border transition-all duration-200 ${selectedWeight === w
                      ? "bg-[#C8A84B] border-[#C8A84B] text-black font-semibold"
                      : "border-gray-700 text-gray-300 hover:border-[#C8A84B] hover:text-[#C8A84B]"
                      }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock alert warning */}
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-amber-500 text-xs mb-3 font-semibold uppercase tracking-wider">
                Only {product.stock} items left in stock!
              </p>
            )}
            {product.stock === 0 && (
              <p className="text-red-500 text-xs mb-3 font-semibold uppercase tracking-wider">
                Out of Stock
              </p>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              {/* Qty control */}
              <div className="flex items-center border border-gray-700">
                <button
                  disabled={product.stock === 0}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C8A84B] hover:bg-[#C8A84B]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-white font-semibold text-sm border-x border-gray-700">
                  {qty}
                </span>
                <button
                  disabled={product.stock === 0}
                  onClick={() => setQty((q) => Math.min(product.stock || 0, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C8A84B] hover:bg-[#C8A84B]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-lg"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                disabled={product.stock === 0 || qty === 0}
                onClick={handleAddToCart}
                className={`flex-1 h-10 font-semibold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${added
                  ? "bg-green-600 text-white"
                  : "bg-[#C8A84B] hover:bg-[#b8973e] text-black"
                  }`}
              >
                {product.stock === 0 ? "Out of Stock" : added ? "✓ Added!" : "Add to Cart"}
              </button>
            </div>

            {/* Buy Now */}
            <button
              disabled={product.stock === 0 || qty === 0}
              onClick={handleBuyNow}
              className="w-full h-10 font-semibold text-sm tracking-widest uppercase border border-[#C8A84B] text-[#C8A84B] hover:bg-[#C8A84B] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-4"
            >
              {product.stock === 0 ? "Out of Stock" : "Buy Now"}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 border border-gray-800 p-4 mb-6">
              {[
                { icon: "🌿", label: "100% Natural" },
                { icon: "🚚", label: "Free Shipping" },
                { icon: "🔒", label: "Secure Payment" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-gray-400 text-xs">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Short description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PRODUCT SPECIFICATIONS
        ══════════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-2xl text-white mb-6" style={serifItalic}>
            <span className="text-[#C8A84B]">Product</span> Specifications
          </h2>

          <div className="border border-gray-800 overflow-hidden">
            {/* In the Box header */}
            <div className="bg-[#1a1a1a] px-5 py-3">
              <span className="text-[#C8A84B] text-sm font-semibold uppercase tracking-widest">
                In The Box
              </span>
            </div>
            {specs.inTheBox.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 px-5 py-3 text-sm ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0d0d0d]"
                  }`}
              >
                <span className="text-gray-400">{row.label}</span>
                <span className="text-white">{row.value}</span>
              </div>
            ))}

            {/* general header */}
            <div className="bg-[#1a1a1a] px-5 py-3 mt-1">
              <span className="text-[#C8A84B] text-sm font-semibold uppercase tracking-widest">
                General
              </span>
            </div>
            {specs.general.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 px-5 py-3 text-sm ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0d0d0d]"
                  }`}
              >
                <span className="text-gray-400">{row.label}</span>
                <span className="text-white">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SHIPPING DETAILS
        ══════════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-2xl text-white mb-6" style={serifItalic}>
            <span className="text-[#C8A84B]">Shipping</span> Details
          </h2>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 mb-6">
            {["shipping", "returns"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSellerTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-all duration-200 border-b-2 -mb-px ${sellerTab === tab
                  ? "border-[#C8A84B] text-[#C8A84B]"
                  : "border-transparent text-gray-400 hover:text-white"
                  }`}
              >
                {tab === "shipping" ? "Shipping" : "Returns"}
              </button>
            ))}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
            {shippingDetails[sellerTab]}
          </p>
        </section>

        {/* ══════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-2xl text-white mb-6" style={serifItalic}>
            <span className="text-[#C8A84B]">FAQ</span>
          </h2>

          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            REVIEWS
        ══════════════════════════════════════════════ */}
        <section className="mb-20">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-white" style={serifItalic}>
              <span className="text-[#C8A84B]">Reviews</span>
            </h2>
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-2 bg-[#C8A84B] hover:bg-[#b8973e] text-black text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487z" />
              </svg>
              Write a Review
            </button>
          </div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl font-bold text-[#C8A84B]">
              {product.rating}
            </span>
            <div>
              <StarRating rating={product.rating} count={product.numReviews} />
              <p className="text-gray-500 text-xs mt-1">
                Based on {product.numReviews} verified reviews
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl">
            {[...localReviews]
              .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
              .map((rev, i) => {
                const avatar = rev.avatar || rev.name?.charAt(0) || "U";
                const dateStr = rev.date || (rev.createdAt ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : "Recent");
                const commentText = rev.text || rev.comment || "";
                return (
                  <div key={i} className="bg-[#111] border border-gray-800 p-5 animate-fadeIn">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center text-[#C8A84B] font-bold text-sm flex-shrink-0">
                        {avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-white text-sm font-semibold">
                            {rev.name}
                          </span>
                          <span className="text-gray-500 text-xs flex-shrink-0">
                            {dateStr}
                          </span>
                        </div>
                        <StarRating rating={rev.rating} count={null} />
                        <p className="text-gray-400 text-sm leading-relaxed mt-3">
                          {commentText}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ── Write a Review Modal ── */}
          <WriteReviewModal
            isOpen={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleReviewSubmit}
          />
        </section>

        {/* ══════════════════════════════════════════════
            SIMILAR PRODUCTS
        ══════════════════════════════════════════════ */}
        {similar && similar.length > 0 && (
          <section>
            <h2 className="text-2xl text-white mb-8" style={serifItalic}>
              <span className="text-[#C8A84B]">Similar</span> Products
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {similar.map((p) => {
                const similarImg = p.image?.url || p.image || "/hero-honey-jar.webp";
                const similarId = p._id || p.id;
                const displayPrice = p.discountPrice ?? p.price;
                return (
                  <Link key={similarId} href={`/products/${similarId}`} className="group block">
                    <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/50 transition-all duration-300 group-hover:-translate-y-1">
                      <div className="relative h-48 bg-black">
                        <Image
                          src={similarImg}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-contain p-4"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-white text-sm mb-1 group-hover:text-[#C8A84B] transition-colors truncate">
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[#C8A84B] text-sm font-semibold">
                            ₹{displayPrice}
                          </span>
                          {p.discountPrice && (
                            <span className="text-gray-500 text-xs line-through">
                              ₹{p.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
