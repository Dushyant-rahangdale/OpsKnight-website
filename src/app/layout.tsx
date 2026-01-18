import type { Metadata } from "next";
import { Inter, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opssentinel.com"),
  title: "OpsSentinel | Open-Source Incident Management Platform",
  description:
    "The complete open-source platform for on-call management, incident response, and status pages. Self-hosted, extensible, and built for DevOps & SRE teams.",
  keywords: [
    "incident management",
    "on-call",
    "DevOps",
    "SRE",
    "status page",
    "open source",
    "PagerDuty alternative",
  ],
  openGraph: {
    title: "OpsSentinel | Open-Source Incident Management Platform",
    description:
      "The complete open-source platform for on-call management, incident response, and status pages.",
    url: "https://opssentinel.com",
    siteName: "OpsSentinel",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "OpsSentinel - Open-Source Incident Management",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpsSentinel | Open-Source Incident Management Platform",
    description:
      "The complete open-source platform for on-call management, incident response, and status pages.",
    images: ["/banner.png"],
  },
  icons: {
    icon: "/logo-compressed.png",
    apple: "/logo-compressed.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${montserrat.variable} ${jetBrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ConditionalNavbar />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
