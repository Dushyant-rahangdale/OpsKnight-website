"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Database, Repeat, Clock } from "lucide-react";

const stats = [
    {
        label: "Concurrent SSE Streams",
        value: "500+",
        description: "Live real-time dashboard listeners with zero Redis overhead",
        icon: Zap,
        color: "from-blue-600 to-blue-800",
    },
    {
        label: "Incident Ingestion Throughput",
        value: "300 / min",
        description: "Deduplicated, fingerprinted, and stored with sub-millisecond hashing",
        icon: Database,
        color: "from-blue-500 to-blue-700",
    },
    {
        label: "Multi-Channel Dispatches",
        value: "600 / min",
        description: "High-throughput Slack, SMS, Push, and Webhook dispatching",
        icon: Repeat,
        color: "from-purple-500 to-purple-700",
    },
    {
        label: "Ingestion-to-Page Latency",
        value: "< 15ms",
        description: "From incoming HTTP webhook payload to escalation trigger",
        icon: Clock,
        color: "from-orange-500 to-orange-700",
    },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 h-full flex flex-col"
        >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-6`}>
                <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">{stat.label}</h3>
            <p className="text-sm text-slate-400 mt-auto">
                {stat.description}
            </p>
        </motion.div>
    );
}

export function Stats() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
                        Performance Benchmarks
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Engineered for enterprise scale.
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Tested and benchmarked under high-volume alert storm conditions.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/docs/v1.3/core-concepts/scalability"
                        className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors group"
                    >
                        View scalability documentation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
