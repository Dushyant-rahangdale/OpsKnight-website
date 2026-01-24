import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

const title = `Contact ${BRAND.name}`;
const description =
  `Get support, report issues, or reach the ${BRAND.name} team for partnerships and security inquiries.`;

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
