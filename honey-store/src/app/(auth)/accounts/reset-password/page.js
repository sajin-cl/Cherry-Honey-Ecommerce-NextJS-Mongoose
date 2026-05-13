"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to API route
    console.log({ password, confirmPassword });
  };

  /* Reusable eye icon SVG */
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-gray-600 text-gray-300 placeholder-gray-500 text-sm pb-2 pt-1 pr-10 focus:outline-none focus:border-[#C8A84B] transition-colors";

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* ── Left panel: hero image ── */}
      <div className="relative hidden md:block w-1/2 h-full">
        <Image
          src="/honeycomb-branch.png"
          alt="Honeycomb on branch with bees"
          fill
          sizes="50vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right panel: set new password form ── */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center bg-[#111111]">
        <div className="w-full max-w-md px-10">

          {/* Title */}
          <h1
            className="text-5xl text-white mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400 }}
          >
            Set new password
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-gray-400 mb-10">
            Your new password must be different to previously used passwords.
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-0 text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
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
