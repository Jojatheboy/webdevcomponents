"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Duração em segundos */
  duration?: number;
  /** Atraso antes de começar (segundos) */
  delay?: number;
  /** Locale pra formatação de milhar — default pt-BR */
  locale?: string;
  className?: string;
}

/**
 * Contador animado que sobe de 0 até `to` quando entra na viewport.
 * Easing easeOutCubic, RAF, formatação pt-BR de milhar. Roda 1 vez só.
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
  delay = 0,
  locale = "pt-BR",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / totalMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, delay]);

  const formatted = new Intl.NumberFormat(locale).format(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
