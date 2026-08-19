"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { integrationIcons } from "@/components/icons/IntegrationIcons";

type Category = "All (28)" | "APM & Monitoring" | "Cloud Infrastructure" | "Metrics & Daemons" | "CI/CD & DevOps" | "Uptime & Synthetics" | "Chat & Notifications";

interface IntegrationItem {
    name: string;
    category: Category;
    icon: React.ReactNode;
    description: string;
    href: string;
}

const integrations: IntegrationItem[] = [
    // APM & Monitoring
    { name: "Datadog", category: "APM & Monitoring", icon: integrationIcons.datadog, description: "Full-stack observability and security.", href: "/docs/integrations/datadog" },
    { name: "New Relic", category: "APM & Monitoring", icon: integrationIcons.newrelic, description: "Application performance monitoring.", href: "/docs/integrations/newrelic" },
    { name: "Dynatrace", category: "APM & Monitoring", icon: integrationIcons.dynatrace, description: "AI-powered observability.", href: "/docs/integrations/dynatrace" },
    { name: "AppDynamics", category: "APM & Monitoring", icon: integrationIcons.appdynamics, description: "Business observability platform.", href: "/docs/integrations/appdynamics" },
    { name: "Honeycomb", category: "APM & Monitoring", icon: integrationIcons.honeycomb, description: "Fast analysis for distributed systems.", href: "/docs/integrations/honeycomb" },
    { name: "Sentry", category: "APM & Monitoring", icon: integrationIcons.sentry, description: "Developer-first error tracking.", href: "/docs/integrations/sentry" },
    { name: "Splunk Observability", category: "APM & Monitoring", icon: integrationIcons.splunk, description: "Real-time enterprise monitoring.", href: "/docs/integrations/splunk" },

    // Cloud Infrastructure
    { name: "AWS CloudWatch", category: "Cloud Infrastructure", icon: integrationIcons.cloudwatch, description: "Monitoring for AWS resources.", href: "/docs/integrations/cloudwatch" },
    { name: "Azure Monitor", category: "Cloud Infrastructure", icon: integrationIcons.azure, description: "Full observability into Azure apps.", href: "/docs/integrations/azure" },
    { name: "Google Cloud Monitoring", category: "Cloud Infrastructure", icon: integrationIcons.googlecloud, description: "Metrics for Google Cloud.", href: "/docs/integrations/googlecloud" },

    // Metrics & Daemons
    { name: "Prometheus / Alertmanager", category: "Metrics & Daemons", icon: integrationIcons.prometheus, description: "Open-source systems monitoring.", href: "/docs/integrations/prometheus" },
    { name: "Grafana", category: "Metrics & Daemons", icon: integrationIcons.grafana, description: "Operational dashboards and alerting.", href: "/docs/integrations/grafana" },
    { name: "Zabbix", category: "Metrics & Daemons", icon: integrationIcons.zabbix, description: "Enterprise-class monitoring solution.", href: "/docs/integrations/zabbix" },
    { name: "Nagios", category: "Metrics & Daemons", icon: integrationIcons.nagios, description: "IT infrastructure monitoring.", href: "/docs/integrations/nagios" },
    { name: "Icinga 2", category: "Metrics & Daemons", icon: integrationIcons.icinga, description: "Open source monitoring system.", href: "/docs/integrations/icinga" },

    // CI/CD & DevOps
    { name: "GitHub Actions", category: "CI/CD & DevOps", icon: integrationIcons.github, description: "Automate your software workflows.", href: "/docs/integrations/github" },
    { name: "GitLab CI/CD", category: "CI/CD & DevOps", icon: integrationIcons.gitlab, description: "Continuous integration and deployment.", href: "/docs/integrations/gitlab" },
    { name: "Bitbucket Pipelines", category: "CI/CD & DevOps", icon: integrationIcons.bitbucket, description: "Integrated CI/CD for Bitbucket.", href: "/docs/integrations/bitbucket" },
    { name: "Vercel", category: "CI/CD & DevOps", icon: integrationIcons.vercel, description: "Develop, preview, and ship.", href: "/docs/integrations/vercel" },

    // Uptime & Synthetics
    { name: "UptimeRobot", category: "Uptime & Synthetics", icon: integrationIcons.uptimerobot, description: "Free website uptime monitor.", href: "/docs/integrations/uptimerobot" },
    { name: "Pingdom", category: "Uptime & Synthetics", icon: integrationIcons.pingdom, description: "Website performance and availability.", href: "/docs/integrations/pingdom" },
    { name: "Better Uptime", category: "Uptime & Synthetics", icon: integrationIcons.betterstack, description: "Uptime monitoring and status pages.", href: "/docs/integrations/betteruptime" },
    { name: "Uptime Kuma", category: "Uptime & Synthetics", icon: integrationIcons.uptimekuma, description: "Self-hosted monitoring tool.", href: "/docs/integrations/uptimekuma" },

    // Chat & Notifications
    { name: "Slack (ChatOps)", category: "Chat & Notifications", icon: integrationIcons.slack, description: "Incident response right in Slack.", href: "/docs/integrations/slack" },
    { name: "Jira Cloud", category: "Chat & Notifications", icon: integrationIcons.jira, description: "Create tickets automatically.", href: "/docs/integrations/jira" },
    { name: "WhatsApp Alerts", category: "Chat & Notifications", icon: integrationIcons.whatsapp, description: "High-priority WhatsApp pager alerts.", href: "/docs/integrations/whatsapp" },
    { name: "Email", category: "Chat & Notifications", icon: integrationIcons.email, description: "Standard email notifications.", href: "/docs/integrations/email" },
    { name: "SMS", category: "Chat & Notifications", icon: integrationIcons.sms, description: "Text message alerts.", href: "/docs/integrations/sms" },
    { name: "Webhooks", category: "Chat & Notifications", icon: integrationIcons.webhook, description: "Custom HTTP callback routing.", href: "/docs/integrations/webhooks" },
];

const categories: Category[] = [
    "All (28)",
    "APM & Monitoring",
    "Cloud Infrastructure",
    "Metrics & Daemons",
    "CI/CD & DevOps",
    "Uptime & Synthetics",
    "Chat & Notifications"
];

export function Integrations() {
    const [activeFilter, setActiveFilter] = useState<Category>("All (28)");

    const filtered = integrations.filter(it => activeFilter === "All (28)" || it.category === activeFilter);

    return (
        <section id="integrations" className="relative py-28 bg-slate-50 border-b border-slate-200/80 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold mb-4">
                        Ecosystem & Interoperability
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        28+ native integrations. Zero plugins needed.
                    </h2>
                    <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-normal">
                        Connect your existing observability, APM, cloud, and alert channels without writing custom adapters.
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                activeFilter === cat
                                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                                    : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-sm"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Drop-in PagerDuty Banner */}
                <div className="mb-12 max-w-3xl mx-auto bg-white border border-blue-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-3 text-blue-600 shadow-inner">
                        {integrationIcons.pagerduty}
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-bold text-lg mb-1">PagerDuty Events API v2 Emulation</h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Drop-in endpoint - change URL to {BRAND.name} and everything works instantly. No need to update existing monitoring integrations or scripts.</p>
                    </div>
                </div>

                {/* Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16"
                >
                    <AnimatePresence>
                        {filtered.map((item) => (
                            <motion.div
                                key={item.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link href={item.href} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-500/40 hover:shadow-md transition-all group h-full shadow-sm">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-2 shrink-0 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-slate-900 font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/integrations"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-500 transition-colors group"
                    >
                        View all 28+ integrations directory 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
