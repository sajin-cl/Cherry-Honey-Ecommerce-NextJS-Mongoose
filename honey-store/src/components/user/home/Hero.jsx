'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { serifItalic } from "@/config/staticData"
import { FaArrowRight } from "react-icons/fa"

const MotionImage = motion.create(Image);


export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-black">
            <Image
                src={"/honey-comb.webp"}
                fill
                className="object-cover animate-pulse"
                alt=""
                priority
                aria-hidden="true"
                quality={50}
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
                    <p className="text-gray-400 font-sans text-sm max-w-md mb-8 leading-relaxed italic">
                        Discover the finest 100% pure, raw honey sourced directly from India’s most pristine bee farms. Taste the uncompromised authenticity and embrace a healthier lifestyle with every golden drop delivered right to your doorstep.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            role="button"
                            href="/products"
                            className="w-full active:scale-95 bg-primary hover:bg-secondary text-black font-bold text-center text-xs py-4 tracking-[0.2em] uppercase transition-colors duration-200"
                        >
                            Shop Now
                        </Link>
                        <Link
                            role="button"
                            href="#featured-products"
                            className="w-full flex items-center justify-center gap-2 active:scale-95 border border-gray-600 text-gray-300 hover:border-primary hover:text-primary font-semibold text-center text-xs py-4 tracking-widest uppercase transition-colors duration-200"
                        >
                            View Products <FaArrowRight className="inline-block w-3 h-3" />
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT — bee image */}
                <motion.div
                    className="relative flex justify-center items-center order-1 md:order-2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    aria-hidden="true"
                >
                    <div className="relative w-full max-w-[520px] aspect-square">
                        <MotionImage
                            src="/bee.webp"
                            alt=""
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