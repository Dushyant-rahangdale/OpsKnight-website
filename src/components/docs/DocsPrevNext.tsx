import Link from "next/link";
import { getSidebar, SidebarItem } from "@/lib/docs/sidebar";

export function DocsPrevNext({ version, currentPath }: { version: string; currentPath: string }) {
  const sidebar = getSidebar(version);

  const flatten = (items: SidebarItem[]): { title: string; href: string }[] => {
    return items.reduce((acc, item) => {
      const arr = [] as { title: string; href: string }[];
      if (item.href) arr.push({ title: item.title, href: item.href });
      if (item.children) arr.push(...flatten(item.children));
      return acc.concat(arr);
    }, [] as { title: string; href: string }[]);
  };

  const flatList = flatten(sidebar);
  const currentIndex = flatList.findIndex((item) => item.href === currentPath);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flatList[currentIndex - 1] : null;
  const next = currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 hover:border-slate-300 hover:bg-white"
        >
          <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-500">Previous</span>
          <span className="mt-1 block text-sm font-medium text-slate-900">← {prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-right hover:border-slate-300 hover:bg-white"
        >
          <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-500">Next</span>
          <span className="mt-1 block text-sm font-medium text-slate-900">{next.title} →</span>
        </Link>
      ) : null}
    </div>
  );
}
