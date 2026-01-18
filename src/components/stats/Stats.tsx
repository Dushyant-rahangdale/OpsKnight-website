"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Clock, Shield, Zap } from "lucide-react";

const stats = [
    {
        label: "Rapid Setup",
        value: 5,
        suffix: "m",
        description: "Deploy in minutes with Docker or K8s",
        icon: Clock,
        color: "from-emerald-500 to-cyan-500",
    },
    {
        label: "Event Throughput",
        value: 1000,
        suffix: "/s",
        description: "High-performance ingestion engine",
        icon: TrendingUp,
        color: "from-blue-500 to-indigo-500",
    },
    {
        label: "Data Control",
        value: 100,
        suffix: "%",
        description: "Full ownership of your data and infrastructure",
        icon: Shield,
        color: "from-amber-500 to-orange-500",
    },
    {
        label: "Integrations",
        value: 20,
        suffix: "+",
        description: "Connect with your favorite tools instantly",
        icon: Zap,
        color: "from-rose-500 to-pink-500",
    },
];

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const stepValue = value / steps;
            let current = 0;
            const interval = setInterval(() => {
                current += stepValue;
                if (current >= value) {
                    setDisplayValue(value);
                    clearInterval(interval);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(interval);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
    );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
        >
            {/* Glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

            <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-2">{stat.label}</h3>

                {/* Description */}
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {stat.description}
                </p>
            </div>
        </motion.div>
    );
}

export function Stats() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                        <TrendingUp className="w-3 h-3" />
                        By the Numbers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Built for performance at scale
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        OpsSentinel is designed to handle enterprise-grade incident management
                        while maintaining blazing-fast response times.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
