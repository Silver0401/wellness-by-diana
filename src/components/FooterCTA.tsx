"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CTA, REDES, WHATSAPP, WA_FLOAT } from "@/lib/content";

gsap.registerPlugin(useGSAP);

export function FooterCTA() {
  const root = useRef<HTMLElement>(null);
  const orb = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(orb.current, {
        y: 22,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contacto"
      className="relative z-20 flex min-h-screen flex-col bg-forest-deep text-cream"
    >
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* floating portrait orb */}
        <div
          ref={orb}
          className="pointer-events-none absolute top-[14%] h-[38vh] w-[38vh] overflow-hidden rounded-full border-4 border-cream/20 opacity-95 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        >
          <Image
            src="/images/diana-photo.jpg"
            alt=""
            fill
            sizes="38vh"
            className="scale-110 object-cover object-[center_20%]"
          />
        </div>

        {/* side captions */}
        <span className="meta-label absolute left-[var(--grid-margin)] top-1/2 hidden text-cream/60 md:block">
          {CTA.left}
        </span>
        <span className="meta-label absolute right-[var(--grid-margin)] top-1/2 hidden text-cream/60 md:block">
          {CTA.right}
        </span>

        {/* centered CTA */}
        <div className="relative z-10 mt-[22vh] text-center">
          <h2 className="display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05]">
            <span className="block overflow-hidden">
              <span data-reveal="line" className="block">
                {CTA.headline}
              </span>
            </span>
          </h2>
          <span className="block overflow-hidden pt-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal="line"
              style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
              className="inline-flex items-center justify-center rounded-full bg-burgundy px-9 py-4 font-bold text-white shadow-[0_10px_28px_rgba(115,23,31,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-burgundy-light"
            >
              {CTA.action}
            </a>
          </span>
        </div>
      </div>

      {/* footer */}
      <footer className="border-t border-cream/15">
        <div className="grid-layout items-center gap-y-3 py-6">
          <span className="meta-label col-span-12 text-cream/70 md:col-span-4">
            {CTA.copyright}
          </span>
          <nav className="col-span-12 flex gap-6 md:col-span-4 md:justify-center">
            {REDES.map((red) => (
              <a
                key={red.name}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-label text-cream/70 transition-colors hover:text-cream"
              >
                {red.name}
              </a>
            ))}
          </nav>
          <span className="meta-label col-span-12 text-cream/70 md:col-span-4 md:text-right">
            {CTA.madeIn}
          </span>
        </div>
        <div className="grid-layout border-t border-cream/10 py-4">
          <span className="meta-label col-span-12 text-center text-[11px] text-cream/50">
            {CTA.credit}
          </span>
        </div>
      </footer>
    </section>
  );
}

/** Mobile-only sticky WhatsApp bar — the reference's .wa-float. */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed inset-x-0 bottom-0 z-[90] flex items-center justify-center gap-2 bg-forest px-5 py-4 font-bold text-white shadow-[0_-6px_20px_rgba(0,0,0,0.25)] md:hidden"
    >
      {WA_FLOAT}
    </a>
  );
}
