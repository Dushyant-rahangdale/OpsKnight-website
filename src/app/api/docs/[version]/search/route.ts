import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllDocSlugs, getDocFilePath } from "@/lib/docs/content";
import { DOC_VERSIONS } from "@/lib/docs/versions";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
    return DOC_VERSIONS.map((v) => ({ version: v.id }));
}

function stripMarkdown(text: string) {
    return text
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/[*_>#-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function buildIndex(version: string) {
    const slugs = getAllDocSlugs(version);
    const entries = [];

    for (const slug of slugs) {
        const filePath = getDocFilePath(version, slug);
        if (!filePath) continue;
        const raw = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(raw);
        const title =
            (typeof data.title === "string" && data.title) ||
            content.split("\n").find(line => line.startsWith("# "))?.replace(/^#\s+/, "") ||
            path.basename(filePath).replace(/\.mdx?$/, "");
        const text = stripMarkdown(content);
        const href = `/docs/${version}/${slug.join("/")}`.replace(/\/$/, "");
        entries.push({ title, href, text });
    }

    return entries;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ version: string }> }
) {
    const { version } = await params;
    const index = buildIndex(version);
    return NextResponse.json({ results: index });
}
