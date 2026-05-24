import {
  IconBuilding,
  IconBuildingSkyscraper,
  IconBuildingCommunity,
  IconBuildingArch,
  IconBuildings,
  IconHome,
  IconBuildingEstate,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

export type Status = "em-obras" | "ultimas" | "entregue";

export type Empreendimento = {
  slug: string;
  nome: string;
  bairro: string;
  cidade: string;
  endereco?: string;
  status: Status;
  ano?: string;
  unidades?: string; // texto livre (ex: "100% vendido", "Últimas unidades", "Em construção")
  image?: string;
  description: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
};

export const empreendimentos: Empreendimento[] = [
  {
    slug: "residencial-iracema",
    nome: "Residencial Iracema",
    bairro: "Jardim da Balsa 2",
    cidade: "Americana",
    endereco: "Av. da Amizade, 1194",
    status: "em-obras",
    unidades: "Em Construção",
    image: "/images/scraped/013-iracema-banner-site-1080-380px-3-88865ab2-2880w.png",
    description:
      "Condomínio fechado com lazer completo às margens do Rio Piracicaba. Piscina, quadra poliesportiva, salão de festas e área com churrasqueira.",
    Icon: IconBuildingSkyscraper,
  },
  {
    slug: "residencial-janaina",
    nome: "Residencial Janaína",
    bairro: "Jardim da Balsa 2",
    cidade: "Americana",
    endereco: "Av. da Amizade, 1194",
    status: "ultimas",
    unidades: "Últimas unidades",
    image: "/images/scraped/010-IMA-COND_JANAINA-FACHADA-R01-2880w.jpg",
    description:
      "Apartamento padrão Jardim da Balsa II. Acabamento de qualidade, localização estratégica e últimas unidades disponíveis.",
    Icon: IconBuilding,
  },
  {
    slug: "residencial-jacy",
    nome: "Residencial Jacy",
    bairro: "Jardim da Balsa 2",
    cidade: "Americana",
    endereco: "Rua Aparecida Tognetta Bassette, 1565",
    status: "entregue",
    ano: "Entregue",
    unidades: "100% vendido",
    image: "/images/scraped/008-americana-apartamento-padrao-jardim-da-balsa-ii-24-03-2022_08-11-18-0-2880w.jpeg",
    description: "Empreendimento entregue 100% comercializado.",
    Icon: IconBuildingCommunity,
  },
  {
    slug: "residencial-inae",
    nome: "Residencial Inaê",
    bairro: "Jardim da Balsa 2",
    cidade: "Americana",
    endereco: "Rua Rio Açu, 45",
    status: "entregue",
    ano: "Entregue",
    unidades: "100% vendido",
    image: "/images/scraped/009-apartamento-com-2-quartos-para-alugar-55m-no-jardim-da-balsa-ii-americana-2880w.jpeg",
    description: "Apartamentos de 2 quartos, 55m². Entregue e 100% comercializado.",
    Icon: IconBuildingArch,
  },
  {
    slug: "residencial-taina",
    nome: "Residencial Tainá",
    bairro: "Jardim da Balsa 2",
    cidade: "Americana",
    endereco: "Rua Aparecida Tognetta Bassette, 1565",
    status: "entregue",
    ano: "Entregue",
    unidades: "100% vendido",
    image: "/images/scraped/011-TORRE_JPG-baad7614-2880w.jpg",
    description: "Empreendimento entregue. Padrão Jardim da Balsa II.",
    Icon: IconBuildingEstate,
  },
  {
    slug: "residencial-ponta",
    nome: "Residencial Ponta",
    bairro: "Jardim da Balsa 2",
    cidade: "Americana",
    status: "entregue",
    ano: "Entregue",
    unidades: "100% vendido",
    image: "/images/scraped/012-PONTA-3013f4ca-2880w.png",
    description: "Empreendimento entregue, localização privilegiada.",
    Icon: IconBuildings,
  },
];

export const HomeIcon = IconHome;
