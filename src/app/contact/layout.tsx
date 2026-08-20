import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

const title = `Community | ${BRAND.name}`;
const description = `GitHub issues, discussions, email, and security advisories for ${BRAND.name}. There is no ticket desk and no SLA.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title,
    description,
    url: "/contact",
  },
  twitter: {
    title,
    description,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
