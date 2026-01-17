import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDocPage, getAllDocMeta } from "@/lib/docs/content";
import { getSidebar } from "@/lib/docs/sidebar";
import { DocsToc } from "@/components/docs/DocsToc";
import { DOC_VERSIONS } from "@/lib/docs/versions";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return DOC_VERSIONS.map((v) => ({ version: v.id }));
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
  const sections = sidebar.slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="surface-panel rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-foreground-muted">Documentation</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-3">{doc.title}</h1>
        <p className="text-foreground-secondary max-w-2xl mt-3">
          {doc.description ??
            "Dive into the OpsSentinal platform, learn the core concepts, and follow step-by-step guides to get operational fast."}
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map(section => (
          <div key={section.title} className="surface-panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">Section</p>
            <h2 className="text-lg font-semibold text-foreground mt-2">{section.title}</h2>
            <p className="text-sm text-foreground-secondary mt-2">
              {section.children?.length
                ? `${section.children.length} guides inside`
                : "Explore the fundamentals and workflows."}
            </p>
            {section.href && (
              <Link
                href={section.href}
                className="mt-4 inline-flex items-center text-sm font-semibold text-accent-blue hover:text-accent-strong"
              >
                Explore section →
              </Link>
            )}
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-[1fr_240px] gap-8">
        <article className="docs-markdown surface-panel rounded-2xl p-8">
          <h2>Overview</h2>
          <div dangerouslySetInnerHTML={{ __html: doc.html }} />
        </article>
        <aside className="hidden lg:block sticky top-24 self-start">
          <DocsToc headings={doc.headings} />
        </aside>
      </div>
    </div>
  );
}
