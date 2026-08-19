import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Check, 
  X, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { SavingsCalculator } from '@/components/calculator/SavingsCalculator';
import { COMPETITORS } from '@/lib/competitors';
import { BRAND } from '@/lib/brand';

interface CompetitorData {
  name: string;
  badge: string;
  description: string;
  pricingNote: string;
  monthlyPerSeat: number;
  features: {
    selfHosted: boolean;
    openSource: boolean;
    freeTier: boolean;
    slackChatOps: 'yes' | 'partial' | 'no';
    nativeIntegrations: 'yes' | 'partial' | 'no';
    onCallScheduling: boolean;
    statusPages: 'yes' | 'partial' | 'no';
    postmortemTemplates: boolean;
    noPerSeatPricing: boolean;
    dataSovereignty: boolean;
    dropInApi: boolean;
  };
  pros: string[];
  cons: string[];
}

const competitors: Record<string, CompetitorData> = {
  pagerduty: {
    name: 'PagerDuty',
    badge: 'Legacy Enterprise SaaS',
    description: 'PagerDuty is the legacy incident response incumbent, but charges steep per-seat fees ($41/user/mo Business) with proprietary cloud lock-in.',
    pricingNote: '$21 to $41 / user / month + add-on fees for status pages and automation',
    monthlyPerSeat: 41,
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'partial',
      nativeIntegrations: 'yes',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
      dropInApi: false,
    },
    pros: ['Mature enterprise ecosystem', 'Wide brand recognition'],
    cons: ['Aggressive per-seat billing tax ($492/yr per engineer)', 'Data stored in multi-tenant vendor cloud', 'Status pages & war rooms cost extra', 'Proprietary closed-source code']
  },
  opsgenie: {
    name: 'Opsgenie',
    badge: 'Atlassian Legacy Tool',
    description: 'Opsgenie is Atlassian’s incident routing platform, but lacks open-source data sovereignty and is scheduled for retirement.',
    pricingNote: '$11.55 to $29.00 / user / month (Enterprise)',
    monthlyPerSeat: 29,
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'partial',
      nativeIntegrations: 'yes',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
      dropInApi: false,
    },
    pros: ['Jira Software integration'],
    cons: ['Retirement timeline by Atlassian', 'Per-seat fee scaling', 'No self-hosted or VPC deployment option']
  },
  squadcast: {
    name: 'Squadcast',
    badge: 'SaaS On-Call Platform',
    description: 'Squadcast provides cloud incident management, but requires mandatory per-user subscriptions with cloud vendor lock-in.',
    pricingNote: '$21.00 / user / month (Pro)',
    monthlyPerSeat: 21,
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'partial',
      nativeIntegrations: 'partial',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
      dropInApi: false,
    },
    pros: ['Modern web UI'],
    cons: ['Per-seat fee', 'No open-source source code auditability', 'Vendor-hosted infrastructure']
  },
  'incidentio': {
    name: 'incident.io',
    badge: 'Slack-First Incident Tool',
    description: 'incident.io provides slick ChatOps workflows, but charges high per-seat rates ($35/mo) and does not offer self-hosting.',
    pricingNote: '$35 / user / month (Pro + On-Call addon)',
    monthlyPerSeat: 35,
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'yes',
      nativeIntegrations: 'partial',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
      dropInApi: false,
    },
    pros: ['Clean Slack integration experience', 'Modern UI'],
    cons: ['High per-seat pricing', 'No VPC data sovereignty', 'Closed-source proprietary platform']
  },
  'incident-io': {
    name: 'incident.io',
    badge: 'Slack-First Incident Tool',
    description: 'incident.io provides slick ChatOps workflows, but charges high per-seat rates ($35/mo) and does not offer self-hosting.',
    pricingNote: '$35 / user / month (Pro + On-Call addon)',
    monthlyPerSeat: 35,
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'yes',
      nativeIntegrations: 'partial',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
      dropInApi: false,
    },
    pros: ['Clean Slack integration experience', 'Modern UI'],
    cons: ['High per-seat pricing', 'No VPC data sovereignty', 'Closed-source proprietary platform']
  },
  'splunk': {
    name: 'Splunk On-Call (VictorOps)',
    badge: 'Enterprise On-Call',
    description: 'Splunk On-Call (formerly VictorOps) provides timeline-based alerting, but has high per-seat pricing and proprietary hosting.',
    pricingNote: '$23.00 / user / month (Standard)',
    monthlyPerSeat: 23,
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'partial',
      nativeIntegrations: 'partial',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
      dropInApi: false,
    },
    pros: ['Splunk ecosystem ties'],
    cons: ['Per-seat pricing tax', 'No self-hosted container', 'Closed source']
  },
  'grafana-oncall': {
    name: 'Grafana OnCall',
    badge: 'OSS / Cloud Engine',
    description: 'Grafana OnCall is an open-source tool, but has complex microservice dependencies and limited standalone incident orchestration.',
    pricingNote: 'Free (OSS) or Paid Grafana Cloud',
    monthlyPerSeat: 0,
    features: {
      selfHosted: true,
      openSource: true,
      freeTier: true,
      slackChatOps: 'partial',
      nativeIntegrations: 'partial',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: false,
      noPerSeatPricing: true,
      dataSovereignty: true,
      dropInApi: false,
    },
    pros: ['Open-source license option', 'Grafana integration'],
    cons: ['Requires a heavier Grafana microservice stack', 'No built-in postmortem generator', 'No drop-in PagerDuty API emulation']
  },
  victorops: {
    name: 'Splunk On-Call (VictorOps)',
    badge: 'Enterprise On-Call',
    description: 'Splunk On-Call (formerly VictorOps) provides timeline-based alerting, but has high per-seat pricing and proprietary hosting.',
    pricingNote: '$23.00 / user / month (Standard)',
    monthlyPerSeat: 23,
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'partial',
      nativeIntegrations: 'partial',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
      dropInApi: false,
    },
    pros: ['Splunk ecosystem ties'],
    cons: ['Per-seat pricing tax', 'No self-hosted container', 'Closed source']
  }
};

