import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Loader } from "@/components/Loader";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Dra. Eliane Ferreira | Advocacia em Cachoeirinha/RS",
  description:
    "Advogada OAB/RS 122.161, em Cachoeirinha/RS, com mais de 10 anos de carreira. Especialista em Direito do Trabalho, Famílias, Previdenciário e Cível. +800 clientes atendidos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${dmSerif.variable}`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Loader />
        {children}
      </body>
    </html>
  );
}
