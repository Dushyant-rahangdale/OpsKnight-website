import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocPage, getAllDocSlugs, getDocFilePath } from "@/lib/docs/content";
import { DocsToc } from "@/components/docs/DocsToc";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { ChevronRight, Clock, BookOpen } from "lucide-react";
import { CopyCodeButton } from "@/components/docs/CopyCodeButton";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { BRAND } from "@/lib/brand";

export const dynamicParams = false;
// export const dynamic = "force-static";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ version: string; slug: string[] }>;
}): Promise<Metadata> {
  const { version, slug } = await params;
  const doc = await getDocPage(version, slug);
  if (!doc) {
    return {};
  }

  const canonical =
    doc.slug.length > 0
      ? `/docs/${version}/${doc.slug.join("/")}`
      : `/docs/${version}`;
  const title = doc.title;
  const description =
    doc.description ||
    `Learn ${doc.title} in the ${BRAND.name} documentation.`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const version of DOC_VERSIONS) {
    const slugs = getAllDocSlugs(version.id);
    for (const slug of slugs) {
      if (slug.length > 0) {
        params.push({ version: version.id, slug });
      }
    }
  }
  return params;
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

  const section = slug[0];
  const readTime = estimateReadTime(doc.html);
  const filePath = getDocFilePath(version, slug);
  const githubDocPath = filePath?.includes("content/docs/")
    ? filePath.split("content/docs/")[1]
    : `${version}/README.md`;
  const editUrl = `${BRAND.links.github}/blob/main/docs/${githubDocPath}`;

  const breadcrumbs = [
    { label: "Docs", href: `/docs/${version}` },
    ...slug.map((s, i) => ({
      label: s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      href: `/docs/${version}/${slug.slice(0, i + 1).join("/")}`,
    })),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] xl:grid-cols-[minmax(0,1fr)_16rem]">
      <article className="space-y-6">
        {/* Article Header */}
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white">
          {/* Breadcrumbs */}
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50">
            <nav className="flex items-center gap-1.5 text-xs">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-slate-800 font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-slate-500 hover:text-slate-800 transition-colors">
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
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                  <BookOpen className="w-3 h-3" />
                  {section.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              {doc.title}
            </h1>

            {doc.description && (
              <p className="mt-3 text-slate-600 text-lg leading-relaxed max-w-3xl">
                {doc.description}
              </p>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="rounded-[14px] border border-slate-200 bg-white p-8">
          <CopyCodeButton />
          <div
            className="docs-content prose prose-slate max-w-none
              prose-headings:text-slate-900 prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 prose-a:transition-colors
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl
              prose-ul:text-slate-600 prose-ol:text-slate-600
              prose-li:marker:text-blue-600
              prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-600 prose-blockquote:not-italic
              prose-table:border-collapse
              prose-th:bg-slate-50 prose-th:text-slate-800 prose-th:font-semibold prose-th:px-4 prose-th:py-2
              prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-slate-200
              prose-img:rounded-xl prose-img:border prose-img:border-slate-200
              prose-hr:border-slate-200
            "
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
          <DocsPrevNext version={version} currentPath={`/docs/${version}${slug.length > 0 ? `/${slug.join("/")}` : ""}`} />
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between p-4 rounded-[12px] border border-slate-200 bg-white">
          <p className="text-xs text-slate-500">
            Last updated for {version}
          </p>
          <Link
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
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
