import { CopyCodeButton } from "@/components/docs/CopyCodeButton";

export function DocsArticleBody({ html }: { html: string }) {
  return (
    <div className="docs-article">
      <CopyCodeButton />
      <div className="docs-content prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
