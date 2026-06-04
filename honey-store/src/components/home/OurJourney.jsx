import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { serifItalic } from '@/config/staticData';


const OurJourney = () => {
    return (
        <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl text-center mb-12 font-semibold"
                    style={serifItalic}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary">Our</span> Journey
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
                            className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_30px_rgba(200,168,75,0.5)]"
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
    )
}

export default OurJourney