"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { BRAND } from "@/lib/brand";

const features = [
  "Everyone on the team can use it — no per-person software fee",
  "Schedules, paging, Slack rooms, status page, write-ups",
  `${BRAND.integrationCountLabel} inbound monitoring parsers`,
  "Install on a phone from the browser",
  "Jira Cloud sync",
  `${BRAND.license} — you host it`,
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Pricing
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            One plan. Self-hosted. $0 software.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            There is no hosted Enterprise Cloud. You run OpsKnight. You pay for
            your own compute.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[14px] border border-slate-200 bg-white p-8 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#111827]">Self-hosted</h3>
              <p className="mt-1 text-sm text-[#4b5563]">
                Full features · {BRAND.license} · your VPC
              </p>
            </div>
            <p className="font-mono text-4xl font-semibold text-[#111827]">$0</p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
                <Check className="h-4 w-4 shrink-0 text-[#d21a1b]" strokeWidth={2} />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={BRAND.links.docs}
              className="inline-flex h-11 items-center justify-center rounded-[12px] bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-all shadow-sm"
            >
              Install
            </Link>
            <Link
              href="/compare"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline"
            >
              Compare cost vs the usual SaaS on-call stack
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
