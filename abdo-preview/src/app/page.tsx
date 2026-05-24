import Navbar from "@/components/blocks/Navbar";
import Loader from "@/components/Loader";
import FloatingContact from "@/components/FloatingContact";
import GradualBlur from "@/components/ui/GradualBlur";
import ACidade from "@/components/ACidade"; // scroll-paint específico do ABDO

import HeroSlideshow from "@shared/blocks/HeroSlideshow";
import AboutSection from "@shared/blocks/AboutSection";
import EmpreendimentosCarousel from "@shared/blocks/EmpreendimentosCarousel";
import FAQAccordion from "@shared/blocks/FAQAccordion";
import ConsultoresGrid from "@shared/blocks/ConsultoresGrid";
import ContactFooter from "@shared/blocks/ContactFooter";

import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import { empreendimentos, type Status } from "@/lib/empreendimentos";

// --- DADOS DO CLIENTE (ABDO Construções · Itajaí/SC · desde 1997) ---

const PHONE = "(47) 3349-3811";
const WHATSAPP_URL = "https://wa.me/554733493811";
const PHONE_TEL = "tel:+554733493811";

const statusToCarousel: Record<Status, { label: string; tone: "primary" | "secondary" | "muted" }> = {
  pronto: { label: "Pronto pra morar", tone: "primary" },
  vendido: { label: "Entregue", tone: "muted" },
};

