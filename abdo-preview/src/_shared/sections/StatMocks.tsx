/**
 * Mini-mocks SVG pros 4 stats da seção A Construtora.
 * Estética blueprint: linhas finas, azul ABDO, animações sutis CSS-only.
 * Cada mock é ~100x36, encaixado no rodapé do card de stat.
 */

const ACCENT = "var(--accent)";
const DIM = "rgba(31,58,138,0.18)";

/** Timeline com 4 marcos: 1997 · 2005 · 2015 · 2026 */
export function TimelineMock() {
  return (
    <svg
      viewBox="0 0 120 40"
      className="w-full h-9"
      role="img"
      aria-label="Linha do tempo de 28 anos"
    >
      <style>{`
        .tl-line { stroke-dasharray: 100; stroke-dashoffset: 100; animation: tl-draw 1.8s 0.2s forwards cubic-bezier(.16,1,.3,1); }
        @keyframes tl-draw { to { stroke-dashoffset: 0; } }
        .tl-dot { opacity: 0; transform-origin: center; animation: tl-pop .5s forwards cubic-bezier(.34,1.4,.64,1); }
        .tl-dot:nth-child(2) { animation-delay: .4s; }
        .tl-dot:nth-child(3) { animation-delay: .8s; }
        .tl-dot:nth-child(4) { animation-delay: 1.2s; }
        .tl-dot:nth-child(5) { animation-delay: 1.6s; }
        @keyframes tl-pop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <line
        x1="6"
        y1="20"
        x2="114"
        y2="20"
        stroke={ACCENT}
        strokeWidth="1"
        className="tl-line"
      />
      <g>
        <circle className="tl-dot" cx="6" cy="20" r="2" fill={DIM} />
        <circle className="tl-dot" cx="42" cy="20" r="2.5" fill={DIM} />
        <circle className="tl-dot" cx="78" cy="20" r="3" fill={ACCENT} />
        <circle className="tl-dot" cx="114" cy="20" r="4" fill={ACCENT} />
      </g>
      <g
        fontFamily="var(--font-mono), monospace"
        fontSize="6"
        fill="rgba(31,58,138,0.45)"
        textAnchor="middle"
      >
        <text x="6" y="34" className="tl-dot">
          1997
        </text>
        <text x="114" y="34" className="tl-dot">
          2026
        </text>
      </g>
    </svg>
  );
}

/** Skyline com 8 prédios (alturas variadas) — 1 destacado em accent (Le Havre) */
export function SkylineMock() {
  const buildings = [
    { x: 8, h: 14 },
    { x: 22, h: 22 },
    { x: 36, h: 18 },
    { x: 50, h: 28 },
    { x: 64, h: 24, highlight: true }, // destaque
    { x: 78, h: 20 },
    { x: 92, h: 26 },
    { x: 106, h: 16 },
  ];
  return (
    <svg
      viewBox="0 0 120 40"
      className="w-full h-9"
      role="img"
      aria-label="Skyline com 8 prédios entregues"
    >
      <style>{`
        .sk-bld { transform-origin: bottom center; transform: scaleY(0); animation: sk-rise .55s forwards cubic-bezier(.16,1,.3,1); }
        ${buildings
          .map(
            (_, i) =>
              `.sk-bld:nth-child(${i + 1}) { animation-delay: ${
                0.15 + i * 0.08
              }s; }`
          )
          .join("\n")}
        @keyframes sk-rise { to { transform: scaleY(1); } }
        .sk-base { transform-origin: left; transform: scaleX(0); animation: sk-base 1s 0.1s forwards cubic-bezier(.16,1,.3,1); }
        @keyframes sk-base { to { transform: scaleX(1); } }
      `}</style>
      <line
        x1="4"
        y1="36"
        x2="116"
        y2="36"
        stroke={ACCENT}
        strokeWidth="1"
        className="sk-base"
      />
      {buildings.map((b, i) => (
        <g key={i} className="sk-bld">
          <rect
            x={b.x - 4}
            y={36 - b.h}
            width="8"
            height={b.h}
            fill={b.highlight ? ACCENT : DIM}
          />
          {/* "janela" iluminada no topo do prédio destacado */}
          {b.highlight && (
            <rect
              x={b.x - 1.5}
              y={36 - b.h + 3}
              width="3"
              height="2"
              fill="white"
              opacity="0.85"
            />
          )}
        </g>
      ))}
    </svg>
  );
}

/** Grid de janelas (212 quadrados, alguns acesos) */
export function WindowsGridMock() {
  const cols = 28;
  const rows = 8;
  const total = cols * rows;
  // 212 acesos de 224, padrão pseudo-aleatório estável (mesmos índices sempre)
  const litCount = 212;
  const lit = new Set<number>();
  // gerar índices "apagados" (12 deles) — espalha visualmente
  const unlitIndices = [3, 27, 54, 71, 99, 113, 138, 152, 177, 196, 211, 223];
  for (let i = 0; i < total; i++) {
    if (!unlitIndices.includes(i)) lit.add(i);
  }

  return (
    <svg
      viewBox="0 0 120 40"
      className="w-full h-9"
      role="img"
      aria-label="212 unidades — grid de janelas"
    >
      <style>{`
        .win-cell { opacity: 0; animation: win-on .6s forwards cubic-bezier(.16,1,.3,1); }
        @keyframes win-on { to { opacity: 1; } }
      `}</style>
      <g>
        {Array.from({ length: total }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const x = 4 + c * 4;
          const y = 4 + r * 4;
          const isLit = lit.has(i);
          // delay em onda diagonal
          const delay = (c + r) * 0.025;
          return (
            <rect
              key={i}
              className="win-cell"
              x={x}
              y={y}
              width="3"
              height="3"
              rx="0.4"
              fill={isLit ? ACCENT : DIM}
              opacity={isLit ? 1 : 0.4}
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Régua medidora — barra preenchendo com ticks */
export function RulerMock() {
  return (
    <svg
      viewBox="0 0 120 40"
      className="w-full h-9"
      role="img"
      aria-label="25 mil metros quadrados construídos"
    >
      <style>{`
        .ru-bar-bg { stroke-dasharray: 100; stroke-dashoffset: 100; animation: ru-draw 1.4s .1s forwards cubic-bezier(.16,1,.3,1); }
        .ru-bar-fill { transform-origin: left; transform: scaleX(0); animation: ru-fill 1.6s .5s forwards cubic-bezier(.16,1,.3,1); }
        @keyframes ru-draw { to { stroke-dashoffset: 0; } }
        @keyframes ru-fill { to { transform: scaleX(0.86); } }
        .ru-tick { opacity: 0; animation: ru-on .4s forwards; }
        ${[0, 1, 2, 3, 4, 5]
          .map((i) => `.ru-tick:nth-child(${i + 2}) { animation-delay: ${0.7 + i * 0.08}s; }`)
          .join("\n")}
        @keyframes ru-on { to { opacity: 1; } }
      `}</style>
      <line
        x1="6"
        y1="24"
        x2="114"
        y2="24"
        stroke={DIM}
        strokeWidth="2"
        strokeLinecap="round"
        className="ru-bar-bg"
      />
      <line
        x1="6"
        y1="24"
        x2="114"
        y2="24"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        className="ru-bar-fill"
      />
      <g>
        {[6, 27, 48, 69, 90, 111].map((x) => (
          <line
            key={x}
            x1={x}
            y1="18"
            x2={x}
            y2="20"
            stroke={ACCENT}
            strokeWidth="1"
            className="ru-tick"
          />
        ))}
      </g>
      <g
        fontFamily="var(--font-mono), monospace"
        fontSize="6"
        fill="rgba(31,58,138,0.45)"
      >
        <text x="6" y="36" textAnchor="start">
          0
        </text>
        <text x="114" y="36" textAnchor="end">
          25k m²
        </text>
      </g>
    </svg>
  );
}
