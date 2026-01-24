"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function CTA() {
    return (
        <section className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />


            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
                        Ready to take control?
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                        Join the community of SREs building the future of open source incident response.
                    </p>

                    {/* Quick Start Terminal */}
                    <div className="relative max-w-lg mx-auto mb-10 text-left">
                        <div className="relative rounded-xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-800/50">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                </div>
                                <span className="text-xs text-slate-500 font-mono">bash</span>
                            </div>
                            <div className="p-4 font-mono text-sm">
                                <div className="flex items-center mb-2">
                                    <span className="text-emerald-500 mr-2">$</span>
                                    <span className="text-slate-300">git clone {BRAND.links.github}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-emerald-500 mr-2">$</span>
                                    <span className="text-slate-300">docker compose up -d</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-8 bg-white text-slate-950 hover:bg-slate-200 border-none shadow-lg shadow-white/5 transition-all w-full sm:w-auto"
                        >
                            <Link
                                href={BRAND.links.github}
                                target="_blank"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                Star on GitHub
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="h-12 px-8 bg-transparent border-white/10 text-white hover:bg-white/5 w-full sm:w-auto hover:text-white"
                        >
                            <Link href="/docs">
                                Read the Docs
                                <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
