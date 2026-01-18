import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocPage } from "@/lib/docs/content";
import { getSidebar } from "@/lib/docs/sidebar";
import { DocsToc } from "@/components/docs/DocsToc";
import { DOC_VERSIONS } from "@/lib/docs/versions";
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
  Sparkles,
} from "lucide-react";

export const dynamicParams = false;
export const dynamic = "force-static";

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
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
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
      <section className="relative rounded-3xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-900/90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/10" />

        <div className="relative px-8 py-12 md:px-12 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              v{version} Documentation
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {doc.title}
          </h1>

          <p className="text-slate-400 max-w-2xl mt-4 text-lg leading-relaxed">
            {doc.description ??
              "Dive into the OpsSentinel platform, learn the core concepts, and follow step-by-step guides to get operational fast."}
          </p>

          {/* Quick actions */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              href={`/docs/${version}/getting-started/installation`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-400 transition-colors"
            >
              <Rocket className="w-4 h-4" />
              Quick Start
            </Link>
            <Link
              href={`/docs/${version}/api`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors"
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
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Browse Documentation
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
                className="group relative rounded-2xl overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${config?.gradient || "from-emerald-500 to-cyan-500"} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Card */}
                <div className="relative p-5 bg-slate-900/80 border border-white/10 rounded-2xl hover:border-white/20 transition-all h-full">
                  {/* Icon */}
                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${config?.gradient || "from-emerald-500 to-cyan-500"} mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-50 transition-colors">
                    {section.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 mt-2 group-hover:text-slate-300 transition-colors">
                    {config?.description || (section.children?.length
                      ? `${section.children.length} guides available`
                      : "Explore the fundamentals and workflows.")}
                  </p>

                  {/* Link */}
                  {(section.href || section.children?.[0]?.href) && (
                    <Link
                      href={section.href || section.children?.[0]?.href || "#"}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
            <span className="w-1 h-6 bg-emerald-500 rounded-full" />
            Overview
          </h2>
          <div
            className="docs-content prose prose-invert prose-slate max-w-none
              prose-headings:text-white prose-headings:font-semibold
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300
              prose-strong:text-white
              prose-code:text-emerald-300 prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-800/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-li:marker:text-emerald-500
              prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-300
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
