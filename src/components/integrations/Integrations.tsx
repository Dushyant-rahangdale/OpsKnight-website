"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { integrationIcons, IntegrationKey } from "../icons/IntegrationIcons";

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
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Connect your stack
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        OpsSentinal acts as the central nervous system for your reliability stack.
                    </p>
                </div>

                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 items-center">

                    {/* Sources (Left) - Compact Grid */}
                    <div className="relative">
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
                                    alt="OpsSentinal"
                                    fill
                                    className="object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Destinations (Right) - Vertical List */}
                    <div className="flex flex-col gap-4 relative">
                        {destinations.map((item, index) => (
                            <div key={item.key} className="relative">
                                <IntegrationItem item={item} index={index} align="right" />
                                <ConnectionLine side="right" total={destinations.length} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="text-center text-slate-500 text-sm mt-16"
                >
                    ...and we are continuously adding more.
                </motion.p>
            </div>
        </section>
    );
}
