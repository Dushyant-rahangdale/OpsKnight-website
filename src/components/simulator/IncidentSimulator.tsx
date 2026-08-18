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
  Users
} from "lucide-react";

interface PipelineStep {
  time: string;
  type: "INGEST" | "ROUTE" | "PAGE" | "WARROOM" | "ACK" | "RESOLVE";
  label: string;
  detail: string;
  status: "pending" | "running" | "completed";
  badgeColor: string;
}

const INITIAL_PIPELINE: PipelineStep[] = [
  {
    time: "00:00.042",
    type: "INGEST",
    label: "Webhook Alert Ingestion",
    detail: "HighLatencyAPI: 5xx error rate spiking on /api/v1/checkout via GitHub Webhook",
    status: "completed",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    time: "00:00.089",
    type: "ROUTE",
    label: "Escalation Policy Evaluation",
    detail: "Matched 'Tier-1 Critical Services' → Assigned on-call primary Alex Vance",
    status: "completed",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    time: "00:00.124",
    type: "PAGE",
    label: "Multi-Channel Alert Dispatch",
    detail: "High-Priority SMS & Mobile Override Push dispatched to Alex Vance (+1 555-019-2834)",
    status: "completed",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  {
    time: "00:00.180",
    type: "WARROOM",
    label: "Slack War Room & Jitsi Bridge",
    detail: "Provisioned #inc-384-api-gateway + WebRTC bridge https://meet.jit.si/opsknight-384",
    status: "completed",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    time: "00:01.420",
    type: "ACK",
    label: "Commander Acknowledged",
    detail: "Alex Vance acknowledged via 1-click Slack button. P1 Ack SLA met in 1.4s.",
    status: "completed",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  }
];

export function IncidentSimulator() {
  const [activeTab, setActiveTab] = useState<"console" | "command-center" | "slack">("console");
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>(INITIAL_PIPELINE);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(100);
  const [liveClock, setLiveClock] = useState<string>("21:10:39");

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setLiveClock(d.toTimeString().split(" ")[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimProgress(0);
    setPipelineSteps([]);

    const steps = [
      {
        time: "00:00.038",
        type: "INGEST" as const,
        label: "Webhook Alert Ingestion",
        detail: "PostgresConnectionPoolExhausted: DB latency > 1,400ms via Datadog Alert",
        status: "completed" as const,
        badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
      },
      {
        time: "00:00.075",
        type: "ROUTE" as const,
        label: "Escalation Policy Evaluation",
        detail: "Policy 'Database Infra Tier-1' → Primary On-Call: Alex Vance",
        status: "completed" as const,
        badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
      },
      {
        time: "00:00.110",
        type: "PAGE" as const,
        label: "Urgent SMS & Push Dispatch",
        detail: "High-priority SMS & mobile critical alert push notification delivered",
        status: "completed" as const,
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
      },
      {
        time: "00:00.165",
        type: "WARROOM" as const,
        label: "Slack War Room Auto-Provisioned",
        detail: "Channel #inc-postgres-pool spun up with SRE team & Jitsi WebRTC video bridge",
        status: "completed" as const,
        badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
      },
      {
        time: "00:01.120",
        type: "ACK" as const,
        label: "Alert Acknowledged & Triage Underway",
        detail: "Responder Alex Vance claimed commander. Escalation halted, status page updated.",
        status: "completed" as const,
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setPipelineSteps(prev => [...prev, step]);
        setSimProgress(((idx + 1) / steps.length) * 100);
        if (idx === steps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <section id="interactive-demo" className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Interactive Incident Engine & Command Center
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Sub-second triage. From alert to war room.
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            See how OpsKnight orchestrates multi-tier escalations, automatic Slack channels, and live command center metrics with zero lag.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab("console")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                activeTab === "console"
                  ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/25"
                  : "bg-slate-900 text-slate-400 hover:text-white border-white/10 hover:bg-slate-800"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>⚡ Live Incident Pipeline (Sub-Second Engine)</span>
            </button>

            <button
              onClick={() => setActiveTab("command-center")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
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
          <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#0b0f19] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs">
            {/* Console Window Header */}
            <div className="h-11 bg-[#111726] px-4 flex items-center justify-between border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
                </div>
                <span className="text-slate-400 font-bold font-sans text-xs">
                  OpsKnight High-Velocity Incident Orchestrator v1.3
                </span>
              </div>

              <div className="flex items-center gap-3 font-sans">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{liveClock} UTC</span>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shadow-red-500/25 disabled:opacity-50 cursor-pointer"
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Simulating...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>🚨 Simulate Sev-1 Outage</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Pipeline Telemetry Bar */}
            <div className="px-6 py-3 bg-[#0d1424] border-b border-white/5 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Latency Overhead</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">&lt; 120ms</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Paging Engine</span>
                  <span className="text-white font-mono font-bold text-sm">SMS + Mobile Push</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">ChatOps Sync</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">Bi-Directional SSE</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${simProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Event Timeline List */}
            <div className="p-6 space-y-3 min-h-[360px] bg-[#070a12]">
              {pipelineSteps.length === 0 && isSimulating && (
                <div className="py-12 text-center text-slate-500">
                  <Flame className="w-8 h-8 text-red-500 animate-bounce mx-auto mb-2" />
                  <span>Ingesting webhook payload from monitoring cluster...</span>
                </div>
              )}

              <AnimatePresence>
                {pipelineSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="flex items-start md:items-center gap-3">
                      <span className="text-slate-500 font-mono text-[11px] bg-slate-950 px-2 py-1 rounded border border-white/5">
                        +{step.time}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${step.badgeColor}`}>
                        {step.type}
                      </span>
                      <div>
                        <div className="font-bold text-white font-sans text-xs flex items-center gap-2">
                          <span>{step.label}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                          {step.detail}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono self-end md:self-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>SUCCESS (200 OK)</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
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
