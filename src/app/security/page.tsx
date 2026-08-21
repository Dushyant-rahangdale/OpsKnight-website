import type { Metadata } from "next";
import Link from "next/link";
import { latestDocsHref } from "@/lib/docs/paths";
import {
  ShieldCheck,
  Lock,
  Key,
  FileCheck,
  Server,
  Network,
  Users,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const title = "Security & Hardening Architecture";
const description =
  "Cryptographic envelope encryption (AES-256-CBC), timing-safe webhook verification, OIDC SSO, and VPC network isolation in OpsKnight.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/security" },
  openGraph: { title, description, url: "/security" },
};

const ENCRYPTED_FIELDS = [
  { provider: "Jira Cloud", fields: ["apiToken", "webhookSecret"], purpose: "Two-way issue syncing" },
  { provider: "SSO / OIDC", fields: ["clientSecret"], purpose: "Identity provider authentication" },
  { provider: "Slack ChatOps", fields: ["botToken", "signingSecret", "clientSecret"], purpose: "War room bot & interactive actions" },
  { provider: "Twilio", fields: ["authToken", "whatsappAuthToken"], purpose: "SMS & WhatsApp paging" },
  { provider: "AWS SNS / SES", fields: ["secretAccessKey"], purpose: "High-volume SMS & email delivery" },
  { provider: "Email (Resend / SendGrid / SMTP)", fields: ["apiKey", "password"], purpose: "Incident reports & status updates" },
  { provider: "Web Push", fields: ["vapidPrivateKey"], purpose: "Browser push notifications" },
];

