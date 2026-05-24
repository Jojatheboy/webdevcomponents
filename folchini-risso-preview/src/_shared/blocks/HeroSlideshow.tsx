"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTag from "../sections/SectionTag";
import MetallicText from "../animations/MetallicText";

/* ============================================================
 *  HeroSlideshow — slideshow fullwidth, autoplay, controls
 *
 *  Suporta 2 tipos de slide:
 *    - "headline"    → eyebrow + headline (palavras opcionais em metallic)
 *                      + subtitle + ctas + stats grid
 *    - "showcase"    → eyebrow + nome (com palavra metallic) + pill + descrição
 *                      + ctas + stats grid
 *
 *  Cada slide pode ter background image próprio.
 *  Pause no hover, navegação por dots + setas, contador 01/02.
 * ============================================================ */

export type CTA = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

export type Stat = { v: string; l: string };

export type HeadlineSlide = {
  kind: "headline";
  bgImage: string;
  tag: string;
  titleWords: string[];
  /** Índices das palavras pra aplicar MetallicText (ex: [4] → 5ª palavra em metallic) */
  metallicWordIndices?: number[];
  subtitle: string;
  stats?: Stat[];
  ctas?: CTA[];
};

export type ShowcaseSlide = {
  kind: "showcase";
  bgImage: string;
  tag: string;
  /** Pill abaixo do título com dot accent */
  pill?: string;
  /** Composição do nome: nameStart + nameMetallic (italic gradient) + nameEnd */
  nameStart?: string;
  nameMetallic: string;
  nameEnd?: string;
  description: string;
  stats?: Stat[];
  ctas?: CTA[];
};

export type Slide = HeadlineSlide | ShowcaseSlide;

export interface HeroSlideshowProps {
  slides: Slide[];
  /** Duração entre slides em ms. Default 7000. Passa 0 pra desativar autoplay */
  autoplay?: number;
  /** ID da section (default "home") */
  id?: string;
  /** Mostrar seta de scroll-down no rodapé desktop */
  showScrollDown?: boolean;
}

export default function HeroSlideshow({
  slides,
  autoplay = 7000,
  id = "home",
  showScrollDown = true,
}: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || !autoplay || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoplay);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, autoplay, slides.length]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  const current = slides[index];

  return (
    <section
      id={id}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[var(--dark-section)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${index}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={current.bgImage}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                current.kind === "headline"
                  ? "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.90) 100%)"
                  : "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.88) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[var(--dark-section)]/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 min-h-[100dvh] flex flex-col">
        <div className="flex-1 flex items-center max-w-[1220px] w-full mx-auto px-4 md:px-6 pt-24 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {current.kind === "headline" ? (
                <HeadlineSlideView slide={current} />
              ) : (
                <ShowcaseSlideView slide={current} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {slides.length > 1 && (
          <div className="absolute bottom-0 inset-x-0 z-20 pb-6">
            <div className="max-w-[1220px] mx-auto px-4 md:px-6 flex items-end justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/60">
                  {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1 rounded-full transition-all ${
                        i === index ? "w-10 bg-white" : "w-5 bg-white/30 hover:bg-white/50"
                      }`}
                      style={{ transitionDuration: "300ms" }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Anterior"
                  className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white/60 transition-all flex items-center justify-center"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Próximo"
                  className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white/60 transition-all flex items-center justify-center"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {showScrollDown && (
              <div className="hidden lg:flex justify-center mt-4">
                <a
                  href="#a-construtora"
                  aria-label="Próxima seção"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <ArrowDown className="size-4 animate-bounce" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function CTAButton({ label, href, variant }: CTA) {
  const isExternal = href.startsWith("http");
  const baseClasses = "group relative inline-flex justify-center items-center gap-3 rounded-full h-12 px-7 overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700";

  if (variant === "primary") {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={`${baseClasses} bg-white text-[var(--foreground)] border border-white hover:shadow-lg hover:shadow-white/20 before:bg-gradient-to-r before:from-transparent before:via-[var(--accent)]/15 before:to-transparent`}
      >
        <span className="relative z-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide whitespace-nowrap">{label}</span>
        <span className="relative z-10 inline-block w-2 h-2 rounded-full bg-[var(--accent)] shrink-0">
          <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-60 group-hover:animate-ping" style={{ animationDuration: "1.8s" }} />
        </span>
      </a>
    );
  }
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`${baseClasses} border border-white/35 bg-transparent text-white hover:border-white hover:bg-white/[0.06] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent`}
    >
      <span className="relative z-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide whitespace-nowrap">{label}</span>
      <span className="relative z-10 inline-block w-2 h-2 rounded-full bg-white shrink-0">
        <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-50 group-hover:animate-ping" style={{ animationDuration: "1.8s" }} />
      </span>
    </a>
  );
}

function HeadlineSlideView({ slide }: { slide: HeadlineSlide }) {
  const metallic = new Set(slide.metallicWordIndices ?? []);
  return (
    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <SectionTag tone="dark">{slide.tag}</SectionTag>
      </motion.div>

      <h1
        className="font-[var(--font-hero)] text-white text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mb-10"
        style={{ textWrap: "balance" }}
      >
        {slide.titleWords.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mr-[0.2em]"
          >
            {metallic.has(i) ? <MetallicText>{word}</MetallicText> : word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="text-white/85 text-base md:text-xl leading-relaxed mb-12 mx-auto"
        style={{ maxWidth: "56ch" }}
      >
        {slide.subtitle}
      </motion.p>

      {slide.ctas && slide.ctas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
        >
          {slide.ctas.map((cta) => (
            <CTAButton key={cta.href + cta.label} {...cta} />
          ))}
        </motion.div>
      )}

      {slide.stats && slide.stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className={`pt-8 border-t border-white/15 grid gap-6 max-w-3xl mx-auto ${
            slide.stats.length === 3 ? "grid-cols-3" : slide.stats.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"
          }`}
        >
          {slide.stats.map((s) => (
            <div key={s.l}>
              <p className="font-[var(--font-display)] text-white text-3xl md:text-4xl leading-none">{s.v}</p>
              <p className="text-white/55 text-xs mt-2 font-mono uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function ShowcaseSlideView({ slide }: { slide: ShowcaseSlide }) {
  return (
    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <SectionTag tone="dark">{slide.tag}</SectionTag>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-[var(--font-hero)] text-white text-[clamp(40px,6vw,80px)] leading-[1.04] tracking-[-0.01em] mb-6"
        style={{ textWrap: "balance" }}
      >
        {slide.nameStart}
        <MetallicText>{slide.nameMetallic}</MetallicText>
        {slide.nameEnd}
      </motion.h1>

      {slide.pill && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 h-8 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur text-white/85 font-mono uppercase text-[10px] tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            {slide.pill}
          </span>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-white/85 text-base md:text-xl leading-relaxed mb-10 mx-auto"
        style={{ maxWidth: "56ch" }}
      >
        {slide.description}
      </motion.p>

      {slide.ctas && slide.ctas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
        >
          {slide.ctas.map((cta) => (
            <CTAButton key={cta.href + cta.label} {...cta} />
          ))}
        </motion.div>
      )}

      {slide.stats && slide.stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={`pt-8 border-t border-white/15 grid gap-6 max-w-3xl mx-auto ${
            slide.stats.length === 3 ? "grid-cols-3" : slide.stats.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"
          }`}
        >
          {slide.stats.map((s) => (
            <div key={s.l}>
              <p className="font-[var(--font-display)] text-white text-3xl md:text-4xl leading-none">{s.v}</p>
              <p className="text-white/55 text-xs mt-2 font-mono uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
