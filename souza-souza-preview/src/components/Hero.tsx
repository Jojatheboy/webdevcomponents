"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5543999596714&text=Olá! Acessei o site e gostaria de obter mais informações.";

const stats = [
  { value: "991+", label: "Avaliações 5★" },
  { value: "15.000+", label: "Casos resolvidos" },
  { value: "14+", label: "Anos de atuação" },
  { value: "Londrina", label: "Paraná" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/banner.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/85" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Gold gradient bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-28 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-md px-3 py-1">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
              Desde 2010
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-3"
            style={{ fontFamily: "var(--font-playfair)", textWrap: "balance" }}
          >
            Advocacia Especializada em Direito Trabalhista, Cível e Previdenciário
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ textWrap: "balance" }}
          >
            Há mais de 14 anos defendendo os direitos dos nossos clientes com
            excelência, dedicação e resultados comprovados. Mais de 15.000 casos
            resolvidos com avaliação máxima no Google.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <AnimatedButton
              href={WHATSAPP_URL}
              target="_blank"
              variant="primary"
              icon={<MessageCircle size={16} />}
            >
              Fale no WhatsApp
            </AnimatedButton>
            <AnimatedButton href="#areas" variant="outline">
              Áreas de Atuação
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-8 md:mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/10 border border-white/10 rounded-lg bg-white/[0.03] backdrop-blur-sm p-4 md:p-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center md:py-5 gap-1"
              >
                <span
                  className="text-xl md:text-2xl font-bold text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
