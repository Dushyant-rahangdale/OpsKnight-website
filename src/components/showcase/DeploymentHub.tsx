"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Server,
  Layers,
  Cloud,
  Terminal,
  Cpu,
  HardDrive,
  Database,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Boxes,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";
import { SecretsGenerator } from "@/components/showcase/SecretsGenerator";

type DeployMode = "compose" | "helm" | "kustomize" | "cloud" | "systemd";

export function DeploymentHub() {
  const [activeMode, setActiveMode] = useState<DeployMode>("compose");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const deploymentData: Record<
    DeployMode,
    {
      title: string;
      subtitle: string;
      badge: string;
      docHref: string;
      specs: { cpu: string; ram: string; db: string; os: string };
      files: { name: string; lang: string; code: string }[];
      highlights: string[];
    }
  > = {
    compose: {
      title: "Docker Compose",
      subtitle: "Recommended starter topology for single-node VPS, on-prem servers, and evaluation.",
      badge: "Fastest Setup",
      docHref: latestDocsHref("deployment/docker"),
      specs: { cpu: "0.5 vCPU", ram: "512MB RAM", db: "Postgres 15 (Bundled)", os: "Linux / macOS" },
      highlights: [
        "Runs OpsKnight + PostgreSQL 15 + volume persistence in a single command",
        "Includes healthchecks on /api/health with automatic container recovery",
        "Configured via clean .env with zero hardcoded credentials",
      ],
      files: [
        {
          name: "Terminal Quickstart",
          lang: "bash",
          code: `# 1. Clone the repository
git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight

# 2. Copy environment template and generate production secrets
cp env.example .env
# Set NEXTAUTH_SECRET and ENCRYPTION_KEY using the generator below

# 3. Pull images and launch stack
docker compose up -d

# 4. Verify health and open setup
curl -f http://localhost:3000/api/health
# Open http://localhost:3000/setup to create the first admin`,
        },
        {
          name: "docker-compose.yml",
          lang: "yaml",
          code: `version: '3.8'

services:
  opsknight-app:
    image: ghcr.io/opsknight-labs/opsknight:latest
    container_name: opsknight-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://opsknight:\${POSTGRES_PASSWORD}@opsknight-db:5432/opsknight_db
      - NEXTAUTH_URL=\${NEXTAUTH_URL:-http://localhost:3000}
      - NEXTAUTH_SECRET=\${NEXTAUTH_SECRET}
      - ENCRYPTION_KEY=\${ENCRYPTION_KEY}
    depends_on:
      opsknight-db:
        condition: service_healthy

  opsknight-db:
    image: postgres:15-alpine
    container_name: opsknight-db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=opsknight
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD}
      - POSTGRES_DB=opsknight_db
    volumes:
      - opsknight_pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U opsknight -d opsknight_db"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  opsknight_pgdata:
    name: opsknight_pgdata`,
        },
      ],
    },
    helm: {
      title: "Kubernetes (Helm Chart)",
      subtitle: "Production multi-replica deployment with HPA autoscaling, Ingress TLS, and secrets management.",
      badge: "Production / HA",
      docHref: latestDocsHref("deployment/helm"),
      specs: { cpu: "200m - 1 vCPU", ram: "512Mi - 1Gi", db: "External Postgres 14+", os: "K8s 1.24+" },
      highlights: [
        "Multi-replica deployment with Horizontal Pod Autoscaler (HPA)",
        "Automated Cert-Manager Ingress TLS configuration",
        "Seamless integration with Vault, SealedSecrets, or AWS Secrets Manager",
      ],
      files: [
        {
          name: "Helm Install",
          lang: "bash",
          code: `# 1. Add OpsKnight Helm chart repository
helm repo add opsknight https://charts.opsknight.com
helm repo update

# 2. Install with custom production values
helm upgrade --install opsknight opsknight/opsknight \\
  --namespace opsknight \\
  --create-namespace \\
  --values values.yaml`,
        },
        {
          name: "values.yaml",
          lang: "yaml",
          code: `replicaCount: 2

image:
  repository: ghcr.io/opsknight-labs/opsknight
  tag: "latest"
  pullPolicy: IfNotPresent

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: ops.yourcompany.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: opsknight-tls
      hosts:
        - ops.yourcompany.com

resources:
  requests:
    cpu: 200m
    memory: 512Mi
  limits:
    cpu: 1000m
    memory: 1Gi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 75

env:
  NEXTAUTH_URL: "https://ops.yourcompany.com"
  # Reference existing Kubernetes Secret for credentials
  DATABASE_URL_SECRET: "opsknight-secrets"
  DATABASE_URL_KEY: "DATABASE_URL"
  NEXTAUTH_SECRET_KEY: "NEXTAUTH_SECRET"
  ENCRYPTION_KEY_KEY: "ENCRYPTION_KEY"`,
        },
      ],
    },
    kustomize: {
      title: "Kustomize & GitOps",
      subtitle: "Declarative Kubernetes manifests designed for ArgoCD, Flux, and GitOps workflows.",
      badge: "GitOps Ready",
      docHref: latestDocsHref("deployment/kustomize"),
      specs: { cpu: "200m - 1 vCPU", ram: "512Mi - 1Gi", db: "PostgreSQL 14+", os: "Kubernetes" },
      highlights: [
        "Template-free declarative manifests compatible with ArgoCD and Flux",
        "Structured Base and Overlay architecture for Dev, Staging, and Prod",
        "ConfigMap and Secret generator integration",
      ],
      files: [
        {
          name: "kustomization.yaml",
          lang: "yaml",
          code: `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: opsknight

resources:
  - https://github.com/opsknight-labs/OpsKnight//k8s/base?ref=v${BRAND.version}
  - ingress.yaml

patchesStrategicMerge:
  - deployment-patches.yaml

configMapGenerator:
  - name: opsknight-config
    behavior: merge
    literals:
      - NEXTAUTH_URL=https://ops.yourcompany.com
      - NODE_ENV=production`,
        },
      ],
    },
    cloud: {
      title: "Cloud & PaaS Blueprints",
      subtitle: "Managed blueprints for AWS ECS, GCP Cloud Run, DigitalOcean, Railway, Render, and Coolify.",
      badge: "Managed Containers",
      docHref: latestDocsHref("deployment/docker"),
      specs: { cpu: "1 vCPU", ram: "1 GB RAM", db: "AWS RDS / Cloud SQL", os: "Serverless / Container" },
      highlights: [
        "AWS: Run on ECS Fargate with AWS RDS PostgreSQL and Secrets Manager",
        "GCP: Deploy to Cloud Run backed by Google Cloud SQL (Postgres)",
        "PaaS: Deploy via 1-click template on Railway, Render, Coolify, or Portainer",
      ],
      files: [
        {
          name: "AWS ECS & GCP Cloud Run Specs",
          lang: "bash",
          code: `# AWS ECS / Fargate Launch Command
aws ecs run-task --cluster opsknight-cluster \\
  --task-definition opsknight-production \\
  --launch-type FARGATE \\
  --network-configuration "awsvpcConfiguration={subnets=[subnet-abc123],securityGroups=[sg-def456],assignPublicIp=ENABLED}"

# GCP Cloud Run Deploy
gcloud run deploy opsknight \\
  --image ghcr.io/opsknight-labs/opsknight:latest \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated \\
  --add-cloudsql-instances YOUR_PROJECT:REGION:INSTANCE \\
  --set-env-vars NEXTAUTH_URL=https://ops.yourdomain.com`,
        },
      ],
    },
    systemd: {
      title: "Linux Systemd / Bare Metal",
      subtitle: "Run OpsKnight as a native standalone Node.js service behind Nginx or Caddy reverse proxy.",
      badge: "Bare Metal",
      docHref: latestDocsHref("getting-started/installation"),
      specs: { cpu: "1 Core", ram: "1 GB RAM", db: "Local PostgreSQL 14+", os: "Ubuntu / Debian / RHEL" },
      highlights: [
        "Zero container overhead — runs directly on Node.js 20 LTS runtime",
        "Managed by Linux systemd with automatic restart on failure",
        "Nginx or Caddy TLS reverse proxy configuration",
      ],
      files: [
        {
          name: "/etc/systemd/system/opsknight.service",
          lang: "ini",
          code: `[Unit]
Description=OpsKnight Incident & On-Call Server
After=network.target postgresql.service

[Service]
Type=simple
User=opsknight
WorkingDirectory=/opt/opsknight
EnvironmentFile=/opt/opsknight/.env
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=opsknight

[Install]
WantedBy=multi-user.target`,
        },
        {
          name: "nginx-proxy.conf",
          lang: "nginx",
          code: `server {
    listen 443 ssl http2;
    server_name ops.yourcompany.com;

    ssl_certificate /etc/letsencrypt/live/ops.yourcompany.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ops.yourcompany.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`,
        },
      ],
    },
  };

  const current = deploymentData[activeMode];

  return (
    <div className="space-y-12">
      {/* Interactive Mode Selector Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(
          [
            { id: "compose", label: "Docker Compose", icon: Layers },
            { id: "helm", label: "Kubernetes (Helm)", icon: Boxes },
            { id: "kustomize", label: "Kustomize (GitOps)", icon: Server },
            { id: "cloud", label: "Cloud & PaaS", icon: Cloud },
            { id: "systemd", label: "Linux Systemd", icon: Terminal },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMode(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all border ${
                active
                  ? "bg-[#d21a1b] text-white border-red-600 shadow-md shadow-red-700/20"
                  : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-slate-200 shadow-sm"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Deployment Viewer Box */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-xl">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d21a1b]/15 text-[#d21a1b]">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{current.title}</h3>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                  {current.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400">{current.subtitle}</p>
            </div>
          </div>

          <Link
            href={current.docHref}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
          >
            <span>Full setup guide</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Footprint & Specs Grid */}
        <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/60 p-4 font-mono text-xs text-slate-300 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#d21a1b]" />
            <div>
              <span className="text-[10px] text-slate-500 block">CPU</span>
              <span className="font-semibold text-slate-200">{current.specs.cpu}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-500 block">RAM</span>
              <span className="font-semibold text-slate-200">{current.specs.ram}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-500 block">DATABASE</span>
              <span className="font-semibold text-slate-200">{current.specs.db}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            <div>
              <span className="text-[10px] text-slate-500 block">PLATFORM</span>
              <span className="font-semibold text-slate-200">{current.specs.os}</span>
            </div>
          </div>
        </div>

        {/* Code Snippets Section */}
        <div className="space-y-4 p-6 bg-[#020617]">
          {current.files.map((file, idx) => {
            const fileId = `${activeMode}-${idx}`;
            const isCopied = copiedCode === fileId;
            return (
              <div key={file.name} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs">
                  <div className="flex items-center gap-2 font-mono text-slate-300">
                    <Terminal className="h-3.5 w-3.5 text-slate-400" />
                    <span>{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(file.code, fileId)}
                    className="flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-emerald-300 max-h-[300px] custom-scrollbar">
                  <code>{file.code}</code>
                </pre>
              </div>
            );
          })}

          {/* Highlights checklist */}
          <div className="pt-2">
            <div className="grid gap-2 sm:grid-cols-3">
              {current.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pre-flight Secrets Generator */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Pre-Flight Secrets Generator</h3>
          <p className="text-xs text-slate-600 mt-1">
            OpsKnight requires two cryptographically random tokens before first boot. Generate them securely in your browser below:
          </p>
        </div>
        <SecretsGenerator />
      </div>

      {/* Hardware Sizing & Capacity Matrix */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 className="text-base font-bold text-slate-900">Infrastructure Sizing &amp; Hardware Matrix</h3>
          <p className="text-xs text-slate-600">
            Recommended capacity for OpsKnight and PostgreSQL based on monthly alert volume:
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/50 font-mono text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3">Tier</th>
                <th className="px-6 py-3">Alert Volume</th>
                <th className="px-6 py-3">CPU</th>
                <th className="px-6 py-3">RAM</th>
                <th className="px-6 py-3">Storage (SSD)</th>
                <th className="px-6 py-3">Topology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr>
                <td className="px-6 py-3.5 font-bold text-slate-900">Starter / Evaluation</td>
                <td className="px-6 py-3.5 text-slate-600">&lt; 10,000 / mo</td>
                <td className="px-6 py-3.5 text-slate-700">1 vCPU</td>
                <td className="px-6 py-3.5 text-slate-700">1 GB</td>
                <td className="px-6 py-3.5 text-slate-700">10 GB SSD</td>
                <td className="px-6 py-3.5 text-slate-700">Docker Compose (Single VPS)</td>
              </tr>
              <tr className="bg-slate-50/40">
                <td className="px-6 py-3.5 font-bold text-slate-900">Team / Growth</td>
                <td className="px-6 py-3.5 text-slate-600">10,000 – 100,000 / mo</td>
                <td className="px-6 py-3.5 text-slate-700">2 vCPU</td>
                <td className="px-6 py-3.5 text-slate-700">2 GB</td>
                <td className="px-6 py-3.5 text-slate-700">50 GB SSD</td>
                <td className="px-6 py-3.5 text-slate-700">2x App Replicas + Managed Postgres</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 font-bold text-slate-900">Enterprise Scale</td>
                <td className="px-6 py-3.5 text-slate-600">100,000+ / mo</td>
                <td className="px-6 py-3.5 text-slate-700">4+ vCPU</td>
                <td className="px-6 py-3.5 text-slate-700">4 – 8 GB</td>
                <td className="px-6 py-3.5 text-slate-700">200 GB NVMe</td>
                <td className="px-6 py-3.5 text-slate-700">Kubernetes (HPA) + PgBouncer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Day-2 Operations & Recovery Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Day-2 Operations &amp; Recovery Checklist</h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Key operational tasks after launching your OpsKnight instance:
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 font-mono text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
            <span className="font-bold text-slate-900 block font-sans">1. Complete Initial Admin Setup</span>
            <p className="text-[11px] text-slate-600 font-sans">
              Navigate to <code className="text-[#d21a1b]">http://YOUR_HOST:3000/setup</code> to create the primary administrator account.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
            <span className="font-bold text-slate-900 block font-sans">2. Configure Notification Providers</span>
            <p className="text-[11px] text-slate-600 font-sans">
              Add Slack bot tokens, Twilio/SNS SMS keys, and SMTP credentials directly in the Web Console under Settings.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
            <span className="font-bold text-slate-900 block font-sans">3. Schedule Automated DB Backups</span>
            <p className="text-[11px] text-slate-600 font-sans">
              Run nightly <code className="text-slate-800">pg_dump -Fc opsknight_db</code> and store dumps in S3 or external object storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
