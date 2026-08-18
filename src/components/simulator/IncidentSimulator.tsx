"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Plus, 
  Flame, 
  CheckCircle2, 
  Clock, 
  UserCheck,
  Calendar,
  Layers,
  Users,
  PieChart,
  Server,
  AlertTriangle,
  Radio,
  Search,
  RefreshCw,
  Sparkles,
  Check,
  Activity
} from "lucide-react";

interface MockIncident {
  id: string;
  title: string;
  service: string;
  urgency: "HIGH" | "MEDIUM" | "LOW";
  severityLabel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "ACKNOWLEDGED" | "RESOLVED";
  assignee: string;
  timeAgo: string;
  source: string;
}

const INITIAL_INCIDENTS: MockIncident[] = [
  {
    id: "INC-384",
    title: "HighLatencyAPI: 5xx error rate spiking on /api/v1/checkout",
    service: "api-gateway",
    urgency: "HIGH",
    severityLabel: "CRITICAL",
    status: "OPEN",
    assignee: "Unassigned",
    timeAgo: "2m ago",
    source: "Github Alert"
  },
  {
    id: "INC-383",
    title: "Read replica connection pool exhaustion on postgres-cluster",
    service: "postgres-primary",
    urgency: "HIGH",
    severityLabel: "HIGH",
    status: "OPEN",
    assignee: "Sarah Chen",
    timeAgo: "14m ago",
    source: "Datadog Alert"
  },
  {
    id: "INC-382",
    title: "Kubernetes Ingress controller high memory usage (>92%)",
    service: "k8s-ingress",
    urgency: "MEDIUM",
    severityLabel: "MEDIUM",
    status: "ACKNOWLEDGED",
    assignee: "Alex Vance",
    timeAgo: "1h ago",
    source: "Prometheus"
  },
  {
    id: "INC-381",
    title: "Stripe webhook delivery timeout on subscription.updated",
    service: "billing-worker",
    urgency: "LOW",
    severityLabel: "LOW",
    status: "RESOLVED",
    assignee: "Alex Vance",
    timeAgo: "3h ago",
    source: "Webhook Ingestion"
  }
];

