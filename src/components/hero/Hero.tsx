"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { MacBookFrame } from "./MacBookFrame";
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
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:min-h-[min(calc(100svh-3.5rem),54rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16 xl:max-w-7xl xl:gap-16 xl:px-10 2xl:max-w-[90rem] 2xl:gap-20 2xl:px-16">
        <div className="w-full lg:w-[54%] lg:max-w-[40rem] 2xl:max-w-[46rem]">
          <MacBookFrame
            src="/command-center.png"
            alt="OpsKnight Command Center on a laptop — incident totals, filters, and live status"
          />
        </div>

        <div className="w-full max-w-xl lg:w-[46%] lg:max-w-[36rem] 2xl:max-w-[40rem]">
          <p className="mb-4 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            {BRAND.name} {BRAND.version} · you run it · {BRAND.license}
          </p>
          <h1 className="text-[1.9rem] font-semibold leading-[1.14] tracking-tight text-[#111827] sm:text-[2.25rem] lg:text-[2.45rem] lg:leading-[1.15] xl:text-[2.75rem] 2xl:text-[3.1rem] 2xl:leading-[1.12]">
            The 2am page should live on your servers — not in a SaaS you rent
            per person.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#4b5563] sm:text-base xl:text-lg">
            When production breaks, OpsKnight messages whoever is on call, opens
            a Slack room, and gives customers a status page. Afterward you write
            what happened. One product. Your machines.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-[12px] bg-[#2563eb] px-8 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
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
          <button
            type="button"
            onClick={() => setShowRun((v) => !v)}
            className="mt-5 text-sm font-medium text-slate-600 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            {showRun ? "Hide how to run it" : "How to run it on your machines"}
          </button>
        </div>
      </div>

      {showRun && (
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-6 xl:max-w-7xl xl:px-10 2xl:max-w-[90rem] 2xl:px-16">
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white">
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
        </div>
      )}
    </section>
  );
}
