"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Terminal, BookOpen, Construction } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { TelemetryDisplay } from "./TelemetryDisplay";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        {/* Development Phase Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-amber/20 border border-accent-amber/30 mb-6"
                        >
                            <Construction className="w-4 h-4 text-accent-amber" />
                            <span className="text-sm text-accent-amber font-medium">
                                In Development — Production ready in 1-2 months
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
                        >
                            Open-Source{" "}
                            <span className="gradient-text">Incident Management</span>{" "}
                            Platform
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg sm:text-xl text-foreground-secondary mb-8 max-w-xl"
                        >
                            Self-hosted platform for on-call scheduling, incident response,
                            escalation policies, and status pages.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <Link
                                href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                target="_blank"
                                className="btn-primary inline-flex items-center justify-center gap-2 text-base"
                            >
                                <Github className="w-4 h-4" />
                                View on GitHub
                            </Link>
                            <Link
                                href="https://github.com/Dushyant-rahangdale/OpsSentinal#readme"
                                target="_blank"
                                className="btn-secondary inline-flex items-center justify-center gap-2 text-base"
                            >
                                <BookOpen className="w-4 h-4" />
                                Read README
                            </Link>
                        </motion.div>

                        {/* Quick Start Command */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="glass rounded-lg p-4 max-w-md"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-4 h-4 text-accent-emerald" />
                                <span className="text-sm text-foreground-secondary">Quick Start</span>
                            </div>
                            <code className="text-sm font-mono text-foreground">
                                <span className="text-accent-emerald">$</span>{" "}
                                git clone https://github.com/Dushyant-rahangdale/OpsSentinal.git
                            </code>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-foreground-muted text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
                                Self-Hosted
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
                                AGPL-3.0
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
                                Docker & Kubernetes
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Telemetry Display */}
                    <div className="hidden lg:block">
                        <TelemetryDisplay />
                    </div>
                </div>
            </div>

            {/* Gradient Fade Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
