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
                            className="object-contain "
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
                            className="inline-block active:scale-95 bg-primary hover:bg-secondary text-black font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors"
                        >
                            Read More
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
};