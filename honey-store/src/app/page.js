"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 400,
};

const products = [
  { id: 1, name: "Pure Honey", price: "₹549.99", image: "/hero-honey-jar.png" },
  { id: 2, name: "Forest Honey", price: "₹649.99", image: "/honey-jar-bees.png" },
  { id: 3, name: "Wildflower Honey", price: "₹749.99", image: "/hero-honey-jar.png" },
  { id: 4, name: "Organic Honey", price: "₹599.99", image: "/honey-jar-bees.png" },
];

const testimonials = [
  {
    text: "A completely change in my way of experiencing honey. The taste is pure, rich and absolutely divine. I can never go back to store-bought honey again!",
    name: "Amanda Muingo",
  },
  {
    text: "Best honey I have ever tasted. The quality is unmatched and you can truly taste the difference. Highly recommend Queen Honey to everyone!",
    name: "Rajesh Kumar",
  },
  {
    text: "From the packaging to the taste, everything about Queen Honey screams premium quality. My entire family loves it!",
    name: "Priya Sharma",
  },
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════
    HERO SECTION
══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-black">

        {/* Honeycomb pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="honeycomb"
                x="0"
                y="0"
                width="56"
                height="100"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(2)"
              >
                <path
                  d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                  fill="none"
                  stroke="#C8A84B"
                  strokeWidth="0.5"
                />
                <path
                  d="M28 0L28 -34L56 -50L84 -34L84 0L56 16L28 0"
                  fill="none"
                  stroke="#C8A84B"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#honeycomb)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT CONTENT */}
          <div className="z-10">
            <p className="text-[#C8A84B] text-sm tracking-widest uppercase mb-4">
              Pure & Natural
            </p>

            <h1
              className="text-5xl md:text-7xl text-white leading-tight mb-6"
              style={serifItalic}
            >
              Crafted by Bees,
              <br />
              <span className="text-[#C8A84B]">
                Perfected by Nature
              </span>
            </h1>

            <p className="text-gray-400 text-base max-w-lg mb-8 leading-relaxed">
              We bring you the finest honey sourced from the purest bee farms.
              Experience the natural goodness, taste the authenticity, and
              embrace a healthier lifestyle with every drop.
            </p>

            <Link
              href="/products"
              className="inline-block bg-[#C8A84B] hover:bg-[#b8973e] text-black font-semibold text-sm px-8 py-4 tracking-wide transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-[520px] aspect-square">
              <Image
                src="/hero-bee.png"
                alt="honey-bee"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 520px"
                className="object-contain scale-90 md:scale-100 drop-shadow-[0_0_60px_rgba(200,168,75,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Honey drip border */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q60,80 120,0 Q180,60 240,0 Q300,70 360,0 Q420,50 480,0 Q540,80 600,0 Q660,60 720,0 Q780,70 840,0 Q900,50 960,0 Q1020,80 1080,0 Q1140,60 1200,0 Q1260,70 1320,0 Q1380,50 1440,0 V0 H0 Z"
              fill="#C8A84B"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl text-center mb-16" style={serifItalic}>
            <span className="text-[#C8A84B]">Featured</span> Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800 hover:border-[#C8A84B]/50 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative h-56 bg-black flex items-center justify-center p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-white text-sm font-medium mb-1">{product.name}</h3>
                    <p className="text-[#C8A84B] font-bold">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/products"
              className="bg-[#C8A84B] hover:bg-[#b8973e] text-black font-semibold text-sm px-8 py-3.5 tracking-wide transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/bee-honeycomb.png"
              alt="Bee on honeycomb"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right text */}
          <div>
            <h2 className="text-4xl md:text-5xl mb-6" style={serifItalic}>
              <span className="text-[#C8A84B]">Our</span> Story
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We believe in purity and authenticity. Our beekeeping traditions span generations, ensuring every jar of honey is crafted with care and dedication to quality.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Each drop comes from ethically managed apiaries where bees thrive in natural, chemical-free environments, making our honey truly special and delicious.
            </p>
            <Link
              href="/about"
              className="inline-block border border-[#C8A84B] text-[#C8A84B] hover:bg-[#C8A84B] hover:text-black font-semibold text-sm px-8 py-3.5 tracking-wide transition-colors duration-200"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl mb-16" style={serifItalic}>
            <span className="text-[#C8A84B]">This is what</span> they say
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left testimonial */}
            <div>
              {/* Quote mark */}
              <div className="text-[#C8A84B] text-7xl leading-none mb-4" style={{ fontFamily: "Georgia, serif" }}>
                &#8220;&#8220;
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                {testimonials[currentTestimonial].text}
              </p>
              <p className="text-[#C8A84B] font-semibold text-base mb-8">
                {testimonials[currentTestimonial].name}
              </p>
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${i === currentTestimonial ? "bg-[#C8A84B]" : "bg-gray-600 hover:bg-gray-400"
                      }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="relative h-80 md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/bee-sunflower.png"
                alt="Bee on sunflower"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OUR JOURNEY
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl text-center mb-16" style={serifItalic}>
            <span className="text-[#C8A84B]">Our</span> Journey
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden group">
              <Image
                src="/bees-honeycomb.png"
                alt="Bees working on honeycomb"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden group">
              <Image
                src="/honeycomb-branch.png"
                alt="Natural honeycomb on branch"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
