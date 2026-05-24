import Image from "next/image";
import { Reveal } from "../animations/Reveal";
import BlurText from "../animations/BlurText";
import SectionTag from "../sections/SectionTag";
import CountUp from "../animations/CountUp";
import MetallicText from "../animations/MetallicText";
import type { ComponentType } from "react";

/* ============================================================
 *  AboutSection — "Quem é a empresa" com foto + opcional grid
 *  de áreas de atuação + opcional grid de stats com CountUp
 * ============================================================ */

export type AreaItem = {
  Icon?: ComponentType<{ className?: string }>;
  nome: string;
  descricao: string;
};

export type AboutStat = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  label: string;
};

export interface AboutSectionProps {
  /** Número da seção (01, 02...) */
  number?: number;
  /** Eyebrow tag (ex: "A Construtora") */
  tag: string;
  /** Headline — animado com BlurText word-by-word */
  headline: string;
  /** 1-3 parágrafos de copy */
  paragraphs: string[];
  /** Texto pequeno abaixo do divider (ex: "CNPJ...") */
  footnote?: string;
  /** Imagem ao lado direito */
  image: {
    src: string;
    alt: string;
    /** Caption sobrepondo a imagem (eyebrow + título) */
    caption?: { eyebrow: string; title: string };
  };
  /** Grid de áreas de atuação (opcional) */
  areas?: AreaItem[];
  /** Grid de stats com CountUp (opcional) */
  stats?: AboutStat[];
  /** ID da section */
  id?: string;
}

export default function AboutSection({
  number,
  tag,
  headline,
  paragraphs,
  footnote,
  image,
  areas,
  stats,
  id = "a-construtora",
}: AboutSectionProps) {
  return (
    <section
      id={id}
      className="relative bg-[var(--background)] pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div className="relative max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <SectionTag number={number} tone="light" className="mb-4">
              {tag}
            </SectionTag>
            <BlurText
              as="h2"
              text={headline}
              animateBy="words"
              direction="top"
              delay={80}
              stepDuration={0.4}
              className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(36px,5.5vw,56px)] leading-[1.05] mb-6"
            />
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-[var(--foreground-soft)] text-base md:text-lg leading-relaxed max-w-[58ch] ${
                  i > 0 ? "mt-4" : ""
                }`}
              >
                {p}
              </p>
            ))}

            {footnote && (
              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                <p className="text-xs text-[var(--foreground-mute)] font-mono">{footnote}</p>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="relative aspect-[4/5] lg:aspect-[5/4] rounded-lg overflow-hidden bg-[var(--surface)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
              {image.caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-section)]/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-mono uppercase text-[10px] tracking-[0.18em] opacity-80">
                      {image.caption.eyebrow}
                    </p>
                    <p className="font-[var(--font-display)] text-2xl mt-1">{image.caption.title}</p>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {areas && areas.length > 0 && (
          <Reveal delay={0.3} className="mt-16 lg:mt-20">
            <div
              className={`grid gap-px bg-[var(--border-subtle)] rounded-lg overflow-hidden ${
                areas.length <= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {areas.map((a) => (
                <div key={a.nome} className="bg-[var(--background)] p-6 lg:p-8 flex flex-col gap-3">
                  {a.Icon && (
                    <span className="w-10 h-10 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                      <a.Icon className="size-5" />
                    </span>
                  )}
                  <h3 className="font-[var(--font-display)] text-[var(--foreground)] text-2xl leading-tight">
                    {a.nome}
                  </h3>
                  <p className="text-[var(--foreground-mute)] text-sm">{a.descricao}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {stats && stats.length > 0 && (
          <Reveal delay={0.4} className="mt-12 lg:mt-16">
            <div
              className={`grid gap-6 lg:gap-8 pt-10 border-t border-[var(--border-subtle)] ${
                stats.length === 4 ? "grid-cols-2 md:grid-cols-4" : stats.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2"
              }`}
            >
              {stats.map((s, i) => (
                <div key={s.label}>
                  <MetallicText
                    italic={false}
                    variant="dark"
                    className="font-[var(--font-hero)] text-4xl md:text-5xl leading-none tracking-[-0.02em]"
                  >
                    <CountUp
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={s.duration ?? 1.6}
                      delay={i * 0.1}
                    />
                  </MetallicText>
                  <p className="text-[var(--foreground-mute)] text-sm mt-3">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
