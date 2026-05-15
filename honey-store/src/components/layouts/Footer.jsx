import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#C8A84B] rounded-xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3
            className="text-2xl text-black font-semibold"
            style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          >
            Join Our Newsletter
          </h3>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black/20 text-black placeholder-black/60 text-sm px-5 py-3 rounded-lg flex-1 md:w-72 focus:outline-none focus:ring-2 focus:ring-black/30"
            />
            <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-6 pb-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-[#C8A84B]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9.5 2 7 4 7 7c0 1.5.5 2.8 1.3 3.8C6.5 12 5.5 14 5.5 16c0 3.5 3 6 6.5 6s6.5-2.5 6.5-6c0-2-1-4-2.8-5.2C16.5 9.8 17 8.5 17 7c0-3-2.5-5-5-5zm0 2c1.5 0 3 1.2 3 3s-1.5 3-3 3-3-1.2-3-3 1.5-3 3-3z" />
            </svg>
            <span className="text-[#C8A84B] font-bold" style={{ fontFamily: "'Georgia', serif" }}>Queen Honey</span>
          </div>
          <div className="flex gap-3 mt-4">
            {["facebook", "instagram", "twitter"].map((s) => (
              <a key={s} href="#" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#C8A84B] hover:border-[#C8A84B] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /></svg>
              </a>
            ))}
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-[#C8A84B] transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-[#C8A84B] transition-colors">Products</Link></li>
            <li><Link href="/about" className="hover:text-[#C8A84B] transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#C8A84B] transition-colors">Contact</Link></li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/faq" className="hover:text-[#C8A84B] transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-[#C8A84B] transition-colors">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-[#C8A84B] transition-colors">Returns</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-[#C8A84B] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>info@cherryhoney.com</li>
            <li>+91 8056 8258 14</li>
            <li>Kanyakumari, Tamilnadu</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        © 2026 Queen Honey. All rights reserved and developed by sajin-cl.
      </div>
    </footer>
  );
}
