"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

const features = [
    "Unlimited Users & Responders",
    "Unlimited Incidents & Services",
    "Multi-Layer On-Call Scheduling",
    "Automated Escalation Policies",
    "Built-in Public & Private Status Pages",
    "24+ Native Monitoring Integrations",
    "Drop-in PagerDuty Events API v2",
    "Slack War Rooms & ChatOps",
    "MTTA, MTTR & SLA Analytics",
    "Full AGPL-3.0 Source Code Access",
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                        Community Edition
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Simple, transparent, and 100% free.
                    </h2>
                    <p className="text-lg text-slate-400">
                        {BRAND.name} Community Edition has no artificial feature gates, no per-seat billing, and no credit card required.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 rounded-3xl border border-blue-500/20 p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-blue-500/10"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <div className="text-right hidden sm:block">
                                <span className="text-5xl font-bold text-white">$0</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Community Edition</h3>
                                <p className="text-blue-400 font-medium">Free forever • Self-hosted • Full source access</p>
                            </div>
                            <div className="text-left mt-4 sm:hidden">
                                <span className="text-5xl font-bold text-white">$0</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-10">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <span className="text-slate-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                                <Link href="/docs">
                                    Deploy Community Edition
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            
                            <Link href="/compare" className="text-slate-400 hover:text-white transition-colors inline-flex items-center text-sm font-medium group">
                                Calculate your savings vs PagerDuty
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
