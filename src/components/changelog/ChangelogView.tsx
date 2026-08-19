"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Terminal } from "lucide-react";
import { BRAND } from "@/lib/brand";
import {
  CHANGE_KIND_LABEL,
  type ChangeKind,
  type ReleaseItem,
  releases,
} from "@/lib/changelog";

const FILTERS: { id: "all" | ChangeKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "added", label: "New" },
  { id: "security", label: "Security" },
  { id: "fixed", label: "Fixes" },
];

const KIND_TONE: Record<ChangeKind, string> = {
  added: "bg-blue-50 text-[#2563eb]",
  security: "bg-emerald-50 text-emerald-700",
  fixed: "bg-amber-50 text-amber-800",
  changed: "bg-slate-100 text-slate-600",
  performance: "bg-sky-50 text-sky-800",
};

function CopyPull({ tag }: { tag: string }) {
  const [copied, setCopied] = useState(false);
  const command = `docker pull ${tag}`;

  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-[10px] border border-slate-200 bg-[#0f172a] pl-3 pr-1.5">
      <Terminal className="h-3.5 w-3.5 shrink-0 text-slate-500" />
      <code className="min-w-0 flex-1 truncate py-2.5 font-mono text-[11px] text-slate-200 sm:text-xs">
        {command}
      </code>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        className="shrink-0 rounded-md p-2 text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
        aria-label="Copy docker pull command"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

function ReleaseArticle({
  release,
  filter,
}: {
  release: ReleaseItem;
  filter: "all" | ChangeKind;
}) {
  const categories = release.categories.filter(
    (c) => filter === "all" || c.type === filter
  );
  if (categories.length === 0) return null;

  return (
    <article
      id={release.slug}
      className="scroll-mt-28 border-t border-slate-200 pt-10 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <h2 className="font-mono text-2xl font-semibold tracking-tight text-[#111827] sm:text-[1.75rem]">
          {release.version}
        </h2>
        {release.badge && (
          <span className="rounded-full bg-[#2563eb] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {release.badge}
          </span>
        )}
        <p className="font-mono text-xs text-slate-500">{release.date}</p>
      </div>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4b5563]">
        {release.summary}
      </p>
      <div className="mt-5 max-w-2xl">
        <CopyPull tag={release.dockerTag} />
      </div>
      <a
        href={release.githubReleaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2563eb] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
      >
        Notes on GitHub
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>

      <div className="mt-8 space-y-8">
        {categories.map((cat) => (
          <section key={`${release.slug}-${cat.title}`}>
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${KIND_TONE[cat.type]}`}
              >
                {CHANGE_KIND_LABEL[cat.type]}
              </span>
              <h3 className="text-sm font-semibold text-[#111827]">
                {cat.title}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-[#4b5563]"
                >
                  <span
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-slate-400"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

export function ChangelogView() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [active, setActive] = useState(releases[0]?.slug ?? "");

  const visible = useMemo(
    () =>
      releases.filter((rel) =>
        rel.categories.some((c) => filter === "all" || c.type === filter)
      ),
    [filter]
  );

  useEffect(() => {
    const nodes = visible
      .map((rel) => document.getElementById(rel.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-2xl">
        <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
          {BRAND.name} · shipping notes
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827] sm:text-[2.75rem]">
          What’s new
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
          What each version actually shipped. Pull a tagged image, or read the
          long form on GitHub.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={BRAND.links.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-[12px] bg-[#2563eb] px-4 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
          >
            All GitHub releases
          </Link>
          <Link
            href={BRAND.links.docs}
            className="inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Docs
          </Link>
        </div>
      </header>

      <div
        className="mt-10 flex flex-wrap gap-1.5"
        role="tablist"
        aria-label="Filter by change type"
      >
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] ${
              filter === f.id
                ? "bg-[#0f172a] text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16">
        <nav
          aria-label="Versions"
          className="hidden lg:block lg:self-start lg:sticky lg:top-28"
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            Versions
          </p>
          <ol className="space-y-1 border-l border-slate-200">
            {releases.map((rel) => {
              const shown = visible.some((v) => v.slug === rel.slug);
              return (
                <li key={rel.slug}>
                  <a
                    href={`#${rel.slug}`}
                    className={`-ml-px block border-l py-1.5 pl-4 font-mono text-[13px] ${
                      !shown
                        ? "border-transparent text-slate-300"
                        : active === rel.slug
                          ? "border-[#2563eb] font-semibold text-[#111827]"
                          : "border-transparent text-slate-500 hover:text-[#111827]"
                    }`}
                  >
                    {rel.version}
                    {rel.badge ? (
                      <span className="ml-2 font-sans text-[10px] font-medium uppercase tracking-wide text-[#2563eb]">
                        {rel.badge}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="min-w-0 space-y-4">
          {visible.map((rel) => (
            <ReleaseArticle key={rel.slug} release={rel} filter={filter} />
          ))}
          {visible.length === 0 && (
            <p className="text-sm text-slate-500">Nothing in this filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
