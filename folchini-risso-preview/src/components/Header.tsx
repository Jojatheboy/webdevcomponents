"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Casos na Mídia", href: "#casos" },
  { label: "Equipe", href: "#equipe" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo real */}
        <a href="#inicio">
          <Image
            src="https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/LOGO-HORIZONTAL-BRANCA-1024x225.webp"
            alt="Folchini & Risso Advogados"
            width={200}
            height={44}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5547991622772?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20advogado%20criminalista%21"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold tracking-wide hover:bg-[var(--accent-light)] transition-all duration-300 rounded-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Fale Conosco
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-[var(--border-subtle)]"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-[var(--accent-light)] transition-colors text-lg"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/5547991622772?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20advogado%20criminalista%21"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-5 py-3 bg-[var(--accent)] text-white text-center font-semibold tracking-wide"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Fale Conosco
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
