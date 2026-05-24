"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "A Construtora", href: "#a-construtora" },
  { label: "A Cidade", href: "#a-cidade" },
  { label: "Empreendimentos", href: "#empreendimentos" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/85 backdrop-blur border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2 z-10">
          <Image
            src="/images/logo-abdo.png"
            alt="ABDO Construtora"
            width={120}
            height={45}
            priority
            className="h-9 md:h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              style={{ transitionDuration: "150ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/554733493811"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 h-10 rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm hover:bg-[var(--accent)] transition-colors"
          style={{ transitionDuration: "200ms" }}
        >
          <Phone className="size-4" />
          (47) 3349-3811
        </a>

        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          className="md:hidden p-2 -mr-2 text-[var(--foreground)] z-10"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute inset-x-0 top-full bg-[var(--background)] border-b border-[var(--border-subtle)]"
          >
            <nav className="flex flex-col p-6 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/554733493811"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-2 h-12 rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm"
              >
                <Phone className="size-4" />
                (47) 3349-3811
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
