"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Smartphone,
  Mail,
  Shield,
  Lock,
  Check,
  Send,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { latestDocsHref } from "@/lib/docs/paths";

type SettingsTab = "slack" | "sms" | "email" | "oidc";
type SmsProvider = "twilio" | "sns";
type EmailProvider = "smtp" | "resend" | "sendgrid" | "ses";
type OidcPreset = "google" | "okta" | "authentik" | "keycloak" | "generic";

export function ProductionConfigurator({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("slack");

  // Slack state
  const [slackEnabled, setSlackEnabled] = useState(true);
  const [slackBotToken, setSlackBotToken] = useState("");
  const [slackSigningSecret, setSlackSigningSecret] = useState("");
  const [slackTestStatus, setSlackTestStatus] = useState<"idle" | "testing" | "success">("idle");

  // SMS state
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [smsProvider, setSmsProvider] = useState<SmsProvider>("twilio");
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [twilioFrom, setTwilioFrom] = useState("");
  const [snsRegion, setSnsRegion] = useState("us-east-1");
  const [snsKeyId, setSnsKeyId] = useState("");
  const [smsTestStatus, setSmsTestStatus] = useState<"idle" | "testing" | "success">("idle");

  // Email state
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailProvider, setEmailProvider] = useState<EmailProvider>("smtp");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [resendApiKey, setResendApiKey] = useState("");
  const [emailTestStatus, setEmailTestStatus] = useState<"idle" | "testing" | "success">("idle");

  // OIDC state
  const [oidcEnabled, setOidcEnabled] = useState(true);
  const [oidcPreset, setOidcPreset] = useState<OidcPreset>("google");
  const [oidcIssuer, setOidcIssuer] = useState("https://accounts.google.com");
  const [oidcClientId, setOidcClientId] = useState("");
  const [oidcTestStatus, setOidcTestStatus] = useState<"idle" | "testing" | "success">("idle");

  const handleTestTrigger = (setter: (val: "idle" | "testing" | "success") => void) => {
    setter("testing");
    setTimeout(() => {
      setter("success");
      setTimeout(() => setter("idle"), 3000);
    }, 600);
  };

  const handlePresetChange = (preset: OidcPreset) => {
    setOidcPreset(preset);
    if (preset === "google") setOidcIssuer("https://accounts.google.com");
    else if (preset === "okta") setOidcIssuer("https://your-org.okta.com/oauth2/default");
    else if (preset === "authentik") setOidcIssuer("https://auth.yourdomain.com/application/o/opsknight/");
    else if (preset === "keycloak") setOidcIssuer("https://keycloak.yourdomain.com/realms/master");
    else setOidcIssuer("https://your-identity-provider.com");
  };

  return (
    <div
      className={`overflow-hidden rounded-[16px] border border-slate-800 bg-[#0f172a] text-slate-200 shadow-2xl ${className}`}
    >
      {/* Top Banner explaining In-Console architecture */}
      <div className="border-b border-slate-800 bg-slate-950/90 px-4 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d21a1b]/15 text-[#d21a1b]">
              <Lock className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white sm:text-sm">
                  In-Console Provider Configuration
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                  Zero .env Bloat
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Configured via Web UI (<code className="text-slate-300 font-mono">/settings</code>) and encrypted at rest in PostgreSQL with <code className="text-slate-300 font-mono">ENCRYPTION_KEY</code>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="hidden md:inline text-slate-500">Storage:</span>
            <span className="rounded border border-slate-800 bg-[#020617] px-2 py-1 text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              AES-256 Encrypted
            </span>
          </div>
        </div>
      </div>

      {/* Main Console Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left Console Sidebar Navigation */}
        <div className="border-b border-slate-800 bg-slate-900/60 p-3 md:col-span-4 md:border-b-0 md:border-r">
          <p className="px-2 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Settings Navigation
          </p>
          <div className="mt-1 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("slack")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                activeTab === "slack"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>Slack ChatOps</span>
              </div>
              <span className={`h-1.5 w-1.5 rounded-full ${slackEnabled ? "bg-emerald-400" : "bg-slate-600"}`} />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("sms")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                activeTab === "sms"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Smartphone className="h-4 w-4 text-sky-400" />
                <span>SMS Paging</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500 uppercase">{smsProvider}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("email")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                activeTab === "email"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400" />
                <span>Email Delivery</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500 uppercase">{emailProvider}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("oidc")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                activeTab === "oidc"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-rose-400" />
                <span>OIDC Single Sign-On</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500 capitalize">{oidcPreset}</span>
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-slate-800/80 bg-[#020617] p-3 text-[11px] text-slate-400">
            <p className="font-semibold text-slate-300 mb-1">Why in-console?</p>
            <p className="leading-relaxed">
              Enables dynamic rotation, multi-team permissions, and test delivery without restarting Docker containers.
            </p>
          </div>
        </div>

        {/* Right Active Form Pane */}
        <div className="p-5 md:col-span-8">
          {/* TAB 1: SLACK */}
          {activeTab === "slack" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">Slack Workspace &amp; War Rooms</h4>
                  <p className="text-xs text-slate-400">
                    Auto-creates incident channels, invites on-call responders, and syncs timelines.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSlackEnabled(!slackEnabled)}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium transition-colors ${
                    slackEnabled ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {slackEnabled ? "Provider Active" : "Disabled"}
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-slate-300">Bot User OAuth Token</label>
                    <span className="text-[10px] text-slate-500">scope: channels:manage, chat:write</span>
                  </div>
                  <input
                    type="text"
                    value={slackBotToken}
                    onChange={(e) => setSlackBotToken(e.target.value)}
                    placeholder="xoxb-your-bot-token"
                    className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-slate-300">Signing Secret</label>
                  <input
                    type="password"
                    value={slackSigningSecret}
                    onChange={(e) => setSlackSigningSecret(e.target.value)}
                    placeholder="your-signing-secret"
                    className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
                <Link
                  href={latestDocsHref("integrations/communication/slack-chatops")}
                  className="inline-flex items-center gap-1 text-xs text-[#d21a1b] hover:underline"
                >
                  <span>Slack setup guide</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleTestTrigger(setSlackTestStatus)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700"
                >
                  {slackTestStatus === "testing" ? (
                    <span>Verifying...</span>
                  ) : slackTestStatus === "success" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Verified connection</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Test Slack Connection</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SMS */}
          {activeTab === "sms" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">SMS &amp; High-Urgency Paging</h4>
                  <p className="text-xs text-slate-400">
                    Sends SMS alerts to on-call responders with 1-tap acknowledge links.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-[#020617] p-0.5 font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSmsProvider("twilio")}
                      className={`rounded px-2 py-0.5 transition-colors ${
                        smsProvider === "twilio" ? "bg-[#d21a1b] text-white font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Twilio
                    </button>
                    <button
                      type="button"
                      onClick={() => setSmsProvider("sns")}
                      className={`rounded px-2 py-0.5 transition-colors ${
                        smsProvider === "sns" ? "bg-[#d21a1b] text-white font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      AWS SNS
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSmsEnabled(!smsEnabled)}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium transition-colors ${
                      smsEnabled ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {smsEnabled ? "Active" : "Disabled"}
                  </button>
                </div>
              </div>

              {smsProvider === "twilio" ? (
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="mb-1 block text-slate-300">Account SID</label>
                    <input
                      type="text"
                      value={twilioSid}
                      onChange={(e) => setTwilioSid(e.target.value)}
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-slate-300">Auth Token</label>
                      <input
                        type="password"
                        value={twilioToken}
                        onChange={(e) => setTwilioToken(e.target.value)}
                        placeholder="your-auth-token"
                        className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-slate-300">From Phone Number (E.164)</label>
                      <input
                        type="text"
                        value={twilioFrom}
                        onChange={(e) => setTwilioFrom(e.target.value)}
                        placeholder="+14155550199"
                        className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-slate-300">AWS Region</label>
                      <input
                        type="text"
                        value={snsRegion}
                        onChange={(e) => setSnsRegion(e.target.value)}
                        placeholder="us-east-1"
                        className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-slate-300">AWS Access Key ID</label>
                      <input
                        type="text"
                        value={snsKeyId}
                        onChange={(e) => setSnsKeyId(e.target.value)}
                        placeholder="AKIAIOSFODNN7EXAMPLE"
                        className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
                <Link
                  href={latestDocsHref("administration/notifications")}
                  className="inline-flex items-center gap-1 text-xs text-[#d21a1b] hover:underline"
                >
                  <span>SMS documentation</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleTestTrigger(setSmsTestStatus)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700"
                >
                  {smsTestStatus === "testing" ? (
                    <span>Dispatching test SMS...</span>
                  ) : smsTestStatus === "success" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Test SMS Sent</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Test SMS Page</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: EMAIL */}
          {activeTab === "email" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">Email Notification Delivery</h4>
                  <p className="text-xs text-slate-400">
                    Routes incident reports, postmortems, and status page subscriber updates.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-[#020617] p-0.5 font-mono text-[10px]">
                    {(["smtp", "resend", "sendgrid", "ses"] as EmailProvider[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setEmailProvider(p)}
                        className={`rounded px-2 py-0.5 uppercase transition-colors ${
                          emailProvider === p ? "bg-[#d21a1b] text-white font-semibold" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailEnabled(!emailEnabled)}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium transition-colors ${
                      emailEnabled ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {emailEnabled ? "Active" : "Disabled"}
                  </button>
                </div>
              </div>

              {emailProvider === "smtp" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div>
                    <label className="mb-1 block text-slate-300">SMTP Host</label>
                    <input
                      type="text"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      placeholder="smtp.mailgun.org"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-slate-300">SMTP Port</label>
                    <input
                      type="text"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      placeholder="587"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-slate-300">SMTP Username</label>
                    <input
                      type="text"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      placeholder="smtp-username"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-slate-300">From Email</label>
                    <input
                      type="text"
                      value={emailFrom}
                      onChange={(e) => setEmailFrom(e.target.value)}
                      placeholder="alerts@yourcompany.com"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="mb-1 block text-slate-300">API Key ({emailProvider.toUpperCase()})</label>
                    <input
                      type="text"
                      value={resendApiKey}
                      onChange={(e) => setResendApiKey(e.target.value)}
                      placeholder="re_xxxxxxxxxxxxxxxx"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-slate-300">From Address</label>
                    <input
                      type="text"
                      value={emailFrom}
                      onChange={(e) => setEmailFrom(e.target.value)}
                      placeholder="alerts@yourcompany.com"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
                <Link
                  href={latestDocsHref("administration/notifications")}
                  className="inline-flex items-center gap-1 text-xs text-[#d21a1b] hover:underline"
                >
                  <span>Email delivery reference</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleTestTrigger(setEmailTestStatus)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700"
                >
                  {emailTestStatus === "testing" ? (
                    <span>Sending test email...</span>
                  ) : emailTestStatus === "success" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Email Delivered</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Test Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: OIDC */}
          {activeTab === "oidc" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">OIDC Single Sign-On (SSO)</h4>
                  <p className="text-xs text-slate-400">
                    Enforce enterprise authentication via OpenID Connect (Google, Okta, Keycloak, Authentik).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-[#020617] p-0.5 font-mono text-[10px]">
                    {(["google", "okta", "authentik", "keycloak", "generic"] as OidcPreset[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePresetChange(p)}
                        className={`rounded px-2 py-0.5 capitalize transition-colors ${
                          oidcPreset === p ? "bg-[#d21a1b] text-white font-semibold" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOidcEnabled(!oidcEnabled)}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium transition-colors ${
                      oidcEnabled ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {oidcEnabled ? "Active" : "Disabled"}
                  </button>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="mb-1 block text-slate-300">OIDC Issuer Discovery URL</label>
                  <input
                    type="text"
                    value={oidcIssuer}
                    onChange={(e) => setOidcIssuer(e.target.value)}
                    placeholder="https://accounts.google.com"
                    className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-slate-300">Client ID</label>
                    <input
                      type="text"
                      value={oidcClientId}
                      onChange={(e) => setOidcClientId(e.target.value)}
                      placeholder="your-client-id.apps.googleusercontent.com"
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-[#d21a1b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-slate-300">Client Secret</label>
                    <input
                      type="password"
                      value="••••••••••••••••••••••••••••••••"
                      readOnly
                      className="w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
                <Link
                  href={latestDocsHref("security/oidc-setup")}
                  className="inline-flex items-center gap-1 text-xs text-[#d21a1b] hover:underline"
                >
                  <span>OIDC SSO configuration guide</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleTestTrigger(setOidcTestStatus)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700"
                >
                  {oidcTestStatus === "testing" ? (
                    <span>Testing Discovery...</span>
                  ) : oidcTestStatus === "success" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Discovery Endpoint Valid</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span>Test OIDC Discovery</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
