"use client";

import {
  Home,
  Users,
  Heart,
  FileText,
  Scale,
  Phone,
  Lock,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "./Reveal";

const areas = [
  {
    title: "Direito Trabalhista",
    text: "Foi demitido e não recebeu tudo o que era seu? Recupero verbas rescisórias, horas extras, indenização por assédio e o que a empresa deixou de pagar.",
  },
  {
    title: "Direito da Mulher",
    text: "Divórcio, pensão, guarda dos filhos e medida protetiva. Conduzo cada caso com acolhimento, sigilo e firmeza, para você seguir em frente protegida.",
  },
  {
    title: "Aposentadoria",
    text: "Aposentadoria por tempo, idade ou invalidez, e revisão de benefício negado pelo INSS. Cuido da papelada e da estratégia para você receber o que é seu.",
  },
  {
    title: "Direito Cível",
    text: "Contratos, indenizações, cobranças e direito do consumidor. Resolvo os conflitos do dia a dia com agilidade e numa linguagem que você entende.",
  },
];

/* ── Mini UI mockups por card ── */

function MockTrabalhista() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[260px]">
      {[
        { icon: "⚠", label: "Demissão sem justa causa", color: "#c0392b" },
        { icon: "↓", label: "", color: "var(--c-warm-accent)" },
        { icon: "📋", label: "Análise dos direitos", color: "#6b6b6b" },
        { icon: "↓", label: "", color: "var(--c-warm-accent)" },
        { icon: "✓", label: "Indenização garantida", color: "#27ae60" },
      ].map((item, i) =>
        item.label ? (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-md px-3 py-2"
            style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ fontSize: 12, color: "#252116", fontWeight: 500 }}>{item.label}</span>
          </div>
        ) : (
          <span key={i} className="pl-4" style={{ fontSize: 12, color: "var(--c-warm-accent)", lineHeight: 1 }}>↓</span>
        )
      )}
    </div>
  );
}

function MockMulher() {
  /* Card em camadas + grade de ícones com escudo central — "rede de proteção" */
  const items = [Home, Users, Heart, FileText, Scale, Phone, Lock, MessageCircle];
  return (
    <div className="relative w-full" style={{ maxWidth: 256 }}>
      {/* Card de fundo — dá profundidade */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "rgba(255,255,255,0.65)",
          border: "1px solid var(--marketing-border)",
          borderRadius: 14,
          transform: "rotate(-6deg) translate(11px, 8px)",
        }}
      />

      {/* Card da frente */}
      <div
        className="relative"
        style={{
          background: "#ffffff",
          border: "1px solid var(--marketing-border)",
          borderRadius: 14,
          padding: 13,
          boxShadow: "0 10px 26px -14px rgba(37,33,22,0.25)",
        }}
      >
        {/* Grade 3x3 — 8 áreas da vida + escudo no centro */}
        <div className="grid grid-cols-3" style={{ gap: 6 }}>
          {Array.from({ length: 9 }).map((_, pos) => {
            if (pos === 4) {
              return (
                <div
                  key="escudo"
                  className="flex items-center justify-center"
                  style={{
                    aspectRatio: "1",
                    borderRadius: 11,
                    background: "var(--c-warm-accent)",
                    boxShadow: "0 4px 12px -2px rgba(139,34,82,0.45)",
                  }}
                >
                  <ShieldCheck size={22} strokeWidth={1.7} color="#ffffff" />
                </div>
              );
            }
            const Icon = items[pos < 4 ? pos : pos - 1];
            return (
              <div
                key={pos}
                className="flex items-center justify-center"
                style={{
                  aspectRatio: "1",
                  borderRadius: 11,
                  background: "rgba(139,34,82,0.05)",
                  border: "1px solid rgba(139,34,82,0.10)",
                }}
              >
                <Icon size={17} strokeWidth={1.6} color="var(--c-warm-accent)" />
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className="inline-block rounded-full"
            style={{ width: 5, height: 5, background: "var(--c-warm-accent)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              letterSpacing: "0.2px",
              color: "var(--marketing-copy-soft)",
            }}
          >
            Tudo o que importa, sob proteção
          </span>
        </div>
      </div>
    </div>
  );
}

function MockAposentadoria() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[260px]">
      <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <span style={{ fontSize: 10, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tempo de contribuição</span>
        <div className="flex items-end gap-1 mt-1">
          <span style={{ fontSize: 22, fontWeight: 600, color: "#252116", lineHeight: 1 }}>28</span>
          <span style={{ fontSize: 11, color: "#6b6b6b", paddingBottom: 2 }}>/ 35 anos</span>
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
          <div className="h-full rounded-full" style={{ width: "80%", background: "var(--c-warm-accent)" }} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 rounded-md px-2.5 py-2" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: 9, color: "#6b6b6b", textTransform: "uppercase" }}>Benefício</span>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#252116", marginTop: 2 }}>R$ 3.200</p>
        </div>
        <div className="flex-1 rounded-md px-2.5 py-2" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: 9, color: "#6b6b6b", textTransform: "uppercase" }}>Status</span>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#27ae60", marginTop: 4 }}>Aprovado</p>
        </div>
      </div>
    </div>
  );
}

function MockCivel() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[260px]">
      <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 12, fontWeight: 600, color: "#252116" }}>Contrato #1247</span>
          <span className="rounded-full px-2 py-0.5" style={{ fontSize: 9, background: "rgba(39,174,96,0.1)", color: "#27ae60", fontWeight: 600 }}>Aprovado</span>
        </div>
        <div className="mt-2 flex gap-4">
          <span style={{ fontSize: 10, color: "#6b6b6b" }}>Indenização</span>
          <span style={{ fontSize: 10, color: "#6b6b6b" }}>R$ 15.000</span>
        </div>
      </div>
      <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 12, fontWeight: 600, color: "#252116" }}>Contrato #1302</span>
          <span className="rounded-full px-2 py-0.5" style={{ fontSize: 9, background: "rgba(243,156,18,0.1)", color: "#e67e22", fontWeight: 600 }}>Em análise</span>
        </div>
        <div className="mt-2 flex gap-4">
          <span style={{ fontSize: 10, color: "#6b6b6b" }}>Consumidor</span>
          <span style={{ fontSize: 10, color: "#6b6b6b" }}>R$ 8.500</span>
        </div>
      </div>
      <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 12, fontWeight: 600, color: "#252116" }}>Contrato #1289</span>
          <span className="rounded-full px-2 py-0.5" style={{ fontSize: 9, background: "rgba(39,174,96,0.1)", color: "#27ae60", fontWeight: 600 }}>Aprovado</span>
        </div>
      </div>
    </div>
  );
}

