/**
 * OpsSentinel Brand Constants
 *
 * Centralized brand configuration for consistent usage across the website.
 */

export const BRAND = {
    name: "OpsSentinel",
    tagline: "Open Source Incident Response",
    description: "The complete open-source platform for on-call management, incident response, and status pages.",
    fullDescription: "OpsSentinel is building the ultimate self-hosted command center for modern engineering teams. Self-hosted, extensible, and built for DevOps & SRE teams.",
    domain: "opssentinel.io",

    // Status
    status: "In Development",
    statusMessage: "Launching Soon",

    links: {
        github: "https://github.com/Dushyant-rahangdale/OpsSentinel",
        sponsor: "https://github.com/sponsors/Dushyant-rahangdale",
        docs: "/docs/v1",
        twitter: "https://twitter.com/opssentinel",
        email: "hello@opssentinel.io",
        issues: "https://github.com/Dushyant-rahangdale/OpsSentinel/issues",
        discussions: "https://github.com/Dushyant-rahangdale/OpsSentinel/discussions",
        releases: "https://github.com/Dushyant-rahangdale/OpsSentinel/releases",
        contributing: "https://github.com/Dushyant-rahangdale/OpsSentinel/blob/main/CONTRIBUTING.md",
        license: "https://github.com/Dushyant-rahangdale/OpsSentinel/blob/main/LICENSE",
        security: "https://github.com/Dushyant-rahangdale/OpsSentinel/security",
    },

    // Assets
    assets: {
        logo: "/logo-compressed.png",
        logoSvg: "/logo.svg",
        banner: "/banner.png",
        dashboard: "/dashboard-command-center.png",
    },

    // SEO
    seo: {
        title: "OpsSentinel | Open-Source Incident Management Platform",
        description: "The complete open-source platform for on-call management, incident response, and status pages. Self-hosted, extensible, and built for DevOps & SRE teams.",
        keywords: [
            "incident management",
            "on-call",
            "DevOps",
            "SRE",
            "status page",
            "open source",
            "PagerDuty alternative",
            "incident response",
            "alerting",
            "monitoring",
        ],
    },

    // License
    license: "AGPL-3.0",

    authors: [
        {
            name: "Dushyant Rahangdale",
            url: "https://github.com/Dushyant-rahangdale",
            twitter: "https://twitter.com/dushyantr_"
        }
    ],
    keywords: [
        "OpsSentinel",
        "Incident Response",
        "On-call Management",
        "Status Pages",
        "DevOps",
        "SRE",
        "Open Source",
        "Self-hosted"
    ]
} as const;

// Brand Colors (matching Tailwind config)
export const BRAND_COLORS = {
    primary: {
        emerald: "#10b981",
        cyan: "#06b6d4",
    },
    accent: {
        amber: "#f59e0b",
        rose: "#f43f5e",
        pink: "#ec4899",
    },
    neutral: {
        slate900: "#0f172a",
        slate950: "#020617",
        slate800: "#1e293b",
        slate400: "#94a3b8",
        slate50: "#f8fafc",
    },
} as const;

// Feature highlights for marketing
export const FEATURES = [
    {
        title: "Incident Command",
        description: "Run full incident lifecycle from trigger to resolution",
        icon: "AlertTriangle",
    },
    {
        title: "On-Call Scheduling",
        description: "Design layered rotations, overrides, and handoffs",
        icon: "Calendar",
    },
    {
        title: "Escalations & Routing",
        description: "Automate escalation paths and alert routing",
        icon: "GitBranch",
    },
    {
        title: "Status Pages",
        description: "Publish branded status pages with incident timelines",
        icon: "Globe",
    },
    {
        title: "Service Reliability",
        description: "Track service health and apply SLOs",
        icon: "Activity",
    },
    {
        title: "Analytics & SLA",
        description: "Measure MTTA, MTTR, SLA compliance",
        icon: "BarChart3",
    },
] as const;

// Stats for social proof
export const STATS = [
    { label: "Event Capacity", value: "Unlimited", color: "rose" },
    { label: "Setup Time", value: "~5m", color: "amber" },
    { label: "Data Privacy", value: "100%", color: "emerald" },
] as const;

// Comparison competitors
export const COMPETITORS = [
    "PagerDuty",
    "Opsgenie",
    "VictorOps",
    "Splunk On-Call",
] as const;
