"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/config/staticData"

const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 400,
};

const MotionImage = motion(Image);


export default function HomeClient({ featuredProducts }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentTestimonial]);

  return (
    <div className="min-h-screen bg-black text-white">
    

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-black">
        <Image
          src={"/honey-comb.png"}
          fill
          className="object-cover animate-pulse"
          alt="honey-comb"
          priority
        />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center w-full py-16 z-10">
          {/* LEFT CONTENT */}
          <motion.div
            className="z-10 order-2 md:order-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
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
          </motion.div>

          {/* RIGHT — bee image */}
          <motion.div
            className="relative flex justify-center items-center order-1 md:order-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[520px] aspect-square">
              <MotionImage
                src="/bee.png"
                alt="Honey bee over honey bowl"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 520px"
                className="object-contain scale-120"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  duration: 1.2
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════ */}

      <section className="py-20 bg-dark relative overflow-hidden min-h-screen">
        {/* Honey Comb Layer-1*/}
        <div className="absolute inset-0">
          <Image
            src="/honey-comb.png"
            fill
            className="object-cover animate-pulse mask-fade"
            alt="overlay"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-black/80 via-black/0 to-transparent" />
        </div>

        {/* Honey Drip Layer-2 */}
        <div className="absolute top-0 right-0 left-0 w-full pointer-events-none">
          <Image
            src="/honey-dripv1.webp"
            alt="Honey drip"
            width={2000}
            height={1000}
            priority
            className="w-full h-30 md:h-40 object-cover mix-blend-screen contrast-125 brightness-100"
          />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 2 }}>
          <motion.h2
            className="text-3xl md:text-4xl mb-12 z-50 md:mt-12"
            style={serifItalic}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A84B]">Featured</span> Products
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {featuredProducts.map((product) => {
              const productId = product._id || product.id;
              const priceVal = product.discountPrice ?? product.price;
              const priceText = typeof priceVal === "number" ? `₹${priceVal.toFixed(2)}` : priceVal;
              const imgUrl = product.image?.url || product.image || "/hero-honey-jar.webp";
              return (
                <motion.div
                  key={productId}
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                  }}
                >
                  <Link href={`/products/${productId}`} className="group">
                    <div className="bg-[#111] border border-gray-800 hover:border-[#C8A84B]/50 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
                      <div className="relative h-52 bg-black flex items-center justify-center">
                        <Image
                          src={imgUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 border-t border-gray-800">
                        <h3 className="text-white text-sm font-medium mb-1 truncate">{product.name}</h3>
                        <p className="text-[#C8A84B] text-sm font-bold">{priceText}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="flex justify-end mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/products"
              className="bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════════ */}
      <section className="relative py-0 bg-black overflow-hidden">

        {/* background layer */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <Image
            src="/honey-comb.png"
            fill
            className="object-cover animate-pulse"
            alt="bg"
          />
        </div>
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Left — dripping bee image */}
            <motion.div
              className="relative h-80 md:h-[440px] flex items-center justify-center"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/two-bees.webp"
                alt="Two Honey bee"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_0_60px_rgba(200,168,75,0.25)]"
              />
            </motion.div>

            {/* Right text */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
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
                href={'/about'}
                className="inline-block bg-[#C8A84B] hover:bg-[#b8973e] text-black font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors"
              >
                Read More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0a0a0a] relative">
        <div className="absolute top-0 right-0 left-0 w-full z-30 pointer-events-none">
          <Image
            src="/honey-dripv1.webp"
            alt="Honey drip"
            width={2000}
            height={1000}
            priority
            className="w-full h-30 md:h-40 object-cover mix-blend-screen contrast-125 brightness-100 "
          />

        </div>

        {/* background layer */}
        <div className="absolute inset-0 z-30 pointer-events-none mask-fade">
          <Image
            src="/honey-comb.png"
            fill
            className="object-cover opacity-25 animate-pulse "
            alt="overlay"
          />
        </div>


        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl mb-12 md:mt-12"
            style={serifItalic}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A84B]">This is what</span> they say
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — testimonial */}
            <div>
              <div className="text-[#C8A84B] text-6xl leading-none mb-3" style={{ fontFamily: "Georgia, serif" }}>
                &#8220;&#8220;
              </div>
              <div className="relative min-h-[160px] md:min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-gray-300 text-base leading-relaxed mb-6 italic">
                      {TESTIMONIALS[currentTestimonial].text}
                    </p>
                    <p className="text-[#C8A84B] font-semibold text-sm mb-1">
                      {TESTIMONIALS[currentTestimonial].name}
                    </p>
                    <p className="text-gray-600 text-xs mb-6">{TESTIMONIALS[currentTestimonial].role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
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
            <motion.div
              className="relative h-72 md:h-[380px] bg-[#111] border border-gray-800 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/hero-bee.webp"
                alt="Bee with honey"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover aspect-square p-6 hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OUR JOURNEY
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl text-center mb-12"
            style={serifItalic}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A84B]">Our</span> Journey
          </motion.h2>

          {/* Full-width banner image with play overlay */}
          <motion.div
            className="relative w-full h-72 md:h-[420px] overflow-hidden group border border-gray-800"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/hero-bee.webp"
              alt="Our bee journey"
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full bg-[#C8A84B]/90 hover:bg-[#C8A84B] flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_30px_rgba(200,168,75,0.5)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
