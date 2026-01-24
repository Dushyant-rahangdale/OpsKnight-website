"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

const features = [
    { name: "Incident Management", opsknight: true, pagerduty: true, opsgenie: true },
    { name: "On-Call Scheduling", opsknight: true, pagerduty: true, opsgenie: true },
    { name: "Escalation Policies", opsknight: true, pagerduty: true, opsgenie: true },
    { name: "Status Pages", opsknight: true, pagerduty: "addon", opsgenie: "addon" },
    { name: "Self-Hosted Option", opsknight: true, pagerduty: false, opsgenie: false },
    { name: "Full Source Access", opsknight: true, pagerduty: false, opsgenie: false },
    { name: "Unlimited Users", opsknight: true, pagerduty: false, opsgenie: false },
    { name: "Unlimited Incidents", opsknight: true, pagerduty: false, opsgenie: false },
    { name: "20+ Integrations", opsknight: true, pagerduty: true, opsgenie: true },
    { name: "API Access", opsknight: true, pagerduty: true, opsgenie: true },
    { name: "Custom Webhooks", opsknight: true, pagerduty: true, opsgenie: true },
    { name: "Analytics & SLA", opsknight: true, pagerduty: true, opsgenie: true },
    { name: "No Vendor Lock-in", opsknight: true, pagerduty: false, opsgenie: false },
    { name: "Data Sovereignty", opsknight: true, pagerduty: false, opsgenie: false },
];

const pricing = {
    opsknight: { price: "$0", period: "forever", note: "Self-hosted, all features" },
    pagerduty: { price: "$21", period: "/user/mo", note: "Professional plan, billed annually" },
    opsgenie: { price: "$9", period: "/user/mo", note: "Essentials plan, limited features" },
};

function FeatureValue({ value }: { value: boolean | string }) {
    if (value === true) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                </div>
            </div>
        );
    }
    if (value === false) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                    <X className="w-4 h-4 text-slate-500" />
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center">
            <span className="text-xs text-amber-400 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {value}
            </span>
        </div>
    );
}

export function Comparison() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                        <Sparkles className="w-3 h-3" />
                        Compare
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why choose {BRAND.name}?
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        See how we stack up against the competition. Full features, zero cost.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Highlight for OpsKnight column */}
                    <div className="absolute top-0 left-[25%] w-[25%] h-full bg-emerald-500/5 rounded-t-2xl pointer-events-none hidden md:block" />

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Header */}
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-6 px-4 text-slate-400 font-medium">Feature</th>
                                    <th className="py-6 px-4 text-center relative">
                                        <div className="inline-flex flex-col items-center gap-1">
                                            <span className="text-emerald-400 font-bold text-lg">{BRAND.name}</span>
                                            <span className="text-2xl font-bold text-white">{pricing.opsknight.price}</span>
                                            <span className="text-xs text-slate-500">{pricing.opsknight.note}</span>
                                        </div>
                                    </th>
                                    <th className="py-6 px-4 text-center">
                                        <div className="inline-flex flex-col items-center gap-1">
                                            <span className="text-slate-400 font-bold text-lg">PagerDuty</span>
                                            <span className="text-2xl font-bold text-white">{pricing.pagerduty.price}<span className="text-sm font-normal text-slate-500">{pricing.pagerduty.period}</span></span>
                                            <span className="text-xs text-slate-500">{pricing.pagerduty.note}</span>
                                        </div>
                                    </th>
                                    <th className="py-6 px-4 text-center">
                                        <div className="inline-flex flex-col items-center gap-1">
                                            <span className="text-slate-400 font-bold text-lg">OpsGenie</span>
                                            <span className="text-2xl font-bold text-white">{pricing.opsgenie.price}<span className="text-sm font-normal text-slate-500">{pricing.opsgenie.period}</span></span>
                                            <span className="text-xs text-slate-500">{pricing.opsgenie.note}</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {features.map((feature, index) => (
                                    <motion.tr
                                        key={feature.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.03 }}
                                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="py-4 px-4 text-slate-300 text-sm font-medium">{feature.name}</td>
                                        <td className="py-4 px-4 bg-emerald-500/5">
                                            <FeatureValue value={feature.opsknight} />
                                        </td>
                                        <td className="py-4 px-4">
                                            <FeatureValue value={feature.pagerduty} />
                                        </td>
                                        <td className="py-4 px-4">
                                            <FeatureValue value={feature.opsgenie} />
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-slate-400 mb-6">
                        Ready to save <span className="text-emerald-400 font-semibold">$252/user/year</span> compared to PagerDuty?
                    </p>
                    <Link
                        href="/compare"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all hover:scale-105"
                    >
                        See Full Comparison
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
