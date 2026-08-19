import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { COMPETITORS } from "@/lib/competitors";
import { COMPARE_FOOTNOTE, OPKNIGHT_GAPS } from "@/lib/compare-matrix";
import { CompareTable } from "@/components/comparison/CompareTable";
import { SavingsCalculator } from "@/components/calculator/SavingsCalculator";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Compare · v{BRAND.version}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl">
            OpsKnight next to the rest of the on-call market.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
            The {BRAND.name} column is what ships in {BRAND.version}: incidents,
            on-call, Slack war rooms, status page, {BRAND.integrationCountLabel}{" "}
            inbound parsers, {BRAND.license}. Other columns describe how those
            products are sold (SaaS vs self-host), not a full vendor audit.
          </p>
        </header>

        <section className="mt-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            Direct comparisons
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {COMPETITORS.map((vendor) => (
              <Link
                key={vendor.slug}
                href={vendor.href}
                className="rounded-[12px] border border-slate-200 bg-white p-4 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
              >
                <p className="text-sm font-semibold text-[#111827]">{vendor.name}</p>
                <p className="mt-1 text-[11px] text-[#4b5563]">{vendor.category}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#2563eb]">
                  vs {BRAND.name}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold text-[#111827]">Capability matrix</h2>
          <CompareTable />
          <p className="mt-4 max-w-4xl text-xs leading-relaxed text-slate-500">
            {COMPARE_FOOTNOTE}
          </p>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[14px] border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#111827]">In v{BRAND.version}</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#4b5563]">
              <li>Incidents, schedules, escalation policies, teams, services</li>
              <li>Email, Twilio SMS, push, Slack, WhatsApp, outbound webhooks</li>
              <li>Slack ChatOps war rooms; Jitsi / Meet / Zoom URL bridges</li>
              <li>Status page with custom domain and privacy modes</li>
              <li>Postmortems, action items, MTTA/MTTR/SLA analytics</li>
              <li>PagerDuty Events API v2 drop-in, Jira Cloud sync</li>
              <li>OIDC SSO, RBAC, audit log, API keys, encrypted secrets</li>
              <li>Mobile PWA with push and biometrics</li>
            </ul>
          </div>
          <div className="rounded-[14px] border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#111827]">Not in this release</h2>
            <ul className="mt-4 space-y-3">
              {OPKNIGHT_GAPS.map((gap) => (
                <li key={gap.item}>
                  <p className="text-sm font-medium text-[#111827]">{gap.item}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#4b5563]">{gap.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-2 text-xl font-semibold text-[#111827]">Cost sketch</h2>
          <p className="mb-6 max-w-2xl text-sm text-[#4b5563]">
            {BRAND.name} software is $0. You pay for a VM or cluster you already
            run. Enter the per-user rate on your current invoice — we do not
            publish third-party list prices as facts.
          </p>
          <SavingsCalculator />
        </section>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Link
            href={BRAND.links.docs}
            className="inline-flex h-11 items-center rounded-[12px] bg-[#2563eb] px-6 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Deploy
          </Link>
          <Link
            href={BRAND.links.github}
            className="text-sm font-medium text-[#2563eb] hover:underline"
          >
            Source on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
