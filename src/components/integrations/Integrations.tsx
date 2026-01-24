"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Plug, Route, ShieldCheck, Sparkles } from "lucide-react";
import { integrationIcons, IntegrationKey } from "../icons/IntegrationIcons";
import { BRAND } from "@/lib/brand";

// Sources: Monitoring & Ingestion
const sources: { name: string; key: IntegrationKey; category: string }[] = [
    { name: "CloudWatch", key: "cloudwatch", category: "AWS" },
    { name: "Azure Monitor", key: "azure", category: "Cloud" },
    { name: "Google Cloud", key: "googlecloud", category: "Cloud" },
    { name: "Datadog", key: "datadog", category: "Monitoring" },
    { name: "New Relic", key: "newrelic", category: "Monitoring" },
    { name: "Prometheus", key: "prometheus", category: "Monitoring" },
    { name: "Grafana", key: "grafana", category: "Monitoring" },
    { name: "Sentry", key: "sentry", category: "Errors" },
    { name: "GitHub", key: "github", category: "DevOps" },
    { name: "Splunk", key: "splunk", category: "Logs" },
    { name: "Dynatrace", key: "dynatrace", category: "APM" },
    { name: "AppDynamics", key: "appdynamics", category: "APM" },
    { name: "Elastic", key: "elastic", category: "Logs" },
    { name: "Honeycomb", key: "honeycomb", category: "Observability" },
    { name: "Bitbucket", key: "bitbucket", category: "DevOps" },
    { name: "UptimeRobot", key: "uptimerobot", category: "Uptime" },
    { name: "Pingdom", key: "pingdom", category: "Uptime" },
    { name: "BetterStack", key: "betterstack", category: "Uptime" },
    { name: "UptimeKuma", key: "uptimekuma", category: "Uptime" },
];

// Destinations: Alerting & Routing
const destinations: { name: string; key: IntegrationKey; category: string }[] = [
    { name: "Slack", key: "slack", category: "Chat" },
    { name: "Email", key: "email", category: "Notification" },
    { name: "SMS", key: "sms", category: "Notification" },
    { name: "Push Notifications", key: "push", category: "Notification" },
    { name: "Webhook", key: "webhook", category: "Custom" },
];

const integrationPillars = [
    {
        title: "Inbound alerts",
        description: "Normalize signals from monitoring, logs, and APM tools into a single incident stream.",
        icon: Plug,
        color: "from-emerald-500/20 to-emerald-500/0",
    },
    {
        title: "Policy-based routing",
        description: "Route alerts to services, teams, and escalations with dedupe and enrichment.",
        icon: Route,
        color: "from-cyan-500/20 to-cyan-500/0",
    },
    {
        title: "Enterprise control",
        description: "Self-hosted delivery with auditability, rate limits, and secure webhooks.",
        icon: ShieldCheck,
        color: "from-amber-500/20 to-amber-500/0",
    },
];

const integrationStats = [
    {
        label: "Inbound sources",
        value: sources.length,
        suffix: "+",
    },
    {
        label: "Routing channels",
        value: destinations.length,
        suffix: "",
    },
    {
        label: "Total endpoints",
        value: sources.length + destinations.length,
        suffix: "+",
    },
];

