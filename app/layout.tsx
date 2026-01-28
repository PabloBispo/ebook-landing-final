import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
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
    default: "@bispo.ia | Tire isso aí do papel",
    template: "%s | @bispo.ia"
  },
  description: "Você sabe o que a IA consegue fazer. Mas ainda não conseguiu fazer nada útil com ela. Vamos te ajudar a tirar isso aí do papel.",
  keywords: ["ebooks", "inteligência artificial", "IA", "criação de conteúdo", "bispo.ia", "infoprodutos", "produtos digitais", "ebooks com IA"],
  authors: [{ name: "Pablo Bispo", url: "https://bispo.ia" }],
  creator: "@bispo.ia",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "@bispo.ia | Tire isso aí do papel",
    description: "Você sabe o que a IA consegue fazer. Mas ainda não conseguiu fazer nada útil com ela. Vamos te ajudar a tirar isso aí do papel.",
    siteName: "@bispo.ia",
  },
  twitter: {
    card: "summary_large_image",
    title: "@bispo.ia | Tire isso aí do papel",
    description: "Você sabe o que a IA consegue fazer. Mas ainda não conseguiu fazer nada útil com ela. Vamos te ajudar a tirar isso aí do papel.",
    creator: "@bispo_ia",
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
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
