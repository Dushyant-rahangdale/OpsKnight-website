"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Github, Heart, ArrowRight, Sparkles } from "lucide-react";

const navItems = [
    { label: "Features", href: "/#features" },
    { label: "Integrations", href: "/#integrations" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Compare", href: "/compare" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/70"
        >
            {/* Announcement Bar */}
            <div className="hidden sm:block border-b border-white/5 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-2 py-1.5 text-xs">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span className="text-slate-400">
                            OpsSentinal is in active development.
                        </span>
                        <Link
                            href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                            target="_blank"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                        >
                            Star on GitHub
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 group-hover:border-emerald-500/30 transition-all shadow-lg">
                                <Image
                                    src="/logo-compressed.png"
                                    alt="OpsSentinal"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight text-white group-hover:text-emerald-50 transition-colors">
                                OpsSentinal
                            </span>
                            <span className="text-[9px] text-emerald-500/70 font-medium uppercase tracking-wider hidden sm:block">
                                Incident Response
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="https://github.com/sponsors/Dushyant-rahangdale"
                            target="_blank"
                            className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-pink-400 hover:text-pink-300 rounded-full transition-colors"
                        >
                            <Heart className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" />
                            <span>Sponsor</span>
                        </Link>
                        <Link
                            href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                            target="_blank"
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                        </Link>
                        <Link
                            href="/docs"
                            className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full px-5 text-xs font-semibold text-slate-950"
                        >
                            {/* Button gradient background */}
                            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                            <span className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative flex items-center gap-1.5">
                                Get Started
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
                                    className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 p-4 mt-3 border-t border-white/10">
                                <Link
                                    href="https://github.com/sponsors/Dushyant-rahangdale"
                                    target="_blank"
                                    className="flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Heart className="w-4 h-4 fill-current" />
                                    <span>Sponsor Project</span>
                                </Link>
                                <Link
                                    href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                    target="_blank"
                                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Github className="w-4 h-4" />
                                    <span>View on GitHub</span>
                                </Link>
                                <Link
                                    href="/docs"
                                    className="flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold hover:from-emerald-400 hover:to-cyan-400 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
