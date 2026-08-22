import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

const title = "Compare Alternative On-Call Tools";
const description =
  `Compare ${BRAND.name} with PagerDuty, incident.io, Opsgenie, Squadcast, Splunk On-Call, and Grafana Cloud IRM.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/compare/",
  },
  openGraph: {
    title: `Compare Alternative On-Call Tools | ${BRAND.name}`,
    description,
    url: "/compare/",
  },
  twitter: {
    title: `Compare Alternative On-Call Tools | ${BRAND.name}`,
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
