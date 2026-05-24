import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Areas } from "@/components/Areas";
import { Diferencial } from "@/components/Diferencial";
import { QuemSou } from "@/components/QuemSou";
import { Etica } from "@/components/Etica";
import { Depoimentos } from "@/components/Depoimentos";
import { ComoFunciona } from "@/components/ComoFunciona";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Areas />
        <Diferencial />
        <QuemSou />
        <Etica />
        <Depoimentos />
        <ComoFunciona />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
