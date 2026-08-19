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
  Video,
  UserPlus,
  Headphones,
  Bell,
  Search,
  FileText,
  Lock
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
    heading: "Automated Slack war rooms with Jitsi, Google Meet & Zoom bridges",
    description: "Every critical incident automatically provisions a dedicated Slack channel with the on-call responders, attaches an instant WebRTC, Google Meet, or Zoom bridge, and enables full 1-click triage via interactive buttons.",
    highlights: [
      "Auto-provisions dedicated incident channels (#inc-<service>-<id>)",
      "Interactive 1-click Acknowledge, Assign to Me, and Resolve buttons",
      "Multi-provider video bridges: Jitsi Meet (WebRTC), Google Meet, & Zoom",
      "Bi-directional timeline sync & postmortem retrospective compilation"
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
    navigator.clipboard.writeText("curl -sL https://raw.githubusercontent.com/opsknight-labs/OpsKnight/main/docker-compose.yml > docker-compose.yml && docker compose up -d");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTab = TOUR_TABS.find((t) => t.id === activeTab) || TOUR_TABS[0];

  return (
    <section id="product-tour" className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Product tour
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl mb-4">
            The actual interface.
          </h2>
          <p className="text-base leading-relaxed text-[#4b5563]">
            Screenshots of the live product. The Slack view is interactive.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar py-2">
          <div className="p-1.5 bg-slate-100 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-center gap-1.5 shadow-sm">
            {TOUR_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Product Showcase Card */}
        <div className="rounded-[14px] bg-slate-50 border border-slate-200 overflow-hidden">
          
          {/* Top Browser Bar */}
          <div className="h-12 bg-slate-950 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
            </div>

            <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>{currentTab.url}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
              <span>Production UI</span>
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
                    {/* Top Slack Window Header */}
                    <div className="h-14 border-b border-[#2c3136] bg-[#1a1d21] px-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[#ABABAD] text-sm font-bold">☆</span>
                        <span className="font-extrabold text-white text-[15px]"># inc-y5hh7q-opsknight</span>
                        <div className="hidden md:flex items-center gap-1.5 text-[12px] text-[#ABABAD] truncate ml-2">
                          <span className="text-red-500">🚨</span>
                          <span>High-EC2-CPUUtilization | HIGH |</span>
                          <span className="text-[#1D9BD1] hover:underline truncate">https://opsknight.com/incidents/cmsx07k9q00w4cq1iu5y5hh7q</span>
                        </div>
                      </div>

                      {/* Right Corner Slack Controls: Invite teammates, Headphones, Bell, Search */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#222529] hover:bg-[#2c3136] border border-[#383F45] text-xs font-semibold text-[#D1D2D3] transition-colors">
                          <UserPlus className="w-3.5 h-3.5 text-[#ABABAD]" />
                          <span className="hidden sm:inline">Invite teammates</span>
                        </button>
                        <div className="flex items-center bg-[#222529] border border-[#383F45] rounded-[6px] px-2 py-1 text-xs text-[#ABABAD] gap-1">
                          <Headphones className="w-3.5 h-3.5" />
                          <span className="text-[10px]">▾</span>
                        </div>
                        <button className="p-1.5 rounded-[6px] hover:bg-[#2c3136] text-[#ABABAD]">
                          <Bell className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-[6px] hover:bg-[#2c3136] text-[#ABABAD]">
                          <Search className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sub-Tabs: Messages, Add canvas, + */}
                    <div className="flex items-center gap-6 px-4 bg-[#1a1d21] border-b border-[#2c3136] text-xs font-medium">
                      <div className="py-2 text-white font-bold border-b-2 border-white flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-white" />
                        <span>Messages</span>
                      </div>
                      <div className="py-2 text-[#ABABAD] hover:text-white flex items-center gap-1.5 cursor-pointer">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Add canvas</span>
                      </div>
                      <div className="py-2 text-[#ABABAD] hover:text-white cursor-pointer font-bold text-sm">
                        <span>+</span>
                      </div>
                    </div>

                    {/* Slack Messages Feed */}
                    <div className="p-4 sm:p-5 space-y-4 max-h-[460px] overflow-y-auto">
                      
                      {/* Date Divider: Yesterday */}
                      <div className="relative flex items-center justify-center my-1">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#2c3136]" />
                        </div>
                        <div className="relative px-3 py-0.5 rounded-full bg-[#222529] border border-[#383F45] text-[11px] font-bold text-[#ABABAD]">
                          Yesterday ▾
                        </div>
                      </div>

                      {/* Message 1: Bot Joined */}
                      <div className="flex items-start gap-3 pl-1">
                        <div className="w-9 h-9 rounded-[6px] bg-red-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          <Image src="/logo-mark.png" alt="OpsKnight" width={22} height={22} className="w-5 h-5 object-contain" />
                        </div>
                        <div className="text-[13px] leading-snug">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[#E8E8E8]">OpsKnight</span>
                            <span className="bg-[#1164A3] text-white text-[9px] font-bold px-1 py-0.2 rounded-[3px] leading-none">APP</span>
                            <span className="text-[11px] text-[#ABABAD]">14:30</span>
                          </div>
                          <p className="text-[#D1D2D3] mt-0.5">joined #inc-y5hh7q-opsknight.</p>
                        </div>
                      </div>

                      {/* Message 2: Set Channel Topic */}
                      <div className="flex items-start gap-3 pl-1">
                        <div className="w-9 h-9 rounded-[6px] bg-red-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          <Image src="/logo-mark.png" alt="OpsKnight" width={22} height={22} className="w-5 h-5 object-contain" />
                        </div>
                        <div className="text-[13px] leading-snug">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[#E8E8E8]">OpsKnight</span>
                            <span className="bg-[#1164A3] text-white text-[9px] font-bold px-1 py-0.2 rounded-[3px] leading-none">APP</span>
                            <span className="text-[11px] text-[#ABABAD]">14:30</span>
                          </div>
                          <p className="text-[#D1D2D3] mt-0.5">
                            set the channel topic: 🚨 High-EC2-CPUUtilization | HIGH | <span className="text-[#1D9BD1]">https://opsknight.com/incidents/cmsx07k9q00w4cq1iu5y5hh7q</span>
                          </p>
                        </div>
                      </div>

                      {/* Red Horizontal "New" Divider */}
                      <div className="relative flex items-center justify-end my-1">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#E01E5A]/80" />
                        </div>
                        <div className="relative pl-3 bg-[#1a1d21] text-[11px] font-bold text-[#E01E5A]">
                          New
                        </div>
                      </div>

                      {/* Message 3: Member Added */}
                      <div className="flex items-start gap-3 pl-1">
                        <div className="w-9 h-9 rounded-[6px] bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          DR
                        </div>
                        <div className="text-[13px] leading-snug">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[#E8E8E8]">Dushyant Rahangdale</span>
                            <span className="text-xs">🔭</span>
                            <span className="text-[11px] text-[#ABABAD]">14:30</span>
                          </div>
                          <p className="text-[#D1D2D3] mt-0.5">has been added to #inc-y5hh7q-opsknight by OpsKnight.</p>
                        </div>
                      </div>

                      {/* Message 4: Bot Incident Card */}
                      <div className="flex items-start gap-3 pl-1">
                        <div className="w-9 h-9 rounded-[6px] bg-red-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          <Image src="/logo-mark.png" alt="OpsKnight" width={22} height={22} className="w-5 h-5 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2 text-[13px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[#E8E8E8]">OpsKnight</span>
                            <span className="bg-[#1164A3] text-white text-[9px] font-bold px-1 py-0.2 rounded-[3px] leading-none">APP</span>
                            <span className="text-[11px] text-[#ABABAD]">14:30</span>
                          </div>

                          <h4 className="text-[14px] font-bold text-white">
                            🚨 Incident Triggered: High-EC2-CPUUtilization
                          </h4>
                          <div className="text-[11px] text-[#ABABAD] font-mono">
                            OpsKnight | 17 August at 14:30
                          </div>

                          {/* 2x2 Field Grid */}
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs pt-1">
                            <div>
                              <span className="text-[#ABABAD] block text-[11px]">Service:</span>
                              <span className="text-white font-semibold">OpsKnight</span>
                            </div>
                            <div>
                              <span className="text-[#ABABAD] block text-[11px]">Status:</span>
                              <span className={`font-bold ${slackStatus === 'RESOLVED' ? 'text-emerald-400' : slackStatus === 'ACKNOWLEDGED' ? 'text-amber-400' : 'text-red-400'}`}>
                                {slackStatus}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#ABABAD] block text-[11px]">Urgency:</span>
                              <span className="text-white font-semibold">HIGH</span>
                            </div>
                            <div>
                              <span className="text-[#ABABAD] block text-[11px]">Assignee:</span>
                              <span className="text-white font-semibold">{slackAssignee}</span>
                            </div>
                          </div>

                          {/* Video Bridge Note */}
                          <div className="text-xs pt-1">
                            <span className="text-[#ABABAD] block text-[11px]">Note:</span>
                            <div className="text-[#D1D2D3] flex items-center gap-1.5 mt-0.5">
                              <span>📹 Video Bridge:</span>
                              <span className="text-[#1D9BD1] hover:underline font-mono text-[12px]">
                                https://meet.jit.si/opsknight-inc-u5y5hh7q
                              </span>
                            </div>
                          </div>

                          {/* 4 Slack Action Buttons */}
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <button
                              onClick={() => {
                                setSlackStatus("ACKNOWLEDGED");
                                setSlackAssignee("Dushyant Rahangdale (You)");
                                showSlackToast("👀 Acknowledged in OpsKnight Command Center.");
                              }}
                              className={`px-3 py-1.5 rounded-[4px] text-xs font-bold transition-all border ${
                                slackStatus === "ACKNOWLEDGED"
                                  ? "bg-[#007A5A] text-white border-[#007A5A]"
                                  : "bg-[#222529] hover:bg-[#2C3136] text-white border-[#383F45]"
                              }`}
                            >
                              👀 Acknowledge
                            </button>

                            <button
                              onClick={() => {
                                setSlackAssignee("Dushyant Rahangdale (You)");
                                showSlackToast("🙋 Assigned commander to Dushyant Rahangdale.");
                              }}
                              className="px-3 py-1.5 rounded-[4px] text-xs font-bold bg-[#222529] hover:bg-[#2C3136] text-white border border-[#383F45] transition-all"
                            >
                              🙋 Assign to Me
                            </button>

                            <button
                              onClick={() => {
                                setSlackStatus("RESOLVED");
                                showSlackToast("✅ Incident RESOLVED in OpsKnight & War Room closed.");
                              }}
                              className={`px-3 py-1.5 rounded-[4px] text-xs font-bold transition-all border ${
                                slackStatus === "RESOLVED"
                                  ? "bg-[#007A5A] text-white border-[#007A5A]"
                                  : "bg-[#007A5A]/20 hover:bg-[#007A5A] text-emerald-400 hover:text-white border-[#007A5A]/50"
                              }`}
                            >
                              ✅ Resolve
                            </button>

                            <Link
                              href="https://opsknight.com"
                              target="_blank"
                              className="px-3 py-1.5 rounded-[4px] text-xs font-bold bg-[#222529] hover:bg-[#2C3136] text-[#D1D2D3] hover:text-white border border-[#383F45] transition-all flex items-center gap-1"
                            >
                              View Details ↗
                            </Link>
                          </div>

                          {/* Video Bridge Unfurl Box */}
                          <div className="p-3 rounded-[6px] bg-[#222529] border-l-2 border-[#1D9BD1] border border-white/5 space-y-1 text-xs mt-3">
                            <div className="flex items-center gap-1.5 text-[11px] text-[#ABABAD]">
                              <Video className="w-3.5 h-3.5 text-[#1D9BD1]" />
                              <span className="font-bold">meet.jit.si</span>
                            </div>
                            <div className="font-bold text-[#1D9BD1] text-[13px]">
                              Jitsi Meet
                            </div>
                            <p className="text-[11px] text-[#D1D2D3]">
                              Join a WebRTC video conference powered by the Jitsi Videobridge
                            </p>
                          </div>

                          {/* Welcome to War Room Message */}
                          <div className="pt-2 text-xs text-[#D1D2D3] space-y-1.5">
                            <div className="font-bold text-white flex items-center gap-1.5 text-[13px]">
                              <span>👋</span> Welcome to your Incident War Room!
                            </div>
                            <p className="text-[#ABABAD] text-[12px]">
                              This channel was automatically provisioned to coordinate resolution for <strong>High-EC2-CPUUtilization</strong>.
                            </p>
                            <div className="pt-1 text-[11px] text-[#ABABAD] space-y-1">
                              <div className="font-semibold text-slate-300">⚡ War Room Power Features:</div>
                              <div>• <strong>1-Click Action Buttons:</strong> Use Acknowledge, Assign to Me, or Resolve on the card above.</div>
                              <div>• <strong>Timeline Sync:</strong> Messages and decisions posted here are synced directly into the incident audit timeline.</div>
                              <div>• <strong>Auto-Archive:</strong> When resolved, full channel logs are compiled into the retrospective postmortem draft.</div>
                            </div>
                          </div>

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
                            <Bell className="w-3.5 h-3.5 text-blue-400" />
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
            <div className="lg:col-span-4 p-6 sm:p-8 bg-white border-l border-slate-200 flex flex-col justify-between space-y-6 text-slate-900">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  {currentTab.badge}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {currentTab.heading}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentTab.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Key Capabilities
                  </span>
                  {currentTab.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick-Start Box */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Ready to deploy?</span>
                  <Link
                    href="/docs"
                    className="text-blue-600 hover:text-blue-500 font-bold flex items-center gap-1 transition-colors"
                  >
                    View Docs <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-[11px] font-mono text-sky-400 truncate">
                      curl -sL .../docker-compose.yml &gt; docker-compose.yml &amp;&amp; docker compose up -d
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
      </div>
    </section>
  );
}
