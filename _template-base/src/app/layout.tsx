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

// TROCAR POR CLIENTE
export const metadata: Metadata = {
  title: "{{CLIENT_NAME}}",
  description: "{{CLIENT_DESCRIPTION}}",
  openGraph: {
    title: "{{CLIENT_NAME}}",
    description: "{{CLIENT_DESCRIPTION}}",
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
