import { BRAND } from "@/lib/brand";

/**
 * Compare matrix for OpsKnight v1.3.1 vs common on-call products.
 *
 * OpsKnight cells are taken from the application (Prisma models, notification
 * channels, docs v1.3). Competitor cells are limited to product-category facts
 * (SaaS vs self-host, license, typical commercial model). Feature depth at
 * other vendors is not audited here.
 */

export type CompareVendorId =
  | "opsknight"
  | "pagerduty"
  | "incidentio"
  | "opsgenie"
  | "squadcast"
  | "splunk"
  | "grafana";

export type CompareCell = boolean | string;

export const COMPARE_VENDORS: {
  id: CompareVendorId;
  label: string;
  highlight?: boolean;
}[] = [
  { id: "opsknight", label: BRAND.name, highlight: true },
  { id: "pagerduty", label: "PagerDuty" },
  { id: "incidentio", label: "incident.io" },
  { id: "opsgenie", label: "Opsgenie" },
  { id: "squadcast", label: "Squadcast" },
  { id: "splunk", label: "Splunk On-Call" },
  { id: "grafana", label: "Grafana OnCall" },
];

export type CompareRow = {
  feature: string;
  source?: string;
  values: Record<CompareVendorId, CompareCell>;
};

export type CompareSection = {
  title: string;
  rows: CompareRow[];
};

const saas = "SaaS";
const selfHost = "Self-hosted";
const perSeat = "Per-seat (typical)";
const ossOrCloud = "OSS and/or Cloud";

