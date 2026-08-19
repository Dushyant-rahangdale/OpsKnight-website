"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { COMPETITORS } from "@/lib/competitors";
import { SavingsCalculator } from "@/components/calculator/SavingsCalculator";

type Row = {
  name: string;
  opsknight: string;
  pagerduty: string;
  incidentio: string;
  opsgenie: string;
  squadcast: string;
  splunk: string;
  grafana: string;
};

const comparisonData: Row[] = [
  {
    name: "Hosting",
    opsknight: "Self-hosted / VPC",
    pagerduty: "SaaS only",
    incidentio: "SaaS only",
    opsgenie: "SaaS only",
    squadcast: "SaaS only",
    splunk: "SaaS only",
    grafana: "OSS or Cloud",
  },
  {
    name: "License",
    opsknight: BRAND.license,
    pagerduty: "Proprietary",
    incidentio: "Proprietary",
    opsgenie: "Proprietary",
    squadcast: "Proprietary",
    splunk: "Proprietary",
    grafana: "AGPL (OSS)",
  },
  {
    name: "Per-seat software",
    opsknight: "$0 unlimited",
    pagerduty: "$21–$41 / user",
    incidentio: "~$35 / user",
    opsgenie: "$11–$29 / user",
    squadcast: "~$21 / user",
    splunk: "~$23 / user",
    grafana: "OSS free / Cloud paid",
  },
  {
    name: "Status pages",
    opsknight: "Included",
    pagerduty: "Paid add-on",
    incidentio: "Paid / limited",
    opsgenie: "Add-on",
    squadcast: "Add-on / limited",
    splunk: "Limited",
    grafana: "Separate product",
  },
  {
    name: "Slack war rooms",
    opsknight: "Included",
    pagerduty: "Higher tiers",
    incidentio: "Core product",
    opsgenie: "Basic",
    squadcast: "Partial",
    splunk: "Partial",
    grafana: "Partial",
  },
  {
    name: "Incident + on-call + SLA",
    opsknight: "One app",
    pagerduty: "Yes (paid tiers)",
    incidentio: "Yes",
    opsgenie: "Yes",
    squadcast: "Yes",
    splunk: "On-call focused",
    grafana: "On-call focused",
  },
  {
    name: "PagerDuty Events API v2",
    opsknight: "Drop-in /v2/enqueue",
    pagerduty: "Native",
    incidentio: "No",
    opsgenie: "No",
    squadcast: "No",
    splunk: "No",
    grafana: "No",
  },
  {
    name: "Data residency",
    opsknight: "Your infrastructure",
    pagerduty: "Vendor cloud",
    incidentio: "Vendor cloud",
    opsgenie: "Vendor cloud",
    squadcast: "Vendor cloud",
    splunk: "Vendor cloud",
    grafana: "You or Grafana Cloud",
  },
];

const columns: { key: keyof Row; label: string; highlight?: boolean }[] = [
  { key: "opsknight", label: BRAND.name, highlight: true },
  { key: "pagerduty", label: "PagerDuty" },
  { key: "incidentio", label: "incident.io" },
  { key: "opsgenie", label: "Opsgenie" },
  { key: "squadcast", label: "Squadcast" },
  { key: "splunk", label: "Splunk On-Call" },
  { key: "grafana", label: "Grafana OnCall" },
];

export function Comparison() {
  return (
    <section className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Compare
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Against the whole on-call market — not one vendor.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            PagerDuty, incident.io, Opsgenie, Squadcast, Splunk On-Call, and
            Grafana OnCall. Same job: paging and incident response. Different
            bill, hosting, and lock-in.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {COMPETITORS.map((vendor) => (
            <Link
              key={vendor.slug}
              href={vendor.href}
              className="rounded-[12px] border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              <p className="text-sm font-semibold text-[#111827]">{vendor.name}</p>
              <p className="mt-1 text-[11px] text-[#4b5563]">{vendor.category}</p>
              <p className="mt-2 font-mono text-[11px] text-slate-600">{vendor.listPrice}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#2563eb]">
                Full vs {BRAND.name}
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-[14px] border border-slate-200 bg-white">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 z-10 bg-slate-50 px-4 py-4 font-semibold text-[#111827]">
                  Capability
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={
                      col.highlight
                        ? "border-x border-slate-200 bg-blue-50/70 px-4 py-4 font-semibold text-[#2563eb]"
                        : "px-4 py-4 font-medium text-slate-600"
                    }
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((row) => (
                <tr key={row.name}>
                  <td className="sticky left-0 z-10 bg-white px-4 py-3.5 font-medium text-[#111827]">
                    {row.name}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={
                        col.highlight
                          ? "border-x border-slate-200 bg-blue-50/30 px-4 py-3.5 font-medium text-slate-800"
                          : "px-4 py-3.5 text-[#4b5563]"
                      }
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12">
          <SavingsCalculator />
        </div>

        <div className="mt-10">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2563eb] hover:underline"
          >
            Feature matrix vs every vendor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
