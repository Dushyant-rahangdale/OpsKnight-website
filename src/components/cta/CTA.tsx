"use client";

import Link from "next/link";
import { Github, Terminal, Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/lib/brand";

export function CTA() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(BRAND.deploy.compose);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Install
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Run it where your systems already live.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            Clone the repo, set {`NEXTAUTH_SECRET`} and {`ENCRYPTION_KEY`}, then{" "}
            <span className="font-mono text-sm">docker compose up -d</span>.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50">
          <div className="grid lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.4fr)]">
            <div className="flex flex-col justify-between border-b border-slate-200 bg-white p-7 lg:border-b-0 lg:border-r md:p-8">
              <p className="text-sm leading-relaxed text-[#4b5563]">{BRAND.deploy.secretsNote}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/install"
                  className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#d21a1b] px-6 text-sm font-semibold text-white hover:bg-[#b41516]"
                >
                  Install
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href={BRAND.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-[12px] border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </div>
            </div>

            <div className="min-w-0 p-4 md:p-5">
              <div className="overflow-hidden rounded-[12px] border border-slate-800 bg-[#0f172a]">
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
                  <span className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                    <Terminal className="h-3.5 w-3.5" />
                    README quick start
                  </span>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
                    aria-label="Copy compose flow"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-[#059669]" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-200 sm:p-5 sm:text-[13px]">
                  {BRAND.deploy.compose}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
