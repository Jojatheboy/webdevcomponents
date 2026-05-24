"use client";

import { useState } from "react";
import { Phone, MapPin, Send } from "lucide-react";
import { Reveal } from "./Reveal";

export default function Contato() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[var(--dark-section)] text-[var(--dark-section-text)] pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div className="relative max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="font-mono uppercase text-[11px] tracking-[0.18em] text-[var(--accent)] mb-3">
              Contato
            </p>
            <h2 className="font-[var(--font-display)] text-white text-[clamp(36px,5.5vw,56px)] leading-[1.05] mb-8">
              Vamos<br />
              conversar.
            </h2>

            <div className="space-y-6">
              <a
                href="https://wa.me/554733493811"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] transition-colors">
                  <Phone className="size-5 text-white" />
                </div>
                <div>
                  <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/50 mb-1">
                    Telefone · WhatsApp
                  </p>
                  <p className="text-white text-lg">(47) 3349-3811</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="size-5 text-white" />
                </div>
                <div>
                  <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/50 mb-1">
                    Endereço
                  </p>
                  <p className="text-white text-base leading-relaxed">
                    Rua Aririba, 83 · Praia Brava<br />
                    Itajaí — SC · CEP 88360-780
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/50 mb-2">
                Horário de atendimento
              </p>
              <p className="text-white/85 text-sm">
                Segunda a sexta · 08h às 18h
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-white/5 backdrop-blur rounded-lg p-6 md:p-10 border border-white/10"
            >
              <h3 className="font-[var(--font-display)] text-white text-2xl md:text-3xl mb-6">
                Enviar mensagem
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nome completo" name="nome" required />
                <Field label="Telefone" name="telefone" type="tel" required />
                <div className="sm:col-span-2">
                  <Field label="E-mail" name="email" type="email" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/60">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    rows={4}
                    required
                    className="mt-2 w-full bg-transparent border-0 border-b border-white/20 focus:border-[var(--accent)] focus:outline-none text-white py-2 transition-colors resize-none"
                    style={{ transitionDuration: "200ms" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sent}
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[var(--accent)] text-white text-sm hover:bg-[var(--accent-dark)] transition-colors disabled:opacity-60"
                style={{ transitionDuration: "200ms" }}
              >
                {sent ? "Mensagem enviada" : "Enviar mensagem"}
                {!sent && <Send className="size-4" />}
              </button>

              <p className="mt-5 text-xs text-white/45">
                Responderemos em até 1 dia útil. Para urgências, ligue
                diretamente.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/60"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-transparent border-0 border-b border-white/20 focus:border-[var(--accent)] focus:outline-none text-white py-2 transition-colors"
        style={{ transitionDuration: "200ms" }}
      />
    </div>
  );
}
