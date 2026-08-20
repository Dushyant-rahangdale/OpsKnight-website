import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Features } from "@/components/features/Features";
import { StatusPageShowcase } from "@/components/showcase/StatusPageShowcase";
import { ProductTour } from "@/components/showcase/ProductTour";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
  twitter: {
    title: BRAND.seo.title,
    description: BRAND.seo.description,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <StatusPageShowcase />
      <ProductTour />
      <Integrations />
      <Comparison />
      <Pricing />
      <CTA />
    </>
  );
}
