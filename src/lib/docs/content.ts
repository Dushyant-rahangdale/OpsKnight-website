import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown, extractHeadings } from "./markdown";

export type DocMeta = {
  title: string;
  slug: string[];
  version: string;
  description?: string;
};

export type DocPage = DocMeta & {
  html: string;
  headings: { depth: number; text: string; id: string }[];
};

const DOCS_ROOT = path.join(process.cwd(), "content", "docs");

function getVersionRoot(version: string) {
  return path.join(DOCS_ROOT, version);
}

function isMarkdownFile(fileName: string) {
  return fileName.endsWith(".md") || fileName.endsWith(".mdx");
}

function normalizeSlugParts(parts: string[]) {
  const cleaned = parts.filter(Boolean).map(part => part.replace(/\.mdx?$/, ""));
  // Remove trailing README or index
  if (cleaned.length > 0) {
    const last = cleaned[cleaned.length - 1].toLowerCase();
    if (last === "readme" || last === "index") {
      cleaned.pop();
    }
  }
  return cleaned;
}

function readMarkdownFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const title =
    (typeof data.title === "string" && data.title) ||
    content.split("\n").find(line => line.startsWith("# "))?.replace(/^#\s+/, "") ||
    path.basename(filePath).replace(/\.mdx?$/, "");
  const description = typeof data.description === "string" ? data.description : undefined;
  return { title, description, content };
}

export function getDocFilePath(version: string, slugParts: string[]) {
  const root = getVersionRoot(version);
  const resolved = slugParts.length === 0 ? ["README.md", "index.md"] : [];
  if (resolved.length) {
    for (const candidate of resolved) {
      const filePath = path.join(root, candidate);
      if (fs.existsSync(filePath)) return filePath;
    }
  }

  const target = slugParts.map(part => part.replace(/\.mdx?$/, ""));
  const fileCandidates = [
    path.join(root, ...target) + ".md",
    path.join(root, ...target) + ".mdx",
    path.join(root, ...target, "README.md"),
    path.join(root, ...target, "index.md"),
  ];

  for (const filePath of fileCandidates) {
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

export async function getDocPage(version: string, slugParts: string[]) {
  const filePath = getDocFilePath(version, slugParts);
  if (!filePath) return null;
  const { title, description, content } = readMarkdownFile(filePath);
  const html = await renderMarkdown(content);
  const headings = extractHeadings(content);
  return {
    title,
    description,
    slug: normalizeSlugParts(slugParts),
    version,
    html,
    headings,
  } satisfies DocPage;
}

export function getAllDocSlugs(version: string) {
  const root = getVersionRoot(version);
  const slugs: string[][] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (isMarkdownFile(entry.name)) {
        const rel = path.relative(root, fullPath);
        const parts = normalizeSlugParts(rel.split(path.sep));
        slugs.push(parts);
      }
    }
  }

  walk(root);
  return slugs;
}

export function getAllDocMeta(version: string): DocMeta[] {
  const slugs = getAllDocSlugs(version);
  return slugs.map(slugParts => {
    const filePath = getDocFilePath(version, slugParts);
    if (!filePath) {
      return { title: slugParts[slugParts.length - 1] || "Docs", slug: slugParts, version };
    }
    const { title, description } = readMarkdownFile(filePath);
    return { title, description, slug: slugParts, version };
  });
}
