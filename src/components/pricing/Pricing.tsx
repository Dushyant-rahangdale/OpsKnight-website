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
    "28+ Native Monitoring Integrations",
    "Drop-in PagerDuty Events API v2",
    "Slack War Rooms & ChatOps",
    "MTTA, MTTR & SLA Analytics",
    "Full AGPL-3.0 Source Code Access",
];

export function Pricing() {
    return (
        <section id="pricing" className="py-28 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold mb-4">
                        Community Edition
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Simple, transparent, and 100% free.
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                        {BRAND.name} Community Edition has no artificial feature gates, no per-seat billing, and no credit card required.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 relative overflow-hidden shadow-xl"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <div className="text-right hidden sm:block">
                                <span className="text-6xl font-black text-slate-900 font-mono">$0</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">Community Edition</h3>
                                <p className="text-blue-600 font-semibold text-sm">Free forever • Self-hosted • Full source access</p>
                            </div>
                            <div className="text-left mt-4 sm:hidden">
                                <span className="text-5xl font-black text-slate-900 font-mono">$0</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                    <span className="text-slate-700 text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <Link href="/docs" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto text-sm px-8 py-6 bg-blue-600 hover:bg-blue-500 border-0 text-white font-bold shadow-lg shadow-blue-600/20 transition-all rounded-xl">
                                    Deploy Community Edition ($0)
                                </Button>
                            </Link>

                            <Link 
                                href="/compare"
                                className="text-slate-600 hover:text-blue-600 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                            >
                                Calculate your savings vs PagerDuty
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
