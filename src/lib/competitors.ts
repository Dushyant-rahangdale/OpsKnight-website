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
  listPrice: string;
};

/** Every commercial / OSS alternative we compare against — not just PagerDuty. */
export const COMPETITORS: Competitor[] = [
  {
    slug: "pagerduty",
    name: "PagerDuty",
    shortName: "PagerDuty",
    href: "/compare/pagerduty",
    category: "Enterprise SaaS",
    listPrice: "$21–$41 / user / mo",
  },
  {
    slug: "incidentio",
    name: "incident.io",
    shortName: "incident.io",
    href: "/compare/incidentio",
    category: "Slack-first SaaS",
    listPrice: "~$35 / user / mo",
  },
  {
    slug: "opsgenie",
    name: "Opsgenie",
    shortName: "Opsgenie",
    href: "/compare/opsgenie",
    category: "Atlassian SaaS",
    listPrice: "$11–$29 / user / mo",
  },
  {
    slug: "squadcast",
    name: "Squadcast",
    shortName: "Squadcast",
    href: "/compare/squadcast",
    category: "On-call SaaS",
    listPrice: "~$21 / user / mo",
  },
  {
    slug: "splunk",
    name: "Splunk On-Call",
    shortName: "Splunk",
    href: "/compare/splunk",
    category: "VictorOps / Splunk",
    listPrice: "~$23 / user / mo",
  },
  {
    slug: "grafana-oncall",
    name: "Grafana OnCall",
    shortName: "Grafana",
    href: "/compare/grafana-oncall",
    category: "OSS / Grafana Cloud",
    listPrice: "OSS or Cloud paid",
  },
];

export const COMPARE_VENDOR_NAMES = [
  "OpsKnight",
  ...COMPETITORS.map((c) => c.shortName),
] as const;
