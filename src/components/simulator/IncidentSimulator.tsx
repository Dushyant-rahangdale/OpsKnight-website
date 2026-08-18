"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Radio, 
  Flame, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Cpu,
  Layers,
  Check,
  Zap,
  Activity,
  MessageSquare,
  ShieldCheck,
  Clock,
  ExternalLink,
  Copy,
  Terminal,
  FileText
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  source: string;
  service: string;
  channelName: string;
  summary: string;
  rawPayload: Record<string, unknown>;
  matchedPolicy: {
    name: string;
    tier: number;
    responder: string;
    escalationTimeout: string;
  };
}

interface StepLog {
  id: string;
  timeOffset: string;
  latencyMs: number;
  stage: "INGEST" | "CORRELATE" | "ESCALATE" | "PAGE" | "WARROOM" | "SLA_MONITOR";
  title: string;
  description: string;
  meta: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "k8s-502",
    name: "K8s Ingress 502 Cascade",
    severity: "CRITICAL",
    source: "Prometheus AlertManager",
    service: "ingress-gateway",
    channelName: "inc-k8s-ingress-502",
    summary: "HTTP 502 Bad Gateway rate > 8.4% on edge ingress router cluster",
    rawPayload: {
      receiver: "opsknight-webhook",
      status: "firing",
      alertname: "IngressHigh5xxRate",
      severity: "critical",
      service: "ingress-gateway",
      cluster: "prod-us-east-1"
    },
    matchedPolicy: {
      name: "Edge Routing Tier-1 Policy",
      tier: 1,
      responder: "Alex Vance (Primary On-Call)",
      escalationTimeout: "5 minutes"
    }
  },
  {
    id: "db-pool",
    name: "PostgreSQL Pool Exhaustion",
    severity: "CRITICAL",
    source: "Datadog Metric Monitor",
    service: "postgres-primary",
    channelName: "inc-postgres-pool",
    summary: "Active client connections 98/100. Connection pool wait latency > 2,400ms",
    rawPayload: {
      check: "postgresql.connections.active",
      value: 98,
      threshold: 90,
      service: "postgres-primary",
      env: "production"
    },
    matchedPolicy: {
      name: "Database Infra Tier-1 Policy",
      tier: 1,
      responder: "Sarah Chen (Database Lead)",
      escalationTimeout: "3 minutes"
    }
  },
  {
    id: "stripe-timeout",
    name: "Stripe Webhook Delivery Timeout",
    severity: "HIGH",
    source: "Stripe Webhook Ingest",
    service: "billing-worker",
    channelName: "inc-billing-webhook",
    summary: "Dead-letter queue spiking. Webhook timeouts on payment_succeeded.",
    rawPayload: {
      type: "invoice.payment_failed",
      service: "billing-worker",
      failure_reason: "504_GATEWAY_TIMEOUT"
    },
    matchedPolicy: {
      name: "Payments Tier-1 Escalation",
      tier: 1,
      responder: "Alex Vance (Primary On-Call)",
      escalationTimeout: "10 minutes"
    }
  }
];

