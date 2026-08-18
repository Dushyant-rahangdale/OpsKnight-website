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
  Sparkles
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
    shortTitle: "Incident Triage",
    badge: "Real-Time Triage",
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
    image: "/schedule-detail.png",
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
    image: "/dashboard-command-center.png", // Will render the Slack ChatOps component below or image
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
      "Tiered escalation steps with custom acknowledgement delay timers",
      "Multi-channel paging: High-Priority SMS, Mobile Override Push, and Slack",
      "Service and severity-based routing rules",
      "Automatic escalation halt upon responder acknowledgement"
    ],
    hotspots: [
      {
        title: "Tier 1 → Tier 2 Routing",
        description: "Configurable delay timers before paging backup engineers",
        position: "top-10 left-8"
      },
      {
        title: "Multi-Channel Targets",
        description: "SMS, mobile critical push, and Slack notifications",
        position: "bottom-16 right-12"
      }
    ]
  },
  {
    id: "service-catalog",
    name: "Services & Postmortems",
    shortTitle: "SLAs & Retrospectives",
    badge: "AI-Powered",
    icon: BarChart3,
    image: "/service-directory.png",
    url: "https://app.opsknight.com/services",
    heading: "Service health dependencies & automated AI postmortems",
    description: "Maintain a clear service catalog with dependency mapping and SLA/SLO tracking. When an incident resolves, OpsKnight automatically drafts a retrospective timeline and postmortem.",
    highlights: [
      "Service ownership catalog with dependency health mapping",
      "Real-time SLA and SLO adherence metrics (MTTA and MTTR)",
      "Automated AI postmortem drafting from incident event logs",
      "Audit-ready immutable incident timeline and root cause records"
    ],
    hotspots: [
      {
        title: "Service Dependency Graph",
        description: "Map upstream and downstream services to isolate blast radius",
        position: "top-8 left-10"
      },
      {
        title: "SLO Adherence",
        description: "Track MTTA and MTTR trends against team performance goals",
        position: "bottom-14 right-10"
      }
    ]
  }
];

export function ProductTour() {
  const [activeTab, setActiveTab] = useState<string>(TOUR_TABS[0].id);
  const [copiedDocker, setCopiedDocker] = useState<boolean>(false);

  const currentTab = TOUR_TABS.find((t) => t.id === activeTab) || TOUR_TABS[0];

  const handleCopyDocker = () => {
    navigator.clipboard.writeText("docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest");
    setCopiedDocker(true);
    setTimeout(() => setCopiedDocker(false), 2000);
  };

  return (
    <section id="product-tour" className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden font-sans">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            Interactive Product Tour
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            A unified platform for your entire incident lifecycle.
          </h2>
          <p className="text-base md:text-lg text-slate-400 leading-relaxed">
            Replace fragmented tools with a single self-hosted command center. From real-time alert triage to on-call scheduling, Slack war rooms, and automated postmortems.
          </p>
        </div>

        {/* Tab Switcher Bar */}
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
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/docs"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore {currentTab.name} Documentation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Core Value Pillars Bar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <DollarSign className="w-4 h-4" />
              <span>$0 Per-Seat Tax</span>
            </div>
            <div className="text-slate-400 text-[11px] mt-1">Unlimited responders and team members under AGPL-3.0.</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>&lt; 220ms Automation</span>
            </div>
            <div className="text-slate-400 text-[11px] mt-1">Sub-second webhook ingestion, policy routing, and dispatch.</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <Lock className="w-4 h-4" />
              <span>100% Data Sovereignty</span>
            </div>
            <div className="text-slate-400 text-[11px] mt-1">Runs strictly in your private VPC with zero data egress.</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Layers className="w-4 h-4" />
              <span>24+ Native Connectors</span>
            </div>
            <div className="text-slate-400 text-[11px] mt-1">Datadog, Prometheus, AWS, Sentry, Grafana, and Slack.</div>
          </div>
        </div>

        {/* 1-Click Terminal Quickstart Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#090d16] border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Run OpsKnight in 5 minutes via Docker:</div>
              <code className="text-sky-400 font-mono text-xs mt-0.5 block">
                docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest
              </code>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyDocker}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedDocker ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedDocker ? "Copied!" : "Copy Command"}</span>
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
