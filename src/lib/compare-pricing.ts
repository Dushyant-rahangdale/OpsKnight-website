/**
 * Public list-price categories for the compare calculator.
 * As of 20 Aug 2026. Opsgenie is omitted: Atlassian is not selling new standalone seats.
 * Splunk On-Call public SKU is the “starting at $5, up to 10 seats, annual” line on splunk.com/pricing.
 */

export const PRICING_AS_OF = "20 Aug 2026";

export type PricingKind = "per_seat" | "grafana_irm" | "custom";

export type ListPlan = {
  id: string;
  vendor: string;
  name: string;
  kind: PricingKind;
  /** Path under /public for a mark we already ship. Omit rather than invent a logo. */
  logo?: string;
  /** USD per user per month on a month-to-month contract, if published. */
  monthlyPerSeat?: number;
  /** USD per user per month when billed annually, if published. */
  annualPerSeat?: number;
  grafana?: {
    platformMonthly: number;
    includedUsers: number;
    extraPerSeat: number;
  };
  /** Public SKU seat cap, if the vendor states one. */
  maxSeats?: number;
  note: string;
  sourceUrl: string;
};

export const LIST_PLANS: ListPlan[] = [
  {
    id: "pd-professional",
    vendor: "PagerDuty",
    name: "Professional",
    kind: "per_seat",
    logo: "/integrations/pagerduty.svg",
    monthlyPerSeat: 25,
    annualPerSeat: 21,
    note: "Incident Response Professional on pagerduty.com/pricing. Status Pages, AIOps, and stakeholders are add-ons.",
    sourceUrl: "https://www.pagerduty.com/pricing/",
  },
  {
    id: "inc-team-oncall",
    vendor: "incident.io",
    name: "Team + On-call",
    kind: "per_seat",
    monthlyPerSeat: 29,
    annualPerSeat: 25,
    note: "Team $19/mo or $15/mo annual, plus On-call +$10. Responder and On-call are separate seats on their site.",
    sourceUrl: "https://incident.io/pricing",
  },
  {
    id: "inc-pro-oncall",
    vendor: "incident.io",
    name: "Pro + On-call",
    kind: "per_seat",
    monthlyPerSeat: 45,
    annualPerSeat: 45,
    note: "Pro $25/user/mo plus On-call +$20. Pro annual for the base seat is not listed separately; $25 is the published Pro rate.",
    sourceUrl: "https://incident.io/pricing",
  },
  {
    id: "inc-oncall-only",
    vendor: "incident.io",
    name: "On-call only",
    kind: "per_seat",
    monthlyPerSeat: 20,
    annualPerSeat: 20,
    note: "On-call product without the full Response seat, as listed on incident.io/pricing.",
    sourceUrl: "https://incident.io/pricing",
  },
  {
    id: "squad-pro",
    vendor: "Squadcast",
    name: "Pro",
    kind: "per_seat",
    monthlyPerSeat: 15,
    annualPerSeat: 15,
    note: "SolarWinds Incident Response Pro: $15/user/mo billed annually. Month-to-month is not listed; the calculator uses $15.",
    sourceUrl: "https://www.squadcast.com/pricing",
  },
  {
    id: "squad-premium",
    vendor: "Squadcast",
    name: "Premium",
    kind: "per_seat",
    monthlyPerSeat: 24,
    annualPerSeat: 24,
    note: "Premium $24/user/mo billed annually. Includes status pages. Month-to-month is not listed.",
    sourceUrl: "https://www.squadcast.com/pricing",
  },
  {
    id: "grafana-irm-pro",
    vendor: "Grafana Cloud IRM",
    name: "Pro (active users)",
    kind: "grafana_irm",
    logo: "/integrations/grafana.svg",
    grafana: { platformMonthly: 19, includedUsers: 3, extraPerSeat: 20 },
    note: "$19/mo platform includes 3 active IRM users, then $20 per extra active user (grafana.com/products/cloud/irm).",
    sourceUrl: "https://grafana.com/products/cloud/irm/",
  },
  {
    id: "splunk-oncall-start",
    vendor: "Splunk On-Call",
    name: "Starting SKU (≤10 seats)",
    kind: "per_seat",
    logo: "/integrations/splunk.svg",
    annualPerSeat: 5,
    maxSeats: 10,
    note: "Official line: from $5/user/mo billed annually, up to 10 seats. Larger orgs are a sales quote.",
    sourceUrl: "https://www.splunk.com/en_us/products/pricing.html",
  },
  {
    id: "custom",
    vendor: "Your invoice",
    name: "Type the rate",
    kind: "custom",
    note: "Use this for PagerDuty Business/Enterprise, Splunk above 10 seats, or any contract that is not on a public list.",
    sourceUrl: "",
  },
];

export function vendorMeta(): { vendor: string; logo?: string }[] {
  const seen = new Map<string, string | undefined>();
  for (const p of LIST_PLANS) {
    if (!seen.has(p.vendor)) seen.set(p.vendor, p.logo);
  }
  return [...seen.entries()].map(([vendor, logo]) => ({ vendor, logo }));
}

export function plansForVendor(vendor: string) {
  return LIST_PLANS.filter((p) => p.vendor === vendor);
}

export function monthlyVendorCost(
  plan: ListPlan,
  seats: number,
  period: "monthly" | "annual",
  customRate: number | null,
): { amount: number | null; blockedReason?: string; perSeatUsed?: number } {
  if (plan.kind === "custom") {
    if (customRate == null || customRate <= 0) return { amount: null };
    const monthly = seats * customRate;
    return {
      amount: period === "annual" ? monthly * 12 : monthly,
      perSeatUsed: customRate,
    };
  }

  if (plan.maxSeats && seats > plan.maxSeats) {
    return {
      amount: null,
      blockedReason: `This public SKU is listed for up to ${plan.maxSeats} seats. Pick “Your invoice” for a larger contract.`,
    };
  }

  if (plan.kind === "grafana_irm" && plan.grafana) {
    const { platformMonthly, includedUsers, extraPerSeat } = plan.grafana;
    const extra = Math.max(0, seats - includedUsers);
    const monthly = platformMonthly + extra * extraPerSeat;
    return { amount: period === "annual" ? monthly * 12 : monthly };
  }

  const perSeat =
    period === "annual"
      ? (plan.annualPerSeat ?? plan.monthlyPerSeat)
      : (plan.monthlyPerSeat ?? plan.annualPerSeat);

  if (perSeat == null) {
    return { amount: null, blockedReason: "This plan has no public month-to-month rate. Switch to Annual or Your invoice." };
  }

  const monthly = seats * perSeat;
  return {
    amount: period === "annual" ? monthly * 12 : monthly,
    perSeatUsed: perSeat,
  };
}
