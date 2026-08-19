"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Copy, 
  Check, 
  Zap, 
  Repeat, 
  Users, 
  Shield, 
  Github,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { BRAND } from "@/lib/brand";

type DeployTab = "compose" | "docker" | "helm";

export function Hero() {
  const [activeDeploy, setActiveDeploy] = useState<DeployTab>("compose");
  const [copied, setCopied] = useState(false);
  const [showDeployBox, setShowDeployBox] = useState(true);

  const deployCommands: Record<DeployTab, string> = {
    compose: `curl -sL https://raw.githubusercontent.com/opsknight-labs/OpsKnight/main/docker-compose.yml > docker-compose.yml
docker-compose up -d`,
    docker: `docker run -d -p 3000:3000 \\
  -e DATABASE_URL="postgresql://user:pass@host:5432/opsknight" \\
  -e NEXTAUTH_SECRET="generate-a-secure-secret-key" \\
  -e ENCRYPTION_KEY="your-32-byte-hex-encryption-key" \\
  ghcr.io/opsknight-labs/opsknight:latest`,
    helm: `helm repo add opsknight https://opsknight-labs.github.io/helm-charts
helm repo update
helm install opsknight opsknight/opsknight --set app.secret="your-secure-secret"`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(deployCommands[activeDeploy]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-[#f8fafc] border-b border-slate-200">
      
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div 
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Version & License Mono Tagline */}
        <div className="mb-6 inline-flex items-center justify-center">
          <p className="font-mono text-xs sm:text-[13px] font-medium tracking-wide text-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
            OpsKnight 1.3.1 · you run it · Apache-2.0
          </p>
        </div>

        {/* Exact Core Pitch Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#111827] leading-[1.12] max-w-4xl mx-auto mb-6">
          The 2am page should live on your servers — not in a SaaS you rent per person.
        </h1>

        {/* Exact Core Pitch Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-[#4b5563] max-w-3xl mx-auto leading-relaxed font-normal mb-10">
          When production breaks, OpsKnight messages whoever is on call, opens a Slack room, and gives customers a status page. Afterward you write what happened. One product. Your machines.
        </p>

        {/* CTA Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="#product-tour"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-[12px] bg-[#2563eb] px-8 text-sm font-semibold tracking-wide text-white transition-all hover:bg-[#1d4ed8] shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            See how a night goes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href={BRAND.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-white border border-slate-300 px-6 text-sm font-semibold tracking-wide text-[#111827] transition-all hover:bg-slate-50 hover:border-slate-400 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            <Github className="w-4 h-4 text-[#111827]" />
            <span>Source on GitHub</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowDeployBox((prev) => !prev)}
            className="text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] hover:underline px-2 py-1 flex items-center gap-1 transition-colors"
          >
            <span>{showDeployBox ? "Hide run commands" : "How to run it on your machines"}</span>
            {showDeployBox ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Interactive 1-Command Deploy Terminal */}
        {showDeployBox && (
          <div className="max-w-3xl mx-auto text-left mb-16 animate-in fade-in duration-200">
            <div className="rounded-[16px] bg-[#0f172a] border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">1-Command Deployment</span>
                </div>

                {/* Deploy Switcher Tabs */}
                <div className="flex items-center gap-1 bg-[#020617] p-1 rounded-xl border border-slate-800">
                  {(["compose", "docker", "helm"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveDeploy(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                        activeDeploy === tab
                          ? "bg-[#2563eb] text-white shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab === "compose" ? "Compose" : tab === "docker" ? "Docker" : "Helm"}
                    </button>
                  ))}
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold font-mono transition-colors"
                  title="Copy command"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#059669]" />
                      <span className="text-[#059669]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-slate-200 overflow-x-auto">
                <pre className="text-[#38bdf8] whitespace-pre leading-relaxed">
                  {deployCommands[activeDeploy]}
                </pre>
              </div>

              {/* Micro Specs Footer */}
              <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="text-[#059669]">●</span> Memory: &lt; 512MB RAM
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#2563eb]">●</span> Latency: &lt; 15ms Ingest
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#38bdf8]">●</span> Privacy: 100% On-Premises
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-amber-400">●</span> License: Apache-2.0
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4-Pillar Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="p-5 sm:p-6 rounded-[14px] bg-white border border-slate-200 shadow-xs hover:border-blue-500/40 hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563eb] mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#111827] text-sm mb-1">100% VPC Sovereignty</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">
              All incident payloads, timeline traces, and credentials stay entirely inside your private network.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-[14px] bg-white border border-slate-200 shadow-xs hover:border-blue-500/40 hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563eb] mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#111827] text-sm mb-1">28+ Native Integrations</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">
              Direct ingestion for Datadog, Prometheus, Grafana, CloudWatch, Sentry, Zabbix, and GitLab.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-[14px] bg-white border border-slate-200 shadow-xs hover:border-blue-500/40 hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563eb] mb-3">
              <Repeat className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#111827] text-sm mb-1">Drop-in PagerDuty API</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">
              Implements <code className="text-[#2563eb] font-mono">/api/v2/enqueue</code>. Migrate in 30 seconds with 0 alert loss.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-[14px] bg-white border border-slate-200 shadow-xs hover:border-blue-500/40 hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563eb] mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#111827] text-sm mb-1">$0 Per-Seat Tax</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">
              Unlimited engineers, responder seats, services, and escalation policies without per-seat billing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
