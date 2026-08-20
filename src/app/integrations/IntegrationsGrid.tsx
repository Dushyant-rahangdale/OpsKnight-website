'use client';

import { useState } from 'react';
import Link from 'next/link';
import { withTrailingSlash } from '@/lib/docs/paths';
import { 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  X, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Terminal,
  Sparkles
} from 'lucide-react';
import { integrationIcons, IntegrationKey } from '@/components/icons/IntegrationIcons';
import { BRAND } from '@/lib/brand';

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  iconKey: IntegrationKey;
  desc: string;
  docPath: string;
  protocol: string;
  webhookSlug: string;
  samplePayload: Record<string, unknown>;
  sampleCurl?: string;
}

const allIntegrations: IntegrationItem[] = [
  // APM & Observability
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'APM & Observability',
    iconKey: 'datadog',
    desc: 'Sync monitor alerts, metric anomalies, and synthesized events from Datadog monitors.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/datadog/',
    protocol: 'HMAC-SHA256 Webhook',
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
    id: 'newrelic',
    name: 'New Relic',
    category: 'APM & Observability',
    iconKey: 'newrelic',
    desc: 'Route New Relic APM policy violations, NRQL condition alerts, and Golden Signal breaches.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/new-relic/',
    protocol: 'JSON Webhook',
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
    category: 'APM & Observability',
    iconKey: 'dynatrace',
    desc: 'Ingest Davis AI root cause notifications and multi-component failure clusters.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/dynatrace/',
    protocol: 'REST Webhook',
    webhookSlug: 'dynatrace',
    samplePayload: {
      ProblemID: 'P-24910',
      ProblemTitle: 'Failure rate increase in Customer Service',
      State: 'OPEN',
      ImpactedEntity: 'Payment Service'
    }
  },
  {
    id: 'appdynamics',
    name: 'AppDynamics',
    category: 'APM & Observability',
    iconKey: 'appdynamics',
    desc: 'Forward business transaction health violations and infrastructure event triggers.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/appdynamics/',
    protocol: 'HTTP Post',
    webhookSlug: 'appdynamics',
    samplePayload: {
      event_type: 'POLICY_VIOLATION',
      application_name: 'Core Banking API',
      severity: 'CRITICAL'
    }
  },
  {
    id: 'honeycomb',
    name: 'Honeycomb',
    category: 'APM & Observability',
    iconKey: 'honeycomb',
    desc: 'Trigger high-urgency alerts from Honeycomb BubbleUp triggers and distributed SLO burn rates.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/honeycomb/',
    protocol: 'JSON Trigger',
    webhookSlug: 'honeycomb',
    samplePayload: {
      name: 'p99 latency breach in auth-service',
      dataset: 'production-traces',
      operator: '>',
      threshold: 1500
    }
  },
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'APM & Observability',
    iconKey: 'sentry',
    desc: 'Create deduplicated incidents from uncaught application exceptions and performance transactions.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/sentry/',
    protocol: 'Signed Webhook',
    webhookSlug: 'sentry',
    samplePayload: {
      id: '10928374',
      project_name: 'auth-service',
      message: 'Unhandled Promise Rejection: RedisTimeoutException',
      level: 'error'
    }
  },
  {
    id: 'splunk',
    name: 'Splunk Observability',
    category: 'APM & Observability',
    iconKey: 'splunk',
    desc: 'Real-time ingestion for Splunk Infrastructure Monitoring detector alerts and incident bridges.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/splunk-observability/',
    protocol: 'Detector Webhook',
    webhookSlug: 'splunk',
    samplePayload: {
      detector: 'Kubernetes Memory Limit Breach',
      status: 'CRITICAL',
      timestamp: 1723982400
    }
  },

  // Metrics & Daemons
  {
    id: 'prometheus',
    name: 'Prometheus Alertmanager',
    category: 'Metrics & Daemons',
    iconKey: 'prometheus',
    desc: 'Native Alertmanager webhook receiver with deterministic SHA-256 fingerprint deduplication.',
    docPath: '/docs/v1.3/integrations/metrics-alerting/prometheus/',
    protocol: 'Native Alertmanager',
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
    category: 'Metrics & Daemons',
    iconKey: 'grafana',
    desc: 'Ingest Grafana unified alerting rules and contact point webhooks in real time.',
    docPath: '/docs/v1.3/integrations/apm-monitoring/grafana/',
    protocol: 'Contact Point',
    webhookSlug: 'grafana',
    samplePayload: {
      title: '[FIRING:1] Database Query Latency High',
      state: 'alerting',
      message: 'p99 latency exceeds 2500ms on primary Postgres pool',
      ruleUrl: 'https://grafana.internal.net/alerting/grafana/1'
    }
  },
  {
    id: 'zabbix',
    name: 'Zabbix',
    category: 'Metrics & Daemons',
    iconKey: 'zabbix',
    desc: 'Enterprise-grade Zabbix media type webhook with EVENT.ID deduplication & recovery sync.',
    docPath: '/docs/v1.3/integrations/metrics-alerting/zabbix/',
    protocol: 'Media Type Webhook',
    webhookSlug: 'zabbix',
    samplePayload: {
      event_id: '984021',
      host: 'db-replica-01.prod',
      severity: 'Disaster',
      problem_name: 'PostgreSQL replication lag > 300s',
      status: 'PROBLEM'
    }
  },
  {
    id: 'nagios',
    name: 'Nagios Core & XI',
    category: 'Metrics & Daemons',
    iconKey: 'nagios',
    desc: 'Connect host & service state changes, notification macros, and scheduled downtime.',
    docPath: '/docs/v1.3/integrations/metrics-alerting/nagios/',
    protocol: 'Notification Macro',
    webhookSlug: 'nagios',
    samplePayload: {
      notification_type: 'PROBLEM',
      host_name: 'prod-lb-ingress',
      service_desc: 'HTTP_HEALTHCHECK',
      state: 'CRITICAL',
      output: '502 Bad Gateway from upstream pool'
    }
  },
  {
    id: 'icinga',
    name: 'Icinga 2',
    category: 'Metrics & Daemons',
    iconKey: 'icinga',
    desc: 'Native notification command scripts for Icinga 2 check results, state changes, and recovery events.',
    docPath: '/docs/v1.3/integrations/metrics-alerting/icinga/',
    protocol: 'Notification Pipe',
    webhookSlug: 'icinga',
    samplePayload: {
      host: 'k8s-worker-node-14',
      service: 'Disk Space /var/lib/docker',
      state: 'CRITICAL',
      check_output: 'Disk usage is at 96.8%'
    }
  },

  // Cloud & Infrastructure
  {
    id: 'cloudwatch',
    name: 'AWS CloudWatch & SNS',
    category: 'Cloud & Infrastructure',
    iconKey: 'cloudwatch',
    desc: 'Connect AWS CloudWatch composite alarms, SNS notifications, and EventBridge events.',
    docPath: '/docs/v1.3/integrations/cloud/aws-cloudwatch/',
    protocol: 'AWS SNS / HTTPS',
    webhookSlug: 'aws-cloudwatch',
    samplePayload: {
      AlarmName: 'High-EC2-CPUUtilization',
      NewStateValue: 'ALARM',
      NewStateReason: 'Threshold Crossed: 1 datapoint [94.2] was greater than 85.0',
      Region: 'us-east-1'
    }
  },
  {
    id: 'azure',
    name: 'Azure Monitor',
    category: 'Cloud & Infrastructure',
    iconKey: 'azure',
    desc: 'Ingest Azure Monitor Action Groups, Log Analytics alerts, and Application Insights signals.',
    docPath: '/docs/v1.3/integrations/cloud/azure-monitor/',
    protocol: 'Azure Action Group',
    webhookSlug: 'azure-monitor',
    samplePayload: {
      schemaId: 'azureMonitorCommonAlertSchema',
      data: {
        essentials: {
          alertRule: 'High HTTP 5xx Rate on AppGateway',
          severity: 'Sev0',
          signalType: 'Metric'
        }
      }
    }
  },
  {
    id: 'googlecloud',
    name: 'Google Cloud Monitoring',
    category: 'Cloud & Infrastructure',
    iconKey: 'googlecloud',
    desc: 'Sync Google Cloud Alerting notification channels and Incident Summary webhooks.',
    docPath: '/docs/v1.3/integrations/cloud/google-cloud-monitoring/',
    protocol: 'GCP Notification Channel',
    webhookSlug: 'gcp-monitoring',
    samplePayload: {
      incident: {
        incident_id: '0.m1n82j3k4',
        resource_name: 'prod-gke-cluster-asia-south1',
        state: 'open',
        summary: 'Cloud SQL storage usage above 92%'
      }
    }
  },

  // CI/CD & Deployments
  {
    id: 'github',
    name: 'GitHub Actions',
    category: 'CI/CD & Deployments',
    iconKey: 'github',
    desc: 'Automate incident triggering and deployment rollback alerts on workflow failures.',
    docPath: '/docs/v1.3/integrations/ci-cd/github/',
    protocol: 'GitHub Webhook',
    webhookSlug: 'github-actions',
    samplePayload: {
      action: 'completed',
      workflow_run: {
        name: 'Deploy Production',
        conclusion: 'failure',
        head_branch: 'main',
        head_sha: '7f93a1c'
      }
    }
  },
  {
    id: 'gitlab',
    name: 'GitLab CI/CD',
    category: 'CI/CD & Deployments',
    iconKey: 'gitlab',
    desc: 'Track pipeline execution failures, runner downtime, and automatic incident resolution on retry success.',
    docPath: '/docs/v1.3/integrations/ci-cd/gitlab/',
    protocol: 'GitLab Pipeline Hook',
    webhookSlug: 'gitlab-ci',
    samplePayload: {
      object_kind: 'pipeline',
      object_attributes: {
        id: 489201,
        ref: 'main',
        status: 'failed',
        detailed_status: 'failed'
      }
    }
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket Pipelines',
    category: 'CI/CD & Deployments',
    iconKey: 'bitbucket',
    desc: 'Catch build breaks and automated deployment pipeline failures with zero latency.',
    docPath: '/docs/v1.3/integrations/ci-cd/bitbucket/',
    protocol: 'Bitbucket Webhook',
    webhookSlug: 'bitbucket-pipelines',
    samplePayload: {
      pipeline_state: 'FAILED',
      repository: 'payment-microservice',
      step_name: 'Deploy to Kubernetes'
    }
  },
  {
    id: 'vercel',
    name: 'Vercel Deployments',
    category: 'CI/CD & Deployments',
    iconKey: 'vercel',
    desc: 'Alert immediately on production deployment build failures and edge function crashes.',
    docPath: '/docs/v1.3/integrations/ci-cd/vercel/',
    protocol: 'Vercel Deployment Webhook',
    webhookSlug: 'vercel',
    samplePayload: {
      type: 'deployment.error',
      payload: {
        deploymentId: 'dpl_8k3j921k',
        name: 'opsknight-dashboard',
        error: 'Build exited with code 1: Static page generation failed'
      }
    }
  },

  // Uptime & Synthetics
  {
    id: 'uptimerobot',
    name: 'UptimeRobot',
    category: 'Uptime & Synthetics',
    iconKey: 'uptimerobot',
    desc: 'Ingest synthetic ping, HTTP keyword, and port check failure notifications with auto-resolve.',
    docPath: '/docs/v1.3/integrations/uptime/uptimerobot/',
    protocol: 'Uptime Webhook',
    webhookSlug: 'uptimerobot',
    samplePayload: {
      monitorFriendlyName: 'Public API Gateway',
      alertType: '1',
      alertTypeFriendlyName: 'Down',
      alertDetails: 'HTTP 504 Gateway Timeout'
    }
  },
  {
    id: 'pingdom',
    name: 'Pingdom',
    category: 'Uptime & Synthetics',
    iconKey: 'pingdom',
    desc: 'Route global probe synthetic check failures and latency degradations to on-call teams.',
    docPath: '/docs/v1.3/integrations/uptime/pingdom/',
    protocol: 'Pingdom Webhook',
    webhookSlug: 'pingdom',
    samplePayload: {
      check_name: 'EU Login Endpoint',
      current_state: 'DOWN',
      description: 'Connection timed out after 30000ms'
    }
  },
  {
    id: 'betterstack',
    name: 'Better Stack',
    category: 'Uptime & Synthetics',
    iconKey: 'betterstack',
    desc: 'Stream heartbeats, synthetic checks, and cron monitor timeouts directly into OpsKnight.',
    docPath: '/docs/v1.3/integrations/uptime/better-uptime/',
    protocol: 'Heartbeat Webhook',
    webhookSlug: 'betterstack',
    samplePayload: {
      monitor_name: 'Database Backup Cron Job',
      status: 'down',
      reported_at: '2026-08-18T19:00:00Z'
    }
  },
  {
    id: 'uptimekuma',
    name: 'Uptime Kuma',
    category: 'Uptime & Synthetics',
    iconKey: 'uptimekuma',
    desc: 'Connect self-hosted Uptime Kuma monitors to trigger OpsKnight escalation schedules.',
    docPath: '/docs/v1.3/integrations/uptime/uptime-kuma/',
    protocol: 'Kuma Webhook',
    webhookSlug: 'uptimekuma',
    samplePayload: {
      heartbeat: {
        status: 0,
        msg: 'Connection refused on port 5432',
        ping: null
      },
      monitor: {
        name: 'PostgreSQL Primary Node'
      }
    }
  },

  // ChatOps & Collaboration
  {
    id: 'slack',
    name: 'Slack ChatOps',
    category: 'ChatOps & Collaboration',
    iconKey: 'slack',
    desc: 'Dedicated war room auto-provisioning, auto-invited on-call responders, interactive action buttons, and slash commands.',
    docPath: '/docs/v1.3/integrations/communication/slack-chatops/',
    protocol: 'Two-Way ChatOps Bot',
    webhookSlug: 'slack-events',
    samplePayload: {
      command: '/incident ack',
      channel_id: 'C0847192',
      user_name: 'dushyant'
    }
  },
  {
    id: 'jira',
    name: 'Jira Cloud',
    category: 'ChatOps & Collaboration',
    iconKey: 'jira',
    desc: 'Bi-directional issue creation, postmortem action items sync, and live status mirroring with Jira Software.',
    docPath: '/docs/v1.3/integrations/issue-tracking/jira/',
    protocol: 'Bi-Directional Sync',
    webhookSlug: 'jira-cloud',
    samplePayload: {
      issue_event_type_name: 'issue_created',
      issue: {
        key: 'OPS-104',
        fields: {
          summary: 'Root Cause: Database connection pool exhaustion'
        }
      }
    }
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Alerts',
    category: 'ChatOps & Collaboration',
    iconKey: 'whatsapp',
    desc: 'High-priority SMS & WhatsApp pager alerts for urgent Sev-0/Sev-1 escalations with ack links.',
    docPath: '/docs/v1.3/administration/notifications/',
    protocol: 'Multi-Channel Pager',
    webhookSlug: 'whatsapp-pager',
    samplePayload: {
      to: '+14155552671',
      template: 'incident_critical_alert',
      incident_id: 'inc-384'
    }
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty Events API v2',
    category: 'ChatOps & Collaboration',
    iconKey: 'pagerduty',
    desc: 'Ingest adapter for Events API v2 payloads. Change the destination URL. Not a PagerDuty product and not a guarantee of every vendor integration.',
    docPath: '/docs/v1.3/integrations/custom/pagerduty-emulation/',
    protocol: 'Events API v2 ingest',
    webhookSlug: 'pagerduty-v2',
    samplePayload: {
      routing_key: 'YOUR_INTEGRATION_KEY',
      event_action: 'trigger',
      payload: {
        summary: 'CPU Load > 95% on worker pool',
        severity: 'critical',
        source: 'prod-k8s'
      }
    }
  }
];

