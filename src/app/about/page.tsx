import { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About OpsKnight",
  description:
    "OpsKnight is a self-hosted incident command center. Other product names are used only to identify them. OpsKnight is not affiliated with PagerDuty or Atlassian.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 font-mono text-[11px] text-slate-500">{BRAND.version}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          About {BRAND.name}
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#4b5563]">
          <p>
            OpsKnight is a self-hosted incident command center. It exists because
            per-seat on-call products get expensive as teams grow, and because
            incident data belongs on the same infrastructure as the systems it
            describes.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">Mission</h2>
          <p>
            Make on-call, paging, war rooms, status pages, and postmortems
            available to any engineering team that can run Docker Compose or Helm
            — without a SaaS lock-in.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">License</h2>
          <p>
            The product is licensed under {BRAND.license}. Source lives on GitHub.
            There is no hosted Enterprise Cloud offering.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-[#111827]">Maintainer</h2>
          <p>Created and maintained by Dushyant Rahangdale.</p>
        </div>
        <div className="mt-12 flex gap-3">
          <a
            href={BRAND.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-[12px] bg-[#2563eb] px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            GitHub
          </a>
          <Link
            href={BRAND.links.docs}
            className="inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Docs
          </Link>
        </div>
      </div>
    </main>
  );
}
