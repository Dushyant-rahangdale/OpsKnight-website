/**
 * OpsKnight Brand Constants
 *
 * Centralized brand configuration for consistent usage across the website.
 */

export const BRAND = {
    name: "OpsKnight",
    tagline: "Open Source Incident Response",
    description: "The complete open-source platform for on-call management, incident response, and status pages.",
    fullDescription: "OpsKnight is building the ultimate self-hosted command center for modern engineering teams. Self-hosted, extensible, and built for DevOps & SRE teams.",
    domain: "opsknight.com",

    // Status
    status: "Accepting Contributions",
    statusMessage: "v1.0.0 Released",

    links: {
        github: "https://github.com/Dushyant-rahangdale/OpsKnight",
        sponsor: "https://github.com/sponsors/Dushyant-rahangdale",
        docs: "/docs/v1",
        twitter: "https://twitter.com/opsknight",
        email: "help@opsknight.com",
        status: "https://status.opsknight.com",
        issues: "https://github.com/Dushyant-rahangdale/OpsKnight/issues",
        discussions: "https://github.com/Dushyant-rahangdale/OpsKnight/discussions",
        releases: "https://github.com/Dushyant-rahangdale/OpsKnight/releases",
        contributing: "https://github.com/Dushyant-rahangdale/OpsKnight/blob/main/CONTRIBUTING.md",
        license: "https://github.com/Dushyant-rahangdale/OpsKnight/blob/main/LICENSE",
        security: "https://github.com/Dushyant-rahangdale/OpsKnight/security",
    },

    // Assets
    assets: {
        logo: "/logo-mark.png",
        logoSvg: "/logo.svg",
        banner: "/banner.png",
        dashboard: "/dashboard-command-center-1200.jpg",
    },

    // SEO
    seo: {
        title: "OpsKnight | Open-Source Incident Management Platform",
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
        "OpsKnight",
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
