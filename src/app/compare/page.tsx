"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Calculator,
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
import { useMemo, useState } from "react";
import { BRAND } from "@/lib/brand";

type CellValue = boolean | string;

type VendorKey = "opssentinel" | "pagerduty" | "incidentio" | "opsgenie";

type Vendor = {
    name: string;
    price: number;
    unit: string;
    notes: string;
};

type ComparisonRow = {
    feature: string;
} & Record<VendorKey, CellValue>;

type ComparisonSection = {
    title: string;
    description: string;
    rows: ComparisonRow[];
};

type ScoreRow = {
    dimension: string;
} & Record<VendorKey, number>;

type StatCard = {
    label: string;
    value: string;
    description: string;
    tone: string;
    icon: typeof Gauge;
};

const vendors: Record<VendorKey, Vendor> = {
    pagerduty: {
        name: "PagerDuty",
        price: 21,
        unit: "/user/mo",
        notes: "Professional Plan ($21). Automation ($+59) & Status Pages ($+89) are extra.",
    },
    opsgenie: {
        name: "OpsGenie",
        price: 19,
        unit: "/user/mo",
        notes: "Standard Plan. Product retiring in 2027.",
    },
    incidentio: {
        name: "incident.io",
        price: 35,
        unit: "/user/mo",
        notes: "Pro Plan + On-call addon. Prices vary by volume.",
    },
    opssentinel: {
        name: BRAND.name,
        price: 0,
        unit: "forever",
        notes: "100% Free & Open Source. Self-hosted or hosted by you.",
    },
};

const vendorOrder: VendorKey[] = ["opssentinel", "pagerduty", "incidentio", "opsgenie"];

const statCards: StatCard[] = [
    {
        label: "Cost",
        value: "$0/user",
        description: `${BRAND.name} has no per-seat pricing or add-ons.`,
        tone: "from-emerald-500/30 to-emerald-500/0",
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
            "You need on-call, alerting, and postmortems without per-seat costs",
            "You want to self-host, customize workflows, or ship new integrations",
            "Data residency or audit requirements require full control",
        ],
        accent: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
    },
    {
        title: "Choose PagerDuty if...",
        bullets: [
            "You are locked into a vendor-managed SaaS stack",
            "You need enterprise contracts for global support",
            "Budget is less important than out-of-the-box add-ons",
        ],
        accent: "border-white/10 bg-white/5 text-slate-200",
    },
    {
        title: "Choose incident.io if...",
        bullets: [
            "You want Slack-first workflows and can accept usage-based pricing",
            "You have smaller teams that benefit from guided templates",
            "You are comfortable with SaaS-only deployments",
        ],
        accent: "border-white/10 bg-white/5 text-slate-200",
    },
    {
        title: "Choose OpsGenie if...",
        bullets: [
            "You want a familiar on-call UI for smaller teams",
            "You already use Atlassian tooling",
            "You accept the 2027 retirement notice",
        ],
        accent: "border-white/10 bg-white/5 text-slate-200",
    },
];

