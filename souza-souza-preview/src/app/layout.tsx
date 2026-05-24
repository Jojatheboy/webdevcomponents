import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Souza & Souza Advogados Associados | Londrina - PR",
  description:
    "Escritório de advocacia em Londrina/PR com mais de 14 anos de experiência. Especialistas em Direito Trabalhista, Cível e Previdenciário. 991 avaliações 5 estrelas no Google.",
  keywords:
    "advogado londrina, direito trabalhista, direito cível, direito previdenciário, advocacia londrina, souza e souza advogados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
