"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";

export function SocialProof() {
    return (
        <section className="relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Open Source Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-8 text-center"
                >
                    <Github className="w-12 h-12 text-foreground mx-auto mb-4" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                        Built in the Open
                    </h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto mb-6">
                        OpsSentinal is open-source software. View the code, report issues,
                        contribute features, or fork it for your own needs.
                    </p>
                    <Link
                        href="https://github.com/Dushyant-rahangdale/OpsSentinal"
                        target="_blank"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Github className="w-4 h-4" />
                        View Source Code
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
