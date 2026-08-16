import "server-only";

import { getAllDocSlugs } from "@/lib/docs/content";

/**
 * Flat aliases for nested doc pages, derived from the content tree.
 *
 * Integration docs live under a category, e.g.
 * integrations/communication/slack, but are widely linked as
 * integrations/slack. Rather than maintaining that mapping by hand — which has
 * to be edited every time a page is added or recategorised — it is computed
 * from the pages that exist.
 *
 * An alias is only registered when it is unambiguous: if two categories both
 * contain a page of the same name, neither claims the flat path.
 */
export function getDocAliases(version: string): Record<string, string> {
  const slugs = getAllDocSlugs(version).filter(s => s.length > 2);
  const candidates = new Map<string, string[]>();

  for (const slug of slugs) {
    const full = slug.join("/");
    const leaf = slug[slug.length - 1];
    const top = slug[0];
    // integrations/communication/slack -> integrations/slack, and bare slack
    for (const alias of [`${top}/${leaf}`, leaf]) {
      if (alias === full) continue;
      const existing = candidates.get(alias) ?? [];
      existing.push(full);
      candidates.set(alias, existing);
    }
  }

  const aliases: Record<string, string> = {};
  const real = new Set(slugs.map(s => s.join("/")));
  for (const [alias, targets] of candidates) {
    if (targets.length !== 1) continue; // ambiguous — leave it a 404
    if (real.has(alias)) continue; // a real page already owns this path
    aliases[alias] = targets[0];
  }
  return aliases;
}
