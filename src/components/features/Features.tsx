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
        description: "Auto-provision dedicated channels (#inc-*) on P1 incidents, invite primary responders, and launch instant Jitsi Meet WebRTC, Google Meet, or Zoom bridges.",
        metric: "Instant",
        metricLabel: "War Room Creation",
        highlights: ["Interactive Slack buttons", "1-click Acknowledge / Resolve", "Video bridge auto-provisioning"],
        colSpan: "lg:col-span-1"
    },
    {
        icon: FileText,
        tag: "Automated Governance",
        title: "Postmortems & Compliance Audits",
        description: "Generate structured markdown retrospectives from timeline events with one click. Maintain immutable audit trails of all alert lifecycle actions for SOC2 & ISO27001.",
        metric: "0 Effort",
        metricLabel: "Timeline Compilation",
        highlights: ["Automated MTTA/MTTR metrics", "Markdown export", "Immutable audit logging"],
        colSpan: "lg:col-span-1"
    }
];

export function Features() {
    return (
        <section id="features" className="py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold mb-4">
                        Enterprise Reliability Engine
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Built for SREs, platform engineers, and on-call teams.
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                        Every tool you need to eliminate downtime, silence alert fatigue, and manage critical outages — without the enterprise SaaS markup.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {bentoFeatures.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.4 }}
                                className={`p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${feat.colSpan}`}
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                                            {feat.tag}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {feat.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            {feat.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-slate-200/60">
                                        {feat.highlights.map((item) => (
                                            <div key={item} className="flex items-center gap-2 text-xs text-slate-700">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-black text-blue-600 font-mono">{feat.metric}</div>
                                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{feat.metricLabel}</div>
                                    </div>
                                    <Link
                                        href="/docs"
                                        className="text-xs font-bold text-slate-700 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
                                    >
                                        Docs <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
