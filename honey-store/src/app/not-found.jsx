import Link from "next/link";
import { getServerUser } from "@/lib/auth";

export const metadata = {
  title: "Page Not Found | Cherrys Honey",
};

const serif = {
  fontFamily: "'Georgia','Times New Roman',serif",
  fontStyle: "italic",
};

const DOTS = [
  {l:"8%",t:"15%"},{l:"18%",t:"72%"},{l:"28%",t:"40%"},{l:"38%",t:"85%"},
  {l:"48%",t:"22%"},{l:"58%",t:"68%"},{l:"68%",t:"38%"},{l:"78%",t:"90%"},
  {l:"88%",t:"12%"},{l:"95%",t:"55%"},{l:"3%", t:"50%"},{l:"13%",t:"88%"},
  {l:"23%",t:"30%"},{l:"33%",t:"60%"},{l:"43%",t:"8%" },{l:"53%",t:"78%"},
  {l:"63%",t:"48%"},{l:"73%",t:"20%"},{l:"83%",t:"65%"},{l:"93%",t:"35%"},
];

// Role based different quick links
const USER_LINKS = [
  { label: "Home",     href: "/"        },
  { label: "Products", href: "/products"},
  { label: "Cart",     href: "/cart"    },
  { label: "Orders",   href: "/orders"  },
  { label: "FAQ",      href: "/faq"     },
];

const ADMIN_LINKS = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Products",  href: "/admin/products"  },
  { label: "Orders",    href: "/admin/orders"    },
  { label: "Categories",href: "/admin/categories"},
];

const GUEST_LINKS = [
  { label: "Home",     href: "/"                  },
  { label: "Products", href: "/products"           },
  { label: "Sign In",  href: "/accounts/login"     },
  { label: "Sign Up",  href: "/accounts/register"  },
  { label: "FAQ",      href: "/faq"                },
];

export default async function NotFound() {
  const user = await getServerUser();
  const isAdmin = user?.role === "admin";
  const isUser  = user && !isAdmin;

  const quickLinks = isAdmin ? ADMIN_LINKS : isUser ? USER_LINKS : GUEST_LINKS;

  // Primary CTA
  const primaryHref  = isAdmin ? "/admin/dashboard" : "/";
  const primaryLabel = isAdmin ? "Go to Dashboard"  : "Go Home";

  // Secondary CTA
  const secondaryHref  = isAdmin ? "/admin/products" : "/products";
  const secondaryLabel = isAdmin ? "Manage Products" : "Shop Now";

  // Role badge
  const roleBadge = isAdmin
    ? { label: "Admin", color: "text-purple-400 border-purple-800 bg-purple-900/20" }
    : isUser
    ? { label: "User",  color: "text-[#C8A84B] border-[#C8A84B]/30 bg-[#C8A84B]/10" }
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {DOTS.map((p, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#C8A84B]"
            style={{ left: p.l, top: p.t }}
          />
        ))}
      </div>

      {/* Big 404 background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-[20rem] font-black text-white opacity-[0.02] leading-none">
          404
        </span>
      </div>

      {/* Main content */}
      <div className="relative text-center max-w-lg w-full">

        {/* Gold divider + label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-[#C8A84B]" />
          <span className="text-[#C8A84B] text-xs tracking-[0.3em] uppercase">
            404 Error
          </span>
          <div className="h-px w-12 bg-[#C8A84B]" />
        </div>

        {/* Role badge — logged in users only */}
        {roleBadge && (
          <div className="flex justify-center mb-6">
            <span className={`text-xs px-3 py-1 border rounded-full tracking-wider uppercase ${roleBadge?.color}`}>
              Signed in as {roleBadge?.label}
            </span>
          </div>
        )}

        {/* Honey jar illustration */}
        <div className="flex justify-center mb-8">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
            xmlns="http://www.w3.org/2000/svg" className="opacity-60">
            <path
              d="M20 30 Q18 32 18 36 L18 62 Q18 66 22 66 L58 66 Q62 66 62 62 L62 36 Q62 32 60 30 Z"
              fill="#C8A84B" fillOpacity="0.15" stroke="#C8A84B" strokeWidth="1.5" strokeLinejoin="round"
            />
            <rect x="26" y="22" width="28" height="10" rx="2"
              fill="#C8A84B" fillOpacity="0.2" stroke="#C8A84B" strokeWidth="1.5"/>
            <rect x="22" y="16" width="36" height="8" rx="3"
              fill="#C8A84B" fillOpacity="0.4" stroke="#C8A84B" strokeWidth="1.5"/>
            <path d="M38 66 Q38 72 40 74 Q42 72 42 66"
              fill="#C8A84B" fillOpacity="0.5" stroke="#C8A84B" strokeWidth="1"/>
            <line x1="25" y1="46" x2="55" y2="46" stroke="#C8A84B" strokeWidth="1" strokeOpacity="0.4"/>
            <line x1="25" y1="52" x2="50" y2="52" stroke="#C8A84B" strokeWidth="1" strokeOpacity="0.4"/>
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl text-white mb-4" style={serif}>
          Page Not Found
        </h1>

        {/* Subtext — role  */}
        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          {isAdmin
            ? "This admin page doesn't exist or has been moved. Head back to your dashboard."
            : "Looks like this page has flown away with the bees. The page you're looking for doesn't exist or has been moved."
          }
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="px-8 py-3 bg-[#C8A84B] hover:bg-[#b8973e] active:bg-[#a8872e] text-black font-bold text-sm tracking-widest uppercase transition-colors"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="px-8 py-3 border border-gray-700 hover:border-[#C8A84B] text-gray-300 hover:text-[#C8A84B] font-bold text-sm tracking-widest uppercase transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-600 text-xs uppercase tracking-wider mb-4">
            {isAdmin ? "Admin Pages" : "Quick Links"}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-gray-500">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#C8A84B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
