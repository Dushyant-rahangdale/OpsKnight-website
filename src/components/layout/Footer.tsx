import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

const footerLinks = {
    product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#integrations" },
    ],
    resources: [
        { label: "GitHub", href: "https://github.com/Dushyant-rahangdale/OpsSentinal" },
        { label: "README", href: "https://github.com/Dushyant-rahangdale/OpsSentinal#readme" },
        { label: "Issues", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/issues" },
    ],
    legal: [
        { label: "License (AGPL-3.0)", href: "https://github.com/Dushyant-rahangdale/OpsSentinal/blob/main/LICENSE" },
    ],
};

export function Footer() {
    return (
        <footer className="relative border-t border-border bg-background-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image
                                src="/logo-compressed.png"
                                alt="OpsSentinal"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                            <span className="text-lg font-bold text-foreground">
                                Ops<span className="text-accent-emerald">Sentinal</span>
                            </span>
                        </Link>
                        <p className="text-foreground-muted text-sm mb-6">
                            Open-source incident management platform. Self-hosted on your infrastructure.
                        </p>
                        <Link
                            href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                            target="_blank"
                            aria-label="GitHub"
                            className="text-foreground-muted hover:text-accent-emerald transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        target="_blank"
                                        className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        target="_blank"
                                        className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-foreground-muted text-sm">
                        © {new Date().getFullYear()} OpsSentinal. Open source under AGPL-3.0 license.
                    </p>
                </div>
            </div>
        </footer>
    );
}
