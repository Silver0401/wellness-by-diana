# Behaviors — podium.global (extracted) & Diana implementation

## Podium (observed via Playwright)
- `html.lenis` — Lenis smooth scroll active.
- Hero: `<canvas>` 2400×1538 WebGL metaball reveal; heading Futura700 24px/0.9 uppercase
  bottom-left; "SCROLL DOWN" Univers Condensed 12px bottom-right.
- Fixed overlays: z-45 black fade layer (opacity scrub), z-60 project list, z-70 view toggle.
- Work: staggered 3-col grid, card title Futura700 24px + year/client Univers 12px; grid/list toggle.
- About: "AVAILABLE WORLDWIDE" label; ~55px statement over dashed topographic contours;
  "BEHIND THE SCENES" tilted photo strip.
- Footer CTA: floating 3D rock (WebGL), "NOT THE FINISH LINE"/"IT'S STEP ONE",
  "LET'S BUILD YOUR VISION / WORK WITH US" underlined, footer bar.

## Diana implementation (GSAP)
- **Hero:** infinite `border-radius` morph + float on the reveal blob; blurred satellite blobs
  drift; intro line-reveal; scroll-driven blob scale (ScrollTrigger scrub) + scroll-cue fade.
- **WorkGrid:** per-card fade-up on `top 88%`; floating toggle `autoAlpha` in/out only while
  section on screen (`toggleActions: play reverse play reverse`); grid↔list via React state.
- **About:** statement line-reveal on `top 80%`; photo strip fade-up + `yPercent` parallax scrub.
- **FooterCTA:** orb 360° rotate (60s) + float; CTA line-reveal on scroll.
- **Responsive:** grid cols → `col-span-6` stacks on mobile; meta lists 2→4 cols; statement `clamp()`.
