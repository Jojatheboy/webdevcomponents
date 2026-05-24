"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ─── Testimonial type ─── */

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

/* ─── Real testimonials from Google Reviews ─── */

const testimonials: Testimonial[] = [
  {
    text: "Fui indicado ao Dr. Bruno e não poderia ter feito escolha melhor. Atendimento ágil, atencioso e sempre disposto a ajudar. Um excelente advogado criminalista!",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWw3PdZpnCwShrx6hrnurxSoGgM0phh4Zk4kNLkJ8V0u-rdU9Sd=w40-h40-c-rp-mo-br100",
    name: "Maria Mirele",
    role: "Cliente",
  },
  {
    text: "Profissionais brilhantes! Estávamos sem esperança, mas desde a primeira reunião com os Drs. Felipe e Bruno sentimos segurança. O resultado do processo comprovou toda a competência deles.",
    image: "https://lh3.googleusercontent.com/a/ACg8ocJj_piBMnzG4t92Cm-1ilCqOjrzdAuInZYPx10up1cTGFM92g=w40-h40-c-rp-mo-br100",
    name: "Alef Santana",
    role: "Cliente",
  },
  {
    text: "Não há palavras suficientes para agradecer ao Dr. Felipe e ao Dr. Bruno. Eles foram peças-chave em um momento desafiador e, com muito profissionalismo, conseguiram trazer alívio e segurança. Recomendo de olhos fechados.",
    image: "https://lh3.googleusercontent.com/a/ACg8ocIDieSEmIfho9z0ojqZJ90mCrwkuj22EKqFgcOrx-84xch_1Q=w40-h40-c-rp-mo-br100",
    name: "Maria Geovanna",
    role: "Cliente",
  },
  {
    text: "Profissionais sérios, estudiosos e comprometidos. O Dr. Bruno sempre esteve disponível para me atender, respondia minhas dúvidas de forma clara e objetiva. Recomendo fortemente o escritório.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXVf7pdAYKYqyEOin4TChDKhtDCL30JVV5HEAm1sgj0fA3pJgY=w40-h40-c-rp-mo-br100",
    name: "Lucas Mateus",
    role: "Cliente",
  },
  {
    text: "O Dr. Felipe foi impecável na condução da minha defesa. Além da técnica jurídica, demonstrou paciência e clareza ao explicar tudo, algo raro de encontrar. O escritório transmite confiança do início ao fim.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjX13j5AYIlAy3pCiOCeLGBq_8ROfLFKrcVrmxrxeA08GAxtuyBj=w40-h40-c-rp-mo-br100",
    name: "Kamilly Viviane",
    role: "Cliente",
  },
  {
    text: "O trabalho do escritório superou minhas expectativas. Dr. Bruno foi extremamente cuidadoso com os detalhes do meu caso, explicou cada estratégia e demonstrou profundo conhecimento na área criminal.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVAN62vBSV0VTcOApV0fCca0jdNQDOw1VuNFEF1tGbf_nbznpji1Q=w40-h40-c-rp-mo-ba3-br100",
    name: "Kleyton Santos",
    role: "Cliente",
  },
  {
    text: "Encontrei no escritório não apenas excelentes advogados criminalistas, mas também pessoas humanas, que realmente se importaram com o meu caso. Sou muito grato pelo profissionalismo e pela dedicação.",
    image: "https://lh3.googleusercontent.com/a/ACg8ocKJhkDxJaU39cpomYmiyEw9ZgzymhUJrXEXvQeCf0ldCWv6Eg=w40-h40-c-rp-mo-br100",
    name: "Raul Albuquerque",
    role: "Cliente",
  },
  {
    text: "Venho expressar meu mais sincero reconhecimento pelo escritório Folchini & Risso. A qualidade dos serviços prestados, o profissionalismo da equipe e o comprometimento com os clientes comprovam a excelência deste escritório.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVgz1imNM1jpxt9n_BLs4WRqXupeKhRdrQpYQwiXsv2O4hcJZ2cHQ=w40-h40-c-rp-mo-br100",
    name: "Francy Lopes",
    role: "Cliente",
  },
  {
    text: "O nosso escritório Folchini & Risso é referência em advocacia criminal. Atendimento humanizado e resultados que comprovam a dedicação de toda a equipe.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWDa5QntIXE4jnV0k82RG_A0Aorsz_UJVDlAn6ejRfPXAnZkqKp=w40-h40-c-rp-mo-br100",
    name: "Jonas José dos Santos",
    role: "Cliente",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

/* ─── Scrolling column ─── */

function TestimonialsColumn({
  testimonials,
  className,
  duration = 10,
}: {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map((t, i) => (
              <div
                className="p-6 rounded-lg border border-white/[0.06] bg-[var(--card)] max-w-xs w-full"
                key={i}
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-3.5 h-3.5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <p
                  className="text-sm text-white/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  &quot;{t.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
                  <Image
                    width={36}
                    height={36}
                    src={t.image}
                    alt={t.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div
                      className="text-sm font-medium text-white/70 leading-snug"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-xs text-white/30 leading-snug"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ─── */

export default function Depoimentos() {
  return (
    <section className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-[var(--surface)]" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--accent)]/30 bg-[var(--accent)]/10 rounded-md mb-4">
            <div className="w-1.5 h-1.5 bg-[var(--accent-light)] rounded-full" />
            <span
              className="text-[11px] tracking-[0.15em] text-[var(--accent-light)] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Depoimentos
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-balance"
            style={{ fontFamily: "var(--font-playfair)" }}
          >

            <span className="text-white">Quem Nos Contratou, Recomenda</span>
          </h2>
          <p
            className="text-center mt-4 text-white/40 text-sm md:text-base"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            116 avaliações positivas no Google comprovam nosso compromisso.
          </p>
        </motion.div>

        {/* Columns */}
        <div className="flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[500px] sm:max-h-[600px] md:max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
