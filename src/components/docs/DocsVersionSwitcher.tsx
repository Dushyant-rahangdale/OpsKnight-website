"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Check, Tag, Sparkles } from "lucide-react";
import { DOC_VERSIONS } from "@/lib/docs/versions";

export function DocsVersionSwitcher({ currentVersion }: { currentVersion: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentVersionData = DOC_VERSIONS.find(v => v.id === currentVersion);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleChange = (versionId: string) => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "docs") return;
    const rest = parts.slice(2);
    const next = ["/docs", versionId, ...rest].join("/");
    window.location.href = next;
    setIsOpen(false);
  };

  const isLatest = (versionId: string) => {
    return DOC_VERSIONS[0]?.id === versionId;
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-800/50 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-800 transition-all text-sm"
      >
        {/* Glow on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-500/10">
            <Tag className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="text-white font-medium">{currentVersion}</span>
          {isLatest(currentVersion) && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">
              <Sparkles className="w-2.5 h-2.5" />
              Latest
            </span>
          )}
        </div>

        <ChevronDown className={`relative w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl shadow-2xl border border-white/10 overflow-hidden bg-slate-900/95 backdrop-blur-xl">
          <div className="p-2">
            <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Select Version
            </p>
          </div>

          <div className="border-t border-white/5">
            {DOC_VERSIONS.map((version, index) => {
              const isSelected = version.id === currentVersion;
              const isLatestVersion = index === 0;

              return (
                <button
                  key={version.id}
                  onClick={() => handleChange(version.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-all ${
                    isSelected
                      ? "bg-emerald-500/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      isLatestVersion
                        ? "bg-emerald-400 shadow-sm shadow-emerald-400/50"
                        : "bg-slate-600"
                    }`} />
                    <span className="font-medium">{version.label}</span>
                    {isLatestVersion && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-medium">
                        Latest
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="border-t border-white/5 px-3 py-2 bg-slate-900/50">
            <p className="text-[10px] text-slate-500">
              Documentation may vary between versions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
