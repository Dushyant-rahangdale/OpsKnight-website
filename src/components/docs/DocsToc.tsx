"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { List, ChevronRight } from "lucide-react";

export type TocItem = {
  depth: number;
  text: string;
  id: string;
};

export function DocsToc({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState(0);

  // Track active heading on scroll
  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without triggering navigation
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  }, []);

  if (!headings.length) return null;

  // Calculate which heading index is active
  const activeIndex = headings.findIndex((h) => h.id === activeId);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 bg-slate-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-emerald-500/10">
              <List className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              On this page
            </p>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="p-3">
        <ul className="space-y-1">
          {headings.map((item, index) => {
            const isActive = item.id === activeId;
            const isPassed = activeIndex > index;
            const indent = item.depth === 3 ? "ml-3" : "";

            return (
              <li key={item.id} className={indent}>
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`group flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 font-medium"
                      : isPassed
                      ? "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {/* Active indicator */}
                  <span
                    className={`w-1 h-1 rounded-full transition-all ${
                      isActive
                        ? "bg-emerald-400 scale-150"
                        : isPassed
                        ? "bg-slate-600"
                        : "bg-slate-700 group-hover:bg-slate-500"
                    }`}
                  />

                  {/* Text */}
                  <span className="truncate">{item.text}</span>

                  {/* Arrow for active */}
                  <ChevronRight
                    className={`w-3 h-3 ml-auto flex-shrink-0 transition-all ${
                      isActive
                        ? "text-emerald-400 opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with keyboard hint */}
      <div className="px-4 py-2 border-t border-white/5 bg-slate-900/30">
        <p className="text-[10px] text-slate-600 text-center">
          Click to navigate
        </p>
      </div>
    </div>
  );
}
