"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";
import ProductCard from "@/components/products/ProductCard";
import FAQItem from "@/components/products/FAQItem";
import ShowReview from "@/components/products/ShowReview";

/* ── helpers ── */
const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
};


/* ═══════════════════   MAIN PAGE         ══════════════════════════════════════════════════════ */
export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const [qty, setQty] = useState(1);
  const [sellerTab, setSellerTab] = useState("shipping");
  const [added, setAdded] = useState(false);
  const [localReviews, setLocalReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data.product);
        setSimilarProducts(data.similar || []);
        setLocalReviews(data.product.reviews || []);
        if (data.product.quantity) {
          setSelectedWeight(data.product.quantity);
        }
        if (data.product.stock === 0) {
          setQty(0);
        } else {
          setQty(1);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
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
        window.location.href = `/accounts/login?redirect=/products/${product._id}`;
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to add to cart");
        return;
      }

      // Sync local storage cart as fallback for other parts of the site
      if (data.cart) {
        const cart = data.cart.map(item => {
          const prod = item.product;
          return {
            id: item._id,
            productId: prod?._id || "",
            name: prod?.name || "",
            weight: item.weight,
            qty: item.qty,
            image: prod?.image?.url || "/hero-honey-jar.webp",
            price: price
          };
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      window.dispatchEvent(new Event("cartUpdate"));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Cart error:", err);
      alert("Failed to add item to cart");
    }
  };


  const handleReviewSubmit = async (review) => {
    try {
      const res = await fetch(`/api/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(review.rating),
          comment: review.text,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to submit review");
        return;
      }

      if (data.product) {
        setProduct(data.product);
        setLocalReviews(data.product.reviews || []);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Something went wrong while submitting the review");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Product not found"}</p>
          <Link href="/products" className="text-[#C8A84B] underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  const images = [];
  if (product.image?.url) images.push(product.image.url);
  if (product.image1?.url) images.push(product.image1.url);
  if (product.image2?.url) images.push(product.image2.url);
  if (images.length === 0) images.push("/hero-honey-jar.webp");
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

  const multiplier = product ? getMultiplier(selectedWeight, product.quantity) : 1.0;
  const price = product ? (product.discountPrice ?? product.price) * multiplier : 0;
  const original = product ? product.price * multiplier : 0;
  const discount = product && product.price > 0 && product.discountPrice ? Math.round((((product.price - (product.discountPrice ?? product.price)) / product.price) * 100)) : 0;

  const getWeightVal = (str) => {
    const num = parseFloat(str);
    const isKg = String(str).toLowerCase().includes("kg") || String(str).toLowerCase().includes("kilogram");
    return isKg ? num * 1000 : num;
  };
  const weightOptions = ["250g", "500g", "1kg"];
  const prodQtyNormalized = product?.quantity ? product.quantity.trim() : "";
  if (prodQtyNormalized && !weightOptions.some(w => w.toLowerCase() === prodQtyNormalized.toLowerCase())) {
    weightOptions.push(prodQtyNormalized);
  }
  weightOptions.sort((a, b) => getWeightVal(a) - getWeightVal(b));

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
            {product && product.stock <= 5 && product.stock > 0 && (
              <p className="text-amber-500 text-xs mb-3 font-semibold uppercase tracking-wider">
                Only {product.stock} items left in stock!
              </p>
            )}
            {product && product.stock === 0 && (
              <p className="text-red-500 text-xs mb-3 font-semibold uppercase tracking-wider">
                Out of Stock
              </p>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              {/* Qty control */}
              <div className="flex items-center border border-gray-700">
                <button
                  disabled={!product || product.stock === 0}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C8A84B] hover:bg-[#C8A84B]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-white font-semibold text-sm border-x border-gray-700">
                  {qty}
                </span>
                <button
                  disabled={!product || product.stock === 0}
                  onClick={() => setQty((q) => Math.min(product.stock || 0, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C8A84B] hover:bg-[#C8A84B]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-lg"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                disabled={!product || product.stock === 0 || qty === 0}
                onClick={handleAddToCart}
                className={`flex-1 h-10 font-semibold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${added
                  ? "bg-amber-400 text-white"
                  : "bg-[#C8A84B] hover:bg-[#b8973e] text-black"
                  }`}
              >
                {product && product.stock === 0 ? "Out of Stock" : added ? "✓ Added!" : "Add to Cart"}
              </button>
            </div>

            {/* Buy Now */}
            <button
              disabled={!product || product.stock === 0 || qty === 0}
              onClick={handleAddToCart}
              className="w-full h-10 font-semibold text-sm tracking-widest uppercase border border-[#C8A84B] text-[#C8A84B] hover:bg-[#C8A84B] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-4"
            >
              {product && product.stock === 0 ? "Out of Stock" : "Buy Now"}
            </button>



            {/* Trust badges */}
            <div className="flex gap-5 items-center p-4 pb-5 mb-6 border-b border-gray-600">
              <div className="flex items-center gap-2">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/email-btn_ewnois.webp'}
                  width={28}
                  height={28}
                  alt="contact-btn"
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
                <span className="font-sans text-sm">Contact us</span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/shipping-info_kn4ieo.webp'}
                  width={28}
                  height={28}
                  alt="shipping-info-btn"
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
                <span className="text-sm font-sans">Shipping Info</span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/share-btn_kgel2l.webp'}
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

            {/* Deleivery Details */}
            <div className="space-y-3 mb-5 border-b border-gray-600 pb-5">
              <div className="flex items-center gap-2">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/fast-delivery_eqtnfe.webp'}
                  width={24}
                  height={24}
                  alt="shipping-car"
                  className="text-gray-400"
                />
                <span className="text-xs font-sans text-gray-400">Free shipping above 500 in India</span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/open-box_da5vvy.webp'}
                  width={24}
                  height={24}
                  alt="shipping-car"
                  className="text-gray-400"
                />
                <span className="text-xs font-sans text-gray-400">Delivers in 2-4 working days</span>
              </div>
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
        <ShowReview
          product={product}
          localReviews={localReviews}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          handleReviewSubmit={handleReviewSubmit}
        />

        {/* ═══════════════     SIMILAR PRODUCTS   ══════════════════════════════════════════════ */}
        {similarProducts.length > 0 && (
          <section id="similar-product-section">
            <h2 className="text-2xl text-white mb-8" style={serifItalic}>
              <span className="text-[#C8A84B]">Similar</span> Products
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {similarProducts.map((p) => <ProductCard key={p._id.toString()} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
