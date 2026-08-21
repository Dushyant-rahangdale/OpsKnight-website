"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUp, Pencil, Copy, Check, ListFilter } from "lucide-react";

export type TocItem = {
  depth: number;
  text: string;
  id: string;
};

export function DocsToc({
  headings,
  editUrl,
}: {
  headings: TocItem[];
  editUrl?: string;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-90px 0px -75% 0px", threshold: 0 }
    );
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;
      const offsetPosition =
        element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    },
    []
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!headings.length) return null;

  return (
    <nav className="space-y-6 text-sm">
      <div>
        <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <ListFilter className="h-3.5 w-3.5 text-slate-500" />
          On this page
        </p>
        <ul className="relative space-y-0.5 border-l border-slate-200">
          {headings.map((item) => {
            const isActive = item.id === activeId;
            const isSubItem = item.depth >= 3;
            const isDeepItem = item.depth >= 4;

            return (
              <li key={item.id} className="relative">
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`-ml-px block border-l-2 py-1.5 text-left transition-colors ${
                    isDeepItem
                      ? "pl-7 text-[11px]"
                      : isSubItem
                        ? "pl-5 text-[12px]"
                        : "pl-3.5 text-[13px]"
                  } ${
                    isActive
                      ? "border-[#d21a1b] font-semibold text-[#111827] bg-red-50/40 rounded-r-md"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  <span className="line-clamp-2 leading-snug">{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quick Action Utilities */}
      <div className="space-y-2 border-t border-slate-200/80 pt-4 text-xs">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Quick Actions
        </p>

        <div className="flex flex-col space-y-1 text-slate-600">
          <button
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-2 rounded-md py-1 text-left text-slate-600 hover:text-[#d21a1b] transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5 text-slate-400" />
            <span>Scroll to top</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-2 rounded-md py-1 text-left text-slate-600 hover:text-[#d21a1b] transition-colors"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span>{copied ? "Link copied!" : "Copy page URL"}</span>
          </button>

          {editUrl && (
            <Link
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md py-1 text-left text-slate-600 hover:text-[#d21a1b] transition-colors"
            >
              <Pencil className="h-3.5 w-3.5 text-slate-400" />
              <span>Edit on GitHub</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
