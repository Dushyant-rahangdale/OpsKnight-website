"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { BRAND } from "@/lib/brand";

const testimonials = [
    {
        quote: "Finally, an open-source incident management tool that doesn't compromise on features. We migrated from PagerDuty and never looked back.",
        author: "Sarah Chen",
        role: "SRE Lead",
        company: "TechCorp",
        avatar: "SC",
        rating: 5,
    },
    {
        quote: "The self-hosted aspect was a game-changer for us. Full control over our data, no vendor lock-in, and the on-call scheduling is incredibly intuitive.",
        author: "Marcus Johnson",
        role: "Platform Engineer",
        company: "FinanceStack",
        avatar: "MJ",
        rating: 5,
    },
    {
        quote: `${BRAND.name}'s integration ecosystem is impressive. We connected all our monitoring tools in under an hour. The webhook system is chef's kiss.`,
        author: "Emily Rodriguez",
        role: "DevOps Manager",
        company: "CloudNative Inc",
        avatar: "ER",
        rating: 5,
    },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="group relative"
        >
            {/* Subtle glow on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-blue-500/20 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-6">
                    <Quote className="w-10 h-10 text-blue-500/30" />
                </div>
                
                <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-grow">
                    &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.avatar}
                    </div>
                    <div>
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-slate-400">
                            {testimonial.role} at <span className="text-slate-200">{testimonial.company}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function Testimonials() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
                        <Star className="w-3 h-3 fill-current" />
                        Trusted by Teams
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Loved by engineering teams
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        See what platform teams and SREs are saying about {BRAND.name}.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-slate-500 text-sm">
                        Join the growing community of teams using {BRAND.name} for incident management.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
