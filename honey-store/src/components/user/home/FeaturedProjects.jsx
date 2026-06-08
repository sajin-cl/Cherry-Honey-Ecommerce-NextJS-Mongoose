"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { serifItalic } from "@/config/staticData"
import { FaArrowRight } from "react-icons/fa"

export default function FeaturedProjects({ featuredProducts }) {

    return (
        <section id="featured-products" className="pt-20 pb-10 bg-dark relative overflow-hidden min-h-screen">
            {/* Honey Comb Layer-1*/}
            <div className="absolute inset-0" aria-hidden="true">
                <Image
                    src="/honey-comb.webp"
                    fill
                    className="object-cover animate-pulse mask-fade"
                    alt=""
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-bl from-black/80 via-black/0 to-transparent" />
            </div>

            {/* Honey Drip Layer-2 */}
            <div aria-hidden="true" className="absolute top-0 right-0 left-0 w-full pointer-events-none">
                <Image
                    src="/honey-dripv1.webp"
                    alt=""
                    width={2000}
                    height={1000}
                    priority
                    className="w-full h-30 md:h-40 object-cover mix-blend-screen contrast-125 brightness-100"
                />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 2 }}>
                <motion.h2
                    className="text-center md:text-start text-3xl md:text-4xl my-6 z-50 font-semibold italic"
                    style={serifItalic}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary">Featured</span> Products
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
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
                                <Link href={`/products/${product.slug || productId}`} className="group">
                                    <div className="transition-all duration-300 overflow-hidden">
                                        <div className="relative h-[350px] bg-black flex items-center justify-center">
                                            <Image
                                                src={imgUrl}
                                                alt={product?.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                                            />
                                        </div>
                                        <div className="p-5 flex justify-between items-center">
                                            <div>
                                                <h3 className="text-white text-base md:text-sm font-medium mb-1 truncate uppercase group-hover:text-amber-300">
                                                    {product?.name}
                                                </h3>
                                                <h4 className="text-gray-400 text-xs mb-1 truncate">
                                                    {product?.category}
                                                </h4>
                                            </div>
                                            <button className="text-white text-base md:text-sm font-bold cursor-pointer px-3 py-1 border border-gray-600 group-hover:bg-gray-900 rounded-full">
                                                {priceText}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    className="flex justify-baseline md:justify-end mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    role="link"
                >
                    <Link
                        href="/products"
                        className="text-primary hover:text-amber-300  font-bold text-sm   tracking-[0.1em] uppercase transition-all duration-300 active:scale-95"
                    >
                        View All Products <FaArrowRight className="inline-block w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
};
