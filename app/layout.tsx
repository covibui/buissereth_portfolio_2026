import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/config";
import "./globals.css";

export function generateMetadata(): Metadata {
  const config = getSiteConfig();
  return {
    title: config.siteTitle,
    description: config.siteDescription,
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const config = getSiteConfig();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400&family=Archivo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="top">
        <Header config={config} />
        <main>{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
