import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Enfoque } from "@/components/Enfoque";
import { Servicios } from "@/components/Servicios";
import { Programa } from "@/components/Programa";
import { Testimonios } from "@/components/Testimonios";
import { Redes } from "@/components/Redes";
import { FooterCTA, WhatsAppFloat } from "@/components/FooterCTA";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <SmoothScroll>
      <span id="top" />
      <Header />

      {/* fixed white hero */}
      <Hero />

      {/* transparent spacer — dive completes (~170vh), photo holds full-bleed, then content arrives */}
      <div className="h-[300vh]" aria-hidden />

      {/* brand-cream content scrolls up over the fixed hero */}
      <main className="relative z-20">
        <Enfoque />
        <Servicios />
        <Programa />
        <Testimonios />
        <Redes />
        <FooterCTA />
      </main>

      <WhatsAppFloat />
      <RevealObserver />
    </SmoothScroll>
  );
}
