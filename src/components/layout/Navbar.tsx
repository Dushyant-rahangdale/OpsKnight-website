"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Github } from "lucide-react";

const navItems = [
    { label: "Features", href: "/#features" },
    { label: "Integrations", href: "/#integrations" },
    { label: "Compare", href: "/compare" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 glass"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/logo-compressed.png"
                            alt="OpsSentinal"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="text-xl font-bold text-foreground">
                            Ops<span className="text-accent-emerald">Sentinal</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-foreground-secondary hover:text-foreground transition-colors duration-200 text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                            target="_blank"
                            className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors duration-200 text-sm"
                        >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                        </Link>
                        <Link
                            href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                            target="_blank"
                            className="btn-primary text-sm"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground-secondary hover:text-foreground"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t border-border"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-foreground-secondary hover:text-foreground transition-colors text-sm font-medium py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 pt-4 border-t border-border">
                                <Link
                                    href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                    target="_blank"
                                    className="flex items-center gap-2 text-foreground-secondary hover:text-foreground text-sm py-2"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>View on GitHub</span>
                                </Link>
                                <Link
                                    href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                    target="_blank"
                                    className="btn-primary text-sm text-center"
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
