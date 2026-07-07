"use client";

import { useEffect } from "react";

/**
 * Watches every [data-reveal] element and adds .in the first time it enters
 * the viewport (then unobserves). CSS in globals.css does the actual motion.
 * Deterministic replacement for one-shot GSAP scroll reveals.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("in");
            io.unobserve(el);
            // once revealed, drop the attribute so hover transforms/transitions
            // from utility classes take over again
            window.setTimeout(() => {
              el.removeAttribute("data-reveal");
              el.classList.remove("in");
            }, 1600);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
