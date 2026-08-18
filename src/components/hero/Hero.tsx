"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Github, Copy, Check, Terminal, Shield, Server, Box, Users } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";

export function Hero() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32 bg-slate-950">
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Top Red Alert & Release Badge - Matching Core App */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-slate-900/90 border border-red-500/25 shadow-lg shadow-red-500/5"
                    >
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-ping" />
                            RED ALERT · Self-Hosted Incident Command
                        </span>
                        <div className="w-px h-3 bg-white/20"></div>
                        <span className="text-xs text-slate-300 font-mono">v1.3.1</span>
                        <div className="w-px h-3 bg-white/20"></div>
                        <span className="text-xs text-slate-400 font-mono">AGPL-3.0</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="w-full"
                    >
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto text-center">
                            The self-hosted command center for <span className="text-white bg-clip-text">on-call & incident response</span>.
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full mt-6"
                    >
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto text-center leading-relaxed">
                            Take back control from per-seat SaaS vendors. Multi-tier on-call rotations, automated escalations, 24+ native integrations, Slack war rooms, and branded status pages — running inside your infrastructure.
                        </p>
                    </motion.div>

                    {/* App Metrics Strip - Directly Matching Screenshot */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full mx-auto mt-8 text-left"
                    >
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 shadow-md">
                            <div className="text-xl sm:text-2xl font-black text-white">347</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">TOTAL INCIDENTS</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-red-500/20 shadow-md">
                            <div className="text-xl sm:text-2xl font-black text-red-400">384</div>
                            <div className="text-[10px] font-bold text-red-300/80 uppercase tracking-wider mt-0.5">OPEN ALERTS</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 shadow-md">
                            <div className="text-xl sm:text-2xl font-black text-emerald-400">165</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">RESOLVED (30D)</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 shadow-md">
                            <div className="text-xl sm:text-2xl font-black text-sky-400">&lt; 15ms</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">PAGE LATENCY</div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full"
                    >
                        <Link
                            href="/docs"
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 hover:bg-red-500 px-8 text-sm font-bold text-white transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02]"
                        >
                            + Deploy Community Edition
                        </Link>
                        <Link
                            href="https://status.opsknight.com"
                            target="_blank"
                            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 px-6 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block"></span>
                            Live Command Center Demo
                        </Link>
                        <Link
                            href="https://github.com/opsknight-labs/OpsKnight"
                            target="_blank"
                            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 text-sm font-medium text-slate-300 hover:text-white transition-colors px-5 hover:bg-white/5"
                        >
                            <Github className="mr-2 w-4 h-4" />
                            Star on GitHub
                        </Link>
                    </motion.div>

                    {/* Terminal Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-12 w-full max-w-2xl mx-auto"
                    >
                        <div className="flex items-center justify-between p-1 pl-4 rounded-xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden group">
                            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-3">
                                <Terminal className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <code className="text-sm text-sky-400 font-mono whitespace-nowrap">
                                    docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest
                                </code>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="flex-shrink-0 ml-4 mr-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-2"
                                title="Copy command"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-blue-400" />
                                        <span className="text-xs font-medium text-blue-400">Copied!</span>
                                    </>
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Interactive Product Showcase Window */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="mt-20 w-full max-w-6xl mx-auto perspective-[2000px]"
                    >
                        <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/5">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-4 h-12 bg-slate-950/80 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>
                                <div className="hidden sm:flex items-center gap-6">
                                    <span className="text-xs font-medium text-white px-3 py-1 rounded-md bg-white/10">Command Center</span>
                                    <span className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Incidents Timeline</span>
                                    <span className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">On-Call Rotations</span>
                                    <span className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Escalations</span>
                                    <span className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Status Page</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-white/5">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">command-center.opsknight.io</span>
                                </div>
                            </div>

                            {/* Window Content */}
                            <div className="relative w-full bg-slate-950">
                                <Image
                                    src="/dashboard-command-center.png"
                                    alt="OpsKnight Command Center Dashboard"
                                    width={1400}
                                    height={800}
                                    priority
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        {/* Value Props Row */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                            <div className="flex flex-col gap-2 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <Shield className="w-6 h-6 text-blue-400 mb-2" />
                                <h3 className="text-sm font-semibold text-white">100% Self-Hosted & AGPL-3.0</h3>
                                <p className="text-sm text-slate-400">Keep your data entirely within your own infrastructure.</p>
                            </div>
                            <div className="flex flex-col gap-2 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <Box className="w-6 h-6 text-blue-400 mb-2" />
                                <h3 className="text-sm font-semibold text-white">24+ Built-in Integrations</h3>
                                <p className="text-sm text-slate-400">Native monitoring connections out of the box.</p>
                            </div>
                            <div className="flex flex-col gap-2 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <Server className="w-6 h-6 text-blue-400 mb-2" />
                                <h3 className="text-sm font-semibold text-white">Drop-in PagerDuty API</h3>
                                <p className="text-sm text-slate-400">Migrate instantly using existing PagerDuty webhooks.</p>
                            </div>
                            <div className="flex flex-col gap-2 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <Users className="w-6 h-6 text-blue-400 mb-2" />
                                <h3 className="text-sm font-semibold text-white">Unlimited Usage</h3>
                                <p className="text-sm text-slate-400">No arbitrary limits on users, services, or incidents.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
