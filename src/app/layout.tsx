import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, JetBrains_Mono } from "next/font/google"; // [MODIFIED]
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";

const baseUrl = `https://${BRAND.domain}`;
const mergedKeywords = Array.from(
  new Set([...(BRAND.keywords || []), ...(BRAND.seo.keywords || [])])
);
const twitterHandle =
  BRAND.links.twitter?.includes("twitter.com/")
    ? `@${BRAND.links.twitter.split("twitter.com/")[1]?.replace(/\/.*/, "")}`
    : undefined;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: baseUrl,
    logo: `${baseUrl}${BRAND.assets.logo}`,
    sameAs: [BRAND.links.github, BRAND.links.twitter].filter(Boolean),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: baseUrl,
    description: BRAND.seo.description,
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
    },
  },
];

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
  title: {
    default: BRAND.seo.title,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.seo.description,
  keywords: mergedKeywords,
  applicationName: BRAND.name,
  creator: BRAND.authors?.[0]?.name,
  publisher: BRAND.name,
  authors: BRAND.authors ? BRAND.authors.map(author => ({ ...author })) : undefined,
  category: "Technology",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: BRAND.seo.title,
    description: BRAND.seo.description,
    url: baseUrl,
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
    title: BRAND.seo.title,
    description: BRAND.seo.description,
    images: [BRAND.assets.banner],
    site: twitterHandle,
    creator: twitterHandle,
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png', // Fallback to logo.png as explicit apple icon might be missing
  },
  metadataBase: new URL(baseUrl),
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
        suppressHydrationWarning
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ConditionalNavbar />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
