"use client";

import { useState } from "react";
import { Users, Sparkles, Check, ArrowRight, Server } from "lucide-react";
import Link from "next/link";

interface VendorOption {
  id: string;
  name: string;
  monthlyPerSeat: number;
  planName: string;
  badge?: string;
}

const VENDORS: VendorOption[] = [
  { id: "pagerduty", name: "PagerDuty", monthlyPerSeat: 41, planName: "Business ($41/mo)", badge: "Most Replaced" },
  { id: "incidentio", name: "incident.io", monthlyPerSeat: 35, planName: "Pro + On-Call ($35/mo)" },
  { id: "opsgenie", name: "Opsgenie", monthlyPerSeat: 29, planName: "Enterprise ($29/mo)" },
  { id: "splunk", name: "Splunk On-Call", monthlyPerSeat: 23, planName: "Standard ($23/mo)" },
  { id: "squadcast", name: "Squadcast", monthlyPerSeat: 21, planName: "Pro ($21/mo)" },
];

export function SavingsCalculator() {
  const [selectedVendorId, setSelectedVendorId] = useState<string>("pagerduty");
  const [engineers, setEngineers] = useState<number>(30);
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [infraTier, setInfraTier] = useState<"dedicated" | "existing">("dedicated");

  const selectedVendor = VENDORS.find((v) => v.id === selectedVendorId) || VENDORS[0];
  const multiplier = period === "annual" ? 12 : 1;

  const currentVendorCost = engineers * selectedVendor.monthlyPerSeat * multiplier;
  
  // Flat infra cost: $15/mo for dedicated VM (t4g.small / droplet), $0 marginal on existing K8s cluster
  const infraMonthly = infraTier === "dedicated" ? 15 : 0;
  const opsknightInfraCost = infraMonthly * multiplier;
  
  // Net savings = Vendor SaaS bill - OpsKnight infra cost
  const netSavings = Math.max(0, currentVendorCost - opsknightInfraCost);
  const savingsPercent = currentVendorCost > 0 ? ((netSavings / currentVendorCost) * 100).toFixed(1) : "100";

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const presetSizes = [15, 30, 50, 100, 250];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden font-sans text-slate-900">
      <div className="relative z-10 space-y-6">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Multi-Vendor ROI Calculator
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Calculate Your Infrastructure Savings
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Compare OpsKnight against proprietary per-seat vendors with real hosting infrastructure costs.
            </p>
          </div>

          {/* Billing Period Toggle */}
          <div className="flex items-center self-start sm:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                period === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod("annual")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                period === "annual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Annual (Save Big)
            </button>
          </div>
        </div>

        {/* Competitor Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Competitor to Compare:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {VENDORS.map((v) => {
              const isSelected = selectedVendorId === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVendorId(v.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? "bg-blue-50 border-blue-500 text-blue-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {v.badge && (
                    <span className="absolute -top-2 right-2 text-[9px] bg-red-500 text-white font-bold px-1.5 py-0.2 rounded-full shadow-sm">
                      {v.badge}
                    </span>
                  )}
                  <div className="font-bold text-xs truncate">{v.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">${v.monthlyPerSeat}/user/mo</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Size Slider & Presets */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Users className="w-4 h-4 text-blue-600" />
              On-Call Engineers & Responders:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                max={500}
                value={engineers}
                onChange={(e) => setEngineers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-1 text-right font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <span className="text-xs font-semibold text-slate-500">Seats</span>
            </div>
          </div>

          <input
            type="range"
            min={5}
            max={300}
            step={5}
            value={engineers}
            onChange={(e) => setEngineers(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500 text-[11px]">Quick Team Presets:</span>
            {presetSizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setEngineers(sz)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  engineers === sz
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {sz} Seats
              </button>
            ))}
          </div>
        </div>

        {/* Hosting Infrastructure Model Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-slate-700 shrink-0" />
            <div>
              <div className="font-bold text-slate-900">Hosting Infrastructure Assumption:</div>
              <div className="text-slate-500 text-[11px]">
                {infraTier === "dedicated" ? "Dedicated Cloud VM (~$15/mo flat AWS EC2/Hetzner)" : "Existing Kubernetes/VPC Cluster ($0 marginal)"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setInfraTier("dedicated")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                infraTier === "dedicated" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cloud VM (~$15/mo)
            </button>
            <button
              onClick={() => setInfraTier("existing")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                infraTier === "existing" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Existing K8s ($0)
            </button>
          </div>
        </div>

        {/* Three-Column Financial Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Competitor Cost Card */}
          <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-red-600">
              {selectedVendor.name} {period === "annual" ? "Annual" : "Monthly"} Bill
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              {formatCurrency(currentVendorCost)}
            </div>
            <p className="text-[11px] text-slate-600">
              {engineers} engineers × ${selectedVendor.monthlyPerSeat}/mo {period === "annual" ? "× 12 months" : ""}
            </p>
          </div>

          {/* 2. OpsKnight Software + Infra Cost Card */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              OpsKnight Total Cost
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              {formatCurrency(opsknightInfraCost)}
            </div>
            <p className="text-[11px] text-slate-600">
              $0 software license (AGPL-3.0) + {formatCurrency(opsknightInfraCost)} hosting
            </p>
          </div>

          {/* 3. Net Savings Card */}
          <div className="p-5 rounded-2xl bg-emerald-600 text-white space-y-2 shadow-lg shadow-emerald-600/20">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-100 flex items-center justify-between">
              <span>Net ROI Savings</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-mono">-{savingsPercent}%</span>
            </div>
            <div className="text-3xl font-black text-white font-mono">
              {formatCurrency(netSavings)}
            </div>
            <p className="text-[11px] text-emerald-100">
              Kept directly inside your engineering budget {period === "annual" ? "every year" : "every month"}.
            </p>
          </div>

        </div>

        {/* Feature Parity & Direct Call to Action */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-700">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited Users
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Slack War Rooms
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Status Pages
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% VPC Data Privacy
            </span>
          </div>

          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 shrink-0"
          >
            Deploy Community Edition Free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
