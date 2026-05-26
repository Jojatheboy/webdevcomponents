"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Quais áreas a Dra. Eliane atende?",
    answer:
      "Direito Trabalhista, Direito da Mulher (divórcio, pensão, guarda e medida protetiva), Aposentadoria e revisão de benefício do INSS, e Direito Cível. Se a sua situação envolve mais de uma área, eu cuido de tudo.",
  },
  {
    question: "Como funciona a primeira conversa?",
    answer:
      "Você me chama no WhatsApp e conta o que está acontecendo. Eu analiso o seu caso, explico seus direitos sem juridiquês e digo as chances reais. Sem compromisso.",
  },
  {
    question: "A Dra. Eliane atende presencial ou online?",
    answer:
      "Os dois. Presencial em Cachoeirinha/RS e por videochamada para clientes de toda a região metropolitana de Porto Alegre, com a mesma atenção.",
  },
  {
    question: "Quanto vou pagar?",
    answer:
      "Os valores são definidos caso a caso, conforme a complexidade, e combinados com você de forma clara antes de qualquer passo. Sem surpresa. Em parte dos casos trabalhistas dá para começar sem custo inicial.",
  },
  {
    question: "Fui demitido injustamente. A que tenho direito?",
    answer:
      "A demissão sem justa causa garante aviso prévio, saldo de salário, férias e 13º proporcionais, multa de 40% do FGTS e o saque do fundo. Havendo assédio, horas extras não pagas ou desvio de função, cabem indenizações a mais.",
  },
  {
    question: "Como funciona a medida protetiva?",
    answer:
      "É uma ordem judicial que afasta o agressor e protege a mulher em situação de violência. Pode ser pedida com urgência e sair em 24 a 48 horas. O processo é sigiloso e eu acompanho cada etapa.",
  },
  {
    question: "O INSS negou meu benefício. Ainda dá pra reverter?",
    answer:
      "Sim. Muitas negativas do INSS são revertidas. Eu analiso o motivo da recusa, reúno a documentação certa e entro com o recurso ou a ação na Justiça.",
  },
  {
    question: "Quanto tempo leva o meu processo?",
    answer:
      "Depende do tipo de causa. Medidas protetivas saem em 24 a 48 horas; ações trabalhistas costumam andar entre 6 e 18 meses. Na primeira conversa eu dou uma estimativa realista para o seu caso.",
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
