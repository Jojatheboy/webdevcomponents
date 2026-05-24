import Image from "next/image";
import { Reveal } from "./Reveal";
import BlurText from "./ui/BlurText";
import SectionTag from "./ui/SectionTag";
import CountUp from "./ui/CountUp";
import MetallicText from "./ui/MetallicText";
import {
  IconBuildingCommunity,
  IconHome,
  IconRipple,
  IconBuildingChurch,
  IconHeartHandshake,
  IconRoad,
} from "@tabler/icons-react";

const areas = [
  { Icon: IconHome, nome: "Habitação", descricao: "Empreendimentos residenciais" },
  { Icon: IconBuildingCommunity, nome: "Edificações", descricao: "Obras corporativas e institucionais" },
  { Icon: IconBuildingChurch, nome: "Restauração", descricao: "Restauro de patrimônio histórico" },
  { Icon: IconRoad, nome: "Urbanização", descricao: "Mobilidade e infraestrutura urbana" },
  { Icon: IconRipple, nome: "Saneamento", descricao: "Obras de saneamento básico" },
  { Icon: IconHeartHandshake, nome: "Educação & Saúde", descricao: "Construções públicas essenciais" },
];

export default function AConstrutora() {
  return (
    <section
      id="a-construtora"
      className="relative bg-[var(--background)] pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div className="relative max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <SectionTag number={1} tone="light" className="mb-4">
              A Construtora
            </SectionTag>
            <BlurText
              as="h2"
              text="39 anos construindo solidez em Americana."
              animateBy="words"
              direction="top"
              delay={80}
              stepDuration={0.4}
              className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(36px,5.5vw,56px)] leading-[1.05] mb-6"
            />
            <p className="text-[var(--foreground-soft)] text-base md:text-lg leading-relaxed mb-4 max-w-[58ch]">
              A Construtora Itajaí integra o <MetallicText italic={false} variant="dark" className="font-medium">Grupo Itajaí</MetallicText> e atua desde 1986 em empreendimentos imobiliários, edificações, restauros, urbanização, saneamento e mobilidade.
            </p>
            <p className="text-[var(--foreground-soft)] text-base md:text-lg leading-relaxed max-w-[58ch]">
              Trabalho, gestão e qualidade. Resultados sustentáveis em toda a cadeia, conquistando a confiança de clientes e parceiros há quase 4 décadas.
            </p>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--foreground-mute)] font-mono">
                Grupo Itajaí · Construção Civil e Agropecuária · Americana — SP
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="relative aspect-[4/5] lg:aspect-[5/4] rounded-lg overflow-hidden bg-[var(--surface)]">
              <Image
                src="/images/scraped/010-IMA-COND_JANAINA-FACHADA-R01-2880w.jpg"
                alt="Empreendimento da Construtora Itajaí"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-section)]/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-mono uppercase text-[10px] tracking-[0.18em] opacity-80">
                  Residencial Janaína
                </p>
                <p className="font-[var(--font-display)] text-2xl mt-1">
                  Americana, SP
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-16 lg:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] rounded-lg overflow-hidden">
            {areas.map((a) => (
              <div key={a.nome} className="bg-[var(--background)] p-6 lg:p-8 flex flex-col gap-3">
                <span className="w-10 h-10 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <a.Icon className="size-5" />
                </span>
                <h3 className="font-[var(--font-display)] text-[var(--foreground)] text-2xl leading-tight">
                  {a.nome}
                </h3>
                <p className="text-[var(--foreground-mute)] text-sm">{a.descricao}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mt-12 lg:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pt-10 border-t border-[var(--border-subtle)]">
            {[
              { to: 39, suffix: "+", label: "anos de mercado" },
              { to: 6, suffix: "", label: "áreas de atuação" },
              { to: 5, suffix: "", label: "residenciais entregues" },
              { to: 1, prefix: "Grupo ", suffix: " Itajaí", label: "construção + agro" },
            ].map((s, i) => (
              <div key={s.label}>
                <MetallicText
                  italic={false}
                  variant="dark"
                  className="font-[var(--font-hero)] text-4xl md:text-5xl leading-none tracking-[-0.02em]"
                >
                  {typeof s.to === "number" && s.label !== "construção + agro" ? (
                    <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} duration={1.6} delay={i * 0.1} />
                  ) : (
                    `${s.prefix ?? ""}${s.to}${s.suffix ?? ""}`
                  )}
                </MetallicText>
                <p className="text-[var(--foreground-mute)] text-sm mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
