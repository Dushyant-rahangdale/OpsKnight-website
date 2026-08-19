export type CompetitorSlug =
  | "pagerduty"
  | "incidentio"
  | "opsgenie"
  | "squadcast"
  | "splunk"
  | "grafana-oncall";

export type Competitor = {
  slug: CompetitorSlug;
  name: string;
  shortName: string;
  href: `/compare/${string}`;
  category: string;
  commercialModel: string;
};

/** Every commercial / OSS alternative we compare against — not just PagerDuty. */
export const COMPETITORS: Competitor[] = [
  {
    slug: "pagerduty",
    name: "PagerDuty",
    shortName: "PagerDuty",
    href: "/compare/pagerduty",
    category: "Enterprise SaaS",
    commercialModel: "Vendor-hosted, per-seat (typical)",
  },
  {
    slug: "incidentio",
    name: "incident.io",
    shortName: "incident.io",
    href: "/compare/incidentio",
    category: "Slack-first SaaS",
    commercialModel: "Vendor-hosted, per-seat (typical)",
  },
  {
    slug: "opsgenie",
    name: "Opsgenie",
    shortName: "Opsgenie",
    href: "/compare/opsgenie",
    category: "Atlassian SaaS",
    commercialModel: "Vendor-hosted, per-seat (typical)",
  },
  {
    slug: "squadcast",
    name: "Squadcast",
    shortName: "Squadcast",
    href: "/compare/squadcast",
    category: "On-call SaaS",
    commercialModel: "Vendor-hosted, per-seat (typical)",
  },
  {
    slug: "splunk",
    name: "Splunk On-Call",
    shortName: "Splunk",
    href: "/compare/splunk",
    category: "VictorOps / Splunk",
    commercialModel: "Vendor-hosted, per-seat (typical)",
  },
  {
    slug: "grafana-oncall",
    name: "Grafana OnCall",
    shortName: "Grafana",
    href: "/compare/grafana-oncall",
    category: "OSS / Grafana Cloud",
    commercialModel: "Self-host OSS (AGPL) and/or Grafana Cloud paid",
  },
];

export const COMPARE_VENDOR_NAMES = [
  "OpsKnight",
  ...COMPETITORS.map((c) => c.shortName),
] as const;
