import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Folchini & Risso Advogados | Defesa Criminal Estratégica",
  description:
    "Especialistas em Direito Penal com atuação reconhecida em casos de alta complexidade nas esferas Estadual e Federal. Resultados comprovados quando mais importa.",
  openGraph: {
    title: "Folchini & Risso Advogados | Defesa Criminal Estratégica",
    description:
      "Especialistas em Direito Penal com atuação em casos de alta complexidade.",
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
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
