import { Reveal } from "./Reveal";
import SectionTag from "./ui/SectionTag";
import { ArrowUpRight } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const beneficios = [
  { v: "R$ 598", l: "parcela inicial", h: "a partir de" },
  { v: "R$ 55 mil", l: "subsídio máximo", h: "até" },
  { v: "Grátis", l: "ITBI + registro", h: "100%" },
];

export default function MCMV() {
  return (
    <section
      id="mcmv"
      className="relative bg-[var(--dark-section)] text-[var(--dark-section-text)] overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0.75px, transparent 0.75px), radial-gradient(circle, rgba(255,255,255,0.04) 0.75px, transparent 0.75px)",
          backgroundSize: "5px 5px",
          backgroundPosition: "0 0, 2.5px 2.5px",
        }}
      />
      <div
        className="absolute right-[-180px] top-[-100px] w-[640px] h-[640px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--accent) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 lg:mb-16">
          <Reveal className="lg:col-span-7">
            <SectionTag number={3} tone="dark" className="mb-6">
              Minha Casa Minha Vida
            </SectionTag>
            <h2 className="font-[var(--font-display)] text-white text-[clamp(40px,5.5vw,64px)] leading-[1.02]">
              Sua casa<br />com o subsídio do governo.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 space-y-5">
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-[44ch]">
              Apartamentos de 2 dormitórios com varanda. Entrada super facilitada, ITBI e registro por nossa conta. Parcelas que cabem no bolso.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[var(--accent)] text-white text-sm hover:bg-[var(--accent-dark)] transition-colors"
              style={{ transitionDuration: "200ms" }}
            >
              <IconBrandWhatsapp className="size-4" />
              Quero saber se me encaixo
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden">
            {beneficios.map((b) => (
              <div key={b.l} className="bg-[var(--dark-section)] p-8 lg:p-10">
                <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/45 mb-3">
                  {b.h}
                </p>
                <p className="font-[var(--font-hero)] text-white text-4xl md:text-5xl leading-none">
                  {b.v}
                </p>
                <p className="text-white/65 text-sm mt-3">{b.l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35} className="mt-10">
          <p className="text-center text-xs text-white/40 font-mono">
            Sujeito a análise de crédito · Condições conforme programa MCMV vigente
          </p>
        </Reveal>
      </div>
    </section>
  );
}
