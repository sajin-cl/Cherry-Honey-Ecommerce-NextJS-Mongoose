'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { serifItalic } from "@/config/staticData"

const MotionImage = motion.create(Image);


export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-black">
            <Image
                src={"/honey-comb.webp"}
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
                    <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">Pure &amp; Natural</p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6" style={serifItalic}>
                        Crafted by Bees,<br />
                        <span className="text-primary">Perfected by Nature</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
                        We bring you the finest honey sourced from the purest bee farms.
                        Experience the natural goodness, taste the authenticity, and
                        embrace a healthier lifestyle with every drop.
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                        <Link
                            href="/products"
                            className="inline-block active:scale-95 bg-primary hover:bg-secondary text-black font-bold text-xs px-8 py-4 tracking-[0.2em] uppercase transition-colors duration-200"
                        >
                            Shop Now
                        </Link>
                        <Link
                            href="#featured-products"
                            className="inline-block active:scale-95 border border-gray-600 text-gray-300 hover:border-primary hover:text-primary font-semibold text-xs px-8 py-4 tracking-widest uppercase transition-colors duration-200"
                        >
                            View Products →
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
                            src="/bee.webp"
                            alt="Honey bee over honey bowl"
                            fill
                            priority
                            dragMomentum={false}
                            sizes="(max-width: 768px) 100vw, 520px"
                            className="object-cover scale-120"
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
    )
};