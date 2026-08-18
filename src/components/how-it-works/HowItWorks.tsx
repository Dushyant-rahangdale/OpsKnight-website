'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: 1,
    time: '0ms',
    title: 'Signal Ingestion',
    description: 'Alerts fire from Prometheus, Datadog, CloudWatch, Sentry, Zabbix, or any of 24+ native webhook sources.'
  },
  {
    number: 2,
    time: '<5ms',
    title: 'Intelligent Deduplication & Correlation',
    description: 'OpsKnight computes SHA-256 fingerprint deduplication keys, correlating duplicate alerts into a single active incident to prevent alert storms.'
  },
  {
    number: 3,
    time: '<15ms',
    title: 'Escalation & On-Call Paging',
    description: 'Routing policies evaluate service ownership and paging rules. The primary on-call engineer is notified via Slack, Push, SMS, or Email.'
  },
  {
    number: 4,
    time: '0-5m',
    title: 'Real-Time War Room & Triage',
    description: 'Slack war room channel is auto-provisioned. Responders collaborate over live SSE streams with centralized timelines and audit trails.'
  },
  {
    number: 5,
    time: 'Resolution',
    title: 'Resolution & Automated Postmortem',
    description: 'Incident is resolved. OpsKnight syncs status page updates, calculates MTTA/MTTR metrics, and drafts a structured postmortem retrospective.'
  }
]

export function HowItWorks() {
  return (
    <section className="bg-slate-950 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            Architecture & Lifecycle
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
            How incidents flow from alert to resolution.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A deterministic, low-latency pipeline designed to minimize MTTR and eliminate noise.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[39px] top-8 bottom-8 w-px bg-slate-800 hidden md:block" />
          
          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 flex flex-col md:flex-row items-start gap-8 group"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center ring-4 ring-slate-950 group-hover:border-blue-500/50 transition-colors">
                  <span className="text-slate-500 text-xs font-mono mb-1">Step {step.number}</span>
                  <span className="text-blue-400 font-semibold text-sm">{step.time}</span>
                </div>
                <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900 transition-colors">
                  <h3 className="text-xl font-medium text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
