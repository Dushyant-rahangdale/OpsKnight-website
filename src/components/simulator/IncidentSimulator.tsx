"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Radio, 
  Flame, 
  Terminal, 
  LayoutDashboard, 
  MessageSquare, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Users,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Zap,
  Activity,
  ShieldAlert
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  source: string;
  service: string;
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
  status: "pending" | "running" | "completed";
}

const SCENARIOS: Scenario[] = [
  {
    id: "k8s-502",
    name: "Kubernetes Ingress 502 Spike",
    severity: "CRITICAL",
    source: "Prometheus AlertManager",
    service: "ingress-gateway",
    summary: "HTTP 502 Bad Gateway rate > 8.4% on edge ingress router cluster",
    rawPayload: {
      receiver: "opsknight-webhook",
      status: "firing",
      alerts: [
        {
          status: "firing",
          labels: {
            alertname: "IngressHigh5xxRate",
            severity: "critical",
            service: "ingress-gateway",
            cluster: "prod-us-east-1",
            namespace: "networking"
          },
          annotations: {
            summary: "HTTP 502 rate > 8.4% on edge ingress router cluster",
            runbook_url: "https://wiki.internal.io/runbooks/ingress-502"
          },
          startsAt: new Date().toISOString()
        }
      ],
      groupLabels: { service: "ingress-gateway" },
      commonLabels: { urgency: "HIGH" }
    },
    matchedPolicy: {
      name: "Production Ingress Critical Policy",
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
    summary: "Active client connections 98/100. Connection pool wait latency > 2,400ms",
    rawPayload: {
      event_type: "metric_alert",
      alert_id: "DD-9481024",
      check: "postgresql.connections.active",
      value: 98,
      threshold: 90,
      tags: ["env:prod", "service:postgres-primary", "tier:data-layer"],
      message: "Active client connections 98/100 on primary cluster"
    },
    matchedPolicy: {
      name: "Data Infra Tier-1 Escalation",
      tier: 1,
      responder: "Sarah Chen (Database Lead)",
      escalationTimeout: "3 minutes"
    }
  },
  {
    id: "stripe-timeout",
    name: "Stripe Webhook Delivery Timeout",
    severity: "HIGH",
    source: "Stripe Webhook Ingestion",
    service: "billing-worker",
    summary: "Webhook timeout on subscription.payment_succeeded. Dead-letter queue spiking.",
    rawPayload: {
      type: "webhook.delivery_failed",
      event: "invoice.payment_action_required",
      failure_reason: "504_GATEWAY_TIMEOUT",
      attempts: 4,
      service: "billing-worker"
    },
    matchedPolicy: {
      name: "Payments & Revenue Escalation",
      tier: 1,
      responder: "Alex Vance (Primary On-Call)",
      escalationTimeout: "10 minutes"
    }
  }
];

export function IncidentSimulator() {
  const [activeTab, setActiveTab] = useState<"console" | "command-center" | "slack">("console");
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(100);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(5);
  const [logs, setLogs] = useState<StepLog[]>([]);
  const [inspectTab, setInspectTab] = useState<"json" | "policy" | "dispatch" | "timeline">("json");
  const [incidentState, setIncidentState] = useState<"IDLE" | "OPEN" | "ACKNOWLEDGED" | "RESOLVED">("OPEN");
  const [liveClock, setLiveClock] = useState<string>("21:10:39");
  const [copied, setCopied] = useState<boolean>(false);

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
      title: "Webhook Ingestion & HMAC Verification",
      description: `Ingested payload from ${sc.source} with valid HMAC-SHA256 signature. Zero parse drop.`,
      meta: "200 OK · Payload size: 1.4KB",
      status: "completed"
    },
    {
      id: "s2",
      timeOffset: "00:00.045",
      latencyMs: 33,
      stage: "CORRELATE",
      title: "De-duplication & Signal Correlation",
      description: `Correlated against active incidents for [${sc.service}]. Grouped 4 alert signals into a single incident entity.`,
      meta: "De-dupe Window: 300s · Hash: 9f8a2c1e",
      status: "completed"
    },
    {
      id: "s3",
      timeOffset: "00:00.089",
      latencyMs: 44,
      stage: "ESCALATE",
      title: "Escalation Policy Matching",
      description: `Rule matched: '${sc.matchedPolicy.name}'. Designated responder: ${sc.matchedPolicy.responder}.`,
      meta: `Tier ${sc.matchedPolicy.tier} · Timeout: ${sc.matchedPolicy.escalationTimeout}`,
      status: "completed"
    },
    {
      id: "s4",
      timeOffset: "00:00.124",
      latencyMs: 35,
      stage: "PAGE",
      title: "Urgent Paging Dispatch (SMS + Push)",
      description: "Dispatched High-Priority SMS & Mobile Override Push to primary responder device.",
      meta: "AWS SNS / Twilio SMS · Carrier Delivery: 99.98%",
      status: "completed"
    },
    {
      id: "s5",
      timeOffset: "00:00.180",
      latencyMs: 56,
      stage: "WARROOM",
      title: "Slack Incident War Room Auto-Provisioned",
      description: `Spun up dedicated channel #inc-${sc.service}-outage. Attached WebRTC Jitsi video conference bridge.`,
      meta: "Slack App Bot · Webhook Sync SSE Live",
      status: "completed"
    },
    {
      id: "s6",
      timeOffset: "00:00.220",
      latencyMs: 40,
      stage: "SLA_MONITOR",
      title: "SLA Monitor & Postmortem Ingestion",
      description: "Initialized 15-minute P1 Acknowledge SLA countdown. Real-time telemetry feed connected to Command Center.",
      meta: "Target MTTA: < 3m · Live Tracking Active",
      status: "completed"
    }
  ];

  useEffect(() => {
    setLogs(generateStepLogs(selectedScenario));
    setIncidentState("OPEN");
    setCurrentStepIndex(5);
    setSimProgress(100);
  }, [selectedScenario]);

  const triggerLiveSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimProgress(0);
    setLogs([]);
    setCurrentStepIndex(0);
    setIncidentState("OPEN");

    const fullSteps = generateStepLogs(selectedScenario);

    fullSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        setCurrentStepIndex(idx);
        setSimProgress(((idx + 1) / fullSteps.length) * 100);
        if (idx === fullSteps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 350);
    });
  };

  const handleAcknowledge = () => {
    setIncidentState("ACKNOWLEDGED");
    const ackStep: StepLog = {
      id: "ack",
      timeOffset: "00:01.240",
      latencyMs: 25,
      stage: "SLA_MONITOR",
      title: "Incident Acknowledged by Commander",
      description: `${selectedScenario.matchedPolicy.responder} claimed incident commander. Escalation halted, status page updated.`,
      meta: "P1 Ack SLA Met in 1.2s · Target: 15m",
      status: "completed"
    };
    setLogs(prev => [...prev, ackStep]);
  };

  const handleResolve = () => {
    setIncidentState("RESOLVED");
    const resolveStep: StepLog = {
      id: "res",
      timeOffset: "00:03.110",
      latencyMs: 30,
      stage: "SLA_MONITOR",
      title: "Incident Resolved & Retrospective Created",
      description: "All services healthy. Automated AI Postmortem drafted, incident timeline archived, Slack war room closed.",
      meta: "MTTR: 3.1m · Status Page: All Systems Operational",
      status: "completed"
    };
    setLogs(prev => [...prev, resolveStep]);
  };

  const handleCopyCurl = () => {
    const curlCommand = `curl -X POST https://app.opsknight.com/api/v1/webhooks/incoming \\
  -H "Content-Type: application/json" \\
  -H "X-OpsKnight-Key: pk_live_9481024" \\
  -d '${JSON.stringify(selectedScenario.rawPayload)}'`;
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="interactive-demo" className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Interactive Incident Orchestration Studio
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Sub-second triage. From alert to war room in &lt; 250ms.
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Test the entire distributed incident pipeline in real time: webhook ingestion, policy routing, urgent paging, Slack war room creation, and AI postmortem drafting.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab("console")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                activeTab === "console"
                  ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/25"
                  : "bg-slate-900 text-slate-400 hover:text-white border-white/10 hover:bg-slate-800"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>⚡ Live Pipeline Engine (Interactive Orchestrator)</span>
            </button>

            <button
              onClick={() => setActiveTab("command-center")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                activeTab === "command-center"
                  ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/25"
                  : "bg-slate-900 text-slate-400 hover:text-white border-white/10 hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>📊 Command Center (Actual 2x Retina UI)</span>
            </button>

            <button
              onClick={() => setActiveTab("slack")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                activeTab === "slack"
                  ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/25"
                  : "bg-slate-900 text-slate-400 hover:text-white border-white/10 hover:bg-slate-800"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>💬 Slack Incident War Room</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Live SRE Incident Pipeline Engine */}
        {activeTab === "console" && (
          <div className="w-full max-w-6xl mx-auto rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl overflow-hidden flex flex-col font-sans">
            
            {/* Top Toolbar: Scenario Selectors + Live Actions */}
            <div className="p-4 bg-[#0d1322] border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Scenario Switcher Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                  <span>Scenario:</span>
                </span>
                {SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer flex items-center gap-1.5 ${
                      selectedScenario.id === sc.id
                        ? "bg-red-600 text-white border-red-500 shadow-sm"
                        : "bg-slate-900 text-slate-400 hover:text-white border-white/10 hover:bg-slate-800"
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${selectedScenario.id === sc.id ? "text-white" : "text-slate-500"}`} />
                    <span>{sc.name}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons: Simulate, Acknowledge, Resolve */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={triggerLiveSimulation}
                  disabled={isSimulating}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shadow-red-500/25 disabled:opacity-50 cursor-pointer"
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Running Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>🚨 Fire Sev-1 Simulation</span>
                    </>
                  )}
                </button>

                {incidentState === "OPEN" && (
                  <button
                    onClick={handleAcknowledge}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>1-Click Acknowledge</span>
                  </button>
                )}

                {incidentState !== "RESOLVED" && (
                  <button
                    onClick={handleResolve}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Resolve Incident</span>
                  </button>
                )}

                {incidentState === "RESOLVED" && (
                  <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Resolved</span>
                  </span>
                )}
              </div>
            </div>

            {/* Performance Telemetry Strip */}
            <div className="px-6 py-3 bg-[#0a0f1d] border-b border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wide">Ingest Latency</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">12ms</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wide">Paging Trigger</span>
                  <span className="text-white font-mono font-bold text-sm">SMS + Push (35ms)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wide">War Room Sync</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">180ms</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wide">Total Orchestration</span>
                  <span className="text-sky-400 font-mono font-bold text-sm">&lt; 220ms</span>
                </div>
              </div>

              {/* Simulation Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">Pipeline: {Math.round(simProgress)}%</span>
                <div className="w-28 bg-slate-800 rounded-full h-1.5 overflow-hidden border border-white/5">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${simProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Main Studio Body: Execution Pipeline (Left) + Telemetry Inspector (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
              
              {/* Left Column: Live Execution Steps Flow (7 Cols) */}
              <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#070b14] space-y-3 overflow-y-auto max-h-[580px]">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-1 uppercase tracking-wider">
                  <span>Distributed Execution Pipeline</span>
                  <span className="font-mono text-slate-500">{liveClock} UTC</span>
                </div>

                <div className="space-y-2.5">
                  <AnimatePresence>
                    {logs.map((step, idx) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`p-3.5 rounded-xl border transition-all ${
                          idx === currentStepIndex
                            ? "bg-slate-900/95 border-red-500/40 shadow-lg shadow-red-500/5"
                            : "bg-slate-900/60 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="mt-0.5">
                              {step.stage === "INGEST" && <Cpu className="w-4 h-4 text-red-400" />}
                              {step.stage === "CORRELATE" && <Layers className="w-4 h-4 text-blue-400" />}
                              {step.stage === "ESCALATE" && <Users className="w-4 h-4 text-amber-400" />}
                              {step.stage === "PAGE" && <Zap className="w-4 h-4 text-amber-400" />}
                              {step.stage === "WARROOM" && <MessageSquare className="w-4 h-4 text-purple-400" />}
                              {step.stage === "SLA_MONITOR" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                            </div>

                            <div className="space-y-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-white text-xs font-sans">{step.title}</span>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-white/5">
                                  +{step.latencyMs}ms
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 font-sans leading-relaxed">{step.description}</p>
                              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span>{step.meta}</span>
                              </div>
                            </div>
                          </div>

                          <span className="font-mono text-[10px] text-slate-500 shrink-0 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                            {step.timeOffset}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Deep Telemetry & Payload Inspector (5 Cols) */}
              <div className="lg:col-span-5 bg-[#0b0f1a] flex flex-col justify-between">
                
                {/* Inspector Header Tabs */}
                <div>
                  <div className="h-10 border-b border-white/10 px-4 flex items-center justify-between text-xs bg-[#0e1424]">
                    <div className="flex items-center gap-4 font-semibold">
                      <button
                        onClick={() => setInspectTab("json")}
                        className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                          inspectTab === "json" ? "border-red-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Webhook JSON
                      </button>
                      <button
                        onClick={() => setInspectTab("policy")}
                        className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                          inspectTab === "policy" ? "border-red-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Escalation Policy
                      </button>
                      <button
                        onClick={() => setInspectTab("dispatch")}
                        className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                          inspectTab === "dispatch" ? "border-red-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Dispatch Payloads
                      </button>
                    </div>

                    <button
                      onClick={handleCopyCurl}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                      title="Copy raw curl command"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied curl" : "Copy cURL"}</span>
                    </button>
                  </div>

                  {/* Inspector Content Panel */}
                  <div className="p-4 font-mono text-xs overflow-y-auto max-h-[440px]">
                    {inspectTab === "json" && (
                      <div className="space-y-2">
                        <div className="text-[11px] text-slate-500 font-sans flex items-center justify-between">
                          <span>Payload Format: CloudEvents / Prometheus v2</span>
                          <span className="text-emerald-400 font-bold">HMAC Verified ✓</span>
                        </div>
                        <pre className="p-3 bg-slate-950 rounded-xl border border-white/10 text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
                          {JSON.stringify(selectedScenario.rawPayload, null, 2)}
                        </pre>
                      </div>
                    )}

                    {inspectTab === "policy" && (
                      <div className="space-y-3 font-sans">
                        <div className="p-3 bg-slate-950 rounded-xl border border-white/10 space-y-2">
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-blue-400" />
                            <span>{selectedScenario.matchedPolicy.name}</span>
                          </div>
                          <div className="text-xs text-slate-400 space-y-1">
                            <div>• Routing Key: <code>service == &quot;{selectedScenario.service}&quot;</code></div>
                            <div>• Target Tier: <strong>Tier {selectedScenario.matchedPolicy.tier} (Primary)</strong></div>
                            <div>• Assigned Responder: <strong className="text-white">{selectedScenario.matchedPolicy.responder}</strong></div>
                            <div>• Escalation Timeout: <strong>{selectedScenario.matchedPolicy.escalationTimeout}</strong></div>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 text-xs text-slate-400">
                          <div className="font-bold text-slate-300 mb-1">Fallback Escalation Step 2:</div>
                          <div>If unacknowledged in {selectedScenario.matchedPolicy.escalationTimeout} → Auto-escalate to Secondary On-Call (Sarah Chen) + Page VP Engineering.</div>
                        </div>
                      </div>
                    )}

                    {inspectTab === "dispatch" && (
                      <div className="space-y-3 font-sans">
                        {/* SMS Dispatch */}
                        <div className="p-3 bg-slate-950 rounded-xl border border-white/10 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                            <span>📱 High-Priority SMS Payload</span>
                            <span className="text-slate-500 font-mono text-[10px]">Twilio / AWS SNS</span>
                          </div>
                          <div className="text-xs text-slate-300 font-mono bg-slate-900 p-2 rounded border border-white/5">
                            [OpsKnight ALERT] CRITICAL on {selectedScenario.service}: {selectedScenario.summary}. Reply 1 to Ack, 2 to Resolve.
                          </div>
                        </div>

                        {/* Slack Dispatch */}
                        <div className="p-3 bg-slate-950 rounded-xl border border-white/10 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-purple-400">
                            <span>💬 Slack War Room Block Kit</span>
                            <span className="text-slate-500 font-mono text-[10px]">#inc-{selectedScenario.service}-outage</span>
                          </div>
                          <div className="text-xs text-slate-300 font-mono bg-slate-900 p-2 rounded border border-white/5">
                            Provisioned channel + WebRTC Bridge https://meet.jit.si/opsknight-{selectedScenario.service}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom CLI Trigger Help */}
                <div className="p-3.5 bg-[#0a0e19] border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-sans">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-slate-500" />
                    <span>Run test alert via terminal:</span>
                  </div>
                  <button
                    onClick={handleCopyCurl}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>curl -X POST /webhooks/incoming</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Actual Real 2x Retina Screenshot with Interactive Callout Tour */}
        {activeTab === "command-center" && (
          <div className="w-full max-w-6xl mx-auto rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col">
            {/* Window Top Bar */}
            <div className="h-10 bg-slate-900 px-4 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
              </div>
              <div className="flex items-center gap-2 px-4 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono">
                <span>https://app.opsknight.com/dashboard</span>
              </div>
              <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Production 100% Crisp 2x Retina</span>
              </div>
            </div>

            {/* Actual Production UI Visual */}
            <div className="relative bg-[#f4f6fa] p-2 overflow-hidden group">
              <Image
                src="/dashboard-command-center.png"
                alt="OpsKnight Real Command Center Production UI"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-xl shadow-lg border border-slate-200"
                priority
              />

              {/* Interactive Hotspots Tour */}
              <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                {/* Hotspot 1: Red Alert Beacon */}
                <div className="flex justify-start">
                  <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white border border-red-500/40 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="font-bold">Real-time Red Alert Beacon</span>
                    <span className="text-[10px] text-red-300 font-mono">H363 · M17 · L11</span>
                  </div>
                </div>

                {/* Hotspot 2: Command Center 4 Stat Cards */}
                <div className="flex justify-center">
                  <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 text-xs">
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Sub-second Live Count Metrics (Total, Open, Resolved, Unassigned)</span>
                  </div>
                </div>

                {/* Hotspot 3: Quick Actions & On-Call */}
                <div className="flex justify-end">
                  <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white border border-blue-500/40 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="font-bold">Who&apos;s On-Call & Multi-Tier Escalation Rotations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Exact Authentic Slack War Room */}
        {activeTab === "slack" && (
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#1a1d21] shadow-2xl overflow-hidden flex flex-col font-sans">
            {/* Slack Channel Header */}
            <div className="h-14 border-b border-[#2c3136] bg-[#1a1d21] px-4 flex items-center justify-between">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold text-xs">☆</span>
                  <span className="font-extrabold text-white text-sm"># inc-y5hh7q-opsknight</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                  <span>🚨 High-EC2-CPUUtilization | HIGH |</span>
                  <span className="text-sky-400 hover:underline cursor-pointer">https://opssentinal.com/incidents/...</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="px-2.5 py-1 rounded bg-[#222529] border border-white/10 text-white font-medium">
                  Invite teammates
                </span>
              </div>
            </div>

            {/* Slack Message Feed */}
            <div className="p-6 space-y-4 bg-[#1a1d21] text-xs leading-relaxed">
              {/* Bot Msg */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z"/>
                  </svg>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-[13px]">OpsSentinal</span>
                      <span className="px-1 py-0.2 bg-[#2c3136] text-[9px] text-slate-400 font-bold rounded">APP</span>
                      <span className="text-slate-500 text-[11px]">14:30</span>
                    </div>
                    <h4 className="font-bold text-white text-sm mt-1">
                      🚨 Incident Triggered: High-EC2-CPUUtilization
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">OpsKnight | 17 August at 14:30</p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-xs max-w-md">
                    <div>
                      <span className="text-slate-400 block font-medium">Service:</span>
                      <span className="text-white font-semibold">OpsKnight</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Status:</span>
                      <span className="text-red-400 font-bold">OPEN</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Urgency:</span>
                      <span className="text-white font-semibold">HIGH</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Assignee:</span>
                      <span className="text-white font-semibold">Unassigned</span>
                    </div>
                  </div>

                  {/* 1-Click Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button className="px-3 py-1.5 bg-[#222529] hover:bg-[#2c3136] border border-emerald-500/60 text-emerald-400 rounded-md text-xs font-bold flex items-center gap-1.5">
                      <span>👀</span>
                      <span>Acknowledge</span>
                    </button>
                    <button className="px-3 py-1.5 bg-[#222529] hover:bg-[#2c3136] border border-white/20 text-white rounded-md text-xs font-bold flex items-center gap-1.5">
                      <span>🙋</span>
                      <span>Assign to Me</span>
                    </button>
                    <button className="px-3 py-1.5 bg-[#222529] hover:bg-[#2c3136] border border-emerald-500/60 text-emerald-400 rounded-md text-xs font-bold flex items-center gap-1.5">
                      <span>✅</span>
                      <span>Resolve</span>
                    </button>
                  </div>

                  {/* Jitsi Box */}
                  <div className="border-l-4 border-l-sky-500 pl-3 py-1.5 bg-[#222529]/60 rounded-r-lg max-w-lg space-y-1">
                    <div className="font-bold text-sky-400 text-xs">Jitsi Meet Video Bridge</div>
                    <div className="text-[11px] text-slate-400">
                      Join WebRTC video conference: https://meet.jit.si/opsknight-inc-u5y5hh7q
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
