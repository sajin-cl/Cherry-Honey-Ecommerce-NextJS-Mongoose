"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GiHoneypot } from "react-icons/gi";
import { serifItalic } from "@/config/staticData";

export default function ShopOpeningModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAdminPath = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminPath) {
      return;
    }

    // Check if dismissed in sessionStorage
    const isDismissed = sessionStorage.getItem("shop_opening_modal_dismissed");
    if (!isDismissed) {
      // Small timeout to show it after a tiny delay for a nicer entrance
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAdminPath]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("shop_opening_modal_dismissed", "true");
  };

  if (isAdminPath) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
            className="relative w-full max-w-2xl bg-[#0d0d0d] border border-primary/30 p-8 md:p-10 text-center shadow-[0_0_50px_rgba(200,168,75,0.25)] flex flex-col items-center z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors duration-200 focus:outline-none p-1 cursor-pointer"
              aria-label="Close Announcement"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon Banner */}
            <div className="relative flex items-center justify-center mb-6 mt-2">
              <div className="absolute w-24 h-24 rounded-full border border-primary/20 animate-pulse" />
              <div className="absolute w-20 h-20 rounded-full border border-primary/45" />
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-amber-300 flex items-center justify-center shadow-lg shadow-primary/25">
                <GiHoneypot className="w-7 h-7 text-black animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-primary text-[10px] tracking-[0.4em] uppercase mb-3 font-sans font-semibold">
              Announcement
            </p>

            {/* Heading */}
            <h2
              className="text-white text-3xl md:text-4xl leading-tight mb-4 select-none"
              style={serifItalic}
            >
              Shop Opening Soon
            </h2>

            {/* Description */}
            <p className="text-gray-400 font-popins text-xs md:text-sm leading-loose mb-8 max-w-md mx-auto tracking-wider">
              Our shop officially opens next month (July).<br />
              You cannot place orders or make purchases on the website until launch day.
              <br />
              <span className="inline-block mt-3 text-primary/80 font-medium italic">
                Thank you for your patience and support!
              </span>
            </p>

            {/* Button */}
            <button
              onClick={handleClose}
              className="w-full active:scale-95 bg-primary hover:bg-secondary text-black font-bold text-center text-xs py-4 tracking-[0.2em] uppercase transition-all duration-200 shadow-md shadow-primary/10 cursor-pointer"
            >
              Browse Website
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
