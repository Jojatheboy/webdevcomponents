"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Clock, MessageCircle, X } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

/**
 * Badge flutuante no canto inferior direito.
 * Hover (desktop) ou tap (mobile) abre painel "Fale conosco".
 * Animação float sutil enquanto colapsado.
 */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // fecha quando clica fora (mobile)
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[1200]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* painel expandido */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full right-0 mb-3 w-[300px] origin-bottom-right"
          >
            <div className="bg-[var(--background)] rounded-2xl border border-[var(--border-strong)] shadow-2xl overflow-hidden">
              <div className="bg-[var(--foreground)] text-white px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/55 mb-1">
                    Fale conosco
                  </p>
                  <p className="font-[var(--font-display)] text-lg leading-tight">
                    Como podemos ajudar?
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="sm:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-3 flex flex-col gap-1">
                <a
                  href="https://wa.me/554733493811"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[var(--surface)] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <IconBrandWhatsapp className="size-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      WhatsApp
                    </p>
                    <p className="text-xs text-[var(--foreground-mute)]">
                      Resposta em até 1h útil
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+554733493811"
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[var(--surface)] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Phone className="size-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      (47) 3349-3811
                    </p>
                    <p className="text-xs text-[var(--foreground-mute)]">
                      Ligar agora
                    </p>
                  </div>
                </a>
              </div>

              <div className="px-5 py-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--foreground-mute)]">
                <Clock className="size-3.5 text-[var(--accent)]" />
                <span>Segunda a sexta · 08h às 18h</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* badge — sempre visível */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Fale conosco"
        aria-expanded={open}
        animate={
          open
            ? { y: 0 }
            : { y: [0, -6, 0] }
        }
        transition={
          open
            ? { duration: 0.3 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        className="group relative inline-flex items-center gap-2.5 h-12 pl-3 pr-5 rounded-full bg-[var(--foreground)] text-white shadow-xl shadow-[var(--foreground)]/30 hover:shadow-2xl hover:shadow-[var(--accent)]/40 hover:bg-[var(--accent)] transition-all"
        style={{ transitionDuration: "300ms" }}
      >
        <span className="relative w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <MessageCircle className="size-4" />
          {/* pulse */}
          <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        </span>
        <span className="text-sm font-medium whitespace-nowrap">
          Fale conosco
        </span>
        <span className="relative flex w-2 h-2 ml-1">
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 animate-ping"
            style={{ animationDuration: "2.5s" }}
          />
          <span className="relative w-2 h-2 rounded-full bg-[#25D366]" />
        </span>
      </motion.button>
    </div>
  );
}
