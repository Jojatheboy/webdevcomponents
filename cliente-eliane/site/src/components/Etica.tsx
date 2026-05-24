"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const WHATSAPP =
  "https://wa.me/5551987678998?text=Olá Dra. Eliane, gostaria de agendar uma consulta.";

/* Vinho clareado — legível como texto sobre o fundo escuro */
const ACCENT = "#d07a9f";

type Seg = { text: string; accent?: boolean };

/* Texto preenchido conforme o scroll (cinza → branco / vinho) */
const paragraphs: Seg[][] = [
  [
    { text: "Tudo o que você conta para a Dra. Eliane é protegido pelo" },
    { text: "sigilo profissional", accent: true },
    { text: "do advogado," },
    { text: "garantido por lei.", accent: true },
  ],
  [
    { text: "A sua história, os seus documentos e o seu caso ficam" },
    { text: "só entre você e ela.", accent: true },
    { text: "Do primeiro contato ao fim do processo, sempre com" },
    { text: "total discrição.", accent: true },
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
    <span style={{ position: "relative", display: "inline-block", marginRight: "0.26em" }}>
      {/* Base apagada */}
      <span style={{ color: "rgba(251,251,249,0.20)" }}>{text}</span>
      {/* Camada pintada */}
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity,
          color: accent ? ACCENT : "#fbfbf9",
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Etica() {
  const textRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.55"],
  });

  const textStyle = {
    fontFamily: "var(--font-instrument)",
    fontSize: "clamp(26px, 3.5vw, 42px)",
    lineHeight: 1.38,
    letterSpacing: "-0.5px",
  } as const;

  return (
    <section
      id="etica"
      className="relative overflow-hidden"
      style={{
        background: "var(--marketing-primary-bg)",
        color: "var(--marketing-primary-text)",
      }}
    >
      {/* Dot pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0.75px, transparent 0.75px), radial-gradient(circle, rgba(255,255,255,0.05) 0.75px, transparent 0.75px)",
          backgroundSize: "5px 5px",
          backgroundPosition: "0 0, 2.5px 2.5px",
        }}
      />

      <div
        className="relative"
        style={{ maxWidth: 1220, margin: "0 auto", padding: "100px 24px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-20">
          {/* Esquerda — mini título */}
          <div>
            <p
              className="lg:sticky lg:top-[110px]"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "rgba(251,251,249,0.5)",
              }}
            >
              Ética e sigilo
            </p>
          </div>

          {/* Direita — texto preenchido + divider + frase + botão */}
          <div>
            <div ref={textRef}>
              {[0, 1].map((pi) => (
                <p key={pi} style={{ ...textStyle, marginTop: pi === 0 ? 0 : "1em" }}>
                  {words.map((w, k) =>
                    w.para !== pi ? null : reduce ? (
                      <span
                        key={k}
                        style={{
                          marginRight: "0.26em",
                          color: w.accent ? ACCENT : "#fbfbf9",
                        }}
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

            {/* Divider */}
            <div
              className="mt-12"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
            />

            {/* Frase menor + botão */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(251,251,249,0.55)",
                  maxWidth: 440,
                }}
              >
                Casos de família e violência doméstica pedem ainda mais cuidado.
                Aqui, o seu nome nunca é exposto.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full no-underline transition-opacity hover:opacity-90 shrink-0"
                style={{
                  background: "var(--marketing-primary-text)",
                  color: "var(--marketing-primary-bg)",
                  padding: "13px 22px 13px 26px",
                  fontSize: 15,
                  fontWeight: 500,
                  width: "fit-content",
                }}
              >
                Falar com sigilo e segurança
                <svg
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
