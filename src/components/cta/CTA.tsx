"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Terminal, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/lib/brand";

export function CTA() {
    const [copied, setCopied] = useState(false);
    const dockerCommand = "curl -sL https://raw.githubusercontent.com/opsknight-labs/OpsKnight/main/docker-compose.yml > docker-compose.yml && docker-compose up -d";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(dockerCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative py-32 bg-slate-950 overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                        Take control of your incident infrastructure today.
                    </h2>
                    
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Deploy {BRAND.name} in under 2 minutes. Free forever, self-hosted, and production-ready.
                    </p>

                    <div className="max-w-2xl mx-auto mt-10">
                        <div className="bg-slate-900 rounded-lg p-4 border border-white/10 flex items-center justify-between text-left group hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-3 overflow-hidden text-blue-400 font-mono text-sm sm:text-base">
                                <Terminal className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                <span className="truncate">{dockerCommand}</span>
                            </div>
                            <button 
                                onClick={copyToClipboard}
                                className="ml-4 p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
                                aria-label="Copy to clipboard"
                            >
                                {copied ? <CheckCircle2 className="w-5 h-5 text-blue-400" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
                        <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 text-lg shadow-lg shadow-blue-500/25">
                            <Link href="/docs">Deploy Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-lg bg-white/5 border-white/10 hover:bg-white/10 text-white">
                            <Link href="https://github.com/opsknight-labs/OpsKnight" target="_blank" rel="noopener noreferrer">
                                <Github className="w-5 h-5 mr-2" />
                                Star on GitHub
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
