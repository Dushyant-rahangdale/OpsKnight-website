"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Shield,
    Repeat,
    Calendar,
    MessageSquare,
    FileText,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const bentoFeatures = [
    {
        icon: Zap,
        tag: "Low-Latency Core",
        title: "Sub-Second Real-Time Telemetry",
        description: "Built on live SSE streams and lightweight React client states. Triage, acknowledge, and coordinate critical incidents with zero page reloads and sub-15ms ingest latency.",
        metric: "< 15ms",
        metricLabel: "Parse & Route Speed",
        highlights: ["Real-time Red Alert Beacon", "Sub-second triage actions", "Zero stale cache polling"],
        colSpan: "lg:col-span-2"
    },
    {
        icon: Shield,
        tag: "Security & Privacy",
        title: "100% VPC Data Sovereignty",
        description: "Deploy in your own AWS, GCP, Azure, or Kubernetes cluster. All alert payloads, customer metadata, and audit traces remain entirely within your private network.",
        metric: "100%",
        metricLabel: "On-Prem / VPC Isolation",
        highlights: ["Zero external data leakage", "AGPL-3.0 Full Source", "Air-gap deployment ready"],
        colSpan: "lg:col-span-1"
    },
    {
        icon: Repeat,
        tag: "Instant Migration",
        title: "Drop-in PagerDuty API v2",
        description: "Switch from legacy per-seat vendors in 30 seconds. Point your existing PagerDuty webhooks directly to OpsKnight without touching your monitoring agents or codebase.",
        metric: "30 sec",
        metricLabel: "Zero-Downtime Migration",
        highlights: ["v2/enqueue compatibility", "HMAC-SHA256 signature verification", "Zero alert loss fallback"],
        colSpan: "lg:col-span-1"
    },
    {
        icon: Calendar,
        tag: "On-Call Scheduling",
        title: "Timezone-Aware Multi-Layer Rotations",
        description: "Design multi-tier primary, secondary, and shadow shifts that adapt automatically to global engineer timezones, daylight savings, and temporary shift swaps.",
        metric: "24/7",
        metricLabel: "Multi-Tier Coverage",
        highlights: ["1-click shift overrides", "iCal / Google Calendar sync", "Fair on-call load balance"],
        colSpan: "lg:col-span-2"
    },
    {
        icon: MessageSquare,
        tag: "Bi-Directional ChatOps",
        title: "Native Slack War Rooms & Video",
        description: "Auto-provision dedicated war room channels for critical incidents with built-in Jitsi WebRTC, Google Meet, or Zoom bridges and interactive triage buttons.",
        metric: "Bi-Directional",
        metricLabel: "Live ChatOps Sync",
        highlights: ["Auto-join incident commander", "Jitsi / Meet / Zoom bridges", "Live channel archive into postmortems"],
        colSpan: "lg:col-span-2"
    },
    {
        icon: FileText,
        tag: "Continuous Learning",
        title: "Automated Postmortems & Retrospectives",
        description: "Turn every outage into actionable prevention. OpsKnight automatically compiles incident timelines, Slack war room discussions, and telemetry into structured retrospective reports.",
        metric: "Auto-Draft",
        metricLabel: "Retrospective Reports",
        highlights: ["Chronological audit timeline", "Root cause & contributing factors", "Action item tracking & export"],
        colSpan: "lg:col-span-1"
    }
];

export function Features() {
    return (
        <section id="features" className="relative py-28 bg-slate-950 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
                        Enterprise Architecture
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
                        Engineered for sub-second incident resolution.
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                        Every layer of OpsKnight is crafted for speed, resilience, and complete data privacy — giving your SRE and DevOps teams absolute command over production outages.
                    </p>
                </motion.div>

                {/* Clean Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bentoFeatures.map((feat, idx) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className={`${feat.colSpan} flex flex-col justify-between p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-blue-500/30 hover:bg-slate-900/90 transition-all duration-300 shadow-xl group`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                        <feat.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-base font-black text-white font-mono">{feat.metric}</div>
                                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{feat.metricLabel}</div>
                                    </div>
                                </div>

                                <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 font-medium mb-3">
                                    {feat.tag}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feat.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {feat.description}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {feat.highlights.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Link to Docs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <Link
                        href="/docs"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Explore full technical architecture and developer specifications
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
