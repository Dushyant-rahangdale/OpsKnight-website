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
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] pt-24 pb-10 md:pt-28 md:pb-14 lg:min-h-[min(100vh,920px)] lg:pt-32 lg:pb-16">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(280px,0.92fr)_minmax(420px,1.18fr)] lg:gap-10 xl:gap-12">
          <div className="max-w-xl lg:max-w-none">
            <p className="mb-5 font-mono text-[11px] font-medium tracking-wide text-slate-500">
              {BRAND.name} {BRAND.version} · you run it · {BRAND.license}
            </p>
            <h1 className="text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] xl:text-[2.9rem]">
              The 2am page should live on your servers — not in a SaaS you rent
              per person.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
              When production breaks, OpsKnight messages whoever is on call,
              opens a Slack room for the incident, and gives customers a status
              page. Afterward you write what happened. One product. Your
              machines. No per-person software fee.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
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
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowRun((v) => !v)}
                className="text-sm font-medium text-slate-600 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
              >
                {showRun
                  ? "Hide how to run it"
                  : "How to run it on your machines"}
              </button>
            </div>
          </div>

          <div className="-mx-4 sm:-mx-6 lg:mx-0 lg:-mr-4 xl:-mr-8">
            <div className="overflow-hidden rounded-none border-y border-slate-200 bg-white shadow-[0_28px_56px_-28px_rgba(15,23,42,0.35)] sm:rounded-[14px] sm:border lg:rounded-[16px]">
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2.5">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
                </div>
                <p className="min-w-0 truncate font-mono text-[11px] text-slate-500">
                  localhost:3000
                </p>
              </div>
              <div className="relative h-[min(52vh,420px)] bg-slate-100 sm:h-[min(48vh,480px)] lg:h-[min(62vh,560px)]">
                <Image
                  src="/command-center.png"
                  alt="OpsKnight Command Center with sidebar navigation, incident metric cards, filters, and quick actions"
                  fill
                  className="object-cover object-left-top"
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>

        {showRun && (
          <div className="mt-6 overflow-hidden rounded-[14px] border border-slate-200 bg-white lg:mt-8">
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
    </section>
  );
}
