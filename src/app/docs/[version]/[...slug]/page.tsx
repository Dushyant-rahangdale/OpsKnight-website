import { notFound } from "next/navigation";
import { getDocPage, getAllDocSlugs } from "@/lib/docs/content";
import { DocsToc } from "@/components/docs/DocsToc";
import { DOC_VERSIONS } from "@/lib/docs/versions";

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

export default async function DocsPage({
  params,
}: {
  params: Promise<{ version: string; slug: string[] }>;
}) {
  const { version, slug } = await params;
  const doc = await getDocPage(version, slug);
  if (!doc) notFound();

  return (
    <div className="grid lg:grid-cols-[1fr_240px] gap-8">
      <article className="docs-markdown prose prose-slate max-w-none surface-panel rounded-2xl p-8">
        {/* <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">Documentation</p>
        <h1 className="text-3xl font-bold text-foreground mt-3">{doc.title}</h1> */}
        <div className="mt-6" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </article>
      <aside className="hidden lg:block sticky top-24 self-start">
        <DocsToc headings={doc.headings} />
      </aside>
    </div>
  );
}
