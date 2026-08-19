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
          'HMAC-SHA256 & SHA-1 Webhook Signature Verification — timing-safe signature comparison prevents forgery across all 28+ webhook receivers.',
          'Replay Attack Prevention — enforced 5-minute timestamp tolerance window rejecting stale or spoofed alerts.',
          'Distributed Token Bucket Rate Limiter — per-token/per-IP rate limiting protecting webhook ingest endpoints from DDoS storms.'
        ]
      },
      {
        type: 'performance',
        title: 'High-Throughput Ingestion Engine & Deduplication',
        items: [
          'Deterministic SHA-256 Alert Deduplication — auto-fingerprints incoming payload fields to suppress duplicate alerts and secondary cascades.',
          'Sub-15ms ingest latency under sustained high-volume incident load.',
          'Optimized Prisma connection pooling with zero-leak transactional rollbacks.'
        ]
      },
      {
        type: 'added',
        title: 'Official GHCR Production Container Packaging',
        items: [
          'Multi-arch Linux container image (amd64 / arm64) published to ghcr.io/opsknight-labs/opsknight:1.3.1.',
          'Hardened non-root runtime environment with automated Prisma migration bootstrapper.'
        ]
      }
    ]
  },
  {
    version: 'v1.2.0',
    date: 'June 10, 2026',
    summary: 'Slack ChatOps war rooms, multi-provider video conference bridges, and status page subscriber management.',
    dockerTag: 'ghcr.io/opsknight-labs/opsknight:1.2.0',
    githubReleaseUrl: 'https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.2.0',
    categories: [
      {
        type: 'added',
        title: 'Slack ChatOps & Instant Video Bridges',
        items: [
          'Auto-creation of dedicated incident Slack war rooms (#inc-<service>-<id>) with automatic team invites.',
          'One-click video bridge dispatch: Jitsi Meet (self-hosted WebRTC), Google Meet, and Zoom integrations.',
          'Interactive Slack message cards with 1-click Acknowledge, Escalate, and Resolve actions.'
        ]
      },
      {
        type: 'added',
        title: 'Public & Private Status Pages',
        items: [
          'Custom domains and SSL auto-provisioning for external customer-facing status dashboards.',
          'Private internal status pages with SSO authentication for internal microservice uptime visibility.',
          'Email and webhook subscriber notifications for real-time downtime updates.'
        ]
      }
    ]
  },
  {
    version: 'v1.1.0',
    date: 'April 4, 2026',
    summary: 'Timezone-aware on-call scheduling, shift overrides, multi-tier escalation policies, and master encryption key hardening.',
    dockerTag: 'ghcr.io/opsknight-labs/opsknight:1.1.0',
    githubReleaseUrl: 'https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.1.0',
    categories: [
      {
        type: 'added',
        title: 'Multi-Tier On-Call Engine',
        items: [
          'Timezone-aware rotations with automatic daylight savings adjustments and primary/secondary/shadow layers.',
          'One-click shift overrides and swaps without breaking active schedule configurations.',
          'iCal and Google Calendar sync export feeds for personal on-call scheduling.'
        ]
      },
      {
        type: 'security',
        title: 'Security & Session Hardening',
        items: [
          'Master Encryption Key Migration — transitioned to environment-variable master encryption key with transparent, self-healing v1 key fallback migration.',
          'Stable secure cookie enforcement for reverse proxy and load balancer compatibility.'
        ]
      }
    ]
  },
  {
    version: 'v1.0.0',
    date: 'February 1, 2026',
    summary: 'Initial production GA release of OpsKnight Incident Command Center under AGPL-3.0 License.',
    dockerTag: 'ghcr.io/opsknight-labs/opsknight:1.0.0',
    githubReleaseUrl: 'https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.0.0',
    categories: [
      {
        type: 'added',
        title: 'Core Incident Command Center & Scheduling',
        items: [
          'Real-time Server-Sent Events (SSE) live incident triage stream with zero stale caching and sub-second commander updates.',
          'Multi-layer timezone-aware on-call schedules with primary, secondary, and shadow shift rotations with 1-click shift swaps.',
          'Multi-tier automated escalation policies across Slack, Mobile Push, SMS, WhatsApp, Email, and Webhooks.',
          'Branded public & private status pages with custom domains, component uptime history, and subscriber alerts.',
          'Production Analytics Engine with real-time MTTA, MTTR, and SLA response analytics with distributed rate limiting.',
          '1-command container deployment via Docker, Docker Compose, and Kubernetes Helm manifests.'
        ]
      }
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <Tag className="w-3.5 h-3.5" />
            Continuous Evolution
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Release Changelog
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Detailed release notes, security advisories, and architectural improvements across OpsKnight Incident Command Center.
          </p>
        </header>

        {/* Timeline List */}
        <div className="space-y-16 relative">
          
          {/* Vertical Connecting Rule */}
          <div className="absolute top-8 bottom-8 left-4 sm:left-6 w-0.5 bg-slate-200 hidden sm:block" />

          {releases.map((rel) => (
            <div 
              key={rel.version} 
              className="relative sm:pl-16 group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute left-4 -translate-x-1/2 top-7 w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow-md hidden sm:block group-hover:scale-125 transition-transform" />

              {/* Release Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl hover:border-blue-500/30 transition-all space-y-6">
                
                {/* Release Top Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                      {rel.version}
                    </span>
                    {rel.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                        {rel.badge}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {rel.date}
                    </span>
                  </div>

                  <Link
                    href={rel.githubReleaseUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    GitHub Release
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Release Summary */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {rel.summary}
                </p>

                {/* Docker Image Badge */}
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200">
                  <Terminal className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-slate-400 select-none">$ docker pull</span>
                  <span className="text-emerald-400 font-bold truncate">{rel.dockerTag}</span>
                </div>

                {/* Category Groups */}
                <div className="space-y-6 pt-2">
                  {rel.categories.map((cat, idx) => (
                    <div key={idx} className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2">
                        {cat.type === 'added' && <Sparkles className="w-4 h-4 text-blue-600" />}
                        {cat.type === 'security' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                        {cat.type === 'fixed' && <Wrench className="w-4 h-4 text-amber-600" />}
                        {cat.type === 'performance' && <Zap className="w-4 h-4 text-sky-600" />}
                        <h3 className="font-bold text-slate-900 text-sm">
                          {cat.title}
                        </h3>
                      </div>

                      <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {cat.items.map((it, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>{it}</span>
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
