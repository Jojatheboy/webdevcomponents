"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.95, ease: [0.83, 0, 0.17, 1] }}
            onAnimationComplete={() => {
              document.body.style.overflow = "";
            }}
            className="fixed inset-0 z-[999] bg-[var(--background)] flex items-center justify-center"
            aria-hidden="true"
          >
            {/* halo radial sutil pra dar profundidade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(31,58,138,0.06) 0%, rgba(251,252,255,0) 60%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center gap-10"
            >
              <Image
                src="/images/logo-abdo-full.png"
                alt="ABDO Construtora"
                width={140}
                height={132}
                priority
                className="h-28 md:h-32 w-auto object-contain"
              />

              {/* barra de progresso elegante em azul ABDO */}
              <div className="relative w-48 h-px bg-[var(--border-strong)] overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.4,
                    ease: [0.45, 0, 0.55, 1],
                    repeat: Infinity,
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-[var(--foreground)]"
                />
              </div>

              <p className="font-mono uppercase text-[10px] tracking-[0.28em] text-[var(--foreground-mute)]">
                Construindo desde 1997
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
