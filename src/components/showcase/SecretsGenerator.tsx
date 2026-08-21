"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Key, ShieldCheck, Terminal, Database } from "lucide-react";

function generateBase64Secret(): string {
  if (typeof window === "undefined" || !window.crypto) return "";
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function generateHexSecret(): string {
  if (typeof window === "undefined" || !window.crypto) return "";
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function SecretsGenerator({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [nextAuthSecret, setNextAuthSecret] = useState<string>("");
  const [encryptionKey, setEncryptionKey] = useState<string>("");
  const [copiedNextAuth, setCopiedNextAuth] = useState(false);
  const [copiedEncryption, setCopiedEncryption] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedOneLiner, setCopiedOneLiner] = useState(false);
  const [mode, setMode] = useState<"generator" | "openssl">("generator");
  const [isRotating, setIsRotating] = useState(false);

  const generateNewSecrets = () => {
    setIsRotating(true);
    setNextAuthSecret(generateBase64Secret());
    setEncryptionKey(generateHexSecret());
    setTimeout(() => setIsRotating(false), 300);
  };

  useEffect(() => {
    generateNewSecrets();
  }, []);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const envBlock = `# First-Boot Secrets
NEXTAUTH_SECRET="${nextAuthSecret}"
ENCRYPTION_KEY="${encryptionKey}"`;

  const opensslOneLiner = `echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env && echo "ENCRYPTION_KEY=$(openssl rand -hex 32)" >> .env`;

  return (
    <div
      className={`rounded-[14px] border border-slate-800 bg-[#0f172a] text-slate-200 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d21a1b]/15 text-[#d21a1b]">
            <Key className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-tight text-white sm:text-sm">
                Deployment Requirements &amp; Secrets
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                First Boot
              </span>
            </div>
            {!compact && (
              <p className="text-[11px] text-slate-400">
                PostgreSQL 14+, session signing key, and AES-256 encryption key.
              </p>
            )}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-[#020617] p-1 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setMode("generator")}
            className={`rounded px-2.5 py-1 transition-colors ${
              mode === "generator"
                ? "bg-slate-800 font-semibold text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Quick Generator
          </button>
          <button
            type="button"
            onClick={() => setMode("openssl")}
            className={`rounded px-2.5 py-1 transition-colors ${
              mode === "openssl"
                ? "bg-slate-800 font-semibold text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            OpenSSL 1-Liner
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        {mode === "generator" ? (
          <div className="space-y-4">
            {/* NEXTAUTH_SECRET */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                  NEXTAUTH_SECRET
                  <span className="text-[10px] text-slate-500">(32 bytes base64)</span>
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(nextAuthSecret, setCopiedNextAuth)}
                  className="flex items-center gap-1 font-mono text-[11px] text-slate-400 hover:text-white"
                >
                  {copiedNextAuth ? (
                    <>
                      <Check className="h-3 w-3 text-[#059669]" />
                      <span className="text-[#059669]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative rounded-lg border border-slate-800 bg-[#020617] px-3 py-2">
                <span className="block truncate font-mono text-xs text-slate-300">
                  {nextAuthSecret || "Generating..."}
                </span>
              </div>
            </div>

            {/* ENCRYPTION_KEY */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-300">
                  <Key className="h-3.5 w-3.5 text-slate-400" />
                  ENCRYPTION_KEY
                  <span className="text-[10px] text-slate-500">(32 bytes hex)</span>
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(encryptionKey, setCopiedEncryption)}
                  className="flex items-center gap-1 font-mono text-[11px] text-slate-400 hover:text-white"
                >
                  {copiedEncryption ? (
                    <>
                      <Check className="h-3 w-3 text-[#059669]" />
                      <span className="text-[#059669]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative rounded-lg border border-slate-800 bg-[#020617] px-3 py-2">
                <span className="block truncate font-mono text-xs text-slate-300">
                  {encryptionKey || "Generating..."}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={generateNewSecrets}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                    isRotating ? "rotate-180 duration-300" : ""
                  }`}
                />
                <span>Regenerate Values</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(envBlock, setCopiedEnv)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#d21a1b] px-3.5 py-1.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-[#b41516]"
              >
                {copiedEnv ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied .env block</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy .env block</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Generate secrets directly from your terminal using OpenSSL:
            </p>
            <div className="relative rounded-lg border border-slate-800 bg-[#020617] p-3">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-[#d21a1b]" />
                  <span>Terminal 1-Liner (Appends to .env)</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(opensslOneLiner, setCopiedOneLiner)}
                  className="flex items-center gap-1 font-mono text-[11px] text-slate-300 hover:text-white"
                >
                  {copiedOneLiner ? (
                    <>
                      <Check className="h-3 w-3 text-[#059669]" />
                      <span className="text-[#059669]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto font-mono text-xs text-slate-200">
                {opensslOneLiner}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <div className="rounded-lg border border-slate-800/60 bg-[#020617]/50 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                  NEXTAUTH_SECRET command
                </span>
                <code className="text-slate-300">openssl rand -base64 32</code>
              </div>
              <div className="rounded-lg border border-slate-800/60 bg-[#020617]/50 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                  ENCRYPTION_KEY command
                </span>
                <code className="text-slate-300">openssl rand -hex 32</code>
              </div>
            </div>
          </div>
        )}

        {/* Database & Requirements Footnote */}
        <div className="mt-4 border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span>
              <strong className="text-slate-300 font-medium">PostgreSQL 14+</strong> is required.
              Docker Compose bundles and starts it automatically.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
