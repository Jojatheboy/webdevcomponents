"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Quais áreas a Dra. Eliane atende?",
    answer:
      "A Dra. Eliane Ferreira atua nas áreas de Direito do Trabalho, Direito das Famílias e Direito Previdenciário, além de causas de Direito Cível. Se a sua situação envolver mais de uma área, o seu caso é analisado de forma completa, com acompanhamento estratégico e atendimento personalizado em todas as etapas.",
  },
  {
    question: "Como funciona a primeira conversa?",
    answer:
      "Na primeira conversa, você explica sua situação com calma e apresenta os documentos que tiver disponíveis. A Dra. Eliane faz uma análise inicial do caso, esclarece dúvidas, explica os possíveis caminhos jurídicos e informa as chances reais. Tudo de forma clara, humanizada e sem compromisso, pra você decidir com segurança.",
  },
  {
    question: "A Dra. Eliane atende presencial ou online?",
    answer:
      "Os dois. Presencial no escritório em Cachoeirinha/RS e por videochamada para clientes de toda a região e de qualquer lugar do Brasil, com a mesma atenção.",
  },
  {
    question: "Quanto vou pagar?",
    answer:
      "Nas ações trabalhistas, os honorários são pagos somente ao final do processo e em caso de êxito da ação. Nas demais áreas (Famílias, Previdenciário e Cível), é feita uma análise individual do caso pra definir os honorários, sempre com transparência total e possibilidade de parcelamento.",
  },
  {
    question: "Fui demitido injustamente. A que tenho direito?",
    answer:
      "Depende da situação, mas você pode ter direito a verbas rescisórias, saldo de salário, aviso-prévio, férias, 13º, FGTS com multa de 40%, horas extras, indenizações e até reconhecimento de irregularidades cometidas pela empresa. A Dra. Eliane faz uma análise completa dos documentos e da forma como ocorreu a demissão pra identificar todos os direitos que cabem ser buscados judicialmente.",
  },
  {
    question: "Como funciona a medida protetiva?",
    answer:
      "É uma proteção prevista em lei pra resguardar mulheres em situação de violência física, psicológica, moral, patrimonial ou ameaça. Pode determinar o afastamento do agressor, a proibição de contato ou aproximação, e proteção pra vítima e seus filhos. O pedido é feito de forma rápida e sigilosa. A Dra. Eliane atua com acolhimento, discrição e firmeza num momento que exige cuidado.",
  },
  {
    question: "O INSS negou meu benefício. Ainda dá pra reverter?",
    answer:
      "Sim. Muitas negativas do INSS podem ser revisadas administrativa ou judicialmente, principalmente quando há documentos incompletos, erros na análise ou direitos que não foram corretamente reconhecidos. Aposentadorias, auxílio-doença, benefício por incapacidade e pensão negados ainda podem ser revertidos com a estratégia certa. A Dra. Eliane avalia seu caso e define o melhor caminho.",
  },
  {
    question: "Quanto tempo leva o meu processo?",
    answer:
      "Depende do tipo de ação, da complexidade do caso e do andamento do Judiciário. Alguns processos são resolvidos rapidamente; outros exigem mais etapas e produção de provas. Cada situação é analisada de forma individual, com transparência sobre prazos e próximos passos. A Dra. Eliane acompanha cada etapa de perto, mantendo você informado.",
  },
];

export function FAQ() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(FAQS[0].question);

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div style={{ maxWidth: 1220, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 lg:mb-0 lg:w-[340px] shrink-0"
          >
            <h2
              style={{
                fontFamily: "var(--font-instrument)",
                fontSize: "clamp(36px, 6vw, 56px)",
                lineHeight: 1,
                letterSpacing: "-2px",
                color: "var(--marketing-heading)",
              }}
            >
              Dúvidas
              <br />
              frequentes
            </h2>
            <p
              className="mt-4"
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--marketing-copy-soft)",
                maxWidth: 300,
              }}
            >
              Não encontrou sua dúvida? Entre em contato pelo WhatsApp que respondemos rapidamente.
            </p>

            {/* Search */}
            <div className="relative mt-6">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--marketing-copy-soft)]"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Buscar pergunta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md py-2.5 pl-10 pr-4 outline-none transition-colors"
                style={{
                  border: "1px solid var(--marketing-border)",
                  background: "transparent",
                  color: "var(--marketing-copy)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 13,
                }}
              />
            </div>
          </motion.div>

          {/* Right — accordion */}
          <div className="flex-1">
            {filteredFaqs.length === 0 ? (
              <p
                className="py-12 text-center"
                style={{ color: "var(--marketing-copy-soft)", fontSize: 15 }}
              >
                Nenhuma pergunta encontrada. Fale conosco pelo WhatsApp.
              </p>
            ) : (
              <div className="divide-y" style={{ borderColor: "var(--marketing-border)" }}>
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = open === faq.question;
                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="py-5 first:pt-0"
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : faq.question)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          fontSize: 16,
                          fontWeight: 500,
                          color: "var(--marketing-heading)",
                          lineHeight: 1.4,
                        }}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <svg
                          className="shrink-0"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          style={{
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                            color: isOpen
                              ? "var(--c-warm-accent)"
                              : "var(--marketing-heading)",
                          }}
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <p
                              className="mt-3 pr-8"
                              style={{
                                fontSize: 15,
                                lineHeight: 1.7,
                                color: "var(--marketing-copy-soft)",
                              }}
                            >
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
