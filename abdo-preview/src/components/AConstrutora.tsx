import Image from "next/image";
import { Reveal } from "./Reveal";
import BlurText from "./ui/BlurText";
import SectionTag from "./ui/SectionTag";
import CountUp from "./ui/CountUp";
import MetallicText from "./ui/MetallicText";
import {
  TimelineMock,
  SkylineMock,
  WindowsGridMock,
  RulerMock,
} from "./ui/StatMocks";

type Stat = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  label: string;
  Mock: () => React.ReactElement;
};

const stats: Stat[] = [
  { to: 28, suffix: "+", duration: 1.6, label: "anos de mercado", Mock: TimelineMock },
  { to: 8, duration: 1.2, label: "empreendimentos entregues", Mock: SkylineMock },
  { to: 212, duration: 1.9, label: "unidades construídas", Mock: WindowsGridMock },
  { to: 25, suffix: " mil", duration: 1.6, label: "m² de área construída", Mock: RulerMock },
];

export default function AConstrutora() {
  return (
    <section
      id="a-construtora"
      className="relative overflow-hidden bg-[var(--background)] pt-16 sm:pt-24 pb-16 sm:pb-24"
    >
      <div className="relative max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <SectionTag number={1} tone="light" className="mb-4">
              A Construtora
            </SectionTag>
            <BlurText
              as="h2"
              text="28 anos construindo no litoral de SC."
              animateBy="words"
              direction="top"
              delay={90}
              stepDuration={0.4}
              className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(36px,5.5vw,56px)] leading-[1.05] mb-6"
            />
            <p className="text-[var(--foreground-soft)] text-base md:text-lg leading-relaxed mb-4 max-w-[58ch]">
              A ABDO Construções e Incorporações LTDA, com sede em Itajaí (SC),
              atua há mais de 28 anos no segmento da construção civil no
              estado, com edificações verticais multifamiliares.
            </p>
            <p className="text-[var(--foreground-soft)] text-base md:text-lg leading-relaxed max-w-[58ch]">
              Nossa missão é construir e comercializar apartamentos com padrão
              de qualidade e preços competitivos, aprimorando a tecnologia
              aplicada ao processo e proporcionando condições adequadas de
              trabalho à nossa equipe.
            </p>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--foreground-mute)] font-mono">
                CNPJ 95.791.695/0001-83 · Itajaí — Santa Catarina
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="relative aspect-[4/5] lg:aspect-[5/4] rounded-lg overflow-hidden bg-[var(--surface)]">
              <Image
                src="/images/le-havre-interior.jpg"
                alt="Interior do Le Havre Residence — empreendimento ABDO em Itajaí"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-section)]/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-mono uppercase text-[10px] tracking-[0.18em] opacity-80">
                  Le Havre Residence
                </p>
                <p className="font-[var(--font-display)] text-2xl mt-1">
                  Itajaí, SC
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-16 lg:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)] rounded-lg overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="bg-[var(--background)] p-6 lg:p-8 flex flex-col gap-3"
              >
                <MetallicText
                  italic={false}
                  variant="dark"
                  className="font-[var(--font-hero)] text-5xl md:text-6xl leading-none tracking-[-0.02em]"
                >
                  <CountUp
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    duration={s.duration}
                    delay={i * 0.1}
                  />
                </MetallicText>
                <span className="text-[var(--foreground-mute)] text-sm">
                  {s.label}
                </span>
                <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                  <s.Mock />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
