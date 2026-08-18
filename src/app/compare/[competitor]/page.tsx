import { Metadata } from 'next';
import Link from 'next/link';

interface CompetitorData {
  name: string;
  description: string;
  pricing: string;
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
  };
}

const competitors: Record<string, CompetitorData> = {
  pagerduty: {
    name: 'PagerDuty',
    description: 'PagerDuty is a well-known incident response platform, but it comes with a high price tag and is exclusively SaaS.',
    pricing: 'From $21/user/mo (Professional) to $41/user/mo (Business)',
    features: {
      selfHosted: false,
      openSource: false,
      freeTier: false,
      slackChatOps: 'partial',
      nativeIntegrations: 'yes',
      onCallScheduling: true,
      statusPages: 'partial', // separate product
      postmortemTemplates: true,
      noPerSeatPricing: false,
      dataSovereignty: false,
    },
  },
  opsgenie: {
    name: 'Opsgenie',
    description: 'Opsgenie is an Atlassian product for incident management, but lacks data sovereignty and open-source flexibility.',
    pricing: 'From $11.55/user/mo to $23.10/user/mo',
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
    },
  },
  squadcast: {
    name: 'Squadcast',
    description: 'Squadcast offers incident management, but requires per-user pricing and SaaS deployment.',
    pricing: 'From $21/user/mo',
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
    },
  },
  'incident-io': {
    name: 'incident.io',
    description: 'incident.io provides great Slack integration but hides pricing and is SaaS only.',
    pricing: 'Custom pricing',
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
    },
  },
  'grafana-oncall': {
    name: 'Grafana OnCall',
    description: 'Grafana OnCall is open source but currently in maintenance mode/archived.',
    pricing: 'Free (OSS, but archived/maintenance mode)',
    features: {
      selfHosted: true,
      openSource: true,
      freeTier: true,
      slackChatOps: 'partial',
      nativeIntegrations: 'partial',
      onCallScheduling: true,
      statusPages: 'partial',
      postmortemTemplates: true,
      noPerSeatPricing: true,
      dataSovereignty: true,
    },
  },
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
  const competitor = competitors[compKey];
  if (!competitor) {
    return {
      title: 'Not Found',
    };
  }
  return {
    title: `OpsKnight vs ${competitor.name} | The Open Source Incident Management Alternative`,
    description: `Compare OpsKnight with ${competitor.name}. See why teams are switching to the self-hosted, open-source incident response platform.`,
  };
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-zinc-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PartialIcon = () => (
  <span className="text-sm text-slate-400">Partial</span>
);

export default async function ComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: compKey } = await params;
  const competitor = competitors[compKey];

  if (!competitor) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <h1>Competitor not found</h1>
      </div>
    );
  }

  const renderFeature = (val: boolean | 'yes' | 'partial' | 'no') => {
    if (val === true || val === 'yes') return <CheckIcon />;
    if (val === false || val === 'no') return <CrossIcon />;
    return <PartialIcon />;
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24 pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            OpsKnight vs {competitor.name}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {competitor.description} See how OpsKnight provides a free, self-hosted, and open-source alternative.
          </p>
        </header>

        <div className="overflow-x-auto mb-16 rounded-lg border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-4 font-semibold text-zinc-200">Feature</th>
                <th className="p-4 font-semibold text-zinc-200 text-center w-40">OpsKnight</th>
                <th className="p-4 font-semibold text-zinc-200 text-center w-40">{competitor.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">Self-hosted / On-premise</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(true)}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.selfHosted)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">Open Source (AGPL-3.0)</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(true)}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.openSource)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">Free tier with all features</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(true)}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.freeTier)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">Slack ChatOps War Rooms</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature('yes')}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.slackChatOps)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">24+ Native Integrations</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature('yes')}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.nativeIntegrations)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">On-Call Scheduling</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(true)}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.onCallScheduling)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">Status Pages</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature('yes')}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.statusPages)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">Postmortem Templates</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(true)}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.postmortemTemplates)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">No per-seat pricing</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(true)}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.noPerSeatPricing)}</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-4 text-zinc-300">Data sovereignty (your servers)</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(true)}</td>
                <td className="p-4 text-center border-l border-white/5">{renderFeature(competitor.features.dataSovereignty)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-16 border border-white/5 rounded-lg p-8 bg-white/[0.01]">
          <h2 className="text-2xl font-bold mb-6">Pricing Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">OpsKnight</h3>
              <p className="text-zinc-400">Free forever, self-hosted, AGPL-3.0</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">{competitor.name}</h3>
              <p className="text-zinc-400">{competitor.pricing}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/docs/latest/getting-started" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors">
            Deploy OpsKnight Now
          </Link>
          <p className="mt-4 text-sm text-zinc-500">Free, open-source, and ready in minutes.</p>
        </div>
      </div>
    </main>
  );
}
