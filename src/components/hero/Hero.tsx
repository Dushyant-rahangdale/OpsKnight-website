"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Github, Copy, Check, Terminal } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";

export function Hero() {
    const [deployMethod, setDeployMethod] = useState<"docker" | "compose" | "helm">("docker");
    const [copied, setCopied] = useState(false);

    const deployCommands: Record<string, string> = {
        docker: "docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest",
        compose: "curl -sSL https://opsknight.com/docker-compose.yml | docker compose up -d",
        helm: "helm repo add opsknight https://charts.opsknight.com && helm install opsknight opsknight/opsknight"
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(deployCommands[deployMethod]);
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

                    {/* Interactive Deployment Command Switcher */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-12 w-full max-w-2xl mx-auto"
                    >
                        <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a0f18] border-t border-x border-white/10 rounded-t-xl text-xs font-mono">
                            <div className="flex items-center gap-1.5">
                                {(["docker", "compose", "helm"] as const).map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setDeployMethod(method)}
                                        className={`px-3 py-1 rounded-md transition-all ${
                                            deployMethod === method
                                                ? "bg-white/10 text-sky-400 font-bold border border-sky-400/30"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        {method === "docker" ? "Docker" : method === "compose" ? "Compose" : "Helm / K8s"}
                                    </button>
                                ))}
                            </div>
                            <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">1-Line Quickstart</span>
                        </div>

                        <div className="flex items-center justify-between p-1 pl-4 rounded-b-xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden group">
                            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-3">
                                <Terminal className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <code className="text-xs sm:text-sm text-sky-400 font-mono whitespace-nowrap">
                                    {deployCommands[deployMethod]}
                                </code>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="flex-shrink-0 ml-4 mr-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-2"
                                title="Copy command"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-emerald-400" />
                                        <span className="text-xs font-medium text-emerald-400">Copied!</span>
                                    </>
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Ecosystem Trust Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-16 pt-8 border-t border-white/5 w-full max-w-4xl mx-auto"
                    >
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center mb-6">
                            Native Ingestion & Webhook Compatibility
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                Datadog
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                Prometheus
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-orange-400" />
                                Grafana
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                AWS CloudWatch
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-purple-500" />
                                Sentry
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Slack ChatOps
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-sky-500" />
                                Kubernetes
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                PagerDuty API v2
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
