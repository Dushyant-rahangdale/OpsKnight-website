'use client';

import { motion } from 'framer-motion';
import { 
  Radio, 
  Layers, 
  BellRing, 
  MessageSquare, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';

const steps = [
  {
    number: "01",
    time: "0ms",
    icon: Radio,
    badge: "Ingestion",
    title: "Multi-Source Signal Ingestion",
    description: "Alerts fire simultaneously from Prometheus, Datadog, CloudWatch, Sentry, Grafana, or any of 24+ native webhook endpoints without payload parsing delay.",
    tags: ["24+ Webhooks", "HMAC Verification", "Zero Ingest Drop"]
  },
  {
    number: "02",
    time: "< 5ms",
    icon: Layers,
    badge: "Deduplication",
    title: "Intelligent Deduplication & Noise Reduction",
    description: "OpsKnight computes deterministic SHA-256 fingerprint hashes across alert payloads, automatically grouping secondary cascade alerts into a single root incident.",
    tags: ["SHA-256 Fingerprinting", "Alert Grouping", "Noise Silencing"]
  },
  {
    number: "03",
    time: "< 15ms",
    icon: BellRing,
    badge: "Escalation",
    title: "Timezone-Aware On-Call Paging",
    description: "Routing rules evaluate service ownership, active rotation layers, and shift overrides. Responders receive urgent mobile push, SMS, and Slack notifications.",
    tags: ["Multi-Tier Shifts", "Urgent SMS & Push", "Shift Overrides"]
  },
  {
    number: "04",
    time: "0 - 5m",
    icon: MessageSquare,
    badge: "Coordination",
    title: "Automated Slack War Room & Video Bridge",
    description: "A dedicated war room channel (#inc-<service>-<id>) is automatically provisioned. Responders collaborate over live SSE feeds and 1-click triage buttons.",
    tags: ["Auto-Provisioned Channel", "WebRTC Video", "Live Timeline Sync"]
  },
  {
    number: "05",
    time: "Post-Incident",
    icon: FileCheck,
    badge: "Resolution",
    title: "Resolution & Automated Postmortem Drafting",
    description: "Once resolved, OpsKnight calculates precise MTTA and MTTR, updates public/private status pages, and drafts a structured retrospective document.",
    tags: ["Automated Postmortems", "MTTA / MTTR Telemetry", "Status Page Sync"]
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-950 py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
            Deterministic Incident Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            From alert signal to postmortem in milliseconds.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A low-latency, deterministic pipeline built to eliminate alert fatigue and slash MTTR across production environments.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical Glowing Connector Line */}
          <div className="absolute left-[39px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-red-500 to-emerald-500 opacity-30 hidden md:block" />
          
          <div className="flex flex-col gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative z-10 flex flex-col md:flex-row items-start gap-6 group"
                >
                  {/* Step Badge */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center ring-4 ring-slate-950 group-hover:border-blue-500/50 group-hover:bg-slate-900/90 transition-all shadow-xl">
                    <span className="text-slate-400 text-[11px] font-mono font-bold">{step.number}</span>
                    <span className="text-sky-400 font-black text-xs font-mono mt-0.5">{step.time}</span>
                  </div>

                  {/* Step Card */}
                  <div className="flex-1 bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-slate-900 hover:border-white/20 transition-all shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
                        {step.badge}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                      {step.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
