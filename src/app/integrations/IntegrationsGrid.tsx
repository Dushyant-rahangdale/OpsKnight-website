'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  X,
  Zap,
  ArrowRight
} from 'lucide-react';

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  path: string;
  webhookSlug: string;
  samplePayload: Record<string, unknown>;
}

const integrations: IntegrationItem[] = [
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'APM & Monitoring',
    desc: 'Sync monitor alerts, metric anomalies, and synthesized events from Datadog.',
    path: '/docs/v1.3/integrations/apm-monitoring',
    webhookSlug: 'datadog',
    samplePayload: {
      event_type: 'datadog_alert',
      title: 'High CPU utilization on prod-api-cluster',
      body: 'CPU usage is above 90% for > 5 minutes',
      priority: 'high',
      tags: ['env:production', 'service:api-gateway']
    }
  },
  {
    id: 'prometheus',
    name: 'Prometheus Alertmanager',
    category: 'Metrics & Daemons',
    desc: 'Native Alertmanager webhook receiver with deterministic fingerprint deduplication.',
    path: '/docs/v1.3/integrations/metrics-alerting',
    webhookSlug: 'prometheus',
    samplePayload: {
      receiver: 'opsknight-webhook',
      status: 'firing',
      alerts: [
        {
          status: 'firing',
          labels: { alertname: 'KubePodCrashLooping', severity: 'critical', namespace: 'production' },
          annotations: { summary: 'Pod in crash loop in production' }
        }
      ]
    }
  },
  {
    id: 'grafana',
    name: 'Grafana Alerting',
    category: 'APM & Monitoring',
    desc: 'Ingest Grafana unified alerting rules and contact point webhooks in real time.',
    path: '/docs/v1.3/integrations/apm-monitoring',
    webhookSlug: 'grafana',
    samplePayload: {
      title: '[FIRING:1] Database Query Latency High',
      state: 'alerting',
      message: 'p99 latency exceeds 2500ms on primary Postgres pool',
      ruleUrl: 'https://grafana.internal.net/alerting/grafana/1'
    }
  },
  {
    id: 'cloudwatch',
    name: 'AWS CloudWatch & SNS',
    category: 'Cloud',
    desc: 'Connect AWS CloudWatch alarms, SNS notifications, and EventBridge rules.',
    path: '/docs/v1.3/integrations/cloud',
    webhookSlug: 'aws-cloudwatch',
    samplePayload: {
      AlarmName: 'High-EC2-CPUUtilization',
      NewStateValue: 'ALARM',
      NewStateReason: 'Threshold Crossed: 1 datapoint [94.2] was greater than 85.0',
      Region: 'us-east-1'
    }
  },
  {
    id: 'sentry',
    name: 'Sentry Error Tracking',
    category: 'APM & Monitoring',
    desc: 'Create high-urgency incidents from uncaught exceptions and transaction anomalies.',
    path: '/docs/v1.3/integrations/apm-monitoring',
    webhookSlug: 'sentry',
    samplePayload: {
      id: '10928374',
      project_name: 'auth-service',
      message: 'Unhandled Promise Rejection: RedisTimeoutException',
      level: 'error',
      url: 'https://sentry.io/organizations/opsknight/issues/10928374'
    }
  },
  {
    id: 'newrelic',
    name: 'New Relic',
    category: 'APM & Monitoring',
    desc: 'Route New Relic APM policy violations and Golden Signal alerts directly into triage.',
    path: '/docs/v1.3/integrations/apm-monitoring',
    webhookSlug: 'newrelic',
    samplePayload: {
      account_name: 'Production Core',
      incident_title: 'Throughput Drop on Checkout API',
      severity: 'CRITICAL',
      targets: ['checkout-service-prod']
    }
  },
  {
    id: 'dynatrace',
    name: 'Dynatrace',
    category: 'APM & Monitoring',
    desc: 'Ingest Davis AI problem notifications and root-cause analyses into OpsKnight.',
    path: '/docs/v1.3/integrations/apm-monitoring',
    webhookSlug: 'dynatrace',
    samplePayload: {
      ProblemID: 'P-24901',
      ProblemTitle: 'Failure rate increase on PaymentGateway',
      State: 'OPEN',
      ImpactedEntity: 'Payment Service'
    }
  },
  {
    id: 'azure-monitor',
    name: 'Azure Monitor',
    category: 'Cloud',
    desc: 'Ingest metric and log search alerts from Microsoft Azure Monitor pipelines.',
    path: '/docs/v1.3/integrations/cloud',
    webhookSlug: 'azure-monitor',
    samplePayload: {
      schemaId: 'azureMonitorCommonAlertSchema',
      data: {
        essentials: {
          alertRule: 'High Memory on App Service Plan',
          severity: 'Sev1',
          monitorCondition: 'Fired'
        }
      }
    }
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud Monitoring',
    category: 'Cloud',
    desc: 'Receive Cloud Monitoring alerting policies and incident state updates.',
    path: '/docs/v1.3/integrations/cloud',
    webhookSlug: 'gcp-monitoring',
    samplePayload: {
      incident: {
        incident_id: '0.m9182374',
        policy_name: 'GKE Node Pool Pressure',
        state: 'open',
        summary: 'CPU usage > 90% on node pool gke-prod-pool-1'
      }
    }
  },
  {
    id: 'zabbix',
    name: 'Zabbix Enterprise',
    category: 'Metrics & Daemons',
    desc: 'Bi-directional integration with Zabbix media types and trigger severity updates.',
    path: '/docs/v1.3/integrations/metrics-alerting',
    webhookSlug: 'zabbix',
    samplePayload: {
      event_id: '948172',
      trigger_name: 'Host unreachable on 10.0.4.12',
      severity: 'High',
      host: 'db-replica-03'
    }
  },
  {
    id: 'uptime-robot',
    name: 'UptimeRobot',
    category: 'Uptime & Synthetics',
    desc: 'Instant downtime alerts from globally distributed UptimeRobot ping checkers.',
    path: '/docs/v1.3/integrations/uptime',
    webhookSlug: 'uptimerobot',
    samplePayload: {
      monitorID: '7829104',
      monitorFriendlyName: 'Public API Edge',
      alertType: '1',
      alertDetails: 'Connection Timeout after 30000ms'
    }
  },
  {
    id: 'better-uptime',
    name: 'Better Uptime',
    category: 'Uptime & Synthetics',
    desc: 'Ingest synthetic monitor outages and heartbeats from Better Uptime.',
    path: '/docs/v1.3/integrations/uptime',
    webhookSlug: 'better-uptime',
    samplePayload: {
      name: 'Primary Auth Gateway',
      status: 'down',
      cause: 'HTTP 502 Bad Gateway',
      started_at: '2026-08-19T00:15:00Z'
    }
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'CI/CD & DevOps',
    desc: 'Trigger deployment failure incidents directly from CI/CD pipeline workflow jobs.',
    path: '/docs/v1.3/integrations/ci-cd',
    webhookSlug: 'github-actions',
    samplePayload: {
      workflow: 'Deploy to Production',
      status: 'failure',
      repository: 'opsknight-labs/api-backend',
      actor: 'ci-bot'
    }
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI/CD',
    category: 'CI/CD & DevOps',
    desc: 'Alert on failed deployment jobs and pipeline stage errors in GitLab.',
    path: '/docs/v1.3/integrations/ci-cd',
    webhookSlug: 'gitlab-ci',
    samplePayload: {
      object_kind: 'pipeline',
      object_attributes: { status: 'failed', ref: 'main' },
      project: { name: 'billing-service' }
    }
  },
  {
    id: 'slack',
    name: 'Slack (War Rooms & ChatOps)',
    category: 'Chat & Notifications',
    desc: 'Bi-directional war room creation with 1-click Acknowledge, Assign, and Resolve.',
    path: '/docs/v1.3/integrations/communication',
    webhookSlug: 'slack',
    samplePayload: {
      channel_id: 'C0948271',
      action: 'acknowledge',
      incident_id: 'inc-y5hh7q-opsknight'
    }
  },
  {
    id: 'pagerduty-emulation',
    name: 'PagerDuty Events API v2',
    category: 'Custom & Emulation',
    desc: 'Drop-in replacement for v2/enqueue. Migrate in 30 seconds with 0 agent rewrites.',
    path: '/docs/v1.3/integrations/custom',
    webhookSlug: 'v2/enqueue',
    samplePayload: {
      routing_key: 'pd-compat-route-key-0192',
      event_action: 'trigger',
      payload: {
        summary: 'Database connection pool exhausted',
        severity: 'critical',
        source: 'prod-rds-cluster'
      }
    }
  }
];

