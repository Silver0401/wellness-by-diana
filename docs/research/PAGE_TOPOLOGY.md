# Page Topology — podium.global → Diana reskin

Reference: https://podium.global/ (Next.js + Lenis + WebGL). Rebuilt as a
**layout/motion reskin** with Diana wellness content. Fonts substituted
(Futura→Jost, Univers Condensed→Barlow Condensed). Podium imagery NOT copied —
wellness placeholders used instead (Diana replaces later).

## Global system
- **Colours:** black `#000` bg, white `#fff` ink. Hero is inverse (white bg / black ink).
- **Type:** Jost 700 uppercase for display/titles (24px cards, ~clamp 55px statements);
  Barlow Condensed 12px uppercase for meta labels (`.meta-label`).
- **Grid:** 12-col editorial grid, column-gap 21px, page margin 20px (`.grid-layout`).
- **Scroll:** Lenis smooth scroll wired to GSAP ScrollTrigger (`SmoothScroll.tsx`).
- **Header:** `mix-blend-difference` so logo+nav auto-invert white hero ↔ black sections.

## Sections (top → bottom)
| # | Component | bg | interaction model |
|---|-----------|----|-------------------|
| 0 | `Header` | transparent (blend) | fixed overlay, z-80 |
| 1 | `Hero` | white | **fixed** z-10; WebGL reveal → approximated by morphing blob mask + GSAP; scroll-driven scale |
| — | spacer `h-screen` | — | lets hero animate before content covers it |
| 2 | `WorkGrid` | black | z-20; staggered 3-col masonry, scroll-reveal cards, floating **grid/list toggle** (state) |
| 3 | `About` | black | z-20; statement line-reveal + topographic contour bg + parallax "In the studio" photo strip |
| 4 | `FooterCTA` | black | z-20; rotating/floating orb, centered CTA line-reveal, footer bar |

Content sections (z-20, solid black) scroll **up over** the fixed hero (z-10).
