"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";
import ProductCard from "@/components/user/products/ProductCard";
import FAQItem from "@/components/user/products/ProductFAQ";
import ShowReview from "@/components/user/products/ShowReview";
import { serifItalic, PRODUCT_SPECS, PRODUCT_DETAIL_FAQS, PRODUCT_SHIPPING_DETAILS } from "@/config/staticData";
import { getMultiplier } from "@/lib/pricing";
import { useCart } from "@/hooks/useCart";
import { apiClient } from "@/lib/apiClient";

export default function ProductDetailClient({ product, similarProducts }) {
  const router = useRouter();
  const { addToCart, added } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(product.quantity || "500g");
  const [qty, setQty] = useState(product.stock === 0 ? 0 : 1);
  const [sellerTab, setSellerTab] = useState("shipping");
  const [localReviews, setLocalReviews] = useState(product.reviews || []);
  const [formOpen, setFormOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check this product",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  // ── Price calculations ──────────────────────────────────────────────────────
  const multiplier = getMultiplier(selectedWeight, product.quantity);
  const price = (product.discountPrice ?? product.price) * multiplier;
  const original = product.price * multiplier;
  const discount =
    product.price > 0 && product.discountPrice
      ? Math.round(
        ((product.price - (product.discountPrice ?? product.price)) /
          product.price) *
        100
      )
      : 0;

  const getWeightVal = (str) => {
    const num = parseFloat(str);
    const isKg =
      String(str).toLowerCase().includes("kg") ||
      String(str).toLowerCase().includes("kilogram");
    return isKg ? num * 1000 : num;
  };

  const weightOptions = ["250g", "500g", "1kg"];
  const prodQtyNormalized = product?.quantity ? product.quantity.trim() : "";
  if (
    prodQtyNormalized &&
    !weightOptions.some(
      (w) => w.toLowerCase() === prodQtyNormalized.toLowerCase()
    )
  ) {
    weightOptions.push(prodQtyNormalized);
  }
  weightOptions.sort((a, b) => getWeightVal(a) - getWeightVal(b));

  // ── Image list ──────────────────────────────────────────────────────────────
  const images = [];
  if (product.image?.url) images.push(product.image.url);
  if (product.image1?.url) images.push(product.image1.url);
  if (product.image2?.url) images.push(product.image2.url);
  if (images.length === 0) images.push("/hero-honey-jar.webp");

  // ── Cart ────────────────────────────────────────────────────────────────────
  const handleAddToCart = async () => {
    const result = await addToCart({
      productId: product._id,
      weight: selectedWeight,
      qty,
      price,
    });

    if (result === "unauthorized") {
      router.push(`/accounts/login?redirect=/products/${product.slug || product._id}`);
      return;
    }
    if (result === "error") {
      alert("Failed to add to cart");
    }
  };

  // ── Review ──────────────────────────────────────────────────────────────────
  const handleReviewSubmit = async (review) => {
    try {
      const data = await apiClient.submitReview(product._id, review.rating, review.text);
      if (data.product) {
        setLocalReviews(data.product.reviews || []);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review");
    }
  };

  // ── Static data (from staticData.js) ────────────────────────────────────────
  const specs = PRODUCT_SPECS(product);
  const faqs = PRODUCT_DETAIL_FAQS(product?.name);
  const shippingDetails = PRODUCT_SHIPPING_DETAILS;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-16">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-300">{product?.name}</span>
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
                alt={product?.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10 transition-opacity duration-300"
                loading="eager"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-primary text-black text-xs font-bold px-2.5 py-1">
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
                    className={`relative w-24 h-24 shrink-0 border-2 transition-all duration-200 overflow-hidden bg-[#111] ${activeImage === i
                        ? "border-primary"
                        : "border-gray-800 hover:border-gray-600"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                      priority
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — product info */}
          <div className="flex flex-col">
            <StarRating rating={product?.rating} count={product?.numReviews} />

            <h1
              className="text-3xl md:text-4xl text-white mt-3 mb-4 leading-tight"
              style={serifItalic}
            >
              {product?.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">₹{price}</span>
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
            <div className="w-full h-px bg-linear-to-r from-primary via-[#e8c96b] to-transparent mb-6" />

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
                        ? "bg-primary border-primary text-black font-semibold"
                        : "border-gray-700 text-gray-300 hover:border-primary hover:text-primary"
                      }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock warnings */}
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
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-white font-semibold text-sm border-x border-gray-700">
                  {qty}
                </span>
                <button
                  disabled={product.stock === 0}
                  onClick={() =>
                    setQty((q) => Math.min(product.stock || 0, q + 1))
                  }
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-lg"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                disabled={product.stock === 0 || qty === 0}
                onClick={handleAddToCart}
                className={`flex-1 h-10 font-semibold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${added
                    ? "bg-secondary text-black"
                    : "bg-primary hover:bg-secondary text-black"
                  }`}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : added
                    ? "✓ Added!"
                    : "Add to Cart"}
              </button>
            </div>

            {/* Buy Now */}
            <button
              disabled={product.stock === 0 || qty === 0}
              onClick={() => {
                const buyNowItem = {
                  productId: product?._id,
                  name: product?.name,
                  price: price,
                  original: original,
                  image: product?.image?.url || "/hero-honey-jar.webp",
                  qty: qty,
                  weight: selectedWeight,
                };
                sessionStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
                router.push("/checkout?buyNow=true");
              }}
              className="w-full h-10 font-semibold text-sm tracking-widest uppercase active:scale-95 border border-primary text-primary hover:bg-primary hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-4"
            >
              {product.stock === 0 ? "Out of Stock" : "Buy Now"}
            </button>

            {/* Trust badges */}
            <div className="flex gap-5 items-center p-4 pb-5 mb-6 border-b border-gray-600">
              <div className="flex items-center gap-2">
                <Image
                  src="https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/email-btn_ewnois.webp"
                  width={28}
                  height={28}
                  alt="contact-btn"
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
                <Link href="/contact" className="font-sans text-sm cursor-pointer">
                  Contact us
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/shipping-info_kn4ieo.webp"
                  width={28}
                  height={28}
                  alt="shipping-info-btn"
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
                <span className="text-sm font-sans">Shipping Info</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleShare}
              >
                <Image
                  src="https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/share-btn_kgel2l.webp"
                  width={28}
                  height={28}
                  alt="share-btn"
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
                <span className="text-sm font-sans">Share</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3 mb-5 border-b border-gray-600 pb-5">
              <div className="flex items-center gap-2">
                <Image
                  src="https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/fast-delivery_eqtnfe.webp"
                  width={24}
                  height={24}
                  alt="shipping-car"
                  className="text-gray-400"
                />
                <span className="text-xs font-sans text-gray-400">
                  Free shipping above 500 in Tamilnadu
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/open-box_da5vvy.webp"
                  width={24}
                  height={24}
                  alt="shipping-car"
                  className="text-gray-400"
                />
                <span className="text-xs font-sans text-gray-400">
                  Delivers in 2-3 working days
                </span>
              </div>
            </div>

            {/* Short description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {product?.description}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PRODUCT SPECIFICATIONS
        ══════════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-2xl text-white mb-6" style={serifItalic}>
            <span className="text-primary">Product</span> Specifications
          </h2>
          <div className="border border-gray-800 overflow-hidden">
            <div className="bg-[#1a1a1a] px-5 py-3">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                In The Box
              </span>
            </div>
            {specs.inTheBox.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 px-5 py-3 text-sm ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0d0d0d]"
                  }`}
              >
                <span className="text-gray-400">{row?.label}</span>
                <span className="text-white">{row?.value}</span>
              </div>
            ))}
            <div className="bg-[#1a1a1a] px-5 py-3 mt-1">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                General
              </span>
            </div>
            {specs.general.map((row, i) => (
              <div
                key={row?.label}
                className={`grid grid-cols-2 px-5 py-3 text-sm ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0d0d0d]"
                  }`}
              >
                <span className="text-gray-400">{row?.label}</span>
                <span className="text-white">{row?.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SHIPPING DETAILS
        ══════════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-2xl text-white mb-6" style={serifItalic}>
            <span className="text-primary">Shipping</span> Details
          </h2>
          <div className="flex border-b border-gray-800 mb-6">
            {["shipping", "returns"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSellerTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-all duration-200 border-b-2 -mb-px ${sellerTab === tab
                    ? "border-primary text-primary"
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
            <span className="text-primary">FAQ</span>
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
        <ShowReview
          product={{ ...product, reviews: localReviews }}
          localReviews={localReviews}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          handleReviewSubmit={handleReviewSubmit}
        />

        {/* ══════════════════════════════════════════════
            SIMILAR PRODUCTS
        ══════════════════════════════════════════════ */}
        {similarProducts.length > 0 && (
          <section id="similar-product-section">
            <h2 className="text-2xl text-white mb-8" style={serifItalic}>
              <span className="text-primary">Similar</span> Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {similarProducts.map((p) => (
                <ProductCard key={p._id.toString()} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
