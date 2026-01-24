"use client";

import { motion } from "framer-motion";
import {
    AlertTriangle,
    Calendar,
    Globe,
    Bell,
    BarChart3,
    Users,
    FileText,
    Shield,
    List,
    Plug,
    Package,
    Zap,
} from "lucide-react";

const flowSteps = [
    {
        title: "Detect",
        description: "Ingest alerts from monitoring sources.",
        icon: Zap,
    },
    {
        title: "Coordinate",
        description: "Trigger on-call and track ownership.",
        icon: Users,
    },
    {
        title: "Communicate",
        description: "Update status pages instantly.",
        icon: Globe,
    },
    {
        title: "Learn",
        description: "Capture postmortems and insights.",
        icon: FileText,
    },
];

const features = [
    {
        icon: AlertTriangle,
        title: "Incident Command",
        description:
            "Run the full incident lifecycle from trigger to resolution with timelines, assignments, and audit trails. Centralize communication and track every action in real-time.",
        className: "md:col-span-2",
    },
    {
        icon: Calendar,
        title: "On-Call Scheduling",
        description:
            "Design layered rotations, overrides, and handoffs to keep coverage reliable across teams.",
        className: "",
    },
    {
        icon: Bell,
        title: "Escalations & Routing",
        description:
            "Automate escalation paths, urgency mapping, and multi-channel alert routing to ensure the right person is notified.",
        className: "",
    },
    {
        icon: Globe,
        title: "Status Pages",
        description:
            "Publish branded status pages and keep customers updated with incident timelines. Communicate trust with transparency.",
        className: "md:col-span-2",
    },
    {
        icon: Shield,
        title: "Service Reliability",
        description:
            "Track service health, apply SLOs, and surface risk before the breach. Proactive reliability engineering.",
        className: "",
    },
    {
        icon: BarChart3,
        title: "Analytics & SLA",
        description:
            "Measure MTTA, MTTR, SLA compliance, and trends across incidents and services. Drive continuous improvement.",
        className: "",
    },
];

const additionalFeatures = [
    { icon: Plug, title: "Webhooks", description: "Connect any tool" },
    { icon: List, title: "Event Logs", description: "Trace every change" },
    { icon: Shield, title: "Security", description: "Audit logs & SSO" },
    { icon: Package, title: "Helm Ready", description: "Kubernetes native" },
];

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof features)[0];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`group h-full p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:bg-slate-900/80 hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] cursor-default relative overflow-hidden ${feature.className || ""}`}
        >
            {/* Gradient Blob for Glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 border border-white/5 transition-all duration-500">
                    <feature.icon className="w-6 h-6 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors">{feature.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
}

export function Features() {
    return (
        <section id="features" className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Everything you need <br />
                        <span className="text-slate-500">for incident response.</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg hover:text-slate-300 transition-colors">
                        A complete platform to manage incidents, on-call schedules,
                        and keep your services running smoothly.
                    </p>
                </motion.div>

                {/* Ops Flow - Active Signal Pipeline */}
                <div className="mb-24 relative">
                    {/* Connecting Line with Signal */}
                    <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden hidden md:block">
                        <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-[shimmer_2s_infinite] opacity-50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        {flowSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative z-10 bg-slate-950 p-6 rounded-2xl border border-white/5 text-center group hover:border-emerald-500/30 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)] transition-all duration-300"
                            >
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-300 shadow-xl">
                                    <step.icon className="w-5 h-5 text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all" />
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500 leading-snug">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Main Features Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 auto-rows-[minmax(250px,auto)]">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                {/* Additional Features List - Compact */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-t border-white/5 pt-12">
                    {additionalFeatures.map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center gap-3 text-sm text-slate-400 group cursor-default"
                        >
                            <div className="p-1.5 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                <feat.icon className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div>
                                <span className="font-semibold text-slate-300 group-hover:text-white transition-colors">{feat.title}</span>
                                <span className="mx-2 text-slate-700">|</span>
                                <span className="text-slate-500 group-hover:text-slate-400 transition-colors">{feat.description}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