export const COMPARE_SECTIONS: CompareSection[] = [
  {
    title: "How you run it",
    rows: [
      {
        feature: "Deployment",
        source: "OpsKnight: Docker Compose and Helm. Others: public product model.",
        values: {
          opsknight: selfHost,
          pagerduty: saas,
          incidentio: saas,
          opsgenie: saas,
          squadcast: saas,
          splunk: saas,
          grafana: ossOrCloud,
        },
      },
      {
        feature: "Software license",
        source: "OpsKnight package.json and LICENSE (Apache-2.0). Grafana OnCall OSS is AGPL.",
        values: {
          opsknight: "Apache-2.0",
          pagerduty: "Proprietary",
          incidentio: "Proprietary",
          opsgenie: "Proprietary",
          squadcast: "Proprietary",
          splunk: "Proprietary",
          grafana: "AGPL (OSS)",
        },
      },
      {
        feature: "User pricing model",
        source: "OpsKnight has no seat meter in the product. SaaS vendors sell per-user plans.",
        values: {
          opsknight: "$0 software, unlimited users",
          pagerduty: perSeat,
          incidentio: perSeat,
          opsgenie: perSeat,
          squadcast: perSeat,
          splunk: perSeat,
          grafana: "OSS free; Cloud paid",
        },
      },
      {
        feature: "Incident data location",
        values: {
          opsknight: "Your database / VPC",
          pagerduty: "Vendor cloud",
          incidentio: "Vendor cloud",
          opsgenie: "Vendor cloud",
          squadcast: "Vendor cloud",
          splunk: "Vendor cloud",
          grafana: "Your install or Grafana Cloud",
        },
      },
    ],
  },
  {
    title: "Incident response (OpsKnight v1.3.1)",
    rows: [
      {
        feature: "Incident lifecycle",
        source: "Prisma IncidentStatus: OPEN, ACKNOWLEDGED, SNOOZED, SUPPRESSED, RESOLVED.",
        values: {
          opsknight: "Open, ack, snooze, suppress, resolve",
          pagerduty: true,
          incidentio: true,
          opsgenie: true,
          squadcast: true,
          splunk: true,
          grafana: true,
        },
      },
      {
        feature: "On-call schedules",
        source: "OnCallSchedule, layers, rotation hours, overrides, timezones.",
        values: {
          opsknight: "Layers, rotations, overrides, TZ",
          pagerduty: true,
          incidentio: true,
          opsgenie: true,
          squadcast: true,
          splunk: true,
          grafana: true,
        },
      },
      {
        feature: "Escalation policies",
        source: "EscalationPolicy + EscalationRule with user, schedule, or team targets.",
        values: {
          opsknight: true,
          pagerduty: true,
          incidentio: true,
          opsgenie: true,
          squadcast: true,
          splunk: true,
          grafana: true,
        },
      },
      {
        feature: "Outbound paging channels",
        source: "Prisma NotificationChannel: EMAIL, SMS, PUSH, SLACK, WEBHOOK, WHATSAPP. No VOICE.",
        values: {
          opsknight: "Email, SMS, push, Slack, WhatsApp, webhook",
          pagerduty: "Includes phone/SMS (SaaS)",
          incidentio: "SaaS channels",
          opsgenie: "SaaS channels",
          squadcast: "SaaS channels",
          splunk: "SaaS channels",
          grafana: "OSS/Cloud channels",
        },
      },
      {
        feature: "Native voice / phone calls",
        source: "Not a NotificationChannel. Do not claim voice paging.",
        values: {
          opsknight: false,
          pagerduty: true,
          incidentio: "Vendor docs",
          opsgenie: "Vendor docs",
          squadcast: "Vendor docs",
          splunk: "Vendor docs",
          grafana: "Vendor docs",
        },
      },
      {
        feature: "Slack ChatOps war rooms",
        source: "Slack OAuth + war room tests; 1-click ack/resolve cards.",
        values: {
          opsknight: true,
          pagerduty: "SaaS product",
          incidentio: "Core product",
          opsgenie: "SaaS product",
          squadcast: "SaaS product",
          splunk: "SaaS product",
          grafana: "Slack support (OSS/Cloud)",
        },
      },
      {
        feature: "Microsoft Teams ChatOps",
        source: "Outgoing webhook payload formatter only — not a native Teams app.",
        values: {
          opsknight: "Webhook payload only",
          pagerduty: "SaaS product",
          incidentio: "Vendor docs",
          opsgenie: "SaaS product",
          squadcast: "Vendor docs",
          splunk: "Vendor docs",
          grafana: "Vendor docs",
        },
      },
      {
        feature: "Video bridge on incident",
        source: "Jitsi URL generation; Zoom/Meet via configured URL template.",
        values: {
          opsknight: "Jitsi; Zoom/Meet URL templates",
          pagerduty: "SaaS product",
          incidentio: "SaaS product",
          opsgenie: "Vendor docs",
          squadcast: "Vendor docs",
          splunk: "Vendor docs",
          grafana: "Vendor docs",
        },
      },
      {
        feature: "Postmortems + action items",
        source: "Postmortem and ActionItem models and app routes.",
        values: {
          opsknight: true,
          pagerduty: "SaaS product",
          incidentio: "SaaS product",
          opsgenie: "SaaS product",
          squadcast: "SaaS product",
          splunk: "SaaS product",
          grafana: "Vendor docs",
        },
      },
      {
        feature: "Status page",
        source: "StatusPage model: custom domain, public/restricted/private, subscribers. Multiple independent pages per team is listed as upcoming on the roadmap.",
        values: {
          opsknight: "Included (custom domain, privacy modes)",
          pagerduty: "Often a paid add-on",
          incidentio: "SaaS product",
          opsgenie: "SaaS / Atlassian",
          squadcast: "SaaS product",
          splunk: "SaaS product",
          grafana: "Separate Grafana product",
        },
      },
      {
        feature: "MTTA / MTTR / SLA",
        source: "SLADefinition, snapshots, analytics routes.",
        values: {
          opsknight: true,
          pagerduty: "SaaS product",
          incidentio: "SaaS product",
          opsgenie: "SaaS product",
          squadcast: "SaaS product",
          splunk: "SaaS product",
          grafana: "Vendor docs",
        },
      },
      {
        feature: "Mobile",
        source: "Installable PWA with push and biometric gate. No App Store / Play listing.",
        values: {
          opsknight: "PWA (push, biometrics)",
          pagerduty: "Native apps",
          incidentio: "SaaS apps",
          opsgenie: "Native apps",
          squadcast: "SaaS apps",
          splunk: "SaaS apps",
          grafana: "Vendor docs",
        },
      },
    ],
  },
  {
    title: "Integrations & platform",
    rows: [
      {
        feature: "Inbound monitoring webhooks",
        source: "Docs v1.3 integrations catalog; 24+ native routes with HMAC.",
        values: {
          opsknight: "24+ native parsers",
          pagerduty: "Large SaaS catalog",
          incidentio: "SaaS catalog",
          opsgenie: "SaaS catalog",
          squadcast: "SaaS catalog",
          splunk: "SaaS catalog",
          grafana: "Grafana stack",
        },
      },
      {
        feature: "PagerDuty Events API v2 drop-in",
        source: "/api/v2/enqueue compatibility in OpsKnight.",
        values: {
          opsknight: true,
          pagerduty: "Native",
          incidentio: false,
          opsgenie: false,
          squadcast: false,
          splunk: false,
          grafana: false,
        },
      },
      {
        feature: "Jira Cloud",
        source: "Bi-directional issue sync in v1.3.",
        values: {
          opsknight: "Bi-directional",
          pagerduty: "SaaS product",
          incidentio: "SaaS product",
          opsgenie: "Atlassian family",
          squadcast: "SaaS product",
          splunk: "Vendor docs",
          grafana: "Vendor docs",
        },
      },
      {
        feature: "REST API keys",
        source: "ApiKey model and settings/api-keys.",
        values: {
          opsknight: true,
          pagerduty: true,
          incidentio: true,
          opsgenie: true,
          squadcast: true,
          splunk: true,
          grafana: true,
        },
      },
      {
        feature: "SSO",
        source: "OIDC (Okta, Google, Microsoft, Auth0, generic). No SAML in v1.3 docs.",
        values: {
          opsknight: "OIDC",
          pagerduty: "SaaS IdP integrations",
          incidentio: "SaaS IdP integrations",
          opsgenie: "Atlassian SSO",
          squadcast: "SaaS IdP integrations",
          splunk: "SaaS IdP integrations",
          grafana: "Grafana auth",
        },
      },
      {
        feature: "RBAC + audit log",
        source: "Role USER/ADMIN/RESPONDER; AuditLog model.",
        values: {
          opsknight: true,
          pagerduty: true,
          incidentio: true,
          opsgenie: true,
          squadcast: true,
          splunk: true,
          grafana: true,
        },
      },
    ],
  },
];

