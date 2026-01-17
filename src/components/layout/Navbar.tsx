"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Github, Heart } from "lucide-react";

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
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                            <Image
                                src="/logo-compressed.png"
                                alt="OpsSentinal"
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                            OpsSentinal
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="https://github.com/sponsors/Dushyant-rahangdale"
                            target="_blank"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-pink-400 hover:text-pink-300 hover:bg-pink-400/10 rounded-full transition-colors border border-pink-400/20"
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
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
                            className="inline-flex h-8 items-center justify-center rounded-full bg-white px-4 text-xs font-semibold text-slate-950 shadow hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
                        >
                            Documentation
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white"
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
                        className="md:hidden py-4 border-t border-white/10 bg-slate-950"
                    >
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 p-4 mt-2 border-t border-white/10">
                                <Link
                                    href="https://github.com/sponsors/Dushyant-rahangdale"
                                    target="_blank"
                                    className="flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm"
                                >
                                    <Heart className="w-4 h-4 fill-current" />
                                    <span>Sponsor Project</span>
                                </Link>
                                <Link
                                    href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                    target="_blank"
                                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>View on GitHub</span>
                                </Link>
                                <Link
                                    href="/docs"
                                    className="btn-primary text-sm text-center justify-center bg-white text-slate-950 hover:bg-slate-200 h-9"
                                >
                                    Documentation
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
