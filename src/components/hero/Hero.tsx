"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { BRAND } from "@/lib/brand";

type DeployMethod = "compose" | "docker" | "helm";

export function Hero() {
  const [deployMethod, setDeployMethod] = useState<DeployMethod>("compose");
  const [copied, setCopied] = useState(false);
  const [showRun, setShowRun] = useState(false);

  const deployCommands: Record<DeployMethod, string> = {
    compose: BRAND.deploy.compose,
    docker: BRAND.deploy.docker,
    helm: BRAND.deploy.helm,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(deployCommands[deployMethod]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] pt-28 pb-16 md:pt-36 md:pb-20">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            {BRAND.name} {BRAND.version} · you run it · {BRAND.license}
          </p>
          <h1 className="text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
            The 2am page should live on your servers — not in a SaaS you rent per person.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4b5563] sm:text-xl">
            When production breaks, OpsKnight messages whoever is on call, opens
            a Slack room for the incident, and gives customers a status page.
            Afterward you write what happened. One product. Your machines. No
            per-person software fee.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-[12px] bg-[#2563eb] px-7 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
            >
              See how a night goes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={BRAND.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#2563eb] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              Source on GitHub
            </Link>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_28px_56px_-28px_rgba(15,23,42,0.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Workflow failed: Docker Image (build + push)
              </p>
              <p className="mt-0.5 text-xs text-[#4b5563]">
                Open incident · assigned · timeline on the same screen
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-700">
              Open
            </span>
          </div>
          <div className="relative aspect-[16/9] bg-slate-100 sm:aspect-[2/1]">
            <Image
              src="/incident-detail-timeline.png"
              alt="An open OpsKnight incident with assignee, urgency, and description"
              fill
              className="object-cover object-[center_22%]"
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={() => setShowRun((v) => !v)}
            className="text-sm font-medium text-slate-600 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            {showRun ? "Hide how to run it" : "How to run it on your machines"}
          </button>
          {showRun && (
            <div className="mt-4 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
                <div className="flex flex-wrap items-center gap-1">
                  {(["compose", "docker", "helm"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDeployMethod(method)}
                      className={`rounded-md px-3 py-1 text-xs font-medium capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] ${
                        deployMethod === method
                          ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {method === "compose"
                        ? "Compose"
                        : method === "docker"
                          ? "Docker (your database)"
                          : "Helm"}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-slate-800"
                  title="Copy command"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[#059669]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="bg-[#0f172a] p-4 font-mono text-[11px] leading-relaxed text-slate-200 sm:text-xs">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Needs NEXTAUTH_SECRET and ENCRYPTION_KEY</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap text-left text-slate-100">
                  {deployCommands[deployMethod]}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
