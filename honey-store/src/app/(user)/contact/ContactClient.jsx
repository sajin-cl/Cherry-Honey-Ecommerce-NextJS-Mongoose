"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_PHONE, CUSTOMER_CARE_EMAIL } from "@/config/staticData";
import { apiClient } from "@/lib/apiClient";

const serifItalic = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 400,
};

export default function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("send-message-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      await apiClient.submitContact(formData);
      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-28 pb-20">
      {/* Background honeycomb overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Image
          src="/honey-comb.webp"
          fill
          className="object-cover"
          alt=""
        />
      </div>

      {/* ══════════════════════════════════════════════
          HERO HEADER SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 text-center py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-bold">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-6xl text-white font-light mb-6 tracking-wide">
            We'd Love To{" "}
            <span className="text-primary" style={serifItalic}>
              Hear From You
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Whether you are seeking bespoke gifting solutions, inquiring about
            our private reserve, or simply wishing to share your experience with
            our artisanal honey.
          </p>
          <div className="flex flex-col min-[410px]:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="w-full min-[410px]:w-auto bg-primary hover:bg-secondary text-black font-bold text-xs px-4 md:px-8 py-4 tracking-[0.2em] uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(200,168,75,0.25)] cursor-pointer"
            >
              Contact Now
            </button>

            <Link
              href="/products"
              className="w-full min-[410px]:w-auto border border-gray-600 text-gray-300 hover:border-primary hover:text-primary font-semibold text-xs px-4 md:px-8 py-4 tracking-[0.2em] uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
            >
              Explore Products
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          HONEY DRIP DIVIDER
      ══════════════════════════════════════════════ */}
      <div className="relative w-full h-24 md:h-36 mt-14 mb-0 select-none pointer-events-none z-10 overflow-hidden">
        <Image
          src="/honey-dripv1.webp"
          fill
          className="object-cover mix-blend-screen contrast-125 brightness-95"
          alt=""
          priority
        />
      </div>


      {/* ══════════════════════════════════════════════
          CONTACT CARDS GRID
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-5 pb-12">
        <Image
          src="/honey-comb.webp"
          fill
          className="object-cover"
          alt=""
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Phone */}
          <motion.div
            className="bg-[#111111]/40 backdrop-blur-md border border-gray-800 hover:border-primary/40 p-8 rounded-xl text-center transition-all duration-500 hover:-translate-y-1.5 group"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-5 group-hover:border-primary/40 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.6221A16.7 16.7 0 0019.5 21.75c.4 0 .783-.075 1.125-.213M6.3 3.6h2.7c.395 0 .736.262.833.645l.654 2.617a.895.895 0 01-.482.996l-1.636.818a10.82 10.82 0 005.156 5.156l.818-1.636a.895.895 0 01.996-.482l2.617.654c.383.097.645.438.645.833v2.7a2.25 2.25 0 01-2.25 2.25A17.9 17.9 0 012.25 4.5A2.25 2.25 0 014.5 2.25h2.7"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-primary transition-colors duration-300">
              Phone
            </p>
            <p className="text-white text-sm font-medium tracking-wide">
              {ADMIN_PHONE}
            </p>
          </motion.div>

          {/* Card 2: Email */}
          <motion.div
            className="bg-[#111111]/40 backdrop-blur-md border border-gray-800 hover:border-primary/40 p-8 rounded-xl text-center transition-all duration-500 hover:-translate-y-1.5 group"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-5 group-hover:border-primary/40 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-primary transition-colors duration-300">
              Email
            </p>
            <p className="text-white text-sm font-medium tracking-wide">
              {CUSTOMER_CARE_EMAIL}
            </p>
          </motion.div>

          {/* Card 3: Location */}
          <motion.div
            className="bg-[#111111]/40 backdrop-blur-md border border-gray-800 hover:border-primary/40 p-8 rounded-xl text-center transition-all duration-500 hover:-translate-y-1.5 group"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-5 group-hover:border-primary/40 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-primary transition-colors duration-300">
              Location
            </p>
            <p className="text-white text-sm font-medium tracking-wide">
              Chennai,Tamil Nadu,India
            </p>
          </motion.div>

          {/* Card 4: Hours */}
          <motion.div
            className="bg-[#111111]/40 backdrop-blur-md border border-gray-800 hover:border-primary/40 p-8 rounded-xl text-center transition-all duration-500 hover:-translate-y-1.5 group"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-5 group-hover:border-primary/40 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-primary transition-colors duration-300">
              Hours
            </p>
            <p className="text-white text-sm font-medium tracking-wide">
              Mon – Sat | 9 AM – 6 PM
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SEND MESSAGE SECTION
      ══════════════════════════════════════════════ */}
      <section
        id="send-message-section"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 mt-12 border-t border-gray-900"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Text Detail */}
          <div className="lg:col-span-5 relative pr-0 lg:pr-8">

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2
                className="text-4xl lg:text-5xl text-white font-light leading-tight mb-6"
                style={serifItalic}
              >
                Send a <span className="text-primary">Message</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                Our dedicated concierges are available to assist you with
                special requests, bulk orders, or detailed inquiries about our
                sustainable harvesting practices. Fill out the form, and we will
                respond with the utmost priority.
              </p>

            </motion.div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#111111]/30 border border-gray-900 rounded-2xl p-6 md:p-10 backdrop-blur-md relative"
            >
              {/* Form success / error banner overlays */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-black/95 rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20 border border-primary"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-2xl text-white mb-3"
                      style={serifItalic}
                    >
                      Message Sent Successfully
                    </h3>
                    <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
                      Thank you for contacting Cherrys Honey. Our concierge team
                      has received your message and will review it with absolute
                      priority.
                    </p>
                    <button
                      onClick={() => setSubmitStatus(null)}
                      className="bg-primary hover:bg-secondary text-black font-bold text-xs px-8 py-3.5 tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-950/40 border border-red-900 rounded-lg text-red-400 text-sm text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Grid Inputs: Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="py-3 px-1 w-full text-white placeholder-gray-500 bg-transparent border-b border-gray-800 focus:border-primary focus:outline-none transition-colors duration-300 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="py-3 px-1 w-full text-white placeholder-gray-500 bg-transparent border-b border-gray-800 focus:border-primary focus:outline-none transition-colors duration-300 text-sm"
                    />
                  </div>
                </div>

                {/* Grid Inputs: Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone */}
                  <div className="relative group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="py-3 px-1 w-full text-white placeholder-gray-500 bg-transparent border-b border-gray-800 focus:border-primary focus:outline-none transition-colors duration-300 text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="py-3 px-1 w-full text-white placeholder-gray-500 bg-transparent border-b border-gray-800 focus:border-primary focus:outline-none transition-colors duration-300 text-sm"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="py-3 px-1 w-full text-white placeholder-gray-500 bg-transparent border-b border-gray-800 focus:border-primary focus:outline-none transition-colors duration-300 text-sm resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full  bg-primary hover:bg-secondary disabled:bg-[#555] disabled:cursor-not-allowed text-black font-bold text-xs py-4 tracking-[0.25em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_4px_25px_rgba(200,168,75,0.2)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
