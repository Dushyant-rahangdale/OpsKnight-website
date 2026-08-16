import { redirect } from "next/navigation";
import { DEFAULT_DOC_VERSION } from "@/lib/docs/versions";
import { getAllDocSlugs } from "@/lib/docs/content";

/**
 * Version-agnostic docs alias.
 *
 * Marketing pages and external links point at /docs/latest/... so they never
 * have to be edited when a new docs version is published. The newest version is
 * discovered from the content tree at build time, so adding docs/vX to the app
 * repo is the only step required.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocSlugs(DEFAULT_DOC_VERSION)
    .filter(slug => slug.length > 0)
    .map(slug => ({ slug }));
}

export default async function LatestDocsAlias({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  redirect(`/docs/${DEFAULT_DOC_VERSION}/${slug.join("/")}`);
}
