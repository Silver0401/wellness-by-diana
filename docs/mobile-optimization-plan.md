# Plan de optimización móvil — Wellness by Diana

> Review: Claude + Codex (read-only), 2026-07-10. Alcance: teléfono en vertical (~375–430 px).
> Ejecuta: Codex. NO commitear; el usuario revisa antes de commit.
> Regla global: todo color en Stylus/CSS por variable si aplica (aquí es Tailwind v4 + tokens en globals.css).

## Objetivo

Arreglar contenido cortado/tapado y el Hero que salta/descentra en móvil. Sin tocar el diseño desktop.

## Convenciones

- Preferir `dvh`/`svh` sobre `vh` en alturas de viewport que causan salto con la barra de URL.
- No introducir dependencias nuevas.
- Cada cambio acotado a los archivos indicados. Verificar en Chrome DevTools responsive (iPhone SE 375, iPhone 14 Pro 393, Pixel 430) + toggle de barra de URL.

---

## Tareas (ordenadas por severidad)

### 1. [BLOCKER] Menú de navegación móvil
**Archivo:** `src/components/Header.tsx:68` (nav `hidden ... md:flex`)
**Problema:** en móvil el nav está oculto y no hay alternativa → anclajes (#enfoque, #servicios, #programa, #testimonios, #redes, #contacto) inaccesibles.
**Fix:** agregar botón hamburguesa visible `<md` que abra un panel/overlay con los links de `NAV`. Cerrar al elegir link. Respetar los dos estados del header (blend sobre hero / solid sobre contenido) para el color del ícono. Tap target ≥44px. Bloquear scroll de fondo mientras abierto (o usar Lenis stop).

### 2. [BLOCKER] Barra WhatsApp fija tapa footer + ignora safe-area
**Archivos:** `src/components/FooterCTA.tsx:121` (`WhatsAppFloat`), footer en `FooterCTA.tsx:82`
**Problema:** la barra fija `bottom-0` (`md:hidden`) tapa copyright/créditos y el fondo de la última sección; además ignora el `safe-area-inset-bottom` de iOS (queda bajo el home indicator).
**Fix:**
- Añadir `padding-bottom` en móvil al contenedor scrolleable / última sección igual a la altura de la barra WA (aprox. `pb-20 md:pb-0`, medir), para que nada quede tapado.
- En `WhatsAppFloat`: agregar `pb-[env(safe-area-inset-bottom)]` (o `padding-bottom: max(1rem, env(safe-area-inset-bottom))`) y asegurar que el contenido interno respete la zona segura.

### 3. [MAJOR] Unidades vh → dvh/svh (Hero + secciones altas)
**Archivos:** `src/components/Hero.tsx` (`h-[38vh]`, `max-h-[380px]`, marquee `bottom-[128px]`, glows `-top-[10%]` etc.), `FooterCTA.tsx` (`min-h-screen`, `top-[14%]`, `mt-[22vh]`, orb `h/w-[38vh]`), cualquier `min-h-screen`/`vh` en el resto.
**Problema:** `100vh`/`vh` en móvil cambian cuando la barra de URL aparece/desaparece → el Hero fijo salta y se descentra vertical.
**Fix:** sustituir alturas de viewport por `dvh` (dinámico) o `svh`/`lvh` según convenga. `min-h-screen` → `min-h-[100dvh]`. Elegir `dvh` para que siga el viewport visible sin saltos. Verificar que el `300vh` spacer de `page.tsx:22` sigue coherente con el timing del scroll GSAP (si se cambia, reajustar los `end:"+=170%"` proporcionalmente — o dejar el spacer en `vh` si el timing depende de él).
> Nota: el spacer y los `end` de ScrollTrigger están calibrados juntos. Cambiar el spacer altera la animación. Preferir tocar solo alturas visuales (Hero interno, footer), no el spacer, salvo prueba explícita.

### 4. [MAJOR] `layout()` se re-ejecuta con cada resize de barra de URL
**Archivo:** `src/components/Hero.tsx:159-188`, listener en `:188`
**Problema:** `layout()` reconstruye canvas + máscara de la planta en cada evento `resize`; en móvil la barra de URL dispara `resize` constantemente → reflow visible del hueco/partículas.
**Fix:** ignorar resizes que solo cambian la altura (comparar `window.innerWidth` previo; recomputar solo si cambia el ancho, o cambia el alto más de un umbral, p. ej. >120px). Alternativa: debounce del handler. Mantener recompute real en rotación/cambio de ancho.

### 5. [MAJOR] Disintegración por puntero no está gateada a desktop
**Archivo:** `src/components/Hero.tsx:214` (`onMove`), registro `:239`
**Problema:** el efecto de partículas asume mouse; en touch no aporta y corre lógica/coste innecesario.
**Fix:** registrar `pointermove` solo si `matchMedia("(hover: hover) and (pointer: fine)").matches`. Si no, saltar setup de canvas/offscreen (ahorra memoria en móvil). Mantener el resto del Hero intacto.

### 6. [MAJOR] Orbe + CTA del footer colisionan en viewports cortos
**Archivo:** `src/components/FooterCTA.tsx:34` (orbe `top-[14%] h-[38vh]`), `:58` (CTA `mt-[22vh]`)
**Problema:** en teléfonos cortos el orbe flotante y el bloque CTA se encima.
**Fix:** reducir tamaño del orbe y/o su `top` en móvil (`h-[26vh] md:h-[38vh]`), reducir `mt-[22vh]` en móvil, o apilar en columna con `gap`. Verificar que headline + botón no se corten con la barra WA (tarea 2).

### 7. [MAJOR] Wordmark del Hero arranca bajo el header en pantallas bajas
**Archivos:** `src/components/Hero.tsx:367` (`pt-[9.5vh]`), header alto ~70px (`Header.tsx:40`)
**Problema:** en alturas chicas "Wellness / by" queda parcialmente bajo el header fijo.
**Fix:** subir el padding-top mínimo del wordmark (usar `max()` con el alto del header, p. ej. `pt-[max(9.5vh,84px)]`) o reducir en móvil de forma que quede bajo el header con margen.

### 8. [MINOR] Puntos del carrusel de testimonios muy chicos para touch
**Archivo:** `src/components/Testimonios.tsx:103` (dots `h-2 w-2`)
**Problema:** área táctil <44px.
**Fix:** envolver cada dot en botón con padding para área táctil ≥44px, manteniendo el punto visual de 8px. Flechas `h-10 w-10` ya OK (`:84`,`:94`).

---

## Refutados (no tocar)

- **CTA "Agenda" vs logo:** sin solape a 375–430px. No cambiar.
- **Badges `-top-4` (Servicios/Enfoque):** sobresalen vertical dentro de sección con espacio; sin overflow horizontal. No cambiar.

## Verificación final

- Chrome DevTools: iPhone SE / 14 Pro / Pixel; alternar barra de URL (scroll) para confirmar que el Hero no salta.
- Recorrer todas las secciones: nada tapado por la barra WA; footer visible completo.
- Menú móvil abre/cierra y navega a cada ancla.
- Sin scroll horizontal (revisar `document.documentElement.scrollWidth`).
- `npm run build` sin errores.
