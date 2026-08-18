import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { ProductTour } from "@/components/showcase/ProductTour";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Features } from "@/components/features/Features";
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
      {/* 1. Hero: Core proposition + Live Red Beacon + 1-Click Deployment Quickstarts */}
      <Hero />

      {/* 2. Interactive Product Tour: Live 5-tab showcase with real 2x Retina screenshots & authentic Slack dark mode canvas */}
      <ProductTour />

      {/* 3. How It Works: 5-step deterministic low-latency incident lifecycle pipeline with speedometers */}
      <HowItWorks />

      {/* 4. Enterprise Architecture: Clean 6-card Bento Grid of verified core engineering capabilities */}
      <Features />

      {/* 5. 24+ Native Integrations Ecosystem */}
      <Integrations />

      {/* 6. Comparison & ROI: Feature parity matrix + Compact interactive infrastructure savings calculator */}
      <Comparison />

      {/* 7. Pricing: Community Edition ($0 Forever) vs Enterprise Cloud */}
      <Pricing />

      {/* 8. Final High-Conversion 1-Command Deploy CTA */}
      <CTA />
    </>
  );
}
