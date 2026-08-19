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
    description: "Alerts fire simultaneously from Prometheus, Datadog, CloudWatch, Sentry, Grafana, or any of 28+ native webhook endpoints without payload parsing delay.",
    tags: ["28+ Webhooks", "HMAC Verification", "Zero Ingest Drop"]
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
    <section id="how-it-works" className="bg-slate-50 py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold mb-4">
            Deterministic Incident Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            How incidents flow from alert to resolution.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            A high-throughput, low-latency orchestration engine designed to eliminate noise and minimize MTTR.
          </p>
        </div>

        {/* 5-Step Pipeline Cards */}
        <div className="relative space-y-6">
          {/* Vertical Connecting Line */}
          <div className="hidden lg:block absolute left-8 top-10 bottom-10 w-0.5 bg-blue-500/20" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="relative flex flex-col lg:flex-row lg:items-center gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all group"
              >
                {/* Number & Icon Node */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="lg:hidden">
                    <span className="text-xs font-mono font-bold text-blue-600">{step.time}</span>
                    <span className="text-xs text-slate-500 block">{step.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="hidden lg:flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Latency: {step.time}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {step.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