export default function Home() {
  return (
    <Loader>
      <Navbar />
      <main>
        <HeroSlideshow
          slides={[
            {
              kind: "headline",
              bgImage: "/images/le-havre-fachada.jpg",
              tag: "ABDO Construções · desde 1997",
              titleWords: ["Há", "28", "anos", "construindo", "histórias", "no", "litoral", "catarinense."],
              metallicWordIndices: [4],
              subtitle:
                "Apartamentos com padrão de qualidade, tecnologia aplicada e preços competitivos em Itajaí, Balneário Camboriú e Navegantes.",
              stats: [
                { v: "28+", l: "anos" },
                { v: "8", l: "empreendimentos" },
                { v: "212", l: "unidades" },
                { v: "25 mil", l: "m² construídos" },
              ],
              ctas: [
                { label: "Ver empreendimentos", href: "#empreendimentos", variant: "primary" },
                { label: "Conhecer a construtora", href: "#a-construtora", variant: "outline" },
              ],
            },
            {
              kind: "showcase",
              bgImage: "/images/le-havre-fachada.jpg",
              tag: "Em destaque",
              pill: "Pronto pra morar · Itajaí · 32 unidades",
              nameStart: "Le ",
              nameMetallic: "Havre",
              nameEnd: " Residence",
              description:
                "Edifício residencial com vista panorâmica em uma das melhores localizações de Itajaí.",
              ctas: [
                { label: "Conhecer o projeto", href: "/empreendimentos/le-havre-residence", variant: "primary" },
                { label: "Agendar visita", href: WHATSAPP_URL, variant: "outline" },
              ],
            },
          ]}
        />

        <AboutSection
          number={1}
          tag="A Construtora"
          headline="28 anos construindo no litoral de SC."
          paragraphs={[
            "A ABDO Construções e Incorporações LTDA, com sede em Itajaí (SC), atua há mais de 28 anos no segmento da construção civil no estado, com edificações verticais multifamiliares.",
            "Nossa missão é construir e comercializar apartamentos com padrão de qualidade e preços competitivos, aprimorando a tecnologia aplicada ao processo e proporcionando condições adequadas de trabalho à nossa equipe.",
          ]}
          footnote="CNPJ 95.791.695/0001-83 · Itajaí — Santa Catarina"
          image={{
            src: "/images/le-havre-interior.jpg",
            alt: "Interior do Le Havre Residence — empreendimento ABDO em Itajaí",
            caption: { eyebrow: "Le Havre Residence", title: "Itajaí, SC" },
          }}
          stats={[
            { to: 28, suffix: "+", label: "anos de mercado" },
            { to: 8, label: "empreendimentos entregues" },
            { to: 212, label: "unidades construídas" },
            { to: 25, suffix: " mil", label: "m² de área construída" },
          ]}
        />

        <ACidade />

        <EmpreendimentosCarousel
          number={3}
          tag="Portfólio ABDO"
          headline="Empreendimentos entregues."
          subtitle="Conheça os empreendimentos entregues pela ABDO em Itajaí, Balneário Camboriú e Navegantes."
          ctaLabel="Falar com a construtora"
          ctaHref="#contato"
          items={empreendimentos.map((e) => ({
            slug: e.slug,
            name: e.nome,
            category: "Residencial",
            subtitle: `${e.cidade}${e.ano ? ` · ${e.ano}` : ""}${e.unidades ? ` · ${e.unidades} un` : ""}`,
            status: statusToCarousel[e.status],
            image: e.image,
          }))}
        />

        <FAQAccordion
          number={4}
          tag="Perguntas Frequentes"
          headline="Dúvidas frequentes."
          subtitle="Não encontrou sua dúvida? Fale com a gente pelo WhatsApp."
          items={[
            {
              question: "Como funciona o financiamento dos apartamentos?",
              answer:
                "Trabalhamos com financiamento bancário (Caixa, Bradesco, Itaú, Santander) e também com financiamento direto da construtora em condições combinadas caso a caso. Nossa equipe te ajuda em todo o processo de aprovação.",
            },
            {
              question: "Posso visitar o apartamento decorado antes de comprar?",
              answer:
                "Sim. Agendamos a visita ao decorado e à obra (quando em construção) sem compromisso. Chame nossa equipe pelo WhatsApp e marcamos o melhor horário para você.",
            },
            {
              question: "Quais formas de pagamento vocês aceitam?",
              answer:
                "Pagamento à vista com desconto, financiamento bancário, financiamento direto da construtora, e em alguns casos aceitamos imóvel ou veículo como parte do pagamento. Tudo combinado com clareza antes da assinatura.",
            },
            {
              question: "Qual o prazo médio de entrega de um empreendimento?",
              answer:
                "De 24 a 36 meses contados a partir do lançamento, dependendo do porte do edifício. O cronograma é apresentado no contrato e o acompanhamento da obra é feito mês a mês.",
            },
            {
              question: "Como acompanho a obra do meu apartamento?",
              answer:
                "Enviamos mensalmente fotos e relatórios de evolução pela área do cliente e por WhatsApp. Visitas à obra podem ser agendadas com a equipe técnica nos dias acordados.",
            },
            {
              question: "Em quais cidades a ABDO constrói?",
              answer:
                "Itajaí (sede), Balneário Camboriú e Navegantes. Em 28 anos entregamos 8 empreendimentos nessas cidades, somando 212 unidades e 25 mil m² de área construída.",
            },
            {
              question: "Vocês trabalham com investidores e corretores parceiros?",
              answer:
                "Sim. Temos programa de parceria com corretores e abrimos condições especiais para investidores. Fale com nossos consultores pelo WhatsApp para conhecer as comissões e os empreendimentos em lançamento.",
            },
          ]}
        />

        <ConsultoresGrid
          number={5}
          tag="Atendimento"
          headline="Fale com nossos consultores."
          subtitle="CRECI ativo, conhecimento do produto e do mercado de Itajaí, Balneário Camboriú e Navegantes."
          consultores={[
            {
              nome: "Mariana Costa",
              funcao: "Consultora sênior",
              registro: "CRECI/SC 23.279",
              cidade: "Itajaí",
              foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
            {
              nome: "Pedro Lima",
              funcao: "Consultor de imóveis",
              registro: "CRECI/SC 18.456",
              cidade: "Balneário Camboriú",
              foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
            {
              nome: "Camila Tavares",
              funcao: "Consultora",
              registro: "CRECI/SC 21.091",
              cidade: "Navegantes",
              foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
            {
              nome: "Ricardo Mendes",
              funcao: "Gerente comercial",
              registro: "CRECI/SC 14.728",
              cidade: "Itajaí",
              foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
          ]}
          footnote="Atendimento de segunda a sexta · 08h às 18h"
        />
      </main>

      <ContactFooter
        number={6}
        tag="Fale com a ABDO"
        headline="Vamos conversar sobre o seu próximo lar."
        cta={{
          primaryLabel: "Falar no WhatsApp",
          primaryHref: WHATSAPP_URL,
          primaryWhatsapp: true,
          secondaryLabel: PHONE,
          secondaryHref: PHONE_TEL,
        }}
        brand={{
          logo: "/images/logo-abdo-full.png",
          logoAlt: "ABDO Construtora",
          description:
            "Há mais de 28 anos construindo apartamentos com padrão de qualidade no litoral catarinense. Itajaí, Balneário Camboriú e Navegantes.",
          social: [
            { Icon: IconBrandFacebook, label: "Facebook", href: "https://facebook.com/abdoconstrutora" },
            { Icon: IconBrandInstagram, label: "Instagram", href: "https://instagram.com/abdoconstrutora" },
          ],
        }}
        navLinks={[
          { text: "Home", href: "/#home" },
          { text: "A Construtora", href: "/#a-construtora" },
          { text: "A Cidade", href: "/#a-cidade" },
          { text: "Empreendimentos", href: "/#empreendimentos" },
          { text: "Dúvidas", href: "/#faq" },
          { text: "Consultores", href: "/#consultores" },
        ]}
        empreendimentos={empreendimentos.map((e) => ({
          slug: e.slug,
          label: e.nome.replace(/^(Condomínio Residencial|Residencial)\s/, ""),
        }))}
        contact={{
          phone: PHONE,
          address: { line1: "Rua Aririba, 83 · Praia Brava", line2: "CEP 88360-780 · Itajaí — SC" },
          schedule: "Segunda a sexta · 08h às 18h",
        }}
        copyright="© 2026 ABDO Construções e Incorporações LTDA."
        legal="CNPJ 95.791.695/0001-83"
      />

      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential
        opacity={1}
      />
      <FloatingContact />
    </Loader>
  );
}
