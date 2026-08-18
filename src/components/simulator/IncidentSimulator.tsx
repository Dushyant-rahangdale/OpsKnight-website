"use client";

import React, { useState, useEffect } from "react";
import { 
  Zap, 
  Lightbulb, 
  Plus, 
  Filter, 
  Search, 
  RefreshCw, 
  Download, 
  ChevronRight, 
  ChevronDown, 
  Flame, 
  AlertCircle, 
  MinusCircle, 
  Siren, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  Keyboard, 
  LogOut, 
  CheckCircle2, 
  UserCheck, 
  Check, 
  Activity, 
  Server, 
  Users, 
  Calendar, 
  ShieldAlert, 
  PieChart, 
  FileWarning, 
  Radio,
  TrendingUp
} from "lucide-react";

interface MockIncident {
  id: string;
  title: string;
  service: string;
  urgency: "HIGH" | "MEDIUM" | "LOW";
  priority: "P1" | "P2" | "P3" | "P4";
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
    priority: "P1",
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
    priority: "P1",
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
    priority: "P2",
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
    priority: "P3",
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
  const [dateRange, setDateRange] = useState<string>("Last 30 days");
  const [clock, setClock] = useState<string>("21:10:39");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showTriggerModal, setShowTriggerModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newService, setNewService] = useState<string>("api-gateway");
  const [newSeverity, setNewSeverity] = useState<"CRITICAL" | "HIGH" | "MEDIUM" | "LOW">("CRITICAL");
  const [newPriority, setNewPriority] = useState<"P1" | "P2" | "P3" | "P4">("P1");
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

  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === incidents.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(incidents.map(i => i.id)));
    }
  };

  const handleAcknowledge = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { ...inc, status: "ACKNOWLEDGED", assignee: "Alex Vance (You)" };
      }
      return inc;
    }));
    showToast(`Claimed incident ${id}. Paging alert acknowledged.`);
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
      priority: newPriority,
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

        {/* Browser Mock Frame (Exact Real App Layout) */}
        <div className="w-full max-w-7xl mx-auto bg-[#f4f6fa] rounded-2xl border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col text-slate-900">
          
          {/* Browser Window Header */}
          <div className="h-9 bg-[#111827] px-4 flex items-center justify-between text-xs select-none border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-0.5 rounded-md bg-[#1f2937] text-slate-400 text-[11px] font-mono border border-white/5">
              <span className="text-emerald-400">https://</span>
              <span>app.opsknight.com/dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              <span>SSE Live</span>
            </div>
          </div>

          {/* App Body: Sidebar + Main Layout */}
          <div className="flex flex-col md:flex-row min-h-[760px]">
            
            {/* Sidebar (Exact matching real app dark sidebar) */}
            <aside className="w-full md:w-64 bg-[#0d1322] border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between flex-shrink-0 text-slate-300 select-none">
              <div className="space-y-5">
                {/* Brand Header */}
                <div className="flex items-center gap-3 px-1 py-1">
                  <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 flex-shrink-0 border border-white/10">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-black text-white text-[17px] tracking-tight leading-none block">OpsKnight</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-1">INCIDENT RESPONSE</span>
                  </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-1 text-xs font-medium">
                  <button
                    onClick={() => setActiveNav("Dashboard")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      activeNav === "Dashboard"
                        ? "bg-[#1e293b] text-white font-bold shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Activity className="w-4 h-4 text-slate-300" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={() => setActiveNav("Incidents")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                      activeNav === "Incidents"
                        ? "bg-[#1e293b] text-white font-bold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Flame className="w-4 h-4 text-slate-300" />
                      <span>Incidents</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white font-bold text-[10px]">
                      99+
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveNav("Services")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <Server className="w-4 h-4 text-slate-300" />
                    <span>Services</span>
                  </button>

                  <button
                    onClick={() => setActiveNav("Users")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <Users className="w-4 h-4 text-slate-300" />
                    <span>Users</span>
                  </button>

                  {/* Operations Section */}
                  <div className="pt-3 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>OPERATIONS</span>
                  </div>

                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Teams</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Schedules</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
                    <ShieldAlert className="w-4 h-4 text-slate-400" />
                    <span>Escalation Policies</span>
                  </button>

                  {/* Insights Section */}
                  <div className="pt-3 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    <span>INSIGHTS</span>
                  </div>

                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
                    <PieChart className="w-4 h-4 text-slate-400" />
                    <span>Analytics</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
                    <FileWarning className="w-4 h-4 text-slate-400" />
                    <span>Postmortems</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span>Status Page</span>
                  </button>
                </nav>
              </div>

              {/* Responder User Box */}
              <div className="mt-6 pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-2.5 px-1">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-xs text-white">
                      AV
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0d1322]"></span>
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">Alex Vance</div>
                    <div className="text-[10px] text-slate-400 truncate">alex.vance@acmecorp.io</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-400 px-1 pt-1">
                  <HelpCircle className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  <Keyboard className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  <Settings className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  <LogOut className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 px-1">
                  <span>opsknight.com</span>
                  <span>v1.3.1</span>
                </div>
              </div>
            </aside>

            {/* Main Canvas & Content Area */}
            <main className="flex-1 flex flex-col bg-[#f4f6fa] overflow-y-auto">
              
              {/* Topbar (Exact White TopBar) */}
              <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Operational Status Pill */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-800 text-xs font-bold font-mono shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
                    <span>RED ALERT | H{criticalCount + 360} · M17 · L11</span>
                  </div>
                </div>

                <div className="flex-1 max-w-md hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-400">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span className="flex-1">Search...</span>
                  <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 rounded shadow-sm text-slate-500 font-mono">⌘ K</kbd>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowTriggerModal(true)}
                    className="px-3.5 py-1.5 bg-[#0f172a] hover:bg-slate-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create</span>
                    <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                  </button>

                  <div className="w-8 h-8 rounded-full bg-amber-600 border border-slate-200 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                    AV
                  </div>
                </div>
              </header>

              {/* Dashboard Content Container */}
              <div className="p-6 space-y-4">
                
                {/* Real OpsKnight Command Center Dark Box (Exact from media_1787067642473.png) */}
                <div className="rounded-2xl bg-[#192231] text-white p-6 shadow-md border border-slate-800/80">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                          Command Center
                        </h3>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0f172a] border border-slate-800 text-slate-200 text-sm font-mono font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                          <span>{clock}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300">
                        <span>System Status:</span>
                        <span className="px-2 py-0.5 rounded bg-red-600/30 text-red-300 font-bold border border-red-500/40 uppercase">
                          CRITICAL ({openCount + 380} active)
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          Range (30d)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 hidden sm:inline">Updated: 9:10 PM</span>
                      <button
                        onClick={() => showToast("Refreshing live stream...")}
                        className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-semibold shadow-sm hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                        <span>Refresh</span>
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 font-semibold border border-slate-700 hover:bg-slate-700 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                        <span>Auto OFF</span>
                      </button>
                      <button
                        onClick={() => showToast("Exporting CSV report...")}
                        className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-semibold shadow-sm hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Metric Cards inside Command Center (Exact matching real app) */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#283347]/70 border border-slate-700/60 rounded-xl p-5 text-center shadow-inner">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 font-mono tracking-tight">
                        347
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        TOTAL <span className="opacity-70 text-[10px]">(30D)</span>
                      </div>
                    </div>

                    <div className="bg-[#283347]/70 border border-slate-700/60 rounded-xl p-5 text-center shadow-inner">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 font-mono tracking-tight">
                        {openCount + 380}
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        OPEN <span className="opacity-70 text-[10px]">(30D)</span>
                      </div>
                    </div>

                    <div className="bg-[#283347]/70 border border-slate-700/60 rounded-xl p-5 text-center shadow-inner">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 font-mono tracking-tight">
                        {165 + resolvedCount - 1}
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        RESOLVED <span className="opacity-70 text-[10px]">(30D)</span>
                      </div>
                    </div>

                    <div className="bg-[#283347]/70 border border-slate-700/60 rounded-xl p-5 text-center shadow-inner">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 font-mono tracking-tight">
                        {unassignedCount + 3}
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        UNASSIGNED <span className="opacity-70 text-[10px]">(ALL TIME)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banners: Warning & Insight (Exact Pale Cream & Ice-Blue) */}
                <div className="space-y-2">
                  <div className="px-4 py-3 bg-[#fffbeb] border border-[#fef3c7] rounded-xl flex items-center justify-between text-xs text-[#b45309]">
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-[#d97706] flex-shrink-0" />
                      <span><strong>363 critical incidents active.</strong> Prioritize immediate response.</span>
                    </div>
                    <button className="text-xs font-bold text-[#b45309] hover:opacity-70">✕</button>
                  </div>

                  <div className="px-4 py-3 bg-[#eff6ff] border border-[#dbeafe] rounded-xl flex items-center justify-between text-xs text-[#1e40af]">
                    <div className="flex items-center gap-2.5">
                      <Lightbulb className="w-4 h-4 text-[#2563eb] flex-shrink-0" />
                      <span><strong>101% of incidents originate from &ldquo;Github Alert&rdquo;.</strong> Consider investigating root cause.</span>
                    </div>
                    <button className="text-xs font-bold text-[#1e40af] hover:opacity-70">✕</button>
                  </div>
                </div>

                {/* Toast Feedback */}
                {toastMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{toastMessage}</span>
                  </div>
                )}

                {/* 2-Column Grid (Left: Filters & Incidents / Right: Quick Actions, On-Call, Performance) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Filter Incidents & Live Feed (8 Cols) */}
                  <div className="lg:col-span-8 space-y-4">
                    
                    {/* Filter Card (Matching exact DashboardIncidentFilters.tsx) */}
                    <div className="group relative rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f172a] to-[#334155]" />

                      {/* Header */}
                      <div className="p-4 pb-3 border-b border-slate-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                            <Filter className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">Filter Incidents</h3>
                            <p className="text-[10px] text-slate-500 font-medium">Refine your incident feed</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Quick Filters */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">QUICK FILTERS</p>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {[
                              { label: "All", icon: null },
                              { label: "Mine", icon: null },
                              { label: "Unassigned", icon: null },
                              { label: "High", icon: Flame },
                              { label: "Medium", icon: AlertCircle },
                              { label: "Low", icon: MinusCircle },
                            ].map((pill) => (
                              <button
                                key={pill.label}
                                onClick={() => setActiveFilter(pill.label)}
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 border ${
                                  activeFilter === pill.label
                                    ? "bg-[#0f172a] text-white border-[#0f172a] shadow-sm"
                                    : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                                }`}
                              >
                                {pill.icon && <pill.icon className="w-3 h-3" />}
                                <span>{pill.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Advanced Time Range */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">ADVANCED</p>
                          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                            {["Last 3 days", "Last 7 days", "Last 30 days", "Last 90 days", "All time", "Custom"].map((range) => (
                              <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                                  dateRange === range
                                    ? "bg-white text-slate-900 font-bold shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                                }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Search & Dropdown Pills */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1">
                          <div className="relative sm:col-span-1">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="Search..."
                              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                            />
                          </div>
                          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-between shadow-sm">
                            <span>All services</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-between shadow-sm">
                            <span className="flex items-center gap-1.5 text-emerald-700">
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                              All statuses
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-between shadow-sm">
                            <span className="flex items-center gap-1.5 text-purple-700">
                              <span>⇅</span>
                              Newest first
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Incident Feed List (Matching Real IncidentsListTable Rows) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                          LATEST INCIDENTS ({filteredIncidents.length})
                        </div>
                        <button
                          onClick={handleSelectAll}
                          className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                        >
                          {selectedIds.size === incidents.length ? "Clear selection" : "Select all"}
                        </button>
                      </div>

                      {filteredIncidents.map((incident) => {
                        const isSelected = selectedIds.has(incident.id);
                        return (
                          <div
                            key={incident.id}
                            className={`group relative rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all p-4 border-l-4 ${
                              incident.status === "OPEN" 
                                ? "border-l-red-500" 
                                : incident.status === "ACKNOWLEDGED" 
                                ? "border-l-amber-500" 
                                : "border-l-emerald-500"
                            } ${isSelected ? "ring-2 ring-slate-900/20 border-slate-400 bg-slate-50/50" : "border-slate-200"}`}
                          >
                            <div className="flex gap-3 items-start">
                              {/* Checkbox */}
                              <div className="pt-1">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleSelect(incident.id)}
                                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                                />
                              </div>

                              {/* Main Info */}
                              <div className="min-w-0 flex-1 space-y-2">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <span className="font-extrabold text-slate-900 leading-tight truncate text-sm hover:text-slate-700 cursor-pointer">
                                    {incident.title}
                                  </span>

                                  {/* Badges */}
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {/* StatusBadge */}
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                                      incident.status === "OPEN"
                                        ? "bg-red-200 text-red-900 border border-red-300"
                                        : incident.status === "ACKNOWLEDGED"
                                        ? "bg-amber-200 text-amber-900 border border-amber-300"
                                        : "bg-emerald-200 text-emerald-900 border border-emerald-300"
                                    }`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${
                                        incident.status === "OPEN" ? "bg-red-500" : incident.status === "ACKNOWLEDGED" ? "bg-amber-500" : "bg-emerald-500"
                                      }`} />
                                      {incident.status}
                                    </span>

                                    {/* PriorityBadge */}
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                                      <Zap className="w-3 h-3 text-red-600" />
                                      {incident.priority} - Crisis
                                    </span>

                                    {/* Urgency */}
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 uppercase">
                                      {incident.urgency}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-slate-500 text-xs">
                                  <span className="text-slate-800 font-semibold hover:underline cursor-pointer">
                                    {incident.service}
                                  </span>
                                  <span className="opacity-50">&middot;</span>
                                  <span className="font-mono font-semibold">#{incident.id.toUpperCase()}</span>
                                  <span className="opacity-50">&middot;</span>
                                  <span>{incident.timeAgo} via {incident.source}</span>
                                </div>
                              </div>

                              {/* Assignee Section */}
                              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-50 border border-slate-100">
                                <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center">
                                  {incident.assignee === "Unassigned" ? "?" : "AV"}
                                </div>
                                <span className="text-xs font-semibold text-slate-700 truncate max-w-[100px]">
                                  {incident.assignee}
                                </span>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-1.5 self-start">
                                {incident.status === "OPEN" && (
                                  <button
                                    onClick={() => handleAcknowledge(incident.id)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs border border-slate-300 transition-colors flex items-center gap-1"
                                  >
                                    <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Ack</span>
                                  </button>
                                )}
                                {incident.status !== "RESOLVED" && (
                                  <button
                                    onClick={() => handleResolve(incident.id)}
                                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Resolve</span>
                                  </button>
                                )}
                                {incident.status === "RESOLVED" && (
                                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" />
                                    Resolved
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                  {/* Right Column: Widgets Stack (4 Cols) */}
                  <div className="lg:col-span-4 space-y-4">
                    
                    {/* Widget 1: Quick Actions (Exact SidebarWidget.tsx) */}
                    <div className="group relative rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f172a] to-[#334155]" />
                      <div className="p-4 pb-3 border-b border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                            <Zap className="w-5 h-5 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">Good Evening, Alex Vance</h3>
                            <p className="text-[10px] text-slate-500 font-medium">Quick actions</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        {/* Trigger Incident Card Button */}
                        <button
                          onClick={() => setShowTriggerModal(true)}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white transition-all shadow-sm text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                              <Siren className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-xs">Trigger Incident</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* View Analytics Button */}
                        <button
                          onClick={() => showToast("Viewing analytics metrics...")}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all text-left group shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                              <BarChart2 className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className="font-semibold text-xs">View Analytics</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Manage Services Button */}
                        <button
                          onClick={() => showToast("Navigating to service directory...")}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all text-left group shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                              <Settings className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className="font-semibold text-xs">Manage Services</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Widget 2: Who's On-Call (Exact OnCallWidget.tsx) */}
                    <div className="group relative rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                      <div className="p-4 pb-3 border-b border-slate-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">Who&apos;s On-Call</h3>
                            <p className="text-[10px] text-slate-500 font-medium">Active rotation shifts</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Schedules →
                        </span>
                      </div>

                      <div className="p-4 space-y-3 text-xs">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center">
                              AV
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">Alex Vance</div>
                              <div className="text-[10px] text-slate-500">Tier 1 Primary Escalation</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                              SC
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">Sarah Chen</div>
                              <div className="text-[10px] text-slate-500">Tier 2 Secondary On-Call</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        </div>
                      </div>
                    </div>

                    {/* Widget 3: Performance Metrics (Exact CompactPerformanceMetrics.tsx) */}
                    <div className="group relative rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400" />
                      <div className="p-4 pb-3 border-b border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">Performance Metrics</h3>
                            <p className="text-[10px] text-slate-500 font-medium">Last 30 days SLA velocity</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="text-lg font-black text-slate-900 font-mono">1.8m</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase">MTTA</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="text-lg font-black text-slate-900 font-mono">14.2m</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase">MTTR</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                          <div className="text-lg font-black text-emerald-700 font-mono">99.4%</div>
                          <div className="text-[10px] font-bold text-emerald-600 uppercase">SLA</div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </main>
          </div>
        </div>

        {/* Modal: Declare New Incident */}
        {showTriggerModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Flame className="w-4 h-4 text-red-600" />
                  Trigger New Incident
                </div>
                <button
                  onClick={() => setShowTriggerModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateIncident} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Incident Summary</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5xx rate spiking on authentication cluster"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Impacted Service</label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-red-600 text-xs"
                    >
                      <option value="api-gateway">api-gateway</option>
                      <option value="postgres-primary">postgres-primary</option>
                      <option value="billing-service">billing-service</option>
                      <option value="k8s-cluster">k8s-cluster</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => {
                        const p = e.target.value as "P1" | "P2" | "P3" | "P4";
                        setNewPriority(p);
                        setNewSeverity(p === "P1" ? "CRITICAL" : p === "P2" ? "HIGH" : p === "P3" ? "MEDIUM" : "LOW");
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-red-600 text-xs"
                    >
                      <option value="P1">P1 - Crisis (Sev-1)</option>
                      <option value="P2">P2 - High (Sev-2)</option>
                      <option value="P3">P3 - Medium (Sev-3)</option>
                      <option value="P4">P4 - Low (Sev-4)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTriggerModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-lg shadow-red-600/25"
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
