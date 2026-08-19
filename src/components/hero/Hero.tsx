"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { BRAND } from "@/lib/brand";

type DeployTab = "compose" | "docker" | "helm" | "kustomize";

export function Hero() {
  const [activeDeploy, setActiveDeploy] = useState<DeployTab>("compose");
  const [copied, setCopied] = useState(false);
  const [showDeployBox, setShowDeployBox] = useState(false);

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
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs font-medium tracking-wide text-slate-500 sm:text-[13px]">
          {BRAND.name} {BRAND.version} · {BRAND.license} · you run it
        </p>

        <h1 className="mx-auto mb-6 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-[#111827] sm:text-5xl lg:text-[3.5rem]">
          The 2am page should live on your servers — not in a SaaS you rent per person.
        </h1>

        <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4b5563] sm:text-lg lg:text-xl">
          When production breaks, OpsKnight messages whoever is on call, opens a Slack room, and gives customers a status page. Afterward you write what happened. One product. Your machines.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Built for teams that already run Postgres and would rather operate a pager than pay per seat. Not a hosted cloud, and not native voice calls.
        </p>

        <div className="mt-10 mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={BRAND.links.docs}
            className="inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-slate-900 px-8 text-sm font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 sm:w-auto"
          >
            Install
            <ArrowRight className="ml-2 h-4 w-4 text-slate-300" />
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900 hover:underline"
          >
            How a night goes
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setShowDeployBox((prev) => !prev)}
          className="mx-auto flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <span>{showDeployBox ? "Hide run commands" : "Run commands"}</span>
          {showDeployBox ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showDeployBox && (
          <div className="mx-auto mt-8 max-w-3xl animate-in fade-in text-left duration-200">
            <div className="overflow-hidden rounded-[16px] border border-slate-800 bg-[#0f172a]">
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
        )}
      </div>
    </section>
  );
}
