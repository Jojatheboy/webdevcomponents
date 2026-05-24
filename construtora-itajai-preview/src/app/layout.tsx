import type { Metadata } from "next";
import { Instrument_Serif, DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
});
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Construtora Itajaí | 39 anos construindo solidez em Americana — SP",
  description:
    "Construtora Itajaí (Grupo Itajaí). Desde 1986 em Americana, SP. Empreendimentos residenciais, programa Minha Casa Minha Vida com subsídio de até R$ 55 mil e parcelas a partir de R$ 598/mês.",
  openGraph: {
    title: "Construtora Itajaí | 39 anos construindo solidez",
    description: "Empreendimentos residenciais em Americana, SP. MCMV com subsídio até R$ 55 mil.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${instrument.variable} ${dmSerif.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
