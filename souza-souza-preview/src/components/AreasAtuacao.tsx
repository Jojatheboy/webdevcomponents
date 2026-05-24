"use client";

import { motion } from "framer-motion";
import { Briefcase, Scale, HeartHandshake, ArrowUpRight } from "lucide-react";

const areas = [
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    description:
      "Atuamos na defesa dos direitos dos trabalhadores, incluindo rescisões, horas extras, assédio moral, acidentes de trabalho, reconhecimento de vínculo empregatício e demais questões trabalhistas.",
    image: "/images/areas-trabalhista.jpg",
  },
  {
    icon: Scale,
    title: "Direito Cível",
    description:
      "Prestamos assessoria jurídica completa em questões cíveis, como contratos, indenizações, cobranças, direito do consumidor, responsabilidade civil e ações de família.",
    image: "/images/areas-civel.jpg",
  },
  {
    icon: HeartHandshake,
    title: "Direito Previdenciário",
    description:
      "Auxiliamos nossos clientes na obtenção de aposentadorias, pensões, auxílios e revisões de benefícios junto ao INSS. Contamos com ampla experiência para garantir seus direitos.",
    image: "/images/areas-previdenciario.jpg",
  },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5543999596714&text=Olá! Acessei o site e gostaria de obter mais informações.";

export function AreasAtuacao() {
  return (
    <section id="areas" className="py-12 md:py-16 bg-[var(--surface)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-md px-3 py-1">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
              Especialidades
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
            Áreas de Atuação
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm md:text-base text-white/50 max-w-xl"
            style={{ textWrap: "balance" }}
          >
            Atuação especializada nas principais áreas do Direito para garantir
            a defesa dos seus interesses.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative rounded-lg border border-white/[0.06] hover:border-[var(--accent)]/30 bg-[var(--card)] overflow-hidden transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={area.image} alt={area.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/20 backdrop-blur-sm flex items-center justify-center border border-[var(--accent)]/20">
                    <area.icon size={20} className="text-[var(--accent)]" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 -mt-6 relative flex-1 flex flex-col">
                <h3
                  className="text-lg md:text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-playfair)", textWrap: "balance" }}
                >
                  {area.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
                  {area.description}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] font-medium transition-colors group/link"
                >
                  Consultar
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
