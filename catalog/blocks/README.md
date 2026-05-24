# 🧱 Blocks

Seções de página inteiras, parametrizadas. Cada bloco aceita `data` via props strongly-typed e renderiza pronto. Use pra montar páginas rapidamente: codar vira **preencher dados**.

Todos importam primitivos de `../animations/`, `../sections/`, `../buttons/`. Stack: Next.js + framer-motion + Tailwind v4 + tabler-icons + lucide.

## 📋 Índice

| Block | Pra que serve |
|---|---|
| [`HeroSlideshow`](./HeroSlideshow.tsx) | Hero fullwidth com 1+ slides (institucional ou empreendimento), autoplay, controls |
| [`AboutSection`](./AboutSection.tsx) | "Quem é a empresa" — heading + paragraphs + foto + opcional grid de áreas + opcional CountUp stats |
| [`TimelineSection`](./TimelineSection.tsx) | Cronologia de marcos (year + title + body), layout grid ou vertical |
| [`EmpreendimentosCarousel`](./EmpreendimentosCarousel.tsx) | Carousel horizontal de cards verticais (3:4) com badges, imagens, status |
| [`MCMVSection`](./MCMVSection.tsx) | Banner pra programa MCMV ou "destaque de oferta" com 3 benefícios + CTA WhatsApp |
| [`FAQAccordion`](./FAQAccordion.tsx) | Heading + busca à esquerda, accordion expandable à direita |
| [`ConsultoresGrid`](./ConsultoresGrid.tsx) | Grid 2col com foto pequena + nome + função + CRECI + WhatsApp |
| [`ContactFooter`](./ContactFooter.tsx) | "Vamos conversar" + 4 cols (marca, nav, empreendimentos, contato) + copyright |

## ⚡ Como usar