export function generateStaticParams() {
  return Object.keys(competitors).map((competitor) => ({
    competitor,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: compKey } = await params;
  const competitor = competitors[compKey] || competitors.pagerduty;
  return {
    title: `OpsKnight vs ${competitor.name} | The Open Source Incident Management Alternative`,
    description: `Compare OpsKnight with ${competitor.name}. Discover why engineering teams choose OpsKnight for 100% data sovereignty, unlimited users, and $0 per-seat fees.`,
  };
}

export default async function CompetitorComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: compKey } = await params;
  const competitor = competitors[compKey] || competitors.pagerduty;

  const renderFeatureCell = (val: boolean | 'yes' | 'partial' | 'no') => {
    if (val === true || val === 'yes') {
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-blue-600" />
          </div>
        </div>
      );
    }
    if (val === false || val === 'no') {
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
            <X className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <span className="text-[11px] text-amber-700 font-medium px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
          Partial / Add-on
        </span>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Platform Comparison
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            OpsKnight vs {competitor.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {competitor.description} See why engineering teams switch to OpsKnight for 100% data sovereignty, unlimited users, and zero per-seat licensing.
          </p>
        </header>

        <nav className="flex flex-wrap justify-center gap-2">
          {COMPETITORS.map((vendor) => {
            const active = vendor.slug === compKey || (compKey === 'incident-io' && vendor.slug === 'incidentio') || (compKey === 'victorops' && vendor.slug === 'splunk');
            return (
              <Link
                key={vendor.slug}
                href={vendor.href}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                vs {vendor.shortName}
              </Link>
            );
          })}
        </nav>

        {/* Multi-Vendor ROI Calculator */}
        <section>
          <SavingsCalculator />
        </section>

        {/* Detailed Side-by-Side Comparison Table */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6 text-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                Detailed Capability Matrix
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Feature-by-feature evaluation across infrastructure, privacy, and incident response.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
              Verified Production Parity
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-900">Platform Dimension</th>
                  <th className="p-4 font-semibold text-blue-600 text-center w-48 bg-blue-50/40 border-x border-slate-200">
                    OpsKnight (Self-Hosted)
                  </th>
                  <th className="p-4 font-bold text-slate-700 text-center w-48">
                    {competitor.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    Self-Hosted / On-Premise VPC
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Deploy inside AWS, GCP, Azure, or bare metal</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell(true)}</td>
                  <td className="p-4 text-center">{renderFeatureCell(competitor.features.selfHosted)}</td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    Full Source Code Access
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">{BRAND.license} open-source license</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell(true)}</td>
                  <td className="p-4 text-center">{renderFeatureCell(competitor.features.openSource)}</td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    Per-Seat Licensing Tax
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Charge per on-call engineer or responder</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200 text-emerald-700 font-semibold font-mono">
                    $0 (Unlimited)
                  </td>
                  <td className="p-4 text-center text-red-600 font-bold font-mono">
                    {competitor.pricingNote}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    Slack ChatOps War Rooms
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Auto-provisioned channels, video bridges & /incident slash commands</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell('yes')}</td>
                  <td className="p-4 text-center">{renderFeatureCell(competitor.features.slackChatOps)}</td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    {BRAND.integrationCountLabel} native APM & cloud webhooks
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Datadog, Prometheus, Zabbix, CloudWatch, GitLab, Sentry</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell('yes')}</td>
                  <td className="p-4 text-center">{renderFeatureCell(competitor.features.nativeIntegrations)}</td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    Multi-Layer On-Call Rotations
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Timezone-aware primary, secondary, and shift overrides</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell(true)}</td>
                  <td className="p-4 text-center">{renderFeatureCell(competitor.features.onCallScheduling)}</td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    Branded Public & Private Status Pages
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Custom domains, uptime history & subscriber alerts included</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell('yes')}</td>
                  <td className="p-4 text-center">{renderFeatureCell(competitor.features.statusPages)}</td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    Drop-in PagerDuty API v2 Emulation
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Swap /v2/enqueue URL with zero tool reconfiguration</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell(true)}</td>
                  <td className="p-4 text-center">{renderFeatureCell(false)}</td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">
                    100% Data Sovereignty
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Zero external telemetry; incident logs stay in your network</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50/40 border-x border-slate-200">{renderFeatureCell(true)}</td>
                  <td className="p-4 text-center">{renderFeatureCell(competitor.features.dataSovereignty)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros & Cons Evaluation */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Why Switch to OpsKnight</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Per-Seat Bills:</strong> Unlimited engineers, services, and escalation policies at $0 software cost.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Total Data Privacy:</strong> Incidents, postmortems, and infrastructure secrets never leave your VPC.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Drop-in Migration:</strong> Compatible with PagerDuty Events API v2 for instant switchover.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <X className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-slate-900">{competitor.name} Trade-Offs</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {competitor.cons.map((con) => (
                <li key={con} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Migration & Quick Start CTA */}
        <section className="text-center p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">
            Ready to replace {competitor.name}?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            Deploy OpsKnight in under 2 minutes with Docker or Kubernetes. Zero per-seat licensing, 100% free forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20"
            >
              Deploy OpsKnight Free
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all border border-slate-200"
            >
              View Full Comparison Matrix
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
