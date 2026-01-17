"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Shield, Users, Bell, Sparkles } from "lucide-react";

const metrics = [
    { label: "MTTA Target", value: "< 5 min", icon: <Activity className="w-4 h-4" />, status: "good" },
    { label: "SLA Target", value: "99.9%", icon: <Shield className="w-4 h-4" />, status: "good" },
    { label: "On-Call Load", value: "Balanced", icon: <Users className="w-4 h-4" />, status: "neutral" },
    { label: "Alert Health", value: "Quiet", icon: <Bell className="w-4 h-4" />, status: "neutral" },
];

const statusColors: Record<string, string> = {
    good: "text-accent-emerald",
    neutral: "text-accent-blue",
    warning: "text-accent-amber",
};

const activityFeed = [
    { label: "INC-2411", text: "Latency spike auto-mitigated", status: "good", time: "2m ago" },
    { label: "SLA Review", text: "SLO burn rate within budget", status: "neutral", time: "12m ago" },
    { label: "Status Page", text: "Maintenance scheduled", status: "neutral", time: "28m ago" },
    { label: "Escalation", text: "On-call handoff completed", status: "good", time: "1h ago" },
];

export function TelemetryDisplay() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % activityFeed.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass rounded-2xl p-6 max-w-md"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-blue" />
                    <span className="text-foreground-secondary text-sm font-semibold">Command Center</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-accent-blue/10 text-accent-blue text-xs font-semibold rounded-full">
                        LIVE SNAPSHOT
                    </span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3">
                        <div className={statusColors[metric.status]}>{metric.icon}</div>
                        <div>
                            <p className="text-foreground-muted text-xs uppercase tracking-wide">{metric.label}</p>
                            <p className={`font-mono text-sm ${statusColors[metric.status]}`}>{metric.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Terminal Ping Output */}
            <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-accent-blue font-mono text-xs">ops@sentinel</span>
                    <span className="text-foreground-muted font-mono text-xs">/timeline</span>
                    <span className="text-foreground font-mono text-xs">$ activity --recent</span>
                </div>
                <div className="space-y-2 min-h-[140px]">
                    {activityFeed.map((event, index) => (
                        <motion.div
                            key={event.label}
                            initial={false}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.3 }}
                            className={`flex items-start justify-between gap-3 rounded-md px-3 py-2 text-xs font-mono ${
                                index === activeIndex ? "bg-accent-blue/10 text-foreground" : "text-foreground-muted"
                            }`}
                        >
                            <div>
                                <span className={`mr-2 font-semibold ${statusColors[event.status]}`}>
                                    {event.label}
                                </span>
                                {event.text}
                            </div>
                            <span className="text-foreground-muted">{event.time}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Demo Notice */}
            <p className="text-center text-foreground-muted text-xs mt-4">
                Illustrative snapshot from the OpsSentinal dashboard
            </p>
        </motion.div>
    );
}
