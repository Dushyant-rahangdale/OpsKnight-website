"use client";

import { useState } from "react";
import { Users, Sparkles } from "lucide-react";

export function SavingsCalculator() {
  const [engineers, setEngineers] = useState<number>(30);
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");

  const PAGERDUTY_MONTHLY = 41; // Business tier monthly
  const multiplier = period === "annual" ? 12 : 1;

  const pdCost = engineers * PAGERDUTY_MONTHLY * multiplier;
  const savings = pdCost;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Subtle Background Glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3" />
              Per-Seat Tax Calculator
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Estimate your annual infrastructure savings
            </h3>
          </div>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-white/10 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setPeriod("annual")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                period === "annual" ? "bg-red-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Annual
            </button>
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                period === "monthly" ? "bg-red-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Interactive Controls & Live ROI Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6">
          
          {/* Slider & Input (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-400" />
                Responders & Engineers
              </label>
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-xl border border-white/10 font-mono">
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
              max={250}
              step={1}
              value={engineers}
              onChange={(e) => setEngineers(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>5 seats</span>
              <span>50 seats</span>
              <span>150 seats</span>
              <span>250+ seats</span>
            </div>
          </div>

          {/* Savings Result Card (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 text-center relative shadow-lg">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Legacy Vendor Cost vs OpsKnight ($0)
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight my-1">
              Save {formatCurrency(savings)}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">/{period === "annual" ? "yr" : "mo"}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              PagerDuty: <span className="line-through text-red-400">{formatCurrency(pdCost)}</span> → OpsKnight: <span className="text-emerald-400 font-bold">$0</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
