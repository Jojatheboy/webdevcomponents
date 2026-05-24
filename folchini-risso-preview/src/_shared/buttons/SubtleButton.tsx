"use client";

import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "secondary";

interface SubtleButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  target?: "_blank" | "_self";
  variant?: Variant;
  className?: string;
  /** Quando true, o "dot" decorativo à direita não é renderizado */
  hideDot?: boolean;
}

/**
 * Botão pill com microanimações sutis: glow no hover, shimmer atravessando,
 * dot accent que pulsa, scale sutil. Versão primary (fundo azul) e secondary
 * (outline branco). Pode renderizar como Link ou button.
 */
export default function SubtleButton({
  children,
  href,
  onClick,
  target,
  variant = "primary",
  className = "",
  hideDot = false,
}: SubtleButtonProps) {
  const base =
    "group relative inline-flex justify-center items-center gap-3 rounded-full h-12 px-7 whitespace-nowrap " +
    "transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] overflow-hidden " +
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent " +
    "before:via-white/15 before:to-transparent before:translate-x-[-100%] " +
    "hover:before:translate-x-[100%] before:transition-transform before:duration-700";

  const variants: Record<Variant, string> = {
    primary:
      "border border-[var(--foreground)] bg-[var(--foreground)] text-white " +
      "hover:border-[var(--accent)] hover:bg-[var(--accent)] " +
      "hover:shadow-lg hover:shadow-[var(--foreground)]/20",
    secondary:
      "border border-[var(--border-strong)] bg-transparent text-[var(--foreground)] " +
      "hover:border-[var(--foreground)] hover:bg-[var(--foreground)]/[0.04]",
  };

  const dotColor =
    variant === "primary"
      ? "bg-white"
      : "bg-[var(--accent)]";

  const Inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide whitespace-nowrap">
        {children}
      </span>
      {!hideDot && (
        <span
          className={`relative z-10 inline-block w-2 h-2 rounded-full ${dotColor} transition-all duration-500 ease-out shrink-0`}
        >
          <span
            className={`absolute inset-0 rounded-full ${dotColor} opacity-0 group-hover:opacity-60 group-hover:animate-ping`}
            style={{ animationDuration: "1.8s" }}
            aria-hidden="true"
          />
        </span>
      )}
    </>
  );

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || target === "_blank";
    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={target === "_blank" ? "noreferrer" : undefined}
          className={cls}
        >
          {Inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {Inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {Inner}
    </button>
  );
}
