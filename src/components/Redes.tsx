import { REDES_LABEL, REDES_TITLE, REDES_NOTE, REDES } from "@/lib/content";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons";

const ICONS = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  whatsapp: WhatsAppIcon,
} as const;

export function Redes() {
  return (
    <section id="redes" className="relative z-20 bg-cream py-28 text-ink md:py-36">
      <div className="grid-layout">
        <div className="col-span-12 mb-12 max-w-[580px]">
          <span className="meta-label mb-4 block text-forest-light">
            {REDES_LABEL}
          </span>
          <h2 className="display text-statement text-forest">{REDES_TITLE}</h2>
          <p className="mt-4 text-[15px] text-forest-light">{REDES_NOTE}</p>
        </div>

        <div className="col-span-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {REDES.map((red, i) => {
            const Icon = ICONS[red.network];
            return (
              <a
                key={red.name}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
                className="group rounded-[20px] border border-sand bg-white p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(53,73,50,0.14)]"
              >
                <Icon className="mx-auto mb-4 h-8 w-8 text-forest transition-colors group-hover:text-burgundy" />
                <b className="display block text-[15px] text-forest">{red.name}</b>
                <span className="mt-1 block text-[13px] text-forest-light">
                  {red.handle}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
