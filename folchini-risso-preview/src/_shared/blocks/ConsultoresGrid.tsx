import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../animations/Reveal";
import SectionTag from "../sections/SectionTag";

/* ============================================================
 *  ConsultoresGrid — grid 2 col com foto pequena + info + WhatsApp.
 *  Layout horizontal sutil (não cards com bordas pesadas).
 * ============================================================ */

export type Consultor = {
  nome: string;
  funcao?: string;
  /** Detalhe extra: CRECI/OAB/CRM... */
  registro?: string;
  cidade?: string;
  foto: string;
  /** Link do botão circular à direita (default = WhatsApp do número) */
  href: string;
};

export interface ConsultoresGridProps {
  number?: number;
  tag: string;
  headline: string;
  subtitle?: string;
  consultores: Consultor[];
  /** Texto pequeno abaixo do grid */
  footnote?: string;
  id?: string;
}

export default function ConsultoresGrid({
  number,
  tag,
  headline,
  subtitle,
  consultores,
  footnote,
  id = "consultores",
}: ConsultoresGridProps) {
  return (
    <section id={id} className="relative bg-[var(--background)] pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <SectionTag number={number} tone="light" className="mb-4">
                {tag}
              </SectionTag>
              <h2 className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(36px,5.5vw,56px)] leading-[1.02]">
                {headline}
              </h2>
            </div>
            {subtitle && (
              <div className="lg:col-span-5">
                <p className="text-[var(--foreground-soft)] text-base md:text-lg max-w-[44ch]">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2">
          {consultores.map((c, i) => (
            <Reveal key={c.nome} delay={i * 0.06}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center gap-5 py-6 border-b border-[var(--border-subtle)] transition-colors"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[var(--surface)] shrink-0">
                  <Image
                    src={c.foto}
                    alt={c.nome}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[var(--border-subtle)] rounded-full pointer-events-none" />
                </div>

                <div className="flex-1 min-w-0">
                  {c.funcao && (
                    <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)] mb-1.5">
                      {c.funcao}
                    </p>
                  )}
                  <h3 className="font-[var(--font-display)] text-[var(--foreground)] text-xl lg:text-2xl leading-tight mb-1.5">
                    {c.nome}
                  </h3>
                  <p className="text-[var(--foreground-soft)] text-sm">
                    {c.cidade && (
                      <>
                        {c.cidade}
                        {c.registro && (
                          <span className="mx-2 text-[var(--foreground-mute)]/40">·</span>
                        )}
                      </>
                    )}
                    {c.registro && (
                      <span className="font-mono text-xs text-[var(--foreground-mute)]">
                        {c.registro}
                      </span>
                    )}
                  </p>
                </div>

                <span
                  className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border-strong)] text-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-white group-hover:border-[var(--foreground)] transition-colors shrink-0"
                  style={{ transitionDuration: "200ms" }}
                  aria-label={`Falar com ${c.nome}`}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {footnote && (
          <Reveal>
            <p className="text-center text-sm text-[var(--foreground-mute)] mt-10">{footnote}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
