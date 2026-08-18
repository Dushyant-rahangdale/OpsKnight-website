import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { ProductTour } from "@/components/showcase/ProductTour";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Features } from "@/components/features/Features";
import { Integrations } from "@/components/integrations/Integrations";
import { Comparison } from "@/components/comparison/Comparison";
import { SavingsCalculator } from "@/components/calculator/SavingsCalculator";
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
      {/* 1. Hero: Core proposition + Live Beacon + 1-Click Docker Quickstart + Ecosystem Badges */}
      <Hero />

      {/* 2. Interactive Product Tour: Live 5-tab showcase with real 2x Retina screenshots & hotspots */}
      <ProductTour />

      {/* 3. How It Works: 5-step deterministic low-latency incident lifecycle pipeline */}
      <HowItWorks />

      {/* 4. Enterprise Architecture: Clean 6-card Bento Grid of core engineering capabilities */}
      <Features />

      {/* 5. 24+ Native Integrations Ecosystem */}
      <Integrations />

      {/* 6. Comparison: Transparent feature matrix vs legacy per-seat vendors */}
      <Comparison />

      {/* 7. Savings Calculator: Interactive ROI math slider */}
      <SavingsCalculator />

      {/* 8. Pricing: Community Edition ($0 Forever) vs Enterprise Cloud */}
      <Pricing />

      {/* 9. Final High-Conversion 1-Command Deploy CTA */}
      <CTA />
    </>
  );
}
