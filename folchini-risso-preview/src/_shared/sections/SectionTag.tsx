type Tone = "light" | "dark";

interface SectionTagProps {
  /** Número da seção (00-99). Renderiza padded como "01", "02" etc. */
  number?: number;
  /** Texto principal — vira uppercase automaticamente */
  children: React.ReactNode;
  /** Tone: light pra seções claras, dark pra seções escuras */
  tone?: Tone;
  className?: string;
}

/**
 * Tag de seção com hierarquia visual: número padded + separador + label
 * em mono uppercase tracking-wide. Vibe blueprint, marca início de cada
 * bloco do site de forma consistente.
 */
export default function SectionTag({
  number,
  children,
  tone = "light",
  className = "",
}: SectionTagProps) {
  const colors =
    tone === "dark"
      ? {
          accent: "text-[#a3b8ff]",
          label: "text-white/85",
          divider: "bg-white/25",
          numberMuted: "text-white/35",
        }
      : {
          accent: "text-[var(--accent)]",
          label: "text-[var(--foreground)]",
          divider: "bg-[var(--border-strong)]",
          numberMuted: "text-[var(--foreground-mute)]",
        };

  return (
    <div
      className={`inline-flex items-center gap-3 font-mono uppercase text-[11px] tracking-[0.22em] ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          tone === "dark" ? "bg-[#a3b8ff]" : "bg-[var(--accent)]"
        }`}
        aria-hidden="true"
      />
      {typeof number === "number" && (
        <>
          <span className={colors.numberMuted}>
            {String(number).padStart(2, "0")}
          </span>
          <span className={`w-3 h-px ${colors.divider}`} aria-hidden="true" />
        </>
      )}
      <span className={colors.label}>{children}</span>
    </div>
  );
}
