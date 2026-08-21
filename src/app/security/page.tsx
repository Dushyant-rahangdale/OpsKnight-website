import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { SecurityHub } from "@/components/security/SecurityHub";
import { latestDocsHref } from "@/lib/docs/paths";
import { ShieldCheck, ArrowRight, BookOpen } from "lucide-react";

const title = "Security & Hardening Architecture";
const description =
  "Cryptographic envelope encryption (AES-256-CBC), timing-safe webhook verification, OIDC SSO, and VPC network isolation in OpsKnight.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/security" },
  openGraph: { title, description, url: "/security" },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fail-Closed Security Model · 100% Self-Hosted</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
            Security, Cryptography &amp; Hardening
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg max-w-2xl mx-auto">
            Incident data, on-call schedules, and API credentials stay strictly within your VPC. Designed with zero third-party telemetry, AES-256 envelope encryption, and timing-safe webhook verification.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          <SecurityHub />

          {/* Bottom Resource Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">Security Documentation &amp; Compliance Inquiries</h3>
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  All cryptographic specifications and role-based access controls are documented directly in the codebase. To audit the open-source code or review specific integration verifiers, explore the security guides in our technical documentation.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#d21a1b]">
                  <Link
                    href={latestDocsHref("security")}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Explore full security &amp; compliance docs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={`mailto:${BRAND.links.email}`}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    <span>Contact security maintainers</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
