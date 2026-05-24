"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 1400; // tempo da barra de progresso (ms)
const HOLD = 250; // pausa antes da cortina subir (ms)

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // easeInOut
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, HOLD);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--background)" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "var(--marketing-eyebrow)",
              marginBottom: 18,
            }}
          >
            Advocacia · Cachoeirinha/RS
          </motion.p>

          {/* Nome */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-instrument)",
              fontSize: "clamp(34px, 6vw, 56px)",
              lineHeight: 1,
              letterSpacing: "-1.5px",
              color: "var(--marketing-heading)",
              textAlign: "center",
            }}
          >
            Dra. Eliane{" "}
            <span style={{ fontStyle: "italic", color: "var(--c-warm-accent)" }}>
              Ferreira
            </span>
          </motion.div>

          {/* Progresso */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-4"
            style={{ marginTop: 34 }}
          >
            <div
              style={{
                width: 220,
                height: 2,
                background: "var(--marketing-border)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "var(--c-warm-accent)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                color: "var(--marketing-copy-soft)",
                width: 34,
                textAlign: "right",
              }}
            >
              {pct}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
