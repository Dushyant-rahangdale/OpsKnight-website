"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ArrowRight, Activity, Shield, Zap } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
            style={{ background: 'var(--gradient-hero)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Development Badge */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs font-medium mb-6 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            In Development &bull; Launching in 2 months
                        </motion.div>

                        <motion.h1
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
                        >
                            The future of open source <br />
                            <span className="text-slate-400">incident response.</span>
                        </motion.h1>

                        <motion.p
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-base md:text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            OpsSentinal is building the ultimate self-hosted command center for modern engineering teams.
                            Join us as we build towards our v1.0 release.
                        </motion.p>

                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
                        >
                            <Link
                                href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                target="_blank"
                                className="btn-primary h-10 px-6 text-sm bg-white text-slate-950 hover:bg-slate-200 border-none shadow-lg shadow-white/5 transition-all w-full sm:w-auto flex items-center justify-center"
                            >
                                <Github className="w-4 h-4 mr-2" />
                                Star on GitHub
                            </Link>
                            <Link
                                href="/docs"
                                className="btn-secondary h-10 px-6 text-sm bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all w-full sm:w-auto flex items-center justify-center"
                            >
                                Explorer Docs
                                <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-50" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-slate-500 text-xs font-medium"
                        >
                            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Enterprise Security</span>
                            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Active Development</span>
                            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> High Performance</span>
                        </motion.div>
                    </div>

                    {/* Right Content - Compact Dashboard Preview */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="relative mt-8 lg:mt-0 perspective-[2000px]"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[2rem] blur-2xl opacity-40 pointer-events-none" />

                        <div className="relative rounded-xl border border-white/10 bg-slate-950/80 backdrop-blur-sm shadow-2xl overflow-hidden ring-1 ring-white/5 transform transition-transform hover:scale-[1.01] duration-500">
                            {/* Mini Toolbar */}
                            <div className="h-7 bg-slate-900/50 border-b border-white/5 flex items-center px-3 gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-700/50" />
                                <div className="w-2 h-2 rounded-full bg-slate-700/50" />
                            </div>
                            <Image
                                src="/dashboard-command-center.png"
                                alt="OpsSentinal Dashboard"
                                width={1200}
                                height={675}
                                priority
                                className="w-full h-auto opacity-90 transition-opacity duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
        </section>
    );
}