const mockups = [MockTrabalhista, MockMulher, MockAposentadoria, MockCivel];

export function Areas() {
  return (
    <section id="areas" className="pt-16 sm:pt-24">
      <Reveal style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}>
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
          Áreas de atuação
        </p>
        <h2
          style={{
            fontFamily: "var(--font-instrument)",
            fontSize: "clamp(48px, 8vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-3px",
            color: "var(--marketing-heading)",
            paddingBottom: 56,
          }}
        >
          Como posso te ajudar
        </h2>
      </Reveal>

      {/* Separator line */}
      <div style={{ borderBottom: "1px solid var(--marketing-border)" }} />

      {/* 2-col grid */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}>
        <Reveal
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ borderLeft: "1px solid var(--marketing-border)", borderRight: "1px solid var(--marketing-border)" }}
        >
          {areas.map((area, i) => {
            const Mockup = mockups[i];
            return (
              <div
                key={area.title}
                className="relative flex flex-col pb-14"
                style={{
                  borderTop: "1px solid var(--marketing-border)",
                  borderRight: (i + 1) % 2 !== 0 ? "1px solid var(--marketing-border)" : "none",
                }}
              >
                {/* Number label */}
                <div
                  className="px-4 py-2"
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "var(--c-warm-accent)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Mockup area */}
                <div
                  className="flex h-[250px] items-center justify-center overflow-hidden p-6"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(0,0,0,0.10) 0.75px, transparent 0.75px), radial-gradient(circle, rgba(0,0,0,0.10) 0.75px, transparent 0.75px)",
                    backgroundSize: "5px 5px",
                    backgroundPosition: "0 0, 2.5px 2.5px",
                  }}
                >
                  <Mockup />
                </div>

                {/* Title */}
                <h3
                  className="mt-3 px-6"
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontSize: 22,
                    color: "var(--marketing-heading)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {area.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-2 px-6"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--marketing-copy-soft)",
                    maxWidth: 480,
                  }}
                >
                  {area.text}
                </p>
              </div>
            );
          })}
        </Reveal>
      </div>

      {/* Bottom separator */}
      <div style={{ borderBottom: "1px solid var(--marketing-border)" }} />
    </section>
  );
}
