"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP = "https://wa.me/5551994352254?text=Olá Dra. Eliane, gostaria de agendar uma consulta.";

const navLinks = [
  { label: "Áreas", href: "#areas" },
  { label: "Diferencial", href: "#diferencial" },
  { label: "Quem sou", href: "#quem-sou" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const Arrow = () => (
  <svg aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.5 4C6.22386 4 6 4.22386 6 4.5C6 4.77614 6.22386 5 6.5 5C6.77614 5 7 4.77614 7 4.5C7 4.22386 6.77614 4 6.5 4ZM6.5 11C6.22386 11 6 11.2239 6 11.5C6 11.7761 6.22386 12 6.5 12C6.77614 12 7 11.7761 7 11.5C7 11.2239 6.77614 11 6.5 11ZM7 5.5C7 5.22386 7.22386 5 7.5 5C7.77614 5 8 5.22386 8 5.5C8 5.77614 7.77614 6 7.5 6C7.22386 6 7 5.77614 7 5.5ZM7.5 10C7.22386 10 7 10.2239 7 10.5C7 10.7761 7.22386 11 7.5 11C7.77614 11 8 10.7761 8 10.5C8 10.2239 7.77614 10 7.5 10ZM8 6.5C8 6.22386 8.22386 6 8.5 6C8.77614 6 9 6.22386 9 6.5C9 6.77614 8.77614 7 8.5 7C8.22386 7 8 6.77614 8 6.5ZM8.5 9C8.22386 9 8 9.22386 8 9.5C8 9.77614 8.22386 10 8.5 10C8.77614 10 9 9.77614 9 9.5C9 9.22386 8.77614 9 8.5 9ZM9 7.5C9 7.22386 9.22386 7 9.5 7C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8C9.22386 8 9 7.77614 9 7.5ZM9.5 8C9.77614 8 10 8.22386 10 8.5C10 8.77614 9.77614 9 9.5 9C9.22386 9 9 8.77614 9 8.5C9 8.22386 9.22386 8 9.5 8Z" fill="currentColor"/>
  </svg>
);

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Blur overlay — exact runner.now */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-[calc(100%+80px)]"
        style={{
          background: "linear-gradient(to bottom, var(--c-background) 40%, transparent 60%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />

      <div
        className="relative flex h-[60px] items-center"
        style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-[6px] no-underline"
          style={{ fontFamily: "var(--font-instrument)", fontSize: 16, color: "var(--c-primary)" }}
        >
          Dra. Eliane Ferreira
        </a>

        {/* Center nav — desktop */}
        <nav
          className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-[20px] md:flex"
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: "var(--c-primary)" }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="no-underline transition-opacity duration-200 hover:opacity-100"
              style={{ opacity: i === 0 ? 1 : 0.5 }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="ml-auto flex items-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full no-underline transition-colors whitespace-nowrap"
            style={{
              background: "var(--marketing-primary-bg)",
              color: "var(--marketing-primary-text)",
              padding: "8px 16px 8px 20px",
              fontSize: 13,
            }}
          >
            Fale com a Dra. Eliane
            <Arrow />
          </a>

          {/* Mobile toggle */}
          <button
            className="inline-flex w-11 h-11 items-center justify-center md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="relative w-4 h-[14px]">
              <span
                className="absolute left-0 top-[2px] h-[1.5px] w-4 bg-current transition-transform duration-200"
                style={{ transform: open ? "rotate(45deg) translate(3px, 3px)" : "none" }}
              />
              <span
                className="absolute left-0 top-[7px] h-[1.5px] w-4 bg-current transition-opacity duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 top-[12px] h-[1.5px] w-4 bg-current transition-transform duration-200"
                style={{ transform: open ? "rotate(-45deg) translate(3px, -3px)" : "none" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="md:hidden relative overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--background)",
              borderBottom: "1px solid var(--marketing-border)",
            }}
          >
            <nav className="flex flex-col px-6 pb-6 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="no-underline"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 14,
                    color: "var(--c-primary)",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--marketing-border)",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group mt-5 inline-flex items-center justify-center gap-2 rounded-full no-underline whitespace-nowrap"
                style={{
                  background: "var(--marketing-primary-bg)",
                  color: "var(--marketing-primary-text)",
                  padding: "13px 20px",
                  fontSize: 15,
                }}
              >
                Fale com a Dra. Eliane
                <Arrow />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
