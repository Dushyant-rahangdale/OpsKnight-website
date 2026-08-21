import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { DeploymentHub } from "@/components/showcase/DeploymentHub";
import { latestDocsHref } from "@/lib/docs/paths";
import { Server, ArrowRight, BookOpen } from "lucide-react";

const title = "Deploy & Install OpsKnight";
const description =
  "Deploy OpsKnight across Docker Compose, Kubernetes (Helm / Kustomize), Cloud Run, ECS, or Linux Systemd. $0 license, 100% self-hosted on your infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/install" },
  openGraph: { title, description, url: "/install" },
};

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#d21a1b] text-xs font-semibold mb-4">
            <Server className="w-3.5 h-3.5" />
            <span>v{BRAND.version} · {BRAND.license} · 100% Self-Hosted</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
            Deploy on your machines in minutes.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
            OpsKnight runs directly on infrastructure you control — from a single $5 VPS with Docker Compose to multi-replica Kubernetes clusters with Helm.
          </p>
        </div>
      </section>

      {/* Main Deployment Hub */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          <DeploymentHub />

          {/* Architecture & Scope Callout */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">What to expect after deployment</h3>
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  OpsKnight is an independent open-source on-call and incident management platform. There is no hosted SaaS cloud or user seat fees. After booting your instance, visit <code className="font-mono text-xs text-[#d21a1b]">/setup</code> to initialize your primary admin account, then configure your inbound monitoring webhooks in the Web Console.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#d21a1b]">
                  <Link
                    href={latestDocsHref("getting-started/installation")}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Read complete installation guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={latestDocsHref("deployment/monitoring")}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    <span>Instance health &amp; Prometheus telemetry</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
