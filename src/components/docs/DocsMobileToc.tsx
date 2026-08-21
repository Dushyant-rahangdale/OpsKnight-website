"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ListFilter } from "lucide-react";
import type { TocItem } from "@/components/docs/DocsToc";

export function DocsMobileToc({ headings }: { headings: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeText, setActiveText] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = headings.find((h) => h.id === entry.target.id);
            if (found) setActiveText(found.text);
          }
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

  const handleSelect = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    const offsetPosition =
      element.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
  };

  if (!headings.length) return null;

  return (
    <div className="mb-6 block lg:hidden">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <ListFilter className="h-3.5 w-3.5 shrink-0 text-[#d21a1b]" />
            <span className="font-semibold text-slate-900">On this page:</span>
            <span className="truncate text-slate-600">
              {activeText || headings[0]?.text || "Jump to section"}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="border-t border-slate-200 bg-white p-3 max-h-60 overflow-y-auto custom-scrollbar">
            <ul className="space-y-1">
              {headings.map((item) => {
                const isSub = item.depth >= 3;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`block w-full text-left py-1 text-xs rounded px-2 transition-colors ${
                        isSub
                          ? "pl-5 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                          : "font-medium text-slate-800 hover:text-[#d21a1b] hover:bg-red-50/50"
                      }`}
                    >
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
