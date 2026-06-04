import { ADMIN_PHONE, CUSTOMER_CARE_EMAIL, REFUND_POLICY_SUMMARY_CARD, serif, REFUND_POLICY_SECTIONS } from "@/config/staticData";
import Link from "next/link";


export const metadata = {
    title: "Refund Policy | Cherrys Honey",
    description:
        "Understand Cherrys Honey's refund, return, and cancellation policy for your orders.",
};



const LAST_UPDATED = "01 June 2026";


export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* ── Hero ── */}
            <div className="relative pt-28 pb-14 px-4 text-center border-b border-gray-800">
                <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
                    Legal
                </p>
                <h1 className="text-5xl md:text-6xl text-white mb-4" style={serif}>
                    Refund <span className="text-primary">Policy</span>
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
                        We want every order from{" "}
                        <span className="text-white font-medium">Cherrys Honey</span> to reach
                        you in perfect condition. If something is not right, this policy explains
                        how to raise a return or refund request, what qualifies, and how we will
                        resolve it for you — quickly and fairly.
                    </p>
                </div>

                {/* ── Quick Summary Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                    {REFUND_POLICY_SUMMARY_CARD.map((card, i) => {
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
                    {REFUND_POLICY_SECTIONS.map((section, idx) => (
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
                                    {section.title}
                                </h2>
                            </div>

                            {/* Sub-sections */}
                            <div className="space-y-5 pl-9">
                                {section.content.map((block, bIdx) => (
                                    <div key={bIdx}>
                                        {block.subtitle && (
                                            <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-1.5">
                                                {block.subtitle}
                                            </p>
                                        )}
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {block.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            {idx < REFUND_POLICY_SECTIONS.length - 1 && (
                                <div className="h-px bg-gray-800 mt-10" />
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Contact ── */}
                <div className="mt-14 border border-gray-800 bg-[#111] p-8">
                    <p className="text-lg text-white mb-2" style={serif}>
                        Need help with a return or refund?
                    </p>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Our support team is happy to assist you. Reach out with your order ID
                        and we will get back to you within 1–2 business days.
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
                    <Link href="/terms-conditions" className="hover:text-primary transition-colors">
                        Terms &amp; Conditions
                    </Link>
                    <span>·</span>
                    <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                        Privacy Policy
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