const categoryList = [
  'All',
  'APM & Observability',
  'Metrics & Daemons',
  'Cloud & Infrastructure',
  'CI/CD & Deployments',
  'Uptime & Synthetics',
  'ChatOps & Collaboration'
];

export default function IntegrationsGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationItem | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const filteredIntegrations = allIntegrations.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyWebhook = (slug: string) => {
    navigator.clipboard.writeText(`https://opsknight.yourdomain.com/api/webhooks/${slug}`);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const handleCopyPayload = (payload: Record<string, unknown>) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleCopyCurl = (item: IntegrationItem) => {
    const curl = `curl -X POST https://opsknight.yourdomain.com/api/webhooks/${item.webhookSlug} \\\n  -H "Content-Type: application/json" \\\n  -H "X-OpsKnight-Token: YOUR_INTEGRATION_SECRET" \\\n  -d '${JSON.stringify(item.samplePayload)}'`;
    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="space-y-12">
      
      {/* Events API v2 ingest banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 p-2 shrink-0 flex items-center justify-center shadow-inner">
            {integrationIcons.pagerduty}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Drop-In Migration Endpoint
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Keep Events API v2 payloads. Change the destination URL.
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl mt-1">
              OpsKnight accepts PagerDuty Events API v2 ingest at{" "}
              <code className="text-blue-600 font-mono">/api/integrations/pagerduty/v2/enqueue</code>.
              That is an adapter — not a PagerDuty clone of the whole product.
            </p>
          </div>
        </div>

        <Link
          href={withTrailingSlash("/docs/v1.3/integrations/custom/pagerduty-emulation/")}
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
        >
          Events API v2 setup
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${BRAND.integrationCountLabel} integrations by name, APM, cloud, or protocol…`}
            className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900 px-2 py-1 rounded-md bg-slate-100"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              {cat === "All" ? `All (${allIntegrations.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid with Official Logos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            onClick={() => setSelectedIntegration(integration)}
            className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500/40 hover:shadow-md transition-all cursor-pointer shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                  {integrationIcons[integration.iconKey]}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700">
                  {integration.protocol}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors mb-1.5">
                {integration.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {integration.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                Inspect Payload
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
              setActiveCategory('All');
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
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl p-6 sm:p-8 text-white space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white p-2.5 shrink-0 shadow-md flex items-center justify-center">
                  {integrationIcons[selectedIntegration.iconKey]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono font-bold">
                      {selectedIntegration.category}
                    </span>
                    <span className="text-xs text-slate-400">• Native Webhook Ingestion</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {selectedIntegration.name}
                  </h3>
                </div>
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
                Ingestion Endpoint (POST)
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-sky-400">
                <span className="truncate pr-3">
                  https://opsknight.yourdomain.com/api/webhooks/{selectedIntegration.webhookSlug}
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

            {/* Required Headers Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Forensic Security & Authentication
              </label>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs font-mono space-y-1 text-slate-300">
                <div><span className="text-blue-400">Content-Type:</span> application/json</div>
                <div><span className="text-blue-400">X-OpsKnight-Signature:</span> HMAC-SHA256(payload, secret)</div>
                <div><span className="text-blue-400">X-OpsKnight-Timestamp:</span> Unix Epoch Seconds (5-min replay protection)</div>
              </div>
            </div>

            {/* Sample Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  Sample JSON Ingestion Payload
                </label>
                <button
                  onClick={() => handleCopyPayload(selectedIntegration.samplePayload)}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedPayload ? 'Copied' : 'Copy JSON'}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto max-h-48">
                {JSON.stringify(selectedIntegration.samplePayload, null, 2)}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
              <button
                onClick={() => handleCopyCurl(selectedIntegration)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-white/10"
              >
                {copiedCurl ? <Check className="w-4 h-4 text-emerald-400" /> : <Terminal className="w-4 h-4 text-sky-400" />}
                {copiedCurl ? 'cURL Command Copied!' : 'Copy cURL Test Command'}
              </button>

              <Link
                href={withTrailingSlash(selectedIntegration.docPath)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Read Setup Guide
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
