import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const viewport = {
  themeColor: "#fbbf24",
};


export const metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://www.cherryshoney.com"
      : "http://localhost:3000"
  ),

  title:
    "Cherrys Honey Ecommerce | Pure Natural Honey & Organic Products Shop In India",

  description:
    "Buy 100% pure, raw and natural honey online from Cherrys Honey. Premium quality honey sourced naturally and delivered across India.",

  keywords: [
    "pure honey",
    "raw honey",
    "organic honeys",
    "buy honey online",
    "natural honey",
    "honey shop india",
    "cherrys honey",
    "premium honey",
  ],

  authors: [{ name: "Sajin C L" }],

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Cherrys Honey | Pure Natural Honey Shop Online",
    description:
      "Shop premium raw honey and natural bee products from Cherrys Honey. Pure, natural and delivered across India.",
    url: "/",
    siteName: "Cherrys Honey",
    type: "website",
    images: [
      {
        url: "/preview-image.webp",
        width: 1200,
        height: 630,
        alt: "Cherrys Honey Pure Organic Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cherrys Honey | Pure Natural Honey Shop Online",
    description:
      "Shop premium raw honey and natural bee products from Cherrys Honey. Pure, natural and delivered across India.",
    images: ["/preview-image.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}