"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../animations/Reveal";
import SectionTag from "../sections/SectionTag";

/* ============================================================
 *  EmpreendimentosCarousel — carousel horizontal de cards verticais
 *  com badges duplos, foto fullbleed, hover scale.
 * ============================================================ */

export type EmpreendimentoItem = {
  slug?: string;
  href?: string;
  name: string;
  category?: string;
  subtitle?: string;
  status: { label: string; tone: "primary" | "secondary" | "muted" };
  image?: string;
  /** Cor de fallback se não tiver imagem (gradient base) */
  placeholderColor?: string;
};

export interface EmpreendimentosCarouselProps {
  number?: number;
  tag: string;
  headline: string;
  subtitle?: string;
  /** CTA outline ao lado do subtitle */
  ctaLabel?: string;
  ctaHref?: string;
  items: EmpreendimentoItem[];
  /** "light" pra fundo claro, "surface" pra fundo --surface */
  background?: "light" | "surface";
  id?: string;
}

export default function EmpreendimentosCarousel({
  number,
  tag,
  headline,
  subtitle,
  ctaLabel,
  ctaHref,
  items,
  background = "light",
  id = "empreendimentos",
}: EmpreendimentosCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>("[data-card]");
      if (!card) return;
      const cardW = card.offsetWidth + 20;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIdx(Math.min(idx, items.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    el.scrollTo({ left: i * (card.offsetWidth + 20), behavior: "smooth" });
  };

  const bgClass = background === "surface" ? "bg-[var(--surface)]" : "bg-[var(--background)]";

  return (
    <section id={id} className={`relative ${bgClass} pt-16 sm:pt-24 pb-16 sm:pb-24`}>
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <SectionTag number={number} tone="light" className="mb-6">
                {tag}
              </SectionTag>
              <h2 className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(40px,6vw,68px)] leading-[1.02]">
                {headline}
              </h2>
            </div>
            {(subtitle || ctaLabel) && (
              <div className="lg:col-span-5 flex flex-col gap-5">
                {subtitle && (
                  <p className="text-[var(--foreground-soft)] text-base md:text-lg max-w-[44ch]">{subtitle}</p>
                )}
                {ctaLabel && ctaHref && (
                  <Link
                    href={ctaHref}
                    className="self-start inline-flex items-center gap-2 px-6 h-11 rounded-full border border-[var(--foreground)] text-[var(--foreground)] text-sm hover:bg-[var(--foreground)] hover:text-white transition-colors"
                    style={{ transitionDuration: "200ms" }}
                  >
                    {ctaLabel}
                    <ArrowUpRight className="size-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 scroll-pl-4 md:scroll-pl-[calc((100vw-1220px)/2+24px)] pl-4 md:pl-[calc((100vw-1220px)/2+24px)] pr-4 md:pr-[calc((100vw-1220px)/2+24px)]"
            style={{ scrollbarWidth: "none" }}
          >
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
            {items.map((emp) => {
              const inner = (
                <article
                  data-card
                  className="snap-start shrink-0 w-[78vw] sm:w-[360px] lg:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden relative group bg-[var(--dark-section)]"
                >
                  {emp.image ? (
                    <Image
                      src={emp.image}
                      alt={emp.name}
                      fill
                      sizes="(min-width: 1024px) 380px, 78vw"
                      className="object-cover transition-transform duration-700 md:group-hover:scale-105"
                      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: emp.placeholderColor
                          ? `linear-gradient(160deg, ${emp.placeholderColor} 0%, ${emp.placeholderColor}cc 100%)`
                          : "linear-gradient(160deg, #1a1612 0%, #2a221c 100%)",
                      }}
                    />
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.92) 100%)",
                    }}
                  />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {emp.category && (
                      <span className="inline-flex items-center px-3 h-7 rounded-md bg-white text-[var(--foreground)] font-mono uppercase text-[10px] tracking-[0.14em]">
                        {emp.category}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center px-3 h-7 rounded-md font-mono uppercase text-[10px] tracking-[0.14em] ${
                        emp.status.tone === "primary"
                          ? "bg-[var(--accent)] text-white"
                          : emp.status.tone === "secondary"
                          ? "bg-white/95 text-[var(--accent)]"
                          : "bg-[var(--dark-section)] text-white"
                      }`}
                    >
                      {emp.status.label}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[var(--foreground)] transition-all z-10"
                    style={{ transitionDuration: "200ms" }}
                  >
                    <ArrowUpRight className="size-4" />
                  </span>

                  <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                    {emp.subtitle && (
                      <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/65 mb-2">
                        {emp.subtitle}
                      </p>
                    )}
                    <h3 className="font-[var(--font-display)] text-white text-2xl lg:text-3xl leading-tight">
                      {emp.name}
                    </h3>
                  </div>
                </article>
              );
              const href = emp.href ?? (emp.slug ? `/empreendimentos/${emp.slug}` : null);
              return href ? (
                <Link key={emp.slug ?? emp.name} href={href} aria-label={`Conhecer ${emp.name}`}>
                  {inner}
                </Link>
              ) : (
                <div key={emp.name}>{inner}</div>
              );
            })}
          </div>
        </div>

        <div className="max-w-[1220px] mx-auto px-4 md:px-6 mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-[var(--border-strong)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white hover:border-[var(--foreground)] transition-all flex items-center justify-center"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Próximo"
              className="w-11 h-11 rounded-full border border-[var(--border-strong)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white hover:border-[var(--foreground)] transition-all flex items-center justify-center"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para ${items[i].name}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIdx ? "w-6 bg-[var(--foreground)]" : "w-1.5 bg-[var(--border-strong)] hover:bg-[var(--foreground-soft)]"
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
