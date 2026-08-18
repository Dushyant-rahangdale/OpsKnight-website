"use client";

import React, { useState } from "react";
import { Check, Copy, ArrowRight } from "lucide-react";

const TABS = [
  { id: "prometheus", label: "Prometheus" },
  { id: "datadog", label: "Datadog" },
  { id: "grafana", label: "Grafana" },
  { id: "curl", label: "cURL / HTTP" },
];

const CODE_SNIPPETS: Record<string, string> = {
  prometheus: `receivers:
- name: 'opsknight-alerts'
  pagerduty_configs:
  - service_key: '<your-service-routing-key>'
    # Drop-in replacement! Just point to your self-hosted OpsKnight host
    url: 'https://opsknight.yourcompany.com/api/v2/enqueue'`,
  datadog: `{
  "name": "OpsKnight PagerDuty API",
  // Change events.pagerduty.com to your OpsKnight host
  "url": "https://opsknight.yourcompany.com/api/v2/enqueue",
  "payload": "{\\"routing_key\\": \\"$ROUTING_KEY\\", \\"event_action\\": \\"trigger\\", \\"payload\\": {\\"summary\\": \\"$EVENT_MSG\\", \\"source\\": \\"datadog\\"}}"
}`,
  grafana: `apiVersion: 1
contactPoints:
  - name: OpsKnight
    receivers:
      - uid: opsknight-pd
        type: pagerduty
        settings:
          integrationKey: <your-integration-key>
          # Standard PD config, your custom OpsKnight endpoint
          url: https://opsknight.yourcompany.com/api/v2/enqueue`,
  curl: `curl -X POST https://opsknight.yourcompany.com/api/v2/enqueue \\
  -H "Content-Type: application/json" \\
  -d '{
    "routing_key": "YOUR_SERVICE_KEY",
    "event_action": "trigger",
    "payload": {
      "summary": "High CPU utilization on PostgreSQL database primary",
      "severity": "critical",
      "source": "db-primary-01"
    }
  }'`
};

export function PagerDutyMigration() {
  const [activeTab, setActiveTab] = useState("prometheus");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              Drop-in PagerDuty Compatibility
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Migrate from PagerDuty in <span className="text-blue-400">60 Seconds</span>.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              OpsKnight natively implements the standard <strong className="text-white">PagerDuty Events API v2 (<code className="bg-slate-900 px-1.5 py-0.5 rounded text-sm text-sky-400 font-mono">/v2/enqueue</code>)</strong>. No need to reconfigure 20+ monitoring tools or rewrite custom scripts.
            </p>
            
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">The Only Change Needed</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 text-[10px] text-red-400 font-bold bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded text-center">BEFORE</div>
                  <code className="text-xs sm:text-sm text-slate-500 line-through font-mono">https://events.pagerduty.com/v2/enqueue</code>
                </div>
                <div className="flex items-center gap-3 text-slate-500 pl-4">
                  <ArrowRight size={14} className="text-blue-400" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-[10px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded text-center">AFTER</div>
                  <code className="text-xs sm:text-sm text-emerald-300 font-mono font-bold">https://opsknight.yourcompany.com/api/v2/enqueue</code>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0f172a] overflow-hidden shadow-2xl">
            <div className="flex border-b border-white/10 bg-slate-900/80 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? "text-blue-400 border-b-2 border-blue-400 bg-blue-500/10" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="relative p-6 bg-slate-950">
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <pre className="overflow-x-auto text-xs sm:text-sm text-slate-300 font-mono leading-relaxed pt-6">
                <code>{CODE_SNIPPETS[activeTab]}</code>
              </pre>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
