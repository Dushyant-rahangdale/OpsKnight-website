import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  GitBranch,
  Globe,
  BarChart3,
  Smartphone,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

const primary = [
  {
    icon: LayoutDashboard,
    title: "Incident command",
    body: "Triage, acknowledge, assign, and track MTTA/MTTR from one incident record — with a live timeline, not a ticket graveyard.",
  },
  {
    icon: Calendar,
    title: "On-call rotations",
    body: "Layered schedules, overrides, and timezone-aware handoffs. Who is on-call is always explicit.",
  },
  {
    icon: GitBranch,
    title: "Escalations & paging",
    body: "Policies route to SMS, email, push, Slack, and WhatsApp. Missed pages escalate to the next layer.",
  },
];

const secondary = [
  {
    icon: Globe,
    title: "Status pages",
    body: "Public and private pages with incident history. See the live demo at status.opsknight.com.",
  },
  {
    icon: BarChart3,
    title: "Analytics & SLA",
    body: "MTTA, MTTR, and SLA views for the services you actually run.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
              Capabilities
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              The command center, not a seat tax.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
              Incidents, on-call, ChatOps, status, analytics, and a mobile PWA.
              Full feature set on one self-hosted plan.
            </p>
          </div>
          <Link
            href={BRAND.links.docs}
            className="text-sm font-medium text-[#2563eb] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            Read the docs
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
            {primary.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[14px] border border-slate-200 bg-white p-6"
                >
                  <Icon className="h-5 w-5 text-[#2563eb]" strokeWidth={1.75} />
                  <h3 className="mt-4 text-base font-semibold text-[#111827]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>

          <article className="flex flex-col justify-between rounded-[14px] border border-slate-200 bg-[#0f172a] p-7 text-white lg:col-span-4">
            <div>
              <Smartphone className="h-5 w-5 text-blue-300" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold">Mobile PWA</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Acknowledge and triage from a phone. Install as a PWA — no app
                store, same auth as the desktop app.
              </p>
            </div>
            <p className="mt-8 font-mono text-[11px] text-slate-500">
              Sold with the product · not an add-on
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {secondary.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[14px] border border-slate-200 bg-white p-6 sm:flex sm:gap-5"
              >
                <Icon className="h-5 w-5 shrink-0 text-[#2563eb]" strokeWidth={1.75} />
                <div>
                  <h3 className="text-base font-semibold text-[#111827]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
