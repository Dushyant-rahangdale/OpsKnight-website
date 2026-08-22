import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, MessageSquare, Layers, FileCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";
import { PageToc } from "@/components/common/PageToc";

const title = "Use Cases";
const description =
  "When OpsKnight is a fit: keep incident data on your stack, eliminate per-seat pricing at scale, run Slack war rooms, and maintain complete audit compliance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/use-cases" },
  openGraph: { title, description, url: "/use-cases" },
  twitter: { title, description },
};

const TOC_SECTIONS = [
  { id: "data-sovereignty", title: "VPC Data Sovereignty" },
  { id: "flat-rate-scale", title: "Scale Without Per-Seat Taxes" },
  { id: "slack-chatops", title: "Slack ChatOps & War Rooms" },
  { id: "escalation-routing", title: "Escalations & Rotations" },
  { id: "audit-compliance", title: "Compliance & Audit Readiness" },
];

const SPEC_ITEMS = [
  { label: "Deployment", value: "Self-Hosted (Docker / Helm)" },
  { label: "Seat Limits", value: "Unlimited (Zero cost per user)" },
  { label: "Incident Storage", value: "Local PostgreSQL (Your VPC)" },
  { label: "Telemetry", value: "Zero External Phone-Home" },
  { label: "License", value: BRAND.license },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <section className="border-b border-slate-200 bg-[#0f172a] pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-400">
              Operational Scenarios · {BRAND.version}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.12]">
              Built for teams that already operate a stack.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              These are real-world operational situations OpsKnight is built for.
              No hosted cloud dependencies, no per-seat billing surprises, and no mandatory external SaaS lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Right Rail */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            
            {/* Main Content Column */}
            <article className="min-w-0 space-y-16 max-w-3xl">
              
              {/* 1. VPC Data Sovereignty */}
              <div id="data-sovereignty" className="scroll-mt-28">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    VPC & Air-Gapped Data Sovereignty
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  When production breaks, your incident logs, database stack traces, customer identifiers,
                  and postmortem root-cause notes frequently contain sensitive infrastructure details.
                  Many regulated industries (fintech, healthcare, defense) are legally prohibited from streaming
                  their internal outage timelines to a third-party SaaS cloud.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>All rotations, incident records, and timelines live strictly in your internal PostgreSQL database.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Zero outbound telemetry, zero marketing trackers, and zero phone-home pings.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Deployable in fully air-gapped VPCs with private container registries.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href="/security"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      Read Security & Encryption Specs
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 2. Scale Without Per-Seat Taxes */}
              <div id="flat-rate-scale" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    On-Call at Scale Without Per-Seat Taxes
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  Commercial on-call vendors charge $25 to $49 per user per month. As your engineering team
                  grows from 20 to 200 developers, the monthly cost inflates rapidly simply to give engineers
                  access to emergency rotation schedules.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Apache-2.0 open source license: invite 5 or 5,000 engineers at $0 subscription cost.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Resource-efficient runtime: operates comfortably on 0.5 vCPU and 512MB RAM ($5/mo cloud compute).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>No tier locks: full access to escalation policies, webhooks, and ChatOps for every team member.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href="/compare"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      Compare against Commercial SaaS
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3. Slack ChatOps & War Rooms */}
              <div id="slack-chatops" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Slack ChatOps & Incident War Rooms
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  Engineers already collaborate in Slack during active incidents. Context switching between
                  separate web dashboards, alert feeds, and chat apps slows down Mean Time to Resolution (MTTR).
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Automatically provisions dedicated Slack incident channels (e.g. <code className="font-mono text-xs text-red-600">#inc-2026-payment-timeout</code>).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Interactive message buttons allow 1-click Acknowledge, Assign, and Resolve directly inside Slack.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Auto-injects conference bridge links (Zoom, Google Meet, or Jitsi) into the war room.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={latestDocsHref("integrations/communication/slack-chatops")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      View Slack ChatOps Documentation
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 4. Escalations & Rotations */}
              <div id="escalation-routing" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <Layers className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Multi-Tier Escalations & SRE Rotations
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  Complex microservice architectures require distinct ownership boundaries. The payment team
                  needs different on-call handoffs than the infrastructure or security team.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Configurable multi-tier escalation policies with customizable step delays (e.g. 5m, 15m, 30m).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Multi-channel delivery: Twilio SMS, AWS SNS, Mobile Push, Slack, WhatsApp, and Webhooks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Flexible rotation schedules supporting daily, weekly, and custom shift handoffs with timezone awareness.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={latestDocsHref("core-concepts/escalation-policies")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      View Escalation Policies Guide
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 5. Compliance & Audit Readiness */}
              <div id="audit-compliance" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Compliance & Enterprise Audit Readiness
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  SOC 2, ISO 27001, and HIPAA audits mandate rigorous tracking of who was paged, when they acknowledged,
                  what actions were performed, and full post-incident timeline logs.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Immutable audit trails documenting every state transition, ack timestamp, and escalation step.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>OIDC Single Sign-On integration with Okta, Azure AD, and Keycloak (SAML is not in this release).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>AES-256-CBC (V2) envelope encryption protecting stored integration secrets and notification tokens.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={latestDocsHref("security")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      Read Full Security Architecture
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Sticky Right Rail (Page TOC + Specs + Actions) */}
            <aside className="hidden lg:block">
              <PageToc
                sections={TOC_SECTIONS}
                specs={SPEC_ITEMS}
                quickCommand="docker compose up -d"
                quickCommandLabel="Test locally with Compose"
                docLink={latestDocsHref("getting-started")}
                docLinkLabel="Installation Documentation"
              />
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}
