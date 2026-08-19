"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export type TocItem = {
  depth: number;
  text: string;
  id: string;
};

export function DocsToc({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
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
        element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    },
    []
  );

  if (!headings.length) return null;

  return (
    <nav className="rounded-[12px] border border-slate-200 bg-white p-4">
      <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className={item.depth === 3 ? "ml-3" : ""}>
              <Link
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block border-l-2 py-1 pl-3 text-sm leading-snug ${
                  isActive
                    ? "border-[#2563eb] font-medium text-[#111827]"
                    : "border-transparent text-slate-500 hover:text-[#111827]"
                }`}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
