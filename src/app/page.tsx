import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Features } from "@/components/features/Features";
import { ProductTour } from "@/components/showcase/ProductTour";
import { Integrations } from "@/components/integrations/Integrations";
import { Comparison } from "@/components/comparison/Comparison";
import { Pricing } from "@/components/pricing/Pricing";
import { CTA } from "@/components/cta/CTA";
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
      <ProductTour />
      <Integrations />
      <Comparison />
      <Pricing />
      <CTA />
    </>
  );
}
