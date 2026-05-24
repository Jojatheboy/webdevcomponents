import type { ReactNode } from "react";

type Variant = "light" | "dark";

interface MetallicTextProps {
  children: ReactNode;
  /** italic por padrão pra reforçar o brilho de joia */
  italic?: boolean;
  /** 'light' = pra fundo escuro (branco/prateado), 'dark' = pra fundo claro (azul ABDO metálico) */
  variant?: Variant;
  className?: string;
}

const GRADIENTS: Record<Variant, string> = {
  light:
    "linear-gradient(180deg, #ffffff 0%, #d6dbe6 35%, #ffffff 55%, #9fa6b8 100%)",
  dark:
    "linear-gradient(180deg, #1f3a8a 0%, #4a5a85 40%, #1c3e9e 60%, #0d1f54 100%)",
};

const SHADOWS: Record<Variant, string> = {
  light: "drop-shadow(0 1px 0 rgba(255,255,255,0.1))",
  dark: "drop-shadow(0 1px 0 rgba(31,58,138,0.15))",
};

/**
 * Span com gradiente metálico aplicado via background-clip. Pra marcar
 * palavras-chave ou números em destaque. Usar com parcimônia.
 */
export default function MetallicText({
  children,
  italic = true,
  variant = "light",
  className = "",
}: MetallicTextProps) {
  return (
    <span
      className={`inline-block ${italic ? "italic" : ""} ${className}`}
      style={{
        backgroundImage: GRADIENTS[variant],
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        filter: SHADOWS[variant],
      }}
    >
      {children}
    </span>
  );
}
