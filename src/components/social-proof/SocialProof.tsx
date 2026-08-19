"use client";

import { motion } from "framer-motion";
import { Github, Shield, Layers, Users, Heart, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

export function SocialProof() {
    return (
        <section className="relative py-24 bg-slate-900 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                        <Heart className="w-4 h-4" />
                        Open Source & Transparent
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Built in the open. Owned by you.
                    </h2>
                    <p className="text-lg text-slate-400">
                        No hidden telemetry. No vendor lock-in. Audit every line of code on GitHub.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-slate-800/50 rounded-2xl p-8 border border-white/5"
                    >
                        <Shield className="w-10 h-10 text-blue-400 mb-6" />
                        <h3 className="text-xl font-semibold text-white mb-3">Data Sovereignty</h3>
                        <p className="text-slate-400">
                            Keep sensitive infrastructure logs, incident details, and postmortems entirely inside your VPC/network.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-slate-800/50 rounded-2xl p-8 border border-white/5"
                    >
                        <Layers className="w-10 h-10 text-blue-400 mb-6" />
                        <h3 className="text-xl font-semibold text-white mb-3">Extensibility</h3>
                        <p className="text-slate-400">
                            Modify, extend, and integrate with any internal tooling using modern TypeScript, Prisma, and Next.js.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-slate-800/50 rounded-2xl p-8 border border-white/5"
                    >
                        <Users className="w-10 h-10 text-blue-400 mb-6" />
                        <h3 className="text-xl font-semibold text-white mb-3">Community Powered</h3>
                        <p className="text-slate-400">
                            Active open-source development with community contributions, PRs, and transparent roadmap.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
                        <Link href={BRAND.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 mr-2" />
                            Star on GitHub
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-blue-500/20 hover:bg-blue-500/10 text-blue-400">
                        <Link href={BRAND.links.sponsor} target="_blank" rel="noopener noreferrer">
                            <Heart className="w-5 h-5 mr-2" />
                            Sponsor Project
                        </Link>
                    </Button>
                    <Link href={`${BRAND.links.github}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors ml-4">
                        <BookOpen className="w-4 h-4" />
                        {BRAND.license} License
                    </Link>
                </div>
            </div>
        </section>
    );
}
