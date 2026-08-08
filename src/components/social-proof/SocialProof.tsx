"use client";

import { motion } from "framer-motion";
import { Github, Shield, Layers, Plug, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

const pillars = [
    {
        icon: Shield,
        title: "Own your reliability stack",
        description: `Run ${BRAND.name} in your cloud with full control and privacy.`,
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
    { label: "License", value: BRAND.license },
];

const tools = [
    "Datadog", "Prometheus", "Grafana", "Slack", "Jira Cloud", "AWS CloudWatch", "New Relic", "Sentry", "Splunk", "Azure Monitor", "Google Cloud", "GitHub", "Bitbucket", "UptimeRobot"
];

function TechTicker() {
    return (
        <div className="mt-24 border-t border-white/5 pt-12">
            <p className="text-center text-slate-500 text-sm font-bold mb-10 uppercase tracking-widest">
                Works seamlessly with
            </p>
            <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <motion.div
                    className="flex gap-16 whitespace-nowrap pr-16"
                    animate={{ x: "-50%" }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {[...tools, ...tools].map((tool, i) => (
                        <div key={i} className="flex items-center gap-2 group cursor-default">
                            <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-emerald-500 transition-colors" />
                            <span className="text-2xl font-bold text-slate-700 group-hover:text-slate-300 transition-colors">
                                {tool}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export function SocialProof() {
    return (
        <section className="relative py-24 bg-slate-950 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Open Source Banner */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 shadow-2xl"
                >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />

                    <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 shadow-[0_0_10px_-3px_rgba(16,185,129,0.3)]">
                                <Heart className="w-3 h-3 fill-emerald-500/50" />
                                Open Source & Community Driven
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                Transparent by design. <br />
                                <span className="text-slate-500">Trust isn&apos;t bought, it&apos;s built.</span>
                            </h2>
                            <p className="text-slate-400 max-w-xl mb-8 leading-relaxed text-lg">
                                {BRAND.name} is built in the open. You can audit every line of code, contribute features,
                                and host it entirely within your own infrastructure without vendor lock-in.
                            </p>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-white text-slate-950 hover:bg-slate-200 border-none h-12 px-6 shadow-xl shadow-white/5"
                                >
                                    <Link
                                        href={BRAND.links.github}
                                        target="_blank"
                                    >
                                        <Github className="w-5 h-5 mr-2" />
                                        View Source Code
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="px-6 h-12 rounded-xl border-pink-500/20 bg-pink-500/5 text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/40 hover:text-pink-300 hover:scale-105 transition-all shadow-[0_0_15px_-5px_rgba(236,72,153,0.3)]"
                                >
                                    <Link
                                        href={BRAND.links.sponsor}
                                        target="_blank"
                                    >
                                        <Heart className="w-4 h-4 mr-2 fill-current" />
                                        Sponsor Us
                                    </Link>
                                </Button>
                                <div className="hidden sm:flex items-center gap-8 pl-8 border-l border-white/10">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="text-center group cursor-default">
                                            <p className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{stat.value}</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pillars List */}
                        <div className="grid gap-4">
                            {pillars.map((pillar) => (
                                <div key={pillar.title} className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 hover:scale-[1.02] transition-all duration-300">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                                            <pillar.icon className="w-6 h-6 text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors text-lg">{pillar.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300">{pillar.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Tech Scroller */}
                <TechTicker />
            </div>
        </section>
    );
}
