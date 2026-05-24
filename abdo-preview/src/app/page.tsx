import Navbar from "@/components/blocks/Navbar";
import Hero from "@/components/Hero";
import AConstrutora from "@/components/AConstrutora";
import ACidade from "@/components/ACidade";
import Empreendimentos from "@/components/Empreendimentos";
import FAQ from "@/components/FAQ";
import Consultores from "@/components/Consultores";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import GradualBlur from "@/components/ui/GradualBlur";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <Loader>
      <Navbar />
      <main>
        <Hero />
        <AConstrutora />
        <ACidade />
        <Empreendimentos />
        <FAQ />
        <Consultores />
      </main>
      <Footer />
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
