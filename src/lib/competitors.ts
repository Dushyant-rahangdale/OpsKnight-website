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
    category: "Atlassian — EOL 5 Apr 2027",
    commercialModel: "No new sales; existing per-user Cloud",
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
    name: "Grafana Cloud IRM",
    shortName: "Grafana IRM",
    href: "/compare/grafana-oncall",
    category: "Grafana Cloud (OnCall OSS archived)",
    commercialModel: "SaaS; ~$20/active user after 3 free",
  },
];

export const COMPARE_VENDOR_NAMES = [
  "OpsKnight",
  ...COMPETITORS.map((c) => c.shortName),
] as const;
