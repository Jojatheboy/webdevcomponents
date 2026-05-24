"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { MessageCircle } from "lucide-react";

const diferenciais = [
  {
    title: "Especialização Comprovada",
    meta: "Formação · Direito Penal Econômico, Processo Penal e Ciências Criminais",
  },
  {
    title: "Experiência em Casos Complexos",
    meta: "Operações · Grande repercussão nacional, alta pressão e visibilidade",
  },
  {
    title: "Atuação em Todo Brasil",
    meta: "Presença · Sede em BC/SC + parceiros em Chapecó, São Paulo e Brasília",
  },
  {
    title: "Resultados Reconhecidos",
    meta: "Google · 116 avaliações positivas comprovam excelência e compromisso",
  },
  {
    title: "Atendimento Diferenciado",
    meta: "Estratégia · Acompanhamento direto dos sócios em cada caso",
  },
  {
    title: "Defesa em Todas as Instâncias",
    meta: "Abrangência · Da fase policial ao STJ e STF com a mesma dedicação",
  },
];

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,107,88,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--accent)]/30 bg-[var(--accent)]/10 rounded-md mb-4"
            >
              <div className="w-1.5 h-1.5 bg-[var(--accent-light)] rounded-full" />
              <span
                className="text-[11px] tracking-[0.15em] text-[var(--accent-light)] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Diferenciais
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 leading-tight text-balance"
              style={{ fontFamily: "var(--font-playfair)" }}
            >

              <span className="text-white">Por Que Escolher</span>{" "}
              <span className="text-[var(--accent)]">Folchini & Risso</span><span className="text-white">?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/40 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cada caso é único e merece uma defesa à altura. Nossa equipe
              combina conhecimento técnico profundo com experiência prática em
              casos de alta complexidade.
            </motion.p>
            <AnimatedButton
              href="https://wa.me/5547991622772?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20advogado%20criminalista%21"
              target="_blank"
              variant="primary"
              icon={<MessageCircle size={16} />}
            >
              Solicite Uma Análise
            </AnimatedButton>
          </div>

          {/* Right - Priority List Style */}
          <div>
            <div className="flex flex-col gap-2.5">
              {diferenciais.map((item, i) => {
                const rank = i + 1;
                const isFirst = i === 0;
                const isLast = i === diferenciais.length - 1;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group relative flex items-stretch rounded-lg border border-white/[0.06] bg-[var(--card)] hover:bg-[var(--accent)]/[0.08] hover:border-[var(--accent)]/20 transition-all duration-200"
                  >
                    {/* Rank number */}
                    <div className="flex flex-col items-center justify-center w-12 min-w-[3rem] sm:w-14 sm:min-w-[3.5rem] border-r border-white/[0.06] py-3 sm:py-4 gap-0.5">
                      <span
                        className="font-mono text-lg font-medium text-white/25 leading-none group-hover:text-white/60 transition-colors duration-200"
                      >
                        {rank}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-white/20">
                        {isFirst ? "top" : isLast ? "last" : ""}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3.5 min-w-0">
                      <p
                        className="text-sm font-semibold truncate leading-snug text-white/80 group-hover:text-white transition-colors duration-200"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item.title}
                      </p>
                      {item.meta && (
                        <p
                          className="text-xs text-white/30 mt-1 group-hover:text-white/40 transition-colors duration-200"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.meta}
                        </p>
                      )}
                    </div>

                    {/* Arrow icon */}
                    <div className="flex items-center justify-center w-10 text-white/10 group-hover:text-[var(--accent)]/60 transition-colors duration-200">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer hint */}
            <div
              className="mt-4 flex items-center justify-end gap-2 text-[11px] text-white/20"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="inline-flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/[0.06] font-mono text-[10px] text-white/30">
                  01
                </span>
                prioridade máxima
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/[0.06] font-mono text-[10px] text-white/30">
                  06
                </span>
                todos essenciais
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
