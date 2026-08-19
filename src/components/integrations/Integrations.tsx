"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { integrationIcons } from "@/components/icons/IntegrationIcons";

type Category =
  | "All"
  | "APM & Monitoring"
  | "Cloud"
  | "Metrics"
  | "CI/CD"
  | "Uptime"
  | "Chat & tickets";

type IntegrationItem = {
  name: string;
  category: Category;
  icon: React.ReactNode;
  description: string;
  href: string;
};

const integrations: IntegrationItem[] = [
  { name: "Datadog", category: "APM & Monitoring", icon: integrationIcons.datadog, description: "Monitor and anomaly webhooks.", href: "/docs/v1.3/integrations/apm-monitoring/datadog/" },
  { name: "New Relic", category: "APM & Monitoring", icon: integrationIcons.newrelic, description: "Workflow and incident webhooks.", href: "/docs/v1.3/integrations/apm-monitoring/new-relic/" },
  { name: "Dynatrace", category: "APM & Monitoring", icon: integrationIcons.dynatrace, description: "Problem notifications.", href: "/docs/v1.3/integrations/apm-monitoring/dynatrace/" },
  { name: "AppDynamics", category: "APM & Monitoring", icon: integrationIcons.appdynamics, description: "Health-rule callbacks.", href: "/docs/v1.3/integrations/apm-monitoring/appdynamics/" },
  { name: "Honeycomb", category: "APM & Monitoring", icon: integrationIcons.honeycomb, description: "Trigger webhooks.", href: "/docs/v1.3/integrations/apm-monitoring/honeycomb/" },
  { name: "Sentry", category: "APM & Monitoring", icon: integrationIcons.sentry, description: "Issue alerts.", href: "/docs/v1.3/integrations/apm-monitoring/sentry/" },
  { name: "Splunk Observability", category: "APM & Monitoring", icon: integrationIcons.splunk, description: "Detector webhooks.", href: "/docs/v1.3/integrations/apm-monitoring/splunk-observability/" },
  { name: "Grafana", category: "APM & Monitoring", icon: integrationIcons.grafana, description: "Grafana Alerting contact point.", href: "/docs/v1.3/integrations/apm-monitoring/grafana/" },
  { name: "AWS CloudWatch", category: "Cloud", icon: integrationIcons.cloudwatch, description: "SNS to the ingest URL.", href: "/docs/v1.3/integrations/cloud/aws-cloudwatch/" },
  { name: "Azure Monitor", category: "Cloud", icon: integrationIcons.azure, description: "Action group webhook.", href: "/docs/v1.3/integrations/cloud/azure-monitor/" },
  { name: "Google Cloud Monitoring", category: "Cloud", icon: integrationIcons.googlecloud, description: "Notification channel webhook.", href: "/docs/v1.3/integrations/cloud/google-cloud-monitoring/" },
  { name: "Prometheus", category: "Metrics", icon: integrationIcons.prometheus, description: "Alertmanager webhook.", href: "/docs/v1.3/integrations/metrics-alerting/prometheus/" },
  { name: "Zabbix", category: "Metrics", icon: integrationIcons.zabbix, description: "Media type webhook.", href: "/docs/v1.3/integrations/metrics-alerting/zabbix/" },
  { name: "Nagios", category: "Metrics", icon: integrationIcons.nagios, description: "Notification command.", href: "/docs/v1.3/integrations/metrics-alerting/nagios/" },
  { name: "Icinga 2", category: "Metrics", icon: integrationIcons.icinga, description: "Notification webhook.", href: "/docs/v1.3/integrations/metrics-alerting/icinga/" },
  { name: "GitHub Actions", category: "CI/CD", icon: integrationIcons.github, description: "Workflow failure webhook.", href: "/docs/v1.3/integrations/ci-cd/github/" },
  { name: "GitLab CI/CD", category: "CI/CD", icon: integrationIcons.gitlab, description: "Pipeline webhooks.", href: "/docs/v1.3/integrations/ci-cd/gitlab/" },
  { name: "Bitbucket", category: "CI/CD", icon: integrationIcons.bitbucket, description: "Pipelines webhook.", href: "/docs/v1.3/integrations/ci-cd/bitbucket/" },
  { name: "Vercel", category: "CI/CD", icon: integrationIcons.vercel, description: "Deployment webhooks.", href: "/docs/v1.3/integrations/ci-cd/vercel/" },
  { name: "UptimeRobot", category: "Uptime", icon: integrationIcons.uptimerobot, description: "Alert contacts.", href: "/docs/v1.3/integrations/uptime/uptimerobot/" },
  { name: "Pingdom", category: "Uptime", icon: integrationIcons.pingdom, description: "Uptime checks.", href: "/docs/v1.3/integrations/uptime/pingdom/" },
  { name: "Better Stack", category: "Uptime", icon: integrationIcons.betterstack, description: "Uptime webhooks.", href: "/docs/v1.3/integrations/uptime/better-uptime/" },
  { name: "Uptime Kuma", category: "Uptime", icon: integrationIcons.uptimekuma, description: "Notification webhook.", href: "/docs/v1.3/integrations/uptime/uptime-kuma/" },
  { name: "Slack", category: "Chat & tickets", icon: integrationIcons.slack, description: "Incoming Slack plus ChatOps rooms from v1.2.", href: "/docs/v1.3/integrations/communication/slack/" },
  { name: "Jira Cloud", category: "Chat & tickets", icon: integrationIcons.jira, description: "Create and sync issues.", href: "/docs/v1.3/integrations/issue-tracking/jira/" },
  { name: "WhatsApp", category: "Chat & tickets", icon: integrationIcons.whatsapp, description: "Paging channel — see notifications.", href: "/docs/v1.3/administration/notifications/" },
  { name: "PagerDuty Events API v2", category: "Chat & tickets", icon: integrationIcons.pagerduty, description: "/v2/enqueue ingest — not the homepage identity.", href: "/docs/v1.3/integrations/custom/pagerduty-emulation/" },
];

const categories: Category[] = ["All", "APM & Monitoring", "Cloud", "Metrics", "CI/CD", "Uptime", "Chat & tickets"];

export function Integrations() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const filtered = integrations.filter(
    (it) => activeFilter === "All" || it.category === activeFilter
  );

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
            {BRAND.integrationCountLabel} inbound parsers in {BRAND.version}. Each tile opens the setup page for that tool. Generic JSON is in the webhooks doc.
          </p>
        </div>

        <div className="mt-10 rounded-[14px] border border-slate-200 bg-[#f8fafc] p-5 sm:flex sm:items-center sm:gap-6 sm:p-6">
          <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-slate-200 bg-white p-2 sm:mb-0">
            {integrationIcons.pagerduty}
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Already sending Events API v2?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#4b5563]">
              OpsKnight accepts the same{" "}
              <span className="font-mono text-[12px]">/v2/enqueue</span> shape.
              Change the destination URL; keep routing keys. That is an ingest adapter, not the product name.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] ${
                activeFilter === cat
                  ? "border-[#2563eb] bg-[#2563eb] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {cat === "All" ? `All (${integrations.length})` : cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-start gap-3 rounded-[12px] border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111827]">{item.name}</h4>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[#4b5563]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2563eb] hover:underline"
          >
            Full directory with sample payloads
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
