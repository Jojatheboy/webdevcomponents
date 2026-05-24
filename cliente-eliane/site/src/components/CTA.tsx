"use client";

import { motion } from "framer-motion";
import { OrganicBorder } from "./ui/OrganicBorder";

const WHATSAPP = "https://wa.me/5551987678998?text=Olá Dra. Eliane, gostaria de agendar uma consulta.";

export function CTA() {
  return (
    <section
      id="contato"
      style={{ background: "var(--foreground)", color: "var(--background)" }}
    >
      <div className="relative w-full max-w-[1220px] mx-auto px-4 md:px-6 pb-8 pt-16 md:pt-20">
        <OrganicBorder lines={["right", "left"]} color="rgba(0,0,0,0.08)" />

        <p
          className="text-[11px] uppercase tracking-[1px] mb-2"
          style={{ fontFamily: "var(--font-geist-mono)", opacity: 0.5 }}
        >
          Seus direitos não podem esperar
        </p>

        <div className="grid grid-cols-12 items-center gap-5">
          <div className="col-span-12 lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[48px] md:text-[72px] leading-[1] tracking-[-2px] md:tracking-[-3px]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Fale com a Dra. Eliane agora
            </motion.h2>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:flex lg:justify-end">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium no-underline transition-opacity hover:opacity-90"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              Falar no WhatsApp →
            </a>
          </div>
        </div>
      </div>

      {/* Contact grid with organic borders */}
      <div className="relative w-full max-w-[1220px] mx-auto px-4 md:px-6 py-8">
        <OrganicBorder lines={["top", "right", "left"]} color="rgba(0,0,0,0.08)" />

        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[1px] mb-1 opacity-40" style={{ fontFamily: "var(--font-geist-mono)" }}>Endereço</p>
            <p className="text-sm">Rua Afonso, 15, Jardins<br />Cachoeirinha - RS</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[1px] mb-1 opacity-40" style={{ fontFamily: "var(--font-geist-mono)" }}>Horário</p>
            <p className="text-sm">Segunda a sexta<br />9h às 18h</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[1px] mb-1 opacity-40" style={{ fontFamily: "var(--font-geist-mono)" }}>Contato</p>
            <p className="text-sm">
              (51) 98767-8998<br />
              draeliane@liane.com<br />
              <a href="https://www.instagram.com/elianeferreira.adv/" target="_blank" rel="noopener noreferrer" className="no-underline transition-opacity hover:opacity-70" style={{ color: "inherit" }}>@elianeferreira.adv</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
