import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import type { Node } from "unist";
import { visit } from "unist-util-visit";

type RenderOptions = {
  imageBasePath?: string;
};

function rehypeDocImagePaths(options: RenderOptions) {
  const basePath = options.imageBasePath?.replace(/\/$/, "");
  if (!basePath) return () => {};
  return (tree: unknown) => {
    visit(tree as Node, "element", (node: { tagName?: string; properties?: Record<string, unknown> }) => {
      if (node.tagName !== "img") return;
      const src = node.properties?.src;
      if (typeof src !== "string") return;
      if (!src.startsWith("./assets/") && !src.startsWith("../assets/")) return;
      const normalized = src.replace(/^\.{1,2}\//, "");
      node.properties = { ...node.properties, src: `${basePath}/${normalized}` };
    });
  };
}

export async function renderMarkdown(markdown: string, options: RenderOptions = {}) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight)
    .use(rehypeDocImagePaths, options)
    // @ts-expect-error rehype typings don't align with unified's overloaded use signature
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

export function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");
  const headings: { depth: number; text: string; id: string }[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ depth, text, id });
  }

  return headings;
}
