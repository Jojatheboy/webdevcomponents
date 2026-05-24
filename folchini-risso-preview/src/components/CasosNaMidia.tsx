"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const casos = [
  {
    name: "Operação Draupnir",
    description:
      "PF realizou operação que resultou em prisões em Chapecó, Xanxerê e Faxinal dos Guedes; drogas escondidas em carga de soja e fertilizantes.",
    source: "ND Mais",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/Op-Draupnir.png",
    link: "https://ndmais.com.br/seguranca/segredo-milionario-em-carga-de-soja-revela-esquema-internacional-e-leva-5-a-prisao-em-sc/",
  },
  {
    name: "Operação Voo Baixo",
    description:
      "Empresário do interior de SP comandava transporte de cocaína da Bolívia para o Brasil e Europa. Ação apreendeu 2,6 toneladas de entorpecentes.",
    source: "G1 Globo",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2025-01-18-at-01.42.35-1.webp",
    link: "https://g1.globo.com/sp/sao-jose-do-rio-preto-aracatuba/noticia/2019/12/04/pf-cumpre-mandados-em-operacao-contra-o-trafico-internacional-de-drogas-no-noroeste-paulista.ghtml",
  },
  {
    name: "Operação Narcos",
    description:
      "Mandados em cinco estados. Drogas vinham da Bolívia para revenda no Brasil e exterior usando portos brasileiros.",
    source: "G1 Globo",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2025-01-18-at-01.42.35-2.webp",
    link: "https://g1.globo.com/sc/santa-catarina/noticia/2020/02/13/pf-de-sc-faz-operacao-contra-grupo-suspeito-de-trafico-internacional-de-drogas-e-armas.ghtml",
  },
  {
    name: "Operação Dawnfall",
    description:
      "500 policiais e 25 auditores da Receita Federal participaram da ação realizada simultaneamente em Paranaguá.",
    source: "G1 Globo",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2025-01-18-at-01.42.35-3.webp",
    link: "https://g1.globo.com/pr/parana/noticia/2023/05/04/operacao-em-paranagua-cumpre-mandados-de-prisao-busca-e-apreensao-contra-suspeitos-de-narcotrafico-interestadual-e-internacional.ghtml",
  },
  {
    name: "Operação Hydra",
    description:
      "Rede de tráfico que movimentou R$ 4,3 milhões é alvo de operação no PR e SC.",
    source: "G1 Globo",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/Frame-42.png",
    link: "https://g1.globo.com/pr/oeste-sudoeste/noticia/2025/07/22/operacao-contra-trafico-sp-sc.ghtml",
  },
  {
    name: "Operação Quebra de Ciclo",
    description:
      "Quatro presos em operação contra produção e venda clandestina de anabolizantes para todo o Brasil.",
    source: "G1 Globo",
    image:
      "https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/Quebra-de-Ciclo.png",
    link: "https://g1.globo.com/sc/santa-catarina/noticia/2025/06/11/quatro-presos-operacao-producao-venda-clandestina-anabolizantes-sc-sp.ghtml",
  },
];

export default function CasosNaMidia() {
  return (
    <section id="casos" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-8">
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
              Na Mídia
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-balance"
            style={{ fontFamily: "var(--font-playfair)" }}
          >

            <span className="text-white">Casos de Relevância Nacional</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Nosso escritório atuou em diversos casos que ganharam destaque na
            mídia nacional, demonstrando capacidade técnica para lidar com
            situações de alta complexidade.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {casos.map((caso, i) => (
            <motion.a
              key={caso.name}
              href={caso.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group block rounded-lg border border-white/[0.06] hover:border-[var(--accent)]/20 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <Image
                  src={caso.image}
                  alt={caso.name}
                  width={476}
                  height={346}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-md">
                  <span
                    className="text-[10px] text-white/70 tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {caso.source}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 bg-[var(--card)]">
                <h3
                  className="text-base font-semibold mb-2 text-white/80 group-hover:text-[var(--accent-light)] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {caso.name}
                </h3>
                <p
                  className="text-xs text-white/35 leading-relaxed mb-4 line-clamp-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {caso.description}
                </p>
                <span
                  className="text-xs text-[var(--accent)]/70 tracking-wide group-hover:text-[var(--accent)] transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Ver matéria completa →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
