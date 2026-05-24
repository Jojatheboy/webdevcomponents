"use client";

import { PageLoader } from "@/components/PageLoader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { AreasAtuacao } from "@/components/AreasAtuacao";
import { Depoimentos } from "@/components/Depoimentos";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <PageLoader>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <AreasAtuacao />
        <Depoimentos />
        <CTASection />
      </main>
      <Footer />
    </PageLoader>
  );
}
