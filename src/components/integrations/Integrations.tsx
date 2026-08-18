"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { integrationIcons } from "../icons/IntegrationIcons";
import { BRAND } from "@/lib/brand";

// Fallback icon component
const FallbackIcon = ({ letter, color }: { letter: string; color: string }) => (
    <div className={`w-full h-full rounded-md flex items-center justify-center text-white font-bold text-xl`} style={{ backgroundColor: color }}>
        {letter}
    </div>
);

type Category = "All (24)" | "APM & Monitoring" | "Cloud Infrastructure" | "Metrics & Daemons" | "CI/CD & DevOps" | "Uptime & Synthetics" | "Chat & Notifications";

interface Integration {
    name: string;
    category: Category;
    icon: React.ReactNode;
    description: string;
    href: string;
}

const integrations: Integration[] = [
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
    { name: "Google Cloud Monitoring", category: "Cloud Infrastructure", icon: integrationIcons.googlecloud, description: "Metrics for Google Cloud.", href: "/docs/integrations/gcp" },

    // Metrics & Daemons
    { name: "Prometheus / Alertmanager", category: "Metrics & Daemons", icon: integrationIcons.prometheus, description: "Open-source systems monitoring.", href: "/docs/integrations/prometheus" },
    { name: "Grafana", category: "Metrics & Daemons", icon: integrationIcons.grafana, description: "Operational dashboards and alerting.", href: "/docs/integrations/grafana" },
    { name: "Zabbix", category: "Metrics & Daemons", icon: <FallbackIcon letter="Z" color="#D32F2F" />, description: "Enterprise-class monitoring solution.", href: "/docs/integrations/zabbix" },
    { name: "Nagios", category: "Metrics & Daemons", icon: <FallbackIcon letter="N" color="#005A9C" />, description: "IT infrastructure monitoring.", href: "/docs/integrations/nagios" },
    { name: "Icinga 2", category: "Metrics & Daemons", icon: <FallbackIcon letter="I" color="#00A2D3" />, description: "Open source monitoring system.", href: "/docs/integrations/icinga" },

    // CI/CD & DevOps
    { name: "GitHub Actions", category: "CI/CD & DevOps", icon: integrationIcons.github, description: "Automate your software workflows.", href: "/docs/integrations/github" },
    { name: "GitLab CI/CD", category: "CI/CD & DevOps", icon: <FallbackIcon letter="G" color="#E24329" />, description: "Continuous integration and deployment.", href: "/docs/integrations/gitlab" },
    { name: "Bitbucket Pipelines", category: "CI/CD & DevOps", icon: integrationIcons.bitbucket, description: "Integrated CI/CD for Bitbucket.", href: "/docs/integrations/bitbucket" },
    { name: "Vercel", category: "CI/CD & DevOps", icon: <FallbackIcon letter="V" color="#000000" />, description: "Develop, preview, and ship.", href: "/docs/integrations/vercel" },

    // Uptime & Synthetics
    { name: "UptimeRobot", category: "Uptime & Synthetics", icon: integrationIcons.uptimerobot, description: "Free website uptime monitor.", href: "/docs/integrations/uptimerobot" },
    { name: "Pingdom", category: "Uptime & Synthetics", icon: integrationIcons.pingdom, description: "Website performance and availability.", href: "/docs/integrations/pingdom" },
    { name: "Better Uptime", category: "Uptime & Synthetics", icon: integrationIcons.betterstack, description: "Uptime monitoring and status pages.", href: "/docs/integrations/betteruptime" },
    { name: "Uptime Kuma", category: "Uptime & Synthetics", icon: integrationIcons.uptimekuma, description: "Self-hosted monitoring tool.", href: "/docs/integrations/uptimekuma" },

    // Chat & Notifications
    { name: "Slack (ChatOps)", category: "Chat & Notifications", icon: integrationIcons.slack, description: "Incident response right in Slack.", href: "/docs/integrations/slack" },
    { name: "Jira Cloud", category: "Chat & Notifications", icon: integrationIcons.jira, description: "Create tickets automatically.", href: "/docs/integrations/jira" },
    { name: "Email", category: "Chat & Notifications", icon: integrationIcons.email, description: "Standard email notifications.", href: "/docs/integrations/email" },
    { name: "SMS", category: "Chat & Notifications", icon: integrationIcons.sms, description: "Text message alerts.", href: "/docs/integrations/sms" },
    { name: "Webhooks", category: "Chat & Notifications", icon: integrationIcons.webhook, description: "Custom HTTP callback routing.", href: "/docs/integrations/webhooks" },
];

const categories: Category[] = [
    "All (24)",
    "APM & Monitoring",
    "Cloud Infrastructure",
    "Metrics & Daemons",
    "CI/CD & DevOps",
    "Uptime & Synthetics",
    "Chat & Notifications"
];

export function Integrations() {
    const [activeFilter, setActiveFilter] = useState<Category>("All (24)");

    const filtered = integrations.filter(it => activeFilter === "All (24)" || it.category === activeFilter);

    return (
        <section id="integrations" className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/30 via-slate-950 to-slate-950 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-4">
                        Ecosystem & Interoperability
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        24+ native integrations. Zero plugins needed.
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        Connect your existing observability, APM, cloud, and alert channels without writing custom adapters.
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                                activeFilter === cat
                                    ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                                    : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Special Highlight */}
                <div className="mb-12 max-w-3xl mx-auto bg-blue-950/30 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 shrink-0 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center p-3 text-blue-400">
                        {integrationIcons.pagerduty}
                    </div>
                    <div>
                        <h3 className="text-blue-400 font-semibold text-lg mb-1">PagerDuty Events API v2 Emulation</h3>
                        <p className="text-slate-300 text-sm">Drop-in endpoint - change URL to {BRAND.name} and everything works instantly. No need to update existing integrations or scripts.</p>
                    </div>
                </div>

                {/* Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16"
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
                                <Link href={item.href} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all group h-full">
                                    <div className="w-10 h-10 shrink-0 text-slate-300 group-hover:text-blue-400 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium text-sm mb-1 group-hover:text-blue-400 transition-colors">{item.name}</h4>
                                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{item.description}</p>
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
                        className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors group"
                    >
                        View all 24+ integrations directory 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

