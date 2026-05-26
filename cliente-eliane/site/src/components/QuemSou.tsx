"use client";

import { Reveal } from "./Reveal";

export function QuemSou() {
  return (
    <section id="quem-sou" className="pt-16 sm:pt-24 pb-16 sm:pb-24">
      {/* Top separator */}
      <div style={{ borderBottom: "1px solid var(--marketing-border)" }} />

      <div style={{ maxWidth: 1220, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-20 sm:pt-28 items-center">
          {/* Left — foto da Dra. Eliane */}
          <Reveal className="lg:col-span-5">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "3/4",
                maxWidth: 420,
                background: "var(--marketing-card-cream)",
                borderRadius: 8,
                border: "1px solid var(--marketing-border)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/eliane.webp"
                alt="Dra. Eliane Ferreira, advogada"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center top" }}
              />
              {/* Selo OAB sobre a foto */}
              <div
                className="absolute left-4 bottom-4 flex items-center gap-2 rounded-full"
                style={{
                  background: "rgba(37,33,22,0.78)",
                  backdropFilter: "blur(6px)",
                  padding: "6px 12px",
                }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{ width: 5, height: 5, background: "var(--c-warm-accent)" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#fbfbf9",
                  }}
                >
                  OAB/RS 122.161 · 10 anos de carreira
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right — bio */}
          <Reveal className="lg:col-span-7" delay={0.12}>
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
              Quem vai cuidar do seu caso
            </p>
            <h2
              style={{
                fontFamily: "var(--font-instrument)",
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "var(--marketing-heading)",
              }}
            >
              Dra. Eliane Ferreira
            </h2>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12,
                color: "var(--marketing-eyebrow)",
                letterSpacing: "0.5px",
              }}
            >
              Advogada · OAB/RS 122.161 · Cachoeirinha/RS
            </p>

            <div
              className="mt-8 flex flex-col gap-5"
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "var(--marketing-copy-soft)",
              }}
            >
              <p>
                Iniciei na advocacia há mais de dez anos com uma convicção simples:
                <strong style={{ color: "var(--marketing-heading)" }}> ninguém deveria enfrentar a Justiça sozinho</strong>,
                especialmente em momentos difíceis e decisivos da vida. Ao longo dessa
                trajetória, foram mais de 800 casos atendidos nas áreas trabalhista, cível,
                previdenciária e de família, sempre com atuação próxima, estratégica e humanizada.
              </p>
              <p>
                Um dos casos que mais marcou minha trajetória foi a defesa de mais de 30
                trabalhadores da área da saúde de Cachoeirinha/RS. Eles prestavam serviço
                ao município por uma empresa terceirizada e foram dispensados sem verbas
                rescisórias, sem sequer ter a carteira assinada. Ingressei com a ação
                trabalhista e, ao final, todos tiveram seus vínculos
                <strong style={{ color: "var(--marketing-heading)" }}> reconhecidos judicialmente</strong>
                e receberam as verbas que lhes eram garantidas por lei. Mais do que processos,
                a advocacia é sobre devolver dignidade e justiça às pessoas.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
