import {
  SERVICIOS_LABEL,
  SERVICIOS_TITLE,
  SERVICIOS_NOTE,
  PRICING,
  WHATSAPP,
} from "@/lib/content";
import type { PriceCard } from "@/types/content";

function Card({ card, delay }: { card: PriceCard; delay: number }) {
  const featured = card.featured;
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      className={`relative flex flex-col rounded-[26px] p-9 ${
        featured
          ? "bg-forest text-cream shadow-[0_24px_60px_rgba(53,73,50,0.3)]"
          : "border border-sand bg-white text-ink"
      }`}
    >
      {card.badge && (
        <span className="meta-label absolute -top-4 right-8 rounded-full border-2 border-cream bg-burgundy px-5 py-2 text-[11px] text-white shadow-[0_8px_18px_rgba(115,23,31,0.4)]">
          {card.badge}
        </span>
      )}

      <span
        className={`meta-label mb-4 self-start rounded-full px-4 py-1.5 text-[11px] ${
          featured ? "bg-cream text-forest" : "bg-forest text-cream"
        }`}
      >
        {card.tag}
      </span>

      <h3 className={`display text-[20px] ${featured ? "text-cream" : "text-forest"}`}>
        {card.title}
      </h3>
      <div
        className={`display mt-3 text-[clamp(2rem,4vw,2.6rem)] leading-none ${
          featured ? "text-olive" : "text-forest"
        }`}
      >
        {card.price}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {card.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14px] leading-snug">
            <span
              aria-hidden
              className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                featured ? "bg-olive" : "bg-olive-deep"
              }`}
            />
            <span className={featured ? "text-cream/90" : "text-forest-light"}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 inline-flex items-center justify-center rounded-full px-8 py-4 font-bold transition-all duration-200 hover:-translate-y-0.5 ${
          featured
            ? "bg-cream text-forest hover:bg-white"
            : "border-2 border-forest text-forest hover:bg-forest hover:text-cream"
        }`}
      >
        {card.cta}
      </a>
    </article>
  );
}

export function Servicios() {
  return (
    <section
      id="servicios"
      className="relative z-20 bg-cream-deep py-28 text-ink md:py-36"
    >
      <div className="grid-layout">
        <div className="col-span-12 mb-14 max-w-[580px]">
          <span className="meta-label mb-4 block text-forest-light">
            {SERVICIOS_LABEL}
          </span>
          <h2 className="display text-statement text-forest">{SERVICIOS_TITLE}</h2>
          <p className="mt-4 text-[15px] text-forest-light">{SERVICIOS_NOTE}</p>
        </div>

        <div className="col-span-12 grid grid-cols-1 items-stretch gap-7 md:grid-cols-[1.15fr_1fr]">
          {PRICING.map((card, i) => (
            <Card key={card.title} card={card} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
