"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Server, Users } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import {
  LIST_PLANS,
  PRICING_AS_OF,
  monthlyVendorCost,
  vendorGroups,
} from "@/lib/compare-pricing";

export function SavingsCalculator() {
  const [planId, setPlanId] = useState(LIST_PLANS[0].id);
  const [engineers, setEngineers] = useState(30);
  const [customRate, setCustomRate] = useState("");
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [infraTier, setInfraTier] = useState<"vm" | "k8s">("vm");
  const [k8sMonthly, setK8sMonthly] = useState("");

  const plan = LIST_PLANS.find((p) => p.id === planId) ?? LIST_PLANS[0];
  const parsedCustom = Number.parseFloat(customRate);
  const customOk = Number.isFinite(parsedCustom) && parsedCustom > 0;

  const vendor = monthlyVendorCost(
    plan,
    engineers,
    period,
    plan.kind === "custom" && customOk ? parsedCustom : null,
  );

  const k8sParsed = Number.parseFloat(k8sMonthly);
  const hasK8s = Number.isFinite(k8sParsed) && k8sParsed >= 0;
  const multiplier = period === "annual" ? 12 : 1;
  const infraMonthly = infraTier === "vm" ? 15 : hasK8s ? k8sParsed : null;
  const opsknightInfraCost =
    infraMonthly === null ? null : infraMonthly * multiplier;
  const netSavings =
    vendor.amount != null && opsknightInfraCost !== null
      ? Math.max(0, vendor.amount - opsknightInfraCost)
      : null;

  const groups = useMemo(() => vendorGroups(), []);

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
              Public list categories as of {PRICING_AS_OF}. Not your negotiated
              contract. Opsgenie is not listed — Atlassian is not selling new
              standalone seats. Hosting for OpsKnight is an assumption you can edit.
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

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Product and public plan
          </p>
          <div className="space-y-4">
            {groups.map((vendorName) => (
              <div key={vendorName}>
                <p className="mb-2 font-mono text-[11px] text-slate-400">{vendorName}</p>
                <div className="flex flex-wrap gap-2">
                  {LIST_PLANS.filter((p) => p.vendor === vendorName).map((p) => {
                    const active = p.id === planId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlanId(p.id)}
                        className={`rounded-[12px] border px-3 py-2 text-left text-xs font-medium ${
                          active
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
            {plan.note}
            {plan.sourceUrl ? (
              <>
                {" "}
                <a
                  href={plan.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2563eb] hover:underline"
                >
                  Source
                </a>
              </>
            ) : null}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              <Users className="h-3.5 w-3.5" />
              Seats / active users
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
          {plan.kind === "custom" ? (
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                $/user / month on the invoice
              </span>
              <input
                type="number"
                min={0}
                step="0.01"
                placeholder="Your contracted rate"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                className="w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 focus:border-[#2563eb] focus:outline-none"
              />
            </label>
          ) : (
            <div className="rounded-[12px] border border-slate-100 bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                List used
              </p>
              <p className="mt-1 font-mono text-sm text-slate-900">
                {plan.kind === "grafana_irm"
                  ? `$19 platform + $20 × max(0, seats − 3)`
                  : vendor.perSeatUsed != null
                    ? `$${vendor.perSeatUsed}/user/mo`
                    : "—"}
              </p>
            </div>
          )}
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

        {vendor.blockedReason ? (
          <p className="rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {vendor.blockedReason}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2 rounded-[14px] border border-slate-200 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              {plan.vendor} {period === "annual" ? "annual" : "monthly"}
            </p>
            <p className="font-mono text-3xl font-semibold text-slate-900">
              {vendor.amount != null ? formatCurrency(vendor.amount) : "—"}
            </p>
            <p className="text-[11px] text-slate-600">
              {vendor.amount != null
                ? `${engineers} seats on ${plan.name}`
                : vendor.blockedReason
                  ? "Pick another plan or Your invoice."
                  : "Choose a plan."}
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
              SMS, Slack, and Twilio are extra on both sides. List prices change.
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
            Install docs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
