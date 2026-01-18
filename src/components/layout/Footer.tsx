"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Heart, Twitter, Mail, ExternalLink, ArrowUpRight } from "lucide-react";

const footerLinks = {
    product: [
        { label: "Features", href: "/#features" },
        { label: "Integrations", href: "/#integrations" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Compare", href: "/compare" },
    ],
    resources: [
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/docs/v1/api" },
        { label: "Changelog", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/releases", external: true },
        { label: "Roadmap", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/projects", external: true },
    ],
    community: [
        { label: "GitHub", href: "https://github.com/Dushyant-rahangdale/OpsSentinal", external: true },
        { label: "Discussions", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/discussions", external: true },
        { label: "Issues", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/issues", external: true },
        { label: "Contributing", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/blob/main/CONTRIBUTING.md", external: true },
    ],
    legal: [
        { label: "License (AGPL-3.0)", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/blob/main/LICENSE", external: true },
        { label: "Security", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/security", external: true },
    ],
};

export function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-slate-950">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 lg:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                        <Image
                                            src="/logo-compressed.png"
                                            alt="OpsSentinal"
                                            width={28}
                                            height={28}
                                            className="w-7 h-7 object-contain"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-white">OpsSentinal</span>
                                    <p className="text-[10px] text-emerald-500/70 font-medium uppercase tracking-wider">
                                        Open Source Incident Response
                                    </p>
                                </div>
                            </Link>

                            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
                                The complete open-source platform for on-call management, incident response, and status pages.
                            </p>

                            {/* Social Links */}
                            <div className="mt-6 flex items-center gap-3">
                                <Link
                                    href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                    target="_blank"
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="https://twitter.com/opssentinal"
                                    target="_blank"
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="mailto:hello@opssentinal.io"
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                    aria-label="Email"
                                >
                                    <Mail className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Sponsor CTA */}
                            <Link
                                href="https://github.com/sponsors/Dushyant-rahangdale"
                                target="_blank"
                                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium hover:from-pink-500/20 hover:to-rose-500/20 transition-all group"
                            >
                                <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                Sponsor this project
                            </Link>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                                Product
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div>
                            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                                Resources
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                            {link.external && <ArrowUpRight className="w-3 h-3 opacity-50" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Community Links */}
                        <div>
                            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                                Community
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.community.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                            {link.external && <ArrowUpRight className="w-3 h-3 opacity-50" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                                Legal
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                            {link.external && <ArrowUpRight className="w-3 h-3 opacity-50" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>© {new Date().getFullYear()} OpsSentinal.</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">Open source under AGPL-3.0</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2 text-xs text-slate-500">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                In active development
                            </span>
                            <Link
                                href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                                <Github className="w-3.5 h-3.5" />
                                Star on GitHub
                                <ExternalLink className="w-3 h-3 opacity-50" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
