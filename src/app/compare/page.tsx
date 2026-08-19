"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Check,
    Gauge,
    Plug,
    Server,
    Shield,
    Sparkles,
    TrendingUp,
    Users,
    X,
} from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { COMPETITORS } from "@/lib/competitors";
import { SavingsCalculator } from "@/components/calculator/SavingsCalculator";

type CellValue = boolean | string;

type VendorKey =
    | "opsknight"
    | "pagerduty"
    | "incidentio"
    | "opsgenie"
    | "squadcast"
    | "splunk"
    | "grafana";

type ComparisonRow = {
    feature: string;
} & Record<VendorKey, CellValue>;

type ComparisonSection = {
    title: string;
    description: string;
    rows: ComparisonRow[];
};

type StatCard = {
    label: string;
    value: string;
    description: string;
    tone: string;
    icon: typeof Gauge;
};

const statCards: StatCard[] = [
    {
        label: "Cost",
        value: "$0/user",
        description: `${BRAND.name} has no per-seat pricing or add-ons.`,
        tone: "from-blue-500/30 to-blue-500/0",
        icon: Gauge,
    },
    {
        label: "Ownership",
        value: "Self-hosted",
        description: "Deploy in your VPC with full data control.",
        tone: "from-sky-500/30 to-sky-500/0",
        icon: Server,
    },
    {
        label: "Security",
        value: "SSO + RBAC",
        description: "Enterprise-grade access control and audit logs.",
        tone: "from-amber-500/30 to-amber-500/0",
        icon: Shield,
    },
    {
        label: "Response",
        value: "Full lifecycle",
        description: "Incident, escalation, postmortem, status pages.",
        tone: "from-rose-500/30 to-rose-500/0",
        icon: TrendingUp,
    },
];

const decisionGuides = [
    {
        title: `Choose ${BRAND.name} if...`,
        bullets: [
            "You want on-call, paging, war rooms, and status pages with no per-seat tax",
            "You need to self-host and keep incident data in your VPC",
            "You are leaving PagerDuty, Opsgenie, incident.io, or another SaaS pager",
        ],
        accent: "border-blue-200 bg-blue-50 text-blue-800",
    },
    {
        title: "Choose PagerDuty if...",
        bullets: [
            "You need a managed global SaaS contract and vendor SLA",
            "You already run a large PagerDuty automation estate",
            "Seat cost is acceptable versus operating your own stack",
        ],
        accent: "border-slate-200 bg-white text-slate-800",
    },
    {
        title: "Choose incident.io if...",
        bullets: [
            "Slack-native incident process is the whole product for you",
            "You want guided templates and can pay per seat",
            "Self-hosting is not a requirement",
        ],
        accent: "border-slate-200 bg-white text-slate-800",
    },
    {
        title: "Choose Opsgenie if...",
        bullets: [
            "You are already deep in Atlassian and Jira",
            "You can accept Atlassian’s retirement / migration path",
            "You do not need self-hosted incident data",
        ],
        accent: "border-slate-200 bg-white text-slate-800",
    },
    {
        title: "Choose Squadcast or Splunk if...",
        bullets: [
            "You want a SaaS pager with a modern UI (Squadcast)",
            "You already live in the Splunk observability suite",
            "Per-seat SaaS is acceptable",
        ],
        accent: "border-slate-200 bg-white text-slate-800",
    },
    {
        title: "Choose Grafana OnCall if...",
        bullets: [
            "Grafana is already your operations console",
            "You can run its microservice stack or Grafana Cloud",
            "You do not need a full incident command center and status pages in one app",
        ],
        accent: "border-slate-200 bg-white text-slate-800",
    },
];

