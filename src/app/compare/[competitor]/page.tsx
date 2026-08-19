import { Fragment } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { COMPETITORS } from "@/lib/competitors";
import { BRAND } from "@/lib/brand";
import {
  COMPARE_FOOTNOTE,
  COMPARE_SECTIONS,
  type CompareCell,
  vendorIdFromCompareSlug,
} from "@/lib/compare-matrix";
import { notFound } from "next/navigation";

const ALIAS_SLUGS = ["incident-io", "victorops"] as const;

function Cell({ value }: { value: CompareCell }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[#2563eb]">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center text-slate-300">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return <span className="text-sm leading-snug text-slate-700">{value}</span>;
}

const HONEST_BLURB: Record<string, { title: string; body: string }> = {
  pagerduty: {
    title: "PagerDuty",
    body: "Vendor-hosted incident and on-call, typically sold per user. OpsKnight is software you host. Tools that already send Events API v2 can keep that payload shape.",
  },
  incidentio: {
    title: "incident.io",
    body: "Vendor-hosted incident response, typically Slack-first. Sold as SaaS. OpsKnight runs in your VPC and includes Slack war rooms in v1.3.1; it is not a hosted incident.io clone.",
  },
  opsgenie: {
    title: "Opsgenie",
    body: "Atlassian’s SaaS on-call product. OpsKnight is independent software you host; Jira Cloud sync ships in v1.3.1. We do not claim Atlassian’s current product roadmap.",
  },
  squadcast: {
    title: "Squadcast",
    body: "Vendor-hosted on-call and incident SaaS. OpsKnight is self-hosted with no seat meter in the product.",
  },
  splunk: {
    title: "Splunk On-Call",
    body: "Formerly VictorOps. Vendor-hosted on-call. OpsKnight is a separate self-hosted stack, not a Splunk add-on.",
  },
  grafana: {
    title: "Grafana OnCall",
    body: "Open-source OnCall (AGPL) and Grafana Cloud. OpsKnight is Apache-2.0, ships incident + status page + postmortems in one app, and does not require the Grafana microservice stack.",
  },
};

export function generateStaticParams() {
  return [
    ...COMPETITORS.map((c) => ({ competitor: c.slug })),
    ...ALIAS_SLUGS.map((competitor) => ({ competitor })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const vendorId = vendorIdFromCompareSlug(slug);
  const name = HONEST_BLURB[vendorId ?? ""]?.title ?? "this product";
  return {
    title: `OpsKnight vs ${name}`,
    description: `How OpsKnight v${BRAND.version} compares with ${name}: self-host vs SaaS, ${BRAND.license}, and capabilities that actually ship.`,
  };
}

export default async function CompetitorComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const vendorId = vendorIdFromCompareSlug(slug);
  if (!vendorId || vendorId === "opsknight") notFound();

  const blurb = HONEST_BLURB[vendorId];
  const navSlug =
    vendorId === "incidentio"
      ? "incidentio"
      : vendorId === "splunk"
        ? "splunk"
        : vendorId === "grafana"
          ? "grafana-oncall"
          : vendorId;

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-14">
        <header className="max-w-3xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Compare · v{BRAND.version}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl">
            {BRAND.name} vs {blurb.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
            {blurb.body}
          </p>
        </header>

        <nav className="flex flex-wrap gap-2">
          {COMPETITORS.map((vendor) => {
            const active = vendor.slug === navSlug;
            return (
              <Link
                key={vendor.slug}
                href={vendor.href}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  active
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                vs {vendor.shortName}
              </Link>
            );
          })}
        </nav>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-[#111827]">Side by side</h2>
          <div className="overflow-x-auto rounded-[14px] border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Capability
                  </th>
                  <th className="border-x border-slate-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-[#2563eb]">
                    {BRAND.name}
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">{blurb.title}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_SECTIONS.map((section) => (
                  <Fragment key={section.title}>
                    <tr key={section.title} className="border-t border-slate-200">
                      <td colSpan={3} className="bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={`${section.title}-${row.feature}`} className="border-t border-slate-100">
                        <td className="px-4 py-3 text-sm font-medium text-[#111827]">{row.feature}</td>
                        <td className="border-x border-slate-100 bg-blue-50/40 px-4 py-3">
                          <Cell value={row.values.opsknight} />
                        </td>
                        <td className="px-4 py-3">
                          <Cell value={row.values[vendorId]} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">{COMPARE_FOOTNOTE}</p>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/compare"
            className="inline-flex h-11 items-center rounded-[12px] bg-[#2563eb] px-6 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Full matrix and cost sketch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href={BRAND.links.docs}
            className="text-sm font-medium text-[#2563eb] hover:underline"
          >
            Deploy docs
          </Link>
        </div>
      </div>
    </main>
  );
}
