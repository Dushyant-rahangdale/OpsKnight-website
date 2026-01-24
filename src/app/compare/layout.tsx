import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

const title = `Compare ${BRAND.name}`;
const description =
  `Compare ${BRAND.name} with PagerDuty, incident.io, and OpsGenie to find the best fit for your incident response stack.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title,
    description,
    url: "/compare",
  },
  twitter: {
    title,
    description,
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
