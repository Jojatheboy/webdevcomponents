"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "./Reveal";
import SectionTag from "./ui/SectionTag";

type Seg = { text: string; accent?: boolean };

// Texto que vai preenchendo conforme o scroll. Palavras com accent ficam em
// destaque (cor da marca) quando "pintadas".
const paragraphs: Seg[][] = [
  [
    { text: "Itajaí localiza-se no" },
    { text: "litoral de Santa Catarina", accent: true },
    { text: "e integra um eixo de ligação com as principais" },
    { text: "rodovias e aeroportos do Brasil.", accent: true },
  ],
  [
    { text: "O município tem o" },
    { text: "segundo maior PIB", accent: true },
    { text: "do estado, decorrente da logística," },
    { text: "construção civil", accent: true },
    { text: "e do" },
    { text: "complexo portuário", accent: true },
    { text: "— o segundo maior do país em movimentação de contêineres." },
  ],
  [
    { text: "Em constante crescimento, está no ranking das" },
    { text: "50 cidades com maior qualidade de vida", accent: true },
    { text: "do Brasil." },
  ],
];

type W = { text: string; accent: boolean; para: number };
const words: W[] = [];
paragraphs.forEach((segs, pi) => {
  segs.forEach((seg) => {
    seg.text.split(" ").forEach((t) => {
      if (t) words.push({ text: t, accent: !!seg.accent, para: pi });
    });
  });
});
const N = words.length;

const ACCENT_PAINT = "#9bb7ff"; // azul claro pra leitura no fundo dark

function Word({
  text,
  accent,
  progress,
  start,
  end,
}: {
  text: string;
  accent: boolean;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return (
    <span className="relative inline-block mr-[0.26em]">
      <span style={{ color: "rgba(255,255,255,0.20)" }}>{text}</span>
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity,
          color: accent ? ACCENT_PAINT : "#ffffff",
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function ACidade() {
  const textRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.55"],
  });

  return (
    <section
      id="a-cidade"
      className="relative bg-[var(--dark-section)] text-[var(--dark-section-text)] overflow-hidden"
    >
      {/* foto aérea real de Itajaí como background bem sutil */}
      <div
        className="absolute inset-0 opacity-12"
        style={{
          backgroundImage: "url('/images/itajai-aerea.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--dark-section) 0%, rgba(13,31,84,0.90) 50%, var(--dark-section) 100%)",
        }}
      />

      {/* dot pattern sutil */}
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

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-20">
          {/* esquerda — mini label sticky */}
          <div>
            <div className="lg:sticky lg:top-28">
              <SectionTag number={2} tone="dark" className="mb-4">
                A Cidade
              </SectionTag>
              <p className="text-white text-2xl font-[var(--font-display)] leading-tight">
                Itajaí, SC.
              </p>
              <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/40 mt-3">
                Onde a ABDO constrói há 28 anos
              </p>
            </div>
          </div>

          {/* direita — texto grande pintando com scroll */}
          <div>
            <div
              ref={textRef}
              className="font-[var(--font-display)] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(28px, 3.6vw, 46px)",
                lineHeight: 1.35,
              }}
            >
              {[0, 1, 2].map((pi) => (
                <p key={pi} className={pi === 0 ? "" : "mt-7"}>
                  {words.map((w, k) =>
                    w.para !== pi ? null : reduce ? (
                      <span
                        key={k}
                        className="mr-[0.26em]"
                        style={{ color: w.accent ? ACCENT_PAINT : "#ffffff" }}
                      >
                        {w.text}
                      </span>
                    ) : (
                      <Word
                        key={k}
                        text={w.text}
                        accent={w.accent}
                        progress={scrollYProgress}
                        start={k / N}
                        end={Math.min(1, (k + 6) / N)}
                      />
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* stats — full width abaixo do grid principal */}
        <div className="mt-16 lg:mt-20 pt-10 border-t border-white/12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { v: "2º", l: "maior PIB de SC" },
            { v: "2º", l: "porto do Brasil" },
            { v: "Top 50", l: "qualidade de vida BR" },
            { v: "3", l: "cidades onde construímos" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-[var(--font-display)] text-white text-3xl md:text-4xl leading-none">
                {s.v}
              </p>
              <p className="text-white/55 text-sm mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