const comparisonSections: ComparisonSection[] = [
    {
        title: "Core incident response",
        description: "Daily workflows for on-call, alerting, and response execution.",
        rows: [
            {
                feature: "On-call scheduling",
                opssentinel: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
            },
            {
                feature: "Escalation policies",
                opssentinel: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
            },
            {
                feature: "Multi-channel alerting",
                opssentinel: "Email, SMS, Voice, Slack, Webhook",
                pagerduty: "Email, SMS, Voice, Mobile",
                incidentio: "Slack, Email",
                opsgenie: "Email, SMS, Voice, Mobile",
            },
            {
                feature: "Schedules by team/service",
                opssentinel: true,
                pagerduty: true,
                incidentio: "Limited",
                opsgenie: true,
            },
            {
                feature: "Runbook links",
                opssentinel: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: true,
            },
        ],
    },
    {
        title: "Post-incident learning",
        description: "Capture impact, root causes, and recovery playbooks.",
        rows: [
            {
                feature: "Postmortem templates",
                opssentinel: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: true,
            },
            {
                feature: "Action item tracking",
                opssentinel: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: "Limited",
            },
            {
                feature: "Timeline + audit log",
                opssentinel: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
            },
            {
                feature: "Impact + status updates",
                opssentinel: true,
                pagerduty: "Add-on",
                incidentio: true,
                opsgenie: true,
            },
        ],
    },
    {
        title: "Ownership and deployment",
        description: "Where your data lives and who controls the platform.",
        rows: [
            {
                feature: "Self-hosted option",
                opssentinel: true,
                pagerduty: false,
                incidentio: false,
                opsgenie: false,
            },
            {
                feature: "Source code access",
                opssentinel: true,
                pagerduty: false,
                incidentio: false,
                opsgenie: false,
            },
            {
                feature: "Custom workflows",
                opssentinel: true,
                pagerduty: "Limited",
                incidentio: "Templates",
                opsgenie: "Limited",
            },
            {
                feature: "No vendor lock-in",
                opssentinel: true,
                pagerduty: false,
                incidentio: false,
                opsgenie: false,
            },
        ],
    },
    {
        title: "Integrations",
        description: "Connect monitoring, chat, and infra tools that you already use.",
        rows: [
            {
                feature: "Slack + Teams",
                opssentinel: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
            },
            {
                feature: "Monitoring webhooks",
                opssentinel: true,
                pagerduty: true,
                incidentio: true,
                opsgenie: true,
            },
            {
                feature: "Terraform + API",
                opssentinel: true,
                pagerduty: true,
                incidentio: "API only",
                opsgenie: true,
            },
            {
                feature: "Custom integrations",
                opssentinel: "Unlimited",
                pagerduty: "Limited",
                incidentio: "Limited",
                opsgenie: "Limited",
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
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-300" />
                </div>
            </div>
        );
    }
    if (value === false) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                    <X className="w-4 h-4 text-slate-500" />
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center">
            <span className="text-xs text-amber-300 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {value}
            </span>
        </div>
    );
}

