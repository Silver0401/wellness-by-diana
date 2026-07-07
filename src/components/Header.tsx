"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND, NAV, NAV_CTA, WHATSAPP } from "@/lib/content";

/**
 * Fixed header with two visual states:
 * - Over the hero (white cover → forest dive) the logo + nav render as white
 *   ink with mix-blend-difference ON THE HEADER ITSELF (a child wrapper would
 *   be isolated by the header's stacking context and blend against nothing),
 *   so they invert against whatever the scroll animation shows.
 * - Once the cream content sections reach the top, blending would wash out,
 *   so the header switches to a solid state: translucent cream bar, colored
 *   logo, forest nav text.
 * The WhatsApp CTA is a fixed sibling outside the blend so its burgundy
 * stays true everywhere.
 */
export function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const target = document.querySelector("#enfoque");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setSolid(entry.isIntersecting || entry.boundingClientRect.top < 0),
      // flip as soon as the first content section touches the header
      { rootMargin: "-64px 0px -100% 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* solid-state backdrop — separate layer so the blend header stays clean */}
      <div
        aria-hidden
        className={`fixed inset-x-0 top-0 z-[78] h-[70px] border-b border-sand bg-cream/90 backdrop-blur-md transition-opacity duration-300 ${
          solid ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        className={`fixed inset-x-0 top-0 z-[80] ${solid ? "" : "mix-blend-difference"}`}
      >
        <div
          className={`grid-layout items-center py-[18px] ${
            solid ? "text-forest" : "text-white"
          }`}
        >
          <a
            href="#top"
            className="col-span-6 flex items-center"
            aria-label={`${BRAND} — Inicio`}
          >
            <Image
              src={solid ? "/images/logo-diana.png" : "/images/logo-diana-white.png"}
              alt="Wellness by Diana"
              width={560}
              height={180}
              priority
              className="h-[34px] w-auto"
            />
          </a>

          <nav className="col-span-6 hidden items-center justify-end gap-8 pr-[190px] md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="meta-label text-[13px] transition-opacity duration-200 hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* unblended fixed sibling: brand-color CTA */}
      <div className="pointer-events-none fixed right-[var(--grid-margin)] top-0 z-[81] flex h-[70px] items-center">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="meta-label pointer-events-auto rounded-full bg-burgundy px-5 py-3 text-[12px] text-white shadow-[0_8px_22px_rgba(115,23,31,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-burgundy-light"
        >
          {NAV_CTA}
        </a>
      </div>
    </>
  );
}
