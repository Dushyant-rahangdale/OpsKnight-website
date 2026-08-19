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
        <section className="relative py-28 bg-white overflow-hidden border-b border-slate-200/80">
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                        Take control of your incident infrastructure today.
                    </h2>
                    
                    <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
                        Deploy {BRAND.name} in under 2 minutes. Free forever, self-hosted, and production-ready.
                    </p>

                    <div className="max-w-2xl mx-auto mt-10">
                        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex items-center justify-between text-left shadow-2xl">
                            <div className="flex items-center gap-3 overflow-hidden text-slate-200 font-mono text-xs sm:text-sm">
                                <Terminal className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                <span className="text-emerald-400 font-bold">$</span>
                                <span className="truncate text-slate-100">{dockerCommand}</span>
                            </div>
                            <button 
                                onClick={copyToClipboard}
                                className="ml-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none shrink-0"
                                aria-label="Copy to clipboard"
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                        <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 h-12 text-sm shadow-lg shadow-blue-600/20 rounded-xl">
                            <Link href="/docs">+ Deploy Community Edition ($0)</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-semibold px-6 h-12 text-sm rounded-xl shadow-sm">
                            <Link href={BRAND.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 w-4 h-4" />
                                Star on GitHub
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
