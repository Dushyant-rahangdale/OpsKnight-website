"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import {
  LIST_PLANS,
  PRICING_AS_OF,
  monthlyVendorCost,
  plansForVendor,
  vendorMeta,
} from "@/lib/compare-pricing";

function VendorMark({ vendor, logo }: { vendor: string; logo?: string }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={18}
        height={18}
        unoptimized
        className="h-[18px] w-[18px] object-contain"
      />
    );
  }
  const initial = vendor === "Your invoice" ? "$" : vendor.replace(/[^A-Za-z]/g, "").slice(0, 2);
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center rounded bg-slate-200 font-mono text-[9px] font-semibold text-slate-700">
      {initial}
    </span>
  );
}

export function SavingsCalculator() {
  const vendors = useMemo(() => vendorMeta(), []);
  const [vendorName, setVendorName] = useState(vendors[0].vendor);
  const vendorPlans = plansForVendor(vendorName);
  const [planId, setPlanId] = useState(vendorPlans[0].id);
  const [engineers, setEngineers] = useState(30);
  const [customRate, setCustomRate] = useState("");
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [infraTier, setInfraTier] = useState<"vm" | "k8s">("vm");
  const [k8sMonthly, setK8sMonthly] = useState("");

  const plan = LIST_PLANS.find((p) => p.id === planId) ?? vendorPlans[0];
  const parsedCustom = Number.parseFloat(customRate);
  const customOk = Number.isFinite(parsedCustom) && parsedCustom > 0;

  const quote = monthlyVendorCost(
    plan,
    engineers,
    period,
    plan.kind === "custom" && customOk ? parsedCustom : null,
  );

  const k8sParsed = Number.parseFloat(k8sMonthly);
  const hasK8s = Number.isFinite(k8sParsed) && k8sParsed >= 0;
  const multiplier = period === "annual" ? 12 : 1;
  const infraMonthly = infraTier === "vm" ? 15 : hasK8s ? k8sParsed : null;
  const opsknightCost = infraMonthly === null ? null : infraMonthly * multiplier;
  const netSavings =
    quote.amount != null && opsknightCost !== null
      ? Math.max(0, quote.amount - opsknightCost)
      : null;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  const selectVendor = (name: string) => {
    setVendorName(name);
    const next = plansForVendor(name)[0];
    setPlanId(next.id);
  };

  return (
    <div className="w-full rounded-[14px] border border-slate-200 bg-white p-4 font-sans text-slate-900 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Invoice sketch</h3>
          <p className="text-[11px] text-slate-500">
            Public list · {PRICING_AS_OF} · not a contract
          </p>
        </div>
        <div className="flex rounded-[10px] border border-slate-200 bg-slate-100 p-0.5">
          {(["monthly", "annual"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium capitalize ${
                period === p ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {vendors.map((v) => {
          const active = v.vendor === vendorName;
          return (
            <button
              key={v.vendor}
              type="button"
              onClick={() => selectVendor(v.vendor)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-[10px] border px-2.5 py-1.5 text-xs font-medium ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <VendorMark vendor={v.vendor} logo={v.logo} />
              <span className="whitespace-nowrap">{v.vendor}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Plan
          </span>
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="h-9 w-full rounded-[10px] border border-slate-200 bg-white px-2 font-sans text-xs text-slate-900 focus:border-[#d21a1b] focus:outline-none"
          >
            {vendorPlans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Seats
          </span>
          <input
            type="number"
            min={1}
            max={5000}
            value={engineers}
            onChange={(e) => setEngineers(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="h-9 w-full rounded-[10px] border border-slate-200 bg-white px-2 font-mono text-xs text-slate-900 focus:border-[#d21a1b] focus:outline-none"
          />
        </label>
        {plan.kind === "custom" ? (
          <label className="block">
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-slate-500">
              $/user / mo
            </span>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="Invoice"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              className="h-9 w-full rounded-[10px] border border-slate-200 bg-white px-2 font-mono text-xs text-slate-900 focus:border-[#d21a1b] focus:outline-none"
            />
          </label>
        ) : (
          <div>
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-slate-500">
              List rate
            </span>
            <p className="flex h-9 items-center rounded-[10px] border border-slate-100 bg-slate-50 px-2 font-mono text-xs text-slate-800">
              {plan.kind === "grafana_irm"
                ? "$19 + $20×extra"
                : quote.perSeatUsed != null
                  ? `$${quote.perSeatUsed}/user`
                  : "—"}
            </p>
          </div>
        )}
        <div>
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-slate-500">
            OpsKnight host
          </span>
          <div className="flex h-9 gap-1">
            <button
              type="button"
              onClick={() => setInfraTier("vm")}
              className={`flex-1 rounded-[10px] border text-[11px] font-medium ${
                infraTier === "vm"
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              VM $15
            </button>
            <button
              type="button"
              onClick={() => setInfraTier("k8s")}
              className={`flex-1 rounded-[10px] border text-[11px] font-medium ${
                infraTier === "k8s"
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              K8s
            </button>
          </div>
        </div>
      </div>

      {infraTier === "k8s" ? (
        <label className="mt-2 block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Cluster + Postgres $/mo
          </span>
          <input
            type="number"
            min={0}
            step="1"
            placeholder="Your bill for this workload"
            value={k8sMonthly}
            onChange={(e) => setK8sMonthly(e.target.value)}
            className="h-9 w-full max-w-xs rounded-[10px] border border-slate-200 px-2 font-mono text-xs focus:border-[#d21a1b] focus:outline-none"
          />
        </label>
      ) : null}

      {quote.blockedReason ? (
        <p className="mt-2 text-[11px] text-amber-800">{quote.blockedReason}</p>
      ) : null}

      <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-[12px] border border-slate-200 text-center">
        <div className="border-r border-slate-200 px-2 py-3">
          <p className="truncate text-[10px] font-medium uppercase tracking-wide text-slate-500">
            {plan.vendor}
          </p>
          <p className="mt-0.5 font-mono text-lg font-semibold text-slate-900 sm:text-xl">
            {quote.amount != null ? formatCurrency(quote.amount) : "—"}
          </p>
        </div>
        <div className="border-r border-slate-200 bg-red-50/60 px-2 py-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-red-700">
            {BRAND.name}
          </p>
          <p className="mt-0.5 font-mono text-lg font-semibold text-slate-900 sm:text-xl">
            {opsknightCost === null ? "—" : formatCurrency(opsknightCost)}
          </p>
        </div>
        <div className="px-2 py-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Diff</p>
          <p className="mt-0.5 font-mono text-lg font-semibold text-slate-900 sm:text-xl">
            {netSavings === null ? "—" : formatCurrency(netSavings)}
          </p>
        </div>
      </div>

      <p className="mt-2 text-[11px] leading-snug text-slate-500">
        {plan.note}
        {plan.sourceUrl ? (
          <>
            {" "}
            <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#d21a1b] hover:underline">
              Source
            </a>
          </>
        ) : null}{" "}
        Marks belong to their owners; used only to name the product. No affiliation.
        SMS and Slack are extra on both sides.
      </p>
    </div>
  );
}
