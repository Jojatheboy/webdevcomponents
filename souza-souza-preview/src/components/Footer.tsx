import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-[var(--surface)] border-t border-[var(--border-subtle)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left */}
          <div>
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Souza & Souza Advogados" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm mb-6">
              Advocacia especializada com mais de 14 anos de experiência em
              Londrina/PR. Compromisso, ética e resultados que transformam vidas.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/souzaesouzaadvogados/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/souza-souza-advogados/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
              <div>
                <a
                  href="tel:+5543999596714"
                  className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors block"
                >
                  (43) 99959-6714
                </a>
                <a
                  href="tel:+554330277088"
                  className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors block"
                >
                  (43) 3027-7088
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
              <p className="text-sm text-white/50">
                R. La Paz, 390, Guanabara
                <br />
                Londrina - PR, 86050-140
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Souza & Souza Advogados Associados.
            Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/25">
            OAB/PR &mdash; Londrina, Paran&aacute;
          </p>
        </div>
      </div>
    </footer>
  );
}
