import Navbar from "@/components/blocks/Navbar";
import Hero from "@/components/Hero";
import AConstrutora from "@/components/AConstrutora";
import Empreendimentos from "@/components/Empreendimentos";
import MCMV from "@/components/MCMV";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import FloatingContact from "@/components/FloatingContact";
import GradualBlur from "@/components/ui/GradualBlur";

export default function Home() {
  return (
    <Loader>
      <Navbar />
      <main>
        <Hero />
        <AConstrutora />
        <Empreendimentos />
        <MCMV />
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
