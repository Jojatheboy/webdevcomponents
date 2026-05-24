"use client";

import { motion } from "framer-motion";

const WHATSAPP = "https://wa.me/5551987678998?text=Olá Dra. Eliane, gostaria de agendar uma consulta.";

const stats = [
  { num: "10", suffix: " anos", label: "de carreira" },
  { num: "+800", label: "clientes atendidos" },
  { num: "5,0", label: "nota no Google" },
];

/* Entrada sincronizada com o loader (cortina sobe ~1.65s) */
const EASE = [0.16, 1, 0.3, 1] as const;
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export function Hero() {
  return (
    <>
      <div aria-hidden="true" className="h-[60px]" />

      {/* ===== MOBILE HERO ===== */}
      <section className="lg:hidden flex flex-col">
        {/* Video top */}
        <div className="relative w-full" style={{ height: "50svh", minHeight: 300 }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 15%" }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, var(--c-background) 100%)",
            }}
          />
        </div>

        {/* Copy bottom */}
        <div className="px-6 pb-10 -mt-8 relative z-10">
          <motion.h1
            {...enter(1.75)}
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(32px, 8vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "var(--marketing-heading)",
              margin: 0,
            }}
          >
            Você tem direitos.
            <br />
            E não está sozinho.
          </motion.h1>

          <motion.p
            {...enter(1.9)}
            className="mt-5"
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--marketing-copy-soft)",
              maxWidth: 380,
            }}
          >
            A Dra. Eliane Ferreira defende trabalhadores e famílias em Cachoeirinha e
            região. Trabalhista, direito da mulher, aposentadoria e cível, com cada caso
            conduzido pessoalmente por ela.
          </motion.p>

          <motion.div {...enter(2.05)} className="flex items-center gap-3 mt-6">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full no-underline transition-colors whitespace-nowrap"
              style={{
                background: "var(--marketing-primary-bg)",
                color: "var(--marketing-primary-text)",
                padding: "11px 18px 11px 22px",
                fontSize: 14,
              }}
            >
              Falar no WhatsApp
              <DotArrow />
            </a>
            <a
              href="#como-funciona"
              className="group inline-flex items-center gap-2 no-underline transition-colors whitespace-nowrap"
              style={{ fontSize: 14, color: "var(--marketing-copy)" }}
            >
              Como funciona
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">›</span>
            </a>
          </motion.div>

          {/* Stats bar mobile */}
          <motion.div
            {...enter(2.2)}
            className="flex items-stretch mt-10 pt-5"
            style={{ borderTop: "1px solid var(--marketing-border)" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex-1"
                style={{
                  paddingLeft: i === 0 ? 0 : 16,
                  borderLeft: i === 0 ? "none" : "1px solid var(--marketing-border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontSize: 30,
                    color: "var(--marketing-heading)",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                  {s.suffix && <span style={{ fontSize: 16 }}>{s.suffix}</span>}
                </p>
                <p
                  className="mt-1.5"
                  style={{
                    fontSize: 10,
                    color: "var(--marketing-copy-soft)",
                    fontFamily: "var(--font-geist-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== DESKTOP HERO ===== */}
      <section className="relative overflow-hidden hidden lg:block" style={{ height: "100svh", minHeight: 700, maxHeight: 1000 }}>
        {/* Video background — right side */}
        <div className="absolute inset-0">
          <div
            className="absolute right-0 top-0 h-full w-[70%]"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "destination-in",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none h-full w-full object-cover"
              style={{ objectPosition: "center 15%" }}
            >
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between" style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div className="flex flex-1 items-center">
            <div className="flex w-full flex-col gap-7" style={{ maxWidth: 680 }}>
              <motion.h1
                {...enter(1.75)}
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "clamp(44px, 5.4vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                  color: "var(--marketing-heading)",
                  margin: 0,
                }}
              >
                Você tem direitos.
                <br />
                E não está sozinho.
              </motion.h1>

              <motion.p
                {...enter(1.9)}
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--marketing-copy-soft)",
                  maxWidth: 440,
                }}
              >
                A Dra. Eliane Ferreira defende trabalhadores e famílias em Cachoeirinha e
                região. Trabalhista, direito da mulher, aposentadoria e cível, com cada
                caso conduzido pessoalmente por ela.
              </motion.p>

              <motion.div {...enter(2.05)} className="flex items-center gap-4">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full no-underline transition-colors"
                  style={{
                    background: "var(--marketing-primary-bg)",
                    color: "var(--marketing-primary-text)",
                    padding: "12px 20px 12px 24px",
                    fontSize: 15,
                  }}
                >
                  Falar no WhatsApp agora
                  <DotArrow />
                </a>
                <a
                  href="#como-funciona"
                  className="group inline-flex items-center gap-2 no-underline transition-colors"
                  style={{ fontSize: 15, color: "var(--marketing-copy)" }}
                >
                  Ver como funciona
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">›</span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom bar — 3 stats */}
          <motion.div
            {...enter(2.2)}
            className="flex items-stretch pb-8"
            style={{ borderTop: "1px solid var(--marketing-border)", paddingTop: 22 }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  paddingLeft: i === 0 ? 0 : 32,
                  paddingRight: 32,
                  borderLeft: i === 0 ? "none" : "1px solid var(--marketing-border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontSize: 40,
                    color: "var(--marketing-heading)",
                    letterSpacing: "-1.5px",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                  {s.suffix && <span style={{ fontSize: 20 }}>{s.suffix}</span>}
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontSize: 11,
                    color: "var(--marketing-copy-soft)",
                    fontFamily: "var(--font-geist-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function DotArrow() {
  return (
    <svg aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.5 4C6.22386 4 6 4.22386 6 4.5C6 4.77614 6.22386 5 6.5 5C6.77614 5 7 4.77614 7 4.5C7 4.22386 6.77614 4 6.5 4ZM6.5 11C6.22386 11 6 11.2239 6 11.5C6 11.7761 6.22386 12 6.5 12C6.77614 12 7 11.7761 7 11.5C7 11.2239 6.77614 11 6.5 11ZM7 5.5C7 5.22386 7.22386 5 7.5 5C7.77614 5 8 5.22386 8 5.5C8 5.77614 7.77614 6 7.5 6C7.22386 6 7 5.77614 7 5.5ZM7.5 10C7.22386 10 7 10.2239 7 10.5C7 10.7761 7.22386 11 7.5 11C7.77614 11 8 10.7761 8 10.5C8 10.2239 7.77614 10 7.5 10ZM8 6.5C8 6.22386 8.22386 6 8.5 6C8.77614 6 9 6.22386 9 6.5C9 6.77614 8.77614 7 8.5 7C8.22386 7 8 6.77614 8 6.5ZM8.5 9C8.22386 9 8 9.22386 8 9.5C8 9.77614 8.22386 10 8.5 10C8.77614 10 9 9.77614 9 9.5C9 9.22386 8.77614 9 8.5 9ZM9 7.5C9 7.22386 9.22386 7 9.5 7C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8C9.22386 8 9 7.77614 9 7.5ZM9.5 8C9.77614 8 10 8.22386 10 8.5C10 8.77614 9.77614 9 9.5 9C9.22386 9 9 8.77614 9 8.5C9 8.22386 9.22386 8 9.5 8Z" fill="currentColor"/>
    </svg>
  );
}
