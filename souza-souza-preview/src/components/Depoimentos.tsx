"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Edna Maiara Pereira",
    text: "Excelente escritório! Profissionais muito competentes e atenciosos. Resolveram meu caso com agilidade e dedicação. Recomendo de olhos fechados!",
  },
  {
    name: "Luara",
    text: "Atendimento maravilhoso! Desde o primeiro contato até a resolução do meu processo, fui muito bem orientada. Equipe nota 10!",
  },
  {
    name: "Lélia Oliveira",
    text: "Muito satisfeita com o atendimento e resultado do meu processo trabalhista. Advogados comprometidos e sempre disponíveis para tirar dúvidas.",
  },
  {
    name: "Pamela Fernanda",
    text: "Profissionais incríveis! Me ajudaram em um momento muito difícil e conseguiram um resultado além das minhas expectativas. Sou muito grata!",
  },
  {
    name: "Leandro Amaro",
    text: "Escritório de extrema confiança. Acompanharam meu caso do início ao fim com muita transparência e profissionalismo. Super indico!",
  },
  {
    name: "Tatyane Vieira",
    text: "Equipe maravilhosa! Muito atenciosos e competentes. Resolveram minha questão previdenciária rapidamente. Recomendo para todos!",
  },
  {
    name: "Sidnei De Melo",
    text: "Fui muito bem atendido pelo escritório Souza & Souza. Advogados sérios e comprometidos com a causa do cliente. Resultado excelente!",
  },
  {
    name: "Bruna Querino",
    text: "Excelente trabalho! Ganhei minha causa trabalhista graças à dedicação e competência dos advogados. Atendimento humanizado e de qualidade.",
  },
  {
    name: "Gamer Thiago",
    text: "Muito bom o atendimento! Sempre me mantiveram informado sobre o andamento do processo. Profissionais dedicados e competentes.",
  },
  {
    name: "Calyupe Pacífico",
    text: "Recomendo demais! Escritório sério, com profissionais qualificados e que realmente se importam com o cliente. Resultado surpreendente!",
  },
  {
    name: "Halysson Rodrigues",
    text: "Ótimo escritório de advocacia! Me atenderam prontamente e resolveram meu caso com eficiência. Nota máxima pelo profissionalismo!",
  },
  {
    name: "Lucimar Ferreira",
    text: "Agradeço imensamente ao escritório Souza & Souza. Profissionais extremamente competentes que lutaram pelo meu direito até o final. Recomendo!",
  },
];

const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 8);
const col3 = testimonials.slice(8, 12);

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-[var(--card)] border border-white/[0.06] rounded-lg p-5 hover:border-[var(--accent)]/30 transition-colors duration-300">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="fill-yellow-500 text-yellow-500"
          />
        ))}
      </div>
      <p className="text-sm text-white/60 leading-relaxed mb-4">{text}</p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
          <span className="text-xs font-semibold text-[var(--accent)]">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-white/80">{name}</p>
          <p className="text-[11px] text-white/30">Google Reviews</p>
        </div>
      </div>
    </div>
  );
}

function ScrollColumn({
  items,
  direction = "up",
  duration = 25,
}: {
  items: typeof testimonials;
  direction?: "up" | "down";
  duration?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Fade edges */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[var(--surface)] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--surface)] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex flex-col gap-4"
        animate={{
          y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} name={t.name} text={t.text} />
        ))}
      </motion.div>
    </div>
  );
}

export function Depoimentos() {
  return (
    <section id="depoimentos" className="py-12 md:py-16 bg-[var(--surface)]">
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
              Depoimentos
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
            O Que Nossos Clientes Dizem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm md:text-base text-white/50 max-w-xl"
            style={{ textWrap: "balance" }}
          >
            991 avaliações com nota máxima no Google. A confiança dos nossos
            clientes e o melhor reconhecimento do nosso trabalho.
          </motion.p>
        </div>

        {/* Scrolling columns */}
        <div className="grid md:grid-cols-3 gap-4">
          <ScrollColumn items={col1} direction="up" duration={28} />
          <ScrollColumn items={col2} direction="down" duration={32} />
          <div className="hidden md:block">
            <ScrollColumn items={col3} direction="up" duration={30} />
          </div>
        </div>
      </div>
    </section>
  );
}
