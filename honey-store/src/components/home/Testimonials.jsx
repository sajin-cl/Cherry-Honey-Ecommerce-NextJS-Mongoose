"use client";

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { TESTIMONIALS } from '@/config/staticData'

const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 400,
};

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // 1. this function forward to next testimonials
    const nextTestimonial = useCallback(() => {
        setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, []);

    // 2. this function change testimonial based on index
    useEffect(() => {
        const timer = setInterval(nextTestimonial, 3000);
        return () => clearInterval(timer); 
    }, [nextTestimonial]);

    // 3. this function change testimonial when user click on dot
    const handleDotClick = (index) => {
        setCurrentTestimonial(index);
    };

    return (
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

            <div className="mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 md:gap-36 items-center justify-between">
                    {/* Left — testimonial */}
                    <div>
                        <div className="text-[#C8A84B] text-6xl leading-none mb-3" style={{ fontFamily: "Georgia, serif" }}>
                            <motion.h2
                                className="text-3xl md:text-4xl mb-5 mt-5 md:mt-12"
                                style={serifItalic}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-[#C8A84B]">This is what</span> <span className='text-white'>they say</span>
                            </motion.h2>
                            ““
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
                                        {TESTIMONIALS[currentTestimonial]?.text}
                                    </p>
                                    <p className="text-[#C8A84B] font-semibold text-sm mb-1">
                                        {TESTIMONIALS[currentTestimonial]?.name}
                                    </p>
                                    <p className="text-gray-600 text-xs mb-6">{TESTIMONIALS[currentTestimonial]?.role}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        {/* Dots */}
                        <div className="flex gap-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleDotClick(i)}
                                    className={`w-3 h-3 rounded-full transition-colors ${i === currentTestimonial ? "bg-[#C8A84B]" : "bg-gray-700 hover:bg-gray-500"
                                        }`}
                                    aria-label={`Testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right — bee image */}
                    <motion.div
                        className="relative h-72 md:h-[380px] w-full md:w-[500px] bg-[#111] border border-gray-800 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/hero-bee.webp"
                            alt="Bee with honey"
                            fill
                            className="object-cover aspect-square p-6 hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;