"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Reveal } from "./Reveal";
import SectionTag from "./ui/SectionTag";

const FAQS = [
  {
    question: "Como funciona o financiamento dos apartamentos?",
    answer:
      "Trabalhamos com financiamento bancário (Caixa, Bradesco, Itaú, Santander) e também com financiamento direto da construtora em condições combinadas caso a caso. Nossa equipe te ajuda em todo o processo de aprovação.",
  },
  {
    question: "Posso visitar o apartamento decorado antes de comprar?",
    answer:
      "Sim. Agendamos a visita ao decorado e à obra (quando em construção) sem compromisso. Chame nossa equipe pelo WhatsApp e marcamos o melhor horário para você.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Pagamento à vista com desconto, financiamento bancário, financiamento direto da construtora, e em alguns casos aceitamos imóvel ou veículo como parte do pagamento. Tudo combinado com clareza antes da assinatura.",
  },
  {
    question: "Qual o prazo médio de entrega de um empreendimento?",
    answer:
      "De 24 a 36 meses contados a partir do lançamento, dependendo do porte do edifício. O cronograma é apresentado no contrato e o acompanhamento da obra é feito mês a mês.",
  },
  {
    question: "Como acompanho a obra do meu apartamento?",
    answer:
      "Enviamos mensalmente fotos e relatórios de evolução pela área do cliente e por WhatsApp. Visitas à obra podem ser agendadas com a equipe técnica nos dias acordados.",
  },
  {
    question: "Em quais cidades a ABDO constrói?",
    answer:
      "Itajaí (sede), Balneário Camboriú e Navegantes. Em 28 anos entregamos 8 empreendimentos nessas cidades, somando 212 unidades e 25 mil m² de área construída.",
  },
  {
    question: "O que está incluso no valor do apartamento?",
    answer:
      "O valor inclui o apartamento com acabamento padrão definido no memorial descritivo, vaga de garagem (quando aplicável), e participação na área comum do empreendimento. Itens opcionais (decorado, móveis planejados) são contratados à parte.",
  },
  {
    question: "Vocês trabalham com investidores e corretores parceiros?",
    answer:
      "Sim. Temos programa de parceria com corretores e abrimos condições especiais para investidores. Fale com nossos consultores pelo WhatsApp para conhecer as comissões e os empreendimentos em lançamento.",
  },
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(FAQS[0].question);

  const filtered = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="faq"
      className="relative bg-[var(--background)] pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* esquerda — heading + busca */}
          <Reveal className="mb-10 lg:mb-0 lg:w-[340px] shrink-0">
            <SectionTag number={4} tone="light" className="mb-4">
              Perguntas frequentes
            </SectionTag>
            <h2 className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(36px,5.5vw,56px)] leading-[1.02]">
              Dúvidas<br />frequentes
            </h2>
            <p
              className="mt-5 text-[var(--foreground-soft)] text-sm leading-relaxed"
              style={{ maxWidth: "32ch" }}
            >
              Não encontrou sua dúvida? Fale com a gente pelo WhatsApp — respondemos rápido.
            </p>

            <div className="relative mt-7">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--foreground-mute)]" />
              <input
                type="text"
                placeholder="Buscar pergunta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md py-2.5 pl-10 pr-4 outline-none transition-colors border border-[var(--border-subtle)] bg-transparent text-[var(--foreground)] font-mono text-xs focus:border-[var(--accent)]"
                style={{ transitionDuration: "200ms" }}
              />
            </div>
          </Reveal>

          {/* direita — accordion */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-[var(--foreground-mute)] text-sm">
                Nenhuma pergunta encontrada. Fale conosco pelo WhatsApp.
              </p>
            ) : (
              <div>
                {filtered.map((faq, idx) => {
                  const isOpen = open === faq.question;
                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-t border-[var(--border-subtle)] last:border-b py-5"
                    >
                      <button
                        onClick={() =>
                          setOpen(isOpen ? null : faq.question)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 text-left cursor-pointer group"
                      >
                        <span className="text-[var(--foreground)] text-base md:text-lg font-medium leading-snug group-hover:text-[var(--accent)] transition-colors">
                          {faq.question}
                        </span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="shrink-0"
                          style={{
                            transform: isOpen
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                            transition:
                              "transform 0.32s cubic-bezier(0.16,1,0.3,1), color 0.2s",
                            color: isOpen
                              ? "var(--accent)"
                              : "var(--foreground-mute)",
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
                            transition={{
                              duration: 0.32,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <p
                              className="mt-4 pr-8 text-[var(--foreground-soft)] text-sm md:text-base leading-relaxed"
                              style={{ maxWidth: "62ch" }}
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
