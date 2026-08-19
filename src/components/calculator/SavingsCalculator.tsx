"use client";

import { useState } from "react";
import { ArrowRight, Server, Users } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function SavingsCalculator() {
  const [engineers, setEngineers] = useState(30);
  const [rate, setRate] = useState("");
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [infraTier, setInfraTier] = useState<"vm" | "k8s">("vm");
  const [k8sMonthly, setK8sMonthly] = useState("");

  const monthlyPerSeat = Number.parseFloat(rate);
  const hasRate = Number.isFinite(monthlyPerSeat) && monthlyPerSeat > 0;
  const k8sParsed = Number.parseFloat(k8sMonthly);
  const hasK8s = Number.isFinite(k8sParsed) && k8sParsed >= 0;
  const multiplier = period === "annual" ? 12 : 1;
  const currentVendorCost = hasRate ? engineers * monthlyPerSeat * multiplier : 0;
  const infraMonthly = infraTier === "vm" ? 15 : hasK8s ? k8sParsed : null;
  const opsknightInfraCost =
    infraMonthly === null ? null : infraMonthly * multiplier;
  const netSavings =
    hasRate && opsknightInfraCost !== null
      ? Math.max(0, currentVendorCost - opsknightInfraCost)
      : null;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="w-full rounded-[14px] border border-slate-200 bg-white p-6 font-sans text-slate-900 sm:p-8">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Invoice sketch
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Per-user rates are what you type from your invoice — not official
              vendor list prices. Hosting is an assumption you can edit.
            </p>
          </div>
          <div className="flex items-center self-start rounded-[12px] border border-slate-200 bg-slate-100 p-1 sm:self-auto">
            <button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={`rounded-lg px-3 py-1 text-xs font-medium ${
                period === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setPeriod("annual")}
              className={`rounded-lg px-3 py-1 text-xs font-medium ${
                period === "annual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              <Users className="h-3.5 w-3.5" />
              Seats on the invoice
            </span>
            <input
              type="number"
              min={1}
              max={5000}
              value={engineers}
              onChange={(e) => setEngineers(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 focus:border-[#2563eb] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              $/user / month (your rate)
            </span>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="From your last invoice"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 focus:border-[#2563eb] focus:outline-none"
            />
          </label>
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              <Server className="h-3.5 w-3.5" />
              OpsKnight hosting
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setInfraTier("vm")}
                className={`rounded-[12px] border px-3 py-2.5 text-xs font-medium ${
                  infraTier === "vm"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                Small VM (example $15/mo)
              </button>
              <button
                type="button"
                onClick={() => setInfraTier("k8s")}
                className={`rounded-[12px] border px-3 py-2.5 text-xs font-medium ${
                  infraTier === "k8s"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                Kubernetes
              </button>
            </div>
          </div>
        </div>

        {infraTier === "k8s" && (
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              What do you pay for the cluster / Postgres / this workload per month?
            </span>
            <input
              type="number"
              min={0}
              step="1"
              placeholder="Your number — cluster + database, not $0"
              value={k8sMonthly}
              onChange={(e) => setK8sMonthly(e.target.value)}
              className="w-full max-w-md rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 focus:border-[#2563eb] focus:outline-none"
            />
            <p className="mt-1.5 text-[11px] text-slate-500">
              Kubernetes is not free. Enter what this workload costs you.
            </p>
          </label>
        )}

        {infraTier === "vm" && (
          <p className="text-xs text-slate-500">
            $15/mo is an example small VM. Change nothing here if that is close;
            for Kubernetes, switch and enter the real bill.
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2 rounded-[14px] border border-slate-200 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Current vendor {period === "annual" ? "annual" : "monthly"}
            </p>
            <p className="font-mono text-3xl font-semibold text-slate-900">
              {hasRate ? formatCurrency(currentVendorCost) : "—"}
            </p>
            <p className="text-[11px] text-slate-600">
              {hasRate
                ? `${engineers} × $${monthlyPerSeat}/mo${period === "annual" ? " × 12" : ""}`
                : "Enter a per-user rate from your invoice."}
            </p>
          </div>
          <div className="space-y-2 rounded-[14px] border border-slate-200 bg-blue-50/50 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-blue-700">
              OpsKnight {period === "annual" ? "annual" : "monthly"}
            </p>
            <p className="font-mono text-3xl font-semibold text-slate-900">
              {opsknightInfraCost === null ? "—" : formatCurrency(opsknightInfraCost)}
            </p>
            <p className="text-[11px] text-slate-600">
              $0 {BRAND.license} software + hosting you entered
            </p>
          </div>
          <div className="space-y-2 rounded-[14px] border border-slate-200 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Difference
            </p>
            <p className="font-mono text-3xl font-semibold text-slate-900">
              {netSavings === null ? "—" : formatCurrency(netSavings)}
            </p>
            <p className="text-[11px] text-slate-600">
              SMS, Slack, and Twilio are extra on both sides. List prices change —
              use your invoice.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            {BRAND.name} has no seat meter in the product.
          </p>
          <Link
            href={BRAND.links.docs}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[12px] bg-[#2563eb] px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Deploy docs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
