"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Real pricing data gathered
const pricingData = {
    pagerduty: {
        name: "PagerDuty",
        price: 21,
        unit: "/user/mo",
        notes: "Professional Plan ($21). Automation ($+59) & Status Pages ($+89) are extra.",
    },
    opsgenie: {
        name: "OpsGenie",
        price: 19,
        unit: "/user/mo",
        notes: "Standard Plan. Product retiring in 2027.",
    },
    incidentio: {
        name: "incident.io",
        price: 35,
        unit: "/user/mo",
        notes: "Pro Plan + On-call addon. Prices vary by volume.",
    },
    opssentinal: {
        name: "OpsSentinal",
        price: 0,
        unit: "forever",
        notes: "100% Free & Open Source. Self-hosted.",
    },
};

export default function ComparePage() {
    const [teamSize, setTeamSize] = useState(10);

    const calculateCost = (price: number) => {
        return price * teamSize * 12; // Annual cost
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        Stop paying a <span className="gradient-text">"reliability tax"</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground-secondary max-w-2xl mx-auto"
                    >
                        Why spend thousands on incident management when you can host it yourself for free?
                        Compare OpsSentinal with commercial alternatives.
                    </motion.p>
                </section>

                {/* Calculator Section */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="glass rounded-2xl p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Calculator className="w-6 h-6 text-accent-emerald" />
                                    Savings Calculator
                                </h2>
                                <p className="text-foreground-secondary mt-2">
                                    Estimated annual cost for your team
                                </p>
                            </div>

                            <div className="flex items-center gap-4 bg-background-secondary p-4 rounded-xl border border-border">
                                <label className="text-sm font-medium">Team Size:</label>
                                <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    step="5"
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                    className="w-48 accent-accent-emerald"
                                />
                                <span className="text-xl font-bold text-accent-emerald min-w-[3ch]">
                                    {teamSize}
                                </span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {/* OpsSentinal Card */}
                            <div className="md:col-span-1 bg-gradient-to-b from-accent-emerald/20 to-transparent border-2 border-accent-emerald/50 rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-emerald"></div>
                                <h3 className="font-bold text-lg mb-1">{pricingData.opssentinal.name}</h3>
                                <div className="text-3xl font-bold text-accent-emerald mb-4">
                                    $0
                                </div>
                                <p className="text-xs text-foreground-muted mb-4">{pricingData.opssentinal.notes}</p>
                                <div className="text-sm font-medium text-accent-emerald">
                                    Annual Cost: $0
                                </div>
                            </div>

                            {/* Competitors */}
                            {[pricingData.pagerduty, pricingData.incidentio, pricingData.opsgenie].map((competitor) => (
                                <div key={competitor.name} className="bg-background-secondary rounded-xl p-6 border border-border/50 opacity-80 hover:opacity-100 transition-opacity">
                                    <h3 className="font-bold text-lg mb-1">{competitor.name}</h3>
                                    <div className="text-xl font-semibold text-foreground-secondary mb-4">
                                        ${competitor.price}<span className="text-sm font-normal text-foreground-muted">/user/mo</span>
                                    </div>
                                    <p className="text-xs text-foreground-muted mb-4 h-10">{competitor.notes}</p>
                                    <div className="text-sm font-medium text-foreground">
                                        Annual: ${calculateCost(competitor.price).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center bg-accent-emerald/10 rounded-lg p-4">
                            <p className="text-lg font-medium text-accent-emerald">
                                You could save <span className="font-bold">${calculateCost(pricingData.pagerduty.price).toLocaleString()} per year</span> by switching to OpsSentinal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Feature Comparison Table */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-4 px-6 text-foreground-secondary font-medium w-1/3">Feature</th>
                                    <th className="py-4 px-6 text-accent-emerald font-bold text-lg bg-accent-emerald/5 rounded-t-xl">OpsSentinal</th>
                                    <th className="py-4 px-6 text-foreground-secondary font-medium">PagerDuty (Base)</th>
                                    <th className="py-4 px-6 text-foreground-secondary font-medium">OpsGenie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "On-Call Scheduling", ops: true, pd: true, og: true },
                                    { name: "Unlimited Users", ops: true, pd: false, og: false },
                                    { name: "Escalation Policies", ops: true, pd: true, og: true },
                                    { name: "Status Pages (Public)", ops: true, pd: "Add-on ($$$)", og: true },
                                    { name: "Postmortems", ops: true, pd: "Add-on ($$$)", og: true },
                                    { name: "Self-Hosted Choice", ops: true, pd: false, og: false },
                                    { name: "Source Code Access", ops: true, pd: false, og: false },
                                    { name: "No Vendor Lock-in", ops: true, pd: false, og: false },
                                ].map((row, i) => (
                                    <tr key={row.name} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 font-medium">{row.name}</td>
                                        <td className="py-4 px-6 bg-accent-emerald/5">
                                            {row.ops ? <Check className="w-5 h-5 text-accent-emerald" /> : <X className="w-5 h-5 text-red-500" />}
                                        </td>
                                        <td className="py-4 px-6 text-foreground-secondary">
                                            {row.pd === true ? <Check className="w-5 h-5 text-gray-400" /> :
                                                row.pd === false ? <X className="w-5 h-5 text-gray-600" /> :
                                                    <span className="text-xs font-mono bg-accent-amber/10 text-accent-amber px-2 py-1 rounded">{row.pd}</span>}
                                        </td>
                                        <td className="py-4 px-6 text-foreground-secondary">
                                            {row.og === true ? <Check className="w-5 h-5 text-gray-400" /> : <X className="w-5 h-5 text-gray-600" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-20 text-center">
                    <Link
                        href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                        target="_blank"
                        className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
                    >
                        Start Saving Today
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
