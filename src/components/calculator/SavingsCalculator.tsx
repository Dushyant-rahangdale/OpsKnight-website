"use client";

import { useState } from "react";
import { Check, ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export function SavingsCalculator() {
  const [engineers, setEngineers] = useState<number>(30);
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");

  const PAGERDUTY_MONTHLY = 41; // Business tier monthly
  const OPSGENIE_MONTHLY = 23.10; // Enterprise tier monthly

  const multiplier = period === "annual" ? 12 : 1;

  const pdCost = engineers * PAGERDUTY_MONTHLY * multiplier;
  const ogCost = engineers * OPSGENIE_MONTHLY * multiplier;
  const savings = pdCost;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const features = [
    "Unlimited responders & team members",
    "Unlimited monitoring services & alerts",
    "Multi-tier escalation & schedule overrides",
    "Slack war rooms & ChatOps",
    "Public & private branded status pages",
    "100% private VPC data sovereignty"
  ];

  return (
    <section id="roi-calculator" className="py-28 bg-slate-950 text-white border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-5xl mx-auto bg-slate-900/90 text-white rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Header & Controls */}
          <div className="p-8 md:p-12 text-center border-b border-white/5 bg-slate-950/80">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              Transparent ROI Math
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Calculate Your &ldquo;Per-Seat Tax&rdquo; Savings
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg mb-8 leading-relaxed">
              Stop penalizing your engineering organization for expanding. OpsKnight is 100% open-source (AGPL-3.0) and eliminates per-seat on-call pricing forever.
            </p>

            {/* Annual / Monthly Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 mb-8">
              <button
                onClick={() => setPeriod("annual")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  period === "annual" ? "bg-red-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Annual Savings
              </button>
              <button
                onClick={() => setPeriod("monthly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  period === "monthly" ? "bg-red-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Savings
              </button>
            </div>

            {/* Controls Box */}
            <div className="max-w-xl mx-auto bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Engineering Organization Size
                </label>
                <div className="flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-xl border border-white/10">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={engineers}
                    onChange={(e) => setEngineers(Math.max(1, Number(e.target.value)))}
                    className="w-16 bg-transparent text-white font-black text-center font-mono focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-medium">engineers</span>
                </div>
              </div>

              <input
                type="range"
                min={5}
                max={250}
                step={1}
                value={engineers}
                onChange={(e) => setEngineers(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>5 engineers</span>
                <span>100 engineers</span>
                <span>250 engineers</span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-slate-950/40">
            {/* PagerDuty */}
            <div className="p-8 bg-slate-950/60 flex flex-col items-center justify-center text-center opacity-80">
              <h3 className="text-lg font-bold text-slate-300 mb-1">PagerDuty</h3>
              <div className="text-xs text-slate-500 mb-6 uppercase tracking-wider font-semibold">Business Plan ($41/mo)</div>
              <div className="text-3xl font-black text-slate-200 mb-1 font-mono">{formatCurrency(pdCost)}</div>
              <div className="text-xs text-slate-500">{period === "annual" ? "per year" : "per month"}</div>
              <div className="mt-4 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-white/5">
                Per-seat invoice
              </div>
            </div>

            {/* Opsgenie */}
            <div className="p-8 bg-slate-950/60 flex flex-col items-center justify-center text-center opacity-80">
              <h3 className="text-lg font-bold text-slate-300 mb-1">Opsgenie</h3>
              <div className="text-xs text-slate-500 mb-6 uppercase tracking-wider font-semibold">Enterprise Plan ($23.10/mo)</div>
              <div className="text-3xl font-black text-slate-200 mb-1 font-mono">{formatCurrency(ogCost)}</div>
              <div className="text-xs text-slate-500">{period === "annual" ? "per year" : "per month"}</div>
              <div className="mt-4 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-white/5">
                Per-seat invoice
              </div>
            </div>

            {/* OpsKnight */}
            <div className="p-8 bg-gradient-to-b from-red-950/30 via-slate-900/60 to-slate-950 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-500 to-amber-500"></div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                OpsKnight Community
              </div>

              <div className="text-4xl sm:text-5xl font-black text-white mb-1 font-mono tracking-tight">$0</div>
              <div className="text-xs text-slate-400 font-medium">Free Forever (AGPL-3.0)</div>

              <div className="w-full my-4 py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs text-slate-300 block">Total Organization Savings:</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  {formatCurrency(savings)} / {period === "annual" ? "yr" : "mo"}
                </span>
              </div>
            </div>
          </div>

          {/* Included Features List */}
          <div className="p-8 md:p-10 bg-slate-900/80 border-t border-white/10">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 text-center">
              Everything Included in OpsKnight Community ($0 Forever)
            </h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-lg shadow-red-600/30"
              >
                + Deploy Community Edition Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
