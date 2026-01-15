"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Server, Wifi, Shield, Terminal } from "lucide-react";

interface MetricProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    status?: "operational" | "degraded" | "critical";
}

function Metric({ label, value, icon, status = "operational" }: MetricProps) {
    const statusColors = {
        operational: "text-accent-emerald",
        degraded: "text-accent-amber",
        critical: "text-accent-red",
    };

    return (
        <div className="flex items-center gap-3">
            <div className={`${statusColors[status]}`}>{icon}</div>
            <div>
                <p className="text-foreground-muted text-xs uppercase tracking-wide">{label}</p>
                <p className={`font-mono text-sm ${statusColors[status]}`}>{value}</p>
            </div>
        </div>
    );
}

// Simulated ping animation
function PingLine({ target, latency, index }: { target: string; latency: number; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.3 }}
            className="font-mono text-xs text-foreground-muted"
        >
            <span className="text-accent-cyan">64 bytes from</span>{" "}
            <span className="text-foreground">{target}</span>:{" "}
            <span className="text-accent-emerald">icmp_seq={index + 1}</span>{" "}
            <span className="text-foreground-secondary">ttl=58</span>{" "}
            <span className="text-accent-emerald">time={latency}ms</span>
        </motion.div>
    );
}

export function TelemetryDisplay() {
    const [pingLines, setPingLines] = useState<{ target: string; latency: number }[]>([]);

    // Simulate ping updates
    useEffect(() => {
        const targets = ["10.0.0.1", "192.168.1.1", "172.16.0.1"];
        let index = 0;

        const addPing = () => {
            const target = targets[index % targets.length];
            const latency = (Math.random() * 20 + 10).toFixed(1);

            setPingLines((prev) => {
                const newLines = [...prev, { target, latency: parseFloat(latency) }];
                return newLines.slice(-6);
            });

            index++;
        };

        for (let i = 0; i < 4; i++) {
            setTimeout(() => addPing(), i * 300);
        }

        const interval = setInterval(addPing, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass rounded-2xl p-6 max-w-md"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent-emerald" />
                    <span className="text-foreground-secondary text-sm font-mono">demo_server</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-accent-amber/20 text-accent-amber text-xs font-medium rounded">
                        PREVIEW
                    </span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <Metric
                    label="Workers"
                    value="8/8 Active"
                    icon={<Server className="w-4 h-4" />}
                    status="operational"
                />
                <Metric
                    label="Latency"
                    value="~15ms"
                    icon={<Activity className="w-4 h-4" />}
                    status="operational"
                />
                <Metric
                    label="Network"
                    value="Connected"
                    icon={<Wifi className="w-4 h-4" />}
                    status="operational"
                />
                <Metric
                    label="Services"
                    value="All Clear"
                    icon={<Shield className="w-4 h-4" />}
                    status="operational"
                />
            </div>

            {/* Terminal Ping Output */}
            <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-accent-emerald font-mono text-xs">user@localhost</span>
                    <span className="text-foreground-muted font-mono text-xs">~</span>
                    <span className="text-foreground font-mono text-xs">$ ping services</span>
                </div>
                <div className="space-y-1 min-h-[120px]">
                    {pingLines.map((ping, i) => (
                        <PingLine key={i} target={ping.target} latency={ping.latency} index={i} />
                    ))}
                    <span className="inline-block w-2 h-4 bg-accent-emerald animate-blink" />
                </div>
            </div>

            {/* Demo Notice */}
            <p className="text-center text-foreground-muted text-xs mt-4">
                ↑ Illustrative preview of dashboard
            </p>
        </motion.div>
    );
}