const categories = [
  'All (16)',
  'APM & Monitoring',
  'Cloud',
  'Metrics & Daemons',
  'CI/CD & DevOps',
  'Uptime & Synthetics',
  'Chat & Notifications',
  'Custom & Emulation'
];

export default function IntegrationsGrid() {
  const [activeCategory, setActiveCategory] = useState('All (16)');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationItem | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const filteredIntegrations = integrations.filter((item) => {
    const matchesCategory = activeCategory === 'All (16)' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyWebhook = (slug: string) => {
    navigator.clipboard.writeText(`https://app.opsknight.com/api/v1/webhooks/${slug}/<YOUR_SERVICE_TOKEN>`);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const handleCopyPayload = (payload: Record<string, unknown>) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search integrations by tool name, APM, cloud, or protocol (e.g. Datadog, Prometheus, Sentry, AWS)..."
            className="w-full bg-slate-900/90 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded-md bg-white/5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            onClick={() => setSelectedIntegration(integration)}
            className="group flex flex-col justify-between p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-blue-500/40 hover:bg-slate-900 transition-all cursor-pointer shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-base font-black text-blue-400 group-hover:scale-105 transition-transform">
                  {integration.name.charAt(0)}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  {integration.category}
                </span>
              </div>

              <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors mb-2">
                {integration.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {integration.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                View Webhook Spec
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/5">
          <p className="text-slate-400 text-sm">No integrations found matching &ldquo;{searchQuery}&rdquo;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All (16)');
            }}
            className="mt-3 text-xs font-semibold text-blue-400 hover:underline"
          >
            Reset search filters
          </button>
        </div>
      )}

      {/* Interactive Webhook Modal / Drawer */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl p-6 sm:p-8 text-white space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono font-bold">
                    {selectedIntegration.category}
                  </span>
                  <span className="text-xs text-slate-400">Native Ingestion</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  {selectedIntegration.name} Integration
                </h3>
              </div>

              <button
                onClick={() => setSelectedIntegration(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedIntegration.desc}
            </p>

            {/* Webhook Endpoint Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                Webhook Ingest Endpoint (POST)
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-sky-400">
                <span className="truncate pr-3">
                  https://app.opsknight.com/api/v1/webhooks/{selectedIntegration.webhookSlug}/&lt;SERVICE_TOKEN&gt;
                </span>
                <button
                  onClick={() => handleCopyWebhook(selectedIntegration.webhookSlug)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all shrink-0 flex items-center gap-1"
                  title="Copy Endpoint"
                >
                  {copiedWebhook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px] font-sans">{copiedWebhook ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Sample Payload Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Example Alert Payload (JSON)
                </label>
                <button
                  onClick={() => handleCopyPayload(selectedIntegration.samplePayload)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPayload ? 'Copied Payload!' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto max-h-48">
                {JSON.stringify(selectedIntegration.samplePayload, null, 2)}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <Link
                href={selectedIntegration.path}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Open Full Technical Guide <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
