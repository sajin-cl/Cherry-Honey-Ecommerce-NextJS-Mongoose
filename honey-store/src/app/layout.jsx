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
    process.env.NODE_ENV === 'production'
      ? 'https://cherry-honey-ecommerce.vercel.app'
      : 'http://localhost:3000'
  ),
  title: "Cherry Honey Ecommerce | Pure Natural Honey & Organic Products Shop In Kanyakumari District",
  description: "Buy 100% pure, raw, and organic Cherry Honey online...",
  keywords: ["buy pure honey online", "cherry honey shop"],
  authors: [{ name: "Sajin.C.L" }],
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

  alternates: {
    canonical: "https://cherry-honey-ecommerce.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Cherry Honey | Pure Natural Honey Shop Online",
    description: "Looking for 100% organic raw honey?...",
    url: "https://cherry-honey-ecommerce.vercel.app/",
    siteName: "Cherry's Honey Store",
    type: "website",
    images: [
      {
        url: "/og-honey-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Cherry's Honey Pure Organic Products",
      },
    ],
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