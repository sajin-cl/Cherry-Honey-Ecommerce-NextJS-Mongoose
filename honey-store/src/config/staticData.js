import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { FiPackage, FiCreditCard, FiUser, FiClock, FiCheckCircle, FiTruck, FiShield } from "react-icons/fi";
import { GiHoneypot } from "react-icons/gi";


/* Font */
export const serif = {
    fontFamily: "'Georgia','Times New Roman',serif",
    fontStyle: "italic",
};

export const serifItalic = {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontStyle: "italic",
};

/* Admin CSS class shortcuts */
export const STATUS_COLORS = {
    placed: "bg-blue-50 text-blue-700 border-blue-200",
    processing: "bg-amber-50 text-amber-700 border-amber-200",
    shipped: "bg-purple-50 text-purple-700 border-purple-200",
    delivered: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
};


/* ADMIN DETAILS */
export const ADMIN_PHONE = "+91 96775 62116"
export const CUSTOMER_CARE_EMAIL = "support@cherryshoney.com"


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
        name: "C.L.Sajin",
        role: "Buyer",
    },
    {
        text: "Best honey I have ever tasted. The quality is unmatched and you can truly taste the difference. Highly recommend Cherry Honey to everyone!",
        name: "Ajith",
        role: "Regular Customer",
    },
    {
        text: "From the packaging to the taste, everything about Cherry Honey screams premium quality. My entire family loves it!",
        name: "Sanjeev",
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
                a: `You can reach us at ${CUSTOMER_CARE_EMAIL} or WhatsApp us at ${ADMIN_PHONE}. Our support team is available Monday to Saturday, 9 AM – 6 PM.`,
            },
        ],
    },
];


/* ----------------------------------------Refund POlicy sections Data --------------------------------------------*/

export const REFUND_POLICY_SUMMARY_CARD = [
    {
        Icon: FiClock,
        label: "Report Within",
        value: "48 Hours",
        sub: "of delivery",
    },
    {
        Icon: FiCheckCircle,
        label: "Refund Processed",
        value: "5–7 Days",
        sub: "after approval",
    },
    {
        Icon: FiPackage,
        label: "Replacement",
        value: "2–3 Days",
        sub: "after approval",
    },
];