function IntegrationItem({
    item,
    align = "left",
    index
}: {
    item: { name: string; key: IntegrationKey };
    align?: "left" | "right";
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: align === "left" ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-white/5 backdrop-blur-sm hover:bg-slate-800 hover:border-emerald-500/50 hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] transition-all duration-300 group w-full cursor-pointer ${align === "right" ? "flex-row-reverse text-right" : ""}`}
        >
            <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-950 flex items-center justify-center border border-white/5 group-hover:border-emerald-500/50 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <div className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                    {integrationIcons[item.key]}
                </div>
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
        </motion.div>
    );
}

function ConnectionLine({
    side,
    total,
    index
}: {
    side: "left" | "right",
    total: number,
    index: number
}) {
    const yPercent = total > 1 ? (index / (total - 1)) * 100 : 50;
    const pathD = side === "left"
        ? `M 0 ${yPercent}% C 50 ${yPercent}%, 50 50%, 100 50%`
        : `M 100 ${yPercent}% C 50 ${yPercent}%, 50 50%, 0 50%`;

    return (
        <svg className={`absolute top-0 bottom-0 ${side === "left" ? "left-full" : "right-full"} w-12 md:w-20 lg:w-24 h-full pointer-events-none hidden md:block overflow-visible`} style={{ zIndex: 0 }}>
            {/* Base Line */}
            <motion.path
                d={pathD}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.05) }}
            />
            {/* Travelling Data Packet */}
            <motion.path
                d={pathD}
                fill="none"
                stroke="url(#gradient-packet)"
                strokeWidth="2"
                strokeDasharray="4 150"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: side === "left" ? -154 : 154 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2 // Random start time for organic feel
                }}
            />
            <defs>
                <linearGradient id="gradient-packet" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export function Integrations() {
    return (
        <section id="integrations" className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/30 via-slate-950 to-slate-950 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
                        <Sparkles className="w-3 h-3" />
                        Integration ecosystem
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Integrations built for enterprise reliability
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        {BRAND.name} connects monitoring, logging, and on-call channels into one operational command center.
                        Standardize incoming signals, enforce routing policies, and deliver alerts without data lock-in.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-12">
                    {integrationPillars.map((pillar) => (
                        <div key={pillar.title} className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.color} pointer-events-none`} />
                            <div className="relative">
                                <pillar.icon className="w-6 h-6 text-white/80 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                                <p className="text-sm text-slate-300">{pillar.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                    {integrationStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-200"
                        >
                            <span className="text-emerald-300 font-semibold">
                                {stat.value.toLocaleString()}{stat.suffix}
                            </span>
                            <span className="text-slate-400">{stat.label}</span>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 items-center">

                    {/* Sources (Left) - Compact Grid */}
                    <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                Inbound sources
                            </div>
                            <span className="text-xs text-slate-500">{sources.length}+ providers</span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/20 border border-white/5 relative z-10 backdrop-blur-sm">
                            {sources.map((item, index) => (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:bg-slate-800 hover:border-emerald-500 hover:scale-110 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all duration-300 group relative z-10 hover:z-50 cursor-pointer"
                                    title={item.name}
                                >
                                    <div className="w-8 h-8 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                                        {integrationIcons[item.key]}
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400 group-hover:text-white text-center leading-tight transition-colors">
                                        {item.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Abstract Connection Beam from Grid to Hub */}
                        <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-30" />
                    </div>

                    {/* Central Hub */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative w-32 h-32 md:w-48 md:h-48 mx-auto z-20"
                    >
                        {/* Spinning Rings */}
                        <div className="absolute -inset-8 border border-dashed border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute -inset-8 border border-dashed border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                        {/* Glows */}
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />

                        {/* Core Container */}
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl shadow-emerald-500/20 flex items-center justify-center p-8 z-10 transition-transform hover:scale-105 duration-500">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/logo.svg"
                                    alt={BRAND.name}
                                    fill
                                    className="object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Destinations (Right) - Vertical List */}
                    <div className="flex flex-col gap-4 relative">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                Routing channels
                            </div>
                            <span className="text-xs text-slate-500">{destinations.length} channels</span>
                        </div>
                        {destinations.map((item, index) => (
                            <div key={item.key} className="relative">
                                <IntegrationItem item={item} index={index} align="right" />
                                <ConnectionLine side="right" total={destinations.length} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center gap-4 text-center">
                    <p className="text-slate-500 text-sm">
                        More integrations ship every release, and custom webhooks let you connect anything.
                    </p>
                    <Link
                        href="/docs/v1/integrations"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition-colors"
                    >
                        View integration docs
                    </Link>
                </div>
            </div>
        </section>
    );
}