export function IncidentSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(5);
  const [logs, setLogs] = useState<StepLog[]>([]);
  const [incidentState, setIncidentState] = useState<"OPEN" | "ACKNOWLEDGED" | "RESOLVED">("OPEN");
  const [liveClock, setLiveClock] = useState<string>("21:10:39");
  const [openAlertCount, setOpenAlertCount] = useState<number>(384);
  const [resolvedCount, setResolvedCount] = useState<number>(165);
  const [commanderName, setCommanderName] = useState<string>("Unassigned");
  const [copiedDocker, setCopiedDocker] = useState<boolean>(false);
  const [showPostmortem, setShowPostmortem] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setLiveClock(d.toTimeString().split(" ")[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateStepLogs = (sc: Scenario): StepLog[] => [
    {
      id: "s1",
      timeOffset: "00:00.012",
      latencyMs: 12,
      stage: "INGEST",
      title: "Webhook Ingest & HMAC-SHA256",
      description: `Ingested payload from ${sc.source}. HMAC signature verified.`,
      meta: "200 OK · Payload parsed in 12ms"
    },
    {
      id: "s2",
      timeOffset: "00:00.045",
      latencyMs: 33,
      stage: "CORRELATE",
      title: "Signal De-duplication & Correlation",
      description: `Correlated against active alerts for [${sc.service}]. Grouped into single incident.`,
      meta: "De-dupe Window: 300s · Hash: 9f8a2c1e"
    },
    {
      id: "s3",
      timeOffset: "00:00.089",
      latencyMs: 44,
      stage: "ESCALATE",
      title: "Escalation Policy Matching",
      description: `Rule matched: '${sc.matchedPolicy.name}'. Routing to Tier ${sc.matchedPolicy.tier}.`,
      meta: `Assigned: ${sc.matchedPolicy.responder}`
    },
    {
      id: "s4",
      timeOffset: "00:00.124",
      latencyMs: 35,
      stage: "PAGE",
      title: "Urgent Paging (SMS + Push)",
      description: "Dispatched High-Priority SMS & Mobile Override Push to on-call responder.",
      meta: "Delivery confirmed via Twilio / SNS"
    },
    {
      id: "s5",
      timeOffset: "00:00.180",
      latencyMs: 56,
      stage: "WARROOM",
      title: "Slack War Room & WebRTC Bridge",
      description: `Spun up channel #${sc.channelName} and attached WebRTC video bridge.`,
      meta: "Slack App Bot · Bi-Directional SSE Live"
    },
    {
      id: "s6",
      timeOffset: "00:00.220",
      latencyMs: 40,
      stage: "SLA_MONITOR",
      title: "SLA Monitor & Dashboard Sync",
      description: "Initialized 15m P1 Ack SLA timer. Real-time telemetry synced to Command Center.",
      meta: "Target MTTA: < 3m · Live Tracking Active"
    }
  ];

  useEffect(() => {
    setLogs(generateStepLogs(selectedScenario));
    setIncidentState("OPEN");
    setCommanderName("Unassigned");
    setCurrentStepIndex(5);
    setShowPostmortem(false);
  }, [selectedScenario]);

  const triggerLiveSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLogs([]);
    setCurrentStepIndex(0);
    setIncidentState("OPEN");
    setCommanderName("Unassigned");
    setOpenAlertCount(385);
    setShowPostmortem(false);

    const fullSteps = generateStepLogs(selectedScenario);

    fullSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        setCurrentStepIndex(idx);
        if (idx === fullSteps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 280);
    });
  };

  const handleAcknowledge = () => {
    setIncidentState("ACKNOWLEDGED");
    setCommanderName(selectedScenario.matchedPolicy.responder);
    const ackStep: StepLog = {
      id: "ack",
      timeOffset: "00:01.240",
      latencyMs: 25,
      stage: "SLA_MONITOR",
      title: "Incident Acknowledged by Commander",
      description: `${selectedScenario.matchedPolicy.responder} claimed commander via Slack. P1 Ack SLA met in 1.2s.`,
      meta: "P1 Ack SLA Met · Target: 15m"
    };
    setLogs(prev => [...prev, ackStep]);
  };

  const handleResolve = () => {
    setIncidentState("RESOLVED");
    setOpenAlertCount(384);
    setResolvedCount(prev => prev + 1);
    setShowPostmortem(true);
    const resolveStep: StepLog = {
      id: "res",
      timeOffset: "00:03.110",
      latencyMs: 30,
      stage: "SLA_MONITOR",
      title: "Incident Resolved & Retrospective Logged",
      description: "All services recovered. Automated AI Postmortem drafted, incident timeline archived, Slack war room updated.",
      meta: "MTTR: 3.1m · Status Page: All Systems Operational"
    };
    setLogs(prev => [...prev, resolveStep]);
  };

  const handleCopyDocker = () => {
    navigator.clipboard.writeText("docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest");
    setCopiedDocker(true);
    setTimeout(() => setCopiedDocker(false), 2500);
  };

  return (
    <section id="interactive-demo" className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden font-sans">
      
      {/* Background Ambient Reactor Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Synchronized Incident Reactor (Zero Lag)
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Watch the entire incident lifecycle in sub-seconds.
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            From webhook alert ingestion to Command Center KPIs, multi-tier SMS paging, Slack war room creation, and AI postmortem drafting.
          </p>

          {/* Scenario Selectors & Live Action Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mr-2">
              <Activity className="w-3.5 h-3.5 text-red-500" />
              <span>Select Outage:</span>
            </span>

            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-2 ${
                  selectedScenario.id === sc.id
                    ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/25 scale-105"
                    : "bg-slate-900 text-slate-400 hover:text-white border-white/10 hover:bg-slate-800"
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${selectedScenario.id === sc.id ? "text-white" : "text-slate-500"}`} />
                <span>{sc.name}</span>
              </button>
            ))}

            <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

            <button
              onClick={triggerLiveSimulation}
              disabled={isSimulating}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Orchestrating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>🚨 Trigger Sev-1 Outage</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Unified 3-Pane Synchronized Incident Reactor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* PANE 1: SRE Distributed Pipeline (< 220ms) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#090d16] border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header */}
              <div className="h-12 px-4 bg-[#0e1424] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-red-400" />
                  <span className="font-bold text-xs text-white uppercase tracking-wider">1. SRE Ingestion & Paging</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  &lt; 220ms
                </span>
              </div>

              {/* Execution Steps */}
              <div className="p-4 space-y-2.5 max-h-[460px] overflow-y-auto font-sans">
                <AnimatePresence>
                  {logs.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-3 rounded-xl border transition-all text-xs ${
                        idx === currentStepIndex
                          ? "bg-slate-900 border-red-500/40 shadow-sm"
                          : "bg-slate-900/50 border-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {step.stage === "INGEST" && <Cpu className="w-3.5 h-3.5 text-red-400" />}
                            {step.stage === "CORRELATE" && <Layers className="w-3.5 h-3.5 text-blue-400" />}
                            {step.stage === "ESCALATE" && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                            {step.stage === "PAGE" && <Zap className="w-3.5 h-3.5 text-amber-400" />}
                            {step.stage === "WARROOM" && <MessageSquare className="w-3.5 h-3.5 text-purple-400" />}
                            {step.stage === "SLA_MONITOR" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>

                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-xs">{step.title}</span>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-snug">{step.description}</p>
                            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>{step.meta}</span>
                            </div>
                          </div>
                        </div>

                        <span className="font-mono text-[10px] text-slate-500 shrink-0 bg-slate-950 px-1.5 py-0.5 rounded border border-white/5">
                          +{step.latencyMs}ms
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Ingestion Payload Summary */}
            <div className="p-3.5 bg-[#0b0f1c] border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Source: {selectedScenario.source}</span>
              <span className="text-emerald-400 font-bold">HMAC Verified ✓</span>
            </div>
          </div>

          {/* PANE 2: Command Center Live Pulse (Real App KPIs) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#192231] border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header */}
              <div className="h-12 px-4 bg-[#111726] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs text-white uppercase tracking-wider">2. Command Center Live Pulse</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{liveClock}</span>
                </div>
              </div>

              {/* Red Alert Operational Beacon */}
              <div className="p-4 space-y-4">
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                    <div>
                      <div className="text-xs font-black text-red-400 uppercase tracking-wide">
                        {incidentState === "OPEN" ? "● RED ALERT ACTIVE" : incidentState === "ACKNOWLEDGED" ? "● ACKNOWLEDGED (IN TRIAGE)" : "● ALL SYSTEMS OPERATIONAL"}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Target Service: {selectedScenario.service}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    incidentState === "OPEN" 
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : incidentState === "ACKNOWLEDGED"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  }`}>
                    {incidentState}
                  </span>
                </div>

                {/* 4 App Metric Cards - Exactly Matching Production App */}
                <div className="grid grid-cols-2 gap-2.5 text-left">
                  <div className="p-3 rounded-xl bg-[#283347] border border-white/5">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">TOTAL (30D)</div>
                    <div className="text-2xl font-black text-white font-mono mt-0.5">347</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#283347] border border-red-500/20">
                    <div className="text-xs font-bold text-red-300/80 uppercase tracking-wider text-[10px]">OPEN ALERTS</div>
                    <div className="text-2xl font-black text-red-400 font-mono mt-0.5">{openAlertCount}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#283347] border border-emerald-500/20">
                    <div className="text-xs font-bold text-emerald-300/80 uppercase tracking-wider text-[10px]">RESOLVED (30D)</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{resolvedCount}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#283347] border border-white/5">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">COMMANDER</div>
                    <div className="text-xs font-bold text-white truncate mt-1.5">{commanderName}</div>
                  </div>
                </div>

                {/* Active SLA Countdown */}
                <div className="p-3 rounded-xl bg-[#111827] border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      P1 Ack SLA Target (15m)
                    </span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {incidentState === "OPEN" ? "14:58 remaining" : "SLA Met in 1.2s ✓"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[95%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-[#111827] border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Policy: {selectedScenario.matchedPolicy.name}</span>
              <span className="text-white font-bold">Tier 1</span>
            </div>
          </div>

          {/* PANE 3: Slack War Room & Triage Actions */}
          <div className="lg:col-span-4 rounded-2xl bg-[#1a1d21] border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div>
              {/* Slack Channel Header */}
              <div className="h-12 px-4 bg-[#1a1d21] border-b border-[#2c3136] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold text-xs">☆</span>
                  <span className="font-extrabold text-white text-xs">#{selectedScenario.channelName}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-[#222529] px-2 py-0.5 rounded border border-white/10">
                  Live ChatOps
                </span>
              </div>

              {/* Slack Message Card */}
              <div className="p-4 space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z"/>
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">OpsKnight</span>
                        <span className="px-1 py-0.2 bg-[#2c3136] text-[9px] text-slate-400 font-bold rounded">APP</span>
                        <span className="text-slate-500 text-[10px]">14:30</span>
                      </div>
                      <h4 className="font-bold text-white text-xs mt-0.5">
                        🚨 {selectedScenario.name}
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">{selectedScenario.summary}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-[#222529]/60 p-2.5 rounded-lg border border-white/5">
                      <div><span className="text-slate-400">Service:</span> <strong className="text-white">{selectedScenario.service}</strong></div>
                      <div><span className="text-slate-400">Status:</span> <strong className={incidentState === "OPEN" ? "text-red-400" : incidentState === "ACKNOWLEDGED" ? "text-amber-400" : "text-emerald-400"}>{incidentState}</strong></div>
                      <div><span className="text-slate-400">Urgency:</span> <strong className="text-white">{selectedScenario.severity}</strong></div>
                      <div><span className="text-slate-400">Commander:</span> <strong className="text-white truncate">{commanderName}</strong></div>
                    </div>

                    {/* Interactive 1-Click Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {incidentState === "OPEN" && (
                        <button
                          onClick={handleAcknowledge}
                          className="px-3 py-1.5 bg-[#222529] hover:bg-[#2c3136] border border-amber-500/60 text-amber-400 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <span>👀</span>
                          <span>Acknowledge</span>
                        </button>
                      )}

                      {incidentState !== "RESOLVED" && (
                        <button
                          onClick={handleResolve}
                          className="px-3 py-1.5 bg-[#222529] hover:bg-[#2c3136] border border-emerald-500/60 text-emerald-400 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <span>✅</span>
                          <span>Resolve</span>
                        </button>
                      )}

                      {incidentState === "RESOLVED" && (
                        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolved by Commander</span>
                        </div>
                      )}
                    </div>

                    {/* Jitsi Meet Bridge */}
                    <div className="border-l-4 border-l-sky-500 pl-2.5 py-1 bg-[#222529]/60 rounded-r-lg space-y-0.5 mt-2">
                      <div className="font-bold text-sky-400 text-[11px] flex items-center gap-1">
                        <span>Jitsi Meet WebRTC Video Bridge</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        https://meet.jit.si/opsknight-{selectedScenario.service}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-[#14171a] border-t border-[#2c3136] text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Channel: #{selectedScenario.channelName}</span>
              <span className="text-sky-400">opsknight.com</span>
            </div>
          </div>

        </div>

        {/* Automated AI Postmortem Retrospective Preview (Shown on Resolve) */}
        {showPostmortem && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-slate-950 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase border border-emerald-500/30 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Automated AI Postmortem Generated</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">Incident #inc-{selectedScenario.service}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {selectedScenario.name} · Full Retrospective Logged
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                <strong>Timeline summary:</strong> Alert ingested from {selectedScenario.source} → Primary on-call {selectedScenario.matchedPolicy.responder} paged via SMS → Commander acknowledged in 1.2s (P1 SLA Met) → Root cause mitigated → Status page synced to Operational.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center">
                <div className="text-slate-400 text-[10px] uppercase font-bold">MTTA</div>
                <div className="text-emerald-400 font-bold text-sm">1.2s</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center">
                <div className="text-slate-400 text-[10px] uppercase font-bold">MTTR</div>
                <div className="text-emerald-400 font-bold text-sm">3.1m</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center">
                <div className="text-slate-400 text-[10px] uppercase font-bold">SLA Adherence</div>
                <div className="text-white font-bold text-sm">100%</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Speed Benchmark Comparison Strip: OpsKnight vs PagerDuty vs Manual */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-900/60 border border-white/10 shadow-xl">
          <div className="text-center mb-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Automation Latency Benchmark: From Webhook Alert to War Room
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* OpsKnight */}
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">OpsKnight (Self-Hosted)</span>
                <span className="text-emerald-400 font-mono font-bold text-base">&lt; 220ms</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Zero network hops outside your VPC. In-memory policy evaluation and instant sub-second SMS/Slack dispatch.
              </p>
            </div>

            {/* PagerDuty */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5 opacity-80">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 text-sm">Legacy PagerDuty</span>
                <span className="text-amber-400 font-mono font-bold text-base">12.4 seconds</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Multi-tenant SaaS queue processing, external egress payload translation, and webhook delays.
              </p>
            </div>

            {/* Manual Triage */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5 opacity-80">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 text-sm">Manual SRE Triage</span>
                <span className="text-red-400 font-mono font-bold text-base">4.5 minutes</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Manually looking up on-call spreadsheets, creating Zoom meetings, and setting up Slack incident channels.
              </p>
            </div>
          </div>
        </div>

        {/* 1-Click Docker Terminal Deploy Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-[#090d16] border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Deploy the full OpsKnight Command Center in your cluster:</div>
              <code className="text-sky-400 font-mono text-xs">docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest</code>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyDocker}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedDocker ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedDocker ? "Copied Command!" : "Copy Command"}</span>
            </button>
            <Link
              href="/docs"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-500/25"
            >
              Deploy Guide ↗
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
