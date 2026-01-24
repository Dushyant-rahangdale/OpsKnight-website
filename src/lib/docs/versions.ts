import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { DocsVersion } from "@/lib/docs/types";

const DOCS_ROOT = path.join(process.cwd(), "content", "docs");

const isVersionDir = (name: string) => /^v\d+(\.\d+)*$/i.test(name);

const parseVersion = (id: string) =>
  id
    .replace(/^v/i, "")
    .split(".")
    .map((segment) => Number.parseInt(segment, 10))
    .map((segment) => (Number.isNaN(segment) ? 0 : segment));

const compareVersionsDesc = (a: string, b: string) => {
  const aParts = parseVersion(a);
  const bParts = parseVersion(b);
  const maxLen = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < maxLen; i += 1) {
    const diff = (bParts[i] ?? 0) - (aParts[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

const getVersionIds = () => {
  try {
    const entries = fs.readdirSync(DOCS_ROOT, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory() && isVersionDir(entry.name))
      .map((entry) => entry.name)
      .sort(compareVersionsDesc);
  } catch {
    return [];
  }
};

const versionIds = getVersionIds();
const resolvedVersionIds = versionIds.length > 0 ? versionIds : ["v1"];

export const DOC_VERSIONS: DocsVersion[] = resolvedVersionIds.map((id, index) => ({
  id,
  label: id,
  isDefault: index === 0,
}));

export const DEFAULT_DOC_VERSION = DOC_VERSIONS[0]?.id || "v1";
