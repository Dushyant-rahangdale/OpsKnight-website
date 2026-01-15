"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Github, ArrowRight } from "lucide-react";

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
        <section id="pricing" className="relative py-24 bg-background-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-accent-emerald text-sm font-medium uppercase tracking-wide">
                        Community Edition
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
                        Free and <span className="gradient-text">open-source</span>
                    </h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto mb-6">
                        OpsSentinal is free to self-host with all features included.
                        No subscriptions, no limits.
                    </p>

                    <Link href="/compare" className="inline-flex items-center gap-2 text-accent-emerald hover:text-accent-emerald/80 transition-colors font-medium">
                        See how much you save vs PagerDuty <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Main Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="relative rounded-2xl p-8 bg-gradient-to-b from-accent-emerald/20 to-background-secondary border-2 border-accent-emerald/50">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="flex items-center gap-1 px-3 py-1 bg-accent-emerald text-background text-xs font-semibold rounded-full">
                                <Github className="w-3 h-3" />
                                Open Source
                            </span>
                        </div>

                        <div className="text-center mb-8">
                            <div className="text-5xl font-bold text-foreground mb-2">$0</div>
                            <p className="text-foreground-muted">Self-hosted • All features</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-accent-emerald flex-shrink-0" />
                                    <span className="text-foreground-secondary text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                target="_blank"
                                className="btn-primary inline-flex items-center justify-center gap-2 text-base"
                            >
                                <Github className="w-4 h-4" />
                                Get Started
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* License Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-foreground-muted text-sm">
                        Licensed under{" "}
                        <a
                            href="https://github.com/Dushyant-rahangdale/OpsSentinal/blob/main/LICENSE"
                            target="_blank"
                            className="text-accent-emerald hover:underline"
                        >
                            AGPL-3.0
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
