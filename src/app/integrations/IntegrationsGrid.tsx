'use client';

import { useState } from 'react';
import Link from 'next/link';

const integrations = [
  { name: 'Datadog', category: 'APM & Monitoring', desc: 'Sync alerts and metrics from Datadog', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'New Relic', category: 'APM & Monitoring', desc: 'Route New Relic incidents', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'Dynatrace', category: 'APM & Monitoring', desc: 'Ingest problems from Dynatrace', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'AppDynamics', category: 'APM & Monitoring', desc: 'Connect AppDynamics health rule violations', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'Grafana', category: 'APM & Monitoring', desc: 'Receive alerts from Grafana', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'Honeycomb', category: 'APM & Monitoring', desc: 'Trigger incidents from Honeycomb triggers', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'Sentry', category: 'APM & Monitoring', desc: 'Create incidents from Sentry issues', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'Splunk Observability', category: 'APM & Monitoring', desc: 'Route Splunk alerts to OpsKnight', path: '/docs/v1.3/integrations/apm-monitoring' },
  { name: 'AWS CloudWatch', category: 'Cloud', desc: 'Connect AWS CloudWatch alarms', path: '/docs/v1.3/integrations/cloud' },
  { name: 'Azure Monitor', category: 'Cloud', desc: 'Ingest alerts from Azure Monitor', path: '/docs/v1.3/integrations/cloud' },
  { name: 'Google Cloud Monitoring', category: 'Cloud', desc: 'Receive GCP alerting policies', path: '/docs/v1.3/integrations/cloud' },
  { name: 'Prometheus', category: 'Metrics & Daemons', desc: 'Native Alertmanager integration', path: '/docs/v1.3/integrations/metrics-alerting' },
  { name: 'Zabbix', category: 'Metrics & Daemons', desc: 'Two-way sync with Zabbix triggers', path: '/docs/v1.3/integrations/metrics-alerting' },
  { name: 'Nagios', category: 'Metrics & Daemons', desc: 'Connect Nagios host and service alerts', path: '/docs/v1.3/integrations/metrics-alerting' },
  { name: 'Icinga 2', category: 'Metrics & Daemons', desc: 'Receive notifications from Icinga 2', path: '/docs/v1.3/integrations/metrics-alerting' },
  { name: 'GitHub Actions', category: 'CI/CD', desc: 'Trigger incidents from failed workflows', path: '/docs/v1.3/integrations/ci-cd' },
  { name: 'GitLab CI/CD', category: 'CI/CD', desc: 'Alert on failed GitLab pipelines', path: '/docs/v1.3/integrations/ci-cd' },
  { name: 'Bitbucket Pipelines', category: 'CI/CD', desc: 'Route Bitbucket build failures', path: '/docs/v1.3/integrations/ci-cd' },
  { name: 'Vercel', category: 'CI/CD', desc: 'Receive Vercel deployment alerts', path: '/docs/v1.3/integrations/ci-cd' },
  { name: 'UptimeRobot', category: 'Uptime', desc: 'Connect UptimeRobot monitors', path: '/docs/v1.3/integrations/uptime' },
  { name: 'Pingdom', category: 'Uptime', desc: 'Route Pingdom downtime alerts', path: '/docs/v1.3/integrations/uptime' },
  { name: 'Better Uptime', category: 'Uptime', desc: 'Ingest Better Uptime incidents', path: '/docs/v1.3/integrations/uptime' },
  { name: 'Uptime Kuma', category: 'Uptime', desc: 'Receive Uptime Kuma notifications', path: '/docs/v1.3/integrations/uptime' },
  { name: 'Elastic/Kibana', category: 'Logs', desc: 'Alert on Elasticsearch queries', path: '/docs/v1.3/integrations/logs-events' },
  { name: 'Splunk On-Call', category: 'Logs', desc: 'Migrate from Splunk On-Call', path: '/docs/v1.3/integrations/logs-events' },
  { name: 'Slack', category: 'Communication', desc: 'ChatOps & Incident War Rooms', path: '/docs/v1.3/integrations/communication' },
  { name: 'Jira Cloud', category: 'Issue Tracking', desc: 'Bi-directional Jira issue sync', path: '/docs/v1.3/integrations/issue-tracking' },
  { name: 'Generic Webhooks', category: 'Custom', desc: 'Custom HTTP payloads', path: '/docs/v1.3/integrations/custom' },
  { name: 'PagerDuty Emulation', category: 'Custom', desc: 'Drop-in replacement for PagerDuty endpoints', path: '/docs/v1.3/integrations/custom' },
];

const categories = ['All', 'APM & Monitoring', 'Cloud', 'Metrics & Daemons', 'CI/CD', 'Uptime', 'Communication', 'Custom', 'Logs', 'Issue Tracking'];

export default function IntegrationsGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredIntegrations = activeCategory === 'All' 
    ? integrations 
    : integrations.filter(i => i.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-white text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredIntegrations.map(integration => (
          <Link 
            href={integration.path} 
            key={integration.name}
            className="group block p-6 rounded-xl bg-slate-900 border border-white/5 hover:border-white/15 transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-300 group-hover:text-white transition-colors border border-white/5">
                {integration.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {integration.name}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {integration.category}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {integration.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
