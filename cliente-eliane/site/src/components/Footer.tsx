"use client";

import { OrganicBorder } from "./ui/OrganicBorder";

export function Footer() {
  return (
    <footer style={{ background: "var(--background)" }} className="pb-16 pt-10">
      <div className="relative w-full max-w-[1220px] mx-auto px-4 md:px-6">
        <OrganicBorder lines={["right", "left"]} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 py-6">
          {/* Col 1 */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[1px] mb-4 opacity-50"
              style={{ fontFamily: "var(--font-geist-mono)", color: "var(--foreground)" }}
            >
              Áreas
            </h4>
            <ul className="space-y-2 text-sm">
              {["Trabalhista", "Cível", "Direito da Mulher", "Aposentadoria"].map((a) => (
                <li key={a}>
                  <a href="#areas" className="no-underline opacity-70 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
                    {a}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[1px] mb-4 opacity-50"
              style={{ fontFamily: "var(--font-geist-mono)", color: "var(--foreground)" }}
            >
              Escritório
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { l: "Quem sou", h: "#quem-sou" },
                { l: "Diferencial", h: "#diferencial" },
                { l: "Depoimentos", h: "#depoimentos" },
                { l: "Contato", h: "#contato" },
              ].map((a) => (
                <li key={a.h}>
                  <a href={a.h} className="no-underline opacity-70 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
                    {a.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[1px] mb-4 opacity-50"
              style={{ fontFamily: "var(--font-geist-mono)", color: "var(--foreground)" }}
            >
              Redes
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.instagram.com/elianeferreira.adv/" target="_blank" rel="noopener noreferrer" className="no-underline opacity-70 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>Instagram</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[1px] mb-4 opacity-50"
              style={{ fontFamily: "var(--font-geist-mono)", color: "var(--foreground)" }}
            >
              Contato
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--copy-soft)" }}>
              <li>(51) 98767-8998</li>
              <li>draeliane@liane.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative pt-6">
          <OrganicBorder lines={["top"]} />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p
              className="text-[11px]"
              style={{ fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}
            >
              © 2026 Dra. Eliane Ferreira — OAB/RS
            </p>
            <p
              className="text-[11px]"
              style={{ fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}
            >
              Cachoeirinha/RS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