const SIGNATURE_PROVIDERS = [
  { name: "GitHub", header: "x-hub-signature-256", algorithm: "HMAC-SHA256", format: "sha256=<hex_digest>" },
  { name: "Slack ChatOps", header: "x-slack-signature", algorithm: "HMAC-SHA256", format: "v0=<hex_digest> (timestamped)" },
  { name: "Sentry", header: "sentry-hook-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
  { name: "Grafana", header: "x-grafana-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
  { name: "GitLab", header: "x-gitlab-token", algorithm: "Constant-time token", format: "<secret_token>" },
  { name: "Generic Webhook", header: "x-signature / x-webhook-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fail-Closed Security Model · 100% Self-Hosted</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
            Security, Cryptography &amp; Hardening
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg max-w-2xl mx-auto">
            Incident data, on-call schedules, and API credentials stay within your VPC. Designed with zero third-party telemetry, cryptographic envelope encryption, and timing-safe webhook verification.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* 1. Envelope Encryption Architecture */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#d21a1b]">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">1. Two-Tier Envelope Encryption (AES-256-CBC)</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Operational credentials are never stored in plaintext and never clutter your environment variables. OpsKnight implements V2 Envelope Encryption:
                </p>
              </div>
            </div>

            {/* Architecture Flow Box */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] p-5 font-mono text-xs text-slate-200">
              <div className="text-[11px] text-slate-400 mb-3 font-sans font-semibold uppercase tracking-wider">
                Cryptographic Key Hierarchy
              </div>
              <div className="space-y-2 text-slate-300">
                <p className="text-amber-400">ENCRYPTION_KEY (Master Key — supplied strictly via environment variable)</p>
                <p className="text-slate-500 pl-4">│  (32 bytes / 256 bits, 64 hex characters)</p>
                <p className="text-slate-500 pl-4">▼</p>
                <p className="text-sky-400 pl-4">Encrypts a unique Data Encryption Key (DEK) generated per secret</p>
                <p className="text-slate-500 pl-8">│</p>
                <p className="text-slate-500 pl-8">▼</p>
                <p className="text-emerald-400 pl-8">DEK encrypts the raw operational secret via AES-256-CBC</p>
                <p className="text-slate-500 pl-12">│</p>
                <p className="text-slate-500 pl-12">▼</p>
                <p className="text-slate-300 pl-12">
                  Stored in PostgreSQL: <span className="text-emerald-300">v2:&lt;dekIv&gt;:&lt;encryptedDek&gt;:&lt;payloadIv&gt;:&lt;encryptedPayload&gt;</span>
                </p>
              </div>
            </div>

            {/* What Gets Encrypted Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Fields Encrypted at Rest in PostgreSQL</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Provider / Subsystem</th>
                      <th className="px-4 py-3">Encrypted Field(s)</th>
                      <th className="px-4 py-3">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {ENCRYPTED_FIELDS.map((item) => (
                      <tr key={item.provider}>
                        <td className="px-4 py-2.5 font-bold text-slate-800 font-sans">{item.provider}</td>
                        <td className="px-4 py-2.5 text-[#d21a1b]">{item.fields.join(", ")}</td>
                        <td className="px-4 py-2.5 text-slate-600 font-sans">{item.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href={latestDocsHref("security/encryption")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Read envelope encryption guide &amp; key rotation docs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* 2. Webhook Authentication & Anti-Replay */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">2. Inbound Webhook Verification &amp; Anti-Replay</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Every incoming alert webhook is validated before reaching incident processing logic.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Timing-Safe Cryptographic Equality</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  OpsKnight executes constant-time comparisons using <code className="font-mono text-[#111827]">crypto.timingSafeEqual</code> with dummy buffer evaluation on length mismatches, eliminating timing side-channel attack vectors on secret tokens.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Outbound Anti-Replay Protection</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Outbound notifications bind signatures to Unix timestamps (<code className="font-mono text-[#111827]">X-OpsKnight-Timestamp</code> + <code className="font-mono text-[#111827]">X-OpsKnight-Signature</code>) with a strict 300-second expiration window to neutralize replay attacks.
                </p>
              </div>
            </div>

            {/* Signature Matrix */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Native Webhook Verification Algorithms</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Integration</th>
                      <th className="px-4 py-3">Signature Header</th>
                      <th className="px-4 py-3">Algorithm</th>
                      <th className="px-4 py-3">Payload Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {SIGNATURE_PROVIDERS.map((p) => (
                      <tr key={p.name}>
                        <td className="px-4 py-2.5 font-bold text-slate-800 font-sans">{p.name}</td>
                        <td className="px-4 py-2.5 text-sky-700">{p.header}</td>
                        <td className="px-4 py-2.5 text-slate-700">{p.algorithm}</td>
                        <td className="px-4 py-2.5 text-slate-500">{p.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href={latestDocsHref("security/webhook-verification")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Read webhook authentication &amp; signature docs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* 3. Identity, SSO & Access Governance */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">3. Identity, OIDC SSO &amp; Role Governance</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Authenticate your team via your existing enterprise identity provider with granular role boundaries.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">OIDC Single Sign-On</span>
                <p className="text-slate-600 leading-relaxed">
                  Direct integration with Google Workspace, Okta, Azure AD, Keycloak, and Authentik. Supports auto-provisioning and domain allowlisting.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">Workspace RBAC</span>
                <p className="text-slate-600 leading-relaxed">
                  Three distinct workspace tiers: <code className="text-[#d21a1b]">USER</code> (scoped to assigned teams), <code className="text-[#d21a1b]">RESPONDER</code> (global response), and <code className="text-[#d21a1b]">ADMIN</code> (governance).
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">Team-Level Roles</span>
                <p className="text-slate-600 leading-relaxed">
                  Independent team governance: <code className="text-[#d21a1b]">MEMBER</code>, <code className="text-[#d21a1b]">ADMIN</code>, and <code className="text-[#d21a1b]">OWNER</code> with last-owner protection.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href={latestDocsHref("security/oidc-setup")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Read OIDC SSO configuration guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={latestDocsHref("security/authorization")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline"
              >
                <span>Role authorization matrix</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* 4. Production Hardening & Network Isolation */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Network className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">4. Production Network Isolation &amp; Zero Telemetry</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Built for zero outbound leaks and strict network segmentation.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <EyeOff className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Zero Third-Party Telemetry or Analytics</span>
                  <span className="text-slate-600 leading-relaxed mt-0.5 block">
                    OpsKnight contains zero tracking beacons, telemetry pings, or phone-home mechanisms. All crash data, audit trails, and metrics stay entirely within your database.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Server className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">PostgreSQL Port 5432 Isolation</span>
                  <span className="text-slate-600 leading-relaxed mt-0.5 block">
                    In production deployments, the database port is never published to the public internet. Communication occurs strictly over internal container networks or VPC security groups.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <FileCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Non-Root Container UID &amp; Read-Only Security Context</span>
                  <span className="text-slate-600 leading-relaxed mt-0.5 block">
                    Official container images run as non-root unprivileged users, compatible with Kubernetes restricted security standards and OpenShift SCC.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href={latestDocsHref("deployment/docker")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#d21a1b] hover:underline"
              >
                <span>Production deployment hardening guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
