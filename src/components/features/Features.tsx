"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Activity,
    Calendar,
    Bell,
    Network,
    Globe,
    Repeat,
    ShieldCheck,
    Lock,
    MessageSquare,
    FileText,
    Box,
    CheckCircle2
} from "lucide-react";

const spotlights = [
    {
        id: "command-center",
        title: "Real-Time Incident Command Center",
        image: "/dashboard-command-center.png",
        description: "End-to-end incident orchestration. Ingest alerts from 24+ monitoring tools, deduplicate signals in real time, auto-provision Slack war rooms, assign incident commanders, and generate automated postmortems.",
        highlights: ["Real-time SSE event streams", "Multi-source alert correlation", "Audit-ready incident timeline", "Role-based command hierarchy"],
        icon: Activity
    },
    {
        id: "scheduling",
        title: "Multi-Layer On-Call Scheduling & Rotations",
        image: "/schedule-main.png",
        description: "Flexible on-call schedules with timezone-aware rotations, shift overrides, multi-layer tiers, and calendar sync (iCal/Google Calendar). Ensure 24/7 coverage without alert fatigue.",
        highlights: ["Layered rotation schedules", "Instant shift overrides & swaps", "Timezone conversion engine", "Fair on-call distribution analytics"],
        icon: Calendar
    },
    {
        id: "escalation",
        title: "Multi-Tier Escalation Policies & Routing",
        image: "/escalation-policies.png",
        description: "Define automated escalation paths with configurable delay timers, multi-user paging, and fallbacks. Route alerts by service, team, or severity.",
        highlights: ["Step-based delay triggers", "Multi-channel alerts (SMS, Email, Slack, Push)", "Service-based routing rules", "Automatic escalation acknowledgement"],
        icon: Bell
    },
    {
        id: "service-directory",
        title: "Service Directory & Health Intelligence",
        image: "/service-directory.png",
        description: "Map service dependencies, define SLOs/SLAs, track MTTA and MTTR, and identify chronic failure points before they trigger major outages.",
        highlights: ["Service catalog & ownership", "SLA / SLO compliance tracking", "MTTA / MTTR metric trends", "Component dependency mapping"],
        icon: Network
    },
    {
        id: "status-pages",
        title: "Branded Public & Private Status Pages",
        image: "/dashboard-command-center-1200.jpg",
        description: "Keep stakeholders and users informed with beautiful, customizable status pages. Support custom domains, automated incident timeline posts, component health status, and email/webhook subscriptions.",
        highlights: ["Custom domain support", "Real-time subscriber notifications", "Automated component status sync", "Incident retrospective logs"],
        icon: Globe
    }
];

const gridFeatures = [
    {
        title: "Drop-in PagerDuty Emulation",
        description: "Point your monitoring webhooks directly to OpsKnight with zero code changes.",
        icon: Repeat
    },
    {
        title: "Role-Based Access Control",
        description: "Granular permissions for Admins, Responders, Observers, and Team Leads.",
        icon: ShieldCheck
    },
    {
        title: "Encrypted Webhooks & Signatures",
        description: "HMAC-SHA256 signature verification for AWS, Datadog, Grafana, Sentry, and custom endpoints.",
        icon: Lock
    },
    {
        title: "Slack & ChatOps Integration",
        description: "Trigger, acknowledge, resolve, and reassign incidents directly from Slack.",
        icon: MessageSquare
    },
    {
        title: "Audit Logs & Compliance",
        description: "Immutable event log tracking every configuration change and incident action.",
        icon: FileText
    },
    {
        title: "Single Docker Container",
        description: "Deploys in seconds with zero bloat and runs on as little as 512MB RAM.",
        icon: Box
    }
];

export function Features() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section id="features" className="relative py-32 bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                        <Activity className="w-4 h-4" />
                        Complete Reliability Suite
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Everything you need to resolve incidents in record time.
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl">
                        Built for DevOps, SREs, and platform teams who demand control, privacy, and speed.
                    </p>
                </motion.div>

                {/* Interactive Feature Spotlight */}
                <div className="flex flex-col lg:flex-row gap-12 mb-32">
                    
                    {/* Tabs */}
                    <div className="lg:w-1/3 flex flex-col gap-2">
                        {spotlights.map((spotlight, index) => {
                            const isActive = activeTab === index;
                            return (
                                <button
                                    key={spotlight.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`flex items-start gap-4 p-5 rounded-2xl text-left transition-all duration-300 ${
                                        isActive 
                                            ? "bg-slate-900 border border-slate-700 shadow-xl" 
                                            : "hover:bg-slate-900/50 border border-transparent opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <div className={`mt-1 p-2 rounded-lg transition-colors ${isActive ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-400"}`}>
                                        <spotlight.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold text-lg mb-1 transition-colors ${isActive ? "text-white" : "text-slate-300"}`}>
                                            {spotlight.title}
                                        </h3>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-2/3">
                        <div className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl h-full flex flex-col">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full h-[350px] md:h-[450px] bg-slate-950 border-b border-slate-800">
                                        <Image 
                                            src={spotlights[activeTab].image} 
                                            alt={spotlights[activeTab].title}
                                            fill
                                            className="object-cover object-top opacity-90"
                                            sizes="(max-width: 768px) 100vw, 66vw"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                    </div>

                                    {/* Text & Highlights */}
                                    <div className="p-8 md:p-10 flex-grow flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-white mb-4">
                                            {spotlights[activeTab].title}
                                        </h3>
                                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                            {spotlights[activeTab].description}
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                                            {spotlights[activeTab].highlights.map((highlight, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                    <span className="text-slate-300 font-medium">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Feature Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {gridFeatures.map((feature, idx) => (
                        <div 
                            key={idx} 
                            className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 hover:bg-slate-900/80 hover:border-white/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-6 border border-white/5">
                                <feature.icon className="w-6 h-6 text-blue-400" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
