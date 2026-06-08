"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";


export default function CustomCursor() {
  const pathname = usePathname();

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  const isAdminPath = pathname.startsWith("/admin");

  useEffect(() => {
    // Admin pages skip
    if (isAdminPath || typeof window === "undefined") {
      return;
    }

    // Skip mobile & touch devices
    const isMobile =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isMobile) {
      return;
    }

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const onMove = (e) => {
      pos.current = {
        x: e.clientX,
        y: e.clientY,
      };

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    let rafId;

    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    const onEnter = (e) => {
      if (e.target.closest("a, button, [data-hover]")) {
        ringRef.current?.classList.add("big");
      }
    };

    const onLeave = (e) => {
      if (e.target.closest("a, button, [data-hover]")) {
        ringRef.current?.classList.remove("big");
      }
    };

    document.addEventListener("mousemove", onMove, {
      passive: true,
    });

    document.body.addEventListener("mouseenter", onEnter, true);
    document.body.addEventListener("mouseleave", onLeave, true);

    return () => {
      cancelAnimationFrame(rafId);

      document.removeEventListener("mousemove", onMove);

      document.body.removeEventListener(
        "mouseenter",
        onEnter,
        true
      );

      document.body.removeEventListener(
        "mouseleave",
        onLeave,
        true
      );
    };
  }, [isAdminPath]);

  if (isAdminPath) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="cur-dot"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99999,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
        }}
      />

      <div
        ref={ringRef}
        className="cur-ring"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99998,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}