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

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABDO Construções e Incorporações | 28 anos construindo em Itajaí",
  description:
    "Construtora ABDO. 28 anos construindo apartamentos com padrão de qualidade em Itajaí, Balneário Camboriú e Navegantes. 8 empreendimentos entregues, 212 unidades, 25 mil m² construídos.",
  openGraph: {
    title: "ABDO Construções e Incorporações | 28 anos em Itajaí",
    description:
      "8 empreendimentos entregues. 212 unidades. 25 mil m² construídos no litoral de Santa Catarina.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
