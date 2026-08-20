"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import type { DocsVersion } from "@/lib/docs/types";
import { withTrailingSlash } from "@/lib/docs/paths";

export function DocsVersionSwitcher({
  currentVersion,
  versions,
}: {
  currentVersion: string;
  versions: DocsVersion[];
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (versionId: string) => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "docs") return;
    const rest = parts.slice(2);
    window.location.href = withTrailingSlash(["/docs", versionId, ...rest].join("/"));
    setIsOpen(false);
  };

  const latestVersionId = versions[0]?.id;
  const isLatest = (versionId: string) => latestVersionId === versionId;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-[10px] border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
      >
        <span className="font-mono text-[13px]">{currentVersion}</span>
        {isLatest(currentVersion) && (
          <span className="rounded-full bg-[#d21a1b]/20 px-1.5 py-0.5 text-[10px] font-medium text-[#fca5a5]">
            Latest
          </span>
        )}
        <ChevronDown
          className={`ml-auto h-4 w-4 text-slate-400 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-[10px] border border-white/10 bg-[#0f172a] shadow-lg">
          {versions.map((version) => {
            const isSelected = version.id === currentVersion;
            return (
              <button
                key={version.id}
                type="button"
                onClick={() => handleChange(version.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm ${
                  isSelected
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="font-mono">{version.label}</span>
                {isLatest(version.id) && (
                  <span className="text-[10px] text-slate-500">Latest</span>
                )}
                {isSelected && <Check className="h-3.5 w-3.5 text-[#f87171]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
