"use client";

import { Reveal } from "./Reveal";

/* VS comparativo — adaptado da seção "What Makes Runner Different?" do runner.now */

const rows = [
  {
    question: "Será que vou ser só mais um número nesse escritório?",
    comum:
      "Seu caso vai parar na mão de um estagiário. Você liga, deixa recado e quase nunca fala com o advogado.",
    elianeSteps: [
      "A própria Dra. Eliane analisa o seu caso",
      "Atendimento presencial, olho no olho",
      "Você fala direto com ela, do início ao fim",
    ],
    elianeSummary:
      "Casos limitados por escolha — cada cliente recebe dedicação integral, sem terceirização.",
  },
  {
    question: "E se eu não tiver razão? Vão me cobrar mesmo assim?",
    comum:
      "Aceitam qualquer caso para faturar, mesmo sem chance real de êxito — e a conta sobra para você.",
    elianeSteps: [
      "Análise honesta das suas chances reais",
      "Explicação clara, sem juridiquês",
      "Você decide com segurança, sem pressão",
    ],
    elianeSummary:
      "Se não houver caminho, você é avisado antes — nada de gastar tempo e dinheiro à toa.",
  },
  {
    question: "Tenho medo de perderem o prazo do meu processo.",
    comum:
      "Escritórios sobrecarregados deixam prazos passarem — e o processo inteiro vai junto.",
    elianeSteps: [
      "Cada processo acompanhado diariamente",
      "Prazos cumpridos antes do vencimento",
      "10 anos de carreira sem uma única falha",
    ],
    elianeSummary:
      "Zero prazos perdidos em uma década inteira. Organização é a base de tudo aqui.",
  },
  {
    question: "Será que vão me explicar o que está acontecendo?",
    comum:
      "Juridiquês, respostas vagas e você sempre no escuro, sem saber em que pé está o processo.",
    elianeSteps: [
      "Cada etapa explicada em português claro",
      "Atualizações sobre o andamento do caso",
      "Suas dúvidas respondidas com paciência",
    ],
    elianeSummary:
      "Você entende exatamente onde seu processo está — segurança do início ao êxito.",
  },
];

/* ── Tab trapézio no topo de cada card ── */
function Tab({ label, accent }: { label: string; accent: boolean }) {
  return (
    <div className="relative mx-auto" style={{ width: 160, height: 30 }}>
      <div
        className="absolute inset-0"
        style={{
          background: accent ? "var(--marketing-primary-bg)" : "rgba(0,0,0,0.05)",
          clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
        }}
      />
      <div className="relative flex h-full items-center justify-center gap-1.5">
        <span
          className="inline-block rounded-full"
          style={{
            width: 5,
            height: 5,
            background: accent ? "var(--c-warm-accent)" : "#b0aca0",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: accent ? "var(--marketing-primary-text)" : "var(--marketing-copy-soft)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

const dotPattern = {
  backgroundImage:
    "radial-gradient(circle, rgba(0,0,0,0.10) 0.75px, transparent 0.75px), radial-gradient(circle, rgba(0,0,0,0.10) 0.75px, transparent 0.75px)",
  backgroundSize: "5px 5px",
  backgroundPosition: "0 0, 2.5px 2.5px",
};

export function Diferencial() {
  return (
    <section id="diferencial" className="pt-16 sm:pt-24">
      {/* Heading */}
      <Reveal style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}>
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
          Por que a Dra. Eliane
        </p>
        <h2
          style={{
            fontFamily: "var(--font-instrument)",
            fontSize: "clamp(40px, 7vw, 64px)",
            lineHeight: 1,
            letterSpacing: "-2.5px",
            color: "var(--marketing-heading)",
          }}
        >
          O que muda quando você
          <br />
          escolhe quem cuida do seu caso
        </h2>
        <p
          className="mt-5"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--marketing-copy-soft)",
            maxWidth: 540,
            paddingBottom: 8,
          }}
        >
          A maioria dos escritórios trata você como número. Veja, lado a lado, a
          diferença de ter a Dra. Eliane conduzindo pessoalmente cada etapa.
        </p>
      </Reveal>

      {/* Comparativo */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }} className="mt-12">
        <Reveal
          style={{
            borderLeft: "1px solid var(--marketing-border)",
            borderRight: "1px solid var(--marketing-border)",
            borderTop: "1px solid var(--marketing-border)",
          }}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-[260px_1fr_1fr]"
              style={{ borderBottom: "1px solid var(--marketing-border)" }}
            >
              {/* Pergunta */}
              <div
                className="flex flex-col justify-center p-6"
                style={{ borderRight: "1px solid var(--marketing-border)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--marketing-eyebrow)",
                    marginBottom: 10,
                  }}
                >
                  Você se pergunta
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontSize: 21,
                    lineHeight: 1.25,
                    letterSpacing: "-0.5px",
                    color: "var(--marketing-heading)",
                  }}
                >
                  &ldquo;{row.question}&rdquo;
                </h3>
              </div>

              {/* Escritório comum */}
              <div
                className="flex flex-col p-6"
                style={{ ...dotPattern, borderRight: "1px solid var(--marketing-border)" }}
              >
                <Tab label="Escritório comum" accent={false} />
                <div className="flex flex-1 items-center justify-center pt-4">
                  <div
                    className="w-full rounded-md bg-white p-4"
                    style={{
                      maxWidth: 330,
                      boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className="flex shrink-0 items-center justify-center rounded-full"
                        style={{
                          width: 18,
                          height: 18,
                          background: "rgba(192,57,43,0.10)",
                          color: "#c0392b",
                          fontSize: 11,
                          marginTop: 1,
                        }}
                      >
                        ✕
                      </span>
                      <p
                        style={{
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "var(--marketing-copy-soft)",
                        }}
                      >
                        {row.comum}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dra. Eliane */}
              <div className="flex flex-col p-6" style={dotPattern}>
                <Tab label="Dra. Eliane" accent />
                <div className="flex flex-1 items-center justify-center pt-4">
                  <div
                    className="w-full rounded-md bg-white p-4"
                    style={{
                      maxWidth: 330,
                      boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Lista de passos */}
                    <div className="relative space-y-2.5">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute"
                        style={{
                          left: 8,
                          top: 10,
                          bottom: 10,
                          width: 1,
                          background: "rgba(0,0,0,0.10)",
                        }}
                      />
                      {row.elianeSteps.map((step) => (
                        <div key={step} className="flex items-center gap-2.5">
                          <span
                            className="relative z-10 flex shrink-0 items-center justify-center rounded-full bg-white"
                            style={{
                              width: 17,
                              height: 17,
                              border: "1px solid rgba(139,34,82,0.25)",
                              color: "var(--c-warm-accent)",
                              fontSize: 9,
                            }}
                          >
                            ✓
                          </span>
                          <span
                            style={{
                              fontSize: 12.5,
                              lineHeight: 1.4,
                              color: "var(--marketing-heading)",
                            }}
                          >
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Resumo */}
                    <p
                      className="mt-3.5 pt-3.5"
                      style={{
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "var(--marketing-copy)",
                        borderTop: "1px solid var(--marketing-border)",
                      }}
                    >
                      {row.elianeSummary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
