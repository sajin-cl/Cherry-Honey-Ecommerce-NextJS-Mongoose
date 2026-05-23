"use client";

import { useState } from "react";

export default function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-800">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 text-left group"
            >
                <span className="text-white text-sm font-medium group-hover:text-[#C8A84B] transition-colors pr-4">
                    {q}
                </span>
                <span
                    className={`text-[#C8A84B] text-lg font-bold shrink-0 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"
                        }`}
                >
                    +
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 pb-4" : "max-h-0"
                    }`}
            >
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
        </div>
    );
}