export const REFUND_POLICY_SECTIONS = [
    {
        title: "Our Commitment",
        content: [
            {
                subtitle: "",
                text: "At Cherrys Honey, your satisfaction is our priority. We take great care in packaging and delivering our products in perfect condition. However, if something goes wrong, we are here to make it right. Please read our policy carefully to understand your options.",
            },
        ],
    },
    {
        title: "Eligibility for Returns",
        content: [
            {
                subtitle: "Accepted Reasons",
                text: "We accept return and refund requests only under the following circumstances: the product received is damaged or broken, the product is defective or of poor quality, you received a wrong product (different from what you ordered), or the product is missing from your order.",
            },
            {
                subtitle: "Time Limit",
                text: "All return requests must be raised within 48 hours of delivery. Requests made after this window will not be entertained. Please check your order immediately upon receipt.",
            },
            {
                subtitle: "Proof Required",
                text: "To process your request, you must provide clear photographic or video evidence of the damaged, defective, or incorrect product. Evidence should clearly show the product, packaging, and the issue. You can share this via email or WhatsApp.",
            },
        ],
    },
    {
        title: "Non-Returnable Items",
        content: [
            {
                subtitle: "Taste & Preference",
                text: "Returns are not accepted for reasons related to personal taste preferences. Pure honey may have slight natural variations in colour, aroma, and flavour between batches — this is normal and not a defect.",
            },
            {
                subtitle: "Opened or Used Products",
                text: "Once a product has been opened and partially consumed, it is not eligible for a return or refund, unless it is found to be genuinely defective or contaminated.",
            },
            {
                subtitle: "Crystallised Honey",
                text: "Crystallisation is a completely natural process in raw honey and is a sign of purity. Products that have crystallised are not considered defective and are not eligible for a return. Warm the jar in lukewarm water to restore its liquid form.",
            },
            {
                subtitle: "Incorrect Address",
                text: "We are not responsible for non-delivery or delays caused by an incorrect or incomplete shipping address provided by the customer. Please double-check your address before placing an order.",
            },
        ],
    },
    {
        title: "How to Request a Refund",
        content: [
            {
                subtitle: "Step 1 – Contact Us",
                text: "Email us at " + CUSTOMER_CARE_EMAIL + " or WhatsApp us at " + ADMIN_PHONE + " within 48 hours of receiving your order. Mention your order ID and describe the issue clearly.",
            },
            {
                subtitle: "Step 2 – Submit Evidence",
                text: "Attach clear photos or a short video showing the damaged, defective, or incorrect product along with its packaging. This helps us resolve your request faster.",
            },
            {
                subtitle: "Step 3 – Review",
                text: "Our support team will review your request within 1–2 business days and get back to you with a resolution — either a replacement, store credit, or a full refund.",
            },
            {
                subtitle: "Step 4 – Resolution",
                text: "Once approved, refunds are processed within 5–7 business days. You will be notified at every step of the process.",
            },
        ],
    },
    {
        title: "Refund Methods",
        content: [
            {
                subtitle: "Online Payments (UPI, Card, Net Banking)",
                text: "Refunds for orders paid online will be credited back to the original payment method (UPI, credit/debit card, or bank account) within 5–7 business days after approval.",
            },
            {
                subtitle: "Cash on Delivery (COD)",
                text: "Refunds for COD orders will be transferred via bank transfer or UPI. You will need to provide your bank account number (or UPI ID) when submitting the refund request.",
            },
            {
                subtitle: "Processing Time",
                text: "While we process refunds promptly on our end, the time taken for the amount to appear in your account may vary depending on your bank or payment provider. This is typically within 5–7 business days.",
            },
        ],
    },
    {
        title: "Order Cancellations",
        content: [
            {
                subtitle: "Before Shipment",
                text: "You may cancel your order before it is dispatched by contacting our support team as soon as possible. If the cancellation is processed before shipment, a full refund will be issued to your original payment method.",
            },
            {
                subtitle: "After Shipment",
                text: "Once an order has been dispatched, cancellation is not possible. You may initiate a return request upon delivery if the product meets our return eligibility criteria.",
            },
            {
                subtitle: "COD Cancellations",
                text: "Repeated cancellation of COD orders at the time of delivery may result in the suspension of COD privileges on your account. Please only place COD orders if you genuinely intend to receive them.",
            },
        ],
    },
    {
        title: "Replacements",
        content: [
            {
                subtitle: "",
                text: "In many cases, instead of a refund, we will offer to send a replacement product at no extra cost. If you prefer a replacement over a refund, please mention this when raising your request. Replacements are dispatched within 2–3 business days after approval.",
            },
        ],
    },
    {
        title: "Changes to This Policy",
        content: [
            {
                subtitle: "",
                text: "We reserve the right to update or modify this Refund Policy at any time. Any changes will be reflected on this page with an updated effective date. We encourage you to review this policy periodically. Continued use of our services after changes are posted constitutes your acceptance of the revised policy.",
            },
        ],
    },
];


/* ---------------------------------------- Shipping Policy Data ---------------------------------------- */

export const SHIPPING_POLICY_SUMMARY_CARDS = [
    {
        Icon: FiTruck,
        label: "Dispatched In",
        value: "1–2 Days",
        sub: "business days",
    },
    {
        Icon: FiClock,
        label: "Delivered In",
        value: "3–5 Days",
        sub: "across India",
    },
    {
        Icon: FiShield,
        label: "Free Shipping",
        value: "₹500+",
        sub: "order value",
    },
];

