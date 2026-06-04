import { ADMIN_PHONE, CUSTOMER_CARE_EMAIL,serif } from "@/config/staticData";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | Cherrys Honey",
    description: "Learn how Cherrys Honey collects, uses, and protects your personal information.",
};


const LAST_UPDATED = "24 May 2026";

const SECTIONS = [
    {
        title: "Information We Collect",
        content: [
            {
                subtitle: "Personal Information",
                text: "When you create an account or place an order, we collect information such as your full name, email address, mobile number, and delivery address. This information is necessary to process your orders and provide customer support.",
            },
            {
                subtitle: "Payment Information",
                text: "We do not store your payment details. All transactions are processed securely through Cashfree, a PCI-DSS compliant payment gateway. We only retain the transaction reference ID for order tracking purposes.",
            },
            {
                subtitle: "Usage Data",
                text: "We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, and time spent on pages. This helps us improve our website and your shopping experience.",
            },
        ],
    },
    {
        title: "How We Use Your Information",
        content: [
            {
                subtitle: "Order Processing",
                text: "Your personal information is used to process and fulfil your orders, send order confirmations, provide shipping updates, and handle returns or refunds.",
            },
            {
                subtitle: "Communication",
                text: "We may use your email address or mobile number to send you important updates about your orders, changes to our policies, or promotional offers. You can opt out of marketing communications at any time.",
            },
            {
                subtitle: "Service Improvement",
                text: "We analyse usage data to understand how customers interact with our website, identify issues, and improve our products and services.",
            },
        ],
    },
    {
        title: "How We Protect Your Data",
        content: [
            {
                subtitle: "Encryption",
                text: "All data transmitted between your browser and our servers is encrypted using industry-standard SSL/TLS technology. Your passwords are hashed using bcrypt and are never stored in plain text.",
            },
            {
                subtitle: "Secure Authentication",
                text: "We use JSON Web Tokens (JWT) stored in HttpOnly cookies for authentication. This prevents JavaScript-based attacks from accessing your session token.",
            },
            {
                subtitle: "Access Controls",
                text: "Access to personal data is restricted to authorised personnel only. We regularly review and update our security practices to protect your information.",
            },
        ],
    },
    {
        title: "Sharing Your Information",
        content: [
            {
                subtitle: "Third-Party Services",
                text: "We share necessary information with trusted third-party services to operate our business — including Cashfree for payment processing and courier partners for order delivery. These partners are contractually obligated to protect your data.",
            },
            {
                subtitle: "No Data Selling",
                text: "We never sell, rent, or trade your personal information to any third party for marketing purposes. Your data is yours.",
            },
            {
                subtitle: "Legal Requirements",
                text: "We may disclose your information if required by law, court order, or government authority. We will notify you when permitted to do so.",
            },
        ],
    },
    {
        title: "Cookies",
        content: [
            {
                subtitle: "What We Use",
                text: "We use cookies to maintain your login session, remember your cart, and understand how you use our website. Essential cookies are required for the site to function properly.",
            },
            {
                subtitle: "Managing Cookies",
                text: "You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website, such as staying logged in or retaining your cart.",
            },
        ],
    },
    {
        title: "Your Rights",
        content: [
            {
                subtitle: "Access & Correction",
                text: "You have the right to access the personal information we hold about you and request corrections if it is inaccurate or incomplete. You can update most information directly from your account settings.",
            },
            {
                subtitle: "Deletion",
                text: "You may request deletion of your account and associated personal data at any time by contacting us at support@cherryhoney.in. We will process your request within 30 days.",
            },
            {
                subtitle: "Data Portability",
                text: "You have the right to receive a copy of your personal data in a structured, machine-readable format upon request.",
            },
        ],
    },
    {
        title: "Children's Privacy",
        content: [
            {
                subtitle: "",
                text: "Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately and we will delete it.",
            },
        ],
    },
    {
        title: "Changes to This Policy",
        content: [
            {
                subtitle: "",
                text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by email or by posting a prominent notice on our website. Your continued use of our services after changes are posted constitutes your acceptance of the updated policy.",
            },
        ],
    },
];

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
                    {SECTIONS.map((section, idx) => (
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
                            {idx < SECTIONS.length - 1 && (
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
