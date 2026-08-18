"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Github, ArrowRight } from "lucide-react";

const navItems = [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Integrations", href: "/integrations" },
    { label: "Changelog", href: "/changelog" },
    { label: "Compare", href: "/compare" },
    { label: "Docs", href: "/docs" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/70"
        >
            {/* Announcement Banner */}
            <div className="hidden sm:block border-b border-white/5 bg-slate-900/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-2 py-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        <span className="text-slate-300">
                            OpsKnight v1.3.0 is live — 24+ native integrations, drop-in PagerDuty emulation & self-hosted status pages
                        </span>
                        <Link
                            href="https://github.com/opsknight-labs/OpsKnight/releases"
                            target="_blank"
                            className="inline-flex items-center gap-1 text-white hover:text-emerald-400 font-medium transition-colors ml-2"
                        >
                            Read Release Notes
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 group-hover:border-emerald-500/50 transition-all shadow-sm">
                            <Image
                                src="/logo-mark.png"
                                alt="OpsKnight"
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain"
                            />
                        </div>
                        <span className="text-base font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                            OpsKnight
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right-side actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="https://status.opsknight.com"
                            target="_blank"
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full bg-slate-900/50 border border-white/5 transition-colors"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            All Systems Operational
                        </Link>
                        
                        <div className="w-px h-4 bg-white/10"></div>

                        <Link
                            href="https://github.com/opsknight-labs/OpsKnight"
                            target="_blank"
                            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            <span>Star</span>
                        </Link>
                        
                        <Link
                            href="/docs"
                            className="inline-flex h-8 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-slate-200 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t border-white/10"
                    >
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 p-4 mt-2 border-t border-white/10">
                                <Link
                                    href="https://status.opsknight.com"
                                    target="_blank"
                                    className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span>Live Status</span>
                                </Link>
                                <Link
                                    href="https://github.com/opsknight-labs/OpsKnight"
                                    target="_blank"
                                    className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Github className="w-4 h-4" />
                                    <span>Star on GitHub</span>
                                </Link>
                                <Link
                                    href="/docs"
                                    className="flex items-center justify-center h-10 mt-2 rounded-md bg-white text-black text-sm font-medium hover:bg-slate-200 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
