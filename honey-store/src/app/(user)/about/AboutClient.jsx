"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 400,
};



export default function AboutClient() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full relative">

          {/* LEFT CONTENT */}
          <motion.div
            className="z-10 order-2 md:order-1"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-bold">
              Experience the Purity
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Crafted With Passion,<br />
              <span className="text-primary" style={serifItalic}>
                Harvested From Nature
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
              At Cherrys Honey, we work closely with nature and our beekeepers to bring you 100% natural, raw, and ethically harvested honey straight from organic bee farms. Taste the purity, feel the difference, and indulge in a healthier, golden lifestyle.
            </p>
            <div className="flex gap-4 ">
              <Link
                href="/products"
                className="flex items-center shrink-0 bg-primary hover:bg-secondary text-black font-bold text-xs px-4 md:px-8 py-4 tracking-[0.2em] uppercase transition-all duration-300 text-center"
              >
                Shop Honey
              </Link>

              <a
                href="#our-journey"
                className="flex-1 border border-gray-600 text-gray-300 hover:border-primary hover:text-primary font-semibold text-xs px-4 md:px-8 py-4 tracking-[0.2em] uppercase transition-all duration-300 text-center"
              >
                Our Honey Farms
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative flex justify-center items-center order-1 md:order-2"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(200,168,75,0.15)] group">
              <Image
                src="/about-hero-honey.webp"
                alt="Premium raw honey dripping from a wooden dipper"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 500px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          CORE VALUES SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#050505] z-10">

        <div className="absolute top-0 right-0 left-0 w-full pointer-events-none" aria-hidden="true">
          <Image
            src="/honey-dripv1.webp"
            alt=""
            width={2000}
            height={1000}
            priority
            className="w-full h-30 md:h-40 object-cover mix-blend-screen contrast-125 brightness-100"
          />
        </div>

        <Image
          src={"/honey-comb.webp"}
          fill
          className="object-cover animate-pulse mask-fade"
          alt=""
          aria-hidden="true"
          priority
          quality={50}
        />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-bold mt-12">
              Our Promise
            </p>
            <h2 className="text-3xl md:text-5xl text-white font-light" style={serifItalic}>
              Uncompromising <span className="text-primary">Excellence</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <motion.div
              className="bg-[#111111]/60 backdrop-blur-md border border-gray-800 hover:border-primary/40 p-8 rounded-2xl text-center transition-all duration-500 hover:-translate-y-2 group"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >

              <div className="flex justify-center">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/lotus_r4kwto.webp'}
                  alt="lotus png"
                  width={60}
                  height={60}
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                Pure Ingredients
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                100% natural, raw, and unpasteurized honey with zero additives, preservatives, or artificial sweeteners. Straight from the hive, exactly as nature created it.
              </p>
            </motion.div>

            {/* Value Card 2 */}
            <motion.div
              className="bg-[#111111]/60 backdrop-blur-md border border-gray-800 hover:border-primary/40 p-8 rounded-2xl text-center transition-all duration-500 hover:-translate-y-2 group"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex justify-center">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/leaf_gelssq.webp'}
                  alt="lotus png"
                  width={60}
                  height={60}
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                Sustainable Beekeeping
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We prioritize the health and well-being of the bees above all. Supporting ethical harvesting methods that safeguard vital ecosystems and local biodiversity.
              </p>
            </motion.div>

            {/* Value Card 3 */}
            <motion.div
              className="bg-[#111111]/60 backdrop-blur-md border border-gray-800 hover:border-primary/40 p-8 rounded-2xl text-center transition-all duration-500 hover:-translate-y-2 group"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex justify-center">
                <Image
                  src={'https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/tick_fuix7c.webp'}
                  alt="lotus png"
                  width={60}
                  height={60}
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                Premium Quality
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every batch undergoes extensive testing for absolute purity, exquisite texture, and premium taste, ensuring the highest standards of culinary honey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TIMELINE SECTION (A STORY IN EVERY DROP)
      ══════════════════════════════════════════════ */}
      <section id="our-journey" className="relative py-24 bg-black z-10 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-0 right-0 w-full h-[600px] bg-radial-gradient from-primary/5 to-transparent -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            className="text-center mb-20"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-bold">
              Our Process
            </p>
            <h2 className="text-3xl md:text-5xl text-white font-light" style={serifItalic}>
              A Story <span className="text-primary">In Every Drop</span>
            </h2>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center Line for desktop */}
            <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/5 via-primary/40 to-primary/5 -translate-x-1/2 hidden md:block" />

            {/* Row 1 - Wildflowers */}
            <div className="relative grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-24 md:mb-32">
              {/* Central Circle Badge for desktop */}
              <div className="absolute left-[50%] -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-primary  items-center justify-center z-20 shadow-[0_0_15px_rgba(200,168,75,0.4)] hidden md:flex font-serif text-sm text-primary">
                01
              </div>

              {/* Left Content */}
              <motion.div
                className="order-2 md:order-1 text-right md:pr-12"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
              >
                <div className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1 tracking-widest uppercase mb-4 rounded-full font-bold md:hidden">
                  Step 01
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  01 <span className="text-primary" style={serifItalic}>The Wildflowers</span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg ml-auto">
                  Our journey begins in protected fields of pristine, wild organic blossoms. Our honey bees forage freely in these wild environments, gathering pure premium nectar. This beautiful mixture of natural wildflowers yields the uniquely complex, multi-floral taste profile that makes Cherrys Honey legendary.
                </p>
              </motion.div>

              {/* Right Image */}
              <motion.div
                className="order-1 md:order-2 relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden border border-gray-800 shadow-xl group"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
              >
                <Image
                  src="/bee-sunflower.webp"
                  alt="Honey bee collecting nectar on a sunflower"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>

            {/* Row 2 - The Alchemists */}
            <div className="relative grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-24 md:mb-32">
              {/* Central Circle Badge for desktop */}
              <div className="absolute left-[50%] -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-primary  items-center justify-center z-20 shadow-[0_0_15px_rgba(200,168,75,0.4)] hidden md:flex font-serif text-sm text-primary">
                02
              </div>

              {/* Left Image (Desktop Left) */}
              <motion.div
                className="order-1 relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden border border-gray-800 shadow-xl group"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
              >
                <Image
                  src="https://res.cloudinary.com/ddchr0sbn/image/upload/f_auto,q_auto/honey-jar-bees_tg9vjo.webp"
                  alt="Raw organic honey jar in nature"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Right Content (Desktop Right) */}
              <motion.div
                className="order-2 text-left md:pl-12"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
              >
                <div className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1 tracking-widest uppercase mb-4 rounded-full font-bold md:hidden">
                  Step 02
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  02 <span className="text-primary" style={serifItalic}>The Alchemists</span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                  Inside the busy and secure apiaries, our hives serve as biological alchemist labs. The bees digest and share the nectar, enriching it with raw enzymes. They systematically fan their wings to evaporate water content, naturally ripening the nectar into a rich, super-concentrated amber honey.
                </p>
              </motion.div>
            </div>

            {/* Row 3 - The Harvest */}
            <div className="relative grid md:grid-cols-2 gap-12 md:gap-24 items-center">
              {/* Central Circle Badge for desktop */}
              <div className="absolute left-[50%] -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-primary  items-center justify-center z-20 shadow-[0_0_15px_rgba(200,168,75,0.4)] hidden md:flex font-serif text-sm text-primary">
                03
              </div>

              {/* Left Content */}
              <motion.div
                className="order-2 md:order-1 text-right md:pr-12"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
              >
                <div className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1 tracking-widest uppercase mb-4 rounded-full font-bold md:hidden">
                  Step 03
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  03 <span className="text-primary" style={serifItalic}>The Harvest</span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg ml-auto">
                  When the honeycombs are perfectly capped, we harvest. Using cold centrifugal extraction methods, we gently spin the honey out without ever applying heat. This precise artisan method keeps the active enzymes, organic pollen, and distinct delicate flavor compounds fully intact, from our farm directly to your table.
                </p>
              </motion.div>

              {/* Right Image */}
              <motion.div
                className="order-1 md:order-2 relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden border border-gray-800 shadow-xl group"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9 }}
              >
                <Image
                  src="/bees-honeycomb.webp"
                  alt="artisan honeycombs rich with honey"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VIDEO BANNER SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative py-32 bg-black z-10 overflow-hidden text-center flex items-center justify-center">
        {/* Banner background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bee-farm-misty.webp"
            alt="Golden sunrise over a misty bee farm"
            fill
            className="object-cover transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* pulsating Play Button */}
            <motion.button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 rounded-full bg-primary hover:bg-secondary flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_0_30px_rgba(200,168,75,0.6)] mb-8 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(200, 168, 75, 0.4)",
                  "0 0 40px rgba(200, 168, 75, 0.7)",
                  "0 0 20px rgba(200, 168, 75, 0.4)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <svg className="w-8 h-8 text-black ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>

            <h2 className="text-4xl md:text-5xl text-white font-light mb-6" style={serifItalic}>
              Straight From <span className="text-primary">The Hive</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
              Experience the breathtaking journey of our organic honey production — from the pristine apiaries nestled in wild mountain blossom valleys directly to your kitchen table.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VIDEO MODAL OVERLAY
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl aspect-video bg-[#111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white hover:text-primary flex items-center justify-center transition-colors duration-200 z-10 border border-gray-800"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Ambient video placeholder / YouTube Embed */}
              <iframe
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/l06uRqnEcn8?autoplay=1&mute=1"
                title="Cherrys Honey Story Journey"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
