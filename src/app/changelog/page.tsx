import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog | OpsKnight',
  description: 'Release history and latest updates for OpsKnight.',
};

const releases = [
  {
    version: 'v1.3.0',
    date: 'August 17, 2026',
    changes: [
      '6 new native integrations: Zabbix, Nagios, Icinga 2, GitLab CI/CD, Vercel, PagerDuty Emulation',
      'Circuit breaker state machine for webhook delivery',
      'SHA-256 deduplication engine',
      'Webhook signature verification (HMAC-SHA256)',
      'Keyboard shortcuts modal and /shortcuts page',
      'Single source of truth for APP_VERSION from package.json',
    ],
  },
  {
    version: 'v1.2.0',
    date: 'July 2026',
    changes: [
      'Slack ChatOps & Incident War Rooms',
      'Bi-directional Jira Cloud integration',
      'Emoji pin sync and /incident slash commands',
      'Enhanced mobile PWA experience',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'June 2026',
    changes: [
      'Public status pages with subscriber notifications',
      'Escalation policy builder',
      'Multi-layer on-call schedule overrides',
      'Analytics dashboard with MTTA/MTTR metrics',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'May 2026',
    changes: [
      'Initial release',
      'Core incident management',
      'On-call scheduling',
      'Slack & email notifications',
      'Docker and Docker Compose deployment',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Changelog
          </h1>
          <p className="text-lg text-slate-400">
            Latest updates, improvements, and fixes for OpsKnight.
          </p>
        </header>

        <div className="relative border-l border-slate-800 ml-4 md:ml-0">
          {releases.map((release) => (
            <div key={release.version} className="mb-16 ml-8 md:ml-12 relative">
              {/* Timeline marker */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 h-4 w-4 rounded-full border-2 border-emerald-500 bg-slate-950" />
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 w-fit">
                  {release.version}
                </span>
                <time className="text-sm text-slate-500 font-medium">
                  {release.date}
                </time>
              </div>

              <ul className="space-y-3">
                {release.changes.map((change, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <span className="text-slate-600 mt-1.5">•</span>
                    <span className="leading-relaxed">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
