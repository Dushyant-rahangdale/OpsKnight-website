"use client";

import Link from "next/link";
import { Github, Terminal, Copy, Check } from "lucide-react";
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
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
          Run it where your systems already live.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#4b5563]">
          Clone the repo, set {`NEXTAUTH_SECRET`} and {`ENCRYPTION_KEY`}, then{" "}
          <span className="font-mono text-sm">docker compose up -d</span>.
        </p>

        <div className="mt-10 overflow-hidden rounded-[14px] border border-slate-200 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2">
            <span className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <Terminal className="h-3.5 w-3.5" />
              README quick start
            </span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
              aria-label="Copy compose flow"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[#059669]" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <pre className="overflow-x-auto bg-[#0f172a] p-4 font-mono text-[11px] leading-relaxed text-slate-100 sm:text-xs">
            {BRAND.deploy.compose}
          </pre>
          <p className="border-t border-slate-200 px-4 py-3 text-xs leading-relaxed text-[#4b5563]">
            {BRAND.deploy.secretsNote}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={BRAND.links.docs}
            className="inline-flex h-11 w-full items-center justify-center rounded-[12px] bg-[#2563eb] px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
          >
            Deploy
          </Link>
          <Link
            href={BRAND.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-[12px] border border-slate-200 bg-white px-6 text-sm font-medium text-slate-800 hover:bg-slate-50 sm:w-auto"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