const comparisonSections: ComparisonSection[] = [
    {
        title: "Core incident response",
        description: "Daily workflows for on-call, alerting, and response execution.",
        rows: [
            {
                feature: "On-call scheduling",
                opsknight: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
                squadcast: true,
                splunk: true,
                grafana: true,
            },
            {
                feature: "Escalation policies",
                opsknight: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
                squadcast: true,
                splunk: true,
                grafana: true,
            },
            {
                feature: "Multi-channel alerting",
                opsknight: "Email, SMS, Push, Slack, Webhook",
                pagerduty: "Email, SMS, Voice, Mobile",
                incidentio: "Slack, Email",
                opsgenie: "Email, SMS, Voice, Mobile",
                squadcast: "Email, SMS, Slack, Push",
                splunk: "Email, SMS, Push",
                grafana: "Slack, Email, Phone",
            },
            {
                feature: "Schedules by team/service",
                opsknight: true,
                pagerduty: true,
                incidentio: "Limited",
                opsgenie: true,
                squadcast: true,
                splunk: true,
                grafana: true,
            },
            {
                feature: "Runbook links",
                opsknight: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: true,
                squadcast: true,
                splunk: "Limited",
                grafana: "Limited",
            },
        ],
    },
    {
        title: "Post-incident learning",
        description: "Capture impact, root causes, and recovery playbooks.",
        rows: [
            {
                feature: "Postmortem templates",
                opsknight: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: true,
                squadcast: true,
                splunk: true,
                grafana: false,
            },
            {
                feature: "Action item tracking",
                opsknight: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: "Limited",
                squadcast: true,
                splunk: "Limited",
                grafana: false,
            },
            {
                feature: "Timeline + audit log",
                opsknight: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
                squadcast: true,
                splunk: true,
                grafana: true,
            },
            {
                feature: "Impact + status updates",
                opsknight: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: true,
                squadcast: "Limited",
                splunk: "Limited",
                grafana: "Separate product",
            },
        ],
    },
    {
        title: "Ownership and deployment",
        description: "Where your data lives and who controls the platform.",
        rows: [
            {
                feature: "Self-hosted option",
                opsknight: true,
                pagerduty: false,
                incidentio: false,
                opsgenie: false,
                squadcast: false,
                splunk: false,
                grafana: true,
            },
            {
                feature: "Source code access",
                opsknight: true,
                pagerduty: false,
                incidentio: false,
                opsgenie: false,
                squadcast: false,
                splunk: false,
                grafana: true,
            },
            {
                feature: "Custom workflows",
                opsknight: true,
                pagerduty: "Limited",
                incidentio: "Templates",
                opsgenie: "Limited",
                squadcast: "Limited",
                splunk: "Limited",
                grafana: "Limited",
            },
            {
                feature: "No vendor lock-in",
                opsknight: true,
                pagerduty: false,
                incidentio: false,
                opsgenie: false,
                squadcast: false,
                splunk: false,
                grafana: "Partial",
            },
        ],
    },
    {
        title: "Integrations",
        description: "Connect monitoring, chat, and infra tools that you already use.",
        rows: [
            {
                feature: "Slack + Teams",
                opsknight: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
                squadcast: true,
                splunk: true,
                grafana: true,
            },
            {
                feature: "Monitoring webhooks",
                opsknight: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
                squadcast: true,
                splunk: true,
                grafana: true,
            },
            {
                feature: "PagerDuty Events API v2 drop-in",
                opsknight: true,
                pagerduty: "Native",
                incidentio: false,
                opsgenie: false,
                squadcast: false,
                splunk: false,
                grafana: false,
            },
            {
                feature: "Custom integrations",
                opsknight: "Unlimited",
                pagerduty: "Limited",
                incidentio: "Limited",
                opsgenie: "Limited",
                squadcast: "Limited",
                splunk: "Limited",
                grafana: "Grafana stack",
            },
        ],
    },
];

const migrationSteps = [
    {
        title: "Inventory current tooling",
        detail: `List alert sources, routes, and team schedules to mirror in ${BRAND.name}.`,
    },
    {
        title: "Import schedules",
        detail: "Recreate on-call rotations and escalation rules before moving alerts.",
    },
    {
        title: "Connect integrations",
        detail: "Swap webhook destinations and validate alert payloads in staging.",
    },
    {
        title: "Run parallel for one sprint",
        detail: "Keep both systems in sync until response quality is stable.",
    },
];

