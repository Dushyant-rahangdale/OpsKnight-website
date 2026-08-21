"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Key,
  Lock,
  Users,
  Network,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  EyeOff,
  Fingerprint,
} from "lucide-react";
import { latestDocsHref } from "@/lib/docs/paths";

type SecurityPillar = "envelope" | "webhooks" | "identity" | "network";

const ENCRYPTED_FIELDS = [
  { provider: "Jira Cloud", fields: ["apiToken", "webhookSecret"], purpose: "Two-way issue & sync tokens" },
  { provider: "SSO / OIDC", fields: ["clientSecret"], purpose: "OAuth2/OIDC client secrets" },
  { provider: "Slack ChatOps", fields: ["botToken", "signingSecret", "clientSecret"], purpose: "War room bot & interactive actions" },
  { provider: "Twilio", fields: ["authToken", "whatsappAuthToken"], purpose: "SMS & WhatsApp paging keys" },
  { provider: "AWS SNS / SES", fields: ["secretAccessKey"], purpose: "High-volume delivery credentials" },
  { provider: "Email (Resend / SendGrid / SMTP)", fields: ["apiKey", "password"], purpose: "Incident reports & subscriber updates" },
  { provider: "Web Push", fields: ["vapidPrivateKey"], purpose: "Browser push notification keys" },
];

