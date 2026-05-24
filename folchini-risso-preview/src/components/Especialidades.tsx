"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Search,
  Landmark,
  FileText,
  Shield,
  FileLock2,
  Briefcase,
} from "lucide-react";

/* ─── Feature Card with grid pattern ─── */

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<"div"> & { feature: FeatureType }) {
  const p = genRandomPattern();

  return (
    <div
      className={cn("relative overflow-hidden p-4 sm:p-6 group", className)}
      {...props}
    >
      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-[var(--accent)]/[0.01] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-[var(--accent)]/5 stroke-[var(--accent)]/25 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </div>

      <feature.icon
        className="size-6 text-white/50 group-hover:text-[var(--accent-light)] transition-colors duration-300"
        strokeWidth={1.5}
        aria-hidden
      />
      <h3
        className="mt-10 text-sm md:text-base font-semibold text-white/80 group-hover:text-white transition-colors duration-300"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {feature.title}
      </h3>
      <p
        className="relative z-20 mt-2 text-xs font-light text-white/35 leading-relaxed"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {feature.description}
      </p>
    </div>
  );
}

/* ─── Animated container ─── */

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */

const services: FeatureType[] = [
  {
    title: "Acompanhamento em Delegacia e Custódia",
    icon: Building2,
    description:
      "Assistência imediata em situações de flagrante e prisões. Atuamos desde o primeiro momento, garantindo seus direitos e buscando liberdade provisória.",
  },
  {
    title: "Investigação Criminal",
    icon: Search,
    description:
      "Defesa estratégica ainda na fase de investigação policial e inquérito. Protegemos seus direitos desde o início, evitando o oferecimento de denúncia.",
  },
  {
    title: "Tribunais Superiores",
    icon: Landmark,
    description:
      "Experiência comprovada em recursos no STJ e STF. Revertemos decisões desfavoráveis com análise técnica aprofundada.",
  },
  {
    title: "Processos Criminais",
    icon: FileText,
    description:
      "Atuação completa em todas as fases processuais. Teses defensivas robustas utilizando todos os recursos legais para absolvição ou redução de pena.",
  },
  {
    title: "Habeas Corpus",
    icon: Shield,
    description:
      "Expertise em Habeas Corpus preventivos e liberatórios. Agilidade para revogar prisões injustas e garantir o direito de ir e vir.",
  },
  {
    title: "Revisão Criminal",
    icon: FileLock2,
    description:
      "Análise de processos finalizados em busca de novas provas ou nulidades que permitam reverter condenações injustas.",
  },
  {
    title: "Assessoria Criminal Empresarial",
    icon: Briefcase,
    description:
      "Compliance penal, investigações corporativas e defesa em crimes empresariais. Proteção de patrimônio e reputação.",
  },
];

/* ─── Section ─── */

export default function Especialidades() {
  return (
    <section id="especialidades" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-[var(--surface)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] space-y-8 px-4 md:px-6">
        {/* Header */}
        <AnimatedContainer className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--accent)]/30 bg-[var(--accent)]/10 rounded-md mb-4">
            <div className="w-1.5 h-1.5 bg-[var(--accent-light)] rounded-full" />
            <span
              className="text-[11px] tracking-[0.15em] text-[var(--accent-light)] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Especialidades
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl text-balance"
            style={{ fontFamily: "var(--font-playfair)" }}
          >

            <span className="text-white">Áreas de Atuação</span>
          </h2>
          <p
            className="mt-4 text-sm tracking-wide text-white/40 md:text-base"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Com sede em Balneário Camboriú/SC, atuação reconhecida em todo o
            Brasil — especialmente Santa Catarina, Paraná e Brasília/DF.
          </p>
        </AnimatedContainer>

        {/* Grid */}
        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/[0.06] border border-dashed border-white/[0.06] sm:grid-cols-2 md:grid-cols-3"
        >
          {services.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
          {/* Empty cells to complete 3-col grid (7 items → need 2 fillers) */}
          <div className="hidden md:block" />
        </AnimatedContainer>
      </div>
    </section>
  );
}
