"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Activity, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  BarChart3, 
  Check, 
  Copy, 
  Terminal, 
  ArrowRight,
  Zap,
  Lock,
  DollarSign,
  Layers,
  Sparkles,
  Video
} from "lucide-react";

interface TourTab {
  id: string;
  name: string;
  shortTitle: string;
  badge: string;
  icon: React.ElementType;
  image: string;
  url: string;
  heading: string;
  description: string;
  highlights: string[];
  hotspots: {
    title: string;
    description: string;
    position: string;
  }[];
}

const TOUR_TABS: TourTab[] = [
  {
    id: "command-center",
    name: "Command Center",
    shortTitle: "Triage & Beacons",
    badge: "Live Telemetry",
    icon: Activity,
    image: "/dashboard-command-center.png",
    url: "https://app.opsknight.com/dashboard",
    heading: "Sub-second incident triage with real-time telemetry",
    description: "Ingest alerts from 24+ monitoring tools with zero parse latency. Deduplicate noise, track active P1/P2 crises via live operational beacons, and coordinate response with instant 1-click triage actions.",
    highlights: [
      "Live Operational Status Beacon with priority indicators (H/M/L)",
      "Executive KPI metrics: Total Incidents, Open Alerts, MTTA, and MTTR",
      "Dynamic filtering by service, urgency, team, and assignee",
      "Instant incident creation and 1-click responder assignment"
    ],
    hotspots: [
      {
        title: "Red Alert Beacon",
        description: "Pulsing real-time beacon tracking active crisis counts",
        position: "top-4 left-6"
      },
      {
        title: "Live KPI Matrix",
        description: "Sub-second count cards (Total, Open, Resolved, Unassigned)",
        position: "top-20 left-1/4"
      },
      {
        title: "Who's On-Call Widget",
        description: "Active escalation shift indicators with real-time status",
        position: "top-28 right-6"
      }
    ]
  },
  {
    id: "schedules",
    name: "On-Call Schedules",
    shortTitle: "Rotations & Shifts",
    badge: "Timezone-Aware",
    icon: Calendar,
    image: "/schedule-main.png",
    url: "https://app.opsknight.com/schedules",
    heading: "Multi-layer rotation schedules that prevent alert fatigue",
    description: "Build flexible daily, weekly, or custom on-call rotations with automated timezone conversion. Schedule temporary shift overrides and swaps in seconds with calendar sync.",
    highlights: [
      "Layered primary, secondary, and shadow rotation tiers",
      "One-click temporary shift overrides and coverage swaps",
      "Automatic timezone conversion across global engineering teams",
      "iCal and Google Calendar sync for personal rotation tracking"
    ],
    hotspots: [
      {
        title: "Multi-Tier Calendar",
        description: "Visual timeline showing active shifts and upcoming rotations",
        position: "top-6 left-12"
      },
      {
        title: "Shift Overrides",
        description: "1-click temporary swap scheduler without breaking rotations",
        position: "bottom-12 right-10"
      }
    ]
  },
  {
    id: "slack-warroom",
    name: "Slack War Rooms",
    shortTitle: "ChatOps & Video",
    badge: "Bi-Directional Sync",
    icon: MessageSquare,
    image: "/dashboard-command-center.png",
    url: "https://app.opsknight.com/integrations/slack",
    heading: "Automated Slack channels & Jitsi WebRTC video bridges",
    description: "Every critical incident automatically provisions a dedicated Slack channel with the on-call team, attaches a WebRTC video meeting bridge, and enables full 1-click triage via interactive buttons.",
    highlights: [
      "Auto-provisions dedicated incident channels (#inc-<service>-<id>)",
      "Interactive 1-click Acknowledge, Assign to Me, and Resolve buttons",
      "Built-in WebRTC video conference bridge for instant triage sync",
      "Bi-directional timeline sync between Slack and the Command Center"
    ],
    hotspots: [
      {
        title: "Dedicated Channel",
        description: "Auto-created with on-call team and key stakeholders",
        position: "top-4 left-6"
      },
      {
        title: "1-Click Triage",
        description: "Acknowledge and Resolve directly from Slack message cards",
        position: "bottom-16 left-1/3"
      }
    ]
  },
  {
    id: "escalation-policies",
    name: "Escalation Policies",
    shortTitle: "Multi-Tier Routing",
    badge: "Automated Dispatch",
    icon: ShieldCheck,
    image: "/escalation-policies.png",
    url: "https://app.opsknight.com/escalation-policies",
    heading: "Multi-tier escalation rules with urgent SMS & Push dispatch",
    description: "Ensure no incident goes unacknowledged. Configure tiered escalation steps with custom delay timers, multi-user paging, and automatic fallbacks to backup engineers and team leads.",
    highlights: [
      "Multi-step escalation delay rules (Immediately, +5m, +15m, +30m)",
      "Multi-channel urgent dispatch (SMS, Push, Slack, Email, Webhooks)",
      "Round-robin responder paging within on-call teams",
      "Automatic failover to backup secondary schedules"
    ],
    hotspots: [
      {
        title: "Step 1: Primary SRE",
        description: "Immediate high-urgency push & SMS notification",
        position: "top-10 left-10"
      },
      {
        title: "Step 2: Fallback Lead",
        description: "Escalates automatically if unacknowledged within 10 mins",
        position: "top-28 left-10"
      }
    ]
  },
  {
    id: "service-catalog",
    name: "Service Catalog",
    shortTitle: "SLAs & Ownership",
    badge: "Health Matrix",
    icon: BarChart3,
    image: "/service-directory.png",
    url: "https://app.opsknight.com/services",
    heading: "Microservice directory, health tracking, and SLA monitoring",
    description: "Track service health, ownership, tier definitions, and active incident backlogs across your microservice architecture. Map upstream and downstream dependencies cleanly.",
    highlights: [
      "Tier classification (Tier 1 Critical, Tier 2 High, Tier 3 Internal)",
      "Service health status indicators (Operational, Degraded, Major Outage)",
      "Direct integration with escalation policies and rotation teams",
      "30-day incident frequency and MTTR telemetry per service"
    ],
    hotspots: [
      {
        title: "Service Health Status",
        description: "Real-time health indicator tied directly to active incidents",
        position: "top-12 right-12"
      },
      {
        title: "Tier Classification",
        description: "Service criticality tag determining escalation speed",
        position: "bottom-16 left-8"
      }
    ]
  }
];

