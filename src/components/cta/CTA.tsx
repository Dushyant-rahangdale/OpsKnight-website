"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Terminal } from "lucide-react";

export function CTA() {
    return (
        <section className="relative py-24 bg-background overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-emerald/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Ready to <span className="gradient-text">get started</span>?
                    </h2>

                    <p className="text-lg text-foreground-secondary mb-8 max-w-2xl mx-auto">
                        Clone the repository, run with Docker, and you&apos;re up and running.
                    </p>

                    {/* Quick Start */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-xl p-6 max-w-xl mx-auto mb-8"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Terminal className="w-5 h-5 text-accent-emerald" />
                            <span className="text-foreground font-medium">Quick Start</span>
                        </div>
                        <div className="bg-background rounded-lg p-4 font-mono text-sm text-left overflow-x-auto">
                            <div>
                                <span className="text-accent-emerald">$</span>{" "}
                                <span className="text-foreground">git clone https://github.com/Dushyant-rahangdale/OpsSentinal.git</span>
                            </div>
                            <div className="mt-1">
                                <span className="text-accent-emerald">$</span>{" "}
                                <span className="text-foreground">cd OpsSentinal && docker-compose up -d</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <Link
                        href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                        target="_blank"
                        className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
                    >
                        <Github className="w-5 h-5" />
                        View on GitHub
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
