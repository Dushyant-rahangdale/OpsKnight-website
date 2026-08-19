"use client";

import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { integrationIcons } from "@/components/icons/IntegrationIcons";
import { ArrowRight } from "lucide-react";

const logos = [
  { name: "Datadog", icon: integrationIcons.datadog, href: "/docs/v1.3/integrations/apm-monitoring/datadog/" },
  { name: "Prometheus", icon: integrationIcons.prometheus, href: "/docs/v1.3/integrations/metrics-alerting/prometheus/" },
  { name: "Grafana", icon: integrationIcons.grafana, href: "/docs/v1.3/integrations/apm-monitoring/grafana/" },
  { name: "Sentry", icon: integrationIcons.sentry, href: "/docs/v1.3/integrations/apm-monitoring/sentry/" },
  { name: "CloudWatch", icon: integrationIcons.cloudwatch, href: "/docs/v1.3/integrations/cloud/aws-cloudwatch/" },
  { name: "New Relic", icon: integrationIcons.newrelic, href: "/docs/v1.3/integrations/apm-monitoring/new-relic/" },
  { name: "Slack", icon: integrationIcons.slack, href: "/docs/v1.3/integrations/communication/slack/" },
  { name: "PagerDuty Events API v2", icon: integrationIcons.pagerduty, href: "/docs/v1.3/integrations/custom/pagerduty-emulation/" },
  { name: "Jira Cloud", icon: integrationIcons.jira, href: "/docs/v1.3/integrations/issue-tracking/jira/" },
  { name: "GitHub", icon: integrationIcons.github, href: "/docs/v1.3/integrations/ci-cd/github/" },
];

export function Integrations() {
  return (
    <section id="integrations" className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Integrations
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Your monitors already know how to send a webhook.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            {BRAND.integrationCountLabel} inbound parsers. Point the destination at OpsKnight. Events API v2{" "}
            <span className="font-mono text-[13px]">/v2/enqueue</span> is an ingest adapter — not the product name.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {logos.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] px-3 py-3 hover:border-slate-300 hover:bg-white"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-1">
                {item.icon}
              </div>
              <span className="truncate text-sm font-medium text-[#111827]">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2563eb] hover:underline"
          >
            All {BRAND.integrationCountLabel} parsers and sample payloads
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
