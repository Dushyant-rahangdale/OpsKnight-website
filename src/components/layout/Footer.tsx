"use client";

import Link from "next/link";
import { Github, Twitter, Mail, BookOpen, Heart } from "lucide-react";
import { BRAND } from "@/lib/brand";

const footerLinks = {
    product: [
        { label: "Features", href: "/#features" },
        { label: "Integrations", href: "/integrations" },
        { label: "Changelog", href: "/changelog" },
        { label: "Compare PagerDuty", href: "/compare" },
        { label: "Compare Opsgenie", href: "/compare/opsgenie" },
        { label: "Status Page", href: "https://status.opsknight.com" },
    ],
    resources: [
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/docs/api" },
        { label: "Quickstart Guide", href: "/docs/quickstart" },
        { label: "Helm Charts", href: "https://github.com/opsknight-labs/helm-charts" },
        { label: "Docker Hub", href: "https://hub.docker.com/u/opsknight" },
    ],
    community: [
        { label: "GitHub Discussions", href: `${BRAND.links.github}/discussions` },
        { label: "Issues Tracker", href: `${BRAND.links.github}/issues` },
        { label: "Contributing Guide", href: `${BRAND.links.github}/blob/main/CONTRIBUTING.md` },
        { label: "Sponsor", href: "https://github.com/sponsors/opsknight-labs" },
        { label: "Roadmap", href: `${BRAND.links.github}/projects` },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security Policy", href: "/security" },
        { label: "AGPL-3.0 License", href: `${BRAND.links.github}/blob/main/LICENSE` },
    ],
};

export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 inline-block">
                            <span className="font-bold text-xl text-white">
                                Ops<span className="text-emerald-400">Knight</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            The open-source incident response platform built for modern engineering teams.
                        </p>
                        
                        <div className="flex items-center gap-3 mb-8">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-medium text-slate-300">
                                <BookOpen className="w-3 h-3 text-emerald-400" />
                                AGPL-3.0
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-slate-400">
                            <a href={BRAND.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href={BRAND.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href={`mailto:${BRAND.links.email}`} className="hover:text-white transition-colors" aria-label="Email">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/sponsors/opsknight-labs" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors" aria-label="Sponsor">
                                <Heart className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Community</h3>
                        <ul className="space-y-3">
                            {footerLinks.community.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} {BRAND.name}. Built for DevOps & SREs.
                    </p>
                    <a 
                        href="https://status.opsknight.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        All systems operational
                    </a>
                </div>
            </div>
        </footer>
    );
}