export const SHIPPING_POLICY_SECTIONS = [
    {
        title: "Order Processing",
        content: [
            {
                subtitle: "Processing Time",
                text: "All orders placed on Cherry Honey are processed within 1–2 business days (excluding Sundays and public holidays). You will receive an order confirmation email immediately after placing your order, and a shipping confirmation with a tracking link once your order is dispatched.",
            },
            {
                subtitle: "Cut-off Time",
                text: "Orders placed before 12:00 PM (noon) IST on a business day are typically dispatched the same day. Orders placed after noon or on non-business days will be dispatched the next business day.",
            },
        ],
    },
    {
        title: "Delivery Timelines",
        content: [
            {
                subtitle: "Metro Cities",
                text: "Orders to major cities such as Chennai, Bangalore, Mumbai, Delhi, Hyderabad, and Kolkata are typically delivered within 2–3 business days from the date of dispatch.",
            },
            {
                subtitle: "Other Cities & Towns",
                text: "Orders to Tier-2 and Tier-3 cities are generally delivered within 3–5 business days from the date of dispatch.",
            },
            {
                subtitle: "Remote Areas",
                text: "Deliveries to remote or hilly areas, islands, or locations with limited courier coverage may take up to 7 business days. We will notify you if your delivery is likely to be delayed.",
            },
            {
                subtitle: "Disclaimer",
                text: "Delivery timelines are estimates and not guarantees. Delays may occur due to weather conditions, public holidays, courier backlogs, or circumstances beyond our control. We appreciate your patience in such situations.",
            },
        ],
    },
    {
        title: "Shipping Charges",
        content: [
            {
                subtitle: "Free Shipping",
                text: "We offer free shipping on all orders above ₹500. This applies to all locations across India where our courier partners operate.",
            },
            {
                subtitle: "Standard Shipping",
                text: "A flat shipping charge of ₹50 is applied to orders below ₹500. This charge will be clearly shown at checkout before you complete your purchase — no surprises.",
            },
            {
                subtitle: "No Hidden Charges",
                text: "The total amount you see at checkout is exactly what you pay. There are no additional handling fees, packaging charges, or surcharges.",
            },
        ],
    },
    {
        title: "Order Tracking",
        content: [
            {
                subtitle: "Tracking Link",
                text: "Once your order is shipped, you will receive a tracking link via email and SMS. You can use this link to monitor your shipment in real time.",
            },
            {
                subtitle: "My Orders",
                text: "You can also track your order at any time by visiting the 'My Orders' section in your Cherry Honey account. Live status updates are available there.",
            },
            {
                subtitle: "Tracking Delays",
                text: "Please allow up to 24 hours after dispatch for tracking information to become active on the courier's website.",
            },
        ],
    },
    {
        title: "Delivery Locations",
        content: [
            {
                subtitle: "Pan-India Shipping",
                text: "We currently ship to all serviceable pin codes across India through our trusted courier partners. Enter your pin code at checkout to confirm delivery availability in your area.",
            },
            {
                subtitle: "International Shipping",
                text: "We do not currently offer international shipping. We hope to expand to international deliveries in the future — stay tuned for updates.",
            },
        ],
    },
    {
        title: "Delivery Attempts",
        content: [
            {
                subtitle: "Failed Delivery",
                text: "Our courier partners will attempt delivery up to 3 times if you are unavailable. After 3 failed attempts, the package will be returned to us. In such cases, re-delivery charges may apply.",
            },
            {
                subtitle: "Incorrect Address",
                text: "We are not responsible for delays or non-delivery caused by an incorrect or incomplete shipping address. Please double-check your address, pin code, and contact number before placing an order.",
            },
            {
                subtitle: "Address Changes",
                text: "If you need to change your delivery address after placing an order, please contact us immediately. Address changes can only be accommodated before the order is dispatched.",
            },
        ],
    },
    {
        title: "Damaged or Lost Shipments",
        content: [
            {
                subtitle: "Damaged in Transit",
                text: "If your order arrives visibly damaged, please photograph the package before opening it and contact us within 48 hours of delivery. We will arrange a replacement or refund as per our Refund Policy.",
            },
            {
                subtitle: "Lost Shipment",
                text: "In the rare event that your shipment is lost in transit, please contact us with your order ID. We will investigate with the courier partner and resolve the issue within 5–7 business days.",
            },
        ],
    },
    {
        title: "Changes to This Policy",
        content: [
            {
                subtitle: "",
                text: "We reserve the right to update or modify this Shipping & Delivery Policy at any time. Changes will be posted on this page with an updated effective date. Your continued use of our services after changes are posted constitutes your acceptance of the revised policy.",
            },
        ],
    },
];