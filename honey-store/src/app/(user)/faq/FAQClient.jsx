"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS, serif } from "@/config/staticData"
import FAQItem from "@/components/ui/FAQ";
import { CUSTOMER_CARE_EMAIL } from "@/config/staticData";


export default function FAQClient() {
    const [activeCategory, setActiveCategory] = useState(null);

    const filtered =
        activeCategory === null
            ? FAQS
            : FAQS.filter((g) => g.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* ── Hero ── */}
            <div className="relative pt-28 pb-16 px-4 text-center border-b border-gray-800">

                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
                    {[
                        { l: "5%", t: "10%" }, { l: "15%", t: "80%" }, { l: "25%", t: "35%" }, { l: "35%", t: "60%" },
                        { l: "45%", t: "20%" }, { l: "55%", t: "75%" }, { l: "65%", t: "45%" }, { l: "75%", t: "15%" },
                        { l: "85%", t: "55%" }, { l: "92%", t: "30%" }, { l: "10%", t: "50%" }, { l: "20%", t: "90%" },
                        { l: "30%", t: "70%" }, { l: "40%", t: "5%" }, { l: "50%", t: "85%" }, { l: "60%", t: "25%" },
                        { l: "70%", t: "65%" }, { l: "80%", t: "40%" }, { l: "90%", t: "95%" }, { l: "2%", t: "40%" },
                        { l: "12%", t: "25%" }, { l: "22%", t: "55%" }, { l: "32%", t: "15%" }, { l: "42%", t: "70%" },
                        { l: "52%", t: "42%" }, { l: "62%", t: "88%" }, { l: "72%", t: "8%" }, { l: "82%", t: "72%" },
                        { l: "88%", t: "18%" }, { l: "48%", t: "58%" }, { l: "58%", t: "12%" }, { l: "68%", t: "32%" },
                        { l: "78%", t: "92%" }, { l: "95%", t: "68%" }, { l: "8%", t: "62%" }, { l: "38%", t: "48%" },
                        { l: "28%", t: "82%" }, { l: "18%", t: "3%" }, { l: "98%", t: "52%" }, { l: "43%", t: "97%" },
                    ].map((p, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-primary"
                            style={{ left: p.l, top: p.t }}
                        />
                    ))}
                </div>

                <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
                    Help Centre
                </p>
                <h1 className="text-5xl md:text-6xl text-white mb-4" style={serif}>
                    Frequently Asked
                    <br />
                    <span className="text-primary">Questions</span>
                </h1>
                <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                    Everything you need to know about Cherrys Honey — our products,
                    shipping, payments, and more.
                </p>
            </div>

            {/* ── Category filters ── */}
            <div className="max-w-6xl mx-auto px-4 pt-10 pb-2">
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 text-xs tracking-wider uppercase border transition-colors ${activeCategory === null
                            ? "bg-primary border-primary text-black font-semibold"
                            : "border-gray-700 text-gray-400 hover:border-primary hover:text-primary"
                            }`}
                    >
                        All
                    </button>
                    {FAQS.map((g) => {
                        const Icon = g.icon;
                        return (
                            <button
                                key={g.category}
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === g.category ? null : g.category
                                    )
                                }
                                className={`flex items-center gap-1.5 px-4 py-2 text-xs tracking-wider uppercase border transition-colors ${activeCategory === g.category
                                    ? "bg-primary border-primary text-black font-semibold"
                                    : "border-gray-700 text-gray-400 hover:border-primary hover:text-primary"
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {g.category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── FAQ accordion ── */}
            <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
                {filtered.map((group) => {
                    const Icon = group.icon;
                    return (
                        <div key={group.category}>
                            {/* Category heading */}
                            <div className="flex items-center gap-3 mb-3 px-1">
                                <Icon className="w-5 h-5 text-primary shrink-0" />
                                <h2 className="text-white text-base font-semibold tracking-wide">
                                    {group.category}
                                </h2>
                                <div className="flex-1 h-px bg-gray-800" />
                            </div>

                            {/* Items */}
                            <div className="border border-gray-800 overflow-hidden">
                                {group.items.map((item, idx) => (
                                    <FAQItem key={idx} q={item.q} a={item.a} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Still have questions CTA ── */}
            <div className="max-w-3xl mx-auto px-4 pb-20 mt-20">
                <div className="border border-gray-800 bg-[#111] p-8 text-center">
                    <p className="text-2xl text-white mb-2" style={serif}>
                        Still have questions?
                    </p>
                    <p className="text-gray-400 text-sm mb-6">
                        Our team is happy to help. Reach out anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={`mailto:${CUSTOMER_CARE_EMAIL}`}
                            className="px-8 py-3 bg-primary hover:bg-secondary text-black font-semibold text-sm tracking-widest uppercase transition-colors"
                        >
                            Email Us
                        </a>
                        <Link
                            href="/products"
                            className="px-8 py-3 border border-gray-700 hover:border-primary text-gray-300 hover:text-primary font-semibold text-sm tracking-widest uppercase transition-colors"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
