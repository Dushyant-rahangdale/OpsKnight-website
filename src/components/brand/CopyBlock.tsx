"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-800 bg-[#0f172a]">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <p className="font-mono text-[11px] tracking-wide text-slate-400">{label}</p>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-200 whitespace-pre-wrap">
        {value}
      </pre>
    </div>
  );
}
