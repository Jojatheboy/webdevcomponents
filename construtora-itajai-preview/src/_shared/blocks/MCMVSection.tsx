import { Reveal } from "../animations/Reveal";
import SectionTag from "../sections/SectionTag";
import { ArrowUpRight } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

/* ============================================================
 *  MCMVSection — banner pra programa Minha Casa Minha Vida
 *  ou qualquer "destaque de oferta" com 3 benefícios + CTA WhatsApp.
 *  Fundo dark com glow accent radial.
 * ============================================================ */

export type Benefit = {
  /** Texto pequeno acima do valor (ex: "a partir de", "até") */
  prefix: string;
  /** Valor em destaque (ex: "R$ 598") */
  value: string;
  /** Texto abaixo do valor (ex: "parcela inicial") */
  label: string;
};

export interface MCMVSectionProps {
  number?: number;
  tag: string;
  headline: string;
  subtitle?: string;
  benefits: Benefit[];
  cta: {
    label: string;
    href: string;
    /** Mostrar ícone WhatsApp antes do label */
    whatsapp?: boolean;
  };
  /** Texto pequeno abaixo (legal/disclaimer) */
  disclaimer?: string;
  id?: string;
}

export default function MCMVSection({
  number,
  tag,
  headline,
  subtitle,
  benefits,
  cta,
  disclaimer,
  id = "mcmv",
}: MCMVSectionProps) {
  return (
    <section
      id={id}
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
        style={{ background: "radial-gradient(circle at center, var(--accent) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 lg:mb-16">
          <Reveal className="lg:col-span-7">
            <SectionTag number={number} tone="dark" className="mb-6">
              {tag}
            </SectionTag>
            <h2 className="font-[var(--font-display)] text-white text-[clamp(40px,5.5vw,64px)] leading-[1.02]">
              {headline}
            </h2>
          </Reveal>
          {(subtitle || cta) && (
            <Reveal delay={0.1} className="lg:col-span-5 space-y-5">
              {subtitle && (
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-[44ch]">
                  {subtitle}
                </p>
              )}
              <a
                href={cta.href}
                target={cta.href.startsWith("http") ? "_blank" : undefined}
                rel={cta.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[var(--accent)] text-white text-sm hover:bg-[var(--accent-dark)] transition-colors"
                style={{ transitionDuration: "200ms" }}
              >
                {cta.whatsapp && <IconBrandWhatsapp className="size-4" />}
                {cta.label}
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.2}>
          <div className={`grid gap-px bg-white/10 rounded-lg overflow-hidden ${
            benefits.length === 3 ? "grid-cols-1 md:grid-cols-3" : benefits.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
          }`}>
            {benefits.map((b) => (
              <div key={b.label} className="bg-[var(--dark-section)] p-8 lg:p-10">
                <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/45 mb-3">
                  {b.prefix}
                </p>
                <p className="font-[var(--font-hero)] text-white text-4xl md:text-5xl leading-none">
                  {b.value}
                </p>
                <p className="text-white/65 text-sm mt-3">{b.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {disclaimer && (
          <Reveal delay={0.35} className="mt-10">
            <p className="text-center text-xs text-white/40 font-mono">{disclaimer}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
