import { ADMIN_PHONE, CUSTOMER_CARE_EMAIL, serif, PRIVACY_POLICY_SECTIONS } from "@/config/staticData";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | Cherrys Honey",
    description: "Learn how Cherrys Honey collects, uses, and protects your personal information.",
    alternates: {
        canonical: "/privacy-policy", 
    }
};


const LAST_UPDATED = "24 May 2026";



export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* ── Hero ── */}
            <div className="relative pt-28 pb-14 px-4 text-center border-b border-gray-800">
                <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
                    Legal
                </p>
                <h1 className="text-5xl md:text-6xl text-white mb-4" style={serif}>
                    Privacy <span className="text-primary">Policy</span>
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
                        are committed to protecting your privacy. This policy explains what
                        personal information we collect, how we use it, and the choices you
                        have. By using our website and services, you agree to the practices
                        described in this policy.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {PRIVACY_POLICY_SECTIONS.map((section, idx) => (
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
                                                {block.subtitle}
                                            </p>
                                        )}
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {block?.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            {idx < PRIVACY_POLICY_SECTIONS.length - 1 && (
                                <div className="h-px bg-gray-800 mt-10" />
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Contact ── */}
                <div className="mt-14 border border-gray-800 bg-[#111] p-8">
                    <p className="text-lg text-white mb-2" style={serif}>
                        Questions about this policy?
                    </p>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        If you have any questions or concerns about our Privacy Policy or
                        how we handle your data, please get in touch with us.
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
                                href="tel:+919876543210"
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
                        Terms of Use
                    </Link>
                    <span>·</span>
                    <Link href="/" className="hover:text-primary transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
