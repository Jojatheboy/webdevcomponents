"use client";

import { Reveal } from "./Reveal";

const WHATSAPP =
  "https://wa.me/5551987678998?text=Olá Dra. Eliane, gostaria de agendar uma consulta.";

const steps = [
  {
    tag: "Sem custo",
    title: "Conversa inicial",
    text: "Você me chama no WhatsApp e conta o que está acontecendo. A primeira conversa é sem compromisso.",
  },
  {
    tag: "Estratégia",
    title: "Análise do caso",
    text: "Estudo seus documentos, avalio as chances reais e monto a melhor estratégia para o seu caso.",
  },
  {
    tag: "Acompanhamento",
    title: "Ação na Justiça",
    text: "Entramos com o processo e eu cuido de cada etapa. Você acompanha tudo, sem juridiquês.",
  },
  {
    tag: "Resultado",
    title: "Direito garantido",
    text: "Sigo ao seu lado até o fim, com foco no melhor resultado e na segurança que você merece.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="pb-16 sm:pb-24">
      {/* Separator */}
      <div style={{ borderBottom: "1px solid var(--marketing-border)" }} />

      <div
        style={{ maxWidth: 1220, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}
        className="pt-20 sm:pt-28"
      >
        {/* Heading */}
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--c-warm-accent)",
              marginBottom: 16,
            }}
          >
            Simples do começo ao fim
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument)",
              fontSize: "clamp(36px, 6vw, 56px)",
              lineHeight: 1,
              letterSpacing: "-2px",
              color: "var(--marketing-heading)",
            }}
          >
            Como funciona o seu atendimento
          </h2>
          <p
            className="mt-5"
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--marketing-copy-soft)",
              maxWidth: 520,
            }}
          >
            Sem burocracia desnecessária e sem juridiquês. Veja o caminho que
            percorremos juntos, da primeira conversa ao seu direito garantido.
          </p>
        </Reveal>

        {/* Stepper — timeline vertical no mobile, horizontal no desktop */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.1}
              className="relative flex items-start gap-5 lg:block lg:gap-0"
            >
              {/* Conector vertical — mobile */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="sm:hidden absolute"
                  style={{
                    left: 25,
                    top: 52,
                    bottom: -48,
                    borderLeft: "1px dashed var(--marketing-border)",
                  }}
                />
              )}
              {/* Conector horizontal — desktop */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute"
                  style={{
                    top: 25,
                    left: 70,
                    right: -32,
                    borderTop: "1px dashed var(--marketing-border)",
                  }}
                />
              )}

              {/* Badge numerado */}
              <div
                className="relative z-10 flex shrink-0 items-center justify-center rounded-full"
                style={{
                  width: 52,
                  height: 52,
                  background: "var(--background)",
                  border: "1px solid var(--marketing-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontStyle: "italic",
                    fontSize: 24,
                    color: "var(--c-warm-accent)",
                    lineHeight: 1,
                  }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 lg:mt-5">
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--marketing-eyebrow)",
                  }}
                >
                  {step.tag}
                </p>
                <h3
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontSize: 24,
                    letterSpacing: "-0.5px",
                    color: "var(--marketing-heading)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "var(--marketing-copy-soft)",
                  }}
                >
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full no-underline transition-colors whitespace-nowrap"
              style={{
                background: "var(--marketing-primary-bg)",
                color: "var(--marketing-primary-text)",
                padding: "13px 22px 13px 26px",
                fontSize: 15,
                width: "fit-content",
              }}
            >
              Começar minha conversa
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
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12,
                color: "var(--marketing-copy-soft)",
              }}
            >
              Primeira conversa sem custo e sem compromisso.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
