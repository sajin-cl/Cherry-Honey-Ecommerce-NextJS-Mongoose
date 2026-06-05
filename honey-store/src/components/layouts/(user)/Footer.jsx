import Link from "next/link";
import Image from "next/image";
import { ADMIN_PHONE, CUSTOMER_CARE_EMAIL, SOCIAL_LINKS } from '@/config/staticData'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-primary rounded-xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3
            className="text-2xl text-white font-semibold"
            style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          >
            Let's Get In Touch <br />
            <span className="text-xs text-black font-semibold" style={{ fontFamily: "'Georgia', serif" }}>What' s inside? Exclusive sales, new arrivals & much more.</span>
          </h3>
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black/20 text-black placeholder-black/60 text-sm px-5 py-3 rounded-lg flex-1 md:w-72 focus:outline-none focus:ring-2 focus:ring-black/30"
            />
            <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-6 pb-8 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/footer-logo.png" alt="Logo" width={120} height={100} />
          </div>
          <div className="flex gap-1 md:gap-2 lg:gap-4 mt-4 items-center">
            {SOCIAL_LINKS.map((social, idx) => {
              const Icon = social?.icon;
              return (
                <Link
                  key={idx}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 text-gray-100 hover:text-amber-300 transition"
                >
                  <Icon size={social?.size}  />
                </Link>
              );
            })}
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-amber-200 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors ">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="text-amber-200 font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-amber-200 font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition-colors">
              <Link
                href={`mailto:${CUSTOMER_CARE_EMAIL}`}
              >
                {CUSTOMER_CARE_EMAIL}
              </Link>
            </li>
            <li className="hover:text-white transition-colors"><Link href={`tel:${ADMIN_PHONE}`}>{ADMIN_PHONE}</Link></li>
            <li className="hover:text-white transition-colors">Chennai, Tamilnadu</li>
          </ul>
        </div>  
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-400 italic">
        © {new Date().getFullYear()} Cherrys Honey. All rights reserved and developed by <Link href="https://sajincl-porfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100 text-primary font-mono italic transition-colors">sajin-cl</Link>
      </div>
    </footer>
  );
}
