import {
  IconBuilding,
  IconBuildingSkyscraper,
  IconBuildingCommunity,
  IconBuildingArch,
  IconBuildings,
  IconHome,
  IconSun,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

export type Status = "vendido" | "pronto";

export type Empreendimento = {
  slug: string;
  nome: string;
  cidade: string;
  status: Status;
  ano?: string;
  unidades?: number;
  image?: string;
  placeholder?: string;
  description: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
};

export const empreendimentos: Empreendimento[] = [
  {
    slug: "le-havre-residence",
    nome: "Le Havre Residence",
    cidade: "Itajaí",
    status: "pronto",
    ano: "2023",
    unidades: 32,
    image: "/images/le-havre-fachada.jpg",
    description:
      "Edifício residencial completo com vista panorâmica em uma das melhores localizações de Itajaí. Lazer integrado, salão de festas e áreas comuns premium.",
    Icon: IconBuildingSkyscraper,
  },
  {
    slug: "condominio-residencial-perola",
    nome: "Condomínio Residencial Pérola",
    cidade: "Itajaí",
    status: "vendido",
    ano: "2019",
    unidades: 24,
    image: "/images/emp-perola.png",
    description: "Empreendimento entregue 100% vendido em Itajaí.",
    Icon: IconBuilding,
  },
  {
    slug: "residencial-indianopolis",
    nome: "Residencial Indianópolis",
    cidade: "Balneário Camboriú",
    status: "vendido",
    ano: "2017",
    unidades: 36,
    image: "/images/emp-indianopolis.png",
    description: "Edifício residencial em Balneário Camboriú.",
    Icon: IconBuildingArch,
  },
  {
    slug: "residencial-cidade-de-blumenau",
    nome: "Residencial Cidade de Blumenau",
    cidade: "Navegantes",
    status: "vendido",
    ano: "2013",
    unidades: 30,
    image: "/images/emp-cidade-blumenau.png",
    description: "Empreendimento entregue em Navegantes.",
    Icon: IconBuildingCommunity,
  },
  {
    slug: "residencial-jose-ferreira-leal",
    nome: "Residencial José Ferreira Leal",
    cidade: "Navegantes",
    status: "vendido",
    ano: "2011",
    unidades: 28,
    image: "/images/emp-jose-ferreira-leal.png",
    description: "Edifício residencial em Navegantes.",
    Icon: IconBuildings,
  },
  {
    slug: "condominio-residencial-raio-de-sol",
    nome: "Condomínio Residencial Raio de Sol",
    cidade: "Itajaí",
    status: "vendido",
    ano: "2009",
    unidades: 34,
    image: "/images/emp-raio-de-sol.png",
    description: "Condomínio com área de lazer completa.",
    Icon: IconSun,
  },
];

export const HomeIcon = IconHome;