const faqs = [
    {
        question: `Is ${BRAND.name} production-ready for larger teams?`,
        answer:
            "Yes. Teams can self-host on any Kubernetes or VM stack and scale independently of per-seat costs.",
    },
    {
        question: "What about SLAs and uptime?",
        answer:
            "You control the hosting, redundancy, and uptime targets. That means SLA is under your control.",
    },
    {
        question: "Do we lose enterprise features?",
        answer:
            `${BRAND.name} covers on-call, escalations, postmortems, and status pages without add-ons.`,
    },
];

const containerMotion = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemMotion = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
};

function FeatureValue({ value }: { value: CellValue }) {
    if (value === true) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-600" />
                </div>
            </div>
        );
    }
    if (value === false) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <X className="w-4 h-4 text-slate-400" />
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center">
            <span className="text-xs text-amber-700 font-medium px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                {value}
            </span>
        </div>
    );
}

export default function ComparePage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden pt-12">
            <main className="relative z-10 pt-24 pb-24">
                {/* Hero Section */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <motion.div
                        variants={containerMotion}
                        initial="hidden"
                        animate="show"
                        className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center"
                    >
                        <div>
                            <motion.span
                                variants={itemMotion}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4"
                            >
                                <Sparkles className="w-3 h-3" />
                                Detailed comparison
                            </motion.span>
                            <motion.h1
                                variants={itemMotion}
                                className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6"
                            >
                                The full {BRAND.name} comparison breakdown
                            </motion.h1>
                            <motion.p
                                variants={itemMotion}
                                className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal"
                            >
                                Side-by-side with PagerDuty, incident.io, Opsgenie, Squadcast, Splunk On-Call, and Grafana OnCall — pricing, ownership, and features.
                            </motion.p>
                        </div>
                        <motion.div
                            variants={itemMotion}
                            className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-slate-900">What this page covers</h2>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                                    Full pricing comparison with annual totals.
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                                    Feature-by-feature breakdown across tools.
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                                    Scorecard to highlight strengths per platform.
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                                    Migration guide to switch with confidence.
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <h2 className="text-2xl font-semibold text-center mb-6">Compare OpsKnight with each product</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {COMPETITORS.map((vendor) => (
                            <Link
                                key={vendor.slug}
                                href={vendor.href}
                                className="rounded-[12px] border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors"
                            >
                                <p className="text-sm font-semibold text-[#111827]">{vendor.name}</p>
                                <p className="mt-1 text-xs text-[#4b5563]">{vendor.category} · {vendor.listPrice}</p>
                                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#2563eb]">
                                    OpsKnight vs {vendor.shortName}
                                    <ArrowRight className="h-3 w-3" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Stat Cards */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat) => (
                            <div
                                key={stat.label}
                                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="relative">
                                    <stat.icon className="w-5 h-5 text-blue-600 mb-4" />
                                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold">
                                        {stat.label}
                                    </div>
                                    <div className="text-3xl font-semibold text-slate-900 mt-2 mb-2">{stat.value}</div>
                                    <p className="text-xs sm:text-sm text-slate-600">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Multi-Vendor Savings Calculator */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <SavingsCalculator />
                </section>

                {/* Decision guide */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Make the right choice faster</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {decisionGuides.map((guide) => (
                            <div
                                key={guide.title}
                                className={`rounded-[14px] p-6 border ${guide.accent}`}
                            >
                                <h3 className="font-semibold mb-3">{guide.title}</h3>
                                <ul className="space-y-2 text-sm text-[#4b5563]">
                                    {guide.bullets.map((bullet) => (
                                        <li key={bullet} className="flex gap-2">
                                            <Check className="w-4 h-4 text-[#2563eb] mt-0.5" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>



                {/* Feature Comparison */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Detailed feature comparison</h2>
                    <div className="space-y-6">
                        {comparisonSections.map((section) => (
                            <div key={section.title} className="rounded-[14px] border border-slate-200 bg-white p-6 md:p-8">
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                                        <p className="text-sm text-[#4b5563]">{section.description}</p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
                                        <Plug className="w-4 h-4" />
                                        Updated 2026
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200">
                                                <th className="py-3 px-4 text-slate-500 font-medium w-1/3">Feature</th>
                                                <th className="py-3 px-4 text-[#2563eb] font-semibold bg-blue-50 rounded-t-xl">
                                                    OpsKnight
                                                </th>
                                                <th className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">PagerDuty</th>
                                                <th className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">incident.io</th>
                                                <th className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">Opsgenie</th>
                                                <th className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">Squadcast</th>
                                                <th className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">Splunk On-Call</th>
                                                <th className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">Grafana OnCall</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.rows.map((row, index) => (
                                                <motion.tr
                                                    key={row.feature}
                                                    initial={{ opacity: 0, x: -16 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.02 }}
                                                    className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
                                                >
                                                    <td className="py-3 px-4 text-sm text-slate-800 font-medium">{row.feature}</td>
                                                    <td className="py-3 px-4 bg-blue-50/50">
                                                        <FeatureValue value={row.opsknight} />
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-600">
                                                        <FeatureValue value={row.pagerduty} />
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-600">
                                                        <FeatureValue value={row.incidentio} />
                                                    </td>
                                                    <td className="py-3 px-3 text-slate-600">
                                                        <FeatureValue value={row.opsgenie} />
                                                    </td>
                                                    <td className="py-3 px-3 text-slate-600">
                                                        <FeatureValue value={row.squadcast} />
                                                    </td>
                                                    <td className="py-3 px-3 text-slate-600">
                                                        <FeatureValue value={row.splunk} />
                                                    </td>
                                                    <td className="py-3 px-3 text-slate-600">
                                                        <FeatureValue value={row.grafana} />
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Platform deep dive */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="w-5 h-5 text-[#2563eb]" />
                                <h3 className="font-semibold">{BRAND.name} deep dive</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-[#4b5563]">
                                <li>Open-source repo with full auditability and customization.</li>
                                <li>Self-hosted deployments with your infra, IAM, and logging stack.</li>
                                <li>Unlimited users, integrations, and postmortems without add-ons.</li>
                            </ul>
                        </div>
                        <div className="rounded-[14px] border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5 text-slate-600" />
                                <h3 className="font-semibold">SaaS trade-offs</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-[#4b5563]">
                                <li>Per-seat pricing scales quickly as teams and services grow.</li>
                                <li>Add-ons required for status pages, automation, or advanced analytics.</li>
                                <li>Limited control over data residency and audit requirements.</li>
                            </ul>
                        </div>
                        <div className="rounded-[14px] border border-slate-200 bg-white p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-slate-600" />
                                <h3 className="font-semibold">Best-fit scenarios</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-[#4b5563]">
                                <li>Platform teams with multiple services and multiple schedules.</li>
                                <li>Security-conscious orgs that cannot ship data to external SaaS.</li>
                                <li>Scaling teams who want predictable, self-hosted costs.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Migration */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="rounded-[14px] border border-slate-200 bg-white p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Server className="w-6 h-6 text-[#2563eb]" />
                            <h2 className="text-2xl font-bold">Migration plan</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {migrationSteps.map((step, index) => (
                                <div key={step.title} className="flex gap-4">
                                    <div className="h-9 w-9 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center font-semibold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{step.title}</h3>
                                        <p className="text-sm text-[#4b5563]">{step.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-[14px] border border-slate-200 bg-white p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-[12px] border border-slate-200 bg-slate-50 p-5">
                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-sm text-[#4b5563]">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href={BRAND.links.github}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all hover:scale-105"
                    >
                        Explore the repo
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