export function ProductTour() {
  const [activeTab, setActiveTab] = useState<string>("command-center");
  const [copied, setCopied] = useState<boolean>(false);

  // Interactive Slack State
  const [slackStatus, setSlackStatus] = useState<"OPEN" | "ACKNOWLEDGED" | "RESOLVED">("OPEN");
  const [slackAssignee, setSlackAssignee] = useState<string>("Unassigned");
  const [slackToast, setSlackToast] = useState<string | null>(null);

  const showSlackToast = (msg: string) => {
    setSlackToast(msg);
    setTimeout(() => setSlackToast(null), 3000);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTab = TOUR_TABS.find((t) => t.id === activeTab) || TOUR_TABS[0];

  return (
    <section id="product-tour" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Product Tour
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Command Center Architecture
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Experience the real, production-ready interface of OpsKnight. Explore live triage, timezone-aware rotations, automated escalation rules, and Slack war rooms.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar py-2">
          <div className="p-1.5 bg-slate-900/90 border border-white/10 rounded-2xl flex flex-wrap items-center justify-center gap-1.5 shadow-2xl">
            {TOUR_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/25 scale-[1.02]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Product Showcase Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Top Browser Bar */}
          <div className="h-12 bg-slate-950 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
            </div>

            <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-300 text-[11px] font-mono">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>{currentTab.url}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Production 100% Crisp 2x Retina</span>
            </div>
          </div>

          {/* Showcase Body (Split View: Visual on Left/Top, Feature Highlights on Right/Bottom) */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Canvas (8 Cols) */}
            <div className="lg:col-span-8 p-4 sm:p-6 bg-[#070a12] border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "slack-warroom" ? (
                  /* Dedicated Interactive Slack War Room Interface */
                  <motion.div
                    key="slack-warroom-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#1a1d21] shadow-2xl text-slate-200 flex flex-col font-sans"
                  >
                    {/* Slack Channel Header */}
                    <div className="h-14 border-b border-[#2c3136] bg-[#1a1d21] px-4 flex items-center justify-between">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-bold text-xs">☆</span>
                          <span className="font-extrabold text-white text-sm"># inc-payment-gateway-492</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                          <span>🚨 Payment-Gateway Latency Spike | HIGH |</span>
                          <span className="text-sky-400 hover:underline cursor-pointer">https://opsknight.com/incidents/492</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#222529] border border-white/5 text-xs text-slate-300">
                          <Video className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="hidden sm:inline font-medium">WebRTC Video Bridge</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1"></span>
                        </div>
                      </div>
                    </div>

                    {/* Slack Messages Area */}
                    <div className="p-4 sm:p-5 space-y-4 max-h-[420px] overflow-y-auto">
                      
                      {/* Bot Incident Card */}
                      <div className="flex items-start gap-3 bg-[#222529] p-4 rounded-xl border-l-4 border-red-500 border border-white/5 shadow-md">
                        <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          🛡️
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">OpsKnight Incident Bot <span className="bg-[#1164A3] text-white text-[9px] px-1.5 py-0.5 rounded ml-1">APP</span></span>
                            <span className="text-[10px] text-slate-400 font-mono">Just now</span>
                          </div>

                          <p className="text-sm font-semibold text-white">
                            🚨 [P1-CRITICAL] Payment Gateway Latency Spike &gt; 3500ms
                          </p>

                          <div className="grid grid-cols-2 gap-2 text-xs bg-[#1a1d21] p-2.5 rounded-lg border border-white/5">
                            <div><span className="text-slate-400">Urgency:</span> <span className="text-red-400 font-bold">HIGH (P1)</span></div>
                            <div><span className="text-slate-400">Service:</span> <span className="text-slate-200 font-medium">API Gateway</span></div>
                            <div><span className="text-slate-400">Status:</span> <span className={`font-bold ${slackStatus === 'RESOLVED' ? 'text-emerald-400' : slackStatus === 'ACKNOWLEDGED' ? 'text-amber-400' : 'text-red-400'}`}>{slackStatus}</span></div>
                            <div><span className="text-slate-400">Assignee:</span> <span className="text-sky-400 font-medium">{slackAssignee}</span></div>
                          </div>

                          {/* 1-Click Action Buttons */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <button
                              onClick={() => {
                                setSlackStatus("ACKNOWLEDGED");
                                setSlackAssignee("Alex Vance (You)");
                                showSlackToast("Acknowledge synced to OpsKnight Command Center.");
                              }}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                                slackStatus === "ACKNOWLEDGED" 
                                  ? "bg-amber-500 text-black" 
                                  : "bg-[#2c3136] text-white hover:bg-[#383f45]"
                              }`}
                            >
                              ✓ Acknowledge
                            </button>

                            <button
                              onClick={() => {
                                setSlackAssignee("Alex Vance (You)");
                                showSlackToast("Assigned incident commander to Alex Vance.");
                              }}
                              className="px-3 py-1.5 rounded-md text-xs font-bold bg-[#2c3136] text-white hover:bg-[#383f45] transition-all"
                            >
                              👤 Assign to Me
                            </button>

                            <button
                              onClick={() => {
                                setSlackStatus("RESOLVED");
                                showSlackToast("Incident RESOLVED in OpsKnight & War Room closed.");
                              }}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                                slackStatus === "RESOLVED" 
                                  ? "bg-emerald-500 text-black" 
                                  : "bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white"
                              }`}
                            >
                              Resolve Incident
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="flex items-start gap-3 pl-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          AV
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">Alex Vance</span>
                            <span className="text-[10px] text-slate-500">12:04 AM</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            Investigating connection pool exhaustion on primary DB cluster. Read replicas are healthy.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 pl-2">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          SC
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">Sarah Chen</span>
                            <span className="text-[10px] text-slate-500">12:05 AM</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            Drain script executed. Traffic rerouted to standby cluster. Latency normalizing.
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Interactive Toast */}
                    {slackToast && (
                      <div className="bg-emerald-500 text-black text-xs font-bold px-4 py-2 text-center transition-all">
                        {slackToast}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* High-Resolution Screenshot Canvas with Hotspots */
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
                  >
                    <Image
                      src={currentTab.image}
                      alt={currentTab.heading}
                      width={1920}
                      height={1080}
                      priority
                      className="w-full h-auto rounded-2xl object-cover"
                    />

                    {/* Hotspots Overlay */}
                    <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                      <div className="flex justify-start">
                        <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md text-white border border-red-500/40 px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          <span className="font-bold">{currentTab.hotspots[0]?.title}</span>
                        </div>
                      </div>

                      {currentTab.hotspots[1] && (
                        <div className="flex justify-end">
                          <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md text-white border border-white/20 px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            <span className="font-semibold">{currentTab.hotspots[1]?.title}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feature Highlights & Explanation (4 Cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 bg-slate-900/60 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                  {currentTab.badge}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {currentTab.heading}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentTab.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Capabilities
                  </span>
                  {currentTab.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick-Start Box */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Ready to deploy?</span>
                  <Link
                    href="/docs"
                    className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    View Docs <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-[11px] font-mono text-sky-400 truncate">
                      docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCommand}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Core Value Indicators Below Showcase */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col justify-between">
            <Zap className="w-5 h-5 text-amber-400 mb-3" />
            <div className="text-lg font-bold text-white">&lt; 15ms Ingest Latency</div>
            <p className="text-xs text-slate-400 mt-1">Real-time SSE event pipeline with zero page reload latency.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col justify-between">
            <Lock className="w-5 h-5 text-emerald-400 mb-3" />
            <div className="text-lg font-bold text-white">100% Data Sovereignty</div>
            <p className="text-xs text-slate-400 mt-1">Deploy on Docker or Kubernetes inside your private VPC.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col justify-between">
            <DollarSign className="w-5 h-5 text-blue-400 mb-3" />
            <div className="text-lg font-bold text-white">$0 Per-Seat Tax</div>
            <p className="text-xs text-slate-400 mt-1">Unlimited responders, schedules, services, and alerts.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col justify-between">
            <Layers className="w-5 h-5 text-purple-400 mb-3" />
            <div className="text-lg font-bold text-white">Drop-in PagerDuty API</div>
            <p className="text-xs text-slate-400 mt-1">Migrate in 30 seconds using existing PagerDuty webhooks.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
