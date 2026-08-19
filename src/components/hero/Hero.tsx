"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Github, Copy, Check, Terminal } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { CommandStrip } from "@/components/brand/CommandStrip";
import { BRAND } from "@/lib/brand";

type DeployMethod = "compose" | "docker" | "helm";

export function Hero() {
  const [deployMethod, setDeployMethod] = useState<DeployMethod>("compose");
  const [copied, setCopied] = useState(false);

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
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] pt-28 pb-20 md:pt-32 md:pb-24">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="mb-5 font-mono text-[11px] font-medium tracking-wide text-slate-500">
              {BRAND.name} {BRAND.version} · {BRAND.license} · self-hosted
            </p>

            <h1 className="max-w-xl text-[2.15rem] font-semibold leading-[1.15] tracking-tight text-[#111827] sm:text-5xl">
              Self-hosted on-call and incident response.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#4b5563] sm:text-lg">
              Unlimited users on your infrastructure. PagerDuty Events API v2
              drop-in, Slack ChatOps war rooms, status pages, and a mobile PWA —
              {` ${BRAND.integrationCountLabel} native integrations.`}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={BRAND.links.docs}
                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#2563eb] px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
              >
                Deploy
              </Link>
              <Link
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#059669]" />
                Status demo
              </Link>
              <Link
                href={BRAND.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </div>

            <div className="mt-10 overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
                <div className="flex items-center gap-1">
                  {(["compose", "docker", "helm"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDeployMethod(method)}
                      className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] ${
                        deployMethod === method
                          ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {method === "compose"
                        ? "Compose"
                        : method === "docker"
                          ? "Docker (BYO DB)"
                          : "Helm"}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
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
                  <span>
                    {deployMethod === "compose"
                      ? "Clone, secrets, then Compose"
                      : deployMethod === "docker"
                        ? "Image + Postgres + secrets"
                        : "Chart values must include secrets"}
                  </span>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap text-left text-slate-100">
                  {deployCommands[deployMethod]}
                </pre>
              </div>
              <p className="border-t border-slate-200 px-4 py-3 text-xs leading-relaxed text-[#4b5563]">
                {BRAND.deploy.secretsNote}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.28)]">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="ml-2 truncate font-mono text-[11px] text-slate-500">
                  localhost:3000 / incidents
                </span>
              </div>
              <CommandStrip />
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={BRAND.assets.dashboard}
                  alt="OpsKnight command center — incident list and on-call overview"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(min-width: 1024px) 540px, 100vw"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500 lg:text-left">
              Production UI — not a mock dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
