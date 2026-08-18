"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertOctagon, 
  Terminal, 
  Server, 
  BellRing, 
  MessageSquare, 
  CheckCircle2,
  RefreshCw,
  Clock,
  Smartphone,
  ShieldAlert,
  FileText
} from "lucide-react";

type SimulationPhase = "idle" | "triage" | "escalation" | "resolution" | "postmortem";

export function IncidentSimulator() {
  const [phase, setPhase] = useState<SimulationPhase>("idle");
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === "escalation" && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [phase, countdown]);

  const reset = () => {
    setPhase("idle");
    setCountdown(300);
  };

  const webhookPayload = `{
  "status": "firing",
  "labels": {
    "alertname": "HighLatencyAPI",
    "service": "api-gateway",
    "region": "us-east-1",
    "severity": "critical"
  },
  "annotations": {
    "summary": "API Gateway latency > 5s",
    "description": "5xx error rate spiking on /api/v1/checkout"
  }
}`;

  return (
    <section className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4">
            Interactive Test Drive
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Experience a 3 AM incident in 30 seconds.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Test how OpsKnight ingests an alert, deduplicates signals, triggers escalation policies, opens Slack war rooms, and drafts postmortems.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto bg-slate-900/90 text-white rounded-2xl border border-white/10 overflow-hidden shadow-2xl font-sans">
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-sm text-slate-200">Live Incident Orchestration Simulator</h3>
            </div>
            <button
              onClick={reset}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div className="p-6 md:p-8 min-h-[460px] flex flex-col relative bg-slate-950/60">
            <AnimatePresence mode="wait">
              {/* PHASE 1: IDLE */}
              {phase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10 mb-2">
                    <Server className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white mb-2">All Systems Operational</h4>
                    <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                      OpsKnight is listening on 24+ native webhook endpoints with SHA-256 deduplication and circuit breakers.
                    </p>
                  </div>
                  <button
                    onClick={() => setPhase("triage")}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/25 text-sm"
                  >
                    <AlertOctagon className="w-4 h-4" />
                    🚨 Simulate 3 AM Critical Outage
                  </button>
                  
                  <div className="w-full max-w-md mt-6 text-left bg-slate-900 rounded-xl p-4 border border-white/5 opacity-70">
                    <div className="text-xs text-slate-400 mb-2 font-mono">Listening on /api/v2/enqueue...</div>
                    <div className="h-1.5 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                  </div>
                </motion.div>
              )}

              {/* PHASE 2: TRIAGE */}
              {phase === "triage" && (
                <motion.div
                  key="triage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                        <ShieldAlert className="w-5 h-5" />
                        <span>INGESTION & FINGERPRINTING</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/15 border border-red-500/30 text-red-400 animate-pulse">
                        CRITICAL SEV-1
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900 p-4 rounded-xl border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto">
                        <div className="text-slate-400 mb-2 font-bold font-sans">Raw Inbound Webhook Payload</div>
                        <pre className="text-sky-400">{webhookPayload}</pre>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-3">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Real-Time Analysis</div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400">Fingerprint SHA-256:</span>
                            <span className="font-mono text-white">e3b0c44298fc1c14...</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400">Impacted Service:</span>
                            <span className="font-bold text-white">API Gateway (US-East)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400">Escalation Policy:</span>
                            <span className="font-bold text-sky-400">Core Infra 24/7 Primary</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-400">Duplicate Check:</span>
                            <span className="text-emerald-400 font-semibold">Unique Alert (0 suppressed)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setPhase("escalation")}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center gap-2 text-xs transition-colors shadow-lg shadow-red-500/25"
                    >
                      <BellRing className="w-4 h-4" />
                      Trigger Escalation & Page Responders →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PHASE 3: ESCALATION */}
              {phase === "escalation" && (
                <motion.div
                  key="escalation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <Clock className="w-5 h-5" />
                        <span>ACTIVE ESCALATION · ACK SLA COUNTDOWN</span>
                      </div>
                      <span className="px-3 py-1 rounded-lg text-sm font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")} remaining
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-3">
                        <div className="text-xs font-bold text-slate-400 uppercase">Paging Channel Dispatches</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-lg border border-white/5 text-xs">
                            <Smartphone className="w-4 h-4 text-emerald-400" />
                            <div>
                              <div className="font-bold text-white">Push Notification Sent</div>
                              <div className="text-slate-400 text-[10px]">Dushyant Rahangdale (Primary)</div>
                            </div>
                            <span className="ml-auto text-[10px] text-emerald-400 font-bold">DELIVERED</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-lg border border-white/5 text-xs">
                            <MessageSquare className="w-4 h-4 text-sky-400" />
                            <div>
                              <div className="font-bold text-white">Slack War Room Created</div>
                              <div className="text-slate-400 text-[10px]">#warroom-inc-384-api-gateway</div>
                            </div>
                            <span className="ml-auto text-[10px] text-sky-400 font-bold">PROVISIONED</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-white/10 flex flex-col justify-center text-center space-y-3">
                        <div className="text-xs text-slate-400">Acknowledge within SLA window to prevent Tier 2 escalation to Team Lead.</div>
                        <button
                          onClick={() => setPhase("resolution")}
                          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-lg shadow-amber-500/20"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Acknowledge Incident (Claim Commander)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs text-slate-400">
                    <span>Tier 1: Primary On-Call (Dushyant)</span>
                    <span className="text-slate-500">Tier 2: Secondary On-Call (SRE Lead in 5m)</span>
                  </div>
                </motion.div>
              )}

              {/* PHASE 4: RESOLUTION & POSTMORTEM */}
              {(phase === "resolution" || phase === "postmortem") && (
                <motion.div
                  key="resolution"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>INCIDENT MITIGATED & POSTMORTEM DRAFTED</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        RESOLVED (MTTR: 8m 42s)
                      </span>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <FileText className="w-4 h-4 text-sky-400" />
                          <span>Auto-Generated Postmortem: INC-384</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Export Markdown / PDF</span>
                      </div>
                      <div className="font-mono text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950 p-3 rounded-lg border border-white/5">
                        <p><strong className="text-white">Summary:</strong> API Gateway 5xx latency spike caused by read replica connection exhaustion.</p>
                        <p><strong className="text-white">Timeline:</strong> 10:42 PM (Detected) → 10:43 PM (Paged) → 10:45 PM (Acked) → 10:50 PM (Pool Enlarged & Resolved).</p>
                        <p><strong className="text-white">Action Items:</strong> 1. Scale RDS read pool size [Jira: INFRA-102]. 2. Add connection pool circuit breaker.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <button
                      onClick={reset}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Run Simulation Again
                    </button>
                    <span className="text-xs text-slate-400">Zero data leaves your VPC • 100% Self-Hosted</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
