"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Github, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

const features = [
    "Unlimited users",
    "Unlimited services & incidents",
    "On-call scheduling",
    "Escalation policies",
    "Status page",
    "All integrations",
    "Multi-channel alerts",
    "Analytics & SLA tracking",
    "Full source code access",
];

export function Pricing() {
    return (
        <section id="pricing" className="relative py-24 section-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-accent-blue text-sm font-medium uppercase tracking-wide">
                        Community Edition
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                        Free and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">open-source</span>
                    </h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto mb-6">
                        {BRAND.name} is free to self-host with all features included.
                        No subscriptions, no limits.
                    </p>

                    <Link href="/compare" className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 transition-colors font-medium">
                        See how much you save vs PagerDuty <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Main Pricing Card */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto relative"
                >
                    {/* Animated glow border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-3xl blur-lg opacity-30 animate-pulse" />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-2xl opacity-50" />

                    <div className="relative rounded-2xl p-8 bg-slate-900 border border-white/10">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-blue-500/25">
                                <Github className="w-3.5 h-3.5" />
                                Open Source
                            </span>
                        </div>

                        <div className="text-center mb-8 mt-4">
                            <div className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2">$0</div>
                            <p className="text-foreground-muted">Self-hosted • All features • Forever free</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={false}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-emerald-400" />
                                    </div>
                                    <span className="text-foreground-secondary text-sm">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="text-base px-8 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 border-0 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                            >
                                <Link
                                    href={BRAND.links.github}
                                    target="_blank"
                                >
                                    <Github className="w-4 h-4 mr-2" />
                                    Get Started
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* License Note */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-foreground-muted text-sm">
                        Licensed under{" "}
                        <a
                            href={BRAND.links.license}
                            target="_blank"
                            className="text-accent-blue hover:underline"
                        >
                            AGPL-3.0
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
