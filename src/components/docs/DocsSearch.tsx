"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Command, FileText, Hash, ArrowRight } from "lucide-react";

type SearchResult = {
  title: string;
  href: string;
  excerpt: string;
  section?: string;
};

export function DocsSearch({ version }: { version: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [fullIndex, setFullIndex] = useState<SearchResult[]>([]);
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

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = fullIndex
      .filter(entry =>
        entry.title.toLowerCase().includes(lowerQuery) ||
        (entry.excerpt && entry.excerpt.toLowerCase().includes(lowerQuery)) ||
        (entry as any).text?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8)
      .map(entry => {
        // Extract section from href
        const parts = entry.href.split("/").filter(Boolean);
        const section = parts.length > 2 ? parts[2] : undefined;
        return {
          title: entry.title,
          href: entry.href,
          excerpt: (entry as any).text ? (entry as any).text.slice(0, 120) + "..." : entry.excerpt || "",
          section: section?.replace(/-/g, " "),
        };
      });

    setResults(filtered);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query, fullIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        router.push(results[selectedIndex].href);
        setIsOpen(false);
        setQuery("");
        inputRef.current?.blur();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }, [isOpen, results, selectedIndex, router]);

  const hasResults = useMemo(() => results.length > 0, [results]);

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-emerald-400 font-medium">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative group">
        {/* Glow effect on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            ref={inputRef}
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search docs..."
            className="w-full rounded-xl pl-10 pr-20 py-2.5 text-sm bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all"
            onFocus={() => query && setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />
          {/* Keyboard shortcut badge */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-700/50 border border-white/10 text-[10px] text-slate-400 font-medium">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute z-50 mt-2 w-full rounded-xl shadow-2xl border border-white/10 overflow-hidden bg-slate-900/95 backdrop-blur-xl"
        >
          {/* Results Header */}
          {query && (
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {isLoading ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""}`}
              </span>
              <span className="text-xs text-slate-600">
                Use ↑↓ to navigate, Enter to select
              </span>
            </div>
          )}

          {hasResults ? (
            <ul className="max-h-[320px] overflow-auto py-2 custom-scrollbar">
              {results.map((result, index) => (
                <li key={result.href}>
                  <Link
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-start gap-3 px-4 py-3 transition-all ${
                      index === selectedIndex
                        ? "bg-emerald-500/10 border-l-2 border-l-emerald-400"
                        : "border-l-2 border-transparent hover:bg-white/5"
                    }`}
                  >
                    {/* Icon */}
                    <div className={`mt-0.5 p-1.5 rounded-lg ${
                      index === selectedIndex
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    } transition-colors`}>
                      <FileText className="w-3.5 h-3.5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium text-sm truncate ${
                          index === selectedIndex ? "text-white" : "text-slate-200"
                        }`}>
                          {highlightMatch(result.title, query)}
                        </p>
                        {result.section && (
                          <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium bg-slate-800 text-slate-500">
                            {result.section}
                          </span>
                        )}
                      </div>
                      {result.excerpt && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {highlightMatch(result.excerpt, query)}
                        </p>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <ArrowRight className={`w-4 h-4 mt-1 flex-shrink-0 transition-all ${
                      index === selectedIndex
                        ? "text-emerald-400 translate-x-0 opacity-100"
                        : "text-slate-600 -translate-x-2 opacity-0"
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : query && !isLoading ? (
            <div className="px-4 py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400">No results found for "{query}"</p>
              <p className="text-xs text-slate-600 mt-1">Try different keywords or check the spelling</p>
            </div>
          ) : null}

          {/* Footer */}
          {hasResults && (
            <div className="px-4 py-2 border-t border-white/5 bg-slate-900/50">
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-white/10">↵</kbd>
                  to select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-white/10">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
