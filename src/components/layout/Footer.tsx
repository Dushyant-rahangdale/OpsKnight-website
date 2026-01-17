import Link from "next/link";
import { Github, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-slate-950 text-slate-400 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Brand & Copyright */}
                <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-white">OpsSentinal</span>
                    <span className="hidden md:inline text-slate-600">|</span>
                    <span>© {new Date().getFullYear()} Open source (AGPL-3.0)</span>
                </div>

                {/* Compact Links */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                    <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
                    <Link href="https://github.com/Dushyant-rahangdale/OpsSentinal" className="hover:text-white transition-colors">GitHub</Link>
                    <Link href="https://github.com/sponsors/Dushyant-rahangdale" className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1.5">
                        <Heart className="w-3 h-3 fill-current" />
                        Sponsor
                    </Link>
                    <Link href="https://github.com/Dushyant-rahangdale/OpsSentinal/issues" className="hover:text-white transition-colors">Issues</Link>
                </div>

                {/* Social/Icon */}
                <Link
                    href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                    target="_blank"
                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                    aria-label="GitHub"
                >
                    <Github className="w-5 h-5" />
                </Link>
            </div>
        </footer>
    );
}
