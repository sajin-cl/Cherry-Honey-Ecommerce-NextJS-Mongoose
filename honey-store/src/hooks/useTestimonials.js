"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Manages testimonial carousel state.
 * @param {number} total   - Total number of testimonials
 * @param {number} interval - Auto-advance interval in ms (default 3000)
 */
export function useTestimonials(total, interval = 3000) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
    }, [total]);

    const goTo = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, interval);
        return () => clearInterval(timer);
    }, [next, interval]);

    return { currentIndex, next, goTo };
}
