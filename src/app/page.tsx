import { Hero } from "@/components/hero/Hero";
import { Features } from "@/components/features/Features";
import { Integrations } from "@/components/integrations/Integrations";
import { SocialProof } from "@/components/social-proof/SocialProof";
import { Pricing } from "@/components/pricing/Pricing";
import { CTA } from "@/components/cta/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Integrations />
      <SocialProof />
      <Pricing />
      <CTA />
    </>
  );
}
