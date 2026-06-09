"use client";

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { serifItalic } from '@/config/staticData'


export default function OurStory() {
    return (
        <section className="relative py-0 bg-black overflow-hidden">
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left — dripping bee image */}
                    <motion.div
                        className="relative h-96 md:h-[440px] flex items-center justify-center"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/two-bees.webp"
                            alt="Two Honey bees sharing honey"
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-contain"
                            loading="lazy"
                        />
                    </motion.div>

                    {/* Right text */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl mb-6 font-semibold" style={serifItalic}>
                            <span className="text-primary">Our</span> Story
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-4 text-sm italic font-sans">
                            We partner directly with trusted Indian beekeepers to bring you 100% pure, raw honey crafted with deep care. From our hives straight to your home, experience the rich, authentic sweetness of nature's finest gift in every single drop.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8 text-sm italic font-sans">
                            Each jar is a labor of love, ethically sourced from pristine, chemical-free environments across the country. We are proud to deliver unadulterated, organic honey to families all over India—just the way nature intended.
                        </p>
                        <Link
                            href={'/about'}
                            className="inline-block active:scale-95 rounded-full border-y border-primary hover:border-secondary text-primary font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors"
                        >
                            Read Our Full Story
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
};