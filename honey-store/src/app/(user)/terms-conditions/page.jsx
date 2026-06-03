import { ADMIN_PHONE, CUSTOMER_CARE_EMAIL,serif } from "@/config/staticData";
import Link from "next/link";

export const metadata = {
    title: "Terms & Conditions | Cherrys Honey",
    description:
        "Read the Terms & Conditions governing your use of the Cherrys Honey website and services.",
};

const LAST_UPDATED = "01 June 2026";

const SECTIONS = [
    {
        title: "Acceptance of Terms",
        content: [
            {
                subtitle: "",
                text: "By accessing or using the Cherrys Honey website (cherryshoney.com), placing an order, or creating an account, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to any part of these terms, please do not use our website or services.",
            },
        ],
    },
    {
        title: "Use of the Website",
        content: [
            {
                subtitle: "Eligibility",
                text: "You must be at least 18 years of age, or using the site under the supervision of a parent or guardian, to place an order or create an account. By using our website, you represent and warrant that you meet this requirement.",
            },
            {
                subtitle: "Account Responsibility",
                text: "You are responsible for maintaining the confidentiality of your account credentials. All activities that occur under your account are your responsibility. Please notify us immediately if you suspect any unauthorised use of your account.",
            },
            {
                subtitle: "Prohibited Conduct",
                text: "You agree not to use the website for any unlawful purpose, to transmit spam or harmful content, to attempt to gain unauthorised access to any part of the site, or to engage in any conduct that disrupts or damages our services or reputation.",
            },
        ],
    },
    {
        title: "Products & Pricing",
        content: [
            {
                subtitle: "Product Descriptions",
                text: "We strive to display our products as accurately as possible. However, colours may vary slightly depending on your device screen. All product descriptions, weights, and images are provided in good faith but are subject to change without prior notice.",
            },
            {
                subtitle: "Pricing",
                text: "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without notice. The price applicable to your order is the price shown at the time you place the order.",
            },
            {
                subtitle: "Availability",
                text: "Product availability is not guaranteed. In the rare event that an ordered item becomes unavailable after your purchase, we will notify you promptly and offer a full refund or a suitable alternative.",
            },
        ],
    },
    {
        title: "Orders & Payments",
        content: [
            {
                subtitle: "Order Confirmation",
                text: "Placing an order constitutes an offer to purchase. An order is only confirmed once you receive an order confirmation email from us. We reserve the right to cancel or refuse any order at our discretion, including in cases of pricing errors or suspected fraudulent activity.",
            },
            {
                subtitle: "Payment",
                text: "Payments are processed securely via Cashfree, a PCI-DSS compliant payment gateway. We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery (COD). We do not store your payment card details on our servers.",
            },
            {
                subtitle: "Cash on Delivery",
                text: "COD orders must be paid in full at the time of delivery. Repeated refusal of COD orders may result in the suspension of COD privileges on your account.",
            },
        ],
    },
    {
        title: "Shipping & Delivery",
        content: [
            {
                subtitle: "Delivery Timelines",
                text: "We aim to dispatch all orders within 1-2 business days. Estimated delivery times are 3–5 business days across Tamilnadu, though delays may occur due to logistics or unforeseen circumstances. We are not liable for delays caused by courier partners or circumstances beyond our control.",
            },
            {
                subtitle: "Shipping Charges",
                text: "Free shipping is available on all orders above ₹500. A flat shipping charge of ₹50 applies to orders below ₹500. Shipping charges, if applicable, will be clearly displayed at checkout before you complete your purchase.",
            },
            {
                subtitle: "Risk & Ownership",
                text: "Risk of loss and title for products pass to you upon delivery to the shipping address you provide. Please ensure that someone is available to receive your order at the delivery address.",
            },
        ],
    },
    {
        title: "Returns & Refunds",
        content: [
            {
                subtitle: "Eligibility",
                text: "We accept return requests only in cases where the product is damaged, defective, or incorrect. You must contact us within 48 hours of delivery with photographic evidence of the issue.",
            },
            {
                subtitle: "Non-Returnable Items",
                text: "Due to the perishable nature of honey and food safety regulations, we do not accept returns based on personal taste preferences. Opened or partially consumed products are not eligible for a refund unless found to be defective.",
            },
            {
                subtitle: "Refund Processing",
                text: "Approved refunds will be processed within 5–7 business days to the original payment method. COD refunds will be transferred via bank transfer or UPI. We will keep you informed throughout the process.",
            },
        ],
    },
    {
        title: "Intellectual Property",
        content: [
            {
                subtitle: "",
                text: "All content on the Cherrys Honey website — including text, images, logos, product names, and graphics — is the intellectual property of Cherrys Honey and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use any content from this site without our prior written permission.",
            },
        ],
    },
    {
        title: "Limitation of Liability",
        content: [
            {
                subtitle: "",
                text: "To the fullest extent permitted by law, Cherrys Honey shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or our products, even if we have been advised of the possibility of such damages. Our total liability for any claim shall not exceed the value of the order in question.",
            },
        ],
    },
    {
        title: "Governing Law",
        content: [
            {
                subtitle: "",
                text: "These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Kanyakumari, Tamil Nadu.",
            },
        ],
    },
    {
        title: "Changes to These Terms",
        content: [
            {
                subtitle: "",
                text: "We reserve the right to update or modify these Terms & Conditions at any time. Changes will be posted on this page with an updated date. Your continued use of the website after any changes are posted constitutes your acceptance of the revised terms. We encourage you to review this page periodically.",
            },
        ],
    },
];

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* ── Hero ── */}
            <div className="relative pt-28 pb-14 px-4 text-center border-b border-gray-800">
                <p className="text-[#C8A84B] text-xs tracking-[0.3em] uppercase mb-4">
                    Legal
                </p>
                <h1 className="text-5xl md:text-6xl text-white mb-4" style={serif}>
                    Terms &amp; <span className="text-[#C8A84B]">Conditions</span>
                </h1>
                <p className="text-gray-500 text-xs tracking-wider uppercase">
                    Last updated: {LAST_UPDATED}
                </p>
            </div>

            {/* ── Content ── */}
            <div className="max-w-5xl mx-auto px-4 py-14">

                {/* Intro */}
                <div className="border-l-2 border-[#C8A84B] pl-5 mb-12">
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Welcome to <span className="text-white font-medium">Cherrys Honey</span>.
                        These Terms &amp; Conditions govern your use of our website and the
                        purchase of our products. Please read them carefully before using our
                        services. By accessing our website or placing an order, you agree to be
                        bound by these terms.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {SECTIONS.map((section, idx) => (
                        <div key={idx}>
                            {/* Section heading */}
                            <div className="flex items-center gap-3 mb-5">
                                <span
                                    className="text-xs font-bold text-black bg-[#C8A84B] w-6 h-6 flex items-center justify-center shrink-0"
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
                                            <p className="text-[#C8A84B] text-xs font-semibold tracking-wider uppercase mb-1.5">
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
                            {idx < SECTIONS.length - 1 && (
                                <div className="h-px bg-gray-800 mt-10" />
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Contact ── */}
                <div className="mt-14 border border-gray-800 bg-[#111] p-8">
                    <p className="text-lg text-white mb-2" style={serif}>
                        Have questions about these terms?
                    </p>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        If you have any questions or concerns about our Terms &amp; Conditions,
                        feel free to reach out to our support team.
                    </p>
                    <div className="space-y-2 text-sm">
                        <p className="text-gray-400">
                            Email:{" "}
                            <a
                                href={`mailto:${CUSTOMER_CARE_EMAIL}`}
                                className="text-[#C8A84B] hover:underline"
                            >
                                {CUSTOMER_CARE_EMAIL}
                            </a>
                        </p>
                        <p className="text-gray-400">
                            Phone:{" "}
                            <a
                                href={`tel:${ADMIN_PHONE}`}
                                className="text-[#C8A84B] hover:underline"
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
                    <Link href="/faq" className="hover:text-[#C8A84B] transition-colors">
                        FAQ
                    </Link>
                    <span>·</span>
                    <Link href="/privacy-policy" className="hover:text-[#C8A84B] transition-colors">
                        Privacy Policy
                    </Link>
                    <span>·</span>
                    <Link href="/refund-policy" className="hover:text-[#C8A84B] transition-colors">
                        Refund Policy
                    </Link>
                    <span>·</span>
                    <Link href="/" className="hover:text-[#C8A84B] transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
