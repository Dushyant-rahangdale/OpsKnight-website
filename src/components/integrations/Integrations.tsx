"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { integrationIcons } from "@/components/icons/IntegrationIcons";

type Category =
  | "All"
  | "APM & Monitoring"
  | "Cloud Infrastructure"
  | "Metrics & Daemons"
  | "CI/CD & DevOps"
  | "Uptime & Synthetics"
  | "Chat & Notifications";

interface IntegrationItem {
  name: string;
  category: Category;
  icon: React.ReactNode;
  description: string;
  href: string;
}

const integrations: IntegrationItem[] = [
  { name: "Datadog", category: "APM & Monitoring", icon: integrationIcons.datadog, description: "Full-stack observability and security.", href: "/integrations" },
  { name: "New Relic", category: "APM & Monitoring", icon: integrationIcons.newrelic, description: "Application performance monitoring.", href: "/integrations" },
  { name: "Dynatrace", category: "APM & Monitoring", icon: integrationIcons.dynatrace, description: "Enterprise observability.", href: "/integrations" },
  { name: "AppDynamics", category: "APM & Monitoring", icon: integrationIcons.appdynamics, description: "Business observability platform.", href: "/integrations" },
  { name: "Honeycomb", category: "APM & Monitoring", icon: integrationIcons.honeycomb, description: "Fast analysis for distributed systems.", href: "/integrations" },
  { name: "Sentry", category: "APM & Monitoring", icon: integrationIcons.sentry, description: "Developer-first error tracking.", href: "/integrations" },
  { name: "Splunk Observability", category: "APM & Monitoring", icon: integrationIcons.splunk, description: "Real-time enterprise monitoring.", href: "/integrations" },
  { name: "AWS CloudWatch", category: "Cloud Infrastructure", icon: integrationIcons.cloudwatch, description: "Monitoring for AWS resources.", href: "/integrations" },
  { name: "Azure Monitor", category: "Cloud Infrastructure", icon: integrationIcons.azure, description: "Observability into Azure apps.", href: "/integrations" },
  { name: "Google Cloud Monitoring", category: "Cloud Infrastructure", icon: integrationIcons.googlecloud, description: "Metrics for Google Cloud.", href: "/integrations" },
  { name: "Prometheus / Alertmanager", category: "Metrics & Daemons", icon: integrationIcons.prometheus, description: "Open-source systems monitoring.", href: "/integrations" },
  { name: "Grafana", category: "Metrics & Daemons", icon: integrationIcons.grafana, description: "Operational dashboards and alerting.", href: "/integrations" },
  { name: "Zabbix", category: "Metrics & Daemons", icon: integrationIcons.zabbix, description: "Enterprise-class monitoring.", href: "/integrations" },
  { name: "Nagios", category: "Metrics & Daemons", icon: integrationIcons.nagios, description: "IT infrastructure monitoring.", href: "/integrations" },
  { name: "Icinga 2", category: "Metrics & Daemons", icon: integrationIcons.icinga, description: "Open source monitoring system.", href: "/integrations" },
  { name: "GitHub Actions", category: "CI/CD & DevOps", icon: integrationIcons.github, description: "Automate software workflows.", href: "/integrations" },
  { name: "GitLab CI/CD", category: "CI/CD & DevOps", icon: integrationIcons.gitlab, description: "Continuous integration and deployment.", href: "/integrations" },
  { name: "Bitbucket Pipelines", category: "CI/CD & DevOps", icon: integrationIcons.bitbucket, description: "Integrated CI/CD for Bitbucket.", href: "/integrations" },
  { name: "Vercel", category: "CI/CD & DevOps", icon: integrationIcons.vercel, description: "Develop, preview, and ship.", href: "/integrations" },
  { name: "UptimeRobot", category: "Uptime & Synthetics", icon: integrationIcons.uptimerobot, description: "Website uptime monitor.", href: "/integrations" },
  { name: "Pingdom", category: "Uptime & Synthetics", icon: integrationIcons.pingdom, description: "Website performance and availability.", href: "/integrations" },
  { name: "Better Uptime", category: "Uptime & Synthetics", icon: integrationIcons.betterstack, description: "Uptime monitoring and status pages.", href: "/integrations" },
  { name: "Uptime Kuma", category: "Uptime & Synthetics", icon: integrationIcons.uptimekuma, description: "Self-hosted monitoring tool.", href: "/integrations" },
  { name: "Slack (ChatOps)", category: "Chat & Notifications", icon: integrationIcons.slack, description: "Incident response in Slack.", href: "/integrations" },
  { name: "Jira Cloud", category: "Chat & Notifications", icon: integrationIcons.jira, description: "Create tickets automatically.", href: "/integrations" },
    { name: "WhatsApp", category: "Chat & Notifications", icon: integrationIcons.whatsapp, description: "High-priority WhatsApp pager alerts.", href: "/integrations" },
    { name: "Twilio SMS", category: "Chat & Notifications", icon: integrationIcons.twilio, description: "Urgent SMS paging via Twilio.", href: "/integrations" },
    { name: "Email", category: "Chat & Notifications", icon: integrationIcons.email, description: "HTML email notifications with deep links.", href: "/integrations" },
  { name: "Webhooks", category: "Chat & Notifications", icon: integrationIcons.webhook, description: "Custom HTTP callback routing.", href: "/integrations" },
];

const categories: Category[] = [
  "All",
  "APM & Monitoring",
  "Cloud Infrastructure",
  "Metrics & Daemons",
  "CI/CD & DevOps",
  "Uptime & Synthetics",
  "Chat & Notifications",
];

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
            {BRAND.integrationCountLabel} built-in parsers, signed so the payload
            is really from you. Point the destination URL at OpsKnight.
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
              <span className="font-mono text-[12px]">/v2/enqueue</span> shape
              used by many monitoring tools. Change the URL; keep routing keys.
              (This is an integration, not the product’s identity.)
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
              {cat}
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
            Full integrations directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