export const OPKNIGHT_GAPS = [
  {
    item: "Native voice / phone paging",
    detail: "Channels are email, SMS, push, Slack, WhatsApp, and webhooks.",
  },
  {
    item: "Native Microsoft Teams app",
    detail: "Teams can receive a formatted outgoing webhook; there is no Teams ChatOps product.",
  },
  {
    item: "SAML SSO",
    detail: "SSO in v1.3.1 is OIDC only.",
  },
  {
    item: "OpsKnight-hosted cloud",
    detail: "There is no paid Enterprise Cloud. You operate the container.",
  },
  {
    item: "Multiple independent status pages per team",
    detail: "A status page with custom domain and privacy modes ships today. Multi-page/team custom domains is on the public roadmap.",
  },
  {
    item: "AI alert correlation / auto postmortems",
    detail: "Listed as upcoming on ROADMAP.md. Postmortems are authored from the incident timeline, not generated by a model.",
  },
];

export function vendorIdFromCompareSlug(slug: string): CompareVendorId | null {
  switch (slug) {
    case "pagerduty":
      return "pagerduty";
    case "incidentio":
    case "incident-io":
      return "incidentio";
    case "opsgenie":
      return "opsgenie";
    case "squadcast":
      return "squadcast";
    case "splunk":
    case "victorops":
      return "splunk";
    case "grafana-oncall":
      return "grafana";
    default:
      return null;
  }
}

export const COMPARE_FOOTNOTE =
  "OpsKnight column: v1.3.1 application and docs. Other columns: deployment and commercial model only, plus widely established product category (these vendors sell on-call). We do not claim a full feature audit of third-party plans. Confirm current packaging and price on each vendor’s site.";
