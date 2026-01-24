"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, Shield, Zap, Clock, Code2 } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { BRAND } from "@/lib/brand";

// Floating metric cards data
const floatingCards = [
    {
        icon: Activity,
        label: "Event Capacity",
        value: "Unlimited",
        color: "from-rose-500 to-pink-500",
        position: "top-[15%] -left-[5%]",
        delay: 0.6,
    },
    {
        icon: Clock,
        label: "Setup Time",
        value: "~5m",
        color: "from-amber-500 to-orange-500",
        position: "top-[60%] -left-[8%]",
        delay: 0.8,
    },
    {
        icon: Shield,
        label: "Data Privacy",
        value: "100%",
        color: "from-emerald-500 to-cyan-500",
        position: "top-[35%] -right-[5%]",
        delay: 1.0,
    },
];

function FloatingCard({ card, index }: { card: typeof floatingCards[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.5, ease: "easeOut" }}
            className={`absolute ${card.position} z-20 hidden lg:block`}
        >
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                className="relative group"
            >
                {/* Glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${card.color} rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />

                <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                        <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{card.label}</p>
                        <p className="text-lg font-bold text-white">{card.value}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
            style={{ background: 'var(--gradient-hero)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Brand Logo Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-500/30 rounded blur" />
                                    <Image
                                        src={BRAND.assets.logo}
                                        alt={BRAND.name}
                                        width={20}
                                        height={20}
                                        className="relative w-5 h-5 object-contain"
                                    />
                                </div>
                                <span className="text-xs font-bold text-emerald-400 tracking-wide">
                                    {BRAND.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                                {BRAND.status}
                            </div>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-lg"
                        >
                            The future of{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-shimmer bg-[length:200%_auto]">
                                    open source
                                </span>
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white">
                                incident response.
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-base md:text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            {BRAND.fullDescription}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
                        >
                            <Link
                                href={BRAND.links.github}
                                target="_blank"
                                className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold text-slate-950"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                                <span className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center gap-2">
                                    Star on GitHub
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href={BRAND.links.status}
                                target="_blank"
                                className="inline-flex items-center gap-2 h-11 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition-colors"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                View status page
                            </Link>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3"
                        >
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                Enterprise Security
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                                <Code2 className="w-4 h-4 text-cyan-400" />
                                Self-Hosted
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                                <Zap className="w-4 h-4 text-amber-400" />
                                High Performance
                            </div>
                            <Link
                                href={BRAND.links.status}
                                target="_blank"
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20 transition-colors"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Live Status
                            </Link>
                        </motion.div>

                        {/* Open Source Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-6 flex items-center justify-center lg:justify-start"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/50 border border-white/5">
                                <span className="text-xs text-slate-500">Licensed under</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium">
                                    {BRAND.license}
                                </span>
                                <span className="text-xs text-slate-500">•</span>
                                <span className="text-xs text-slate-400">100% Open Source</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Dashboard Preview with Floating Cards */}
                    <div className="relative mt-8 lg:mt-0">
                        {/* Floating Metric Cards */}
                        {floatingCards.map((card, index) => (
                            <FloatingCard key={card.label} card={card} index={index} />
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="relative perspective-[2000px]"
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-blue-500/20 rounded-[2rem] blur-2xl opacity-40 pointer-events-none animate-pulse" />

                            <div className="relative rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-sm shadow-2xl overflow-hidden ring-1 ring-white/5 transform transition-transform hover:scale-[1.01] duration-500">
                                {/* Browser Chrome */}
                                <div className="h-10 bg-slate-900/90 border-b border-white/5 flex items-center justify-between px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <div className="flex-1 mx-8">
                                        <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-lg bg-slate-800/50 border border-white/5">
                                            <span className="text-[10px] text-slate-500 font-mono">command-center.opsknight.io</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-[10px] text-emerald-400 font-medium">Live</span>
                                    </div>
                                </div>

                                {/* Dashboard Screenshot */}
                                <Image
                                    src={BRAND.assets.dashboard}
                                    alt="OpsKnight Command Center Dashboard"
                                    width={1200}
                                    height={626}
                                    priority
                                    className="w-full h-auto opacity-95 transition-opacity duration-700 hover:opacity-100"
                                />

                                {/* Bottom bar with brand */}
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-950 to-transparent flex items-end justify-center pb-2">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur">
                                        <Image
                                            src={BRAND.assets.logo}
                                            alt={BRAND.name}
                                            width={14}
                                            height={14}
                                            className="w-3.5 h-3.5 object-contain"
                                        />
                                        <span className="text-[10px] text-slate-400 font-medium">{BRAND.name}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </section>
    );
}
