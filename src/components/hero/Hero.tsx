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
        <section className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32 bg-slate-50 border-b border-slate-200/80">
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Top Red Alert & Release Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"
                    >
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-ping" />
                            RED ALERT · Self-Hosted Incident Command
                        </span>
                        <div className="w-px h-3 bg-slate-200"></div>
                        <span className="text-xs text-slate-700 font-mono font-semibold">v1.3.1</span>
                        <div className="w-px h-3 bg-slate-200"></div>
                        <span className="text-xs text-slate-500 font-mono">AGPL-3.0</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="w-full"
                    >
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] max-w-4xl mx-auto text-center">
                            The self-hosted command center for <span className="text-blue-600">on-call & incident response</span>.
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full mt-6"
                    >
                        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto text-center leading-relaxed font-normal">
                            Take back control from per-seat SaaS vendors. Multi-tier on-call rotations, automated escalations, 28+ native integrations, Slack war rooms, and branded status pages — running inside your private infrastructure.
                        </p>
                    </motion.div>

                    {/* App Metrics Strip - Matching Product */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full mx-auto mt-8 text-left"
                    >
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="text-xl sm:text-2xl font-black text-slate-900">347</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">TOTAL INCIDENTS</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-red-200 shadow-sm">
                            <div className="text-xl sm:text-2xl font-black text-red-600">384</div>
                            <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider mt-0.5">OPEN ALERTS</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="text-xl sm:text-2xl font-black text-emerald-600">165</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">RESOLVED (30D)</div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="text-xl sm:text-2xl font-black text-blue-600">&lt; 15ms</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">PAGE LATENCY</div>
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
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-8 text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
                        >
                            + Deploy Community Edition ($0)
                        </Link>
                        <Link
                            href="https://status.opsknight.com"
                            target="_blank"
                            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block"></span>
                            Live Status Demo
                        </Link>
                        <Link
                            href="https://github.com/opsknight-labs/OpsKnight"
                            target="_blank"
                            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors px-5 hover:bg-slate-100 shadow-sm"
                        >
                            <Github className="mr-2 w-4 h-4" />
                            Star on GitHub
                        </Link>
                    </motion.div>

                    {/* Interactive Deployment Command Switcher (Dark Dev Terminal) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-12 w-full max-w-2xl mx-auto"
                    >
                        <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-t border-x border-slate-800 rounded-t-2xl text-xs font-mono">
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
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
                                <span className="text-[11px] text-slate-400 hidden sm:inline">Production Ready</span>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between bg-slate-950 border border-slate-800 rounded-b-2xl p-4 font-mono text-xs sm:text-sm text-slate-200 shadow-2xl">
                            <div className="flex items-center gap-3 overflow-x-auto py-1 pr-12 scrollbar-none text-left">
                                <Terminal className="w-4 h-4 text-sky-400 shrink-0" />
                                <span className="text-emerald-400 shrink-0">$</span>
                                <span className="text-slate-100 whitespace-nowrap">{deployCommands[deployMethod]}</span>
                            </div>

                            <button
                                onClick={handleCopy}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700 shadow-sm"
                                title="Copy command"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
