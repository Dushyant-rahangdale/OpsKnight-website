"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, FileText, CornerDownLeft } from "lucide-react";
import Fuse from "fuse.js";
import { cn } from "@/lib/utils";

type SearchResult = {
  title: string;
  href: string;
  excerpt: string;
  section?: string;
  category?: string;
};

type SearchIndexEntry = {
  title: string;
  href: string;
  text: string;
};

export function DocsSearch({ version, className }: { version: string, className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fullIndex, setFullIndex] = useState<SearchIndexEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut to open search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Fetch search index
  useEffect(() => {
    const fetchIndex = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/docs/${version}/search`);
        if (res.ok) {
          const data = await res.json();
          setFullIndex(data.results || []);
        }
      } catch (e) {
        console.error("Failed to load search index", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIndex();
  }, [version]);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(fullIndex, {
      keys: [
        { name: "title", weight: 0.7 },
        { name: "text", weight: 0.3 },
      ],
      threshold: 0.3, // Fuzzy match threshold
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, [fullIndex]);

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      // Don't close immediately if user just cleared input, let them close explicitly or blur
      return;
    }

    const fuseResults = fuse.search(query);

    // Process results to add section/category info
    const processed: SearchResult[] = fuseResults
      .slice(0, 8)
      .map(result => {
        const entry = result.item;

        // Extract section from href
        const parts = entry.href.split("/").filter(Boolean);
        // /docs/v1/section/page -> parts[2] is section
        const sectionSlug = parts.length > 2 ? parts[2] : "general";
        const section = sectionSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

        // Ensure excerpt is relevant
        const text = entry.text || "";
        const matchIndex = text.toLowerCase().indexOf(query.toLowerCase());
        const start = Math.max(0, matchIndex - 40);
        const excerpt = text.length > 0
          ? (start > 0 ? "..." : "") + text.slice(start, start + 80) + (text.length > start + 80 ? "..." : "")
          : "";

        return {
          title: entry.title,
          href: entry.href,
          excerpt: excerpt,
          section: section,
        };
      });

    setResults(processed);
    setSelectedIndex(0);
    setIsOpen(true);
  }, [query, fuse]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    // Only handle navigation keys
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].href);
          setIsOpen(false);
          setQuery("");
          inputRef.current?.blur();
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  }, [isOpen, results, selectedIndex, router]);

  // Highlight matching text helper
  const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight.trim()) return <>{text}</>;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-emerald-400 font-medium">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Search Input */}
      <div className="relative group">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            ref={inputRef}
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search docs..."
            className="w-full rounded-xl pl-10 pr-20 py-2 text-sm bg-slate-900/50 border border-white/5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-900 focus:text-white transition-all shadow-sm"
            onFocus={() => query && setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            autoComplete="off"
            id="docs-search"
          />
          {/* Keyboard shortcut badge */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-800/50 border border-white/5 text-[10px] text-slate-500 font-medium">
            <span className="text-xs">⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute top-full left-0 z-50 mt-2 w-full origin-top-left rounded-xl shadow-2xl border border-white/10 overflow-hidden bg-slate-900/95 backdrop-blur-xl ring-1 ring-black/5"
        >
          {query && (
            <div className="px-3 py-2 border-b border-white/5 bg-white/[0.02]">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                {isLoading ? "Searching..." : `Results for "${query}"`}
              </p>
            </div>
          )}

          {results.length > 0 ? (
            <div className="py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {results.map((result, index) => (
                <Link
                  key={`${result.href}-${index}`}
                  href={result.href}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "relative flex flex-col gap-1 px-4 py-3 mx-2 rounded-lg transition-all group",
                    index === selectedIndex
                      ? "bg-emerald-500/10"
                      : "hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
                        index === selectedIndex ? "text-emerald-400" : "text-slate-500"
                      )} />
                      <span className={cn(
                        "text-sm font-medium truncate transition-colors",
                        index === selectedIndex ? "text-emerald-100" : "text-slate-300"
                      )}>
                        <Highlight text={result.title} highlight={query} />
                      </span>
                    </div>
                    {result.section && (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded border border-white/5">
                        {result.section}
                      </span>
                    )}
                  </div>

                  {result.excerpt && (
                    <p className={cn(
                      "text-xs pl-6 line-clamp-1 transition-colors",
                      index === selectedIndex ? "text-slate-400" : "text-slate-500"
                    )}>
                      <Highlight text={result.excerpt} highlight={query} />
                    </p>
                  )}

                  {index === selectedIndex && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500/50">
                      <CornerDownLeft className="w-4 h-4" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : query && !isLoading ? (
            <div className="px-4 py-8 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-3 text-slate-600 opacity-50" />
              <p className="text-sm">No results found for <span className="text-white">&quot;{query}&quot;</span></p>
              <p className="text-xs text-slate-500 mt-1">Try searching for something else.</p>
            </div>
          ) : null}

          {/* Footer - Only show if not empty */}
          {(results.length > 0 || !query) && (
            <div className="px-4 py-2 border-t border-white/5 bg-slate-900/50 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] text-slate-600">
                  <kbd className="font-sans px-1 rounded bg-white/5 border border-white/10 text-slate-500">↑↓</kbd> navigate
                </span>
                <span className="text-[10px] text-slate-600">
                  <kbd className="font-sans px-1 rounded bg-white/5 border border-white/10 text-slate-500">↵</kbd> select
                </span>
              </div>
              <div className="text-[10px] text-slate-600">
                <kbd className="font-sans px-1 rounded bg-white/5 border border-white/10 text-slate-500">esc</kbd> close
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
