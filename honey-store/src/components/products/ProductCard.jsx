import { itemVariants } from "@/animation/globalVariants";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"

export default function ProductCard({ product }) {
    const price = product?.discountPrice ?? product.price;
    const original = product?.price;
    const img = product?.image?.url || "/hero-honey-jar.webp";

    return (
        <motion.div variants={itemVariants}>
            <Link href={`/products/${product?._id}`} className="group block">
                {/* ADDED relative and overflow-hidden HERE */}
                <div className="relative overflow-hidden bg-[#111] rounded-4xl border-x border-gray-800 hover:border-[#C8A84B]/50 transition-all duration-500 group-hover:-translate-y-1">
                    <div className="relative h-[350px] bg-black flex items-center justify-center overflow-hidden">
                        <Image
                            src={img}
                            alt={product?.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-4">
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