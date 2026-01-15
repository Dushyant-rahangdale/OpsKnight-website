"use client";

import { motion } from "framer-motion";
import {
    AlertTriangle,
    Calendar,
    TrendingUp,
    Globe,
    Bell,
    BarChart3,
    Users,
    FileText,
    Shield,
    List,
} from "lucide-react";

// Real features from the codebase
const features = [
    {
        icon: AlertTriangle,
        title: "Incident Management",
        description:
            "Complete incident lifecycle from trigger to resolution. Track, triage, assign, and resolve incidents with full audit trails.",
        color: "text-accent-red",
        bgColor: "bg-accent-red/10",
    },
    {
        icon: Calendar,
        title: "On-Call Scheduling",
        description:
            "Create rotation schedules with multiple layers and overrides. Automated handoffs and coverage management.",
        color: "text-accent-cyan",
        bgColor: "bg-accent-cyan/10",
    },
    {
        icon: TrendingUp,
        title: "Escalation Policies",
        description:
            "Multi-tier escalation rules to ensure incidents reach the right people based on urgency and availability.",
        color: "text-accent-amber",
        bgColor: "bg-accent-amber/10",
    },
    {
        icon: Globe,
        title: "Status Page",
        description:
            "Public-facing status pages for your services. Keep customers informed about ongoing incidents and maintenance.",
        color: "text-accent-emerald",
        bgColor: "bg-accent-emerald/10",
    },
    {
        icon: Bell,
        title: "Multi-Channel Alerts",
        description:
            "Email, SMS, and push notifications via Twilio, AWS SNS, Firebase, Resend, SendGrid, and more.",
        color: "text-accent-blue",
        bgColor: "bg-accent-blue/10",
    },
    {
        icon: BarChart3,
        title: "Analytics & SLA",
        description:
            "Track MTTA, MTTR, and SLA compliance. Visualize incident trends and team performance metrics.",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
    },
];

const additionalFeatures = [
    { icon: Users, title: "Teams", description: "Organize users into teams" },
    { icon: FileText, title: "Postmortems", description: "Document incident learnings" },
    { icon: Shield, title: "Services", description: "Monitor service health" },
    { icon: List, title: "Event Logs", description: "Full audit trail" },
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-2xl p-6 relative overflow-hidden group transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div
                className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">{feature.title}</h3>
            <p className="text-foreground-secondary text-sm leading-relaxed relative z-10">
                {feature.description}
            </p>
        </motion.div>
    );
}

function MiniFeature({ feature, index }: { feature: (typeof additionalFeatures)[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
            className="flex items-start gap-3"
        >
            <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-accent-emerald" />
            </div>
            <div>
                <h4 className="text-foreground font-medium text-sm">{feature.title}</h4>
                <p className="text-foreground-muted text-xs">{feature.description}</p>
            </div>
        </motion.div>
    );
}

export function Features() {
    return (
        <section id="features" className="relative py-24 bg-background-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-accent-emerald text-sm font-medium uppercase tracking-wide">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
                        Everything you need for{" "}
                        <span className="gradient-text">incident response</span>
                    </h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto">
                        A complete platform to manage incidents, on-call schedules,
                        and keep your services running smoothly.
                    </p>
                </motion.div>

                {/* Main Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                {/* Additional Features */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-8"
                >
                    <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                        Plus more...
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {additionalFeatures.map((feature, index) => (
                            <MiniFeature key={feature.title} feature={feature} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
