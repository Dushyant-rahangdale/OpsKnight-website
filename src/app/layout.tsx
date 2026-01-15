import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpsSentinal | Open-Source Incident Management Platform",
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
    title: "OpsSentinal | Open-Source Incident Management Platform",
    description:
      "The complete open-source platform for on-call management, incident response, and status pages.",
    url: "https://opssentinal.com",
    siteName: "OpsSentinal",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "OpsSentinal - Open-Source Incident Management",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpsSentinal | Open-Source Incident Management Platform",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
