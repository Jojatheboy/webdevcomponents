"use client";

import { motion } from "framer-motion";
import { Eye, Target, Shield } from "lucide-react";

const cards = [
  {
    icon: Eye,
    title: "Visão",
    text: "Ser um escritório de advocacia reconhecido pela excelência no atendimento e na prestação de serviços jurídicos, consolidando-se como referência em Londrina e região.",
  },
  {
    icon: Target,
    title: "Missão",
    text: "Oferecer soluções jurídicas eficazes e personalizadas, pautadas na ética, transparência e compromisso com os interesses dos nossos clientes.",
  },
  {
    icon: Shield,
    title: "Princípios",
    text: "Ética, transparência, comprometimento, respeito ao cliente e busca incessante pela justiça norteiam todas as nossas ações e decisões.",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="py-12 md:py-16 bg-[var(--background)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left column */}
          <div>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-md px-3 py-1">
                <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                Quem Somos
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)", textWrap: "balance" }}
            >
              Sobre o Escritório
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm md:text-base text-white/50 leading-relaxed mb-8"
              style={{ textWrap: "balance" }}
            >
              Tradição, profissionalismo e resultados que fazem a diferença na
              vida dos nossos clientes.
            </motion.p>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-lg overflow-hidden mb-6 aspect-[4/3]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about.jpg" alt="Escritório Souza & Souza" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 text-sm md:text-base text-white/60 leading-relaxed"
            >
              <p>
                Com mais de <strong className="text-white/80">14 anos de experiência</strong>, o
                escritório Souza & Souza Advogados Associados se destaca pela
                atuação comprometida e pelos resultados expressivos alcançados em
                prol dos seus clientes.
              </p>
              <p>
                Sediado em <strong className="text-white/80">Londrina, Paraná</strong>, nosso
                escritório já atendeu mais de 15.000 casos, sempre com o mesmo
                compromisso: oferecer um atendimento humanizado, transparente e
                voltado para a solução eficaz dos problemas jurídicos.
              </p>
              <p>
                Nossa equipe é formada por profissionais qualificados e em
                constante atualização, prontos para oferecer a melhor assessoria
                jurídica nas áreas Trabalhista, Cível e Previdenciária.
              </p>
            </motion.div>
          </div>

          {/* Right column: cards */}
          <div className="flex flex-col gap-4 md:pt-16">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="bg-[var(--card)] border border-[var(--border-subtle)] rounded-lg p-6 hover:border-[var(--accent)]/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <card.icon size={20} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-semibold text-white mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stat highlight */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-lg p-6 mt-2"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div
                    className="text-2xl font-bold text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    14+
                  </div>
                  <div className="text-xs text-white/40 mt-1">Anos</div>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    15k+
                  </div>
                  <div className="text-xs text-white/40 mt-1">Casos</div>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    5.0★
                  </div>
                  <div className="text-xs text-white/40 mt-1">Google</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