export function IncidentSimulator() {
  const [incidents, setIncidents] = useState<MockIncident[]>(INITIAL_INCIDENTS);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeNav, setActiveNav] = useState<string>("Dashboard");
  const [clock, setClock] = useState<string>("21:58:17");
  const [showTriggerModal, setShowTriggerModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newService, setNewService] = useState<string>("api-gateway");
  const [newSeverity, setNewSeverity] = useState<"CRITICAL" | "HIGH" | "MEDIUM" | "LOW">("CRITICAL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setClock(d.toTimeString().split(" ")[0]);
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAcknowledge = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { ...inc, status: "ACKNOWLEDGED", assignee: "Alex Vance (You)" };
      }
      return inc;
    }));
    showToast(`Claimed incident ${id}. Escalation paging acknowledged.`);
  };

  const handleResolve = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { ...inc, status: "RESOLVED" };
      }
      return inc;
    }));
    showToast(`Resolved ${id}. Status page synchronized & postmortem drafted.`);
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newInc: MockIncident = {
      id: `INC-${Math.floor(385 + Math.random() * 50)}`,
      title: newTitle,
      service: newService,
      urgency: newSeverity === "CRITICAL" || newSeverity === "HIGH" ? "HIGH" : newSeverity === "MEDIUM" ? "MEDIUM" : "LOW",
      severityLabel: newSeverity,
      status: "OPEN",
      assignee: "Unassigned",
      timeAgo: "Just now",
      source: "Manual Trigger"
    };

    setIncidents([newInc, ...incidents]);
    setShowTriggerModal(false);
    setNewTitle("");
    showToast(`🚨 Triggered ${newInc.id} on ${newInc.service}. Tier 1 on-call paged!`);
  };

  const filteredIncidents = incidents.filter(inc => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Mine") return inc.assignee.includes("You") || inc.assignee.includes("Alex");
    if (activeFilter === "Unassigned") return inc.assignee === "Unassigned" && inc.status !== "RESOLVED";
    if (activeFilter === "High" || activeFilter === "Critical") return inc.severityLabel === "CRITICAL" || inc.severityLabel === "HIGH";
    if (activeFilter === "Medium") return inc.severityLabel === "MEDIUM";
    if (activeFilter === "Low") return inc.severityLabel === "LOW";
    return true;
  });

  const openCount = incidents.filter(i => i.status !== "RESOLVED").length;
  const criticalCount = incidents.filter(i => (i.severityLabel === "CRITICAL" || i.severityLabel === "HIGH") && i.status !== "RESOLVED").length;
  const resolvedCount = incidents.filter(i => i.status === "RESOLVED").length;
  const unassignedCount = incidents.filter(i => i.assignee === "Unassigned" && i.status !== "RESOLVED").length;

  return (
    <section id="interactive-demo" className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Live Application Command Center
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            The actual OpsKnight UI in action.
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Test-drive the real OpsKnight Command Center. Click to filter live alerts, claim commander, resolve outages, or trigger a new incident in real time.
          </p>
        </div>

        {/* Browser Mock Frame */}
        <div className="w-full max-w-6xl mx-auto bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
          
          {/* Browser Window Header */}
          <div className="h-10 bg-slate-950 border-b border-white/10 px-4 flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-slate-900 text-slate-400 text-[11px] font-mono border border-white/5">
              <span className="text-emerald-400">https://</span>
              <span>command-center.opsknight.io/dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>SSE Live</span>
            </div>
          </div>

          {/* App Body: Sidebar + Main Layout */}
          <div className="flex flex-col md:flex-row min-h-[620px] bg-slate-950">
            
            {/* Sidebar */}
            <aside className="w-full md:w-60 bg-slate-950 border-b md:border-b-0 md:border-r border-white/10 p-3 flex flex-col justify-between flex-shrink-0">
              <div className="space-y-4">
                {/* Brand Header */}
                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/25 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-black text-white text-base tracking-tight leading-none block">OpsKnight</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5">INCIDENT RESPONSE</span>
                  </div>
                </div>

                {/* Sidebar Nav Items */}
                <nav className="space-y-1 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1">MAIN</div>
                  {[
                    { label: "Dashboard", icon: Activity, count: null },
                    { label: "Incidents", icon: Flame, count: openCount },
                    { label: "Services", icon: Server, count: "12" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveNav(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                        activeNav === item.label
                          ? "bg-slate-900 text-white border border-white/10 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${activeNav === item.label ? "text-red-400" : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== null && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          item.label === "Incidents" ? "bg-red-500/20 text-red-400" : "bg-slate-800 text-slate-400"
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  ))}

                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pt-3 pb-1">OPERATIONS</div>
                  {[
                    { label: "Teams", icon: Users },
                    { label: "Schedules", icon: Calendar },
                    { label: "Escalation Policies", icon: ShieldAlert },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveNav(item.label)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-all ${
                        activeNav === item.label
                          ? "bg-slate-900 text-white border border-white/10 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${activeNav === item.label ? "text-red-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </button>
                  ))}

                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pt-3 pb-1">INSIGHTS</div>
                  {[
                    { label: "Analytics", icon: PieChart },
                    { label: "Status Pages", icon: Layers },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveNav(item.label)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-all ${
                        activeNav === item.label
                          ? "bg-slate-900 text-white border border-white/10 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${activeNav === item.label ? "text-red-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Responder User Box */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-2.5 px-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                  AV
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">Alex Vance</div>
                  <div className="text-[10px] text-emerald-400 font-medium">● Primary On-Call</div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col bg-slate-950 overflow-y-auto">
              
              {/* Topbar */}
              <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between gap-4 bg-slate-950">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 px-3 py-1 bg-red-500/15 border border-red-500/30 rounded-full text-red-400 text-xs font-bold font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    RED ALERT | H{criticalCount} · M17 · L11
                  </span>
                </div>

                <div className="flex-1 max-w-md hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-white/5 text-xs text-slate-400">
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <span>Search incidents, services, responders... (⌘ K)</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-white/5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-white font-bold">{clock}</span>
                  </div>

                  <button
                    onClick={() => setShowTriggerModal(true)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shadow-red-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    Trigger Incident
                  </button>
                </div>
              </div>

              {/* Command Center Dashboard Card */}
              <div className="p-6 space-y-5">
                
                {/* Real OpsKnight Command Center Header Card */}
                <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-white/10 p-6 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                          Command Center
                        </h3>
                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                          {clock}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400">
                        <span>System Status:</span>
                        <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                          CRITICAL ({openCount} active)
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/5">
                          Range: (30d)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast("Refreshing live event stream...")}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-white/10 flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Refresh
                      </button>
                    </div>
                  </div>

                  {/* 4 Metric Cards (Matching App MetricCard.tsx) */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-1">347</div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        TOTAL <span className="opacity-70 text-[10px]">(30D)</span>
                      </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono mb-1">{openCount}</div>
                      <div className="text-[11px] font-bold text-red-300 uppercase tracking-wide">
                        OPEN <span className="opacity-70 text-[10px]">(30D)</span>
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mb-1">{165 + resolvedCount - 1}</div>
                      <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide">
                        RESOLVED <span className="opacity-70 text-[10px]">(30D)</span>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mb-1">{unassignedCount}</div>
                      <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                        UNASSIGNED <span className="opacity-70 text-[10px]">(ALL TIME)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Banners (From App Dashboard) */}
                <div className="space-y-2.5">
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs text-amber-300">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span><strong>{criticalCount} critical incidents active</strong> requiring responder escalation.</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-400 cursor-pointer hover:underline">View Active →</span>
                  </div>

                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between text-xs text-blue-300">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span><strong>Smart Insight:</strong> 101% of incidents originate from &ldquo;Github Alert&rdquo; webhook ingestion.</span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-400 cursor-pointer hover:underline">Configure Webhooks →</span>
                  </div>
                </div>

                {/* Toast Feedback */}
                <AnimatePresence>
                  {toastMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs font-semibold flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{toastMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {["All", "Mine", "Unassigned", "High", "Medium", "Low"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          activeFilter === filter
                            ? "bg-red-600 text-white shadow-sm"
                            : "bg-slate-900 text-slate-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Showing {filteredIncidents.length} incidents
                  </div>
                </div>

                {/* Incident Feed List */}
                <div className="space-y-2.5">
                  {filteredIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="p-4 bg-slate-900/90 rounded-xl border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-white">{incident.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            incident.severityLabel === "CRITICAL"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : incident.severityLabel === "HIGH"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          }`}>
                            {incident.severityLabel}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">[{incident.service}]</span>
                          <span className="text-[10px] text-slate-500 font-mono">via {incident.source}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-200">{incident.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span>Assignee: <strong className="text-white">{incident.assignee}</strong></span>
                          <span>•</span>
                          <span>Opened: {incident.timeAgo}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                        {incident.status === "OPEN" && (
                          <button
                            onClick={() => handleAcknowledge(incident.id)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs border border-white/10 transition-colors flex items-center gap-1.5"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                            Acknowledge
                          </button>
                        )}
                        {incident.status !== "RESOLVED" && (
                          <button
                            onClick={() => handleResolve(incident.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Resolve
                          </button>
                        )}
                        {incident.status === "RESOLVED" && (
                          <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </main>
          </div>
        </div>

        {/* Modal: Declare New Incident */}
        {showTriggerModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Flame className="w-4 h-4 text-red-500" />
                  Trigger New Incident
                </div>
                <button
                  onClick={() => setShowTriggerModal(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateIncident} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Incident Summary</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5xx rate spiking on authentication cluster"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Impacted Service</label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500 text-xs"
                    >
                      <option value="api-gateway">api-gateway</option>
                      <option value="postgres-primary">postgres-primary</option>
                      <option value="billing-service">billing-service</option>
                      <option value="k8s-cluster">k8s-cluster</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Severity</label>
                    <select
                      value={newSeverity}
                      onChange={(e) => setNewSeverity(e.target.value as MockIncident["severityLabel"])}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500 text-xs"
                    >
                      <option value="CRITICAL">CRITICAL (Sev-1)</option>
                      <option value="HIGH">HIGH (Sev-2)</option>
                      <option value="MEDIUM">MEDIUM (Sev-3)</option>
                      <option value="LOW">LOW (Sev-4)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTriggerModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold shadow-lg shadow-red-500/25"
                  >
                    🚨 Trigger Incident & Page
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
