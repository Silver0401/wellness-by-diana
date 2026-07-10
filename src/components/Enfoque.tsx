import Image from "next/image";
import {
  ENFOQUE_LABEL,
  ENFOQUE_QUOTE,
  ENFOQUE_INTRO,
  ENFOQUE_CARDS,
} from "@/lib/content";
import { LeafIcon, TargetIcon, BookIcon, FlaskIcon } from "@/components/icons";

const CARD_ICONS = {
  leaf: LeafIcon,
  target: TargetIcon,
  book: BookIcon,
  flask: FlaskIcon,
} as const;

export function Enfoque() {
  const [line1, line2] = ENFOQUE_QUOTE.split(": ");

  return (
    <section
      id="enfoque"
      className="relative z-20 overflow-hidden bg-cream text-ink"
    >
      <div className="bg-forest py-20 text-cream md:py-28">
        <div className="grid-layout">
          <span className="meta-label col-span-12 mb-8 block text-olive">
            {ENFOQUE_LABEL}
          </span>

          <h2 className="col-span-12 display max-w-[1180px] text-[clamp(2.7rem,13vw,6.8rem)] leading-[0.86] tracking-normal md:col-span-11 md:text-[clamp(4rem,7vw,7.5rem)]">
            {[line1 + ":", line2].map((line, i) => (
              <span key={i} className="block pb-[0.12em]">
                <span
                  data-reveal="line"
                  className="block"
                  style={
                    { "--reveal-delay": `${i * 0.12}s` } as React.CSSProperties
                  }
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div className="grid-layout py-20 items-start gap-y-12 md:py-28">
        {/* editorial portrait + intro */}
        <div className="col-span-12 md:col-span-5">
          <div data-reveal className="relative mx-auto max-w-[440px] md:mx-0">
            <div className="overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(53,73,50,0.18)]">
              <Image
                src="/images/diana-photo-2.jpg"
                alt="Diana Paola Vázquez Menchaca, nutrióloga"
                width={900}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <span className="meta-label absolute -bottom-4 left-6 rounded-full bg-forest px-4 py-2 text-[11px] text-cream shadow-lg">
              Hola, soy Diana ✦
            </span>
          </div>
          <p className="mt-10 max-w-[520px] text-[17px] leading-relaxed text-forest md:text-[19px]">
            {ENFOQUE_INTRO}
          </p>
        </div>

        {/* 2×2 pillar cards */}
        <div className="col-span-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-7">
          {ENFOQUE_CARDS.map((card, i) => {
            const Icon = CARD_ICONS[card.icon];
            return (
              <div
                key={card.title}
                data-reveal
                style={
                  {
                    "--reveal-delay": `${(i % 2) * 0.1}s`,
                  } as React.CSSProperties
                }
                className="rounded-[20px] border border-sand bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(53,73,50,0.14)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[14px] bg-forest text-cream">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="display text-[17px] text-forest">
                  {card.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-forest-light">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
