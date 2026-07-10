import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/hooks/useAccessibility";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "V.I.B.E. — Voice · Intelligence · Beauty · Experience",
    template: "%s | V.I.B.E.",
  },
  description: "Converse com arte através da voz. IA em tempo real, LIBRAS e acessibilidade total.",
  keywords: ["museu", "arte", "inteligência artificial", "voz", "LIBRAS", "acessibilidade"],
  authors: [{ name: "V.I.B.E." }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "V.I.B.E.",
    title: "V.I.B.E. — Arte que fala com você",
    description: "Converse por voz com obras-primas. IA em tempo real, LIBRAS, acessibilidade plena.",
  },
  twitter: {
    card: "summary_large_image",
    title: "V.I.B.E. — Arte que fala com você",
    description: "Converse por voz com obras-primas. IA em tempo real.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="antialiased min-h-screen" style={{ background: "var(--vibe-paper)", color: "var(--vibe-ink)" }}>
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  );
}
