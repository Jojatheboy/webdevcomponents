"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const socios = [
  {
    name: "Dr. Felipe Folchini",
    role: "Sócio-Fundador | Advogado Criminalista",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/FELIPE.webp",
    bio: "Advogado criminalista com atuação exclusiva na defesa penal em processos Estaduais e Federais. Possui Pós-Graduação em Direito Penal, Processo Penal e Ciências Criminais, além de Especialização em Direito Penal Econômico.",
    specialties: [
      "Crimes Empresariais",
      "Lavagem de Capitais",
      "Tribunais Superiores (STJ/STF)",
      "Habeas Corpus",
    ],
  },
  {
    name: "Dr. Bruno Risso",
    role: "Sócio Sênior | Advogado Criminalista",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/BRUNO.webp",
    bio: "Advogado criminalista com atuação estratégica em casos de elevado impacto jurídico e emocional. Formação em Direito e Administração de Empresas, com visão multidisciplinar à prática penal.",
    specialties: [
      "Tribunal do Júri",
      "Crimes Contra a Vida",
      "Direito Penal Militar",
      "Lei de Drogas",
    ],
  },
];

export default function Equipe() {
  return (
    <section id="equipe" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-[var(--surface)]" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
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
              Equipe
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-balance"
            style={{ fontFamily: "var(--font-playfair)" }}
          >

            <span className="text-white">Sócios com Experiência Comprovada</span>
          </motion.h2>
        </div>

        {/* Sócios - cards iguais */}
        <div className="grid md:grid-cols-2 gap-6">
          {socios.map((socio, i) => (
            <motion.div
              key={socio.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[var(--card)] border border-white/5 overflow-hidden group"
            >
              {/* Photo - fixed height, same for both */}
              <div className="relative w-full h-60 sm:h-72 md:h-80 overflow-hidden">
                <Image
                  src={socio.image}
                  alt={socio.name}
                  width={504}
                  height={554}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {socio.name}
                </h3>
                <p
                  className="text-sm text-[var(--accent)] mb-4 tracking-wide"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {socio.role}
                </p>
                <p
                  className="text-sm text-white/40 leading-relaxed mb-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {socio.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {socio.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 text-[11px] bg-white/5 text-white/50 tracking-wide border border-white/[0.06] rounded-md"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sobre o Escritório - card com imagem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-lg border border-white/[0.06] bg-[var(--card)] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-auto overflow-hidden">
              <Image
                src="https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/ESTRUTURA.webp"
                alt="Escritório Folchini & Risso"
                width={504}
                height={554}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--card)]/60" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--accent)]/30 bg-[var(--accent)]/10 rounded-md mb-4">
                <div className="w-1.5 h-1.5 bg-[var(--accent-light)] rounded-full" />
                <span
                  className="text-[11px] tracking-[0.15em] text-[var(--accent-light)] uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Escritório
                </span>
              </div>
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <span className="text-white">Sobre a Folchini & Risso</span>
              </h3>
              <p
                className="text-sm text-white/45 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Com anos de atuação exclusiva na área criminal, o escritório
                reúne experiência prática, inteligência jurídica e soluções
                construídas sob medida, com foco absoluto na proteção de
                direitos e condução estratégica de cada caso.
              </p>
              <p
                className="text-sm text-white/45 leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Conduzido pelos sócios Felipe Folchini e Bruno Risso, o
                escritório esteve à frente de investigações sensíveis, processos
                criminais complexos e casos de alta repercussão em todas as
                unidades da federação.
              </p>
              <div
                className="flex flex-wrap gap-4 text-xs text-white/30"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Balneário Camboriú/SC
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Chapecó/SC
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  São Paulo/SP
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Brasília/DF
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
