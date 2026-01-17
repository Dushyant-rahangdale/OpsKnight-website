"use client";

import { motion } from "framer-motion";
import { Github, Shield, Layers, Plug, Heart } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: Shield,
        title: "Own your reliability stack",
        description: "Run OpsSentinal in your cloud with full control and privacy.",
    },
    {
        icon: Layers,
        title: "Built for platform teams",
        description: "Incident response, on-call, and analytics in one command center.",
    },
    {
        icon: Plug,
        title: "Integrations first",
        description: "Connect monitoring, APM, and uptime signals without rewiring workflows.",
    },
];

const stats = [
    { label: "Self-hosted", value: "100%" },
    { label: "Integrations", value: "20+" },
    { label: "License", value: "AGPL-3.0" },
];

export function SocialProof() {
    return (
        <section className="relative py-24 bg-slate-950 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Open Source Banner */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl p-8 md:p-12 overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950"
                >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
                                <Heart className="w-3 h-3 fill-emerald-500/50" />
                                Open Source & Community Driven
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Transparent by design. <br />
                                <span className="text-slate-400">Trust isn&apos;t bought, it&apos;s built.</span>
                            </h2>
                            <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">
                                OpsSentinal is built in the open. You can audit every line of code, contribute features,
                                and host it entirely within your own infrastructure without vendor lock-in.
                            </p>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link
                                    href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                    target="_blank"
                                    className="btn-primary bg-white text-slate-950 hover:bg-slate-200 border-none"
                                >
                                    <Github className="w-4 h-4 mr-2" />
                                    View Source Code
                                </Link>
                                <Link
                                    href="https://github.com/sponsors/Dushyant-rahangdale"
                                    target="_blank"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 transition-all text-sm font-medium"
                                >
                                    <Heart className="w-4 h-4 mr-2 fill-current" />
                                    Sponsor Us
                                </Link>
                                <div className="hidden sm:flex items-center gap-6 pl-6 border-l border-white/10">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <p className="text-lg font-bold text-white">{stat.value}</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pillars List */}
                        <div className="grid gap-4">
                            {pillars.map((pillar) => (
                                <div key={pillar.title} className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                                            <pillar.icon className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{pillar.title}</h3>
                                            <p className="text-sm text-slate-400">{pillar.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
