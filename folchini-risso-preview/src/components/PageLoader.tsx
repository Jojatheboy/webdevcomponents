"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--background)]"
          >
            {/* Glow behind logo */}
            <div className="absolute w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-[80px]" />

            <div className="relative flex flex-col items-center gap-6">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src="https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/LOGO-VERTICAL-BRANCA-1024x537.webp"
                  alt="Folchini & Risso"
                  width={160}
                  height={84}
                  className="h-20 w-auto"
                  priority
                />
              </motion.div>

              {/* Loading bar */}
              <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
                  className="h-full bg-[var(--accent)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
