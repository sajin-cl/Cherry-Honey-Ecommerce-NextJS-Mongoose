"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from "next/navigation"


export default function CustomCursor() {

    const pathName = usePathname();
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });


    const isAdminPath = pathName.startsWith("/admin");
    if (isAdminPath) {
        return null;
    }

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + 'px';
                dotRef.current.style.top = e.clientY + 'px';
            }
        };

        let raf;
        const lerp = (a, b, t) => a + (b - a) * t;
        const loop = () => {
            ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
            if (ringRef.current) {
                ringRef.current.style.left = ring.current.x + 'px';
                ringRef.current.style.top = ring.current.y + 'px';
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onEnter = () => ringRef.current?.classList.add('big');
        const onLeave = () => ringRef.current?.classList.remove('big');

        document.addEventListener('mousemove', onMove, { passive: true });
        document.querySelectorAll('a, button, [data-hover]').forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        // Re-bind on DOM changes
        const observer = new MutationObserver(() => {
            document.querySelectorAll('a, button, [data-hover]').forEach(el => {
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener('mousemove', onMove);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cur-dot" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999, borderRadius: '50%', transform: 'translate(-50%,-50%)', top: 0, left: 0 }} />
            <div ref={ringRef} className="cur-ring" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99998, borderRadius: '50%', transform: 'translate(-50%,-50%)', top: 0, left: 0 }} />
        </>
    );
}