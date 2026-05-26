"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "./ui/testimonials-columns";

const testimonials: Testimonial[] = [
  {
    text: "A Dra. é muito boa, conseguiu ajustar meu caso quando eu já tinha perdido a esperança.",
    name: "Maria",
    role: "Cliente · Trabalhista",
    initial: "M",
  },
  {
    text: "Doutora nota 10. Atenciosa, explica tudo com paciência e não descansa até resolver.",
    name: "Juliana",
    role: "Cliente · Direito das Famílias",
    initial: "J",
  },
  {
    text: "Fui mandado embora sem receber nada. A Dra. Eliane cuidou do meu caso como se fosse dela.",
    name: "Carlos",
    role: "Cliente · Trabalhista",
    initial: "C",
  },
  {
    text: "Profissional séria e comprometida. Me senti segura do início ao fim do processo.",
    name: "Ana Paula",
    role: "Cliente · Cível",
    initial: "A",
  },
];

const col1 = [testimonials[0], testimonials[1]];
const col2 = [testimonials[2], testimonials[3]];
const col3 = [testimonials[3], testimonials[0]];

export function Depoimentos() {
  return (
    <section id="depoimentos" className="pt-16 sm:pt-24 pb-16 sm:pb-24">
      {/* Top separator */}
      <div style={{ borderBottom: "1px solid var(--marketing-border)" }} />

      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center pt-20 sm:pt-28"
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--c-warm-accent)",
              marginBottom: 16,
            }}
          >
            Depoimentos
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument)",
              fontSize: "clamp(40px, 7vw, 60px)",
              lineHeight: 1,
              letterSpacing: "-2.5px",
              color: "var(--marketing-heading)",
            }}
          >
            Quem confiou, recomenda
          </h2>
          <p
            className="mt-5"
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--marketing-copy-soft)",
              maxWidth: 480,
            }}
          >
            O que os clientes da Dra. Eliane dizem sobre o atendimento e o resultado
            dos seus casos.
          </p>
        </motion.div>

        {/* Colunas animadas */}
        <div
          className="flex justify-center gap-6 mt-14"
          style={{
            maxHeight: 560,
            overflow: "hidden",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={17} />
          <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={19} />
        </div>
      </div>
    </section>
  );
}
