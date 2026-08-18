"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, MessageSquare, Shield } from "lucide-react";
import { BRAND } from "@/lib/brand";

const contactCards = [
    {
        title: "Open a GitHub issue",
        description:
            "Bug reports, feature requests, and technical questions are handled in the repo.",
        href: BRAND.links.issues,
        cta: "Create issue",
        icon: MessageSquare,
        tone: "from-blue-500/30 to-blue-500/0",
    },
    {
        title: "Email support",
        description:
            "Reach the team directly for private questions, security concerns, or partnerships.",
        href: `mailto:${BRAND.links.email}`,
        cta: BRAND.links.email,
        icon: Mail,
        tone: "from-cyan-500/30 to-cyan-500/0",
    },
];

const containerMotion = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemMotion = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-16 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />

            <main className="relative z-10 pt-28 pb-24">
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerMotion}
                        initial="hidden"
                        animate="show"
                        className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center"
                    >
                        <div>
                            <motion.span
                                variants={itemMotion}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-4"
                            >
                                <Shield className="w-3 h-3" />
                                Contact OpsKnight
                            </motion.span>
                            <motion.h1
                                variants={itemMotion}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                            >
                                Need help or want to collaborate?
                            </motion.h1>
                            <motion.p
                                variants={itemMotion}
                                className="text-lg sm:text-xl text-slate-300 max-w-2xl"
                            >
                                We handle support in GitHub issues for transparency, plus email for private requests.
                                Choose the option that fits your request.
                            </motion.p>
                        </div>
                        <motion.div
                            variants={itemMotion}
                            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
                        >
                            <h2 className="text-lg font-semibold mb-4">Support checklist</h2>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li>Share your deployment type (Docker, Kubernetes, or PWA).</li>
                                <li>Include logs or screenshots when possible.</li>
                                <li>Tell us your expected behavior and what happened.</li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="grid gap-6 md:grid-cols-2">
                        {contactCards.map((card) => (
                            <motion.div
                                key={card.title}
                                variants={itemMotion}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6"
                            >
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.tone} pointer-events-none`} />
                                <div className="relative">
                                    <card.icon className="w-6 h-6 text-white/70 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                                    <p className="text-sm text-slate-300 mb-6">{card.description}</p>
                                    <Link
                                        href={card.href}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all"
                                    >
                                        {card.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Stay in the loop</h2>
                                <p className="text-sm text-slate-300">
                                    Follow development updates and releases directly in GitHub.
                                </p>
                            </div>
                            <Link
                                href={BRAND.links.github}
                                target="_blank"
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition"
                            >
                                Visit GitHub
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
