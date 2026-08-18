"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

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
        <section className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5">
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
                        Transparent Comparison
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why engineering teams switch to {BRAND.name}.
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Compare {BRAND.name} against legacy enterprise on-call tools. Full feature parity, zero per-seat tax.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/50"
                >
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-slate-900/80">
                                <th className="py-5 px-6 text-slate-300 font-semibold w-1/4">Feature</th>
                                <th className="py-5 px-6 text-blue-400 font-bold text-lg w-1/4">{BRAND.name}</th>
                                <th className="py-5 px-6 text-slate-400 font-medium w-1/4">PagerDuty</th>
                                <th className="py-5 px-6 text-slate-400 font-medium w-1/4">OpsGenie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row) => (
                                <tr key={row.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 px-6 text-slate-300 text-sm font-medium">{row.name}</td>
                                    <td className="py-4 px-6 text-blue-300 text-sm font-semibold bg-blue-500/5">{row.opsknight}</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm">{row.pagerduty}</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm">{row.opsgenie}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Savings Callout CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-red-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-500/5"
                >
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">A team of 25 engineers saves over $6,300 every year with {BRAND.name}.</h3>
                        <p className="text-slate-400 text-sm">Stop paying a per-seat tax just so developers can be paged at 3 AM.</p>
                    </div>
                    <Link
                        href="/compare"
                        className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all hover:scale-105 group shadow-lg shadow-red-500/25"
                    >
                        Explore detailed comparison pages
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