const SIGNATURE_PROVIDERS = [
  { name: "GitHub", header: "x-hub-signature-256", algorithm: "HMAC-SHA256", format: "sha256=<hex_digest>" },
  { name: "Slack ChatOps", header: "x-slack-signature", algorithm: "HMAC-SHA256", format: "v0=<hex_digest> (with timestamp)" },
  { name: "Sentry", header: "sentry-hook-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
  { name: "Grafana", header: "x-grafana-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
  { name: "GitLab", header: "x-gitlab-token", algorithm: "Constant-time string token", format: "<secret_token>" },
  { name: "Generic Webhooks", header: "x-signature / x-webhook-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
];

const AUDIT_CHECKLIST = [
  {
    category: "Data Protection",
    items: [
      "Master Key (ENCRYPTION_KEY) supplied strictly through environment, never stored in database",
      "Per-secret Data Encryption Key (DEK) generated dynamically for each credential",
      "Ciphertext stored in PostgreSQL with unique IVs (v2:<dekIv>:<encryptedDek>:<payloadIv>:<encryptedPayload>)",
    ],
  },
  {
    category: "Transport & Ingest Security",
    items: [
      "Mandatory constant-time equality (crypto.timingSafeEqual) on all webhook secrets and tokens",
      "Inbound signature verifiers for GitHub, Slack, Sentry, Grafana, and generic webhooks",
      "Outbound anti-replay signatures bound to Unix timestamps with 300s expiration",
    ],
  },
  {
    category: "Network & Access Governance",
    items: [
      "PostgreSQL port 5432 kept strictly private inside VPC network / container bridge",
      "Enterprise OIDC SSO with auto-provisioning and email domain allowlisting",
      "Zero telemetry beacons, zero third-party trackers, zero external crash reporters",
    ],
  },
];

export function SecurityHub() {
  const [activePillar, setActivePillar] = useState<SecurityPillar>("envelope");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const keyGenSnippet = `# Generate a cryptographically random 32-byte master encryption key
openssl rand -hex 32

# Output example:
# a3f1c2e4b5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2`;

  const timingSafeSnippet = `// Timing-safe constant-time string comparison in OpsKnight core
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    // Execute dummy constant-time comparison to prevent length leakage
    crypto.timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
}`;

  return (
    <div className="space-y-12">
      {/* 4 Trust Posture Badges */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-1">
            <Key className="h-3.5 w-3.5 text-[#d21a1b]" />
            <span>STORAGE</span>
          </div>
          <p className="font-bold text-slate-900 font-sans text-sm">AES-256 Envelope</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Per-secret DEK isolation</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-1">
            <Fingerprint className="h-3.5 w-3.5 text-sky-600" />
            <span>INGEST</span>
          </div>
          <p className="font-bold text-slate-900 font-sans text-sm">Timing-Safe HMAC</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Constant-time verification</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-1">
            <Users className="h-3.5 w-3.5 text-amber-600" />
            <span>IDENTITY</span>
          </div>
          <p className="font-bold text-slate-900 font-sans text-sm">OIDC SSO + RBAC</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Workspace &amp; Team roles</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-1">
            <EyeOff className="h-3.5 w-3.5 text-emerald-600" />
            <span>TELEMETRY</span>
          </div>
          <p className="font-bold text-slate-900 font-sans text-sm">Zero Data Leaks</p>
          <p className="text-[11px] text-slate-500 mt-0.5">100% self-hosted in VPC</p>
        </div>
      </div>

      {/* Modern Pillar Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(
          [
            { id: "envelope", label: "Envelope Encryption (AES-256)", icon: Key },
            { id: "webhooks", label: "Webhook Forensics & HMAC", icon: Lock },
            { id: "identity", label: "Identity, OIDC & RBAC", icon: Users },
            { id: "network", label: "VPC & Hardening Checklist", icon: Network },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activePillar === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePillar(tab.id)}
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

      {/* Active Pillar Detailed View */}
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0f172a] shadow-2xl">
        
        {/* Pillar 1: Envelope Encryption */}
        {activePillar === "envelope" && (
          <div className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="rounded bg-red-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#d21a1b]">
                  Cryptographic Storage Architecture
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Two-Tier Envelope Encryption (V2)</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Master key supplied via environment variable encrypts per-secret Data Encryption Keys (DEKs). Secrets are encrypted using AES-256-CBC with unique initialization vectors.
                </p>
              </div>
              <Link
                href={latestDocsHref("security/encryption")}
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Read encryption guide</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Cryptographic Key Hierarchy Terminal */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 font-mono text-xs">
              <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 text-slate-300 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">KEY HIERARCHY FLOW</span>
                <span className="text-[10px] text-slate-500">AES-256-CBC</span>
              </div>
              <div className="p-5 space-y-2.5 text-slate-300 text-[11px] leading-relaxed">
                <p className="text-amber-400">1. ENCRYPTION_KEY (Master Key · 32 bytes / 256 bits · supplied strictly via env)</p>
                <p className="text-slate-500 pl-4">│</p>
                <p className="text-slate-500 pl-4">▼</p>
                <p className="text-sky-400 pl-4">2. Encrypts unique per-secret Data Encryption Key (DEK)</p>
                <p className="text-slate-500 pl-8">│</p>
                <p className="text-slate-500 pl-8">▼</p>
                <p className="text-emerald-400 pl-8">3. DEK encrypts the raw operational credential (API token, password, secret)</p>
                <p className="text-slate-500 pl-12">│</p>
                <p className="text-slate-500 pl-12">▼</p>
                <p className="text-slate-300 pl-12">
                  4. Stored in PostgreSQL: <span className="text-emerald-300">v2:&lt;dekIv&gt;:&lt;encryptedDek&gt;:&lt;payloadIv&gt;:&lt;encryptedPayload&gt;</span>
                </p>
              </div>
            </div>

            {/* What Gets Encrypted Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-200 mb-3">Fields Encrypted at Rest in PostgreSQL</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-3">Provider</th>
                      <th className="px-4 py-3">Encrypted Fields</th>
                      <th className="px-4 py-3">Security Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {ENCRYPTED_FIELDS.map((item) => (
                      <tr key={item.provider}>
                        <td className="px-4 py-2.5 font-bold text-white font-sans">{item.provider}</td>
                        <td className="px-4 py-2.5 text-[#d21a1b]">{item.fields.join(", ")}</td>
                        <td className="px-4 py-2.5 text-slate-400 font-sans">{item.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Keygen Command */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs">
                <span className="font-mono text-slate-300">Generate Master Key</span>
                <button
                  type="button"
                  onClick={() => handleCopy(keyGenSnippet, "keygen")}
                  className="flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  {copiedCode === "keygen" ? (
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
              <pre className="overflow-x-auto p-4 font-mono text-xs text-emerald-300">
                <code>{keyGenSnippet}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Pillar 2: Webhooks & HMAC */}
        {activePillar === "webhooks" && (
          <div className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="rounded bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                  Ingestion &amp; Outbound Verification
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Timing-Safe HMAC &amp; Anti-Replay</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Inbound alert webhooks are cryptographically authenticated before touching business logic. Outbound webhooks include timestamped signatures to prevent replay attacks.
                </p>
              </div>
              <Link
                href={latestDocsHref("security/webhook-verification")}
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Read signature verification docs</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Timing-safe code viewer */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs">
                <span className="font-mono text-slate-300">Timing-Safe Constant-Time Verification</span>
                <button
                  type="button"
                  onClick={() => handleCopy(timingSafeSnippet, "timingsafe")}
                  className="flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  {copiedCode === "timingsafe" ? (
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
              <pre className="overflow-x-auto p-4 font-mono text-xs text-sky-300">
                <code>{timingSafeSnippet}</code>
              </pre>
            </div>

            {/* Inbound Signatures Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-200 mb-3">Native Webhook Verification Algorithms</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-3">Provider</th>
                      <th className="px-4 py-3">Signature Header</th>
                      <th className="px-4 py-3">Algorithm</th>
                      <th className="px-4 py-3">Payload Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {SIGNATURE_PROVIDERS.map((p) => (
                      <tr key={p.name}>
                        <td className="px-4 py-2.5 font-bold text-white font-sans">{p.name}</td>
                        <td className="px-4 py-2.5 text-sky-400">{p.header}</td>
                        <td className="px-4 py-2.5 text-emerald-400">{p.algorithm}</td>
                        <td className="px-4 py-2.5 text-slate-400">{p.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 3: Identity & RBAC */}
        {activePillar === "identity" && (
          <div className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="rounded bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  Authentication &amp; Role Governance
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Enterprise OIDC SSO &amp; Granular RBAC</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Authenticate engineers through your corporate identity provider (Google, Okta, Azure AD, Keycloak, Authentik) with action-specific authorization boundaries.
                </p>
              </div>
              <Link
                href={latestDocsHref("security/oidc-setup")}
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Read OIDC setup guide</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 text-xs">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
                <span className="font-bold text-white block text-sm">OIDC Single Sign-On</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Supports standard scopes (<code className="text-slate-300">openid email profile</code>), custom claim mappings, user auto-provisioning, and strict corporate email domain allowlists.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
                <span className="font-bold text-white block text-sm">Workspace RBAC Tiers</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Three distinct workspace tiers: <code className="text-[#d21a1b]">USER</code> (scoped to assigned teams and services), <code className="text-[#d21a1b]">RESPONDER</code> (global response), and <code className="text-[#d21a1b]">ADMIN</code> (governance).
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
                <span className="font-bold text-white block text-sm">Team-Level Roles</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Independent team governance (<code className="text-amber-400">MEMBER</code>, <code className="text-amber-400">ADMIN</code>, <code className="text-amber-400">OWNER</code>) with last-owner protection against accidental lockout.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 4: VPC Hardening & InfoSec Checklist */}
        {activePillar === "network" && (
          <div className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="rounded bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  Compliance &amp; Hardening Checklist
                </span>
                <h2 className="text-xl font-bold text-white mt-1">VPC Isolation &amp; Zero External Telemetry</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Verified security posture ready for internal InfoSec, SOC 2, and GDPR infrastructure audits.
                </p>
              </div>
              <Link
                href={latestDocsHref("deployment/docker")}
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Hardening guide</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {AUDIT_CHECKLIST.map((section) => (
                <div key={section.category} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-emerald-400">
                    {section.category}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
