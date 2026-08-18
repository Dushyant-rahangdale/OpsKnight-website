import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  ExternalLink, 
  Tag, 
  CheckCircle2, 
  Terminal,
  Calendar
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Changelog & Release Notes | OpsKnight',
  description: 'Chronological release notes, architectural updates, and changelog for OpsKnight Incident Command Center.',
};

interface ChangeCategory {
  type: 'added' | 'security' | 'fixed' | 'performance' | 'changed';
  title: string;
  items: string[];
}

interface ReleaseItem {
  version: string;
  badge?: string;
  date: string;
  summary: string;
  dockerTag: string;
  githubReleaseUrl: string;
  categories: ChangeCategory[];
}

const releases: ReleaseItem[] = [
  {
    version: 'v1.3.1',
    badge: 'Latest Stable',
    date: 'August 18, 2026',
    summary: '6 new native observability integrations, forensic webhook HMAC authentication, SHA-256 deduplication engine, and GHCR container packaging.',
    dockerTag: 'ghcr.io/opsknight-labs/opsknight:1.3.1',
    githubReleaseUrl: 'https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.3.1',
    categories: [
      {
        type: 'added',
        title: '6 New Native Observability & APM Integrations',
        items: [
          'Zabbix — native webhook media type support with Problem/Recovery/Update alerts, 6-level severity mapping, and EVENT.ID recovery deduplication.',
          'PagerDuty Events API v2 — drop-in compatible emulation supporting trigger, acknowledge, and resolve actions with routing key resolution.',
          'GitLab CI/CD — automated pipeline failure alerting with branch-level auto-resolution on successful rerun.',
          'Vercel Deployments — production error triggering, deployment state tracking, and auto-resolution on successful deployments.',
          'Nagios Core & XI — macro parsing with scheduled downtime (DOWNTIMESTART), flapping detection, and service state transitions.',
          'Icinga 2 — full host/service state transitions and acknowledgment synchronization.'
        ]
      },
      {
        type: 'security',
        title: 'Forensic Ingestion Security & Authentication',
        items: [
          'Mandatory integration key verification and timing-safe HMAC checks (crypto.timingSafeEqual) across all 24 webhook routes.',
          'Collision-proof 32-character SHA-256 deduplication hashing replacing legacy 100-character string slicing.',
          'Outbound webhook timestamp binding (X-OpsKnight-Timestamp in HMAC) to eliminate replay attack vectors.',
          'Fallback RBAC permission safely assigns unauthenticated sessions to VIEWER with authenticated: false.'
        ]
      },
      {
        type: 'performance',
        title: 'Core Resilience & Runtime Hardening',
        items: [
          'Webhook circuit breaker with halfOpenRequestInFlight concurrency locking to eliminate thundering herd spikes during recovery.',
          'Rolling 5-minute deduplication window for high-volume notification queue processing.',
          'Sequential multi-channel escalation chain (Push → SMS → WhatsApp → Email) with High/Critical severity paging overrides.'
        ]
      }
    ]
  },
  {
    version: 'v1.2.0',
    date: 'August 16, 2026',
    summary: 'Slack ChatOps Incident War Rooms, Jitsi/Meet/Zoom video bridges, slash commands, and critical Node 20 ICU timezone resolution fix.',
    dockerTag: 'ghcr.io/opsknight-labs/opsknight:1.2.0',
    githubReleaseUrl: 'https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.2.0',
    categories: [
      {
        type: 'added',
        title: 'Slack ChatOps & Incident War Rooms',
        items: [
          'Dedicated Slack channel auto-provisioned per qualifying incident with on-call responders auto-invited.',
          'Interactive Slack action buttons: 1-click Acknowledge, Assign to Me, and Resolve directly in chat.',
          'Slash commands suite: /incident ack | resolve | note | who | postmortem | help.',
          '📌 Emoji pin sync: react to any message in a war room to automatically capture it into the incident timeline.',
          'Integrated Video Bridge support for Jitsi Meet (WebRTC Private), Google Meet, and Zoom.'
        ]
      },
      {
        type: 'fixed',
        title: 'Critical Timezone & Security Fixes',
        items: [
          'Fixed Node 20 ICU hour12:false bug where midnight was resolved as hour "24" and shifted start-of-day by a full day early in zero-offset zones.',
          'Slack request signatures now fail closed to guarantee untrusted requests are never processed.',
          'Eliminated SSRF vector on unvalidated response_url callbacks.',
          'Fixed Acknowledge button to immediately halt downstream escalation timer steps.'
        ]
      }
    ]
  },
  {
    version: 'v1.1.0',
    date: 'June 24, 2026',
    summary: 'Multi-layer on-call rotations, public & private status pages, escalation policy builder, and SLA/MTTA/MTTR analytics.',
    dockerTag: 'ghcr.io/opsknight-labs/opsknight:1.1.0',
    githubReleaseUrl: 'https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.1.0',
    categories: [
      {
        type: 'added',
        title: 'Scheduling & Status Pages',
        items: [
          'Multi-layer timezone-aware on-call schedules with primary, secondary, and shadow shift coverage.',
          '1-click shift overrides with calendar export (iCal / Google Calendar sync).',
          'Branded public & private status pages with custom domain support and 90-day component uptime history.',
          'Incident analytics dashboard calculating real-time MTTA, MTTR, and escalation SLA response metrics.'
        ]
      }
    ]
  },
  {
    version: 'v1.0.0',
    date: 'May 12, 2026',
    summary: 'Initial open-source release of OpsKnight Incident Command Center under AGPL-3.0 License.',
    dockerTag: 'ghcr.io/opsknight-labs/opsknight:1.0.0',
    githubReleaseUrl: 'https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.0.0',
    categories: [
      {
        type: 'added',
        title: 'Initial Core Release',
        items: [
          'Real-time Server-Sent Events (SSE) incident triage stream with zero stale caching.',
          'Multi-channel responder alerts: Mobile Push, SMS, WhatsApp, Email, and Webhooks.',
          'Deterministic incident deduplication and multi-service routing.',
          '1-command deployment via Docker, Docker Compose, and Helm charts.'
        ]
      }
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
            <Tag className="w-3.5 h-3.5" />
            Continuous Evolution
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
            Release Changelog
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Detailed release notes, security advisories, and architectural improvements across OpsKnight Incident Command Center.
          </p>
        </header>

        {/* Timeline List */}
        <div className="space-y-16 relative">
          
          {/* Vertical Connecting Rule */}
          <div className="absolute top-8 bottom-8 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-blue-500 via-slate-800 to-slate-900 hidden sm:block" />

          {releases.map((rel) => (
            <div 
              key={rel.version} 
              className="relative sm:pl-16 group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute left-4 -translate-x-1/2 top-7 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 shadow-md shadow-blue-500/50 hidden sm:block group-hover:scale-125 transition-transform" />

              {/* Release Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-md hover:border-blue-500/30 transition-all space-y-6">
                
                {/* Release Top Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                      {rel.version}
                    </span>
                    {rel.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        {rel.badge}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {rel.date}
                    </span>
                  </div>

                  <Link
                    href={rel.githubReleaseUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    GitHub Notes <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  {rel.summary}
                </p>

                {/* Docker Container Pull Snippet */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between font-mono text-xs text-sky-400">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-slate-500">$</span>
                    <span className="truncate">docker pull {rel.dockerTag}</span>
                  </div>
                </div>

                {/* Categories & Detailed Changes */}
                <div className="space-y-6 pt-2">
                  {rel.categories.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-2">
                        {cat.type === 'added' ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Added
                          </span>
                        ) : cat.type === 'security' ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Security
                          </span>
                        ) : cat.type === 'performance' ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Performance
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <Wrench className="w-3 h-3" /> Fixed
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-white">
                          {cat.title}
                        </h4>
                      </div>

                      <ul className="grid grid-cols-1 gap-2.5 pl-2">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
