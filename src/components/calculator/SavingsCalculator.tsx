"use client";

import React, { useState } from "react";
import { Check, ArrowRight, DollarSign, Users } from "lucide-react";
import Link from "next/link";

export function SavingsCalculator() {
  const [engineers, setEngineers] = useState<number>(30);

  const PAGERDUTY_PRICE = 492; // Business tier annual ($41/mo)
  const OPSGENIE_PRICE = 277.2; // Enterprise tier annual ($23.10/mo)

  const pdCost = engineers * PAGERDUTY_PRICE;
  const ogCost = engineers * OPSGENIE_PRICE;
  const savings = engineers * PAGERDUTY_PRICE;

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
    <section className="py-24 bg-slate-950 text-white border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-5xl mx-auto bg-slate-900/90 text-white rounded-3xl border border-white/10 overflow-hidden shadow-2xl font-sans">
          <div className="p-8 md:p-12 text-center border-b border-white/5 bg-slate-950/80">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              Transparent ROI Math
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Calculate Your &ldquo;Per-Seat Tax&rdquo; Savings</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg mb-8 leading-relaxed">
              Stop punishing your engineering organization for growing. OpsKnight is open-source (AGPL-3.0) and fundamentally eliminates per-seat on-call pricing.
            </p>

            <div className="max-w-xl mx-auto bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Engineering Team Size
                </label>
                <div className="text-2xl font-black text-white bg-slate-950 px-4 py-1.5 rounded-xl border border-white/10 font-mono">
                  {engineers} engineers
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

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-slate-950/40">
            {/* PagerDuty */}
            <div className="p-8 bg-slate-950/60 flex flex-col items-center justify-center text-center opacity-80">
              <h3 className="text-lg font-bold text-slate-300 mb-1">PagerDuty</h3>
              <div className="text-xs text-slate-500 mb-6 uppercase tracking-wider font-semibold">Business Plan</div>
              <div className="text-3xl font-black text-slate-200 mb-1 font-mono">{formatCurrency(pdCost)}</div>
              <div className="text-xs text-slate-500">per year</div>
              <div className="mt-4 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-white/5">
                $41 / user / month
              </div>
            </div>

            {/* Opsgenie */}
            <div className="p-8 bg-slate-950/60 flex flex-col items-center justify-center text-center opacity-80">
              <h3 className="text-lg font-bold text-slate-300 mb-1">Opsgenie</h3>
              <div className="text-xs text-slate-500 mb-6 uppercase tracking-wider font-semibold">Enterprise Plan</div>
              <div className="text-3xl font-black text-slate-200 mb-1 font-mono">{formatCurrency(ogCost)}</div>
              <div className="text-xs text-slate-500">per year</div>
              <div className="mt-4 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-white/5">
                $23.10 / user / month
              </div>
            </div>

            {/* OpsKnight */}
            <div className="p-8 bg-gradient-to-b from-red-950/30 via-slate-900/60 to-slate-950 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-500 to-amber-500"></div>
              
              <h3 className="text-xl font-black text-white mb-1">OpsKnight</h3>
              <div className="text-xs text-emerald-400 font-bold mb-6 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Community Edition
              </div>
              
              <div className="text-4xl font-black text-white mb-1 font-mono">$0</div>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Free Forever · AGPL-3.0</div>
              
              <div className="mt-6 mb-6 space-y-2.5 w-full text-left">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto w-full pt-6 border-t border-white/10">
                <div className="text-emerald-400 font-bold text-sm mb-4 flex items-center justify-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Save {formatCurrency(savings)} every year
                </div>
                <Link 
                  href="/docs" 
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 group text-sm"
                >
                  + Deploy Community Edition ($0)
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
