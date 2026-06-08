import { FaInstagram } from "react-icons/fa";
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
export const CUSTOMER_CARE_EMAIL = "supportcherryshoney@gmail.com"


export const SOCIAL_LINKS = [
    { icon: SiFacebook, href: "", name: 'Facebook', size: 15 },
    { icon: FaInstagram, href: "", name: 'Instagram', size: 15 },
    { icon: FaXTwitter, href: "", name: 'X', size: 12 },
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

/*------- Privacy Policy*/
export const PRIVACY_POLICY_SECTIONS = [
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

/* --------------------------------------------------Terms and Conditions---------------------------------- */
export const TERMS_AND_CONDITIONS_SECTIONS = [
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


/* ---------------------------------------- Filter Sidebar Sizes ---------------------------------------- */

export const FILTER_SIZES = [
    { id: "s-250", label: "250 g", count: 120 },
    { id: "s-500", label: "500 g", count: 240 },
    { id: "s-1000", label: "1 kg", count: 175 },
];


/* ---------------------------------------- ProductCard Particle Animations ---------------------------------------- */

export const PRODUCT_PARTICLE_DOTS = [
    { delay: 0, left: "15%", top: "70%", size: "5px" },
    { delay: 0.4, left: "45%", top: "50%", size: "4px" },
    { delay: 0.8, left: "75%", top: "65%", size: "6px" },
];

export const PRODUCT_PARTICLE_STARS = [
    { delay: 0.2, left: "30%", top: "35%", size: "12px" },
    { delay: 0.6, left: "85%", top: "40%", size: "10px" },
    { delay: 1.0, left: "20%", top: "20%", size: "14px" },
];


/* ---------------------------------------- Product Detail Page Static Data ---------------------------------------- */

/**
 * @param {{ name?: string, category?: string }} product
 */

export function PRODUCT_SPECS(product) {
    return {
        inTheBox: [
            { label: "Sales Package", value: `1 Bottle Pure ${product?.name}` },
            { label: "Pack of", value: "1" },
        ],
        general: [
            { label: "Product Name", value: product?.name },
            { label: "Category", value: product?.category },
            { label: "Flavour", value: "Natural Sweet" },
            { label: "Container type", value: "Glass Bottle" },
            { label: "Shelf Life", value: "12 Months" },
        ],
    };
}

/**
 * Returns product-specific FAQs for the detail page.
 * @param {string} productName
 */
export function PRODUCT_DETAIL_FAQS(productName) {
    return [
        {
            q: `What makes ${productName || "honey"} different from regular honey?`,
            a: "Our honey is ethically sourced, raw, and organic. Unlike regular honey, it preserves all natural nutrients, enzymes, and antioxidants.",
        },
        {
            q: "How should I store this honey?",
            a: "Store at room temperature away from direct sunlight. Do not refrigerate as it accelerates crystallisation.",
        },
    ];
}

export const PRODUCT_SHIPPING_DETAILS = {
    shipping: "We ensure fast and secure delivery of your honey products. Orders are processed within 24 hours and delivered within 3–4 business days.",
    returns: "If you receive a damaged or incorrect product, you can request a return within 7 days of delivery.",
};
