"use client";

import React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { TESTIMONIALS, serifItalic } from '@/config/staticData'
import { useTestimonials } from '@/hooks/useTestimonials'


const Testimonials = () => {
    const { currentIndex, goTo } = useTestimonials(TESTIMONIALS.length, 3000);

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
                    src="/honey-comb.webp"
                    fill
                    className="object-cover opacity-25 animate-pulse "
                    alt="overlay"
                />
            </div>

            <div className="mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 md:gap-36 items-center justify-between">
                    {/* Left — testimonial */}
                    <div>
                        <div className="text-primary text-6xl leading-none mb-3" style={{ fontFamily: "Georgia, serif" }}>
                            <motion.h2
                                className="text-3xl md:text-4xl mb-5 mt-5 md:mt-12 font-semibold"
                                style={serifItalic}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-primary">This is what</span> <span className='text-white'>they say</span>
                            </motion.h2>
                            “
                        </div>
                        <div className="relative min-h-[160px] md:min-h-[140px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className="text-gray-200 text-base leading-relaxed mb-6 italic">
                                        {TESTIMONIALS[currentIndex]?.text}
                                    </p>
                                    <p className="text-primary font-semibold text-sm mb-1">
                                        {TESTIMONIALS[currentIndex]?.name}
                                    </p>
                                    <p className="text-gray-600 text-xs mb-6">{TESTIMONIALS[currentIndex]?.role}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        {/* Dots */}
                        <div className="flex gap-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? "bg-primary" : "bg-gray-700 hover:bg-gray-500"
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