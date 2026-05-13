"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to API route
    console.log({ email });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* ── Left panel: hero image ── */}
      <div className="relative hidden md:block w-1/2 h-full">
        <Image
          src="/bees-honeycomb.png"
          alt="Bees on honeycomb"
          fill
          sizes="50vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right panel: forgot password form ── */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center bg-[#111111]">
        <div className="w-full max-w-md px-10">

          {/* Title */}
          <h1
            className="text-5xl text-white mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400 }}
          >
            Forgot password?
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-gray-400 mb-10">
            No worries, we&apos;ll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email Address */}
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-transparent border-0 border-b border-gray-600 text-gray-300 placeholder-gray-500 text-sm pb-2 pt-1 focus:outline-none focus:border-[#C8A84B] transition-colors"
              />
            </div>

            {/* Reset Password button */}
            <div className="flex justify-center pt-2">
              <button
                id="reset-password-btn"
                type="submit"
                className="bg-[#C8A84B] hover:bg-[#b8973e] active:bg-[#a8872e] text-white font-semibold text-sm px-12 py-3.5 transition-colors duration-200 tracking-wide"
              >
                Reset Password
              </button>
            </div>

            {/* Back to log in */}
            <div className="flex justify-center">
              <Link
                href="/accounts/login"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to log in
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
