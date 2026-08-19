import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocPage } from "@/lib/docs/content";
import { getSidebar } from "@/lib/docs/sidebar";
import { DocsToc } from "@/components/docs/DocsToc";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { BRAND } from "@/lib/brand";
import {
  Rocket,
  Lightbulb,
  Settings,
  Plug,
  Code2,
  Server,
  Shield,
  Boxes,
  Smartphone,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ version: string }>;
}): Promise<Metadata> {
  const { version } = await params;
  const doc = await getDocPage(version, []);
  const title = `Docs (${version})`;
  const description =
    doc?.description ||
    `Documentation for ${BRAND.name} ${version}, including setup guides, integrations, and API references.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/docs/${version}`,
    },
    openGraph: {
      title,
      description,
      url: `/docs/${version}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return DOC_VERSIONS.map((v) => ({ version: v.id }));
}

// Section icons and colors mapping
const SECTION_CONFIG: Record<string, {
  icon: React.ElementType;
  color: string;
  gradient: string;
  description: string;
}> = {
  "getting-started": {
    icon: Rocket,
    color: "text-amber-400",
    gradient: "from-amber-500 to-orange-500",
    description: "Quick start guides and installation",
  },
  "core-concepts": {
    icon: Lightbulb,
    color: "text-cyan-400",
    gradient: "from-cyan-500 to-blue-500",
    description: "Understand the fundamentals",
  },
  administration: {
    icon: Settings,
    color: "text-blue-400",
    gradient: "from-blue-500 to-teal-500",
    description: "Configuration and management",
  },
  integrations: {
    icon: Plug,
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-500",
    description: "Connect with external services",
  },
  api: {
    icon: Code2,
    color: "text-rose-400",
    gradient: "from-rose-500 to-pink-500",
    description: "API reference and endpoints",
  },
  deployment: {
    icon: Server,
    color: "text-lime-400",
    gradient: "from-lime-500 to-green-500",
    description: "Deploy to production",
  },
  security: {
    icon: Shield,
    color: "text-red-400",
    gradient: "from-red-500 to-rose-500",
    description: "Security best practices",
  },
  architecture: {
    icon: Boxes,
    color: "text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
    description: "System design and structure",
  },
  mobile: {
    icon: Smartphone,
    color: "text-teal-400",
    gradient: "from-teal-500 to-cyan-500",
    description: "Mobile app development",
  },
};

function getSectionKey(href?: string): string | undefined {
  if (!href) return undefined;
  const parts = href.split("/").filter(Boolean);
  if (parts.length < 3) return undefined;
  return parts[2];
}

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<{ version: string }>;
}) {
  const { version } = await params;
  const doc = await getDocPage(version, []);
  if (!doc) notFound();
  const sidebar = getSidebar(version);
  const sections = sidebar.slice(0, 9);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-[14px] overflow-hidden border border-slate-200 bg-white">
        <div className="relative px-8 py-12 md:px-12 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
              {version} documentation
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight">
            {doc.title}
          </h1>

          <p className="text-slate-600 max-w-2xl mt-4 text-lg leading-relaxed">
            {doc.description ??
              "Setup, integrations, and operations for the self-hosted incident command center."}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              href={`/docs/${version}/getting-started/installation`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#2563eb] text-white font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              <Rocket className="w-4 h-4" />
              Quick start
            </Link>
            <Link
              href={`/docs/${version}/api`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] border border-slate-200 bg-white text-slate-800 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2563eb]" />
            Browse documentation
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const sectionKey = getSectionKey(section.children?.[0]?.href) || getSectionKey(section.href);
            const config = sectionKey ? SECTION_CONFIG[sectionKey] : undefined;
            const Icon = config?.icon || BookOpen;

            return (
              <div
                key={section.title}
                className="rounded-[14px] overflow-hidden"
              >
                <div className="relative p-5 bg-white border border-slate-200 rounded-[14px] h-full">
                  <div className="inline-flex p-2.5 rounded-[12px] bg-slate-100 mb-4">
                    <Icon className="w-5 h-5 text-[#2563eb]" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {section.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2">
                    {config?.description || (section.children?.length
                      ? `${section.children.length} guides`
                      : "Guides and reference.")}
                  </p>

                  {(section.href || section.children?.[0]?.href) && (
                    <Link
                      href={section.href || section.children?.[0]?.href || "#"}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563eb] hover:underline"
                    >
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-[1fr_260px] gap-8">
        <article className="rounded-[14px] border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-4 border-b border-slate-200">
            Overview
          </h2>
          <div
            className="docs-content prose prose-slate max-w-none
              prose-headings:text-slate-900 prose-headings:font-semibold
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700
              prose-strong:text-slate-900
              prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl
              prose-ul:text-slate-600 prose-ol:text-slate-600
              prose-li:marker:text-blue-600
              prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-600
            "
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <DocsToc headings={doc.headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
