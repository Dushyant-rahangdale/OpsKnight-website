import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  GitBranch,
  Globe,
  Smartphone,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

const items = [
  {
    icon: AlertTriangle,
    title: "Incident command",
    body: "Open, ack, assign, resolve. Related alerts can share a fingerprint so one person is not paged for every downstream symptom.",
  },
  {
    icon: Calendar,
    title: "On-call schedules",
    body: "Rotations, timezones, and last-minute swaps. The active layer is who gets the first message.",
  },
  {
    icon: GitBranch,
    title: "Escalation and paging",
    body: "Email, SMS (Twilio or SNS), Slack, WhatsApp, push, or a webhook. If they miss it, the policy moves on. No native voice calls.",
  },
  {
    icon: Globe,
    title: "Customer status page",
    body: "Public, restricted, or private. Optional custom domain and email subscribe. One page per install.",
    href: "/#status-page",
  },
  {
    icon: BarChart3,
    title: "Analytics and SLA",
    body: "MTTA, MTTR, and compliance on your Postgres. You read the numbers; OpsKnight does not invent a postmortem.",
  },
  {
    icon: Smartphone,
    title: "Ack from a phone",
    body: "Install the site on the home screen. Same login as desktop. Not a separate app-store product.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
              What you get
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              The night, in one install.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#4b5563] md:pb-1">
            {BRAND.license}. You host it. You still pay compute, SMS, and Slack.
            There is no OpsKnight cloud and no per-seat software fee.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            const inner = (
              <>
                <Icon className="h-5 w-5 text-[#d21a1b]" strokeWidth={1.75} />
                <h3 className="mt-5 text-base font-semibold text-[#111827]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{item.body}</p>
              </>
            );
            return (
              <li key={item.title} className="bg-white p-7 md:p-8">
                {"href" in item && item.href ? (
                  <Link href={item.href} className="block hover:opacity-80">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
