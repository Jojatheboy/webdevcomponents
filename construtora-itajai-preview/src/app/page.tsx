import Navbar from "@/components/blocks/Navbar";
import Loader from "@/components/Loader";
import FloatingContact from "@/components/FloatingContact";
import GradualBlur from "@/components/ui/GradualBlur";

import HeroSlideshow from "@shared/blocks/HeroSlideshow";
import AboutSection from "@shared/blocks/AboutSection";
import TimelineSection from "@shared/blocks/TimelineSection";
import EmpreendimentosCarousel from "@shared/blocks/EmpreendimentosCarousel";
import MCMVSection from "@shared/blocks/MCMVSection";
import FAQAccordion from "@shared/blocks/FAQAccordion";
import ConsultoresGrid from "@shared/blocks/ConsultoresGrid";
import ContactFooter from "@shared/blocks/ContactFooter";

import {
  IconHome,
  IconBuildingCommunity,
  IconBuildingChurch,
  IconRoad,
  IconRipple,
  IconHeartHandshake,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";

import { empreendimentos, type Status } from "@/lib/empreendimentos";

// --- DADOS DO CLIENTE (Construtora Itajaí · Grupo Itajaí · Americana/SP) ---

const PHONE = "(11) 99999-9999"; // placeholder até cliente enviar
const WHATSAPP_URL = "https://wa.me/5511999999999";
const PHONE_TEL = "tel:+5511999999999";

const statusToCarousel: Record<Status, { label: string; tone: "primary" | "secondary" | "muted" }> = {
  "em-obras": { label: "Em construção", tone: "primary" },
  ultimas: { label: "Últimas unidades", tone: "secondary" },
  entregue: { label: "100% vendido", tone: "muted" },
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
              bgImage: "/images/scraped/010-IMA-COND_JANAINA-FACHADA-R01-2880w.jpg",
              tag: "Grupo Itajaí · desde 1986",
              titleWords: ["Solidez", "que", "a", "competência", "construiu."],
              metallicWordIndices: [3],
              subtitle:
                "Há 39 anos transformando empreendimentos imobiliários, edificações, restauros e urbanização em Americana e região.",
              stats: [
                { v: "39+", l: "anos de mercado" },
                { v: "6", l: "áreas de atuação" },
                { v: "15 mil+", l: "UHs construídas" },
              ],
              ctas: [
                { label: "Ver empreendimentos", href: "#empreendimentos", variant: "primary" },
                { label: "Conhecer a construtora", href: "#a-construtora", variant: "outline" },
              ],
            },
            {
              kind: "showcase",
              bgImage: "/images/scraped/013-iracema-banner-site-1080-380px-3-88865ab2-2880w.png",
              tag: "Minha Casa Minha Vida",
              pill: "ITBI e Registro grátis · subsídio até R$ 55 mil",
              nameStart: "2 dorms ",
              nameMetallic: "com varanda",
              nameEnd: ".",
              description:
                "Entrada super facilitada com subsídio do governo. Parcelas a partir de R$ 598/mês.",
              stats: [
                { v: "R$ 598", l: "parcela inicial" },
                { v: "R$ 55 mil", l: "subsídio máximo" },
                { v: "0", l: "ITBI + registro" },
              ],
              ctas: [
                { label: "Falar com consultor", href: WHATSAPP_URL, variant: "primary" },
                { label: "Ver empreendimento", href: "/empreendimentos/residencial-iracema", variant: "outline" },
              ],
            },
          ]}
        />

        <AboutSection
          number={1}
          tag="A Construtora"
          headline="39 anos construindo solidez em Americana."
          paragraphs={[
            "A Construtora Itajaí integra o Grupo Itajaí e atua desde 1986 em empreendimentos imobiliários, edificações, restauros, urbanização, saneamento e mobilidade.",
            "Trabalho, gestão e qualidade. Resultados sustentáveis em toda a cadeia, conquistando a confiança de clientes e parceiros há quase 4 décadas.",
          ]}
          footnote="Grupo Itajaí · Construção Civil e Agropecuária · Americana — SP"
          image={{
            src: "/images/scraped/010-IMA-COND_JANAINA-FACHADA-R01-2880w.jpg",
            alt: "Residencial Janaína — Construtora Itajaí",
            caption: { eyebrow: "Residencial Janaína", title: "Americana, SP" },
          }}
          areas={[
            { Icon: IconHome, nome: "Habitação", descricao: "Empreendimentos residenciais" },
            { Icon: IconBuildingCommunity, nome: "Edificações", descricao: "Obras corporativas e institucionais" },
            { Icon: IconBuildingChurch, nome: "Restauração", descricao: "Restauro de patrimônio histórico" },
            { Icon: IconRoad, nome: "Urbanização", descricao: "Mobilidade e infraestrutura urbana" },
            { Icon: IconRipple, nome: "Saneamento", descricao: "Obras de saneamento básico" },
            { Icon: IconHeartHandshake, nome: "Educação & Saúde", descricao: "Construções públicas essenciais" },
          ]}
          stats={[
            { to: 39, suffix: "+", label: "anos de mercado" },
            { to: 6, label: "áreas de atuação" },
            { to: 15000, suffix: "+", label: "UHs construídas" },
            { to: 200, suffix: "+", label: "obras entregues" },
          ]}
        />

        <TimelineSection
          number={2}
          tag="Trajetória"
          headline="35 anos de história."
          subtitle="Marcos da Construtora Itajaí — da fundação em Barretos à liderança em obras habitacionais e públicas."
          layout="grid"
          milestones={[
            { year: "1986", title: "Fundação", body: "Início da Construtora em Barretos." },
            { year: "1990", body: "Inauguração do escritório em São Paulo. Execução de obras de reformas em edificações." },
            { year: "1998", body: "Ingresso no programa QUALIHAB e PBQPH Nível B. Implantação de 164 unidades escolares modulares." },
            { year: "2001", body: "Atingimento Nível A no PBQPH. Condomínio Horizontal Jatobá em Ribeirão Preto, primeira incorporação horizontal." },
            { year: "2003", body: "Condomínio Petrópolis, primeiro empreendimento do MCMV Faixa 1 em Guarulhos. Restauro de prédio tombado no Brás." },
            { year: "2006", body: "Construção de 3 escolas em estrutura 100% metálica (EE Recanto Verde Sol, EE Dom Angélico, EE Odilon Leite Ferraz)." },
            { year: "2008", body: "Atingida a marca de 5.000 UHs construídas. EE Dom Jorge de Oliveira em Mauá com estrutura pré-moldada em concreto." },
            { year: "2012", body: "Restauro de prédio tombado EE Culto à Ciência (Campinas). 2840 UHs MCMV Faixa 1 na região de Campinas." },
            { year: "2014", body: "Atingida a marca de 10.000 UHs construídas. Retrofit de galpão para Self Storage." },
            { year: "2018", body: "15.000 UHs entregues. Residenciais Phobus e Forte do Ribeira (1200 UHs MCMV Faixa 1 SP). FATEC Ferraz de Vasconcelos." },
            { year: "2019", body: "Assinada Lote 11 da PPP Habitacional COHAB-SP (1220 UHs + infraestrutura na Vila Leopoldina)." },
            { year: "2021", body: "Construção habitacional em Americana/SP. Complexo Residencial Balsas: 6 condomínios, +1.800 unidades." },
          ]}
        />

        <EmpreendimentosCarousel
          number={3}
          tag="Setor Imobiliário"
          headline="Encontre seu imóvel."
          subtitle="Empreendimentos no Jardim da Balsa 2, Americana. Lazer completo, materiais de qualidade e localização privilegiada."
          ctaLabel="Conhecer a construtora"
          ctaHref="#a-construtora"
          background="surface"
          items={empreendimentos.map((e) => ({
            slug: e.slug,
            name: e.nome,
            category: "Residencial",
            subtitle: `${e.bairro} · ${e.cidade}${e.endereco ? ` · ${e.endereco}` : ""}`,
            status: statusToCarousel[e.status],
            image: e.image,
          }))}
        />

        <MCMVSection
          number={4}
          tag="Minha Casa Minha Vida"
          headline="Sua casa com o subsídio do governo."
          subtitle="Apartamentos de 2 dormitórios com varanda. Entrada facilitada, ITBI e registro por nossa conta. Parcelas que cabem no bolso."
          benefits={[
            { prefix: "a partir de", value: "R$ 598", label: "parcela inicial" },
            { prefix: "até", value: "R$ 55 mil", label: "subsídio máximo" },
            { prefix: "100%", value: "Grátis", label: "ITBI + registro" },
          ]}
          cta={{
            label: "Quero saber se me encaixo",
            href: WHATSAPP_URL,
            whatsapp: true,
          }}
          disclaimer="Sujeito a análise de crédito · Condições conforme programa MCMV vigente"
        />

        <FAQAccordion
          number={5}
          tag="Perguntas Frequentes"
          headline="Dúvidas frequentes."
          subtitle="Não encontrou sua dúvida? Fale com a gente pelo WhatsApp."
          items={[
            {
              question: "Como funciona o financiamento dos apartamentos?",
              answer:
                "Trabalhamos com financiamento bancário (Caixa, Bradesco, Itaú, Santander) e MCMV para quem se encaixa nos critérios. Nossa equipe acompanha todo o processo de aprovação.",
            },
            {
              question: "Quem pode entrar no Minha Casa Minha Vida?",
              answer:
                "Famílias com renda mensal de até R$ 8.000 (faixa 3). Subsídio máximo de R$ 55 mil. Cada faixa tem condições próprias, e nossa equipe te ajuda a entender em qual você se encaixa.",
            },
            {
              question: "Posso visitar o apartamento decorado antes de comprar?",
              answer:
                "Sim. Agendamos a visita ao decorado e à obra (quando em construção) sem compromisso. Chame nossa equipe pelo WhatsApp e marcamos o melhor horário.",
            },
            {
              question: "Qual o prazo médio de entrega de um empreendimento?",
              answer:
                "De 24 a 36 meses contados a partir do lançamento, dependendo do porte. O cronograma é apresentado no contrato e o acompanhamento da obra é feito mês a mês.",
            },
            {
              question: "Em quais cidades a Construtora Itajaí constrói?",
              answer:
                "Americana (sede), Campinas, Ribeirão Preto, Guarulhos, São Paulo e região. Em 39 anos entregamos mais de 15.000 UHs em todo o estado.",
            },
            {
              question: "O que está incluso no valor do apartamento?",
              answer:
                "O apartamento com acabamento padrão definido no memorial descritivo, vaga de garagem (quando aplicável), e participação na área comum. Itens opcionais (decorado, móveis planejados) são contratados à parte.",
            },
            {
              question: "Vocês trabalham com investidores e corretores parceiros?",
              answer:
                "Sim. Temos programa de parceria com corretores e condições especiais para investidores. Fale com nossos consultores para conhecer as comissões e os empreendimentos em lançamento.",
            },
          ]}
        />

        <ConsultoresGrid
          number={6}
          tag="Atendimento"
          headline="Fale com nossos consultores."
          subtitle="CRECI ativo, conhecimento do produto e do mercado de Americana, Campinas e região."
          consultores={[
            {
              nome: "Mariana Costa",
              funcao: "Consultora sênior",
              registro: "CRECI/SP 234.279",
              cidade: "Americana",
              foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
            {
              nome: "Pedro Lima",
              funcao: "Consultor de imóveis",
              registro: "CRECI/SP 184.456",
              cidade: "Campinas",
              foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
            {
              nome: "Camila Tavares",
              funcao: "Consultora MCMV",
              registro: "CRECI/SP 210.091",
              cidade: "Americana",
              foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
            {
              nome: "Ricardo Mendes",
              funcao: "Gerente comercial",
              registro: "CRECI/SP 147.728",
              cidade: "Americana",
              foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&q=90",
              href: WHATSAPP_URL,
            },
          ]}
          footnote="Atendimento de segunda a sexta · 08h às 18h"
        />
      </main>

      <ContactFooter
        number={7}
        tag="Fale com a Construtora"
        headline="Vamos conversar sobre o seu próximo lar."
        cta={{
          primaryLabel: "Falar no WhatsApp",
          primaryHref: WHATSAPP_URL,
          primaryWhatsapp: true,
          secondaryLabel: PHONE,
          secondaryHref: PHONE_TEL,
        }}
        brand={{
          logo: "/images/scraped/002-LogoItajaiConstrutora.svg",
          logoAlt: "Construtora Itajaí",
          description:
            "Grupo Itajaí. Há 39 anos construindo solidez em Americana. Empreendimentos residenciais, edificações, restauros e urbanização.",
          social: [
            { Icon: IconBrandFacebook, label: "Facebook", href: "https://facebook.com/construtoraitajai" },
            { Icon: IconBrandInstagram, label: "Instagram", href: "https://instagram.com/construtoraitajai" },
          ],
        }}
        navLinks={[
          { text: "Início", href: "/#home" },
          { text: "A Construtora", href: "/#a-construtora" },
          { text: "Trajetória", href: "/#linha-do-tempo" },
          { text: "Empreendimentos", href: "/#empreendimentos" },
          { text: "MCMV", href: "/#mcmv" },
          { text: "Dúvidas", href: "/#faq" },
          { text: "Consultores", href: "/#consultores" },
        ]}
        empreendimentos={empreendimentos.map((e) => ({
          slug: e.slug,
          label: e.nome.replace(/^Residencial\s/, ""),
        }))}
        contact={{
          phone: PHONE,
          address: { line1: "Av. da Amizade, 1194", line2: "Jardim da Balsa 2 · Americana — SP" },
          schedule: "Segunda a sexta · 08h às 18h",
        }}
        copyright="© 2026 Construtora Itajaí · Grupo Itajaí"
        legal="Solidez que a competência construiu."
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
