import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import BlurText from "../animations/BlurText";
import SubtleButton from "../buttons/SubtleButton";
import SectionTag from "../sections/SectionTag";
import type { ComponentType } from "react";

/* ============================================================
 *  ContactFooter — bloco "Vamos conversar" + 4 cols (marca, nav,
 *  empreendimentos, contato) + copyright/legal embaixo.
 * ============================================================ */

export type SocialLink = {
  /** ex: IconBrandFacebook do @tabler/icons-react */
  Icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
};

export type NavLink = { text: string; href: string };

export type EmpreendimentoLink = {
  slug?: string;
  href?: string;
  /** Nome exibido (pode ser nome curto) */
  label: string;
};

export interface ContactFooterProps {
  /** Headline com BlurText animation */
  headline: string;
  /** Eyebrow tag (ex: "Fale com a Construtora") */
  tag: string;
  number?: number;
  cta: {
    primaryLabel: string;
    /** URL completo do WhatsApp ou tel: */
    primaryHref: string;
    /** Mostrar ícone WhatsApp no primary */
    primaryWhatsapp?: boolean;
    secondaryLabel: string;
    secondaryHref: string;
  };
  /** Coluna 1 — Marca */
  brand: {
    logo: string;
    logoAlt: string;
    description: string;
    social?: SocialLink[];
  };
  /** Coluna 2 — Navegação */
  navLinks: NavLink[];
  /** Coluna 3 — Empreendimentos (opcional) */
  empreendimentos?: EmpreendimentoLink[];
  /** Coluna 4 — Contato */
  contact: {
    phone?: string;
    address?: { line1: string; line2?: string };
    schedule?: string;
  };
  /** Linha embaixo: copyright + identificador legal */
  copyright: string;
  legal?: string;
  id?: string;
}

export default function ContactFooter({
  headline,
  tag,
  number,
  cta,
  brand,
  navLinks,
  empreendimentos,
  contact,
  copyright,
  legal,
  id = "contato",
}: ContactFooterProps) {
  return (
    <footer
      id={id}
      className="bg-[var(--surface)] border-t border-[var(--border-subtle)] w-full"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <div className="pt-16 lg:pt-20 pb-14 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end border-b border-[var(--border-subtle)]">
          <div className="lg:col-span-7">
            <SectionTag number={number} tone="light" className="mb-4">
              {tag}
            </SectionTag>
            <BlurText
              as="h2"
              text={headline}
              animateBy="words"
              direction="top"
              delay={80}
              stepDuration={0.4}
              className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(32px,4.5vw,52px)] leading-[1.05]"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <SubtleButton href={cta.primaryHref} variant="primary">
              {cta.primaryWhatsapp && <IconBrandWhatsapp className="size-4 relative z-10" />}
              {cta.primaryLabel}
            </SubtleButton>
            <SubtleButton href={cta.secondaryHref} variant="secondary" hideDot>
              <Phone className="size-4 relative z-10" />
              {cta.secondaryLabel}
            </SubtleButton>
          </div>
        </div>

        <div className="py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={brand.logo}
                alt={brand.logoAlt}
                width={48}
                height={45}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-[var(--foreground-soft)] text-sm leading-relaxed mt-6 max-w-sm">
              {brand.description}
            </p>

            {brand.social && brand.social.length > 0 && (
              <ul className="mt-8 flex gap-3">
                {brand.social.map(({ Icon, label, href }) => (
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
            )}
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-${empreendimentos ? 3 : 2} gap-10 lg:col-span-8`}>
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

            {empreendimentos && empreendimentos.length > 0 && (
              <div>
                <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)] mb-5">
                  Empreendimentos
                </p>
                <ul className="space-y-3 text-sm">
                  {empreendimentos.map((emp) => {
                    const href = emp.href ?? (emp.slug ? `/empreendimentos/${emp.slug}` : "#");
                    return (
                      <li key={emp.slug ?? emp.label}>
                        <Link
                          href={href}
                          className="text-[var(--foreground-soft)] hover:text-[var(--accent)] transition-colors"
                          style={{ transitionDuration: "150ms" }}
                        >
                          {emp.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div>
              <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)] mb-5">
                Contato
              </p>
              <ul className="space-y-4 text-sm">
                {contact.phone && (
                  <li className="flex items-start gap-3 text-[var(--foreground-soft)]">
                    <Phone className="size-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                    <span>{contact.phone}</span>
                  </li>
                )}
                {contact.address && (
                  <li className="flex items-start gap-3 text-[var(--foreground-soft)]">
                    <MapPin className="size-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                    <address className="not-italic leading-relaxed">
                      {contact.address.line1}
                      {contact.address.line2 && (
                        <>
                          <br />
                          {contact.address.line2}
                        </>
                      )}
                    </address>
                  </li>
                )}
                {contact.schedule && (
                  <li className="flex items-start gap-3 text-[var(--foreground-soft)]">
                    <Clock className="size-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                    <span>{contact.schedule}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--foreground-mute)]">
          <p>{copyright}</p>
          {legal && <p className="font-mono">{legal}</p>}
        </div>
      </div>
    </footer>
  );
}
