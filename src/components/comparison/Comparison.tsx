"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { SavingsCalculator } from "@/components/calculator/SavingsCalculator";

const comparisonData = [
    { name: "Annual Cost for 20 Engineers", opsknight: "$0", pagerduty: "$5,040 / yr", opsgenie: "$2,160 / yr" },
    { name: "Deployment", opsknight: "100% Self-Hosted & Private", pagerduty: "SaaS Only", opsgenie: "SaaS Only" },
    { name: "Source Code", opsknight: "AGPL-3.0 Full Source Access", pagerduty: "Proprietary", opsgenie: "Proprietary" },
    { name: "User Limit", opsknight: "Unlimited Users & Teams", pagerduty: "Per-Seat Billing", opsgenie: "Per-Seat Billing" },
    { name: "Incident Limits", opsknight: "Unlimited Incidents", pagerduty: "Tier-limited", opsgenie: "Tier-limited" },
    { name: "Status Pages", opsknight: "Built-in (Public & Private)", pagerduty: "$79+/mo add-on", opsgenie: "Add-on" },
    { name: "Slack War Rooms", opsknight: "Included Native", pagerduty: "Enterprise plan only", opsgenie: "Basic" },
    { name: "Drop-in PagerDuty API", opsknight: "Included (v2/enqueue)", pagerduty: "N/A", opsgenie: "No" },
    { name: "Data Sovereignty", opsknight: "100% Inside Your VPC", pagerduty: "Vendor Cloud", opsgenie: "Vendor Cloud" },
    { name: "Custom Webhooks", opsknight: "Unlimited", pagerduty: "Limited", opsgenie: "Limited" },
    { name: "Analytics & MTTA/MTTR", opsknight: "Included", pagerduty: "Pro/Enterprise", opsgenie: "Standard" },
];

export function Comparison() {
    return (
        <section className="relative py-28 bg-white overflow-hidden border-b border-slate-200/80">
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold mb-4">
                        Transparent Comparison
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Why engineering teams switch to {BRAND.name}.
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal">
                        Compare {BRAND.name} against legacy enterprise on-call tools. Full feature parity, zero per-seat tax.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl mb-12"
                >
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="py-5 px-6 text-slate-900 font-bold w-1/4">Feature</th>
                                <th className="py-5 px-6 text-blue-600 font-black text-lg w-1/4 bg-blue-50/50 border-x border-slate-200">{BRAND.name}</th>
                                <th className="py-5 px-6 text-slate-700 font-semibold w-1/4">PagerDuty</th>
                                <th className="py-5 px-6 text-slate-700 font-semibold w-1/4">OpsGenie</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {comparisonData.map((row) => (
                                <tr key={row.name} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-4 px-6 text-slate-900 font-medium">{row.name}</td>
                                    <td className="py-4 px-6 text-blue-700 font-bold bg-blue-50/30 border-x border-slate-200 font-mono">{row.opsknight}</td>
                                    <td className="py-4 px-6 text-slate-600">{row.pagerduty}</td>
                                    <td className="py-4 px-6 text-slate-600">{row.opsgenie}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Embedded Interactive ROI Calculator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SavingsCalculator />
                </motion.div>

                {/* Link to Full Compare Page */}
                <div className="text-center mt-12">
                    <Link
                        href="/compare"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-bold text-sm transition-colors group"
                    >
                        Explore detailed side-by-side competitor deep dives
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
