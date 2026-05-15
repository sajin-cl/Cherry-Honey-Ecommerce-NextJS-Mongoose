"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WriteReviewModal from "@/components/ui/WriteReviewModal";

/* ── helpers ── */
const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
};
const serif = { fontFamily: "'Georgia', 'Times New Roman', serif" };

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
      <span className="text-gray-400 text-xs">({count} reviews)</span>
    </div>
  );
}

/* ── mock product data ── */
const PRODUCT = {
  id: 1,
  name: "Kashmir White Honey",
  rating: 4.5,
  reviewCount: 128,
  price: 549,
  original: 699,
  discount: 21,
  images: [
    "/hero-honey-jar.png",
    "/honey-jar-bees.png",
    "/hero-honey-jar.png",
  ],
  quantity: ["50ml", "100ml", "500ml"],
  description:
    "Sourced from the pristine valleys of Kashmir, this rare white honey is harvested from wildflower meadows at high altitudes. Known for its delicate floral aroma, creamy texture, and exceptional purity.",
  specs: {
    inTheBox: [
      { label: "Sales Package", value: "1 Bottle Pure Honey" },
      { label: "Pack of", value: "1" },
    ],
    general: [
      { label: "Product Name", value: "Kashmir White Honey" },
      { label: "Model Name", value: "Kashmir Honey" },
      { label: "Flavour", value: "Natural Sweet" },
      { label: "Quantity", value: "500ml" },
      { label: "Container type", value: "Glass Bottle" },
      { label: "Suitable for", value: "Bottle" },
      { label: "Self Life", value: "12Months" },

    ],
  },
  shippingDetails: {
    shipping:
      "We ensure fast and secure delivery of your honey products. Orders are processed within 24 hours and delivered within 3–5 business days depending on your location. All products are carefully packed to maintain freshness and quality",
    returns:
      "If you receive a damaged or incorrect product, you can request a return within 7 days of delivery. The product must be unused and in its original packaging. We aim to provide the highest quality honey, and your satisfaction is our priority",
  },
  faqs: [
    {
      q: "What makes Kashmir White Honey different from regular honey?",
      a: "Our Kashmir White Honey is harvested from high-altitude wildflower meadows in Kashmir. The unique flora, combined with a cool climate, gives this honey its characteristic light colour, mild taste, and higher antioxidant content compared to regular honey.",
    },
    {
      q: "How should I store this honey?",
      a: "Store at room temperature away from direct sunlight. Do not refrigerate as it accelerates crystallisation. If crystallisation occurs, warm the jar gently in lukewarm water — this is a natural sign of purity.",
    },
    {
      q: "Is it safe for children/diabetics?",
      a: "Not recommended for children under 1 year. Diabetics should consult their physician before consumption. Natural honey does contain natural sugars.",
    },
  ],
  reviews: [
    {
      name: "Priya S.",
      avatar: "P",
      rating: 5,
      date: "January 12, 2026",
      text: "Absolutely love this honey! The flavour is unlike anything I've tasted. Light, floral and incredibly pure. Will definitely order again.",
    },
    {
      name: "Rahul M.",
      avatar: "R",
      rating: 4,
      date: "February 5, 2026",
      text: "Very good quality honey. Packaging is premium and the honey smells amazing. Slightly expensive but totally worth it for the quality.",
    },
  ],
  similar: [
    { id: 2, name: "Wildflower Honey", price: 449, image: "/hero-honey-jar.png" },
    { id: 3, name: "Forest Honey", price: 399, image: "/honey-jar-bees.png" },
    { id: 4, name: "Organic Honey", price: 499, image: "/hero-honey-jar.png" },
    { id: 5, name: "Tulsi Honey", price: 349, image: "/honey-jar-bees.png" },
  ],
};



/* ── sub-components ── */
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

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function ProductDetailPage() {
  const product = PRODUCT;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const [qty, setQty] = useState(1);
  const [sellerTab, setSellerTab] = useState("shipping");
  const [added, setAdded] = useState(false);

  /* review state */
  const [localReviews, setLocalReviews] = useState(product.reviews);
  const [formOpen, setFormOpen] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (review) => {
    setLocalReviews((prev) => [review, ...prev]);
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
                src={product.images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10 transition-opacity duration-300"
                loading="eager"
                priority
              />
              {/* Discount badge */}
              <span className="absolute top-4 left-4 bg-[#C8A84B] text-black text-xs font-bold px-2.5 py-1">
                -{product.discount}%
              </span>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
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
          </div>

          {/* Right — product info */}
          <div className="flex flex-col">
            {/* Rating */}
            <StarRating rating={product.rating} count={product.reviewCount} />

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
                ₹{product.price}
              </span>
              <span className="text-gray-500 text-lg line-through">
                ₹{product.original}
              </span>
              <span className="text-green-400 text-sm font-medium">
                Save {product.discount}%
              </span>
            </div>

            {/* Gold divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#C8A84B] via-[#e8c96b] to-transparent mb-6" />

            {/* Weight selector */}
            <div className="mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
                Quantity
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.quantity.map((w) => (
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

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              {/* Qty control */}
              <div className="flex items-center border border-gray-700">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C8A84B] hover:bg-[#C8A84B]/10 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-white font-semibold text-sm border-x border-gray-700">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C8A84B] hover:bg-[#C8A84B]/10 transition-colors text-lg"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-10 font-semibold text-sm tracking-widest uppercase transition-all duration-300 ${added
                    ? "bg-green-600 text-white"
                    : "bg-[#C8A84B] hover:bg-[#b8973e] text-black"
                  }`}
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button>
            </div>

            {/* Buy Now */}
            <button
              onClick={handleAddToCart}
              className="w-full h-10 font-semibold text-sm tracking-widest uppercase border border-[#C8A84B] text-[#C8A84B] hover:bg-[#C8A84B] hover:text-black transition-all duration-300 mb-4"
            >
              Buy Now
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
            {product.specs.inTheBox.map((row, i) => (
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
            {product.specs.general.map((row, i) => (
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
            {product.shippingDetails[sellerTab]}
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
            {product.faqs.map((faq, i) => (
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
              <StarRating rating={product.rating} count={product.reviewCount} />
              <p className="text-gray-500 text-xs mt-1">
                Based on {product.reviewCount} verified reviews
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl">
            {localReviews.map((rev, i) => (
              <div key={i} className="bg-[#111] border border-gray-800 p-5 animate-fadeIn">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center text-[#C8A84B] font-bold text-sm flex-shrink-0">
                    {rev.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-white text-sm font-semibold">
                        {rev.name}
                      </span>
                      <span className="text-gray-500 text-xs flex-shrink-0">
                        {rev.date}
                      </span>
                    </div>
                    <StarRating rating={rev.rating} count={null} />
                    <p className="text-gray-400 text-sm leading-relaxed mt-3">
                      {rev.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
        <section>
          <h2 className="text-2xl text-white mb-8" style={serifItalic}>
            <span className="text-[#C8A84B]">Similar</span> Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {product.similar.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group block">
                <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/50 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="relative h-48 bg-black">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm mb-1 group-hover:text-[#C8A84B] transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[#C8A84B] text-sm font-semibold">
                        ₹{p.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
