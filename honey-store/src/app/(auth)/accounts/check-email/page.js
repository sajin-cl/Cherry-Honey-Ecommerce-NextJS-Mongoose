"use client";

import Image from "next/image";
import Link from "next/link";

export default function CheckEmailPage() {
  const handleResend = () => {
    // TODO: connect to resend API route
    console.log("Resend email clicked");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* ── Left panel: hero image ── */}
      <div className="relative hidden md:block w-1/2 h-full">
        <Image
          src="/bee-sunflower.png"
          alt="Bee on sunflower"
          fill
          sizes="50vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right panel: check email content ── */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center bg-[#111111]">
        <div className="w-full max-w-md px-10 text-center">

          {/* Title */}
          <h1
            className="text-5xl text-white mb-6"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400 }}
          >
            Check your email
          </h1>

          {/* Resend line */}
          <p className="text-sm text-gray-400 mb-6">
            Didn&apos;t receive the email?{" "}
            <button
              id="resend-email-btn"
              type="button"
              onClick={handleResend}
              className="font-bold text-gray-200 hover:text-white transition-colors"
            >
              Click to resend
            </button>
          </p>

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
      </div>
    </div>
  );
}
