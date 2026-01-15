"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animated particles/dots floating in the background
function FloatingParticles() {
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-accent-emerald/20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// Animated grid lines
function AnimatedGrid() {
    return (
        <div className="absolute inset-0 grid-background opacity-50" />
    );
}

// Glowing orbs for visual effect
function GlowingOrbs() {
    return (
        <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-emerald/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-3xl" />
        </>
    );
}

export function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <AnimatedGrid />
            <GlowingOrbs />
            <FloatingParticles />
        </div>
    );
}
