import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { empreendimentos } from "@/lib/empreendimentos";
import BlurText from "./ui/BlurText";
import SubtleButton from "./ui/SubtleButton";
import SectionTag from "./ui/SectionTag";

const navLinks = [
  { text: "Home", href: "/#home" },
  { text: "A Construtora", href: "/#a-construtora" },
  { text: "A Cidade", href: "/#a-cidade" },
  { text: "Empreendimentos", href: "/#empreendimentos" },
  { text: "Dúvidas", href: "/#faq" },
  { text: "Consultores", href: "/#consultores" },
];

const socialLinks = [
  {
    icon: IconBrandFacebook,
    label: "Facebook",
    href: "https://facebook.com/abdoconstrutora",
  },
  {
    icon: IconBrandInstagram,
    label: "Instagram",
    href: "https://instagram.com/abdoconstrutora",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="bg-[var(--surface)] border-t border-[var(--border-subtle)] w-full"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        {/* bloco de chamada — sutil, sem cor escura */}
        <div className="pt-16 lg:pt-20 pb-14 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end border-b border-[var(--border-subtle)]">
          <div className="lg:col-span-7">
            <SectionTag number={6} tone="light" className="mb-4">
              Fale com a ABDO
            </SectionTag>
            <BlurText
              as="h2"
              text="Vamos conversar sobre o seu próximo lar."
              animateBy="words"
              direction="top"
              delay={80}
              stepDuration={0.4}
              className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(32px,4.5vw,52px)] leading-[1.05]"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <SubtleButton href="https://wa.me/554733493811" variant="primary">
              <IconBrandWhatsapp className="size-4 relative z-10" />
              Falar no WhatsApp
            </SubtleButton>
            <SubtleButton href="tel:+554733493811" variant="secondary" hideDot>
              <Phone className="size-4 relative z-10" />
              (47) 3349-3811
            </SubtleButton>
          </div>
        </div>

        {/* 4 cols — marca + navegação + empreendimentos + contato */}
        <div className="py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo-abdo-full.png"
                alt="ABDO Construtora"
                width={48}
                height={45}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-[var(--foreground-soft)] text-sm leading-relaxed mt-6 max-w-sm">
              Há mais de 28 anos construindo apartamentos com padrão de
              qualidade no litoral catarinense. Itajaí, Balneário Camboriú e
              Navegantes.
            </p>

            <ul className="mt-8 flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-strong)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white hover:border-[var(--foreground)] transition-colors"
                    style={{ transitionDuration: "200ms" }}
                  >
                    <Icon className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:col-span-8">
            <div>
              <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)] mb-5">
                Navegação
              </p>
              <ul className="space-y-3 text-sm">
                {navLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-[var(--foreground-soft)] hover:text-[var(--accent)] transition-colors"
                      style={{ transitionDuration: "150ms" }}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)] mb-5">
                Empreendimentos
              </p>
              <ul className="space-y-3 text-sm">
                {empreendimentos.map((emp) => (
                  <li key={emp.slug}>
                    <Link
                      href={`/empreendimentos/${emp.slug}`}
                      className="text-[var(--foreground-soft)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5 group"
                      style={{ transitionDuration: "150ms" }}
                    >
                      {emp.nome.replace(
                        /^(Condomínio Residencial|Residencial)\s/,
                        ""
                      )}
                      {emp.status === "pronto" && (
                        <ArrowUpRight className="size-3 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)] mb-5">
                Contato
              </p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-[var(--foreground-soft)]">
                  <Phone className="size-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                  <span>(47) 3349-3811</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--foreground-soft)]">
                  <MapPin className="size-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                  <address className="not-italic leading-relaxed">
                    Rua Aririba, 83 · Praia Brava
                    <br />
                    CEP 88360-780 · Itajaí — SC
                  </address>
                </li>
                <li className="flex items-start gap-3 text-[var(--foreground-soft)]">
                  <Clock className="size-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                  <span>Segunda a sexta · 08h às 18h</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--foreground-mute)]">
          <p>© {year} ABDO Construções e Incorporações LTDA.</p>
          <p className="font-mono">CNPJ 95.791.695/0001-83</p>
        </div>
      </div>
    </footer>
  );
}
