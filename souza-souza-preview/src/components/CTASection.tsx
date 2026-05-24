"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5543999596714&text=Olá! Acessei o site e gostaria de obter mais informações.";

export function CTASection() {
  return (
    <section id="contato" className="py-12 md:py-16 bg-[var(--background)] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative">
        <div className="bg-[var(--card)] border border-[var(--border-subtle)] rounded-lg p-8 md:p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-md px-3 py-1">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
              Contato
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair)", textWrap: "balance" }}
          >
            Fale Com Nossa Equipe
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm md:text-base text-white/50 max-w-lg mx-auto mb-8"
            style={{ textWrap: "balance" }}
          >
            Entre em contato agora mesmo e tire suas dúvidas. Nosso time de
            advogados especializados está pronto para atender você.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <AnimatedButton
              href={WHATSAPP_URL}
              target="_blank"
              variant="primary"
              icon={<MessageCircle size={16} />}
            >
              Fale no WhatsApp
            </AnimatedButton>

            <a
              href="tel:+554330277088"
              className="text-sm text-white/50 hover:text-[var(--accent)] transition-colors"
            >
              ou ligue: <span className="text-[var(--accent)] font-medium">(43) 3027-7088</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
