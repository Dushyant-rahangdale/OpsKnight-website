'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: 1,
    title: 'Detect',
    description: 'Alert fires from Prometheus, Datadog, or 22 other sources'
  },
  {
    number: 2,
    title: 'Route',
    description: 'Escalation policy finds the right on-call engineer'
  },
  {
    number: 3,
    title: 'Respond',
    description: 'Slack war room opens, team coordinates in real time'
  },
  {
    number: 4,
    title: 'Resolve',
    description: 'Postmortem auto-generated with full timeline'
  }
]

export function HowItWorks() {
  return (
    <section className="bg-slate-950 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
          How It Works
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-16">
          How incidents flow through OpsKnight
        </h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-800 md:left-4 md:right-4 md:top-[23px] md:bottom-auto md:h-px md:w-auto" />
          
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 flex md:flex-col items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium text-lg ring-4 ring-slate-950">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base max-w-[200px]">
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
