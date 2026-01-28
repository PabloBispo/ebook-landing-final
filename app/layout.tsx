import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Masterclass: Crie Ebooks com IA em 3-5 Dias",
    template: "%s | Ebooks com IA"
  },
  description: "Aprenda a criar ebooks profissionais usando Inteligência Artificial, mantendo sua voz autoral e qualidade editorial. Transforme seu conhecimento em produtos digitais de alta conversão.",
  keywords: ["ebooks", "inteligência artificial", "IA", "criação de conteúdo", "marketing digital", "infoprodutos", "produtos digitais"],
  authors: [{ name: "Pablo Bispo" }],
  creator: "Pablo Bispo",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Masterclass: Crie Ebooks com IA em 3-5 Dias",
    description: "Aprenda a criar ebooks profissionais usando Inteligência Artificial, mantendo sua voz autoral e qualidade editorial.",
    siteName: "Ebooks com IA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masterclass: Crie Ebooks com IA em 3-5 Dias",
    description: "Aprenda a criar ebooks profissionais usando Inteligência Artificial, mantendo sua voz autoral e qualidade editorial.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
