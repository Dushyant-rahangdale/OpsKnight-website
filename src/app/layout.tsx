import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google"; // [MODIFIED]
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ... (unchanged)
  title: 'OpsKnight | Incident Management',
  description: BRAND.description,
  keywords: [...BRAND.keywords],
  openGraph: {
    title: 'OpsKnight | Incident Management',
    description: BRAND.description,
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    images: [
      {
        url: BRAND.assets.banner,
        width: 1200,
        height: 630,
        alt: `${BRAND.name} - ${BRAND.tagline}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'OpsKnight | Incident Management',
    description: BRAND.description,
    images: [BRAND.assets.banner],
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png', // Fallback to logo.png as explicit apple icon might be missing
  },
  metadataBase: new URL(`https://${BRAND.domain}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${manrope.variable} ${jetBrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ConditionalNavbar />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
