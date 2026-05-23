import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { FiPackage, FiCreditCard, FiUser } from "react-icons/fi";
import { GiHoneypot } from "react-icons/gi";


/* Font */
export const serif = {
    fontFamily: "'Georgia','Times New Roman',serif",
    fontStyle: "italic",
};


export const SOCIAL_LINKS = [
    { icon: SiFacebook, href: "", name: 'Facebook', size: 20 },
    { icon: FaInstagram, href: "", name: 'Instagram', size: 20 },
    { icon: FaXTwitter, href: "", name: 'X', size: 20 },
    { icon: RiYoutubeLine, href: "", name: 'Youtube', size: 25 },
];


export const MOBILE_NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Orders", href: "/orders" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];


export const TESTIMONIALS = [
    {
        text: "A completely change in my way of experiencing honey. The taste is pure, rich and absolutely divine. I can never go back to store-bought honey again!",
        name: "Sanjeev Trans",
        role: "Buyer",
    },
    {
        text: "Best honey I have ever tasted. The quality is unmatched and you can truly taste the difference. Highly recommend Cherry Honey to everyone!",
        name: "Ajith",
        role: "Regular Customer",
    },
    {
        text: "From the packaging to the taste, everything about Cherry Honey screams premium quality. My entire family loves it!",
        name: "Hamzaa",
        role: "Loyal Customer",
    },
];


export const FAQS = [
    {
        category: "Orders & Shipping",
        icon: FiPackage,
        items: [
            {
                q: "How long does delivery take?",
                a: "We deliver within 3–5 working days across India. Metro cities like Chennai, Mumbai, Delhi, and Bangalore usually receive orders in 2–3 days. Remote areas may take up to 7 days.",
            },
            {
                q: "Do you offer free shipping?",
                a: "Yes! All orders above ₹500 qualify for free shipping. Orders below ₹500 have a flat shipping charge of ₹50.",
            },
            {
                q: "Can I track my order?",
                a: "Absolutely. Once your order is shipped, you will receive a tracking link via email and SMS. You can also visit the 'My Orders' section in your account to see live updates.",
            },
            {
                q: "Do you ship outside India?",
                a: "Currently we only ship within India. International shipping is on our roadmap — stay tuned for updates.",
            },
        ],
    },
    {
        category: "Products & Quality",
        icon: GiHoneypot,
        items: [
            {
                q: "Is your honey 100% pure and natural?",
                a: "Yes. All our honey is raw, unprocessed, and free from additives, preservatives, or artificial flavours. We source directly from trusted beekeepers across India.",
            },
            {
                q: "Why does my honey look crystallised?",
                a: "Crystallisation is a completely natural process and is actually a sign of pure honey. It does NOT mean the honey has gone bad. Simply place the jar in warm water (not boiling) for a few minutes to restore its liquid form.",
            },
            {
                q: "What is the shelf life of your honey?",
                a: "Pure honey has an indefinite shelf life when stored properly. We recommend keeping it in a cool, dry place away from direct sunlight. The best-before date on each jar is 2 years from the date of packaging.",
            },
            {
                q: "Are your products tested for quality?",
                a: "Yes. Every batch is lab-tested for purity, moisture content, and adulteration before it reaches you. We follow FSSAI guidelines strictly.",
            },
        ],
    },
    {
        category: "Payments & Refunds",
        icon: FiCreditCard,
        items: [
            {
                q: "What payment methods do you accept?",
                a: "We accept all major payment modes — UPI, Credit/Debit cards, Net Banking, and Cash on Delivery (COD). Online payments are processed securely via Cashfree.",
            },
            {
                q: "Is online payment safe?",
                a: "Completely. All online transactions are encrypted and processed through Cashfree, a PCI-DSS compliant payment gateway. We never store your card details.",
            },
            {
                q: "Can I get a refund if I'm not happy?",
                a: "Yes. If you receive a damaged or incorrect product, contact us within 48 hours of delivery with a photo. We will arrange a replacement or full refund within 5–7 business days.",
            },
            {
                q: "How do I cancel my order?",
                a: "You can cancel your order before it is shipped by contacting our support team. Once shipped, cancellations are not possible — but you can initiate a return after delivery.",
            },
        ],
    },
    {
        category: "Account & General",
        icon: FiUser,
        items: [
            {
                q: "Do I need an account to place an order?",
                a: "Yes, an account is required to place an order. Creating one takes less than a minute and helps you track your orders, save addresses, and access order history.",
            },
            {
                q: "How do I reset my password?",
                a: "Click 'Forgot Password' on the login page and enter your registered email. You will receive a reset link within a few minutes. Check your spam folder if you don't see it.",
            },
            {
                q: "How do I contact customer support?",
                a: "You can reach us at support@cherryhoney.in or WhatsApp us at +91 98765 43210. Our support team is available Monday to Saturday, 9 AM – 6 PM.",
            },
        ],
    },
];