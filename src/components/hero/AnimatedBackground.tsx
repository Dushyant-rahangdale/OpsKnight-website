"use client";

import { motion } from "framer-motion";

function Aurora() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute -top-[50%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/20 blur-[120px] mix-blend-screen"
                animate={{
                    x: ["0%", "20%", "0%"],
                    y: ["0%", "10%", "0%"],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-sky-500/10 blur-[100px] mix-blend-screen"
                animate={{
                    x: ["0%", "-10%", "0%"],
                    y: ["0%", "15%", "0%"],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[100px] mix-blend-screen"
                animate={{
                    x: ["0%", "15%", "0%"],
                    y: ["0%", "-10%", "0%"],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
}

export function AnimatedBackground() {
    return (
        <div className="absolute inset-0 bg-slate-950">
            <Aurora />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80" />
        </div>
    );
}
