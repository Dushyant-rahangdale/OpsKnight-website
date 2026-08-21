"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Download,
  Settings2,
  MessageSquare,
  Smartphone,
  Mail,
  Shield,
  FileCode,
  Layers,
  RefreshCw,
  Database,
} from "lucide-react";

function generateBase64Secret(): string {
  if (typeof window === "undefined" || !window.crypto) return "change-me-to-a-secure-32-byte-base64-secret";
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function generateHexSecret(): string {
  if (typeof window === "undefined" || !window.crypto) return "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type SmsProvider = "twilio" | "sns";
type EmailProvider = "smtp" | "resend";
type OidcPreset = "generic" | "google" | "okta" | "authentik" | "keycloak";

export function ProductionConfigurator({ className = "" }: { className?: string }) {
  // Core Settings
  const [appUrl, setAppUrl] = useState("https://opsknight.yourdomain.com");
  const [dbUrl, setDbUrl] = useState("postgresql://opsknight:opsknight_secure_password@postgres:5432/opsknight_db");
  const [nextAuthSecret, setNextAuthSecret] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");

  // Feature Toggles
  const [enableSlack, setEnableSlack] = useState(false);
  const [enableSms, setEnableSms] = useState(false);
  const [enableEmail, setEnableEmail] = useState(false);
  const [enableOidc, setEnableOidc] = useState(false);

  // Slack Fields
  const [slackBotToken, setSlackBotToken] = useState("");
  const [slackSigningSecret, setSlackSigningSecret] = useState("");
  const [slackAppToken, setSlackAppToken] = useState("");

  // SMS Fields
  const [smsProvider, setSmsProvider] = useState<SmsProvider>("twilio");
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [twilioFrom, setTwilioFrom] = useState("");
  const [awsRegion, setAwsRegion] = useState("us-east-1");
  const [awsAccessKey, setAwsAccessKey] = useState("");
  const [awsSecretKey, setAwsSecretKey] = useState("");

  // Email Fields
  const [emailProvider, setEmailProvider] = useState<EmailProvider>("smtp");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [emailFrom, setEmailFrom] = useState("alerts@yourdomain.com");
  const [resendApiKey, setResendApiKey] = useState("");

  // OIDC Fields
  const [oidcPreset, setOidcPreset] = useState<OidcPreset>("generic");
  const [oidcIssuer, setOidcIssuer] = useState("");
  const [oidcClientId, setOidcClientId] = useState("");
  const [oidcClientSecret, setOidcClientSecret] = useState("");

  // Output Tab & Copy States
  const [outputTab, setOutputTab] = useState<"env" | "compose">("env");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setNextAuthSecret(generateBase64Secret());
    setEncryptionKey(generateHexSecret());
  }, []);

  const handleRegenerateSecrets = () => {
    setNextAuthSecret(generateBase64Secret());
    setEncryptionKey(generateHexSecret());
  };

  const handleOidcPresetChange = (preset: OidcPreset) => {
    setOidcPreset(preset);
    if (preset === "google") {
      setOidcIssuer("https://accounts.google.com");
    } else if (preset === "okta") {
      setOidcIssuer("https://your-org.okta.com/oauth2/default");
    } else if (preset === "authentik") {
      setOidcIssuer("https://auth.yourdomain.com/application/o/opsknight/");
    } else if (preset === "keycloak") {
      setOidcIssuer("https://keycloak.yourdomain.com/realms/master");
    } else {
      setOidcIssuer("");
    }
  };

  // Generate .env content
  const generateEnvContent = () => {
    const lines: string[] = [
      "# =============================================================================",
      "# OpsKnight Production Configuration",
      "# Generated via opsknight.com/install configurator",
      "# =============================================================================",
      "",
      "# --- CORE APPLICATION ---",
      `NEXTAUTH_URL="${appUrl || "https://opsknight.yourdomain.com"}"`,
      `NEXTAUTH_SECRET="${nextAuthSecret || "replace-with-32-byte-base64"}"`,
      `ENCRYPTION_KEY="${encryptionKey || "replace-with-32-byte-hex"}"`,
      `DATABASE_URL="${dbUrl || "postgresql://opsknight:opsknight_secure_password@postgres:5432/opsknight_db"}"`,
    ];

    if (enableSlack) {
      lines.push(
        "",
        "# --- SLACK CHATOPS ---",
        `SLACK_BOT_TOKEN="${slackBotToken || "xoxb-your-slack-bot-token"}"`,
        `SLACK_SIGNING_SECRET="${slackSigningSecret || "your-slack-signing-secret"}"`
      );
      if (slackAppToken) {
        lines.push(`SLACK_APP_TOKEN="${slackAppToken}"`);
      }
    }

    if (enableSms) {
      lines.push("", "# --- SMS PAGING ---", `SMS_PROVIDER="${smsProvider}"`);
      if (smsProvider === "twilio") {
        lines.push(
          `TWILIO_ACCOUNT_SID="${twilioSid || "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}"`,
          `TWILIO_AUTH_TOKEN="${twilioToken || "your-twilio-auth-token"}"`,
          `TWILIO_FROM_NUMBER="${twilioFrom || "+15551234567"}"`
        );
      } else {
        lines.push(
          `AWS_REGION="${awsRegion || "us-east-1"}"`,
          `AWS_ACCESS_KEY_ID="${awsAccessKey || "AKIAIOSFODNN7EXAMPLE"}"`,
          `AWS_SECRET_ACCESS_KEY="${awsSecretKey || "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"}"`
        );
      }
    }

    if (enableEmail) {
      lines.push(
        "",
        "# --- EMAIL NOTIFICATIONS ---",
        `EMAIL_PROVIDER="${emailProvider}"`,
        `EMAIL_FROM="${emailFrom || "alerts@yourdomain.com"}"`
      );
      if (emailProvider === "smtp") {
        lines.push(
          `SMTP_HOST="${smtpHost || "smtp.resend.com"}"`,
          `SMTP_PORT=${smtpPort || "587"}`,
          `SMTP_USER="${smtpUser || "smtp-user"}"`,
          `SMTP_PASS="${smtpPass || "smtp-password"}"`
        );
      } else {
        lines.push(`RESEND_API_KEY="${resendApiKey || "re_your_api_key_here"}"`);
      }
    }

    if (enableOidc) {
      lines.push(
        "",
        "# --- OIDC SINGLE SIGN-ON (SSO) ---",
        "ENABLE_OIDC=true",
        `OIDC_ISSUER="${oidcIssuer || "https://your-identity-provider.com"}"`,
        `OIDC_CLIENT_ID="${oidcClientId || "your-client-id"}"`,
        `OIDC_CLIENT_SECRET="${oidcClientSecret || "your-client-secret"}"`
      );
    }

    return lines.join("\n");
  };

  // Generate docker-compose.prod.yml content
  const generateComposeContent = () => {
    return `version: "3.8"

services:
  opsknight:
    image: ghcr.io/opsknight-labs/opsknight:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: opsknight_db
      POSTGRES_USER: opsknight
      POSTGRES_PASSWORD: opsknight_secure_password
    volumes:
      - opsknight_pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U opsknight -d opsknight_db"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  opsknight_pgdata:
`;
  };

  const currentContent = outputTab === "env" ? generateEnvContent() : generateComposeContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = outputTab === "env" ? ".env" : "docker-compose.prod.yml";
    const blob = new Blob([currentContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`rounded-[16px] border border-slate-800 bg-[#0f172a] text-slate-200 shadow-xl ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d21a1b]/15 text-[#d21a1b]">
            <Settings2 className="h-4.5 w-4.5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
              Production Stack &amp; Config Generator
            </h3>
            <p className="text-xs text-slate-400">
              Customize multi-channel providers, authentication, and database settings live.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRegenerateSecrets}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            title="Generate fresh secrets"
          >
            <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Rotate Secrets</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-12">
        {/* Left Form: Config Controls (7 cols) */}
        <div className="space-y-4 lg:col-span-6">
          {/* Base URL & App URL */}
          <div className="rounded-xl border border-slate-800/80 bg-[#020617] p-3.5 space-y-3">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="font-mono text-xs font-semibold text-slate-200">
                  Application Base URL
                </label>
                <span className="font-mono text-[10px] text-slate-500">NEXTAUTH_URL</span>
              </div>
              <input
                type="text"
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
                placeholder="https://opsknight.yourcompany.com"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none focus:ring-1 focus:ring-[#d21a1b]"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="font-mono text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-slate-400" />
                  Database Connection
                </label>
                <span className="font-mono text-[10px] text-slate-500">DATABASE_URL</span>
              </div>
              <input
                type="text"
                value={dbUrl}
                onChange={(e) => setDbUrl(e.target.value)}
                placeholder="postgresql://opsknight:password@postgres:5432/opsknight_db"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none focus:ring-1 focus:ring-[#d21a1b]"
              />
            </div>
          </div>

          {/* Module 1: Slack ChatOps */}
          <div className="rounded-xl border border-slate-800/80 bg-[#020617] p-3.5 transition-all">
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={enableSlack}
                  onChange={(e) => setEnableSlack(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-[#d21a1b] focus:ring-[#d21a1b]"
                />
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">Slack ChatOps &amp; War Rooms</span>
                </div>
              </label>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                  enableSlack
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {enableSlack ? "Enabled" : "Optional"}
              </span>
            </div>

            {enableSlack && (
              <div className="mt-3 space-y-2.5 border-t border-slate-800/70 pt-3">
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-slate-400">
                    Bot User OAuth Token (SLACK_BOT_TOKEN)
                  </label>
                  <input
                    type="text"
                    value={slackBotToken}
                    onChange={(e) => setSlackBotToken(e.target.value)}
                    placeholder="xoxb-your-slack-bot-token"
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-slate-400">
                    Signing Secret (SLACK_SIGNING_SECRET)
                  </label>
                  <input
                    type="text"
                    value={slackSigningSecret}
                    onChange={(e) => setSlackSigningSecret(e.target.value)}
                    placeholder="your-slack-signing-secret"
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-slate-400">
                    App-Level Socket Token (SLACK_APP_TOKEN - optional)
                  </label>
                  <input
                    type="text"
                    value={slackAppToken}
                    onChange={(e) => setSlackAppToken(e.target.value)}
                    placeholder="xapp-your-app-level-token"
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Module 2: SMS Paging */}
          <div className="rounded-xl border border-slate-800/80 bg-[#020617] p-3.5 transition-all">
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={enableSms}
                  onChange={(e) => setEnableSms(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-[#d21a1b] focus:ring-[#d21a1b]"
                />
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-sky-400" />
                  <span className="text-xs font-semibold text-slate-200">SMS Paging &amp; Alerts</span>
                </div>
              </label>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                  enableSms
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {enableSms ? "Enabled" : "Optional"}
              </span>
            </div>

            {enableSms && (
              <div className="mt-3 space-y-2.5 border-t border-slate-800/70 pt-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">Provider:</span>
                  <button
                    type="button"
                    onClick={() => setSmsProvider("twilio")}
                    className={`rounded px-2 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                      smsProvider === "twilio"
                        ? "bg-[#d21a1b] text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Twilio
                  </button>
                  <button
                    type="button"
                    onClick={() => setSmsProvider("sns")}
                    className={`rounded px-2 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                      smsProvider === "sns"
                        ? "bg-[#d21a1b] text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    AWS SNS
                  </button>
                </div>

                {smsProvider === "twilio" ? (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        TWILIO_ACCOUNT_SID
                      </label>
                      <input
                        type="text"
                        value={twilioSid}
                        onChange={(e) => setTwilioSid(e.target.value)}
                        placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        TWILIO_AUTH_TOKEN
                      </label>
                      <input
                        type="text"
                        value={twilioToken}
                        onChange={(e) => setTwilioToken(e.target.value)}
                        placeholder="your-auth-token"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        TWILIO_FROM_NUMBER
                      </label>
                      <input
                        type="text"
                        value={twilioFrom}
                        onChange={(e) => setTwilioFrom(e.target.value)}
                        placeholder="+15551234567"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        AWS_REGION
                      </label>
                      <input
                        type="text"
                        value={awsRegion}
                        onChange={(e) => setAwsRegion(e.target.value)}
                        placeholder="us-east-1"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        AWS_ACCESS_KEY_ID
                      </label>
                      <input
                        type="text"
                        value={awsAccessKey}
                        onChange={(e) => setAwsAccessKey(e.target.value)}
                        placeholder="AKIAIOSFODNN7EXAMPLE"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        AWS_SECRET_ACCESS_KEY
                      </label>
                      <input
                        type="password"
                        value={awsSecretKey}
                        onChange={(e) => setAwsSecretKey(e.target.value)}
                        placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Module 3: Email Notifications */}
          <div className="rounded-xl border border-slate-800/80 bg-[#020617] p-3.5 transition-all">
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={enableEmail}
                  onChange={(e) => setEnableEmail(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-[#d21a1b] focus:ring-[#d21a1b]"
                />
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-200">Email Notifications</span>
                </div>
              </label>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                  enableEmail
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {enableEmail ? "Enabled" : "Optional"}
              </span>
            </div>

            {enableEmail && (
              <div className="mt-3 space-y-2.5 border-t border-slate-800/70 pt-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">Method:</span>
                  <button
                    type="button"
                    onClick={() => setEmailProvider("smtp")}
                    className={`rounded px-2 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                      emailProvider === "smtp"
                        ? "bg-[#d21a1b] text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Custom SMTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailProvider("resend")}
                    className={`rounded px-2 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                      emailProvider === "resend"
                        ? "bg-[#d21a1b] text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Resend API
                  </button>
                </div>

                {emailProvider === "smtp" ? (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        SMTP_HOST
                      </label>
                      <input
                        type="text"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        placeholder="smtp.mailgun.org"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        SMTP_PORT
                      </label>
                      <input
                        type="text"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        placeholder="587"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        SMTP_USER
                      </label>
                      <input
                        type="text"
                        value={smtpUser}
                        onChange={(e) => setSmtpUser(e.target.value)}
                        placeholder="smtp-user"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        SMTP_PASS
                      </label>
                      <input
                        type="password"
                        value={smtpPass}
                        onChange={(e) => setSmtpPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        EMAIL_FROM
                      </label>
                      <input
                        type="text"
                        value={emailFrom}
                        onChange={(e) => setEmailFrom(e.target.value)}
                        placeholder="alerts@yourdomain.com"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        RESEND_API_KEY
                      </label>
                      <input
                        type="text"
                        value={resendApiKey}
                        onChange={(e) => setResendApiKey(e.target.value)}
                        placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxx"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] text-slate-400">
                        EMAIL_FROM
                      </label>
                      <input
                        type="text"
                        value={emailFrom}
                        onChange={(e) => setEmailFrom(e.target.value)}
                        placeholder="alerts@yourdomain.com"
                        className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Module 4: OIDC SSO */}
          <div className="rounded-xl border border-slate-800/80 bg-[#020617] p-3.5 transition-all">
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={enableOidc}
                  onChange={(e) => setEnableOidc(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-[#d21a1b] focus:ring-[#d21a1b]"
                />
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-rose-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    OIDC Single Sign-On (Google / Okta / Authentik / Keycloak)
                  </span>
                </div>
              </label>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                  enableOidc
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {enableOidc ? "Enabled" : "Optional"}
              </span>
            </div>

            {enableOidc && (
              <div className="mt-3 space-y-2.5 border-t border-slate-800/70 pt-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[11px] text-slate-400">Preset:</span>
                  {(["generic", "google", "okta", "authentik", "keycloak"] as OidcPreset[]).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleOidcPresetChange(p)}
                        className={`rounded px-2 py-0.5 font-mono text-[10px] capitalize transition-colors ${
                          oidcPreset === p
                            ? "bg-[#d21a1b] text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <div>
                  <label className="mb-1 block font-mono text-[10px] text-slate-400">
                    OIDC Issuer URL (OIDC_ISSUER)
                  </label>
                  <input
                    type="text"
                    value={oidcIssuer}
                    onChange={(e) => setOidcIssuer(e.target.value)}
                    placeholder="https://accounts.google.com or your issuer"
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-mono text-[10px] text-slate-400">
                      OIDC_CLIENT_ID
                    </label>
                    <input
                      type="text"
                      value={oidcClientId}
                      onChange={(e) => setOidcClientId(e.target.value)}
                      placeholder="client-id"
                      className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-mono text-[10px] text-slate-400">
                      OIDC_CLIENT_SECRET
                    </label>
                    <input
                      type="password"
                      value={oidcClientSecret}
                      onChange={(e) => setOidcClientSecret(e.target.value)}
                      placeholder="client-secret"
                      className="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output: Code Viewer (6 cols) */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#020617] lg:col-span-6">
          {/* Output Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/90 px-3.5 py-2.5">
            <div className="flex items-center gap-1 rounded-md border border-slate-800 bg-[#020617] p-0.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setOutputTab("env")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
                  outputTab === "env"
                    ? "bg-slate-800 font-semibold text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>.env</span>
              </button>
              <button
                type="button"
                onClick={() => setOutputTab("compose")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
                  outputTab === "compose"
                    ? "bg-slate-800 font-semibold text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>docker-compose.prod.yml</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#059669]" />
                    <span className="text-[#059669]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1 rounded-md bg-[#d21a1b] px-2.5 py-1 font-mono text-xs font-semibold text-white transition-colors hover:bg-[#b41516]"
                title="Download file"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="flex-1 overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-300 custom-scrollbar max-h-[520px]">
            <pre className="whitespace-pre">
              <code>{currentContent}</code>
            </pre>
          </div>

          <div className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-2 text-[11px] text-slate-500">
            <span className="font-medium text-slate-400">Next step:</span> Save these files in your deployment directory and run <code className="text-slate-300">docker compose up -d</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
