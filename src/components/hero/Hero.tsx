"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Copy, 
  Check, 
  ShieldCheck, 
  Zap, 
  Repeat, 
  Users, 
  Activity, 
  Shield, 
  Github,
  Play,
  Lock
} from "lucide-react";
import { BRAND } from "@/lib/brand";

type DeployTab = "docker" | "compose" | "helm";

interface ShowcaseView {
  id: string;
  name: string;
  image: string;
  badge: string;
  badgeColor: string;
  caption: string;
  metric: string;
}

const SHOWCASE_VIEWS: ShowcaseView[] = [
  {
    id: "command-center",
    name: "Command Center",
    image: "/dashboard-command-center.png",
    badge: "Live Telemetry",
    badgeColor: "bg-red-500/10 text-red-600 border-red-200",
    caption: "Sub-second incident triage with live SSE streams and 1-click commander actions.",
    metric: "SSE Live Streaming"
  },
  {
    id: "incidents",
    name: "Incident Timeline",
    image: "/incident-detail-timeline.png",
    badge: "Audit Ready",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-200",
    caption: "Chronological event logging, Slack sync, and automated postmortem drafting.",
    metric: "Zero Data Leakage"
  },
  {
    id: "schedules",
    name: "On-Call Rotations",
    image: "/schedule-main.png",
    badge: "Timezone Aware",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-200",
    caption: "Multi-tier primary, secondary, and shadow shifts with 1-click swaps and calendar sync.",
    metric: "24/7 Global Coverage"
  },
  {
    id: "escalations",
    name: "Escalation Policies",
    image: "/escalation-policies.png",
    badge: "Automated Routing",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-200",
    caption: "Urgent SMS, push, Slack, and WhatsApp paging with tiered delay fallbacks.",
    metric: "< 15ms Ingest-to-Page"
  },
  {
    id: "analytics",
    name: "SRE Analytics",
    image: "/analytics-dashboard.png",
    badge: "SLO Intelligence",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    caption: "Real-time MTTA, MTTR, and service health trends with zero external trackers.",
    metric: "Audit & Compliance"
  }
];

