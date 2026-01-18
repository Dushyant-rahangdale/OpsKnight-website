import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocPage, getAllDocSlugs } from "@/lib/docs/content";
import { DocsToc } from "@/components/docs/DocsToc";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { ChevronRight, Clock, BookOpen } from "lucide-react";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const params = [];
  for (const version of DOC_VERSIONS) {
    const slugs = getAllDocSlugs(version.id);
    for (const slug of slugs) {
      params.push({ version: version.id, slug });
    }
  }
  return params;
}

// Section colors mapping
const SECTION_COLORS: Record<string, { badge: string; border: string }> = {
  "getting-started": { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20", border: "border-l-amber-500" },
  "core-concepts": { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", border: "border-l-cyan-500" },
  "administration": { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", border: "border-l-emerald-500" },
  "integrations": { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", border: "border-l-blue-500" },
  "api": { badge: "bg-rose-500/10 text-rose-400 border-rose-500/20", border: "border-l-rose-500" },
  "deployment": { badge: "bg-lime-500/10 text-lime-400 border-lime-500/20", border: "border-l-lime-500" },
  "security": { badge: "bg-red-500/10 text-red-400 border-red-500/20", border: "border-l-red-500" },
  "architecture": { badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", border: "border-l-indigo-500" },
  "mobile": { badge: "bg-teal-500/10 text-teal-400 border-teal-500/20", border: "border-l-teal-500" },
};

function getSectionFromSlug(slug: string[]): string | undefined {
  return slug.length > 0 ? slug[0] : undefined;
}

function estimateReadTime(html: string): number {
  // Strip HTML tags and count words
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(words / 200));
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ version: string; slug: string[] }>;
}) {
  const { version, slug } = await params;
  const doc = await getDocPage(version, slug);
  if (!doc) notFound();

  const section = getSectionFromSlug(slug);
  const sectionColors = section ? SECTION_COLORS[section] : undefined;
  const readTime = estimateReadTime(doc.html);

  // Build breadcrumb
  const breadcrumbs = [
    { label: "Docs", href: `/docs/${version}` },
    ...slug.map((s, i) => ({
      label: s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      href: `/docs/${version}/${slug.slice(0, i + 1).join("/")}`,
    })),
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_260px] gap-8">
      <article className="space-y-6">
        {/* Article Header */}
        <div className={`rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm overflow-hidden ${sectionColors?.border ? `border-l-4 ${sectionColors.border}` : ""}`}>
          {/* Breadcrumbs */}
          <div className="px-6 py-3 border-b border-white/5 bg-slate-900/50">
            <nav className="flex items-center gap-1.5 text-xs">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-slate-600" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-slate-300 font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-slate-500 hover:text-slate-300 transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Title Section */}
          <div className="px-8 py-6">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {section && (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${sectionColors?.badge || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
                  <BookOpen className="w-3 h-3" />
                  {section.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {doc.title}
            </h1>

            {/* Description */}
            {doc.description && (
              <p className="mt-3 text-slate-400 text-lg leading-relaxed max-w-3xl">
                {doc.description}
              </p>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-8">
          <div
            className="docs-content prose prose-invert prose-slate max-w-none
              prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300 prose-a:transition-colors
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-emerald-300 prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-800/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-li:marker:text-emerald-500
              prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-300 prose-blockquote:not-italic
              prose-table:border-collapse
              prose-th:bg-slate-800/80 prose-th:text-slate-200 prose-th:font-semibold prose-th:px-4 prose-th:py-2
              prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-white/10
              prose-img:rounded-xl prose-img:border prose-img:border-white/10
              prose-hr:border-white/10
            "
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-slate-900/40">
          <p className="text-xs text-slate-500">
            Last updated for {version}
          </p>
          <Link
            href={`https://github.com/Dushyant-rahangdale/OpsSentinel`}
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
          >
            Edit this page on GitHub
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </article>

      {/* Table of Contents Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <DocsToc headings={doc.headings} />
        </div>
      </aside>
    </div>
  );
}
