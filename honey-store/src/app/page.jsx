"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion'
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 400,
};

const MotionImage = motion(Image)

const products = [
  { id: 1, name: "Honey", price: "₹549.97", image: "/hero-honey-jar.png" },
  { id: 2, name: "Honey", price: "₹249.95", image: "/honey-jar-bees.png" },
  { id: 3, name: "Honey", price: "₹749.95", image: "/hero-honey-jar.png" },
];

const testimonials = [
  {
    text: "A completely change in my way of experiencing honey. The taste is pure, rich and absolutely divine. I can never go back to store-bought honey again!",
    name: "Amanda Muingo",
    role: "Buyer",
  },
  {
    text: "Best honey I have ever tasted. The quality is unmatched and you can truly taste the difference. Highly recommend Cherry Honey to everyone!",
    name: "Rajesh Kumar",
    role: "Regular Customer",
  },
  {
    text: "From the packaging to the taste, everything about Cherry Honey screams premium quality. My entire family loves it!",
    name: "Priya Sharma",
    role: "Loyal Customer",
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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-black">
        <Image
          src={'/honey-comb.png'}
          fill
          className="object-cover animate-pulse"
          alt=""
        />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center w-full py-16 z-10">
          {/* LEFT CONTENT */}
          <div className="z-10 order-2 md:order-1">
            <p className="text-[#C8A84B] text-xs tracking-[0.3em] uppercase mb-5">Pure &amp; Natural</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6" style={serifItalic}>
              Crafted by Bees,<br />
              <span className="text-[#C8A84B]">Perfected by Nature</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
              We bring you the finest honey sourced from the purest bee farms.
              Experience the natural goodness, taste the authenticity, and
              embrace a healthier lifestyle with every drop.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/products"
                className="inline-block bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-xs px-8 py-4 tracking-[0.2em] uppercase transition-colors duration-200"
              >
                Shop Now
              </Link>
              <Link
                href="/products"
                className="inline-block border border-gray-600 text-gray-300 hover:border-[#C8A84B] hover:text-[#C8A84B] font-semibold text-xs px-8 py-4 tracking-widest uppercase transition-colors duration-200"
              >
                View Products
              </Link>
            </div>
          </div>

          {/* RIGHT — bee image */}
          <div className="relative flex justify-center items-center order-1 md:order-2">
            <div className="relative w-full max-w-[520px] aspect-square">
              <MotionImage
                src="/bee.png"
                alt="Honey bee over honey bowl"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 520px"
                className="object-contain scale-120"
                initial={{ x: 80, opacity: 0.01 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 4,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-dark relative overflow-hidden min-h-screen">


        {/* Background Image */}
        <div >

          <Image
            src={'/honey-comb.png'}
            fill
            className="object-cover animate-pulse "
            alt="overlay"
            sizes='full'
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/60" style={{ zIndex: 1 }} />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 2 }}>

          <h2 className="text-3xl md:text-4xl mb-12" style={serifItalic}>
            <span className="text-[#C8A84B]">Featured</span> Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/50 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-52 bg-black flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-800">
                    <h3 className="text-white text-sm font-medium mb-1">{product.name}</h3>
                    <p className="text-[#C8A84B] text-sm font-bold">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <Link
              href="/products"
              className="bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════════ */}
      <section className="relative py-0 bg-black overflow-hidden">
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Left — dripping bee image */}
            <div className="relative h-80 md:h-[440px] flex items-center justify-center">
              <Image
                src="/two-bees.png"
                alt="Two Honey bee"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_0_60px_rgba(200,168,75,0.25)]"
              />
            </div>

            {/* Right text */}
            <div>
              <h2 className="text-3xl md:text-5xl mb-6" style={serifItalic}>
                <span className="text-[#C8A84B]">Our</span> Story
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                We work closely with nature and our beekeepers to bring and create a gift of our honey crafted from care
                and what to experience the taste, rich all beehives, and a world of the big sweetness you can taste in every drop.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                Each jar is a labour of love, ethically sourced from hives that thrive in pristine, chemical-free environments —
                giving you honey the way nature intended.
              </p>
              <Link
                href="/about"
                className="inline-block bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0a0a0a] relative">
        <Image
          src={'/honey-comb.png'}
          fill
          className="object-cover opacity-25 animate-pulse"
          alt="overlay"
        />

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl mb-12" style={serifItalic}>
            <span className="text-[#C8A84B]">This is what</span> they say
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — testimonial */}
            <div>
              <div className="text-[#C8A84B] text-6xl leading-none mb-3" style={{ fontFamily: "Georgia, serif" }}>
                &#8220;&#8220;
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-6 italic">
                {testimonials[currentTestimonial].text}
              </p>
              <p className="text-[#C8A84B] font-semibold text-sm mb-1">
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-gray-600 text-xs mb-6">{testimonials[currentTestimonial].role}</p>
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${i === currentTestimonial ? "bg-[#C8A84B]" : "bg-gray-700 hover:bg-gray-500"
                      }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right — bee image */}
            <div className="relative h-72 md:h-[380px] bg-[#111] border border-gray-800 overflow-hidden">
              <Image
                src="/hero-bee.png"
                alt="Bee with honey"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover aspect-square p-6 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OUR JOURNEY
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-center mb-12" style={serifItalic}>
            <span className="text-[#C8A84B]">Our</span> Journey
          </h2>

          {/* Full-width banner image with play overlay */}
          <div className="relative w-full h-72 md:h-[420px] overflow-hidden group">
            <Image
              src="/hero-bee.png"
              alt="Our bee journey"
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#C8A84B]/90 hover:bg-[#C8A84B] flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_30px_rgba(200,168,75,0.5)]">
                <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}