```tsx
import HeroSlideshow from "@shared/blocks/HeroSlideshow";
import AboutSection from "@shared/blocks/AboutSection";
import TimelineSection from "@shared/blocks/TimelineSection";
import EmpreendimentosCarousel from "@shared/blocks/EmpreendimentosCarousel";
import MCMVSection from "@shared/blocks/MCMVSection";
import FAQAccordion from "@shared/blocks/FAQAccordion";
import ConsultoresGrid from "@shared/blocks/ConsultoresGrid";
import ContactFooter from "@shared/blocks/ContactFooter";
import { IconHome, IconBuilding, IconBrandFacebook } from "@tabler/icons-react";

export default function Home() {
  return (
    <>
      <HeroSlideshow slides={[
        {
          kind: "headline",
          bgImage: "/images/hero.jpg",
          tag: "Construtora · desde 1986",
          titleWords: ["Solidez", "que", "a", "competência", "construiu."],
          metallicWordIndices: [3],
          subtitle: "Há 39 anos construindo no litoral catarinense.",
          stats: [
            { v: "39+", l: "anos" },
            { v: "8", l: "empreendimentos" },
            { v: "212", l: "unidades" },
          ],
          ctas: [
            { label: "Ver empreendimentos", href: "#empreendimentos", variant: "primary" },
          ],
        },
      ]} />

      <AboutSection
        number={1}
        tag="A Construtora"
        headline="39 anos construindo solidez."
        paragraphs={[
          "A empresa atua desde 1986...",
          "Trabalho, gestão e qualidade...",
        ]}
        image={{
          src: "/images/foto.jpg",
          alt: "Empreendimento principal",
          caption: { eyebrow: "Empreendimento", title: "Cidade, SP" },
        }}
        areas={[
          { Icon: IconHome, nome: "Habitação", descricao: "Empreendimentos residenciais" },
          { Icon: IconBuilding, nome: "Edificações", descricao: "Obras corporativas" },
        ]}
        stats={[
          { to: 39, suffix: "+", label: "anos" },
          { to: 8, label: "empreendimentos" },
        ]}
      />

      <TimelineSection
        number={2}
        tag="Trajetória"
        headline="Linha do tempo."
        layout="grid"
        milestones={[
          { year: "1986", title: "Fundação", body: "Início em Barretos." },
          { year: "1990", body: "Inauguração do escritório em São Paulo." },
        ]}
      />

      <EmpreendimentosCarousel
        number={3}
        tag="Setor Imobiliário"
        headline="Encontre seu imóvel."
        items={[
          {
            slug: "residencial-x",
            name: "Residencial X",
            category: "Residencial",
            subtitle: "Bairro · Cidade · 2026",
            status: { label: "Em construção", tone: "primary" },
            image: "/images/emp.jpg",
          },
        ]}
      />

      <MCMVSection
        number={4}
        tag="Minha Casa Minha Vida"
        headline="Sua casa com o subsídio do governo."
        benefits={[
          { prefix: "a partir de", value: "R$ 598", label: "parcela inicial" },
          { prefix: "até", value: "R$ 55 mil", label: "subsídio máximo" },
          { prefix: "100%", value: "Grátis", label: "ITBI + registro" },
        ]}
        cta={{ label: "Quero saber se me encaixo", href: "https://wa.me/...", whatsapp: true }}
        disclaimer="Sujeito a análise de crédito."
      />

      <FAQAccordion
        number={5}
        tag="Perguntas Frequentes"
        headline="Dúvidas frequentes."
        items={[
          { question: "Como funciona o financiamento?", answer: "..." },
        ]}
      />

      <ConsultoresGrid
        number={6}
        tag="Atendimento"
        headline="Fale com nossos consultores."
        consultores={[
          {
            nome: "Mariana Costa",
            funcao: "Consultora sênior",
            registro: "CRECI/SP 12345",
            cidade: "Americana",
            foto: "https://...",
            href: "https://wa.me/...",
          },
        ]}
      />

      <ContactFooter
        number={7}
        tag="Fale com a Construtora"
        headline="Vamos conversar sobre seu próximo lar."
        cta={{
          primaryLabel: "WhatsApp",
          primaryHref: "https://wa.me/...",
          primaryWhatsapp: true,
          secondaryLabel: "(11) 99999-9999",
          secondaryHref: "tel:+5511999999999",
        }}
        brand={{
          logo: "/images/logo.png",
          logoAlt: "Cliente",
          description: "Há 39 anos construindo...",
          social: [{ Icon: IconBrandFacebook, label: "Facebook", href: "..." }],
        }}
        navLinks={[
          { text: "Início", href: "/#home" },
          { text: "A Construtora", href: "/#a-construtora" },
        ]}
        empreendimentos={[
          { slug: "residencial-x", label: "Residencial X" },
        ]}
        contact={{
          phone: "(11) 99999-9999",
          address: { line1: "Av. X, 123 · Bairro", line2: "CEP 00000-000 · Cidade — UF" },
          schedule: "Seg–sex · 08h às 18h",
        }}
        copyright="© 2026 Construtora"
        legal="Tagline ou CNPJ"
      />
    </>
  );
}
```

## 🎨 Tokens necessários

Todos os blocks usam tokens CSS do design system:
- `--background`, `--surface`, `--foreground`, `--foreground-soft`, `--foreground-mute`
- `--accent`, `--accent-dark`, `--accent-foreground`
- `--dark-section`, `--dark-section-text`
- `--border-subtle`, `--border-strong`
- `--font-display`, `--font-hero`, `--font-mono`

Garanta que `globals.css` define esses tokens. Modelo em `_template-base/src/app/globals.css`.

## 📦 Deps

Mesmas do catalog principal — ver [`../README.md`](../README.md#📦-deps-necessárias).

## 🔄 Como adicionar bloco novo

1. Criar arquivo em `catalog/blocks/<Nome>.tsx`
2. Aceitar `data` via interface TS
3. Importar primitivos via path relativo `../animations/X`
4. Adicionar entrada na tabela acima
5. Commit + push
6. `node scripts/sync-catalog.js --all` pra atualizar previews
