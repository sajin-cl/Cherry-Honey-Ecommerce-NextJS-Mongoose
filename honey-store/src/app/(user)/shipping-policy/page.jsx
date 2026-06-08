import { ADMIN_PHONE, CUSTOMER_CARE_EMAIL, SHIPPING_POLICY_SUMMARY_CARDS, SHIPPING_POLICY_SECTIONS, serif } from "@/config/staticData";
import Link from "next/link";

export const metadata = {
    title: "Shipping & Delivery Policy | Cherrys Honey",
    description: "Learn about Cherrys Honey's shipping timelines, delivery charges, tracking, and more.",
    alternates: {
        canonical: "/shipping-policy",
    }
};

const LAST_UPDATED = "01 June 2026";

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* ── Hero ── */}
            <div className="relative pt-28 pb-14 px-4 text-center border-b border-gray-800">
                <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
                    Legal
                </p>
                <h1 className="text-5xl md:text-6xl text-white mb-4" style={serif}>
                    Shipping &amp; <span className="text-primary">Delivery</span>
                </h1>
                <p className="text-gray-500 text-xs tracking-wider uppercase">
                    Last updated: {LAST_UPDATED}
                </p>
            </div>

            {/* ── Content ── */}
            <div className="max-w-5xl mx-auto px-4 py-14">

                {/* Intro */}
                <div className="border-l-2 border-primary pl-5 mb-12">
                    <p className="text-gray-300 text-sm leading-relaxed">
                        At <span className="text-white font-medium">Cherrys Honey</span>, we
                        are committed to delivering your order safely and on time. This policy
                        explains our shipping process, delivery timelines, charges, and what
                        to do if something goes wrong with your shipment.
                    </p>
                </div>

                {/* ── Quick Summary Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                    {SHIPPING_POLICY_SUMMARY_CARDS.map((card, i) => {
                        const Icon = card.Icon;
                        return (
                            <div
                                key={i}
                                className="border border-gray-800 bg-[#111] rounded-lg p-5 text-center"
                            >
                                <div className="flex justify-center mb-3">
                                    <Icon className="w-7 h-7 text-primary" />
                                </div>
                                <p className="text-primary text-xs tracking-wider uppercase mb-1">
                                    {card?.label}
                                </p>
                                <p className="text-white text-xl font-semibold" style={serif}>
                                    {card?.value}
                                </p>
                                <p className="text-gray-500 text-xs mt-0.5">{card?.sub}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {SHIPPING_POLICY_SECTIONS.map((section, idx) => (
                        <div key={idx}>
                            {/* Section heading */}
                            <div className="flex items-center gap-3 mb-5">
                                <span
                                    className="text-xs font-bold text-black bg-primary w-6 h-6 flex items-center justify-center shrink-0"
                                    style={{ fontStyle: "normal" }}
                                >
                                    {idx + 1}
                                </span>
                                <h2 className="text-white text-lg font-semibold" style={serif}>
                                    {section?.title}
                                </h2>
                            </div>

                            {/* Sub-sections */}
                            <div className="space-y-5 pl-9">
                                {section.content.map((block, bIdx) => (
                                    <div key={bIdx}>
                                        {block.subtitle && (
                                            <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-1.5">
                                                {block?.subtitle}
                                            </p>
                                        )}
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {block?.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            {idx < SHIPPING_POLICY_SECTIONS.length - 1 && (
                                <div className="h-px bg-gray-800 mt-10" />
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Contact ── */}
                <div className="mt-14 border border-gray-800 bg-[#111] p-8">
                    <p className="text-lg text-white mb-2" style={serif}>
                        Questions about your delivery?
                    </p>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        If you have any concerns about your shipment or need help tracking
                        your order, our support team is ready to assist.
                    </p>
                    <div className="space-y-2 text-sm">
                        <p className="text-gray-400">
                            Email:{" "}
                            <a
                                href={`mailto:${CUSTOMER_CARE_EMAIL}`}
                                className="text-primary hover:underline"
                            >
                                {CUSTOMER_CARE_EMAIL}
                            </a>
                        </p>
                        <p className="text-gray-400">
                            Phone:{" "}
                            <a
                                href={`tel:${ADMIN_PHONE}`}
                                className="text-primary hover:underline"
                            >
                                {ADMIN_PHONE}
                            </a>
                        </p>
                        <p className="text-gray-400">
                            Hours: Monday – Saturday, 9 AM – 6 PM IST
                        </p>
                    </div>
                </div>

                {/* ── Bottom links ── */}
                <div className="mt-10 flex flex-wrap gap-4 text-xs text-gray-500">
                    <Link href="/faq" className="hover:text-primary transition-colors">
                        FAQ
                    </Link>
                    <span>·</span>
                    <Link href="/refund-policy" className="hover:text-primary transition-colors">
                        Refund Policy
                    </Link>
                    <span>·</span>
                    <Link href="/terms-conditions" className="hover:text-primary transition-colors">
                        Terms &amp; Conditions
                    </Link>
                    <span>·</span>
                    <Link href="/" className="hover:text-primary transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
