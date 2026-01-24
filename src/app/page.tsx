import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Features } from "@/components/features/Features";
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
      <Features />
      <Stats />
      <Integrations />
      <Comparison />
      {/* <Testimonials /> */}
      <SocialProof />
      <Pricing />
      <CTA />
    </>
  );
}
