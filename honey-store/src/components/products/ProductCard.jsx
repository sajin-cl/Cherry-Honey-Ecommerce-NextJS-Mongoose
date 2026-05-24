import { itemVariants } from "@/animation/globalVariants";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// 1. Old Classic Dot with Glow - Ultra Smooth
const GoldDot = ({ delay, left, top, size }) => (
    <motion.div
        className="absolute rounded-full bg-[#d3b867] pointer-events-none"
        style={{ 
            left, 
            top, 
            width: size, 
            height: size, 
            boxShadow: "0 0 10px 3px rgba(211, 184, 103, 0.8), 0 0 4px 1px #fff",
            zIndex: 5,
            willChange: "transform, opacity" // Enforces hardware GPU rendering
        }}
        initial={{ opacity: 0, scale: 0, y: 0 }}
        animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1.2, 1, 0],
            y: [0, -50, -100] 
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: delay,
            ease: "linear" // Keeps the movement flat and lag-free
        }}
    />
);

// 2. Premium 4-Corner Glint Star - Smooth Scaling
const GlintStar = ({ delay, left, top, size }) => (
    <motion.div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{ 
            left, 
            top, 
            width: size, 
            height: size, 
            zIndex: 5,
            willChange: "transform, opacity" // Forced GPU cache acceleration
        }}
        initial={{ opacity: 0, scale: 0, rotate: 0, y: 0 }}
        animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1.3, 1, 0],
            rotate: 90, // Reduced to a simple single clean vector spin
            y: [0, -55, -110] 
        }}
        transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: delay,
            ease: "linear" // Linear avoids complex calculations midway
        }}
    >
        <div 
            className="w-full h-full bg-gradient-to-r from-[#fff] via-[#d3b867] to-[#A1822A]"
            style={{
                boxShadow: "0 0 12px 2px rgba(211, 184, 103, 0.9)",
                clipPath: "polygon(50% 0%, 63% 38%, 100% 50%, 63% 62%, 50% 100%, 37% 62%, 0% 50%, 37% 38%)"
            }}
        />
    </motion.div>
);

export default function ProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);
    const price = product?.discountPrice ?? product.price;
    const original = product?.price;
    const img = product?.image?.url || "/hero-honey-jar.webp";

    const dotsList = [
        { delay: 0, left: "15%", top: "70%", size: "5px" },
        { delay: 0.4, left: "45%", top: "50%", size: "4px" },
        { delay: 0.8, left: "75%", top: "65%", size: "6px" },
    ];

    const starsList = [
        { delay: 0.2, left: "30%", top: "35%", size: "12px" },
        { delay: 0.6, left: "85%", top: "40%", size: "10px" },
        { delay: 1.0, left: "20%", top: "20%", size: "14px" },
    ];

    return (
        <motion.div variants={itemVariants}>
            <Link 
                href={`/products/${product?._id}`} 
                className="group block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative overflow-hidden bg-[#111] rounded-4xl border-x border-gray-800 hover:border-[#C8A84B]/70 transition-all duration-500 group-hover:-translate-y-1">
                    
                    <div className="relative h-[350px] bg-black flex items-center justify-center overflow-hidden isolation-isolate">
                        
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                            <AnimatePresence>
                                {isHovered && (
                                    <>
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.4 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,168,75,0.45)_0%,transparent,65%)]"
                                        />
                                        
                                        {dotsList.map((dot, i) => (
                                            <GoldDot key={`dot-${i}`} {...dot} />
                                        ))}

                                        {starsList.map((star, i) => (
                                            <GlintStar key={`star-${i}`} {...star} />
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative w-full h-full z-10 pointer-events-none mix-blend-screen">
                            <Image
                                src={img}
                                alt={product?.name || "Product"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                    </div>

                    <div className="p-4 relative z-20 bg-[#111] border-t border-gray-900">
                        <h3 className="text-white text-sm mb-1 truncate transition-colors group-hover:text-[#C8A84B]">
                            {product?.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[#C8A84B] group-hover:text-white text-sm font-semibold">
                                ₹{price.toFixed(2)}
                            </span>
                            {product.discountPrice && (
                                <span className="text-gray-500 text-xs line-through">
                                    ₹{original.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}