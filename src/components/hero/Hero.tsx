"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { BRAND } from "@/lib/brand";

type DeployMethod = "compose" | "docker" | "helm";

const PROOFS = [
  "Pages the person who is actually on call",
  "Opens a Slack room so the team can talk",
  "Gives customers a status page while you fix it",
];

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

      <div className="relative z-10 mx-auto grid min-h-0 max-w-[1440px] lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-[minmax(0,24.5rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,26.5rem)_minmax(0,1fr)]">
        <div className="flex flex-col justify-center px-4 py-20 sm:px-6 md:py-24 lg:py-12 lg:pl-8 lg:pr-6 xl:pl-12">
          <p className="mb-4 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            {BRAND.name} {BRAND.version} · you run it · {BRAND.license}
          </p>
          <h1 className="text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-[#111827] sm:text-[2.15rem] lg:text-[2.35rem] lg:leading-[1.16]">
            The 2am page should live on your servers — not in a SaaS you rent
            per person.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4b5563] sm:text-base">
            When production breaks, OpsKnight messages whoever is on call, opens
            a Slack room for the incident, and gives customers a status page.
            Afterward you write what happened. One product. Your machines. No
            per-person software fee.
          </p>

          <ul className="mt-6 space-y-2.5 border-t border-slate-200 pt-5">
            {PROOFS.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 text-[13px] leading-snug text-[#374151]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="#how-it-works"
              className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#2563eb] px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
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
            className="mt-4 self-start text-sm font-medium text-slate-600 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            {showRun ? "Hide how to run it" : "How to run it on your machines"}
          </button>
        </div>

        <div className="relative lg:min-h-0">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-[#f8fafc] to-transparent lg:block"
            aria-hidden
          />
          <div className="relative mx-4 mb-10 overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.32)] sm:mx-6 lg:absolute lg:inset-y-8 lg:left-0 lg:right-[-6%] lg:mx-0 lg:mb-0 xl:inset-y-10 xl:right-[-10%]">
            <div className="flex h-8 items-center gap-3 border-b border-slate-200 bg-slate-50 px-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#d1d5db]" />
                <span className="h-2 w-2 rounded-full bg-[#d1d5db]" />
                <span className="h-2 w-2 rounded-full bg-[#d1d5db]" />
              </div>
              <p className="min-w-0 truncate font-mono text-[10px] text-slate-500">
                localhost:3000
              </p>
            </div>
            <div className="relative h-[38vh] min-h-[240px] sm:h-[42vh] lg:h-[calc(100%-2rem)] lg:min-h-[28rem]">
              <Image
                src="/command-center.png"
                alt="OpsKnight Command Center with incident totals, filters, and live status"
                fill
                className="object-cover object-[20%_10%] lg:object-[18%_8%] lg:scale-[1.12] lg:origin-top-left"
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>

      {showRun && (
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-10 sm:px-6 lg:px-8">
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
