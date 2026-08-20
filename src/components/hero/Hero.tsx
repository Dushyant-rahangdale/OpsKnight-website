"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Copy, Check, Github } from "lucide-react";
import { BRAND } from "@/lib/brand";

type DeployTab = "compose" | "docker" | "helm" | "kustomize";

export function Hero() {
  const [activeDeploy, setActiveDeploy] = useState<DeployTab>("compose");
  const [copied, setCopied] = useState(false);

  const deployCommands: Record<DeployTab, string> = {
    compose: BRAND.deploy.compose,
    docker: BRAND.deploy.docker,
    helm: BRAND.deploy.helm,
    kustomize: BRAND.deploy.kustomize,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(deployCommands[activeDeploy]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#d21a1b]/[0.07] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[22rem] w-[22rem] rounded-full bg-slate-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <p className="mb-5 font-mono text-xs font-medium tracking-wide text-slate-500 sm:text-[13px]">
              {BRAND.name} {BRAND.version} · {BRAND.license} · you run it
            </p>

            <h1 className="mb-6 max-w-xl text-3xl font-bold leading-[1.12] tracking-tight text-[#111827] sm:text-5xl lg:text-[3.25rem]">
              The 2am page should live on your servers — not in a SaaS you rent per person.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[#4b5563] sm:text-lg">
              When production breaks, OpsKnight messages whoever is on call, opens a Slack room, and gives customers a status page. Afterward you write what happened. One product. Your machines.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              Built for teams that already run Postgres and would rather operate a pager than pay per seat. Not a hosted cloud, and not native voice calls.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/install"
                className="inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-[#d21a1b] px-7 text-sm font-semibold tracking-wide text-white shadow-sm shadow-red-700/20 transition-all hover:bg-[#b41516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b] sm:w-auto"
              >
                Install
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={BRAND.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center rounded-[12px] border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 sm:w-auto"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="#product-tour"
                className="text-center text-sm font-semibold text-slate-700 hover:text-slate-900 hover:underline sm:text-left"
              >
                See the product
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "License", value: BRAND.license },
                { label: "Parsers", value: BRAND.integrationCountLabel },
                { label: "Deploy", value: "Compose / Helm" },
                { label: "Hosting", value: "Your VPC" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-wide text-slate-400">{item.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#111827]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[22px] bg-gradient-to-br from-[#d21a1b]/15 via-transparent to-slate-400/20 blur-xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[16px] border border-slate-800 bg-[#0f172a] shadow-2xl shadow-slate-900/20">
              <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
                <span className="ml-3 truncate font-mono text-[11px] text-slate-400">
                  Command center · {BRAND.name} {BRAND.version}
                </span>
              </div>
              <Image
                src={BRAND.assets.dashboard}
                alt="OpsKnight command center on a real install — open incidents, on-call, and MTTA/MTTR"
                width={1600}
                height={1000}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl lg:mx-0 lg:max-w-none">
          <div className="overflow-hidden rounded-[16px] border border-slate-800 bg-[#0f172a] shadow-lg shadow-slate-900/10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
              <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-[#020617] p-1">
                {(["compose", "docker", "helm", "kustomize"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveDeploy(tab)}
                    className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold transition-all ${
                      activeDeploy === tab
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === "compose" ? "Compose" : tab === "docker" ? "Docker" : tab === "helm" ? "Helm" : "Kustomize"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#059669]" />
                    <span className="text-[#059669]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200 sm:p-5 sm:text-[13px]">
              {deployCommands[activeDeploy]}
            </pre>
            <p className="border-t border-slate-800 px-4 py-3 text-left text-[11px] leading-relaxed text-slate-400">
              {BRAND.deploy.secretsNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