export function Hero() {
  const [activeDeploy, setActiveDeploy] = useState<DeployTab>("docker");
  const [activeView, setActiveView] = useState<string>("command-center");
  const [copied, setCopied] = useState(false);

  const deployCommands: Record<DeployTab, string> = {
    docker: `docker run -d -p 3000:3000 \\
  -e DATABASE_URL="postgresql://user:pass@host:5432/opsknight" \\
  -e NEXTAUTH_SECRET="generate-a-secure-secret-key" \\
  -e ENCRYPTION_KEY="your-32-byte-hex-encryption-key" \\
  ghcr.io/opsknight-labs/opsknight:latest`,
    compose: `curl -sL https://raw.githubusercontent.com/opsknight-labs/OpsKnight/main/docker-compose.yml > docker-compose.yml
docker-compose up -d`,
    helm: `helm repo add opsknight https://opsknight-labs.github.io/helm-charts
helm repo update
helm install opsknight opsknight/opsknight --set app.secret="your-secure-secret"`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(deployCommands[activeDeploy]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentView = SHOWCASE_VIEWS.find((v) => v.id === activeView) || SHOWCASE_VIEWS[0];

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50 border-b border-slate-200/80">
      
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-500/10 via-sky-400/5 to-transparent blur-3xl rounded-full" />
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-8">
          <Link
            href="https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.3.1"
            target="_blank"
            className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all text-xs font-semibold text-slate-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="font-bold text-slate-900">OpsKnight v1.3.1 GA</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">Drop-in PagerDuty Emulation & Zero Per-Seat Fees</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
            The open-source command center for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
              on-call & incident orchestration.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Self-host complete reliability infrastructure in minutes. Multi-tier rotations, automated Slack war rooms, 28+ native monitoring integrations, and branded status pages. 100% private in your VPC.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/docs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Deploy Community Edition ($0)
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#product-tour"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm transition-all hover:border-slate-400"
            >
              <Play className="w-4 h-4 text-blue-600 fill-blue-600/20" />
              Interactive Product Tour
            </Link>

            <Link
              href={BRAND.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm transition-all hover:border-slate-400 group"
            >
              <Github className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
              <span>Star on GitHub</span>
              <span className="ml-1 px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-mono font-semibold text-slate-600">
                AGPL-3.0
              </span>
            </Link>
          </div>
        </div>

        {/* 1-Click Interactive Deploy Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">1-Command Deployment</span>
              </div>

              {/* Deploy Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(["docker", "compose", "helm"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDeploy(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                      activeDeploy === tab
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === "docker" ? "Docker Run" : tab === "compose" ? "Compose" : "Helm"}
                  </button>
                ))}
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold font-mono transition-colors"
                title="Copy command"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 font-mono text-xs text-slate-200 overflow-x-auto">
              <pre className="text-sky-300 whitespace-pre leading-relaxed">
                {deployCommands[activeDeploy]}
              </pre>
            </div>

            {/* Micro Specs Footer */}
            <div className="px-4 py-2.5 bg-slate-900/50 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-emerald-400">●</span> Memory: &lt; 512MB RAM
              </span>
              <span className="flex items-center gap-1">
                <span className="text-blue-400">●</span> Latency: &lt; 15ms Ingest
              </span>
              <span className="flex items-center gap-1">
                <span className="text-sky-400">●</span> Privacy: 100% On-Prem / Air-Gapped
              </span>
              <span className="flex items-center gap-1">
                <span className="text-amber-400">●</span> License: AGPL-3.0 Full Source
              </span>
            </div>
          </div>
        </div>

        {/* State-of-the-Art Interactive Product Showcase Stage */}
        <div className="space-y-6">
          
          {/* Showcase View Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="p-1.5 bg-white border border-slate-200 rounded-2xl flex flex-wrap items-center justify-center gap-1.5 shadow-sm">
              {SHOWCASE_VIEWS.map((view) => {
                const isActive = activeView === view.id;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span>{view.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* High-Resolution Stage Card */}
          <div className="relative rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            
            {/* Top Browser Bar */}
            <div className="h-12 bg-slate-950 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              </div>

              <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>https://app.opsknight.internal/{activeView}</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            {/* Dynamic UI Canvas */}
            <div className="relative bg-slate-900 aspect-[16/10] overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView.id}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentView.image}
                    alt={currentView.caption}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Live Telemetry Cards */}
              <div className="absolute top-4 left-4 pointer-events-none hidden md:block">
                <div className="bg-slate-950/90 backdrop-blur-md text-white border border-red-500/30 px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>RED ALERT INGESTION</span>
                      <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.2 rounded font-mono">P1 CRITICAL</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Deduplicated in 2.4ms via SHA-256</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 pointer-events-none hidden md:block">
                <div className="bg-slate-950/90 backdrop-blur-md text-white border border-blue-500/30 px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <div>
                    <div className="font-bold text-white">SLACK WAR ROOM READY</div>
                    <div className="text-[10px] text-slate-400 font-mono">#inc-api-gateway + WebRTC bridge</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 pointer-events-none hidden md:block">
                <div className="bg-slate-950/90 backdrop-blur-md text-white border border-slate-700 px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white">INGESTION LATENCY</div>
                    <div className="text-[10px] text-emerald-400 font-mono">11.8ms (Zero Redis overhead)</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 pointer-events-none hidden md:block">
                <div className="bg-slate-950/90 backdrop-blur-md text-white border border-emerald-500/30 px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white">VPC SOVEREIGNTY</div>
                    <div className="text-[10px] text-slate-400 font-mono">100% On-Premises • $0 Per-Seat</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${currentView.badgeColor}`}>
                  {currentView.badge}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  {currentView.caption}
                </span>
              </div>

              <Link
                href="/docs"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors shrink-0"
              >
                Explore {currentView.name} Docs
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4-Pillar Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3 shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">100% VPC Data Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full AGPL-3.0 source access. Sensitive incident logs and credentials never touch a 3rd-party vendor cloud.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3 shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">28+ Native Integrations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect Datadog, Prometheus, Grafana, CloudWatch, Sentry, Zabbix, GitLab, and custom JSON webhooks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3 shadow-sm">
              <Repeat className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Drop-in PagerDuty API</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Implements <code className="text-blue-600 font-mono">/api/v2/enqueue</code>. Swap endpoint URL and migrate in 30 seconds with 0 downtime.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">$0 Per-Seat Tax</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlimited engineers, responder seats, services, and escalation policies without credit card gates.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
