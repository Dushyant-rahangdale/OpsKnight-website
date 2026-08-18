import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { ProductTour } from "@/components/showcase/ProductTour";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Features } from "@/components/features/Features";
import { SlackChatOps } from "@/components/chatops/SlackChatOps";
import { DeveloperExperience } from "@/components/developer/DeveloperExperience";
import { PagerDutyMigration } from "@/components/migration/PagerDutyMigration";
import { SavingsCalculator } from "@/components/calculator/SavingsCalculator";
import { Stats } from "@/components/stats/Stats";
import { Integrations } from "@/components/integrations/Integrations";
import { Comparison } from "@/components/comparison/Comparison";
import { SocialProof } from "@/components/social-proof/SocialProof";
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
      <ProductTour />
      <HowItWorks />
      <Features />
      <SlackChatOps />
      <DeveloperExperience />
      <PagerDutyMigration />
      <SavingsCalculator />
      <Stats />
      <Integrations />
      <Comparison />
      {/* Testimonials omitted until verified real user quotes are available */}
      <SocialProof />
      <Pricing />
      <CTA />
    </>
  );
}
