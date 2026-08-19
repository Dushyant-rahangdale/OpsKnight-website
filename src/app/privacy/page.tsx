import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for the ${BRAND.name} website.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: August 18, 2026</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#4b5563]">
          <p>
            This policy covers the public website at {BRAND.domain}. It does not
            cover data inside a self-hosted OpsKnight instance.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Self-hosted product
          </h2>
          <p>
            When you run OpsKnight, incident data, schedules, and users stay on
            your infrastructure. The project maintainers cannot see that data.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            This website
          </h2>
          <p>
            The marketing site may use privacy-respecting analytics (Cloudflare)
            for aggregate traffic. It is not used to profile individuals across
            the web.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">Contact</h2>
          <p>
            Questions: {BRAND.links.email} or the GitHub repository.
          </p>
        </div>
      </div>
    </main>
  );
}
