import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for the ${BRAND.name} website. The software is licensed under Apache-2.0.`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: August 20, 2026</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#4b5563]">
          <p>
            These terms cover the public website at {BRAND.domain}. Downloading
            or running the OpsKnight software is governed only by the{" "}
            <a
              href={BRAND.links.license}
              className="text-[#2563eb] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apache License 2.0
            </a>{" "}
            in the source repository — not by a separate commercial EULA.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Apache License 2.0
          </h2>
          <p>
            Copyright notices, patent grant, redistribution conditions, and the
            disclaimer of warranty and limitation of liability are those in
            Apache License 2.0, including Sections 7 (Disclaimer of Warranty)
            and 8 (Limitation of Liability). We do not add a MIT-style license
            on top of that.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Website
          </h2>
          <p>
            The marketing site is provided as-is. There is no support SLA.
            Trademarks of other companies (including PagerDuty, Slack, and
            Grafana) belong to their owners. OpsKnight is not affiliated with
            them. Names and marks appear only to identify products we compare
            or ingest from.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">Changes</h2>
          <p>
            We may update these terms. Material changes will be dated at the
            top of this page.
          </p>
        </div>
      </div>
    </main>
  );
}
