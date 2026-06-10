"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/apiClient";


function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const initialDevUrl = searchParams.get("devUrl") || "";
  const [devUrl, setDevUrl] = useState(initialDevUrl);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    setMessage("");
    try {
      const data = await apiClient.forgotPassword(email);
      setMessage("Verification email has been resent.");
      if (data.resetUrl) {
        setDevUrl(data.resetUrl);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to resend email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-10 text-center bg-[#111111]">
      {/* Title */}
      <h1
        className="text-5xl text-white mb-6"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400 }}
      >
        Check your email
      </h1>

      {email && (
        <p className="text-sm text-gray-300 mb-4">
          We sent a password reset link to <span className="font-semibold text-amber-200">{email}</span>.
        </p>
      )}

      {/* Resend line */}
      <p className="text-sm text-gray-400 mb-6">
        Didn&apos;t receive the email?{" "}
        <button
          id="resend-email-btn"
          type="button"
          disabled={loading || !email}
          onClick={handleResend}
          className="font-bold text-gray-200 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Click to resend"}
        </button>
      </p>

      {message && (
        <p className="text-xs text-amber-400 mb-6">{message}</p>
      )}

      {/* Dev Shortcut Link */}
      {devUrl && (
        <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-left text-xs text-amber-200">
          <span className="font-bold block mb-1 leading-[24px]">Hint : Please check your email and click the link to set a new password.</span>

        </div>
      )}

      {/* Back to log in */}
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
  );
}

export default function CheckEmailPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* ── Left panel: hero image ── */}
      <div className="relative hidden md:block w-1/2 h-full">
        <Image
          src="/bee-sunflower.webp"
          alt="Bee on sunflower"
          fill
          sizes="50vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right panel: check email content ── */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center bg-[#111111]">
        <Suspense fallback={<div className="text-white text-sm">Loading...</div>}>
          <CheckEmailContent />
        </Suspense>
      </div>
    </div>
  );
}
