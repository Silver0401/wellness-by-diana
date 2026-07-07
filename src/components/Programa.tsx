import { PROGRAMA_LABEL, PROGRAMA_TITLE, CAMINO, TRIPLE } from "@/lib/content";

export function Programa() {
  const steps = Array.from({ length: CAMINO.stepsTotal }, (_, i) => i + 1);

  return (
    <section id="programa" className="relative z-20 bg-cream py-28 text-ink md:py-36">
      <div className="grid-layout">
        <div className="col-span-12 mb-12">
          <span className="meta-label mb-4 block text-forest-light">
            {PROGRAMA_LABEL}
          </span>
          <h2 className="display text-statement text-forest">{PROGRAMA_TITLE}</h2>
        </div>

        {/* camino wellness */}
        <div
          data-reveal
          className="col-span-12 rounded-[28px] bg-forest p-10 text-cream md:p-12"
        >
          <h3 className="display text-[22px] text-cream">{CAMINO.title}</h3>
          <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-cream/75">
            {CAMINO.note}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {steps.map((n) => {
              const done = n <= CAMINO.stepsDone;
              return (
                <div
                  key={n}
                  data-reveal="pop"
                  style={{ "--reveal-delay": `${0.25 + n * 0.09}s` } as React.CSSProperties}
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${
                    done
                      ? "bg-olive text-forest"
                      : "border-2 border-olive text-olive"
                  }`}
                  aria-label={done ? `Consulta ${n} completada` : `Consulta ${n}`}
                >
                  {done ? "✓" : n}
                </div>
              );
            })}
            <div
              data-reveal="pop"
              style={{ "--reveal-delay": `${0.25 + 6 * 0.09}s` } as React.CSSProperties}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-olive-deep text-xl text-olive"
              aria-label="Premio"
            >
              ★
            </div>
          </div>
          <p className="meta-label mt-6 text-[11px] text-cream/60">
            {CAMINO.footnote}
          </p>
        </div>

        {/* triple wellness */}
        <div
          data-reveal
          style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          className="col-span-12 mt-7 rounded-[26px] border border-sand bg-white p-10 md:p-12"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="display rounded-full bg-olive px-4 py-1.5 text-[12px] text-forest">
              3×2½
            </span>
            <h3 className="display text-[22px] text-forest">{TRIPLE.title}</h3>
          </div>
          <p className="mt-4 max-w-[820px] text-[15px] leading-relaxed text-forest-light">
            {TRIPLE.text}
          </p>
        </div>
      </div>
    </section>
  );
}
