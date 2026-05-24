"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    {
      title: "Navegação",
      links: [
        { label: "Início", href: "#inicio" },
        { label: "Especialidades", href: "#especialidades" },
        { label: "Casos na Mídia", href: "#casos" },
        { label: "Equipe", href: "#equipe" },
      ],
    },
    {
      title: "Institucional",
      links: [
        { label: "Termos de Uso", href: "#" },
        { label: "Políticas de Privacidade", href: "#" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[var(--accent)]" />,
      text: "admfolchinierissoadv@gmail.com",
      href: "mailto:admfolchinierissoadv@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-[var(--accent)]" />,
      text: "(47) 99162-2772",
      href: "https://wa.me/5547991622772",
    },
    {
      icon: <MapPin size={18} className="text-[var(--accent)]" />,
      text: "Balneário Camboriú/SC",
    },
  ];

  return (
    <footer className="relative overflow-hidden rounded-t-xl mx-2 sm:mx-4 mb-4 border border-white/[0.06]">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #0b121066 50%, rgba(45,107,88,0.15) 100%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto p-4 sm:p-6 md:p-8 lg:p-10 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-16 pb-12">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Image
              src="https://www.folchinierissoadvocacia.com.br/wp-content/uploads/2026/01/LOGO-VERTICAL-BRANCA-1024x537.webp"
              alt="Folchini & Risso Advogados"
              width={160}
              height={84}
              className="h-20 w-auto object-contain object-left"
            />
            <p
              className="text-sm text-white/30 leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Advocacia Criminal de alto nível com atuação reconhecida em todo o
              Brasil.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-white text-sm font-semibold mb-6 tracking-wider uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/30 hover:text-[var(--accent-light)] transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4
              className="text-white text-sm font-semibold mb-6 tracking-wider uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contatos
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/30 hover:text-[var(--accent-light)] transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span
                      className="text-sm text-white/30"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/[0.06]" />

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            &copy; {new Date().getFullYear()} Folchini & Risso Advogados. Todos
            os direitos reservados.
          </p>
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Advocacia Criminal
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[28rem] -mt-32 -mb-24">
        <TextHoverEffect text="FOLCHINI" className="z-50" />
      </div>
    </footer>
  );
}
