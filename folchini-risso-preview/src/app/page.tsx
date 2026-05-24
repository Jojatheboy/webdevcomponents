import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Especialidades from "@/components/Especialidades";
import Diferenciais from "@/components/Diferenciais";
import Depoimentos from "@/components/Depoimentos";
import CasosNaMidia from "@/components/CasosNaMidia";
import Equipe from "@/components/Equipe";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <PageLoader>
      <Header />
      <main>
        <Hero />
        <Especialidades />
        <Diferenciais />
        <Depoimentos />
        <CasosNaMidia />
        <Equipe />
        <CTASection />
      </main>
      <Footer />
    </PageLoader>
  );
}
