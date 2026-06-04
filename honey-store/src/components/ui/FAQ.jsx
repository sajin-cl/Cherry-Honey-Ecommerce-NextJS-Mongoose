"use client"

import { useState } from "react";


function ChevronIcon({ open }) {
    return (
        <svg
            className={`w-5 h-5 text-primary transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

export default function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`border-b border-gray-800 transition-colors duration-200 ${open ? "bg-[#111]" : "hover:bg-[#0e0e0e]"}`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
                <span className={`text-sm font-medium leading-snug transition-colors ${open ? "text-primary" : "text-gray-200"}`}>
                    {q}
                </span>
                <ChevronIcon open={open} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{a}</p>
            </div>
        </div>
    );
}