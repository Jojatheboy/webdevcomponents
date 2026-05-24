"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Reveal } from "../animations/Reveal";
import SectionTag from "../sections/SectionTag";

/* ============================================================
 *  FAQAccordion — heading sticky + busca à esquerda, accordion à direita
 *  com expand/collapse animado.
 * ============================================================ */

export type FAQItem = { question: string; answer: string };

export interface FAQAccordionProps {
  number?: number;
  tag: string;
  headline: string;
  /** Texto pequeno abaixo do headline (esquerda) */
  subtitle?: string;
  /** Pergunta aberta por default (índice ou question text) */
  defaultOpen?: number;
  /** Mostrar campo de busca em tempo real */
  enableSearch?: boolean;
  /** Placeholder do campo de busca */
  searchPlaceholder?: string;
  items: FAQItem[];
  id?: string;
}

export default function FAQAccordion({
  number,
  tag,
  headline,
  subtitle,
  defaultOpen = 0,
  enableSearch = true,
  searchPlaceholder = "Buscar pergunta...",
  items,
  id = "faq",
}: FAQAccordionProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(items[defaultOpen]?.question ?? null);

  const filtered = items.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id={id} className="relative bg-[var(--background)] pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <Reveal className="mb-10 lg:mb-0 lg:w-[340px] shrink-0">
            <SectionTag number={number} tone="light" className="mb-4">
              {tag}
            </SectionTag>
            <h2 className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(36px,5.5vw,56px)] leading-[1.02]">
              {headline}
            </h2>
            {subtitle && (
              <p
                className="mt-5 text-[var(--foreground-soft)] text-sm leading-relaxed"
                style={{ maxWidth: "32ch" }}
              >
                {subtitle}
              </p>
            )}

            {enableSearch && (
              <div className="relative mt-7">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--foreground-mute)]" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md py-2.5 pl-10 pr-4 outline-none transition-colors border border-[var(--border-subtle)] bg-transparent text-[var(--foreground)] font-mono text-xs focus:border-[var(--accent)]"
                  style={{ transitionDuration: "200ms" }}
                />
              </div>
            )}
          </Reveal>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-[var(--foreground-mute)] text-sm">
                Nenhuma pergunta encontrada.
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
                      transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-[var(--border-subtle)] last:border-b py-5"
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : faq.question)}
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
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1), color 0.2s",
                            color: isOpen ? "var(--accent)" : "var(--foreground-mute)",
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
