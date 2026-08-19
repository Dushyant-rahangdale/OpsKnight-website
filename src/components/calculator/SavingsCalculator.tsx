"use client";

import { useState } from "react";
import { Users, Sparkles, Check, ArrowRight } from "lucide-react";
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

  const selectedVendor = VENDORS.find((v) => v.id === selectedVendorId) || VENDORS[0];
  const multiplier = period === "annual" ? 12 : 1;

  const currentVendorCost = engineers * selectedVendor.monthlyPerSeat * multiplier;
  const savings = currentVendorCost;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const presetSizes = [15, 30, 50, 100, 250];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md font-sans">
      {/* Subtle Background Aurora Glows */}
      <div className="absolute -right-24 -top-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Multi-Vendor ROI Calculator
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Calculate your exact savings vs SaaS on-call tools
            </h3>
          </div>

          {/* Annual / Monthly Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-white/10 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setPeriod("annual")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                period === "annual" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Annual
            </button>
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                period === "monthly" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Vendor Selector Tabs */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select Your Current Tool
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {VENDORS.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVendorId(v.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedVendorId === v.id
                    ? "bg-white/10 border-blue-500/80 text-white shadow-md"
                    : "bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-950 hover:text-slate-200"
                }`}
              >
                <div className="font-bold text-xs truncate flex items-center justify-between">
                  <span>{v.name}</span>
                  {selectedVendorId === v.id && <Check className="w-3 h-3 text-blue-400 shrink-0" />}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  ${v.monthlyPerSeat}/seat/mo
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Slider & Input Controls */}
        <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              On-Call Responders & Engineers
            </label>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-xl border border-white/10 font-mono">
              <input
                type="number"
                min={1}
                max={500}
                value={engineers}
                onChange={(e) => setEngineers(Math.max(1, Math.min(500, Number(e.target.value))))}
                className="w-12 bg-transparent text-white font-black text-center focus:outline-none text-sm"
              />
              <span className="text-xs text-slate-400">seats</span>
            </div>
          </div>

          <input
            type="range"
            min={5}
            max={300}
            step={1}
            value={engineers}
            onChange={(e) => setEngineers(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />

          {/* Quick Preset Buttons */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Quick Presets:</span>
            <div className="flex items-center gap-1.5">
              {presetSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setEngineers(size)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-medium transition-all ${
                    engineers === size
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Estimated Organization Savings
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
              Save {formatCurrency(savings)}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1.5">
                /{period === "annual" ? "year" : "month"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Switching from <strong>{selectedVendor.name}</strong> ({formatCurrency(currentVendorCost)}/{period === "annual" ? "yr" : "mo"}) to <strong>OpsKnight</strong> ($0 forever).
            </p>
          </div>

          <Link
            href="/docs"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25"
          >
            Deploy OpsKnight ($0)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Multi-Competitor Breakdown Strip */}
        <div className="pt-2 border-t border-white/5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
            Annual Cost for {engineers} Engineers Across All Vendors:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
            {VENDORS.map((v) => (
              <div key={v.id} className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="text-slate-400 text-[10px] truncate">{v.name}</div>
                <div className="text-slate-200 font-mono font-bold mt-0.5">
                  {formatCurrency(engineers * v.monthlyPerSeat * 12)}
                </div>
              </div>
            ))}
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <div className="text-[10px] font-bold">OpsKnight</div>
              <div className="font-mono font-black mt-0.5">$0</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
