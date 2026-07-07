"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  TESTIMONIOS_LABEL,
  TESTIMONIOS_TITLE,
  TESTIMONIALS,
} from "@/lib/content";

gsap.registerPlugin(useGSAP);

export function Testimonios() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // crossfade on slide change
  useGSAP(
    () => {
      gsap.fromTo(
        card.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
      );
    },
    { scope: root, dependencies: [index] },
  );

  const go = (i: number) =>
    setIndex((i + TESTIMONIALS.length) % TESTIMONIALS.length);

  const t = TESTIMONIALS[index];

  return (
    <section
      ref={root}
      id="testimonios"
      className="relative z-20 bg-cream-deep py-28 text-ink md:py-36"
    >
      <div className="grid-layout">
        <div className="col-span-12 mb-12 max-w-[580px]">
          <span data-reveal className="meta-label mb-4 block text-forest-light">
            {TESTIMONIOS_LABEL}
          </span>
          <h2 data-reveal className="display text-statement text-forest">
            {TESTIMONIOS_TITLE}
          </h2>
        </div>

        <div
          data-reveal
          style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          className="col-span-12 mx-auto w-full max-w-[780px]"
        >
          <div
            ref={card}
            className="rounded-[24px] border border-sand bg-white p-9 md:p-11"
            aria-live="polite"
          >
            <span aria-hidden className="display block text-[42px] leading-none text-olive-deep">
              &ldquo;
            </span>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
              {t.quote}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <div className="display flex h-11 w-11 items-center justify-center rounded-full border-2 border-olive-deep bg-tint text-[15px] text-forest">
                {t.initial}
              </div>
              <div>
                <b className="block text-[14px] text-forest">Paciente</b>
                <span className="text-[12.5px] text-forest-light">{t.age}</span>
              </div>
            </div>
          </div>

          {/* nav */}
          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              onClick={() => go(index - 1)}
              aria-label="Testimonio anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-forest text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              ←
            </button>
            <div className="flex gap-2.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === index ? "bg-forest" : "bg-sand hover:bg-olive-deep"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              aria-label="Testimonio siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-forest text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