export default function ComparePage() {
    const [teamSize, setTeamSize] = useState(10);

    const calculateCost = (price: number) => price * teamSize * 12;

    const annualSavings = useMemo(
        () => calculateCost(vendors.pagerduty.price),
        [teamSize]
    );

    const costCards = vendorOrder.map((key) => {
        const vendor = vendors[key];
        const annual = calculateCost(vendor.price);
        return {
            key,
            vendor,
            annual,
        };
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-16 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-[120px]" />

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
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4"
                            >
                                <Sparkles className="w-3 h-3" />
                                Detailed comparison
                            </motion.span>
                            <motion.h1
                                variants={itemMotion}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                            >
                                The full {BRAND.name} comparison breakdown
                            </motion.h1>
                            <motion.p
                                variants={itemMotion}
                                className="text-lg sm:text-xl text-slate-300 max-w-2xl"
                            >
                                Side-by-side pricing, capabilities, and ownership differences to help your team
                                pick the right incident management platform.
                            </motion.p>
                        </div>
                        <motion.div
                            variants={itemMotion}
                            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-emerald-300" />
                                <h2 className="text-lg font-semibold">What this page covers</h2>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-300 mt-0.5" />
                                    Full pricing comparison with annual totals.
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-300 mt-0.5" />
                                    Feature-by-feature breakdown across tools.
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-300 mt-0.5" />
                                    Scorecard to highlight strengths per platform.
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-300 mt-0.5" />
                                    Migration guide to switch with confidence.
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Stat Cards */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat) => (
                            <div
                                key={stat.label}
                                className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6"
                            >
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.tone} pointer-events-none`} />
                                <div className="relative">
                                    <stat.icon className="w-5 h-5 text-white/70 mb-4" />
                                    <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                                        {stat.label}
                                    </div>
                                    <div className="text-3xl font-bold mt-2 mb-2">{stat.value}</div>
                                    <p className="text-sm text-slate-300">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Calculator Section */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Calculator className="w-6 h-6 text-emerald-300" />
                                    Savings calculator
                                </h2>
                                <p className="text-slate-300 mt-2">
                                    Estimate annual spend for your on-call team and compare recurring costs.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-xl border border-white/10">
                                <label className="text-sm font-medium text-slate-200">Team size</label>
                                <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    step="5"
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                    className="w-40 accent-emerald-400"
                                />
                                <span className="text-xl font-bold text-emerald-300 min-w-[3ch]">
                                    {teamSize}
                                </span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {costCards.map(({ key, vendor, annual }) => (
                                <div
                                    key={vendor.name}
                                    className={`rounded-2xl p-6 border ${key === "opssentinel"
                                        ? "border-emerald-400/40 bg-emerald-500/5"
                                        : "border-white/10 bg-slate-950/60"
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <h3 className="font-bold text-lg mb-1">{vendor.name}</h3>
                                        {key === "opssentinel" ? (
                                            <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full">
                                                Recommended
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className={`text-3xl font-bold mb-4 ${key === "opssentinel" ? "text-emerald-300" : "text-white"}`}>
                                        ${vendor.price}
                                        <span className="text-sm font-normal text-slate-400">{vendor.unit}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-4 min-h-[2.5rem]">{vendor.notes}</p>
                                    <div className="text-sm font-medium text-white">
                                        Annual: ${annual.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                            <div className="bg-emerald-500/10 rounded-xl p-4">
                                <p className="text-lg font-medium text-emerald-300">
                                    You could save <span className="font-bold">${annualSavings.toLocaleString()} per year</span> by switching to {BRAND.name}.
                                </p>
                            </div>
                            <div className="bg-slate-950/70 rounded-xl p-4 text-sm text-slate-300 border border-white/10">
                                Add-on fees often apply to status pages, automation, and advanced analytics in SaaS tools.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Decision guide */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Make the right choice faster</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {decisionGuides.map((guide) => (
                            <div
                                key={guide.title}
                                className={`rounded-2xl p-6 border ${guide.accent} bg-slate-900/60`}
                            >
                                <h3 className="font-semibold mb-3">{guide.title}</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    {guide.bullets.map((bullet) => (
                                        <li key={bullet} className="flex gap-2">
                                            <Check className="w-4 h-4 text-emerald-300 mt-0.5" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>



                {/* Feature Comparison */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Detailed feature comparison</h2>
                    <div className="space-y-6">
                        {comparisonSections.map((section) => (
                            <div key={section.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 md:p-8">
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                                        <p className="text-sm text-slate-300">{section.description}</p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
                                        <Plug className="w-4 h-4" />
                                        Updated 2026
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="py-3 px-4 text-slate-400 font-medium w-1/3">Feature</th>
                                                <th className="py-3 px-4 text-emerald-300 font-semibold bg-emerald-500/5 rounded-t-xl">
                                                    OpsSentinel
                                                </th>
                                                <th className="py-3 px-4 text-slate-400 font-medium">PagerDuty</th>
                                                <th className="py-3 px-4 text-slate-400 font-medium">incident.io</th>
                                                <th className="py-3 px-4 text-slate-400 font-medium">OpsGenie</th>
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
                                                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                                >
                                                    <td className="py-3 px-4 text-sm text-slate-200 font-medium">{row.feature}</td>
                                                    <td className="py-3 px-4 bg-emerald-500/5">
                                                        <FeatureValue value={row.opssentinel} />
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300">
                                                        <FeatureValue value={row.pagerduty} />
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300">
                                                        <FeatureValue value={row.incidentio} />
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-300">
                                                        <FeatureValue value={row.opsgenie} />
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
                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="w-5 h-5 text-emerald-300" />
                                <h3 className="font-semibold">{BRAND.name} deep dive</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-200">
                                <li>Open-source repo with full auditability and customization.</li>
                                <li>Self-hosted deployments with your infra, IAM, and logging stack.</li>
                                <li>Unlimited users, integrations, and postmortems without add-ons.</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5 text-slate-300" />
                                <h3 className="font-semibold">SaaS trade-offs</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li>Per-seat pricing scales quickly as teams and services grow.</li>
                                <li>Add-ons required for status pages, automation, or advanced analytics.</li>
                                <li>Limited control over data residency and audit requirements.</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-slate-300" />
                                <h3 className="font-semibold">Best-fit scenarios</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li>Platform teams with multiple services and multiple schedules.</li>
                                <li>Security-conscious orgs that cannot ship data to external SaaS.</li>
                                <li>Scaling teams who want predictable, self-hosted costs.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Migration */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Server className="w-6 h-6 text-emerald-300" />
                            <h2 className="text-2xl font-bold">Migration plan</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {migrationSteps.map((step, index) => (
                                <div key={step.title} className="flex gap-4">
                                    <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-semibold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{step.title}</h3>
                                        <p className="text-sm text-slate-300">{step.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-sm text-slate-300">{faq.answer}</p>
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
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all hover:scale-105"
                    >
                        Explore the repo
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
