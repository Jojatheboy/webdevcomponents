"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { empreendimentos, type Status } from "@/lib/empreendimentos";
import SectionTag from "./ui/SectionTag";

const statusLabel: Record<Status, string> = {
  "em-obras": "Em construção",
  ultimas: "Últimas unidades",
  entregue: "Entregue",
};

export default function Empreendimentos() {
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
      setActiveIdx(Math.min(idx, empreendimentos.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <section
      id="empreendimentos"
      className="relative bg-[var(--surface)] pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <SectionTag number={2} tone="light" className="mb-6">
                Setor Imobiliário
              </SectionTag>
              <h2 className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(40px,6vw,68px)] leading-[1.02]">
                Encontre seu<br />imóvel.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-5">
              <p className="text-[var(--foreground-soft)] text-base md:text-lg max-w-[44ch]">
                Empreendimentos no Jardim da Balsa 2, Americana. Lazer completo, materiais de qualidade e localização privilegiada.
              </p>
              <Link
                href="#a-construtora"
                className="self-start inline-flex items-center gap-2 px-6 h-11 rounded-full border border-[var(--foreground)] text-[var(--foreground)] text-sm hover:bg-[var(--foreground)] hover:text-white transition-colors"
                style={{ transitionDuration: "200ms" }}
              >
                Conhecer a construtora
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
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
            {empreendimentos.map((emp) => {
              const isEmObras = emp.status === "em-obras";
              const isUltimas = emp.status === "ultimas";
              return (
                <article
                  key={emp.slug}
                  data-card
                  className="snap-start shrink-0 w-[78vw] sm:w-[360px] lg:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden relative group bg-[var(--dark-section)]"
                >
                  {emp.image ? (
                    <Image
                      src={emp.image}
                      alt={emp.nome}
                      fill
                      sizes="(min-width: 1024px) 380px, 78vw"
                      className="object-cover transition-transform duration-700 md:group-hover:scale-105"
                      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(160deg, #1a1612 0%, #2a221c 100%)" }}
                    />
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(26,22,18,0.30) 0%, rgba(26,22,18,0) 30%, rgba(26,22,18,0) 50%, rgba(26,22,18,0.92) 100%)",
                    }}
                  />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    <span className="inline-flex items-center px-3 h-7 rounded-md bg-white text-[var(--foreground)] font-mono uppercase text-[10px] tracking-[0.14em]">
                      Residencial
                    </span>
                    <span
                      className={`inline-flex items-center px-3 h-7 rounded-md font-mono uppercase text-[10px] tracking-[0.14em] ${
                        isEmObras
                          ? "bg-[var(--accent)] text-white"
                          : isUltimas
                          ? "bg-white/95 text-[var(--accent)]"
                          : "bg-[var(--dark-section)] text-white"
                      }`}
                    >
                      {statusLabel[emp.status]}
                    </span>
                  </div>

                  <Link
                    href={`/empreendimentos/${emp.slug}`}
                    aria-label={`Conhecer ${emp.nome}`}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[var(--foreground)] transition-all z-10"
                    style={{ transitionDuration: "200ms" }}
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>

                  <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                    <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/65 mb-2">
                      {emp.bairro} · {emp.cidade}
                      {emp.endereco && ` · ${emp.endereco}`}
                    </p>
                    <h3 className="font-[var(--font-display)] text-white text-2xl lg:text-3xl leading-tight">
                      {emp.nome}
                    </h3>
                  </div>
                </article>
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
            {empreendimentos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para ${empreendimentos[i].nome}`}
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
