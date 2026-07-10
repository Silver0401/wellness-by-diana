"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HERO_STATEMENT, SCROLL_CUE, MARQUEE } from "@/lib/content";
import { ArrowDown } from "@/components/icons";
import { PLANT_OUTER_TRANSFORM, PLANT_INNER_TRANSFORM, PLANT_PATH_D } from "@/components/PlantMark";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Fixed hero built as a "window dive":
 *
 *  - z-0  : the practice photo, full-bleed (this IS the next section's bg).
 *  - z-10 : a white cover with a plant-shaped hole punched through it
 *           (smoothed with a blur+threshold filter). Scrolling scales the
 *           cover up so the hole swallows the viewport -> full immersion
 *           into the photo BEFORE the next section scrolls over it.
 *  - z-30 : a particle canvas. Hovering the plant disintegrates it: photo
 *           colored shards fly off the cursor and white "gaps" mark the
 *           missing pieces, then heal back.
 */

// numeric copies of the mask transforms (kept in sync with PlantMark)
const OUTER = { tx: 365.3, ty: 368, s: 0.2829 };
const INNER = { tx: 0, ty: 1414, s: 0.1 };

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const coverWrap = useRef<HTMLDivElement>(null); // scroll-zoom target
  const coverSvg = useRef<SVGSVGElement>(null); // intro target
  const photoWrap = useRef<HTMLDivElement>(null); // counter-zoom for depth
  const vignette = useRef<HTMLDivElement>(null); // optical corner darkening
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      // ---------- (1) intro: hole settles shut, statement rises ----------
      gsap.from(coverSvg.current, {
        scale: 1.6,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        transformOrigin: "50% 50%",
      });
      gsap.from(".hero-line", {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
      });

      // ---------- (2) scroll: dive fully INTO the photo ----------
      // Scale the cover so the plant hole grows. NOTE: the cover is NOT a
      // promoted (will-change) layer and the scale is capped — pushing a
      // composited layer past the GPU max texture size (~16k px) leaves a
      // blank/stale texture that persists on scroll-up. Cap keeps every frame
      // repaintable; the opacity fade below finishes the immersion.
      const zoomST = gsap.to(coverWrap.current, {
        scale: 11,
        ease: "power2.in",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=170%",
          scrub: true,
          // OPTICAL EFFECT: green vignette darkens the corners, peaking at
          // mid-dive and fading as you arrive — mirrors the reference's
          // sin(prog·π)·0.6 curve (the "lens" look through the plant window).
          onUpdate: (self) => {
            if (vignette.current) {
              // peak skewed to ~0.63 (prog^1.5) so it lands once the photo,
              // not the white cover, fills the frame; amplitude 0.7
              const p = Math.pow(self.progress, 1.5);
              vignette.current.style.opacity = String(Math.sin(p * Math.PI) * 0.7);
            }
          },
        },
      }).scrollTrigger!;
      // dissolve the remaining white so the photo takes over completely
      gsap.to(coverWrap.current, {
        autoAlpha: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top+=55% top",
          end: "+=75%",
          scrub: true,
        },
      });
      // the contour leaves early — scaled up it reads as gray streaks
      gsap.to(".plant-outline", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top+=35% top",
          end: "+=35%",
          scrub: true,
        },
      });
      // photo rushes forward -> keeps the "dive" intensity now that the
      // cover scale is capped for the GPU-texture safety above.
      // It also starts blurred + dimmed and snaps into focus as you pass
      // through the leaf — the optical "rack focus" from the reference.
      gsap.fromTo(
        photoWrap.current,
        { filter: "brightness(0.7) blur(9px)" },
        {
          scale: 1.5,
          filter: "brightness(1) blur(0px)",
          ease: "power1.in",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "+=170%",
            scrub: true,
          },
        },
      );
      // statement + cue leave early
      gsap.to([".hero-copy", ".scroll-cue", ".hero-marquee"], {
        opacity: 0,
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=25%",
          scrub: true,
        },
      });

      // ---------- (3) hover: particle disintegration ----------
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const plantPath = new Path2D(PLANT_PATH_D);

      // offscreen: photo at viewport size (object-cover math) for color sampling
      const photoC = document.createElement("canvas");
      const photoCtx = photoC.getContext("2d", { willReadFrequently: true })!;
      // offscreen: plant silhouette alpha map for hit-testing
      const maskC = document.createElement("canvas");
      const maskCtx = maskC.getContext("2d", { willReadFrequently: true })!;
      let photoPx: Uint8ClampedArray | null = null;
      let maskPx: Uint8ClampedArray | null = null;

      const img = new window.Image();
      img.src = "/images/yoga-pose.jpg";

      let W = 0;
      let H = 0;
      const layout = () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = photoC.width = maskC.width = W;
        canvas.height = photoC.height = maskC.height = H;

        // photo, object-cover
        if (img.complete && img.naturalWidth) {
          const k = Math.max(W / img.naturalWidth, H / img.naturalHeight);
          const dw = img.naturalWidth * k;
          const dh = img.naturalHeight * k;
          photoCtx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
          photoPx = photoCtx.getImageData(0, 0, W, H).data;
        }

        // plant silhouette in screen space (same slice mapping as the cover svg)
        const s = Math.max(W, H) / 1000;
        maskCtx.setTransform(s, 0, 0, s, (W - 1000 * s) / 2, (H - 1000 * s) / 2);
        maskCtx.translate(OUTER.tx, OUTER.ty);
        maskCtx.scale(OUTER.s, OUTER.s);
        maskCtx.translate(INNER.tx, INNER.ty);
        maskCtx.scale(INNER.s, -INNER.s);
        maskCtx.fillStyle = "#fff";
        maskCtx.fill(plantPath);
        maskCtx.setTransform(1, 0, 0, 1, 0, 0);
        maskPx = maskCtx.getImageData(0, 0, W, H).data;
      };
      img.onload = layout;
      layout();
      window.addEventListener("resize", layout);

      const inPlant = (x: number, y: number) => {
        if (!maskPx) return false;
        const xi = Math.round(x);
        const yi = Math.round(y);
        if (xi < 0 || yi < 0 || xi >= W || yi >= H) return false;
        return maskPx[(yi * W + xi) * 4 + 3] > 0;
      };
      const colorAt = (x: number, y: number) => {
        if (!photoPx) return "rgb(80,100,75)";
        const i = (Math.round(y) * W + Math.round(x)) * 4;
        return `rgb(${photoPx[i]},${photoPx[i + 1]},${photoPx[i + 2]})`;
      };

      type Shard = {
        x: number; y: number; vx: number; vy: number;
        size: number; rot: number; vr: number; life: number; color: string;
      };
      type Gap = { x: number; y: number; size: number; life: number };
      const shards: Shard[] = [];
      const gaps: Gap[] = [];
      const rand = (a: number, b: number) => a + Math.random() * (b - a);

      let lastX = -999;
      let lastY = -999;
      const onMove = (e: PointerEvent) => {
        if (zoomST.progress > 0.02) return; // no disintegration mid-dive
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (dx * dx + dy * dy < 36) return; // throttle by travel distance
        lastX = e.clientX;
        lastY = e.clientY;
        if (!inPlant(e.clientX, e.clientY)) return;
        for (let i = 0; i < 16; i++) {
          const px = e.clientX + rand(-30, 30);
          const py = e.clientY + rand(-30, 30);
          if (!inPlant(px, py)) continue;
          const size = rand(4, 11);
          shards.push({
            x: px, y: py,
            vx: (px - e.clientX) * 0.45 + rand(-2, 2),
            vy: (py - e.clientY) * 0.45 + rand(-3.4, -0.8),
            size, rot: rand(0, Math.PI), vr: rand(-0.22, 0.22),
            life: 1, color: colorAt(px, py),
          });
          gaps.push({ x: px, y: py, size: size + 3, life: 1 });
        }
        if (shards.length > 700) shards.splice(0, shards.length - 700);
        if (gaps.length > 700) gaps.splice(0, gaps.length - 700);
      };
      root.current!.addEventListener("pointermove", onMove);

      const render = () => {
        ctx.clearRect(0, 0, W, H);
        // white gaps = missing pieces, healing back
        for (let i = gaps.length - 1; i >= 0; i--) {
          const g = gaps[i];
          g.life -= 0.016;
          if (g.life <= 0) { gaps.splice(i, 1); continue; }
          ctx.globalAlpha = Math.min(1, g.life * 1.4);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(g.x - g.size / 2, g.y - g.size / 2, g.size, g.size);
        }
        // flying shards
        for (let i = shards.length - 1; i >= 0; i--) {
          const p = shards[i];
          p.life -= 0.014;
          if (p.life <= 0) { shards.splice(i, 1); continue; }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.965;
          p.vy = p.vy * 0.965 - 0.045; // drift upward as it dissolves
          p.rot += p.vr;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          const s = p.size * (0.4 + 0.6 * p.life);
          ctx.fillRect(-s / 2, -s / 2, s, s);
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      };
      gsap.ticker.add(render);

      return () => {
        gsap.ticker.remove(render);
        window.removeEventListener("resize", layout);
        root.current?.removeEventListener("pointermove", onMove);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="fixed inset-0 z-10 overflow-hidden bg-white text-black">
      {/* z-0: the world you dive INTO — Diana's forest reveal. Her name
          "DIANA" completes the "Wellness by" wordmark punched into the cover. */}
      <div
        ref={photoWrap}
        className="absolute inset-0 will-change-transform"
        style={{ background: "linear-gradient(165deg,#55744f 0%,#3b5237 48%,#20301d 100%)" }}
      >
        {/* soft brand glows */}
        <div className="pointer-events-none absolute -right-[8%] -top-[10%] h-[46vw] w-[46vw] rounded-full bg-[radial-gradient(circle,rgba(200,197,141,0.45),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-[6%] -left-[10%] h-[38vw] w-[38vw] rounded-full bg-[radial-gradient(circle,rgba(148,143,174,0.3),transparent_70%)] blur-3xl" />

        {/* Diana — photo + name */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6 text-center text-[#f8f6f0]">
          <div className="relative">
            <div className="relative h-[38vh] max-h-[380px] min-h-[220px] w-[38vh] max-w-[380px] min-w-[220px] overflow-hidden rounded-full ring-[6px] ring-[#f8f6f0]/15 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
              <Image
                src="/images/diana-photo.jpg"
                alt="Diana Paola Vázquez Menchaca"
                fill
                priority
                sizes="380px"
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-3 right-[-6%] rounded-full bg-[#f8f6f0] px-5 py-2 text-[13px] font-medium text-[#354932] shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
              Hola, soy
            </span>
          </div>
          <div>
            <h2 className="display text-[clamp(3.5rem,11vw,9rem)] leading-[0.85] tracking-[-0.02em]">
              Diana
            </h2>
            <p className="meta-label mt-4 text-[#f8f6f0]/75">
              Licenciada en Nutrición y Bienestar Integral
            </p>
          </div>
        </div>
      </div>

      {/* z-10: white cover with the plant-shaped hole (scroll dives through it).
          No will-change here on purpose: a promoted layer scaled past the GPU
          max texture size blanks out and the stale texture survives scroll-up. */}
      <div ref={coverWrap} className="absolute inset-0">
        <svg
          ref={coverSvg}
          className="h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            {/* blur + alpha re-threshold = smooth, rounded plant contour */}
            <filter id="plantSmooth" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.6" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="16" intercept="-7" />
              </feComponentTransfer>
            </filter>
            <mask id="plantHole" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
              <rect width="1000" height="1000" fill="white" />
              <g filter="url(#plantSmooth)">
                <g transform={PLANT_OUTER_TRANSFORM}>
                  <g transform={PLANT_INNER_TRANSFORM}>
                    <path d={PLANT_PATH_D} fill="black" />
                  </g>
                </g>
              </g>
            </mask>
          </defs>
          <rect width="1000" height="1000" fill="#ffffff" mask="url(#plantHole)" />
          {/* faint contour keeps the mark legible where the photo runs light */}
          <g className="plant-outline" transform={PLANT_OUTER_TRANSFORM} opacity="0.45">
            <g transform={PLANT_INNER_TRANSFORM}>
              <path d={PLANT_PATH_D} fill="none" stroke="#354932" strokeWidth={40} />
            </g>
          </g>
        </svg>

        {/* awwwards wordmark ON the white cover — it scales up and dissolves
            with the dive, handing off to "DIANA" revealed in the world behind,
            so the phrase reads "Wellness by … Diana" across the zoom */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center pt-[9.5vh]">
          <span className="display leading-[0.8] tracking-[-0.02em] text-[#354932] text-[clamp(3rem,9.5vw,8.5rem)]">
            Wellness
          </span>
          <span className="display mt-1 normal-case leading-none tracking-[0.04em] text-[#a8a35f] text-[clamp(1.1rem,2.6vw,2.2rem)]">
            by
          </span>
        </div>
      </div>

      {/* z-20: optical vignette — corners darken during the dive (opacity
          driven by scroll in the GSAP onUpdate above) */}
      <div
        ref={vignette}
        className="pointer-events-none absolute inset-0 z-20 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(26,40,26,0.35) 72%, rgba(10,20,10,0.72) 100%)",
        }}
      />

      {/* z-30: disintegration particles */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-30" />

      {/* z-40: looping marquee strip */}
      <div className="hero-marquee absolute inset-x-0 bottom-[128px] z-40 overflow-hidden border-y border-black/10 py-2">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1, 2, 3].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup !== 0}>
              {MARQUEE.map((item) => (
                <span key={item} className="meta-label flex items-center text-black/60">
                  <span className="mx-6">✦</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* z-40: bottom statement */}
      <div className="grid-layout absolute inset-x-0 bottom-0 z-40 items-end pb-[76px] sm:pb-[26px]">
        <h1 className="hero-copy col-span-12 display overflow-hidden text-[clamp(12px,3vw,18px)] leading-[0.95] sm:col-span-8">
          {HERO_STATEMENT.split("\n").map((line, i) => (
            <span key={i} className="hero-line block">
              {line.trim()}
            </span>
          ))}
        </h1>
        <div className="scroll-cue col-span-4 hidden items-center justify-end gap-2 sm:flex">
          <span className="meta-label">{SCROLL_CUE}</span>
          <ArrowDown className="h-3.5 w-3" />
        </div>
      </div>
    </section>
  );
}
