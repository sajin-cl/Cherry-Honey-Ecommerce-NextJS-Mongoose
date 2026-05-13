"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to API route
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* ── Left panel: hero image ── */}
      <div className="relative hidden md:block w-1/2 h-full">
        <Image
          src="/bee-honeycomb.png"
          alt="Honey bee on honeycomb"
          fill
          sizes="50vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right panel: sign-in form ── */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center bg-[#111111]">
        <div className="w-full max-w-md px-10">

          {/* Title */}
          <h1
            className="text-5xl text-white mb-3"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400 }}
          >
            Sign in
          </h1>

          {/* Sub-heading */}
          <p className="text-sm text-gray-400 mb-10">
            Don&apos;t have an accout yet?{" "}
            <Link href="/accounts/register" className="font-bold text-gray-200 hover:text-white transition-colors">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email ID */}
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent border-0 border-b border-gray-600 text-gray-300 placeholder-gray-500 text-sm pb-2 pt-1 focus:outline-none focus:border-[#C8A84B] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border-0 border-b border-gray-600 text-gray-300 placeholder-gray-500 text-sm pb-2 pt-1 pr-10 focus:outline-none focus:border-[#C8A84B] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  {/* Custom checkbox */}
                  <div
                    className={`w-4 h-4 border transition-colors ${
                      rememberMe ? "bg-[#C8A84B] border-[#C8A84B]" : "bg-transparent border-gray-500"
                    } flex items-center justify-center`}
                  >
                    {rememberMe && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors select-none">
                  Remember me
                </span>
              </label>

              <Link
                href="/accounts/forgot-password"
                className="text-sm font-bold text-gray-200 hover:text-[#C8A84B] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In button */}
            <div className="flex justify-end pt-2">
              <button
                id="sign-in-btn"
                type="submit"
                className="bg-[#C8A84B] hover:bg-[#b8973e] active:bg-[#a8872e] text-white font-semibold text-sm px-10 py-3.5 transition-colors duration-200 tracking-wide"
              >
                Sign In
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
