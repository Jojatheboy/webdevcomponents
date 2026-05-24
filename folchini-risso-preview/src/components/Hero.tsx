"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image - same as original site hero */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/PT01-3.webp)",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0b1210]/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1210]/50 via-transparent to-[#0b1210]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,107,88,0.1)_0%,transparent_70%)]" />

      {/* Noise/grain filter */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Green accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-[var(--accent)]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--accent)]/30 bg-[var(--accent)]/10 mb-8 rounded-md"
        >
          <div className="w-1.5 h-1.5 bg-[var(--accent-light)] rounded-full animate-pulse" />
          <span
            className="text-xs tracking-[0.2em] text-[var(--accent-light)] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Advocacia Criminal de Alto Nível
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-balance"
          style={{ fontFamily: "var(--font-playfair)" }}
        >

          <span className="text-white">Defesa Criminal</span>{" "}
          <span className="text-[var(--accent-light)]">Estratégica</span>
          <br />
          <span className="text-white">Para Proteger Sua</span>
          <br />
          <span className="text-white">Liberdade</span>
          <span className="text-white/60"> e Seu </span>
          <span className="text-white">Futuro</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Especialistas em Direito Penal com atuação reconhecida em casos de
          alta complexidade nas esferas Estadual e Federal.{" "}
          <span className="text-white/70">
            Resultados comprovados quando mais importa.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatedButton
            href="https://wa.me/5547991622772?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20advogado%20criminalista%21"
            target="_blank"
            variant="primary"
            icon={<MessageCircle size={16} />}
          >
            Solicite Uma Análise do Seu Caso
          </AnimatedButton>
          <AnimatedButton
            href="#especialidades"
            variant="outline"
          >
            Conheça Nossas Especialidades
          </AnimatedButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10 border-t border-white/10 pt-8 sm:pt-10"
        >
          {[
            { number: "116+", label: "Avaliações no Google" },
            { number: "8+", label: "Operações de Grande Porte" },
            { number: "5", label: "Estados com Atuação Direta" },
            { number: "STJ/STF", label: "Atuação em Tribunais Superiores" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.number}
              </div>
              <div
                className="text-xs text-white/40 tracking-wide"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.3em] text-white/30 uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[var(--accent)]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
