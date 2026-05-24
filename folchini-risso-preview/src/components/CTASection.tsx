"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Dotted surface background */}
      <DottedSurface />

      {/* Semi-transparent overlay so dots are subtle */}
      <div className="absolute inset-0 bg-[var(--background)]/70 z-[1]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[2]" />

      <div className="relative z-[3] max-w-3xl mx-auto px-4 md:px-6 text-center">
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
            Atendimento
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 leading-tight text-balance"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span className="text-white">
            Fale Agora Com Um Advogado Criminalista
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-white/40 mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Tenha uma defesa qualificada em seu processo. Cada minuto conta quando
          sua liberdade está em jogo.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="pointer-events-auto"
        >
          <AnimatedButton
            href="https://wa.me/5547991622772?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20advogado%20criminalista%21"
            target="_blank"
            variant="primary"
            icon={<MessageCircle size={16} />}
          >
            Solicite Uma Análise do Seu Caso
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
