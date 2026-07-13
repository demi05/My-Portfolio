import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://demiladeleshi-portfolio.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Demilade Leshi Portfolio",
  description:
    "Frontend developer building production interfaces with React, Next.js, and TypeScript. Built Chatter, a full-stack publishing platform, solo, in 10 days.",
  openGraph: {
    title: "Demilade Leshi Portfolio",
    description:
      "Frontend developer building production interfaces with React, Next.js, and TypeScript.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leshi Taiwo Oluwademilade — Frontend Engineer",
    description:
      "Frontend developer building production interfaces with React, Next.js, and TypeScript.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}