import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";


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