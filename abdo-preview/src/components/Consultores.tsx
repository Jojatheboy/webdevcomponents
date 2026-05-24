import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import SectionTag from "./ui/SectionTag";

type Consultor = {
  nome: string;
  creci: string;
  cidade: string;
  funcao: string;
  foto: string;
  whatsapp: string;
};

// Fotos Unsplash em alta resolução (retratos editoriais). Nomes/CRECI fictícios pra preview.
const UNSPLASH_PARAMS = "?w=400&h=400&fit=crop&crop=faces&q=90";
const consultores: Consultor[] = [
  {
    nome: "Mariana Costa",
    creci: "CRECI/SC 23.279",
    cidade: "Itajaí",
    funcao: "Consultora sênior",
    foto: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2${UNSPLASH_PARAMS}`,
    whatsapp: "https://wa.me/554733493811",
  },
  {
    nome: "Pedro Lima",
    creci: "CRECI/SC 18.456",
    cidade: "Balneário Camboriú",
    funcao: "Consultor de imóveis",
    foto: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d${UNSPLASH_PARAMS}`,
    whatsapp: "https://wa.me/554733493811",
  },
  {
    nome: "Camila Tavares",
    creci: "CRECI/SC 21.091",
    cidade: "Navegantes",
    funcao: "Consultora",
    foto: `https://images.unsplash.com/photo-1494790108377-be9c29b29330${UNSPLASH_PARAMS}`,
    whatsapp: "https://wa.me/554733493811",
  },
  {
    nome: "Ricardo Mendes",
    creci: "CRECI/SC 14.728",
    cidade: "Itajaí",
    funcao: "Gerente comercial",
    foto: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e${UNSPLASH_PARAMS}`,
    whatsapp: "https://wa.me/554733493811",
  },
];

export default function Consultores() {
  return (
    <section
      id="consultores"
      className="relative bg-[var(--background)] pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <SectionTag number={5} tone="light" className="mb-4">
                Atendimento
              </SectionTag>
              <h2 className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(36px,5.5vw,56px)] leading-[1.02]">
                Fale com nossos<br />consultores.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[var(--foreground-soft)] text-base md:text-lg max-w-[44ch]">
                CRECI ativo, conhecimento do produto e do mercado de Itajaí,
                Balneário Camboriú e Navegantes.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2">
          {consultores.map((c, i) => (
            <Reveal key={c.nome} delay={i * 0.06}>
              <a
                href={c.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 py-6 border-b border-[var(--border-subtle)] transition-colors"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[var(--surface)] shrink-0">
                  <Image
                    src={c.foto}
                    alt={c.nome}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[var(--border-subtle)] rounded-full pointer-events-none" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)] mb-1.5">
                    {c.funcao}
                  </p>
                  <h3 className="font-[var(--font-display)] text-[var(--foreground)] text-xl lg:text-2xl leading-tight mb-1.5">
                    {c.nome}
                  </h3>
                  <p className="text-[var(--foreground-soft)] text-sm">
                    {c.cidade}
                    <span className="mx-2 text-[var(--foreground-mute)]/40">
                      ·
                    </span>
                    <span className="font-mono text-xs text-[var(--foreground-mute)]">
                      {c.creci}
                    </span>
                  </p>
                </div>

                <span
                  className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border-strong)] text-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-white group-hover:border-[var(--foreground)] transition-colors shrink-0"
                  style={{ transitionDuration: "200ms" }}
                  aria-label={`Falar com ${c.nome} no WhatsApp`}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center text-sm text-[var(--foreground-mute)] mt-10">
            Atendimento de segunda a sexta · 08h às 18h
          </p>
        </Reveal>
      </div>
    </section>
  );
}
